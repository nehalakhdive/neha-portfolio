import { useEffect, useState } from "react";
import { Cpu, Layers3, ShieldCheck, Sparkles, X } from "lucide-react";

const chapters = [
  {
    id: "architecture",
    label: "01 · Frontend + APIs",
    icon: Layers3,
    headline: "14 clinical screens unified under one resilient React + TypeScript architecture.",
    detail:
      "Replaced fragmented file-upload flows with shared typed components, upfront format/boundary validation, and a 6× capacity increase—paired with Django REST Framework services.",
    stats: ["14 Screens Unified", "6× Upload Capacity", "React · TypeScript · Django"],
  },
  {
    id: "reliability",
    label: "02 · Quality + Telemetry",
    icon: ShieldCheck,
    headline: "632 automated tests and 113 instrumented failure paths keeping production honest.",
    detail:
      "Scaled Jest, React Testing Library, and pytest regression coverage, built 7-action MySQL audit trails, replaced unsafe pickle payloads with JSON-safe pipelines, and resolved 15 live production exceptions.",
    stats: ["632 Tests Passing", "113 Sentry / OTel Paths", "15 Prod Fixes"],
  },
  {
    id: "applied-ai",
    label: "03 · Applied AI + OCR",
    icon: Cpu,
    headline: "Converting handwritten historical Modi script into searchable Devanagari & English.",
    detail:
      "Co-engineered an OCR and transliteration pipeline pairing ResNet-50, OpenCV preprocessing, Unicode block U+11600–U+1165F mapping, Levenshtein correction, and GPT-4o Vision—earning the ICRACE 2026 Best Paper Award.",
    stats: ["ICRACE 2026 Best Paper", "Technovation 1st Place", "FastAPI · ResNet-50"],
  },
] as const;

export function SystemReelModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const current = chapters[activeIdx]!;
  const Icon = current.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interactive engineering reel"
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4 sm:p-6"
    >
      <div className="absolute inset-0 bg-[#12071d]/82 backdrop-blur-xl" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-[#d8b4fe]/30 bg-[#221039]/96 p-6 shadow-[0_32px_100px_rgba(139,92,246,0.38)] sm:p-9">
        <div className="flex items-center justify-between gap-4 border-b border-[#d8b4fe]/20 pb-5">
          <div>
            <p className="eyebrow-micro inline-flex items-center gap-1.5 text-[#ff77bc]">
              <Sparkles className="size-3.5" /> Interactive Systems Overview
            </p>
            <p className="mt-1 text-sm text-[#d8c6f0]/75">Neha Lakhdive · Engineering Snapshot</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close overview"
            className="glass-pill gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white"
          >
            Close <X className="size-3.5" />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {chapters.map((chapter, idx) => (
            <button
              key={chapter.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-all ${
                idx === activeIdx
                  ? "bg-gradient-to-r from-[#ff4da6] via-[#a855f7] to-[#38bdf8] font-semibold text-white shadow-[0_6px_20px_rgba(168,85,247,0.45)]"
                  : "border border-[#d8b4fe]/25 bg-white/[0.06] text-[#f3e8ff]/80 hover:text-white"
              }`}
            >
              {chapter.label}
            </button>
          ))}
        </div>

        <div className="mt-7 rounded-2xl border border-[#d8b4fe]/25 bg-[#311750]/55 p-6 sm:p-8">
          <div className="flex items-center gap-3 text-[#7dd3fc]">
            <span className="flex size-10 items-center justify-center rounded-full border border-[#7dd3fc]/40 bg-[#38bdf8]/15">
              <Icon className="size-5" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.14em]">{current.label}</span>
          </div>

          <h3 className="editorial-display mt-5 text-2xl text-white sm:text-3xl">
            {current.headline}
          </h3>
          <p className="mt-4 text-sm leading-7 text-[#f3e8ff]/80 sm:text-base">{current.detail}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {current.stats.map((stat) => (
              <span
                key={stat}
                className="rounded-full border border-[#d8b4fe]/25 bg-[#160929]/65 px-3.5 py-1.5 font-mono text-[11px] text-[#e9d5ff]"
              >
                {stat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
