import { useEffect, useRef } from "react";

import inspoDeskBg from "@/assets/coder-girl.jpg";

interface Particle {
  col: number;
  row: number;
  baseX: number;
  baseY: number;
  z: number;
  radius: number;
  hue: "pink" | "purple" | "blue" | "pearl";
  phase: number;
}

/**
 * Full-viewport ambient backdrop blending the user's slow-drifting coding desk
 * inspiration image with a pointer-reactive pink, purple, and blue particle horizon.
 */
export function AmbientFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const pointer = {
      x: width * 0.5,
      y: height * 0.45,
      targetX: width * 0.5,
      targetY: height * 0.45,
      active: false,
    };
    let scrollProgress = 0;
    let rafId = 0;

    const palette: Record<Particle["hue"], string> = {
      pearl: "248, 242, 255",
      pink: "255, 77, 166",
      purple: "192, 132, 252",
      blue: "96, 165, 250",
    };

    const buildParticles = () => {
      const cols = width < 768 ? 22 : 38;
      const rows = width < 768 ? 14 : 22;
      const items: Particle[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const u = c / (cols - 1) - 0.5;
          const v = r / (rows - 1) - 0.5;
          const roll = ((r * 31 + c * 17) % 24) / 24;
          let hue: Particle["hue"] = "pearl";
          if (roll > 0.72) hue = "pink";
          else if (roll > 0.46) hue = "purple";
          else if (roll > 0.24) hue = "blue";

          items.push({
            col: c,
            row: r,
            baseX: u,
            baseY: v,
            z: r / rows,
            radius: hue === "pearl" ? 1.2 : 1.85,
            hue,
            phase: c * 0.32 + r * 0.48,
          });
        }
      }
      return { items, cols, rows };
    };

    let grid = buildParticles();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grid = buildParticles();
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.targetX = e.clientX;
      pointer.targetY = e.clientY;
      pointer.active = true;
    };

    const onScroll = () => {
      const vh = Math.max(window.innerHeight, 1);
      scrollProgress = Math.min(Math.max(window.scrollY / (vh * 0.95), 0), 1);
      if (veilRef.current) {
        const opacity = 0.52 + scrollProgress * 0.28;
        veilRef.current.style.opacity = opacity.toFixed(3);
      }
      if (bgLayerRef.current && !reducedMotion) {
        const shiftY = -scrollProgress * 24;
        bgLayerRef.current.style.transform = `translate3d(0, ${shiftY.toFixed(1)}px, 0)`;
      }
    };

    resize();
    onScroll();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const renderFrame = (timeMs: number) => {
      const t = timeMs * 0.001;
      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const normX = pointer.x / Math.max(width, 1);
      const normY = pointer.y / Math.max(height, 1);
      const glowX = width * (0.5 + (normX - 0.5) * 0.16);
      const glowY = height * (0.42 + (normY - 0.5) * 0.14 - scrollProgress * 0.15);

      const radial = ctx.createRadialGradient(
        glowX,
        glowY,
        16,
        glowX,
        glowY,
        Math.max(width, height) * 0.62,
      );
      radial.addColorStop(0, "rgba(255, 77, 166, 0.22)");
      radial.addColorStop(0.38, "rgba(168, 85, 247, 0.16)");
      radial.addColorStop(0.72, "rgba(56, 189, 248, 0.11)");
      radial.addColorStop(1, "rgba(28, 11, 41, 0)");
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      const spreadX = width * 1.18;
      const horizonY = height * 0.56 - scrollProgress * height * 0.12;
      const spreadY = height * 0.56;

      const projected: { x: number; y: number; alpha: number; radius: number; hue: Particle["hue"] }[] = [];

      for (let i = 0; i < grid.items.length; i++) {
        const p = grid.items[i]!;
        const perspective = 0.42 + p.z * 0.92;
        const wave = reducedMotion
          ? 0
          : Math.sin(t * 0.95 + p.phase) * 16 + Math.cos(t * 0.6 + p.baseX * 5) * 11;

        let x = width * 0.5 + p.baseX * spreadX * perspective + (normX - 0.5) * 34 * (1 - p.z);
        let y =
          horizonY +
          p.baseY * spreadY * perspective +
          wave * perspective +
          (normY - 0.5) * 20 * (1 - p.z);

        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (pointer.active && dist < 175 && dist > 0.1) {
          const force = (1 - dist / 175) * 20;
          x += (dx / dist) * force;
          y += (dy / dist) * force;
        }

        const edgeFade = Math.max(0, 1 - Math.abs(p.baseX) * 1.65);
        const alpha = Math.min(0.88, (0.16 + p.z * 0.65) * edgeFade * (1 - scrollProgress * 0.28));

        projected.push({
          x,
          y,
          alpha,
          radius: p.radius * (0.7 + p.z * 0.55),
          hue: p.hue,
        });
      }

      ctx.lineWidth = 0.7;
      const cols = grid.cols;
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i]!;
        if (a.alpha < 0.06) continue;

        if ((i + 1) % cols !== 0) {
          const b = projected[i + 1]!;
          const lineAlpha = Math.min(a.alpha, b.alpha) * 0.26;
          if (lineAlpha > 0.015) {
            ctx.strokeStyle = `rgba(192, 132, 252, ${lineAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (i + cols < projected.length) {
          const c = projected[i + cols]!;
          const lineAlpha = Math.min(a.alpha, c.alpha) * 0.22;
          if (lineAlpha > 0.015) {
            ctx.strokeStyle = `rgba(96, 165, 250, ${lineAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(c.x, c.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i]!;
        if (p.alpha <= 0.02) continue;
        ctx.fillStyle = `rgba(${palette[p.hue]}, ${p.alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) {
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    if (reducedMotion) renderFrame(0);
    else rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-[#1d0a2b] via-[#24113d] to-[#15143b]"
    >
      {/* Subtle moving pixel-desk inspiration background layer */}
      <div ref={bgLayerRef} className="absolute -inset-6 opacity-[0.17] will-change-transform">
        <img
          src={inspoDeskBg}
          alt=""
          className="animate-bg-drift h-full w-full object-cover object-center blur-[2px] saturate-125"
        />
      </div>

      {/* Atmospheric pink/purple/blue veil for crisp contrast */}
      <div
        ref={veilRef}
        className="absolute inset-0 bg-gradient-to-b from-[#1d0a2b]/80 via-[#25103d]/85 to-[#15143b]/92 transition-opacity duration-200"
        style={{ opacity: 0.52 }}
      />

      <canvas ref={canvasRef} className="relative z-10 block h-full w-full" />
    </div>
  );
}
