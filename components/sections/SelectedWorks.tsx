import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { MediaCarousel } from "@/components/MediaCarousel";
import { RecordArchivePreview } from "@/components/RecordArchivePreview";
import { stories } from "@/data/stories";
import type { IconName, Story, StoryMedia } from "@/types";

// 依類型決定佔位圖示
const typeIcon: Record<Story["type"], IconName> = {
  engineering: "Boxes",
  automation: "Workflow",
  motorcycle: "Bike",
  hardware: "Cpu",
  video: "Video",
  creation: "PenTool",
  life: "Coffee",
  archive: "Sparkles",
};

export function SelectedWorks() {
  return (
    <section id="stories" className="scroll-mt-28 border-t border-ink-600/60 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="08 / Selected Works & Stories"
          title="作品與紀錄"
          description="工程、Dynamo、重機、硬體、影像、創作與生活——之後會陸續放進來。"
        />

        <div className="mt-14 grid gap-6">
          {stories.map((story, i) => (
            <Reveal key={story.index} delay={(i % 2) * 90}>
              <StoryCard story={story} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// 把單一 story 正規化成媒體清單：優先用 media，其次 video / image
function storyMedia(story: Story): StoryMedia[] {
  if (story.media?.length) return story.media;
  if (story.video) return [{ src: story.video }];
  if (story.image) return [{ src: story.image }];
  return [];
}

function StoryCard({ story }: { story: Story }) {
  const media = storyMedia(story);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-ink-600 bg-ink-800/40 transition-colors hover:border-steel-600 md:flex-row">
      <div className="relative md:w-2/3 md:shrink-0">
        {story.archive ? (
          <RecordArchivePreview
            archive={story.archive}
            index={story.index}
            title={story.title}
          />
        ) : media.length > 1 ? (
          <MediaCarousel items={media} title={story.title} />
        ) : media.length === 1 ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
            <MediaItem item={media[0]} title={story.title} />
            {media[0].caption ? (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/85 to-transparent px-4 pb-3 pt-8 font-mono text-xs leading-snug text-steel-100">
                {media[0].caption}
              </span>
            ) : null}
          </div>
        ) : (
          <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
            <PlaceholderVisual story={story} />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-sm bg-ink-950/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-merlot-300 backdrop-blur-sm">
          {story.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-merlot-400">{story.index}</span>
          <h3 className="text-lg font-semibold text-steel-100 md:text-xl">{story.title}</h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-steel-400">
          {story.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {story.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-sm border border-ink-600 px-2.5 py-1 font-mono text-[11px] tracking-wide text-steel-400"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** 依副檔名渲染單一媒體：.mp4/.webm/.mov → 影片；.gif → 動畫圖；其餘 → 一般圖片 */
function MediaItem({ item, title }: { item: StoryMedia; title: string }) {
  const { src } = item;
  if (/\.(mp4|webm|mov)$/i.test(src)) {
    return (
      <video
        className="h-full w-full object-cover"
        src={src}
        aria-label={title}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
    );
  }
  return (
    <Image
      src={src}
      alt={title}
      fill
      sizes="(min-width: 640px) 50vw, 100vw"
      unoptimized={/\.gif$/i.test(src)}
      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
    />
  );
}

/** 尚未提供圖片時的佔位視覺，依類型顯示對應圖示 */
function PlaceholderVisual({ story }: { story: Story }) {
  return (
    <div className="blueprint-grid absolute inset-0 flex items-center justify-center opacity-80">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink-900/10 to-ink-950/70" />
      <Icon name={typeIcon[story.type]} className="relative h-16 w-16 text-steel-500/30" strokeWidth={1} />
      <span className="absolute bottom-3 right-4 font-mono text-5xl font-semibold text-steel-500/15">
        {story.index}
      </span>
    </div>
  );
}
