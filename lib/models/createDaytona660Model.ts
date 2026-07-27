import * as THREE from "three";

export type DaytonaAssembly = {
  id: string;
  label: string;
  object: THREE.Group;
  explodeOffset: THREE.Vector3;
};

export type Daytona660Model = {
  root: THREE.Group;
  assemblies: DaytonaAssembly[];
};

type Section = {
  x: number;
  y: number;
  top: number;
  bottom: number;
  width: number;
};

type DaytonaMaterials = ReturnType<typeof createMaterials>;

const UP = new THREE.Vector3(0, 1, 0);

function seededNoiseTexture(seed: number, size = 128) {
  const data = new Uint8Array(size * size * 4);
  let value = seed >>> 0;
  for (let index = 0; index < size * size; index += 1) {
    value = Math.imul(value ^ (value >>> 15), 2246822519);
    value = Math.imul(value ^ (value >>> 13), 3266489917);
    const noise = 112 + ((value ^ (value >>> 16)) & 31);
    const offset = index * 4;
    data[offset] = noise;
    data[offset + 1] = noise;
    data[offset + 2] = noise;
    data[offset + 3] = 255;
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.colorSpace = THREE.NoColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 5);
  texture.needsUpdate = true;
  return texture;
}

function createMaterials() {
  const paintRoughness = seededNoiseTexture(660);
  const rubberRoughness = seededNoiseTexture(17);
  const metalRoughness = seededNoiseTexture(93);

  return {
    wine: new THREE.MeshPhysicalMaterial({
      color: 0x9d1533,
      metalness: 0.08,
      roughness: 0.23,
      roughnessMap: paintRoughness,
      clearcoat: 1,
      clearcoatRoughness: 0.075,
      envMapIntensity: 1.35,
    }),
    wineDark: new THREE.MeshPhysicalMaterial({
      color: 0x651023,
      metalness: 0.06,
      roughness: 0.28,
      roughnessMap: paintRoughness,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1,
    }),
    black: new THREE.MeshStandardMaterial({ color: 0x090a0c, metalness: 0.24, roughness: 0.58 }),
    matte: new THREE.MeshStandardMaterial({ color: 0x17191d, metalness: 0.06, roughness: 0.78 }),
    rubber: new THREE.MeshStandardMaterial({
      color: 0x080809,
      metalness: 0,
      roughness: 0.91,
      roughnessMap: rubberRoughness,
    }),
    wheel: new THREE.MeshStandardMaterial({ color: 0x111318, metalness: 0.74, roughness: 0.36 }),
    cast: new THREE.MeshStandardMaterial({
      color: 0xa8acae,
      metalness: 0.9,
      roughness: 0.4,
      roughnessMap: metalRoughness,
    }),
    darkMetal: new THREE.MeshStandardMaterial({ color: 0x34383d, metalness: 0.8, roughness: 0.42 }),
    steel: new THREE.MeshStandardMaterial({
      color: 0xb8bdc0,
      metalness: 0.95,
      roughness: 0.28,
      roughnessMap: metalRoughness,
    }),
    exhaust: new THREE.MeshStandardMaterial({ color: 0x777c80, metalness: 0.94, roughness: 0.31 }),
    gold: new THREE.MeshPhysicalMaterial({
      color: 0xc5963e,
      metalness: 0.88,
      roughness: 0.2,
      clearcoat: 0.25,
      clearcoatRoughness: 0.1,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0x263640,
      transparent: true,
      opacity: 0.3,
      transmission: 0.55,
      roughness: 0.07,
      metalness: 0.02,
      clearcoat: 0.7,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
    lamp: new THREE.MeshPhysicalMaterial({
      color: 0x33444f,
      emissive: 0x8caac2,
      emissiveIntensity: 0.08,
      roughness: 0.2,
      clearcoat: 1,
    }),
    tailLamp: new THREE.MeshPhysicalMaterial({
      color: 0x9b001f,
      emissive: 0xff1645,
      emissiveIntensity: 2.8,
      roughness: 0.14,
      clearcoat: 0.8,
    }),
    orangeLamp: new THREE.MeshStandardMaterial({
      color: 0xd87c18,
      emissive: 0xff8c16,
      emissiveIntensity: 1.2,
      roughness: 0.2,
    }),
  };
}

function namedMesh(geometry: THREE.BufferGeometry, material: THREE.Material, name: string) {
  const object = new THREE.Mesh(geometry, material);
  object.name = name;
  object.castShadow = true;
  object.receiveShadow = true;
  return object;
}

function makeAssembly(id: string, label: string, explodeOffset: [number, number, number]) {
  const group = new THREE.Group();
  group.name = id;
  group.userData.partRoot = true;
  group.userData.partLabel = label;
  group.userData.explodeWithParent = false;
  return {
    id,
    label,
    object: group,
    explodeOffset: new THREE.Vector3(...explodeOffset),
  } satisfies DaytonaAssembly;
}

function addSurfaceDetail(parent: THREE.Object3D, child: THREE.Object3D) {
  child.userData.explodeWithParent = true;
  parent.add(child);
  return child;
}

function tubeBetween(
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number,
  material: THREE.Material,
  name: string,
  radialSegments = 14,
) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const object = namedMesh(
    new THREE.CylinderGeometry(radius, radius * 0.96, direction.length(), radialSegments, 1),
    material,
    name,
  );
  object.position.copy(start).add(end).multiplyScalar(0.5);
  object.quaternion.setFromUnitVectors(UP, direction.clone().normalize());
  return object;
}

function loftGeometry(sections: Section[], radialSegments = 32) {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  sections.forEach((section, sectionIndex) => {
    for (let step = 0; step < radialSegments; step += 1) {
      const angle = (step / radialSegments) * Math.PI * 2;
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);
      const vertical = sin >= 0 ? section.top : section.bottom;
      const shoulder = 0.9 + Math.abs(sin) * 0.1;
      positions.push(section.x, section.y + sin * vertical, cos * section.width * shoulder);
      uvs.push(sectionIndex / Math.max(1, sections.length - 1), step / radialSegments);
    }
  });

  for (let section = 0; section < sections.length - 1; section += 1) {
    for (let step = 0; step < radialSegments; step += 1) {
      const next = (step + 1) % radialSegments;
      const a = section * radialSegments + step;
      const b = section * radialSegments + next;
      const c = (section + 1) * radialSegments + next;
      const d = (section + 1) * radialSegments + step;
      indices.push(a, b, d, b, c, d);
    }
  }

  const startCenter = positions.length / 3;
  positions.push(sections[0].x, sections[0].y, 0);
  uvs.push(0.5, 0.5);
  const endCenter = positions.length / 3;
  const last = sections.at(-1)!;
  positions.push(last.x, last.y, 0);
  uvs.push(0.5, 0.5);
  for (let step = 0; step < radialSegments; step += 1) {
    const next = (step + 1) % radialSegments;
    indices.push(startCenter, next, step);
    const endBase = (sections.length - 1) * radialSegments;
    indices.push(endCenter, endBase + step, endBase + next);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function extrudedPanel(
  points: Array<[number, number]>,
  depth: number,
  material: THREE.Material,
  name: string,
  bevel = 0.012,
) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  points.slice(1).forEach(([x, y]) => shape.lineTo(x, y));
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevel > 0,
    bevelSize: bevel,
    bevelThickness: bevel,
    bevelSegments: 2,
    curveSegments: 10,
  });
  geometry.translate(0, 0, -depth / 2);
  return namedMesh(geometry, material, name);
}

