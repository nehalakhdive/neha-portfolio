import { useEffect, useState } from "react";
import { Activity, CheckCircle2, FileCheck2, ShieldCheck, Sparkles } from "lucide-react";

import type { CaseStudy } from "@/data/portfolio";

const modiSamples = [
  {
    modi: "𑘦𑘻𑘚𑘲 𑘩𑘲𑘢𑘲",
    codepoints: "U+11626 · U+1163B · U+1161A",
    devanagari: "मोडी लिपी",
    english: "Modi Script Manuscript",
    confidence: "96.4%",
  },
  {
    modi: "𑘢𑘳𑘜𑘹 𑘃𑘝𑘲𑘮𑘰𑘭",
    codepoints: "U+11622 · U+11633 · U+11618",
    devanagari: "पुणे इतिहास",
    english: "Pune Historical Archive",
    confidence: "94.8%",
  },
  {
    modi: "𑘎𑘰𑘐𑘟𑘢𑘝𑘿𑘨",
    codepoints: "U+1160E · U+11630 · U+11611",
    devanagari: "कागदपत्र",
    english: "Archival Document",
    confidence: "95.2%",
  },
];

export function CasePreviewVisual({ kind }: { kind: CaseStudy["previewKind"] }) {
  const [sampleIdx, setSampleIdx] = useState(0);

  useEffect(() => {
    if (kind !== "modi") return;
    const id = window.setInterval(() => {
      setSampleIdx((prev) => (prev + 1) % modiSamples.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [kind]);

  if (kind === "modi") {
    const sample = modiSamples[sampleIdx]!;
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_22%_20%,rgba(255,77,166,0.22),transparent_55%),radial-gradient(circle_at_82%_80%,rgba(56,189,248,0.2),transparent_55%),#23103b] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ff77bc]/45 bg-[#ff4da6]/18 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#ffd6eb]">
            <Sparkles className="size-3 text-[#ff77bc]" /> ICRACE 2026 Best Paper
          </span>
          <span className="font-mono text-[11px] text-[#93c5fd]">{sample.codepoints}</span>
        </div>

        <div className="my-6 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="rounded-xl border border-[#d8b4fe]/25 bg-[#160929]/75 p-4 backdrop-blur-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#d8c6f0]/75">
              Input · ResNet-50 + Vision
            </p>
            <p className="mt-2 text-2xl font-medium tracking-wide text-white sm:text-3xl">
              {sample.modi}
            </p>
          </div>
          <div className="hidden font-mono text-xs text-[#93c5fd] sm:block">───▶</div>
          <div className="rounded-xl border border-[#a855f7]/45 bg-[#a855f7]/15 p-4 backdrop-blur-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#e9d5ff]">
              Output · Devanagari / EN
            </p>
            <p className="mt-2 text-2xl font-medium text-white sm:text-3xl">{sample.devanagari}</p>
            <p className="mt-1 font-mono text-[11px] text-[#7dd3fc]">{sample.english}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#d8b4fe]/20 pt-4 font-mono text-[11px] text-[#d8c6f0]">
          <span>Levenshtein Dictionary Correction</span>
          <span className="text-[#86efac]">Confidence {sample.confidence}</span>
        </div>
      </div>
    );
  }

  if (kind === "uploads") {
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_75%_22%,rgba(56,189,248,0.22),transparent_55%),radial-gradient(circle_at_18%_82%,rgba(255,77,166,0.2),transparent_55%),#23103b] p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#7dd3fc]/40 bg-[#38bdf8]/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#bae6fd]">
            <Activity className="size-3 text-[#7dd3fc]" /> OpenTelemetry + Sentry
          </span>
          <span className="font-mono text-xs text-[#d8b4fe]">14 SCREENS</span>
        </div>

        <div className="my-5 space-y-3">
          {[
            { label: "Patient Records", width: "92%", stat: "6× Cap" },
            { label: "Billing & Invoices", width: "86%", stat: "Validated" },
            { label: "Insurance Scans", width: "95%", stat: "113 Traces" },
          ].map((row) => (
            <div key={row.label} className="rounded-lg border border-[#d8b4fe]/20 bg-[#160929]/70 p-3">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="flex items-center gap-2 text-white">
                  <FileCheck2 className="size-3.5 text-[#7dd3fc]" /> {row.label}
                </span>
                <span className="text-[#ff85c0]">{row.stat}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#ff4da6] via-[#a855f7] to-[#38bdf8]"
                  style={{ width: row.width }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#d8b4fe]/20 pt-4 font-mono text-[11px] text-[#d8c6f0]">
          <span>Shared React + TS Engine</span>
          <span className="text-[#86efac]">0 Silent Failures</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_28%_25%,rgba(168,85,247,0.24),transparent_55%),radial-gradient(circle_at_80%_78%,rgba(56,189,248,0.18),transparent_55%),#23103b] p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#86efac]/40 bg-[#86efac]/12 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#bbf7d0]">
          <ShieldCheck className="size-3" /> 632 Tests Passing
        </span>
        <span className="font-mono text-xs text-[#93c5fd]">MYSQL + PYTEST</span>
      </div>

      <div className="my-5 space-y-2.5 font-mono text-[11px]">
        <div className="flex items-center justify-between rounded-lg border border-[#d8b4fe]/20 bg-[#160929]/75 px-3.5 py-2.5 text-white">
          <span>Jest + RTL + pytest</span>
          <span className="inline-flex items-center gap-1 text-[#86efac]">
            <CheckCircle2 className="size-3.5" /> 632 / 632
          </span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-[#d8b4fe]/20 bg-[#160929]/75 px-3.5 py-2.5 text-white">
          <span>Retry Payload Safety</span>
          <span className="text-[#7dd3fc]">pickle → JSON</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-[#d8b4fe]/20 bg-[#160929]/75 px-3.5 py-2.5 text-white">
          <span>Audit Schema Events</span>
          <span className="text-[#d8b4fe]">7 Action Types</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#d8b4fe]/20 pt-4 font-mono text-[11px] text-[#d8c6f0]">
        <span>Clinical Data Traceability</span>
        <span className="text-[#ff85c0]">15 Exceptions Resolved</span>
      </div>
    </div>
  );
}
