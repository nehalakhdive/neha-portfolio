import { useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles, X } from "lucide-react";

import type { CaseStudy } from "@/data/portfolio";
import { CasePreviewVisual } from "./CasePreviewVisual";

interface CaseOverlayProps {
  activeCase: CaseStudy | null;
  onClose: () => void;
  onStep: (direction: -1 | 1) => void;
}

/**
 * Full-screen studio-style pink/purple/blue glass case study overlay.
 */
export function CaseOverlay({ activeCase, onClose, onStep }: CaseOverlayProps) {
  useEffect(() => {
    if (!activeCase) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeCase, onClose, onStep]);

  if (!activeCase) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-overlay-title"
      className="fixed inset-0 z-[9000] flex items-center justify-center p-3 sm:p-6"
    >
      <div
        className="absolute inset-0 bg-[#12071d]/82 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-[#d8b4fe]/30 bg-[#221039]/96 shadow-[0_32px_100px_rgba(139,92,246,0.38)]">
        <div className="flex items-center justify-between border-b border-[#d8b4fe]/20 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#ff77bc]">{activeCase.index} //</span>
            <span className="eyebrow-micro text-[#93c5fd]">{activeCase.client}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Previous case study"
              className="glass-pill size-9 text-white/85 hover:text-white"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Next case study"
              className="glass-pill size-9 text-white/85 hover:text-white"
            >
              <ArrowRight className="size-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="glass-pill ml-1 gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white"
            >
              Close <X className="size-3.5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-5 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h2
                id="case-overlay-title"
                className="editorial-display text-3xl text-white sm:text-4xl lg:text-5xl"
              >
                {activeCase.title}
              </h2>
              <p className="mt-3 font-mono text-xs text-[#7dd3fc]">{activeCase.subtitle}</p>
              <p className="mt-5 text-base leading-7 text-[#f3e8ff]/85">{activeCase.summary}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 self-start">
              {activeCase.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-[#d8b4fe]/25 bg-[#311750]/65 p-4"
                >
                  <p className="font-mono text-lg font-semibold text-white sm:text-xl">
                    {metric.value}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#d8c6f0]/75">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#d8b4fe]/25">
            <CasePreviewVisual kind={activeCase.previewKind} />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#d8b4fe]/20 bg-[#311750]/45 p-5">
              <p className="eyebrow-micro text-[#ff77bc]">Problem Statement</p>
              <p className="mt-3 text-sm leading-6 text-[#f3e8ff]/80">{activeCase.problem}</p>
            </div>
            <div className="rounded-2xl border border-[#d8b4fe]/20 bg-[#311750]/45 p-5">
              <p className="eyebrow-micro text-[#7dd3fc]">Technical Architecture</p>
              <p className="mt-3 text-sm leading-6 text-[#f3e8ff]/80">
                {activeCase.implementation}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#d8b4fe]/20 bg-[#311750]/45 p-5">
            <p className="eyebrow-micro inline-flex items-center gap-2 text-[#e9d5ff]">
              <Sparkles className="size-3.5 text-[#ff4da6]" /> Key Engineering Outcomes
            </p>
            <ul className="mt-3 space-y-2.5 text-sm leading-6 text-[#f9f5ff]">
              {activeCase.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#38bdf8]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-5 border-t border-[#d8b4fe]/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {activeCase.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[#d8b4fe]/25 bg-[#a855f7]/15 px-3 py-1 font-mono text-[11px] text-[#f3e8ff]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {activeCase.links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {activeCase.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-pill gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white"
                  >
                    {link.label} <ArrowUpRight className="size-3.5 text-[#7dd3fc]" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