function ribbonGeometry(sections: Array<{ x: number; y: number; width: number; crown: number }>, across = 12) {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  sections.forEach((section, row) => {
    for (let column = 0; column <= across; column += 1) {
      const t = (column / across) * 2 - 1;
      positions.push(section.x, section.y + (1 - t * t) * section.crown, t * section.width);
      uvs.push(row / Math.max(1, sections.length - 1), column / across);
    }
  });
  for (let row = 0; row < sections.length - 1; row += 1) {
    for (let column = 0; column < across; column += 1) {
      const stride = across + 1;
      const a = row * stride + column;
      const b = a + 1;
      const c = a + stride + 1;
      const d = a + stride;
      indices.push(a, b, d, b, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function frontFaceShape(
  points: Array<[number, number]>,
  material: THREE.Material,
  name: string,
  x: number,
  y: number,
) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  points.slice(1).forEach(([u, v]) => shape.lineTo(u, v));
  shape.closePath();
  const object = namedMesh(new THREE.ShapeGeometry(shape, 12), material, name);
  object.rotation.y = Math.PI / 2;
  object.position.set(x, y, 0);
  return object;
}

function textDecal(text: string, width: number, side: number, y: number, x: number, name: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext("2d")!;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#f5efe7";
  context.font = "700 58px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, 256, 67);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, side: THREE.DoubleSide });
  const object = namedMesh(new THREE.PlaneGeometry(width, width * 0.25), material, name);
  object.position.set(x, y, side * 0.366);
  object.rotation.y = side < 0 ? Math.PI : 0;
  object.renderOrder = 3;
  object.castShadow = false;
  return object;
}

function createWheel(x: number, width: number, materials: DaytonaMaterials, name: string) {
  const group = new THREE.Group();
  group.name = name;
  group.userData.partLabel = name === "front-wheel" ? "前輪與雙碟煞" : "後輪與傳動";
  group.position.set(x, 0.52, 0);

  group.add(namedMesh(new THREE.TorusGeometry(0.49, 0.105, 24, 96), materials.rubber, `${name}-tire`));
  group.add(namedMesh(new THREE.TorusGeometry(0.34, 0.035, 14, 72), materials.wheel, `${name}-rim`));

  const hub = namedMesh(new THREE.CylinderGeometry(0.07, 0.07, width, 24), materials.darkMetal, `${name}-hub`);
  hub.rotation.x = Math.PI / 2;
  group.add(hub);

  for (let index = 0; index < 5; index += 1) {
    const angle = (index / 5) * Math.PI * 2;
    [-0.07, 0.07].forEach((z, pair) => {
      const start = new THREE.Vector3(Math.cos(angle) * 0.075, Math.sin(angle) * 0.075, z);
      const endAngle = angle + (pair ? 0.2 : -0.2);
      const end = new THREE.Vector3(Math.cos(endAngle) * 0.315, Math.sin(endAngle) * 0.315, z * 0.55);
      group.add(tubeBetween(start, end, 0.014, materials.wheel, `${name}-spoke-${index}-${pair}`, 10));
    });
  }

  const tread = new THREE.InstancedMesh(new THREE.BoxGeometry(0.035, 0.007, width * 0.52), materials.rubber, 42);
  tread.name = `${name}-tread-bands`;
  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  for (let index = 0; index < 42; index += 1) {
    const angle = (index / 42) * Math.PI * 2;
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle + Math.PI / 2 + (index % 2 ? 0.08 : -0.08));
    matrix.compose(
      new THREE.Vector3(Math.cos(angle) * 0.583, Math.sin(angle) * 0.583, 0),
      quaternion,
      new THREE.Vector3(1, 1, 0.82),
    );
    tread.setMatrixAt(index, matrix);
  }
  tread.castShadow = true;
  tread.instanceMatrix.needsUpdate = true;
  tread.visible = false;
  addSurfaceDetail(group, tread);

  const discSides = name === "front-wheel" ? [-0.17, 0.17] : [0.19];
  discSides.forEach((z, discIndex) => {
    const disc = namedMesh(new THREE.CylinderGeometry(name === "front-wheel" ? 0.29 : 0.23, name === "front-wheel" ? 0.29 : 0.23, 0.016, 64), materials.steel, `${name}-disc-${discIndex}`);
    disc.rotation.x = Math.PI / 2;
    disc.position.z = z;
    group.add(disc);
    const carrier = namedMesh(new THREE.CylinderGeometry(0.18, 0.18, 0.022, 32), materials.darkMetal, `${name}-disc-carrier-${discIndex}`);
    carrier.rotation.x = Math.PI / 2;
    carrier.position.z = z;
    group.add(carrier);

    const holeCount = 18;
    const holes = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.012, 0.012, 0.024, 10), materials.black, holeCount);
    holes.name = `${name}-disc-holes-${discIndex}`;
    const holeQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    for (let index = 0; index < holeCount; index += 1) {
      const angle = (index / holeCount) * Math.PI * 2;
      matrix.compose(new THREE.Vector3(Math.cos(angle) * 0.247, Math.sin(angle) * 0.247, z), holeQuaternion, new THREE.Vector3(1, 1, 1));
      holes.setMatrixAt(index, matrix);
    }
    holes.instanceMatrix.needsUpdate = true;
    addSurfaceDetail(group, holes);
  });
  return group;
}

