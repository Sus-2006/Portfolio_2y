import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CelestialBodyId, MapLayerState, PortfolioItem } from '../types/portfolio';
import { CRATER_REGIONS } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

interface SpaceCanvasProps {
  items: PortfolioItem[];
  activeBody: CelestialBodyId;
  selectedItem: PortfolioItem | null;
  mapLayers: MapLayerState;
  isPlayingTimeline: boolean;
  timelineSpeed: number;
  onSelectItem: (item: PortfolioItem | null) => void;
  onSelectBody: (body: CelestialBodyId) => void;
  onUpdateCoords?: (coords: { lat: number; lon: number; alt: number }) => void;
}

export const SpaceCanvas: React.FC<SpaceCanvasProps> = ({
  items,
  activeBody,
  selectedItem,
  mapLayers,
  isPlayingTimeline,
  timelineSpeed,
  onSelectItem,
  onSelectBody,
  onUpdateCoords
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<PortfolioItem | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  
  const moonMeshRef = useRef<THREE.Mesh | null>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const marsMeshRef = useRef<THREE.Mesh | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);

  // Group for markers and satellite trails
  const moonMarkersGroup = useRef<THREE.Group>(new THREE.Group());
  const earthMarkersGroup = useRef<THREE.Group>(new THREE.Group());
  const marsMarkersGroup = useRef<THREE.Group>(new THREE.Group());
  const satellitesGroup = useRef<THREE.Group>(new THREE.Group());

  // Mouse & Camera Interpolation Targets
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 11));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Raycaster
  const raycaster = useRef(new THREE.Raycaster());
  const interactiveObjects = useRef<THREE.Object3D[]>([]);

  // -------------------------------------------------------------
  // PROCEDURAL TEXTURE GENERATORS
  // -------------------------------------------------------------
  const createLunarTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Base Gray Lunar Regolith
    ctx.fillStyle = '#8a8e94';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise regolith grain
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 35;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
      data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
    }
    ctx.putImageData(imgData, 0, 0);

    // Paint Lunar Maria (Dark Basaltic Plains)
    const maria = [
      { x: 380, y: 220, rx: 140, ry: 90, opacity: 0.45 }, // Oceanus Procellarum
      { x: 550, y: 190, rx: 110, ry: 75, opacity: 0.5 },  // Mare Imbrium
      { x: 680, y: 230, rx: 90, ry: 65, opacity: 0.48 },  // Mare Tranquillitatis
      { x: 620, y: 280, rx: 60, ry: 50, opacity: 0.4 },   // Mare Serenitatis
      { x: 740, y: 300, rx: 50, ry: 40, opacity: 0.42 }   // Mare Fecunditatis
    ];

    maria.forEach(m => {
      const grad = ctx.createRadialGradient(m.x, m.y, 5, m.x, m.y, Math.max(m.rx, m.ry));
      grad.addColorStop(0, `rgba(45, 48, 55, ${m.opacity})`);
      grad.addColorStop(0.7, `rgba(60, 64, 72, ${m.opacity * 0.7})`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(m.x, m.y, m.rx, m.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Paint Craters & Ejection Rays (Tycho, Copernicus, Kepler)
    const craters = [
      { x: 480, y: 370, r: 18, name: 'Tycho', rays: true },
      { x: 440, y: 210, r: 14, name: 'Copernicus', rays: true },
      { x: 390, y: 220, r: 10, name: 'Kepler', rays: true },
      { x: 500, y: 490, r: 16, name: 'Shackleton', rays: false }
    ];

    craters.forEach(c => {
      // Ejection rays
      if (c.rays) {
        ctx.strokeStyle = 'rgba(230, 235, 245, 0.35)';
        ctx.lineWidth = 1.5;
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
          ctx.beginPath();
          ctx.moveTo(c.x, c.y);
          const rayLen = c.r * (4 + Math.random() * 6);
          ctx.lineTo(c.x + Math.cos(a) * rayLen, c.y + Math.sin(a) * rayLen);
          ctx.stroke();
        }
      }

      // Outer rim
      ctx.fillStyle = '#b0b5bd';
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r + 3, 0, Math.PI * 2);
      ctx.fill();

      // Shadowed interior
      ctx.fillStyle = '#3a3d42';
      ctx.beginPath();
      ctx.arc(c.x + 1, c.y + 1, c.r, 0, Math.PI * 2);
      ctx.fill();

      // Central peak
      ctx.fillStyle = '#d5d9e0';
      ctx.beginPath();
      ctx.arc(c.x, c.y, Math.max(2, c.r * 0.25), 0, Math.PI * 2);
      ctx.fill();
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  };

  const createEarthTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Oceans (Deep Blue Gradient)
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    oceanGrad.addColorStop(0, '#0c2445');
    oceanGrad.addColorStop(0.5, '#0e386e');
    oceanGrad.addColorStop(1, '#081d38');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Continents (Green / Olive / Tan)
    ctx.fillStyle = '#225e36';
    // North America
    ctx.beginPath();
    ctx.ellipse(220, 160, 100, 70, -0.2, 0, Math.PI * 2);
    ctx.fill();
    // South America
    ctx.fillStyle = '#1e522d';
    ctx.beginPath();
    ctx.ellipse(300, 320, 60, 100, 0.3, 0, Math.PI * 2);
    ctx.fill();
    // Eurasia / Africa
    ctx.fillStyle = '#2d6a3f';
    ctx.beginPath();
    ctx.ellipse(600, 180, 180, 110, 0.1, 0, Math.PI * 2);
    ctx.fill();
    // Africa
    ctx.fillStyle = '#a6824b'; // Sahara tan
    ctx.beginPath();
    ctx.ellipse(560, 270, 80, 100, 0, 0, Math.PI * 2);
    ctx.fill();

    // Polar Ice Caps
    ctx.fillStyle = '#eaf4fd';
    ctx.fillRect(0, 0, canvas.width, 30);
    ctx.fillRect(0, canvas.height - 25, canvas.width, 25);

    // Clouds (Semi-transparent white swirls)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.beginPath();
    ctx.ellipse(300, 140, 140, 30, 0.4, 0, Math.PI * 2);
    ctx.ellipse(650, 220, 200, 40, -0.2, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  const createMarsTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Iron Oxide Red Base
    ctx.fillStyle = '#b7410e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Darker basaltic regions (Syrtis Major)
    ctx.fillStyle = '#7a2807';
    ctx.beginPath();
    ctx.ellipse(650, 260, 120, 80, -0.3, 0, Math.PI * 2);
    ctx.ellipse(300, 200, 100, 60, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Valles Marineris Canyon Line
    ctx.strokeStyle = '#4a1502';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(350, 280);
    ctx.lineTo(520, 290);
    ctx.stroke();

    // Olympus Mons Volcanic Rim
    ctx.fillStyle = '#d45719';
    ctx.beginPath();
    ctx.arc(240, 220, 25, 0, Math.PI * 2);
    ctx.fill();

    // Polar Caps
    ctx.fillStyle = '#fcefe6';
    ctx.fillRect(0, 0, canvas.width, 35);
    ctx.fillRect(0, canvas.height - 30, canvas.width, 30);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  // Helper to convert Lat/Lon to 3D position vector on sphere
  const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
  };

  // -------------------------------------------------------------
  // INITIALIZE THREE.JS SCENE
  // -------------------------------------------------------------
  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03060c, 0.008);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 11);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x1a2638, 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8e7, 2.4);
    sunLight.position.set(40, 20, 30);
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Subtle Cyan Rim Fill Light
    const rimLight = new THREE.DirectionalLight(0x00f0ff, 0.6);
    rimLight.position.set(-30, -10, -20);
    scene.add(rimLight);

    // 5. Starfield Background
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 3500;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const r = 200 + Math.random() * 300;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const colorType = Math.random();
      if (colorType > 0.85) {
        starColors[i * 3] = 0.0; starColors[i * 3 + 1] = 0.94; starColors[i * 3 + 2] = 1.0; // Cyan
      } else if (colorType > 0.70) {
        starColors[i * 3] = 1.0; starColors[i * 3 + 1] = 0.72; starColors[i * 3 + 2] = 0.0; // Amber
      } else {
        starColors[i * 3] = 0.9; starColors[i * 3 + 1] = 0.95; starColors[i * 3 + 2] = 1.0; // White/Blue
      }
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starsMat = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // 6. CELESTIAL BODIES (Moon, Earth, Mars)
    // --- THE MOON ---
    const moonGeo = new THREE.SphereGeometry(4, 64, 64);
    const moonMat = new THREE.MeshStandardMaterial({
      map: createLunarTexture(),
      roughness: 0.85,
      metalness: 0.1
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(0, 0, 0);
    scene.add(moonMesh);
    moonMeshRef.current = moonMesh;
    moonMesh.add(moonMarkersGroup.current);

    // --- EARTH ---
    const earthGeo = new THREE.SphereGeometry(5, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: createEarthTexture(),
      roughness: 0.4,
      metalness: 0.2
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthMesh.position.set(38, 12, -45);
    scene.add(earthMesh);
    earthMeshRef.current = earthMesh;
    earthMesh.add(earthMarkersGroup.current);

    // Earth Atmosphere Glow Ring
    const atmosphereGeo = new THREE.SphereGeometry(5.25, 32, 32);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide
    });
    const earthGlow = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    earthMesh.add(earthGlow);

    // --- MARS ---
    const marsGeo = new THREE.SphereGeometry(4.2, 64, 64);
    const marsMat = new THREE.MeshStandardMaterial({
      map: createMarsTexture(),
      roughness: 0.75,
      metalness: 0.15
    });
    const marsMesh = new THREE.Mesh(marsGeo, marsMat);
    marsMesh.position.set(-38, -15, -55);
    scene.add(marsMesh);
    marsMeshRef.current = marsMesh;
    marsMesh.add(marsMarkersGroup.current);

    // Mars Atmosphere Glow
    const marsGlowGeo = new THREE.SphereGeometry(4.4, 32, 32);
    const marsGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffb703,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    marsMesh.add(new THREE.Mesh(marsGlowGeo, marsGlowMat));

    // 7. ORBITAL SATELLITE RINGS & SATELLITES
    const orbitRingGeo1 = new THREE.RingGeometry(5.5, 5.54, 128);
    const orbitRingMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    const orbitRing1 = new THREE.Mesh(orbitRingGeo1, orbitRingMat1);
    orbitRing1.rotation.x = Math.PI / 2.5;
    orbitRing1.rotation.y = 0.2;
    moonMesh.add(orbitRing1);
    satellitesGroup.current.add(orbitRing1);

    // Satellite Probes
    const satGeo = new THREE.BoxGeometry(0.15, 0.15, 0.25);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xffb703 });
    const satMesh = new THREE.Mesh(satGeo, satMat);
    satMesh.position.set(5.5, 0, 0);
    orbitRing1.add(satMesh);

    // 8. EVENT LISTENERS
    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mousePos.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1
      };
      setTooltipPos({ x: e.clientX, y: e.clientY });
    };

    const handleWindowResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleWindowResize);

    // 9. ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Rotation of bodies (if timeline is playing)
      const rotSpeed = isPlayingTimeline ? timelineSpeed * 0.08 : 0.02;
      if (moonMeshRef.current) moonMeshRef.current.rotation.y += rotSpeed * delta;
      if (earthMeshRef.current) earthMeshRef.current.rotation.y += (rotSpeed * 1.2) * delta;
      if (marsMeshRef.current) marsMeshRef.current.rotation.y += (rotSpeed * 0.9) * delta;

      // Rotate Satellite in orbit
      if (orbitRing1) orbitRing1.rotation.z += 0.5 * delta;

      // Mouse Parallax & Smooth Camera Interpolation
      if (cameraRef.current) {
        const parallaxX = mousePos.current.x * 0.6;
        const parallaxY = mousePos.current.y * 0.6;
        
        const finalCamPos = new THREE.Vector3().copy(targetCameraPos.current);
        finalCamPos.x += parallaxX;
        finalCamPos.y += parallaxY;

        cameraRef.current.position.lerp(finalCamPos, 0.05);
        currentLookAt.current.lerp(targetLookAt.current, 0.05);
        cameraRef.current.lookAt(currentLookAt.current);
      }

      // Raycasting for Hover Detection
      if (cameraRef.current && interactiveObjects.current.length > 0) {
        const mouseVec = new THREE.Vector2(mousePos.current.x, mousePos.current.y);
        raycaster.current.setFromCamera(mouseVec, cameraRef.current);
        const intersects = raycaster.current.intersectObjects(interactiveObjects.current, true);

        if (intersects.length > 0) {
          let topObj: THREE.Object3D | null = intersects[0].object;
          while (topObj && !topObj.userData?.item && topObj.parent) {
            topObj = topObj.parent;
          }
          if (topObj && topObj.userData?.item) {
            const item = topObj.userData.item as PortfolioItem;
            if (hoveredItem?.id !== item.id) {
              setHoveredItem(item);
              soundManager.playHover();
            }
          }
        } else {
          if (hoveredItem !== null) setHoveredItem(null);
        }
      }

      // Render
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleWindowResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
    };
  }, []);

  // -------------------------------------------------------------
  // REBUILD SURFACE MARKERS BASED ON PORTFOLIO ITEMS & MAP LAYERS
  // -------------------------------------------------------------
  useEffect(() => {
    // Clear previous markers
    const clearGroup = (group: THREE.Group) => {
      while (group.children.length > 0) {
        const child = group.children[0];
        group.remove(child);
      }
    };

    clearGroup(moonMarkersGroup.current);
    clearGroup(earthMarkersGroup.current);
    clearGroup(marsMarkersGroup.current);
    interactiveObjects.current = [];

    // Filter items based on Map Layers
    const filteredItems = items.filter(item => {
      if (item.status === 'COMPLETED' && !mapLayers.completedProjects) return false;
      if (item.status === 'ACTIVE DEVELOPMENT' && !mapLayers.activeProjects) return false;
      if (item.status === 'FUTURE ASPIRATION' && !mapLayers.futureMissions) return false;
      if (item.status === 'RESEARCH' && !mapLayers.researchNodes) return false;
      return true;
    });

    filteredItems.forEach(item => {
      let targetGroup: THREE.Group;
      let radius: number;

      if (item.body === 'moon') {
        targetGroup = moonMarkersGroup.current;
        radius = 4.02;
      } else if (item.body === 'earth') {
        targetGroup = earthMarkersGroup.current;
        radius = 5.02;
      } else {
        targetGroup = marsMarkersGroup.current;
        radius = 4.22;
      }

      const pos = latLonToVector3(item.location.lat, item.location.lon, radius);

      // Marker Container Object3D
      const markerObj = new THREE.Group();
      markerObj.position.copy(pos);
      markerObj.lookAt(pos.clone().multiplyScalar(2)); // Point outward from center
      markerObj.userData = { item };

      // Outer Glowing Ring
      const ringGeo = new THREE.RingGeometry(0.14, 0.22, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(item.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      markerObj.add(ringMesh);

      // Center Core Dot Sphere
      const dotGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(item.color) });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      markerObj.add(dotMesh);

      // Vertical Signal Telemetry Beam Line
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0.8)
      ]);
      const lineMat = new THREE.LineBasicMaterial({ color: new THREE.Color(item.color), transparent: true, opacity: 0.6 });
      const lineMesh = new THREE.Line(lineGeo, lineMat);
      markerObj.add(lineMesh);

      targetGroup.add(markerObj);
      interactiveObjects.current.push(markerObj);
    });

    // Add Crater Region Label Markers on Moon
    CRATER_REGIONS.forEach(crater => {
      const [latStr, lonStr] = crater.coords.split(' ');
      const lat = parseFloat(latStr);
      const lon = parseFloat(lonStr) * (lonStr.includes('W') ? -1 : 1);
      const pos = latLonToVector3(lat, lon, 4.05);

      const craterMarker = new THREE.Group();
      craterMarker.position.copy(pos);
      craterMarker.lookAt(pos.clone().multiplyScalar(2));

      // Dotted Rim Circle
      const rimGeo = new THREE.RingGeometry(0.35, 0.38, 24);
      const rimMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
      });
      craterMarker.add(new THREE.Mesh(rimGeo, rimMat));
      moonMarkersGroup.current.add(craterMarker);
    });
  }, [items, mapLayers]);

  // -------------------------------------------------------------
  // CAMERA FOCUS & CELESTIAL NAVIGATION LOGIC
  // -------------------------------------------------------------
  useEffect(() => {
    soundManager.playPlanetShift();

    if (selectedItem) {
      // Focus Camera on Selected Item
      let bodyPos = new THREE.Vector3(0, 0, 0);
      let radius = 4;
      if (selectedItem.body === 'earth') {
        bodyPos = new THREE.Vector3(38, 12, -45);
        radius = 5;
      } else if (selectedItem.body === 'mars') {
        bodyPos = new THREE.Vector3(-38, -15, -55);
        radius = 4.2;
      }

      const itemLocalPos = latLonToVector3(selectedItem.location.lat, selectedItem.location.lon, radius);
      const itemWorldPos = bodyPos.clone().add(itemLocalPos);

      // Camera positioned slightly offset from marker
      const camOffset = itemLocalPos.clone().normalize().multiplyScalar(6.5);
      targetCameraPos.current.copy(bodyPos.clone().add(camOffset));
      targetLookAt.current.copy(itemWorldPos);

      if (onUpdateCoords) {
        onUpdateCoords({
          lat: selectedItem.location.lat,
          lon: selectedItem.location.lon,
          alt: 118
        });
      }
    } else {
      // Focus on active celestial body or overview
      if (activeBody === 'moon') {
        targetCameraPos.current.set(0, 0, 11);
        targetLookAt.current.set(0, 0, 0);
      } else if (activeBody === 'earth') {
        targetCameraPos.current.set(38, 12, -31);
        targetLookAt.current.set(38, 12, -45);
      } else if (activeBody === 'mars') {
        targetCameraPos.current.set(-38, -15, -41);
        targetLookAt.current.set(-38, -15, -55);
      }
    }
  }, [activeBody, selectedItem, onUpdateCoords]);

  // Handle Canvas Click to Select Item
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!cameraRef.current || interactiveObjects.current.length === 0) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.current.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);
    const intersects = raycaster.current.intersectObjects(interactiveObjects.current, true);

    if (intersects.length > 0) {
      let topObj: THREE.Object3D | null = intersects[0].object;
      while (topObj && !topObj.userData?.item && topObj.parent) {
        topObj = topObj.parent;
      }
      if (topObj && topObj.userData?.item) {
        const item = topObj.userData.item as PortfolioItem;
        soundManager.playClick();
        onSelectItem(item);
      }
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full cursor-crosshair overflow-hidden"
      onClick={handleCanvasClick}
    >
      {/* Dynamic Hover Tooltip HUD */}
      {hoveredItem && (
        <div 
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-12"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <div className="hud-panel p-3 text-xs rounded border border-cyan-400/50 bg-slate-950/90 shadow-2xl backdrop-blur-md">
            <div className="hud-panel-corner hud-corner-tl" />
            <div className="hud-panel-corner hud-corner-tr" />
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: hoveredItem.color }} />
              <span className="font-display font-bold uppercase tracking-widest text-[10px]" style={{ color: hoveredItem.color }}>
                {hoveredItem.category}
              </span>
            </div>
            <div className="font-mono text-sm font-semibold text-slate-100 mb-1">
              {hoveredItem.title}
            </div>
            <div className="text-[10px] text-slate-400 flex items-center justify-between gap-4">
              <span>LAT: {hoveredItem.location.lat}°</span>
              <span>LON: {hoveredItem.location.lon}°</span>
              <span className="text-cyan-400 uppercase font-bold">{hoveredItem.status}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
