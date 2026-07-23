"""Normalize the manually cropped CBR600RR configurator frames.

The Honda colour selector is rendered at a constant size in every capture. Its
red swatch therefore provides a reliable fixed anchor for rebuilding the
original viewport without resizing or distorting the motorcycle.
"""

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image


SOURCE_DIR = Path("public/images/motorcycles/cbr600rr/600rrmadal")
OUTPUT_DIR = SOURCE_DIR / "aligned"
CANVAS_SIZE = (800, 550)
TARGET_SWATCH_CENTER = (399.5, 389.5)
EDGE_FEATHER = 24


def connected_components(mask: np.ndarray):
    height, width = mask.shape
    seen = np.zeros_like(mask, dtype=bool)

    for start_y, start_x in zip(*np.nonzero(mask)):
        if seen[start_y, start_x]:
            continue

        queue = deque([(int(start_y), int(start_x))])
        seen[start_y, start_x] = True
        xs: list[int] = []
        ys: list[int] = []

        while queue:
            y, x = queue.pop()
            xs.append(x)
            ys.append(y)

            for next_y in range(max(0, y - 1), min(height, y + 2)):
                for next_x in range(max(0, x - 1), min(width, x + 2)):
                    if mask[next_y, next_x] and not seen[next_y, next_x]:
                        seen[next_y, next_x] = True
                        queue.append((next_y, next_x))

        if len(xs) >= 20:
            yield len(xs), min(xs), min(ys), max(xs), max(ys)


def find_red_swatch(rgb: np.ndarray) -> tuple[float, float]:
    height, width, _ = rgb.shape
    red = rgb[:, :, 0].astype(int)
    green = rgb[:, :, 1].astype(int)
    blue = rgb[:, :, 2].astype(int)
    y_grid, x_grid = np.indices((height, width))

    saturated_red = (
        (red > 120)
        & (red > green * 1.35)
        & (red > blue * 1.25)
        & (y_grid > height * 0.58)
        & (x_grid > width * 0.25)
        & (x_grid < width * 0.75)
    )

    candidates = []
    for area, x0, y0, x1, y1 in connected_components(saturated_red):
        component_width = x1 - x0 + 1
        component_height = y1 - y0 + 1
        aspect = component_width / component_height
        if (
            0.55 < aspect < 1.5
            and 100 < area < 2500
            and component_width < width * 0.18
        ):
            candidates.append((area, x0, y0, x1, y1))

    if not candidates:
        raise RuntimeError("Red colour swatch was not found")

    # The inner red circle is exactly 30 x 30 px (724 red pixels) in the
    # original configurator. Prefer that component over red motorcycle panels.
    candidates.sort(
        key=lambda item: (
            abs(item[0] - 724),
            abs((item[3] - item[1] + 1) - 30),
            abs((item[4] - item[2] + 1) - 30),
        )
    )
    _, x0, y0, x1, y1 = candidates[0]
    return (x0 + x1) / 2, (y0 + y1) / 2


def make_background(
    frames: list[np.ndarray], placements: list[tuple[int, int]]
) -> np.ndarray:
    canvas_width, canvas_height = CANVAS_SIZE
    row_samples: list[list[np.ndarray]] = [[] for _ in range(canvas_height)]

    # Screenshot side edges contain only the configurator background. Sampling
    # them reconstructs its light vertical gradient without motorcycle pixels.
    for frame, (offset_x, offset_y) in zip(frames, placements):
        del offset_x
        frame_height = frame.shape[0]
        edge_pixels = np.concatenate((frame[:, :8], frame[:, -8:]), axis=1)
        for source_y in range(frame_height):
            canvas_y = offset_y + source_y
            if 0 <= canvas_y < canvas_height:
                row_samples[canvas_y].append(edge_pixels[source_y])

    background_rows: list[np.ndarray | None] = []
    for samples in row_samples:
        if samples:
            pixels = np.concatenate(samples, axis=0)
            background_rows.append(np.median(pixels, axis=0))
        else:
            background_rows.append(None)

    known_rows = [index for index, colour in enumerate(background_rows) if colour is not None]
    for row_index, colour in enumerate(background_rows):
        if colour is not None:
            continue
        nearest = min(known_rows, key=lambda known: abs(known - row_index))
        background_rows[row_index] = background_rows[nearest]

    background = np.empty((canvas_height, canvas_width, 3), dtype=np.uint8)
    for row_index, colour in enumerate(background_rows):
        background[row_index, :, :] = np.asarray(colour, dtype=np.uint8)
    return background


def feather_mask(width: int, height: int) -> np.ndarray:
    y_grid, x_grid = np.indices((height, width))
    distance = np.minimum.reduce(
        (x_grid + 1, width - x_grid, y_grid + 1, height - y_grid)
    ).astype(float)
    amount = np.clip(distance / EDGE_FEATHER, 0, 1)
    return amount * amount * (3 - 2 * amount)


def main() -> None:
    paths = sorted(SOURCE_DIR.glob("[0-9][0-9][0-9].PNG"))
    if len(paths) != 36:
        raise RuntimeError(f"Expected 36 source frames, found {len(paths)}")

    frames = [np.asarray(Image.open(path).convert("RGB")) for path in paths]
    placements = []
    for path, frame in zip(paths, frames):
        swatch_x, swatch_y = find_red_swatch(frame)
        placements.append(
            (
                round(TARGET_SWATCH_CENTER[0] - swatch_x),
                round(TARGET_SWATCH_CENTER[1] - swatch_y),
            )
        )
        print(
            f"{path.name}: {frame.shape[1]}x{frame.shape[0]} "
            f"offset=({placements[-1][0]}, {placements[-1][1]})"
        )

    background = make_background(frames, placements)
    canvas_width, canvas_height = CANVAS_SIZE
    OUTPUT_DIR.mkdir(exist_ok=True)
    Image.fromarray(background).save(OUTPUT_DIR / "_background.PNG", optimize=True)

    for path, frame, (offset_x, offset_y) in zip(paths, frames, placements):
        frame_height, frame_width, _ = frame.shape
        canvas = background.astype(float).copy()
        alpha = feather_mask(frame_width, frame_height)[:, :, None]

        source_x0 = max(0, -offset_x)
        source_y0 = max(0, -offset_y)
        source_x1 = min(frame_width, canvas_width - offset_x)
        source_y1 = min(frame_height, canvas_height - offset_y)
        canvas_x0 = offset_x + source_x0
        canvas_y0 = offset_y + source_y0
        canvas_x1 = offset_x + source_x1
        canvas_y1 = offset_y + source_y1

        source = frame[source_y0:source_y1, source_x0:source_x1].astype(float)
        source_alpha = alpha[source_y0:source_y1, source_x0:source_x1]
        destination = canvas[canvas_y0:canvas_y1, canvas_x0:canvas_x1]
        canvas[canvas_y0:canvas_y1, canvas_x0:canvas_x1] = (
            source * source_alpha + destination * (1 - source_alpha)
        )

        Image.fromarray(np.clip(canvas, 0, 255).astype(np.uint8)).save(
            OUTPUT_DIR / path.name,
            optimize=True,
        )


if __name__ == "__main__":
    main()