function addFrontAssembly(assembly: THREE.Group, materials: DaytonaMaterials) {
  const wheel = createWheel(1.22, 0.38, materials, "front-wheel");
  assembly.add(wheel);
  [-0.19, 0.19].forEach((z, sideIndex) => {
    assembly.add(
      tubeBetween(new THREE.Vector3(1.22, 0.56, z), new THREE.Vector3(0.9, 1.47, z), 0.036, materials.gold, `fork-gold-${sideIndex}`, 18),
      tubeBetween(new THREE.Vector3(1.22, 0.53, z), new THREE.Vector3(1.08, 0.94, z), 0.045, materials.cast, `fork-slider-${sideIndex}`, 18),
    );
    const caliper = namedMesh(new THREE.CapsuleGeometry(0.055, 0.14, 5, 12), materials.darkMetal, `front-caliper-${sideIndex}`);
    caliper.position.set(1.03, 0.64, z * 1.07);
    caliper.rotation.z = -0.3;
    assembly.add(caliper);
  });
  assembly.add(tubeBetween(new THREE.Vector3(0.88, 1.47, -0.26), new THREE.Vector3(0.88, 1.47, 0.26), 0.032, materials.darkMetal, "triple-clamp"));

  const fender = namedMesh(new THREE.TorusGeometry(0.535, 0.034, 10, 42, Math.PI * 0.82), materials.wine, "front-fender");
  fender.rotation.z = Math.PI * 0.09;
  fender.scale.z = 2.7;
  assembly.add(fender);

  [-1, 1].forEach((side) => {
    const stem = tubeBetween(
      new THREE.Vector3(0.91, 1.49, side * 0.18),
      new THREE.Vector3(0.79, 1.54, side * 0.43),
      0.018,
      materials.darkMetal,
      `clip-on-${side}`,
      10,
    );
    assembly.add(stem);
    const grip = namedMesh(new THREE.CylinderGeometry(0.035, 0.035, 0.23, 14), materials.rubber, `grip-${side}`);
    grip.rotation.x = Math.PI / 2;
    grip.position.set(0.79, 1.54, side * 0.5);
    assembly.add(grip);
  });
}

