import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const routePositions = [
  [-2.7, 0.75, 0.1],
  [-1.8, 1.18, 0.22],
  [-0.75, 0.62, 0.12],
  [0.15, -0.28, 0.28],
  [1.2, 0.18, 0.12],
  [2.15, -0.75, 0.24],
  [2.85, -0.25, 0.08],
] as const;

type HeroTelemetrySceneProps = {
  onUnavailable: () => void;
};

export default function HeroTelemetryScene({ onUnavailable }: HeroTelemetrySceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
    } catch {
      onUnavailable();
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100);
    camera.position.set(0, 0, 7.6);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.dataset.scene = 'hero-telemetry';
    mount.appendChild(renderer.domElement);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    const makeMeshMaterial = (color: number, opacity: number) => {
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        depthWrite: false,
      });
      materials.push(material);
      return material;
    };

    const routePoints = routePositions.map(([x, y, z]) => new THREE.Vector3(x, y, z));
    const curve = new THREE.CatmullRomCurve3(routePoints, false, 'catmullrom', 0.32);
    const routeGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(96));
    const routeMaterial = new THREE.LineBasicMaterial({
      color: 0x4fc7d8,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
    });
    geometries.push(routeGeometry);
    materials.push(routeMaterial);
    systemGroup.add(new THREE.Line(routeGeometry, routeMaterial));

    const nodeMaterial = makeMeshMaterial(0xc64e1c, 0.9);
    const finalNodeMaterial = makeMeshMaterial(0x5fd8e6, 0.92);
    routePoints.forEach((point, index) => {
      const geometry = new THREE.IcosahedronGeometry(index === routePoints.length - 1 ? 0.095 : 0.07, 1);
      geometries.push(geometry);
      const node = new THREE.Mesh(
        geometry,
        index === routePoints.length - 1 ? finalNodeMaterial : nodeMaterial,
      );
      node.position.copy(point);
      systemGroup.add(node);
    });

    const pulseGeometry = new THREE.SphereGeometry(0.075, 14, 14);
    geometries.push(pulseGeometry);
    const warmPulse = new THREE.Mesh(pulseGeometry, makeMeshMaterial(0xe47d28, 0.98));
    const coolPulse = new THREE.Mesh(pulseGeometry, makeMeshMaterial(0x65dce8, 0.94));
    systemGroup.add(warmPulse, coolPulse);

    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(78 * 3);
    let seed = 37;
    const random = () => {
      const value = Math.sin(seed * 12.9898) * 43758.5453;
      seed += 1;
      return value - Math.floor(value);
    };
    for (let index = 0; index < particlePositions.length; index += 3) {
      particlePositions[index] = (random() - 0.5) * 7.2;
      particlePositions[index + 1] = (random() - 0.5) * 4.8;
      particlePositions[index + 2] = -0.4 - random() * 2.4;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x69d5df,
      size: 0.036,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
      sizeAttenuation: true,
    });
    geometries.push(particleGeometry);
    materials.push(particleMaterial);
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const grid = new THREE.GridHelper(10, 20, 0x31555b, 0x252b2e);
    grid.rotation.x = Math.PI / 2;
    grid.position.z = -2.2;
    const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.16;
      material.depthWrite = false;
      materials.push(material);
    });
    geometries.push(grid.geometry);
    scene.add(grid);

    const haloGeometry = new THREE.TorusGeometry(1.15, 0.012, 8, 84);
    geometries.push(haloGeometry);
    const warmHalo = new THREE.Mesh(haloGeometry, makeMeshMaterial(0xc64e1c, 0.22));
    warmHalo.position.set(-2.25, -0.28, -0.35);
    warmHalo.rotation.z = -0.28;
    systemGroup.add(warmHalo);

    const coolHaloGeometry = new THREE.TorusGeometry(1.55, 0.009, 8, 96);
    geometries.push(coolHaloGeometry);
    const coolHalo = new THREE.Mesh(coolHaloGeometry, makeMeshMaterial(0x5fd8e6, 0.18));
    coolHalo.position.set(1.55, 0.2, -0.55);
    coolHalo.rotation.z = 0.42;
    systemGroup.add(coolHalo);

    let visible = true;
    let inViewport = true;
    let failed = false;
    let targetRotationX = 0;
    let targetRotationY = 0;
    const warmPoint = new THREE.Vector3();
    const coolPoint = new THREE.Vector3();

    const stopWithFallback = () => {
      if (failed) return;
      failed = true;
      renderer.setAnimationLoop(null);
      onUnavailable();
    };

    const renderFrame = (time = 0) => {
      if (failed) return;
      try {
        const progress = (time * 0.000085) % 1;
        curve.getPointAt(progress, warmPoint);
        curve.getPointAt((progress + 0.46) % 1, coolPoint);
        warmPulse.position.copy(warmPoint);
        coolPulse.position.copy(coolPoint);
        warmPulse.scale.setScalar(0.82 + Math.sin(time * 0.006) * 0.18);
        coolPulse.scale.setScalar(0.88 + Math.cos(time * 0.005) * 0.15);
        particles.rotation.z = time * 0.000018;
        warmHalo.rotation.z = -0.28 + time * 0.000035;
        coolHalo.rotation.z = 0.42 - time * 0.000025;
        systemGroup.rotation.x += (targetRotationX - systemGroup.rotation.x) * 0.035;
        systemGroup.rotation.y += (targetRotationY - systemGroup.rotation.y) * 0.035;
        renderer.render(scene, camera);
      } catch {
        stopWithFallback();
      }
    };

    const syncAnimationLoop = () => {
      renderer.setAnimationLoop(visible && inViewport && !failed ? renderFrame : null);
      if (visible && inViewport && !failed) renderFrame(performance.now());
    };

    const resize = () => {
      try {
        const rect = mount.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const pixelCap = 900000;
        const scale = Math.min(dpr, Math.sqrt(pixelCap / (width * height)));
        renderer.setPixelRatio(scale);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderFrame(performance.now());
      } catch {
        stopWithFallback();
      }
    };

    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize);
    if (resizeObserver) resizeObserver.observe(mount);
    else window.addEventListener('resize', resize);

    const intersectionObserver = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      inViewport = Boolean(entry?.isIntersecting);
      syncAnimationLoop();
    });
    intersectionObserver?.observe(mount);

    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
      syncAnimationLoop();
    };
    const onPointerMove = (event: PointerEvent) => {
      targetRotationY = ((event.clientX / window.innerWidth) - 0.5) * 0.12;
      targetRotationX = ((event.clientY / window.innerHeight) - 0.5) * -0.08;
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      stopWithFallback();
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    resize();
    syncAnimationLoop();

    return () => {
      renderer.setAnimationLoop(null);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener('resize', resize);
      intersectionObserver?.disconnect();
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onUnavailable]);

  return <div className="telemetry-canvas" ref={mountRef} aria-hidden="true" />;
}
