import { useEffect, useRef } from "react";

/**
 * Animated pink-purple-blue sine-wave canvas scroll indicator.
 */
export function ScrollWaveIndicator({ hidden }: { hidden: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = 32;
    const height = 42;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let rafId = 0;

    const draw = (timeMs: number) => {
      const t = timeMs * 0.003;
      ctx.clearRect(0, 0, width, height);

      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "rgba(255, 77, 166, 0.35)");
      grad.addColorStop(0.5, "rgba(192, 132, 252, 0.95)");
      grad.addColorStop(1, "rgba(56, 189, 248, 0.45)");

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.75;
      ctx.lineCap = "round";
      ctx.beginPath();

      for (let y = 2; y <= height - 2; y += 2) {
        const envelope = Math.sin((y / height) * Math.PI);
        const offset = reducedMotion ? 0 : Math.sin(y * 0.24 - t) * 5.5 * envelope;
        const x = width * 0.5 + offset;
        if (y === 2) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();

      if (!reducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };

    if (reducedMotion) draw(0);
    else rafId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none flex flex-col items-center transition-all duration-500 ${
        hidden ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <span className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#d8c6f0]/75">
        Scroll
      </span>
      <canvas ref={canvasRef} className="h-[42px] w-[32px]" />
    </div>
  );
}