function addChassis(assembly: THREE.Group, materials: DaytonaMaterials) {
  [-1, 1].forEach((side) => {
    const z = side * 0.265;
    assembly.add(
      tubeBetween(new THREE.Vector3(0.66, 1.28, z), new THREE.Vector3(-0.35, 0.78, z), 0.075, materials.cast, `frame-main-${side}`, 18),
      tubeBetween(new THREE.Vector3(0.52, 1.12, z), new THREE.Vector3(-0.26, 0.55, z), 0.052, materials.cast, `frame-lower-${side}`, 16),
      tubeBetween(new THREE.Vector3(-0.4, 1.18, side * 0.2), new THREE.Vector3(-1.12, 1.32, side * 0.18), 0.035, materials.darkMetal, `subframe-upper-${side}`, 12),
      tubeBetween(new THREE.Vector3(-0.35, 0.85, side * 0.2), new THREE.Vector3(-1.08, 1.22, side * 0.18), 0.03, materials.darkMetal, `subframe-lower-${side}`, 12),
    );
  });
  const steeringHead = namedMesh(new THREE.CylinderGeometry(0.105, 0.105, 0.56, 24), materials.darkMetal, "steering-head");
  steeringHead.rotation.x = Math.PI / 2;
  steeringHead.position.set(0.67, 1.27, 0);
  assembly.add(steeringHead);

  const radiator = namedMesh(new THREE.BoxGeometry(0.13, 0.54, 0.56), materials.darkMetal, "radiator");
  radiator.position.set(0.57, 0.83, 0);
  radiator.rotation.z = -0.1;
  assembly.add(radiator);
  const fins = new THREE.InstancedMesh(new THREE.BoxGeometry(0.018, 0.48, 0.012), materials.cast, 26);
  fins.name = "radiator-fin-field";
  const matrix = new THREE.Matrix4();
  for (let index = 0; index < 26; index += 1) {
    matrix.makeTranslation(0.64, 0.83, -0.25 + (index / 25) * 0.5);
    fins.setMatrixAt(index, matrix);
  }
  fins.instanceMatrix.needsUpdate = true;
  addSurfaceDetail(assembly, fins);
}

