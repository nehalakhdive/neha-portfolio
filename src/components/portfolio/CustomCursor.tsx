import { useEffect, useRef, useState } from "react";

/**
 * Fine-pointer magnetic cursor with contextual pink/purple/blue glass pill label.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    document.body.classList.add("has-custom-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };
    let rafId = 0;

    const updateSpotlight = (e: PointerEvent) => {
      const targetEl = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        ".glass-pill, .glass-card",
      );
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        targetEl.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
        targetEl.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
      }
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
      updateSpotlight(e);

      const interactive = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      const customText = interactive?.getAttribute("data-cursor");
      if (customText) setCursorLabel(customText);
      else if (interactive) setCursorLabel("");
      else setCursorLabel(null);
    };

    const onDown = () => setIsPressed(true);
    const onUp = () => setIsPressed(false);
    const onLeave = () => setVisible(false);

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.24;
      pos.y += (target.y - pos.y) * 0.24;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${pos.x + 16}px, ${pos.y + 16}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const hasText = Boolean(cursorLabel && cursorLabel.length > 0);
  const isInteractive = cursorLabel !== null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 -ml-2 -mt-2 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            hasText
              ? "size-3 bg-[#ff4da6] shadow-[0_0_18px_rgba(168,85,247,0.9)]"
              : isInteractive
                ? "size-5 border border-[#93c5fd]/80 bg-[#a855f7]/25 backdrop-blur-sm"
                : "size-2.5 bg-[#f3e8ff] shadow-[0_0_12px_rgba(192,132,252,0.75)]"
          } ${isPressed ? "scale-75" : "scale-100"}`}
        />
      </div>

      <div
        ref={labelRef}
        className={`fixed left-0 top-0 transition-all duration-200 ${
          visible && hasText ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <span className="inline-flex items-center rounded-full border border-[#c084fc]/45 bg-[#24113d]/92 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[#f9f5ff] shadow-xl backdrop-blur-md">
          {cursorLabel}
        </span>
      </div>
    </div>
  );
}
