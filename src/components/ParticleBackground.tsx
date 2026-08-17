import { useEffect, useRef } from "react";
import * as THREE from "three";

const SECTION_MAP: Record<string, string> = {
  home: "neural",
  about: "globe",
  experience: "nodes",
  projects: "none",
  certifications: "datastream",
  contact: "ai",
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ========================
    // PERSISTENT: Constellation Stars
    // ========================
    const CONSTELLATION_COUNT = 35;
    const cPositions = new Float32Array(CONSTELLATION_COUNT * 3);
    const cVelocities = new Float32Array(CONSTELLATION_COUNT * 3);
    for (let i = 0; i < CONSTELLATION_COUNT; i++) {
      cPositions[i * 3] = (Math.random() - 0.5) * 70;
      cPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      cPositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.015 + Math.random() * 0.02;
      cVelocities[i * 3] = Math.cos(angle) * speed;
      cVelocities[i * 3 + 1] = Math.sin(angle) * speed;
      cVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    const cGeometry = new THREE.BufferGeometry();
    cGeometry.setAttribute("position", new THREE.BufferAttribute(cPositions, 3));
    const cMaterial = new THREE.PointsMaterial({
      color: 0x39ff14, size: 0.18, transparent: true, opacity: 0.8,
      sizeAttenuation: true, blending: THREE.AdditiveBlending,
    });
    const constellation = new THREE.Points(cGeometry, cMaterial);
    scene.add(constellation);

    const MAX_LINE_PAIRS = 25;
    const linePositionsArr = new Float32Array(MAX_LINE_PAIRS * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositionsArr, 3));
    lineGeometry.setDrawRange(0, 0);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0.1 });
    const constellationLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(constellationLines);

    const PAIR_CANDIDATES: [number, number][] = [];
    for (let i = 0; i < CONSTELLATION_COUNT; i++)
      for (let j = i + 1; j < CONSTELLATION_COUNT; j++) PAIR_CANDIDATES.push([i, j]);

    // ========================
    // PERSISTENT: Dust
    // ========================
    const DUST_COUNT = 500;
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    const dustVelocities = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 80;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      dustVelocities[i * 3] = (Math.random() - 0.5) * 0.005;
      dustVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      dustVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: 0xffffff, size: 0.04, transparent: true, opacity: 0.3,
      sizeAttenuation: true, blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(dustGeometry, dustMaterial));

    // ========================
    // FEATURED: Neural Network (hero)
    // ========================
    const nnGroup = new THREE.Group();
    nnGroup.position.set(-16, 5, -18);
    const NN_NODES = 18;
    const nnPos = new Float32Array(NN_NODES * 3);
    const nnVel = new Float32Array(NN_NODES * 3);
    for (let i = 0; i < NN_NODES; i++) {
      nnPos[i * 3] = (Math.random() - 0.5) * 8;
      nnPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      nnPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      nnVel[i * 3] = (Math.random() - 0.5) * 0.006;
      nnVel[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
      nnVel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    const nnGeo = new THREE.BufferGeometry();
    nnGeo.setAttribute("position", new THREE.BufferAttribute(nnPos, 3));
    const nnPtsMat = new THREE.PointsMaterial({
      color: 0x39ff14, size: 0.12, transparent: true, opacity: 0.7,
      sizeAttenuation: true, blending: THREE.AdditiveBlending,
    });
    nnGroup.add(new THREE.Points(nnGeo, nnPtsMat));
    const nnLinePos = new Float32Array(NN_NODES * NN_NODES * 6);
    const nnLineGeo = new THREE.BufferGeometry();
    nnLineGeo.setAttribute("position", new THREE.BufferAttribute(nnLinePos, 3));
    nnLineGeo.setDrawRange(0, 0);
    const nnLineMat = new THREE.LineBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0.06 });
    nnGroup.add(new THREE.LineSegments(nnLineGeo, nnLineMat));
    scene.add(nnGroup);

    // ========================
    // FEATURED: Wireframe Globe (about)
    // ========================
    const globeGroup = new THREE.Group();
    globeGroup.position.set(14, -2, -22);
    for (let i = 1; i < 7; i++) {
      const r = Math.cos((i / 7) * Math.PI - Math.PI / 2) * 8;
      const y = Math.sin((i / 7) * Math.PI - Math.PI / 2) * 8;
      const geo = new THREE.RingGeometry(r - 0.02, r + 0.02, 64);
      const mat = new THREE.MeshBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0.06, side: THREE.DoubleSide });
      const m = new THREE.Mesh(geo, mat);
      m.position.y = y;
      m.rotation.x = Math.PI / 2;
      globeGroup.add(m);
    }
    for (let i = 0; i < 6; i++) {
      const curve = new THREE.EllipseCurve(0, 0, 8, 8, 0, Math.PI * 2, false, 0);
      const pts = curve.getPoints(64);
      const geo = new THREE.BufferGeometry().setFromPoints(pts.map((p) => new THREE.Vector3(0, p.y, p.x)));
      const mat = new THREE.LineBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0.05 });
      const l = new THREE.Line(geo, mat);
      l.rotation.y = (i / 6) * Math.PI;
      globeGroup.add(l);
    }
    scene.add(globeGroup);

    // ========================
    // FEATURED: Connected Nodes Graph (experience)
    // ========================
    const graphGroup = new THREE.Group();
    graphGroup.position.set(-12, -10, -16);
    const GRAPH_NODES = 12;
    const gPos = new Float32Array(GRAPH_NODES * 3);
    const gVel = new Float32Array(GRAPH_NODES * 3);
    for (let i = 0; i < GRAPH_NODES; i++) {
      gPos[i * 3] = (Math.random() - 0.5) * 12;
      gPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      gPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      gVel[i * 3] = (Math.random() - 0.5) * 0.004;
      gVel[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      gVel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    const gGeo = new THREE.BufferGeometry();
    gGeo.setAttribute("position", new THREE.BufferAttribute(gPos, 3));
    const gPtsMat = new THREE.PointsMaterial({
      color: 0x00f0ff, size: 0.15, transparent: true, opacity: 0.7,
      sizeAttenuation: true, blending: THREE.AdditiveBlending,
    });
    graphGroup.add(new THREE.Points(gGeo, gPtsMat));
    const gLinePos = new Float32Array(GRAPH_NODES * GRAPH_NODES * 6);
    const gLineGeo = new THREE.BufferGeometry();
    gLineGeo.setAttribute("position", new THREE.BufferAttribute(gLinePos, 3));
    gLineGeo.setDrawRange(0, 0);
    const gLineMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.06 });
    graphGroup.add(new THREE.LineSegments(gLineGeo, gLineMat));
    scene.add(graphGroup);

    // ========================
    // FEATURED: Data Stream (certifications)
    // ========================
    const streamGroup = new THREE.Group();
    streamGroup.position.set(0, 0, -18);
    const STREAM_COUNT = 80;
    const sPos = new Float32Array(STREAM_COUNT * 3);
    const sVel = new Float32Array(STREAM_COUNT);
    for (let i = 0; i < STREAM_COUNT; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 40;
      sPos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sVel[i] = 0.03 + Math.random() * 0.05;
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    const sMat = new THREE.PointsMaterial({
      color: 0x39ff14, size: 0.06, transparent: true, opacity: 0.6,
      sizeAttenuation: true, blending: THREE.AdditiveBlending,
    });
    streamGroup.add(new THREE.Points(sGeo, sMat));
    scene.add(streamGroup);

    // ========================
    // FEATURED: AI Brain (contact)
    // ========================
    const aiGroup = new THREE.Group();
    aiGroup.position.set(0, 0, -20);
    const AI_NODES = 24;
    const aiPos = new Float32Array(AI_NODES * 3);
    const aiVel = new Float32Array(AI_NODES * 3);
    for (let i = 0; i < AI_NODES; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 2;
      aiPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      aiPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      aiPos[i * 3 + 2] = r * Math.cos(phi);
      aiVel[i * 3] = (Math.random() - 0.5) * 0.003;
      aiVel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      aiVel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    const aiGeo = new THREE.BufferGeometry();
    aiGeo.setAttribute("position", new THREE.BufferAttribute(aiPos, 3));
    const aiPtsMat = new THREE.PointsMaterial({
      color: 0x00f0ff, size: 0.1, transparent: true, opacity: 0.8,
      sizeAttenuation: true, blending: THREE.AdditiveBlending,
    });
    aiGroup.add(new THREE.Points(aiGeo, aiPtsMat));
    // AI core
    const aiCoreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const aiCoreMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.1,
    });
    aiGroup.add(new THREE.Mesh(aiCoreGeo, aiCoreMat));
    // AI lines
    const aiLinePos = new Float32Array(AI_NODES * AI_NODES * 6);
    const aiLineGeo = new THREE.BufferGeometry();
    aiLineGeo.setAttribute("position", new THREE.BufferAttribute(aiLinePos, 3));
    aiLineGeo.setDrawRange(0, 0);
    const aiLineMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.05 });
    aiGroup.add(new THREE.LineSegments(aiLineGeo, aiLineMat));
    scene.add(aiGroup);

    // ========================
    // VISIBILITY
    // ========================
    const featuredGroups = [nnGroup, globeGroup, graphGroup, streamGroup, aiGroup];
    const featuredNames = ["neural", "globe", "nodes", "datastream", "ai"];
    const featureOpacity = featuredNames.map(() => 0);

    let currentSection = "home";
    function getActive(): string {
      return SECTION_MAP[currentSection] || "neural";
    }

    const onSectionChange = (e: Event) => {
      currentSection = (e as CustomEvent).detail;
    };
    window.addEventListener("section-change", onSectionChange);

    // ========================
    // MOUSE + RESIZE
    // ========================
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ========================
    // ANIMATE
    // ========================
    let raf: number;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const active = getActive();

      // Update featured opacity
      for (let i = 0; i < featuredNames.length; i++) {
        const target = featuredNames[i] === active ? 1 : 0;
        featureOpacity[i] = lerp(featureOpacity[i], target, 0.03);
        featuredGroups[i].visible = featureOpacity[i] > 0.01;
        featuredGroups[i].traverse((child) => {
          if (child instanceof THREE.Points || child instanceof THREE.Mesh || child instanceof THREE.Line) {
            const m = child.material as THREE.Material;
            if ("opacity" in m) {
              const base = (child.userData as any)._baseOpacity ?? (m as any).opacity;
              if (!(child.userData as any)._baseOpacity) (child.userData as any)._baseOpacity = (m as any).opacity;
              (m as any).opacity = base * featureOpacity[i];
            }
          }
        });
      }

      // Globe rotation
      globeGroup.rotation.y += 0.0008 * featureOpacity[1];
      globeGroup.rotation.x += 0.0003 * featureOpacity[1];

      // Data stream fall
      const sP = sGeo.attributes.position;
      for (let i = 0; i < STREAM_COUNT; i++) {
        sP.array[i * 3 + 1] -= sVel[i];
        if (sP.array[i * 3 + 1] < -20) {
          sP.array[i * 3 + 1] = 20;
          sP.array[i * 3] = (Math.random() - 0.5) * 40;
        }
      }
      sP.needsUpdate = true;

      // AI brain drift
      const aP = aiGeo.attributes.position;
      for (let i = 0; i < AI_NODES; i++) {
        aP.array[i * 3] += aiVel[i * 3];
        aP.array[i * 3 + 1] += aiVel[i * 3 + 1];
        aP.array[i * 3 + 2] += aiVel[i * 3 + 2];
        if (Math.abs(aP.array[i * 3]) > 7) aiVel[i * 3] *= -1;
        if (Math.abs(aP.array[i * 3 + 1]) > 7) aiVel[i * 3 + 1] *= -1;
        if (Math.abs(aP.array[i * 3 + 2]) > 7) aiVel[i * 3 + 2] *= -1;
      }
      aP.needsUpdate = true;
      // AI lines
      let aiLineIdx = 0;
      const aiMaxDist = 5;
      const aiMaxDistSq = aiMaxDist * aiMaxDist;
      for (let i = 0; i < AI_NODES && aiLineIdx < AI_NODES * AI_NODES; i++) {
        for (let j = i + 1; j < AI_NODES && aiLineIdx < AI_NODES * AI_NODES; j++) {
          const dx = aP.array[i * 3] - aP.array[j * 3];
          const dy = aP.array[i * 3 + 1] - aP.array[j * 3 + 1];
          const dz = aP.array[i * 3 + 2] - aP.array[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < aiMaxDistSq) {
            const li = aiLineIdx * 6;
            aiLinePos[li] = aP.array[i * 3]; aiLinePos[li + 1] = aP.array[i * 3 + 1]; aiLinePos[li + 2] = aP.array[i * 3 + 2];
            aiLinePos[li + 3] = aP.array[j * 3]; aiLinePos[li + 4] = aP.array[j * 3 + 1]; aiLinePos[li + 5] = aP.array[j * 3 + 2];
            aiLineIdx++;
          }
        }
      }
      aiLineGeo.attributes.position.needsUpdate = true;
      aiLineGeo.setDrawRange(0, aiLineIdx * 2);
      aiGroup.rotation.y += 0.0004;

      // Neural network
      const nP = nnGeo.attributes.position;
      for (let i = 0; i < NN_NODES; i++) {
        nP.array[i * 3] += nnVel[i * 3];
        nP.array[i * 3 + 1] += nnVel[i * 3 + 1];
        nP.array[i * 3 + 2] += nnVel[i * 3 + 2];
        if (Math.abs(nP.array[i * 3]) > 4.5) nnVel[i * 3] *= -1;
        if (Math.abs(nP.array[i * 3 + 1]) > 4.5) nnVel[i * 3 + 1] *= -1;
        if (Math.abs(nP.array[i * 3 + 2]) > 2.5) nnVel[i * 3 + 2] *= -1;
      }
      nP.needsUpdate = true;
      let nnLineIdx = 0;
      for (let i = 0; i < NN_NODES && nnLineIdx < NN_NODES * NN_NODES; i++) {
        for (let j = i + 1; j < NN_NODES && nnLineIdx < NN_NODES * NN_NODES; j++) {
          const dx = nP.array[i * 3] - nP.array[j * 3];
          const dy = nP.array[i * 3 + 1] - nP.array[j * 3 + 1];
          const dz = nP.array[i * 3 + 2] - nP.array[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < 25) {
            const li = nnLineIdx * 6;
            nnLinePos[li] = nP.array[i * 3]; nnLinePos[li + 1] = nP.array[i * 3 + 1]; nnLinePos[li + 2] = nP.array[i * 3 + 2];
            nnLinePos[li + 3] = nP.array[j * 3]; nnLinePos[li + 4] = nP.array[j * 3 + 1]; nnLinePos[li + 5] = nP.array[j * 3 + 2];
            nnLineIdx++;
          }
        }
      }
      nnLineGeo.attributes.position.needsUpdate = true;
      nnLineGeo.setDrawRange(0, nnLineIdx * 2);

      // Graph nodes
      const grP = gGeo.attributes.position;
      for (let i = 0; i < GRAPH_NODES; i++) {
        grP.array[i * 3] += gVel[i * 3];
        grP.array[i * 3 + 1] += gVel[i * 3 + 1];
        grP.array[i * 3 + 2] += gVel[i * 3 + 2];
        if (Math.abs(grP.array[i * 3]) > 6.5) gVel[i * 3] *= -1;
        if (Math.abs(grP.array[i * 3 + 1]) > 4.5) gVel[i * 3 + 1] *= -1;
        if (Math.abs(grP.array[i * 3 + 2]) > 2.5) gVel[i * 3 + 2] *= -1;
      }
      grP.needsUpdate = true;
      let grLineIdx = 0;
      for (let i = 0; i < GRAPH_NODES && grLineIdx < GRAPH_NODES * GRAPH_NODES; i++) {
        for (let j = i + 1; j < GRAPH_NODES && grLineIdx < GRAPH_NODES * GRAPH_NODES; j++) {
          const dx = grP.array[i * 3] - grP.array[j * 3];
          const dy = grP.array[i * 3 + 1] - grP.array[j * 3 + 1];
          const dz = grP.array[i * 3 + 2] - grP.array[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < 49) {
            const li = grLineIdx * 6;
            gLinePos[li] = grP.array[i * 3]; gLinePos[li + 1] = grP.array[i * 3 + 1]; gLinePos[li + 2] = grP.array[i * 3 + 2];
            gLinePos[li + 3] = grP.array[j * 3]; gLinePos[li + 4] = grP.array[j * 3 + 1]; gLinePos[li + 5] = grP.array[j * 3 + 2];
            grLineIdx++;
          }
        }
      }
      gLineGeo.attributes.position.needsUpdate = true;
      gLineGeo.setDrawRange(0, grLineIdx * 2);

      // Constellation stars drift
      const cP = cGeometry.attributes.position;
      for (let i = 0; i < CONSTELLATION_COUNT; i++) {
        cVelocities[i * 3] += (Math.random() - 0.5) * 0.001;
        cVelocities[i * 3 + 1] += (Math.random() - 0.5) * 0.001;
        cVelocities[i * 3 + 2] += (Math.random() - 0.5) * 0.0005;
        const vx = cVelocities[i * 3], vy = cVelocities[i * 3 + 1];
        const sp = Math.sqrt(vx * vx + vy * vy);
        if (sp > 0.04) { cVelocities[i * 3] = (vx / sp) * 0.04; cVelocities[i * 3 + 1] = (vy / sp) * 0.04; }
        cP.array[i * 3] += cVelocities[i * 3];
        cP.array[i * 3 + 1] += cVelocities[i * 3 + 1];
        cP.array[i * 3 + 2] += cVelocities[i * 3 + 2];
        if (Math.abs(cP.array[i * 3]) > 38) cVelocities[i * 3] *= -1;
        if (Math.abs(cP.array[i * 3 + 1]) > 32) cVelocities[i * 3 + 1] *= -1;
        if (Math.abs(cP.array[i * 3 + 2]) > 18) cVelocities[i * 3 + 2] *= -1;
      }
      cP.needsUpdate = true;

      // Constellation lines
      let lineIdx = 0;
      const scored = PAIR_CANDIDATES.map(([a, b]) => {
        const dx = cP.array[a * 3] - cP.array[b * 3];
        const dy = cP.array[a * 3 + 1] - cP.array[b * 3 + 1];
        const dz = cP.array[a * 3 + 2] - cP.array[b * 3 + 2];
        return { a, b, dist: dx * dx + dy * dy + dz * dz };
      }).sort((x, y) => x.dist - y.dist);
      for (const { a, b, dist } of scored) {
        if (lineIdx >= MAX_LINE_PAIRS || dist > 400) break;
        const li = lineIdx * 6;
        linePositionsArr[li] = cP.array[a * 3]; linePositionsArr[li + 1] = cP.array[a * 3 + 1]; linePositionsArr[li + 2] = cP.array[a * 3 + 2];
        linePositionsArr[li + 3] = cP.array[b * 3]; linePositionsArr[li + 4] = cP.array[b * 3 + 1]; linePositionsArr[li + 5] = cP.array[b * 3 + 2];
        lineIdx++;
      }
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIdx * 2);

      // Dust drift
      const dP = dustGeometry.attributes.position;
      for (let i = 0; i < DUST_COUNT; i++) {
        dP.array[i * 3] += dustVelocities[i * 3];
        dP.array[i * 3 + 1] += dustVelocities[i * 3 + 1];
        dP.array[i * 3 + 2] += dustVelocities[i * 3 + 2];
        if (Math.abs(dP.array[i * 3]) > 42) dustVelocities[i * 3] *= -1;
        if (Math.abs(dP.array[i * 3 + 1]) > 42) dustVelocities[i * 3 + 1] *= -1;
        if (Math.abs(dP.array[i * 3 + 2]) > 22) dustVelocities[i * 3 + 2] *= -1;
      }
      dP.needsUpdate = true;

      // Mouse parallax
      camera.position.x += (mouseX * 4 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("section-change", onSectionChange);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