function addPowertrain(assembly: THREE.Group, materials: DaytonaMaterials) {
  const crankcase = namedMesh(new THREE.SphereGeometry(0.42, 32, 22), materials.darkMetal, "engine-crankcase");
  crankcase.scale.set(1.12, 0.9, 0.82);
  crankcase.position.set(-0.03, 0.68, 0);
  assembly.add(crankcase);

  [-0.19, 0, 0.19].forEach((z, index) => {
    const cylinder = namedMesh(new THREE.CylinderGeometry(0.12, 0.14, 0.36, 20), materials.darkMetal, `triple-cylinder-${index}`);
    cylinder.position.set(0.14, 0.96, z);
    cylinder.rotation.z = -0.14;
    assembly.add(cylinder);
    const headerCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.28, 0.88, z),
      new THREE.Vector3(0.4, 0.61, z * 0.9),
      new THREE.Vector3(0.34, 0.31, z * 0.75),
      new THREE.Vector3(-0.2, 0.22, -0.22),
      new THREE.Vector3(-0.55, 0.28, -0.29),
    ]);
    assembly.add(namedMesh(new THREE.TubeGeometry(headerCurve, 42, 0.027, 10, false), materials.exhaust, `exhaust-header-${index}`));
  });

  [-1, 1].forEach((side) => {
    const cover = namedMesh(new THREE.CylinderGeometry(0.245, 0.245, 0.05, 40), materials.darkMetal, `engine-cover-${side}`);
    cover.rotation.x = Math.PI / 2;
    cover.position.set(-0.12, 0.66, side * 0.35);
    assembly.add(cover);
    const ring = namedMesh(new THREE.TorusGeometry(0.18, 0.012, 10, 40), materials.cast, `engine-cover-ring-${side}`);
    ring.position.set(-0.12, 0.66, side * 0.38);
    addSurfaceDetail(assembly, ring);
  });

  const collector = namedMesh(new THREE.CapsuleGeometry(0.13, 0.48, 8, 18), materials.exhaust, "exhaust-collector");
  collector.rotation.z = Math.PI / 2 - 0.12;
  collector.position.set(-0.46, 0.28, -0.28);
  collector.scale.z = 0.72;
  assembly.add(collector);
  const heatShield = namedMesh(new THREE.CapsuleGeometry(0.105, 0.42, 7, 18), materials.cast, "exhaust-heat-shield");
  heatShield.rotation.z = Math.PI / 2 - 0.12;
  heatShield.position.set(-0.48, 0.33, -0.36);
  heatShield.scale.z = 0.35;
  assembly.add(heatShield);
  const outlet = namedMesh(new THREE.CylinderGeometry(0.075, 0.085, 0.13, 22), materials.black, "exhaust-outlet");
  outlet.rotation.z = Math.PI / 2;
  outlet.position.set(-0.82, 0.33, -0.35);
  assembly.add(outlet);
}

