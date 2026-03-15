'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Mug3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const W = mountRef.current.clientWidth;
    const H = mountRef.current.clientHeight;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // --- Scene ---
    const scene = new THREE.Scene();

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 1.2, 6);
    camera.lookAt(0, 0, 0);

    // --- Lights ---
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8b5cf6, 0.8);
    fillLight.position.set(-4, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xec4899, 0.6);
    rimLight.position.set(0, -2, -4);
    scene.add(rimLight);

    // --- Group ---
    const mugGroup = new THREE.Group();
    scene.add(mugGroup);

    // --- Materials ---
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xf0f4ff,
      roughness: 0.15,
      metalness: 0.05,
      envMapIntensity: 1,
    });

    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xdde3f5,
      roughness: 0.4,
      metalness: 0,
      side: THREE.BackSide,
    });

    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xe8eeff,
      roughness: 0.2,
      metalness: 0.05,
    });

    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0x4a2c0a,
      roughness: 0.1,
      metalness: 0.0,
      transparent: true,
      opacity: 0.92,
    });

    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xc8d0f0,
      roughness: 0.1,
      metalness: 0.1,
    });

    // --- Mug Body (lathe geometry for realistic shape) ---
    const points: THREE.Vector2[] = [];
    // Bottom to top profile of the mug (x = radius, y = height)
    points.push(new THREE.Vector2(0.72, -1.2));  // bottom outer edge
    points.push(new THREE.Vector2(0.70, -1.22)); // bottom bevel
    points.push(new THREE.Vector2(0.68, -1.25)); // base
    points.push(new THREE.Vector2(0.68, -1.28)); // base flat
    points.push(new THREE.Vector2(0.72, -1.28)); // base outer
    points.push(new THREE.Vector2(0.74, -1.25)); // base bevel out
    points.push(new THREE.Vector2(0.75, -1.2));  // lower body
    points.push(new THREE.Vector2(0.78, -0.8));  // mid body slight taper
    points.push(new THREE.Vector2(0.80, 0.0));   // mid
    points.push(new THREE.Vector2(0.82, 0.8));   // upper body
    points.push(new THREE.Vector2(0.84, 1.1));   // near rim
    points.push(new THREE.Vector2(0.86, 1.2));   // rim outer
    points.push(new THREE.Vector2(0.84, 1.28));  // rim top outer
    points.push(new THREE.Vector2(0.76, 1.30));  // rim top
    points.push(new THREE.Vector2(0.68, 1.28));  // rim top inner
    points.push(new THREE.Vector2(0.66, 1.2));   // inner wall top
    points.push(new THREE.Vector2(0.64, 0.8));   // inner wall
    points.push(new THREE.Vector2(0.62, 0.0));   // inner mid
    points.push(new THREE.Vector2(0.60, -0.8));  // inner lower
    points.push(new THREE.Vector2(0.58, -1.2));  // inner bottom
    points.push(new THREE.Vector2(0.58, -1.25)); // inner base

    const bodyGeo = new THREE.LatheGeometry(points, 64);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.castShadow = true;
    mugGroup.add(body);

    // --- Bottom disc ---
    const bottomGeo = new THREE.CircleGeometry(0.68, 64);
    const bottom = new THREE.Mesh(bottomGeo, bodyMat);
    bottom.rotation.x = -Math.PI / 2;
    bottom.position.y = -1.25;
    mugGroup.add(bottom);

    // --- Inner surface ---
    const innerPoints: THREE.Vector2[] = [];
    innerPoints.push(new THREE.Vector2(0.0, -1.1));
    innerPoints.push(new THREE.Vector2(0.57, -1.1));
    innerPoints.push(new THREE.Vector2(0.59, -0.8));
    innerPoints.push(new THREE.Vector2(0.61, 0.0));
    innerPoints.push(new THREE.Vector2(0.63, 0.8));
    innerPoints.push(new THREE.Vector2(0.65, 1.15));

    const innerGeo = new THREE.LatheGeometry(innerPoints, 64);
    const inner = new THREE.Mesh(innerGeo, innerMat);
    mugGroup.add(inner);

    // --- Liquid surface (coffee) ---
    const liquidGeo = new THREE.CircleGeometry(0.63, 64);
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.rotation.x = -Math.PI / 2;
    liquid.position.y = 0.95;
    mugGroup.add(liquid);

    // --- Handle (torus segment using tube) ---
    const handleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.82, 0.55, 0),
      new THREE.Vector3(1.35, 0.55, 0),
      new THREE.Vector3(1.55, 0.3, 0),
      new THREE.Vector3(1.55, -0.1, 0),
      new THREE.Vector3(1.55, -0.45, 0),
      new THREE.Vector3(1.35, -0.65, 0),
      new THREE.Vector3(0.82, -0.65, 0),
    ]);
    const handleGeo = new THREE.TubeGeometry(handleCurve, 40, 0.09, 16, false);
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.castShadow = true;
    mugGroup.add(handle);

    // --- Sublimation design on mug (canvas texture) ---
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 1024, 512);

    // --- Fondo: cielo nocturno profundo ---
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 512);
    bgGrad.addColorStop(0,   '#000010');
    bgGrad.addColorStop(0.4, '#0a0030');
    bgGrad.addColorStop(0.7, '#150050');
    bgGrad.addColorStop(1,   '#000020');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 512);

    // --- Nebulosa 1: azul-morada izquierda ---
    const neb1 = ctx.createRadialGradient(200, 200, 10, 200, 200, 220);
    neb1.addColorStop(0,   'rgba(80,40,180,0.55)');
    neb1.addColorStop(0.5, 'rgba(40,10,120,0.30)');
    neb1.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = neb1;
    ctx.fillRect(0, 0, 1024, 512);

    // --- Nebulosa 2: rosa-magenta centro ---
    const neb2 = ctx.createRadialGradient(512, 300, 5, 512, 300, 200);
    neb2.addColorStop(0,   'rgba(180,30,120,0.50)');
    neb2.addColorStop(0.5, 'rgba(100,10,80,0.25)');
    neb2.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = neb2;
    ctx.fillRect(0, 0, 1024, 512);

    // --- Nebulosa 3: cian derecha ---
    const neb3 = ctx.createRadialGradient(820, 130, 5, 820, 130, 180);
    neb3.addColorStop(0,   'rgba(0,150,200,0.35)');
    neb3.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = neb3;
    ctx.fillRect(0, 0, 1024, 512);

    // --- Nebulosa 4: morada derecha ---
    const neb4 = ctx.createRadialGradient(900, 350, 5, 900, 350, 160);
    neb4.addColorStop(0,   'rgba(120,40,200,0.45)');
    neb4.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = neb4;
    ctx.fillRect(0, 0, 1024, 512);

    // --- Estrellas pequeñas (fondo) ---
    const rng = (seed: number) => {
      let s = seed;
      return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
    };
    const rand = rng(42);
    for (let i = 0; i < 420; i++) {
      const x = rand() * 1024;
      const y = rand() * 512;
      const r = rand() * 1.2 + 0.3;
      const alpha = rand() * 0.7 + 0.3;
      ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- Estrellas medianas con halo ---
    const brightStars = [
      [80,  60],  [430, 90],  [200, 380], [370, 420],
      [50,  310], [460, 260], [150, 150], [390, 180],
      [600, 80],  [750, 300], [900, 120], [980, 400],
      [650, 420], [820, 200], [550, 250], [700, 450],
    ] as const;
    brightStars.forEach(([x, y]) => {
      const halo = ctx.createRadialGradient(x, y, 0, x, y, 14);
      halo.addColorStop(0,   'rgba(255,255,255,0.9)');
      halo.addColorStop(0.3, 'rgba(180,200,255,0.4)');
      halo.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x, y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // --- Planeta izquierdo ---
    const drawPlanet = (px: number, py: number, radius: number) => {
      // Anillo
      ctx.save();
      ctx.translate(px, py);
      ctx.scale(1, 0.28);
      const ringGrad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.8);
      ringGrad.addColorStop(0,   'rgba(180,140,255,0.0)');
      ringGrad.addColorStop(0.2, 'rgba(180,140,255,0.55)');
      ringGrad.addColorStop(0.7, 'rgba(120,80,220,0.35)');
      ringGrad.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = ringGrad;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Cuerpo
      const planetGrad = ctx.createRadialGradient(px - radius*0.35, py - radius*0.35, radius*0.1, px, py, radius);
      planetGrad.addColorStop(0,   '#c084fc');
      planetGrad.addColorStop(0.4, '#7c3aed');
      planetGrad.addColorStop(0.75,'#3b0764');
      planetGrad.addColorStop(1,   '#1e0040');
      ctx.fillStyle = planetGrad;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();

      // Brillo
      const shine = ctx.createRadialGradient(px - radius*0.38, py - radius*0.38, 2, px - radius*0.2, py - radius*0.2, radius*0.65);
      shine.addColorStop(0,   'rgba(255,255,255,0.38)');
      shine.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.fillStyle = shine;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();

      // Bandas
      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.clip();
      [0.35, 0.55, 0.72].forEach((frac, i) => {
        ctx.fillStyle = `rgba(255,255,255,${0.04 + i * 0.02})`;
        ctx.fillRect(px - radius, py - radius + frac * radius * 2 - 5, radius * 2, 7);
      });
      ctx.restore();
    };

    drawPlanet(256, 230, 52);   // planeta principal izquierdo
    drawPlanet(780, 220, 38);   // planeta secundario derecho

    // --- Estrellas fugaces ---
    const drawShootingStar = (x1: number, y1: number, x2: number, y2: number) => {
      const tailGrad = ctx.createLinearGradient(x1, y1, x2, y2);
      tailGrad.addColorStop(0,   'rgba(255,255,255,0)');
      tailGrad.addColorStop(1,   'rgba(255,255,255,0.85)');
      ctx.strokeStyle = tailGrad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };
    drawShootingStar(60,  80,  180, 140);
    drawShootingStar(700, 50,  820, 100);

    const texture = new THREE.CanvasTexture(canvas);
    const decalMat = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      roughness: 0.2,
      metalness: 0,
      depthWrite: false,
    });

    // Apply decal as a cylinder covering the full mug body
    const decalGeo = new THREE.CylinderGeometry(0.856, 0.816, 2.3, 64, 1, true,
      0, Math.PI * 2);
    const decal = new THREE.Mesh(decalGeo, decalMat);
    decal.position.y = -0.15;
    mugGroup.add(decal);

    // --- Shadow plane (invisible, solo para referencia) ---

    // --- Floating animation ---
    let t = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      t += 0.012;
      mugGroup.rotation.y += 0.008;
      mugGroup.position.y = Math.sin(t) * 0.08;
      renderer.render(scene, camera);
    };
    animate();

    // --- Resize ---
    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ minHeight: '420px' }}
    />
  );
}
