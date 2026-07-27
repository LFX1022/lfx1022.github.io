"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Maximize2, Rotate3D } from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  createDaytona660Model,
  type Daytona660Model,
} from "@/lib/models/createDaytona660Model";

const INITIAL_CAMERA = new THREE.Vector3(3.5, 1.95, 6.45);
const CAMERA_TARGET = new THREE.Vector3(0, 0.86, 0);

function disposeMaterial(material: THREE.Material) {
  Object.values(material).forEach((value) => {
    if (value instanceof THREE.Texture) value.dispose();
  });
  material.dispose();
}

export function Daytona660ThreeModel() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<Daytona660Model | null>(null);
  const selectionRef = useRef<THREE.Object3D | null>(null);
  const selectionBoxRef = useRef<THREE.Box3Helper | null>(null);
  const explodedRef = useRef(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [selectedPart, setSelectedPart] = useState("點選車體可查看組件");

  const resetCamera = useCallback(() => {
    cameraRef.current?.position.copy(INITIAL_CAMERA);
    if (controlsRef.current) {
      controlsRef.current.target.copy(CAMERA_TARGET);
      controlsRef.current.update();
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void mount.requestFullscreen();
  }, []);

  const toggleExploded = useCallback(() => {
    setExploded((current) => {
      const next = !current;
      explodedRef.current = next;
      return next;
    });
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px" },
    );
    observer.observe(mount);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !active) return;

    let frameId = 0;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0c0e);
    scene.fog = new THREE.Fog(0x0b0c0e, 7.8, 13.5);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.copy(INITIAL_CAMERA);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute("aria-label", "Triumph Daytona 660 多視角重建三維模型");
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(CAMERA_TARGET);
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.minDistance = 3.45;
    controls.maxDistance = 8.4;
    controls.minPolarAngle = 0.34;
    controls.maxPolarAngle = Math.PI / 2.02;
    const captureMode = new URLSearchParams(window.location.search).has("capture");
    controls.autoRotate = !captureMode && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (captureMode) {
      camera.position.set(0, 1.42, 5.15);
      controls.target.set(0, 0.87, 0);
      controls.update();
    }
    controls.autoRotateSpeed = 0.56;
    controls.addEventListener("start", () => {
      controls.autoRotate = false;
    });
    controlsRef.current = controls;

    scene.add(new THREE.HemisphereLight(0xdde5ec, 0x171014, 1.55));
    const key = new THREE.DirectionalLight(0xfff1dc, 3.9);
    key.position.set(4.8, 6.3, 4.2);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -4;
    key.shadow.camera.right = 4;
    key.shadow.camera.top = 4;
    key.shadow.camera.bottom = -2;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xb7d1ed, 1.45);
    fill.position.set(-3.6, 3.1, 4.5);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xaecbff, 2.35);
    rim.position.set(-4, 4.1, -4.5);
    scene.add(rim);
    const merlotBounce = new THREE.PointLight(0x8f1533, 10, 7);
    merlotBounce.position.set(-2.4, 1.1, 2.8);
    scene.add(merlotBounce);

    const model = createDaytona660Model();
    model.root.rotation.y = -0.08;
    modelRef.current = model;
    scene.add(model.root);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(4.4, 96),
      new THREE.MeshStandardMaterial({
        color: 0x14161a,
        roughness: 0.89,
        metalness: 0.08,
      }),
    );
    floor.name = "studio-floor";
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.02;
    floor.receiveShadow = true;
    scene.add(floor);

    const halo = new THREE.Mesh(
      new THREE.RingGeometry(2.25, 2.3, 96),
      new THREE.MeshBasicMaterial({
        color: 0x8d6a41,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
      }),
    );
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = -0.014;
    scene.add(halo);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerStart = new THREE.Vector2();
    const onPointerDown = (event: PointerEvent) => {
      pointerStart = new THREE.Vector2(event.clientX, event.clientY);
    };
    const onPointerUp = (event: PointerEvent) => {
      if (pointerStart.distanceTo(new THREE.Vector2(event.clientX, event.clientY)) > 5) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster
        .intersectObject(model.root, true)
        .find((item) => item.object instanceof THREE.Mesh && item.object.visible);
      if (!hit) return;

      let selected: THREE.Object3D = hit.object;
      while (selected.parent && selected.parent !== model.root) selected = selected.parent;
      if (selected.parent !== model.root) return;
      selectionRef.current = selected;
      setSelectedPart(selected.userData.partLabel ?? selected.name);

      if (selectionBoxRef.current) scene.remove(selectionBoxRef.current);
      const box = new THREE.Box3().setFromObject(selected);
      const helper = new THREE.Box3Helper(box, 0xd8b879);
      helper.name = "selected-part-outline";
      selectionBoxRef.current = helper;
      scene.add(helper);
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const animate = () => {
      model.assemblies.forEach((assembly) => {
        const target = explodedRef.current ? assembly.explodeOffset : new THREE.Vector3();
        assembly.object.position.lerp(target, 0.075);
      });
      if (selectionBoxRef.current && selectionRef.current) {
        selectionBoxRef.current.box.setFromObject(selectionRef.current);
      }
      controls.update();
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };
    animate();
    setReady(true);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach(disposeMaterial);
      });
      renderer.dispose();
      renderer.domElement.remove();
      rendererRef.current = null;
      cameraRef.current = null;
      controlsRef.current = null;
      modelRef.current = null;
      selectionRef.current = null;
      selectionBoxRef.current = null;
    };
  }, [active]);

  return (
    <div
      ref={mountRef}
      className="relative aspect-[4/3] w-full overflow-hidden border border-[#d8b879]/30 bg-[#0b0c0e] shadow-[0_0_18px_rgba(216,184,121,0.16),0_0_52px_rgba(141,18,48,0.12)] sm:aspect-video"
      role="region"
      aria-label="Triumph Daytona 660 多視角程序化 3D 模型，可拖曳旋轉、點選組件並拆解查看"
      aria-busy={!ready}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent px-4 pb-12 pt-4 font-mono text-[10px] uppercase tracking-label text-white/75">
        <span>Daytona 660 · Multi-view 3D</span>
        <span>{ready ? "38-Part Geometry" : "Building Model"}</span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 flex gap-2">
        <button
          type="button"
          onClick={toggleExploded}
          className="flex h-10 items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 text-[11px] text-white/85 backdrop-blur-md transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-merlot-300"
          aria-pressed={exploded}
          aria-label={exploded ? "重新組裝 Daytona 660 模型" : "拆解 Daytona 660 主要組件"}
        >
          <Box size={15} /> {exploded ? "組裝" : "拆解"}
        </button>
        <button
          type="button"
          onClick={resetCamera}
          className="flex h-10 items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 text-[11px] text-white/85 backdrop-blur-md transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-merlot-300"
          aria-label="重設 Daytona 660 3D 模型視角"
        >
          <Rotate3D size={15} /> 重設
        </button>
        <button
          type="button"
          onClick={toggleFullscreen}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/85 backdrop-blur-md transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-merlot-300"
          aria-label="切換 Daytona 660 3D 模型全螢幕"
        >
          <Maximize2 size={15} />
        </button>
      </div>

      <p className="pointer-events-none absolute bottom-5 left-4 z-10 hidden font-mono text-[10px] uppercase tracking-label text-white/55 sm:block">
        Drag · Zoom · Select parts
      </p>
      <p className="pointer-events-none absolute bottom-16 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-4 py-2 font-mono text-[10px] tracking-wide text-[#ead8b5] backdrop-blur-md">
        {selectedPart}
      </p>
    </div>
  );
}