function addBodywork(assembly: THREE.Group, materials: DaytonaMaterials) {
  const frontCowl = namedMesh(loftGeometry([
    { x: 0.5, y: 1.21, top: 0.18, bottom: 0.17, width: 0.31 },
    { x: 0.76, y: 1.25, top: 0.25, bottom: 0.23, width: 0.37 },
    { x: 1.12, y: 1.23, top: 0.23, bottom: 0.21, width: 0.37 },
    { x: 1.42, y: 1.17, top: 0.16, bottom: 0.14, width: 0.3 },
  ], 36), materials.wine, "front-cowl");
  assembly.add(frontCowl);

  const intake = frontFaceShape([
    [-0.105, 0.11], [0, -0.07], [0.105, 0.11], [0.055, 0.16], [0, 0.055], [-0.055, 0.16],
  ], materials.black, "front-v-intake", 1.435, 1.14);
  assembly.add(intake);

  const brow = frontFaceShape([
    [-0.33, 0.16], [-0.18, 0.245], [0, 0.275], [0.18, 0.245], [0.33, 0.16],
    [0.29, 0.12], [0.12, 0.17], [0, 0.19], [-0.12, 0.17], [-0.29, 0.12],
  ], materials.wine, "headlight-brow", 1.448, 1.12);
  assembly.add(brow);

  [
    [[-0.29, 0.06], [-0.07, -0.025], [-0.025, 0.065], [-0.12, 0.16], [-0.29, 0.135]],
    [[0.025, 0.065], [0.07, -0.025], [0.29, 0.06], [0.29, 0.135], [0.12, 0.16]],
  ].forEach((points, index) => assembly.add(frontFaceShape(points as Array<[number, number]>, materials.lamp, `headlight-${index}`, 1.445, 1.12)));

  const tank = namedMesh(loftGeometry([
    { x: -0.65, y: 1.36, top: 0.11, bottom: 0.1, width: 0.23 },
    { x: -0.4, y: 1.39, top: 0.2, bottom: 0.14, width: 0.29 },
    { x: -0.08, y: 1.4, top: 0.23, bottom: 0.17, width: 0.34 },
    { x: 0.24, y: 1.36, top: 0.17, bottom: 0.14, width: 0.3 },
    { x: 0.4, y: 1.3, top: 0.08, bottom: 0.08, width: 0.22 },
  ], 40), materials.wine, "fuel-tank");
  tank.rotation.z = -0.015;
  assembly.add(tank);

  const upperFairingPoints: Array<[number, number]> = [
    [-0.43, 1.11], [0.22, 1.3], [0.82, 1.29], [1.2, 1.07],
    [1.14, 0.8], [0.82, 0.69], [0.28, 0.77], [-0.31, 0.84],
  ];
  const lowerFairingPoints: Array<[number, number]> = [
    [0.24, 0.76], [0.55, 0.71], [0.9, 0.69], [1.13, 0.81],
    [0.92, 0.46], [0.56, 0.32], [0.25, 0.4],
  ];
  const insetPoints: Array<[number, number]> = [
    [-0.18, 1.04], [0.18, 1.17], [0.61, 1.13], [0.38, 0.99], [-0.12, 0.88],
  ];
  [-1, 1].forEach((side) => {
    const upperPanel = extrudedPanel(upperFairingPoints, 0.075, side > 0 ? materials.wine : materials.wineDark, `upper-fairing-${side}`, 0.012);
    upperPanel.position.z = side * 0.315;
    assembly.add(upperPanel);
    const lowerPanel = extrudedPanel(lowerFairingPoints, 0.065, side > 0 ? materials.wineDark : materials.wine, `lower-fairing-${side}`, 0.01);
    lowerPanel.position.z = side * 0.305;
    assembly.add(lowerPanel);
    const inset = extrudedPanel(insetPoints, 0.018, materials.black, `fairing-inset-${side}`, 0.006);
    inset.position.z = side * 0.362;
    assembly.add(inset);
    assembly.add(textDecal("DAYTONA 660", 0.46, side, 1.15, 0.38, `daytona-decal-${side}`));
    assembly.add(textDecal("TRIUMPH", 0.28, side, 1.52, -0.05, `tank-decal-${side}`));
    const sideLamp = extrudedPanel([
      [1.25, 1.18], [1.42, 1.15], [1.4, 1.21], [1.29, 1.24],
    ], 0.01, materials.lamp, `headlight-side-${side}`, 0.002);
    sideLamp.position.z = side * 0.324;
    assembly.add(sideLamp);
    const screenSide = extrudedPanel([
      [0.63, 1.43], [0.78, 1.61], [0.97, 1.68], [1.13, 1.48],
    ], 0.008, materials.glass, `windscreen-side-${side}`, 0);
    screenSide.position.z = side * 0.215;
    assembly.add(screenSide);
  });

  const belly = extrudedPanel([
    [-0.42, 0.3], [0.38, 0.22], [0.92, 0.42], [0.73, 0.58], [-0.34, 0.5],
  ], 0.48, materials.matte, "belly-pan", 0.012);
  assembly.add(belly);

  const tail = namedMesh(loftGeometry([
    { x: -1.62, y: 1.29, top: 0.07, bottom: 0.055, width: 0.075 },
    { x: -1.38, y: 1.34, top: 0.14, bottom: 0.09, width: 0.18 },
    { x: -1.05, y: 1.4, top: 0.14, bottom: 0.12, width: 0.25 },
    { x: -0.72, y: 1.37, top: 0.1, bottom: 0.08, width: 0.27 },
  ], 32), materials.wine, "tail-cowl");
  assembly.add(tail);

  const riderSeat = namedMesh(loftGeometry([
    { x: -1.0, y: 1.4, top: 0.08, bottom: 0.04, width: 0.23 },
    { x: -0.76, y: 1.43, top: 0.08, bottom: 0.05, width: 0.28 },
    { x: -0.48, y: 1.39, top: 0.055, bottom: 0.045, width: 0.29 },
  ], 28), materials.matte, "rider-seat");
  assembly.add(riderSeat);
  const pillionSeat = namedMesh(loftGeometry([
    { x: -1.42, y: 1.39, top: 0.055, bottom: 0.035, width: 0.15 },
    { x: -1.18, y: 1.46, top: 0.075, bottom: 0.04, width: 0.2 },
    { x: -0.98, y: 1.46, top: 0.055, bottom: 0.035, width: 0.21 },
  ], 24), materials.matte, "pillion-seat");
  assembly.add(pillionSeat);

  const windscreen = namedMesh(ribbonGeometry([
    { x: 0.64, y: 1.43, width: 0.21, crown: 0.012 },
    { x: 0.79, y: 1.59, width: 0.24, crown: 0.018 },
    { x: 0.98, y: 1.67, width: 0.2, crown: 0.02 },
    { x: 1.13, y: 1.47, width: 0.17, crown: 0.012 },
  ], 16), materials.glass, "windscreen");
  assembly.add(windscreen);

  [-1, 1].forEach((side) => {
    assembly.add(tubeBetween(
      new THREE.Vector3(0.82, 1.55, side * 0.22),
      new THREE.Vector3(0.76, 1.7, side * 0.5),
      0.016,
      materials.black,
      `mirror-stem-${side}`,
      10,
    ));
    const mirror = namedMesh(new THREE.SphereGeometry(0.12, 22, 14), materials.black, `mirror-${side}`);
    mirror.scale.set(1.35, 0.52, 0.72);
    mirror.position.set(0.74, 1.71, side * 0.55);
    assembly.add(mirror);
    const signal = namedMesh(new THREE.SphereGeometry(0.032, 14, 10), materials.orangeLamp, `front-signal-${side}`);
    signal.scale.set(1.4, 0.55, 0.55);
    signal.position.set(1.06, 1.16, side * 0.38);
    assembly.add(signal);
  });

  const tailLamp = extrudedPanel([[-0.11, -0.025], [0.11, -0.025], [0.08, 0.025], [-0.08, 0.025]], 0.028, materials.tailLamp, "tail-light-strip", 0.004);
  tailLamp.rotation.y = Math.PI / 2;
  tailLamp.position.set(-1.625, 1.31, 0);
  assembly.add(tailLamp);
}

function addRearAssembly(assembly: THREE.Group, materials: DaytonaMaterials) {
  const wheel = createWheel(-1.18, 0.46, materials, "rear-wheel");
  assembly.add(wheel);
  [-1, 1].forEach((side) => {
    assembly.add(
      tubeBetween(new THREE.Vector3(-0.35, 0.75, side * 0.27), new THREE.Vector3(-1.18, 0.55, side * 0.22), 0.06, materials.darkMetal, `swingarm-upper-${side}`, 16),
      tubeBetween(new THREE.Vector3(-0.34, 0.59, side * 0.27), new THREE.Vector3(-1.18, 0.48, side * 0.22), 0.048, materials.darkMetal, `swingarm-lower-${side}`, 16),
    );
  });
  assembly.add(tubeBetween(new THREE.Vector3(-0.45, 0.78, 0), new THREE.Vector3(-0.68, 1.18, 0), 0.045, materials.gold, "rear-shock", 16));

  const sprocket = namedMesh(new THREE.CylinderGeometry(0.21, 0.21, 0.025, 40), materials.steel, "rear-sprocket");
  sprocket.rotation.x = Math.PI / 2;
  sprocket.position.set(-1.18, 0.52, 0.25);
  assembly.add(sprocket);
  const frontSprocket = namedMesh(new THREE.CylinderGeometry(0.1, 0.1, 0.03, 28), materials.darkMetal, "front-sprocket");
  frontSprocket.rotation.x = Math.PI / 2;
  frontSprocket.position.set(-0.28, 0.56, 0.25);
  assembly.add(frontSprocket);
  assembly.add(
    tubeBetween(new THREE.Vector3(-1.18, 0.67, 0.27), new THREE.Vector3(-0.28, 0.64, 0.27), 0.013, materials.steel, "chain-top", 8),
    tubeBetween(new THREE.Vector3(-1.18, 0.38, 0.27), new THREE.Vector3(-0.28, 0.48, 0.27), 0.013, materials.steel, "chain-bottom", 8),
  );

  const plateHolder = tubeBetween(new THREE.Vector3(-1.45, 1.23, 0), new THREE.Vector3(-1.68, 0.82, 0), 0.018, materials.black, "plate-holder", 10);
  assembly.add(plateHolder);
  const plate = namedMesh(new THREE.BoxGeometry(0.035, 0.19, 0.3), materials.black, "rear-number-plate");
  plate.position.set(-1.68, 0.77, 0);
  plate.rotation.z = -0.2;
  assembly.add(plate);
}

export function createDaytona660Model(): Daytona660Model {
  const materials = createMaterials();
  const root = new THREE.Group();
  root.name = "Daytona660-Merlot";
  root.userData.partRoot = true;
  root.userData.partLabel = "Triumph Daytona 660";

  const front = makeAssembly("front-assembly", "前輪、前叉與操控", [0.42, 0.12, 0]);
  const chassis = makeAssembly("chassis-assembly", "車架與冷卻系統", [0, 0.16, 0.34]);
  const powertrain = makeAssembly("powertrain-assembly", "三缸引擎與排氣", [0, -0.2, -0.34]);
  const bodywork = makeAssembly("bodywork-assembly", "Merlot 整流罩與座艙", [0, 0.42, 0]);
  const rear = makeAssembly("rear-assembly", "後搖臂與傳動", [-0.42, 0.1, 0]);
  const assemblies = [front, chassis, powertrain, bodywork, rear];

  addFrontAssembly(front.object, materials);
  addChassis(chassis.object, materials);
  addPowertrain(powertrain.object, materials);
  addBodywork(bodywork.object, materials);
  addRearAssembly(rear.object, materials);
  assemblies.forEach((assembly) => root.add(assembly.object));

  const footControls = new THREE.Group();
  footControls.name = "foot-controls";
  [-1, 1].forEach((side) => {
    footControls.add(tubeBetween(
      new THREE.Vector3(-0.25, 0.5, side * 0.33),
      new THREE.Vector3(-0.45, 0.4, side * 0.46),
      0.022,
      materials.cast,
      `footpeg-${side}`,
      10,
    ));
  });
  chassis.object.add(footControls);

  const nodes: Record<string, THREE.Object3D> = {};
  const meshes: Record<string, THREE.Mesh> = {};
  root.traverse((object) => {
    if (object.name) nodes[object.name] = object;
    if (object instanceof THREE.Mesh && object.name) meshes[object.name] = object;
  });
  root.userData.sculptRuntime = {
    source: "36-view Daytona660 turntable + real-photo material evidence",
    fidelityTarget: 0.78,
    nodes,
    meshes,
    sockets: {
      steering: nodes["steering-head"],
      rearAxle: nodes["rear-wheel-hub"],
    },
    destructionGroups: Object.fromEntries(assemblies.map((assembly) => [assembly.id, [assembly.object]])),
    limitations: [
      "Visual real-time reconstruction, not CAD/manufacturing geometry.",
      "Hidden engine internals and micro labels are intentionally approximate.",
    ],
  };
  return { root, assemblies };
}
