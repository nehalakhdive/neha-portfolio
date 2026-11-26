import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Braces,
  Briefcase,
  Check,
  ChevronDown,
  Code2,
  Copy,
  Cpu,
  Database,
  FolderGit2,
  GitBranch,
  Github,
  GraduationCap,
  Heart,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Play,
  Plus,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trophy,
  Wand2,
} from "lucide-react";

import stylizedPortrait from "@/assets/neha-stylized-portrait.jpg";
import { AmbientFieldCanvas } from "@/components/portfolio/AmbientFieldCanvas";
import { AnimatedPortrait } from "@/components/portfolio/AnimatedPortrait";
import { CaseOverlay } from "@/components/portfolio/CaseOverlay";
import { CasePreviewVisual } from "@/components/portfolio/CasePreviewVisual";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { ScrollWaveIndicator } from "@/components/portfolio/ScrollWaveIndicator";
import { SystemReelModal } from "@/components/portfolio/SystemReelModal";
import {
  caseStudies,
  education,
  experience,
  heroSignals,
  principles,
  profile,
  recognition,
  repositories,
  stackGroups,
  type CaseStudy,
} from "@/data/portfolio";

const categories = ["All", "Applied AI", "Architecture", "Reliability"] as const;
type CategoryFilter = (typeof categories)[number];

const signalIcons = [ShieldCheck, Layers, Activity, Rocket] as const;
const stackIcons = [Code2, Server, Database, Activity, Cpu] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neha Lakhdive — Full-Stack Software Developer" },
      {
        name: "description",
        content:
          "Portfolio of Neha Lakhdive, a Pune-based Full-Stack Software Developer specializing in React, TypeScript, Python, Django, observability, and applied AI.",
      },
      { property: "og:title", content: "Neha Lakhdive — Full-Stack Software Developer" },
      {
        property: "og:description",
        content:
          "Full-stack product engineering across React, TypeScript, Python, and Django—backed by 632 automated tests, Sentry/OpenTelemetry observability, and applied AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [activeStackIndex, setActiveStackIndex] = useState<string>("All");
  const [openRoleIndex, setOpenRoleIndex] = useState<string>(experience[0]?.index ?? "03");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [reelOpen, setReelOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => {
      setScrolledPastHero(window.scrollY > 80);

      if (reducedMotion || !galleryRef.current) return;
      const cards = galleryRef.current.querySelectorAll<HTMLElement>("[data-parallax-depth]");
      const vh = window.innerHeight || 900;
      cards.forEach((card) => {
        const depth = Number(card.dataset["parallaxDepth"] ?? 0);
        const rect = card.getBoundingClientRect();
        const centerOffset = (rect.top + rect.height * 0.5 - vh * 0.5) / vh;
        const shift = Math.max(-18, Math.min(18, centerOffset * depth));
        card.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibleCases =
    activeCategory === "All"
      ? caseStudies
      : caseStudies.filter((item) => item.category === activeCategory);

  const visibleStacks =
    activeStackIndex === "All"
      ? stackGroups
      : stackGroups.filter((group) => group.index === activeStackIndex);

  const handleStepCase = useCallback(
    (direction: -1 | 1) => {
      if (!selectedCase) return;
      const idx = caseStudies.findIndex((item) => item.id === selectedCase.id);
      if (idx === -1) return;
      const nextIdx = (idx + direction + caseStudies.length) % caseStudies.length;
      setSelectedCase(caseStudies[nextIdx] ?? null);
    },
    [selectedCase],
  );

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div className="relative min-h-screen text-[#f9f5ff]">
      <AmbientFieldCanvas />
      <CustomCursor />

      {/* Floating Pink + Purple + Blue Frosted Header */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-8 lg:px-12">
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-300 ${
            scrolledPastHero
              ? "border border-[#d8b4fe]/25 bg-[#200e36]/82 shadow-[0_14px_40px_rgba(56,189,248,0.16)] backdrop-blur-xl"
              : "border border-transparent bg-transparent"
          }`}
        >
          <a
            href="#top"
            className="group inline-flex items-center gap-3"
            aria-label="Neha Lakhdive — Home"
          >
            <span className="flex size-8 items-center justify-center rounded-full border border-[#d8b4fe]/45 bg-gradient-to-br from-[#ff4da6] via-[#a855f7] to-[#38bdf8] font-mono text-xs font-bold tracking-wider text-white shadow-[0_0_16px_rgba(168,85,247,0.65)] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
              {profile.monogram}
            </span>
            <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-[#f3e8ff] sm:inline">
              {profile.name}
            </span>
          </a>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
            {[
              { label: "About", href: "#about", icon: Sparkles, color: "text-[#ff77bc]" },
              { label: "Work", href: "#work", icon: Layers, color: "text-[#c084fc]" },
              { label: "Experience", href: "#experience", icon: Briefcase, color: "text-[#7dd3fc]" },
              { label: "Stack", href: "#stack", icon: Code2, color: "text-[#c084fc]" },
              { label: "Contact", href: "#contact", icon: Heart, color: "text-[#ff77bc]" },
            ].map((item) => {
              const NavIcon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#e9d5ff]/85 transition-colors hover:bg-white/[0.08] hover:text-white"
                >
                  <NavIcon className={`size-3 ${item.color}`} />
                  {item.label}
                </a>
              );
            })}
          </nav>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            data-cursor="GitHub ↗"
            className="glass-pill gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white"
          >
            <Github className="size-3.5 text-[#7dd3fc]" />
            <span>GitHub</span>
            <ArrowUpRight className="size-3.5 text-[#ff77bc]" />
          </a>
        </div>
      </header>

      <main id="top" className="relative z-10">
        {/* SECTION 1: FULL-VIEWPORT HERO WITH MOVING INSPO BACKGROUND & ANIMATED PORTRAIT */}
        <section className="relative flex min-h-[100svh] flex-col justify-between px-4 pb-8 pt-24 sm:px-8 lg:px-14">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#e9d5ff]/80">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#7dd3fc]/30 bg-[#1b123d]/65 px-3 py-1 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]" />
              {profile.location}
            </span>
            <span className="hidden items-center gap-2 rounded-full border border-[#d8b4fe]/30 bg-[#28113b]/65 px-3 py-1 backdrop-blur-md sm:inline-flex">
              <Code2 className="size-3.5 text-[#c084fc]" />
              React · TypeScript · Python · Django
            </span>
          </div>

          <div className="mx-auto my-auto grid w-full max-w-7xl items-center gap-12 py-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
            <div className="text-center lg:text-left">
              <div className="mb-5 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#ff77bc]/40 bg-[#ff4da6]/15 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[#ffd6eb]">
                  <Wand2 className="size-3.5 text-[#ff77bc]" /> Full-Stack Software Developer
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#7dd3fc]/35 bg-[#38bdf8]/12 px-3 py-1 font-mono text-[11px] text-[#bae6fd]">
                  <Braces className="size-3 text-[#7dd3fc]" /> &lt;html&gt; · APIs · AI
                </span>
              </div>

              <h1 className="editorial-display text-5xl text-white sm:text-7xl lg:text-[5.25rem]">
                Neha{" "}
                <span className="bg-gradient-to-r from-[#ff66b2] via-[#c084fc] to-[#60a5fa] bg-clip-text text-transparent">
                  Lakhdive
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#f3e8ff]/85 sm:text-lg lg:mx-0">
                Engineering resilient clinical platforms, observable APIs, and applied AI
                interfaces—where clean architecture meets expressive, responsive craft.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <button
                  type="button"
                  onClick={() => setReelOpen(true)}
                  data-cursor="Launch"
                  className="group relative inline-flex items-center gap-3.5 rounded-full px-6 py-3 text-white transition-transform duration-300 hover:scale-[1.03]"
                >
                  <span
                    aria-hidden="true"
                    className="animate-ring absolute inset-0 rounded-full border border-[#c084fc]/60"
                  />
                  <span className="glass-pill absolute inset-0" />
                  <span className="relative z-10 font-mono text-[11px] uppercase tracking-[0.14em] text-white">
                    Inspect
                  </span>
                  <span className="relative z-10 flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#ff4da6] via-[#a855f7] to-[#38bdf8] shadow-[0_0_20px_rgba(168,85,247,0.7)] transition-transform group-hover:scale-110">
                    <Play className="ml-0.5 size-3.5 fill-current text-white" />
                  </span>
                  <span className="relative z-10 font-mono text-[11px] uppercase tracking-[0.14em] text-white">
                    Systems
                  </span>
                </button>

                <a
                  href="#work"
                  data-cursor="Explore"
                  className="glass-pill gap-2 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white"
                >
                  <Sparkles className="size-3.5 text-[#7dd3fc]" />
                  Selected Work
                  <ArrowUpRight className="size-3.5 text-[#ff77bc]" />
                </a>
              </div>
            </div>

            {/* Clean Animated Portrait (original blazer colors, zero face overlays) */}
            <AnimatedPortrait />
          </div>

          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 hidden items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-[#d8c6f0]/50 md:flex">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="size-3 text-[#ff77bc]" /> Dream It
              </span>
              <span>Code It</span>
              <span className="text-[#c084fc]/70">Test It</span>
              <span className="text-[#7dd3fc]/70">Observe It</span>
              <span className="inline-flex items-center gap-2">
                Ship It <Rocket className="size-3 text-[#7dd3fc]" />
              </span>
            </div>
            <div className="flex justify-center">
              <ScrollWaveIndicator hidden={scrolledPastHero} />
            </div>
          </div>
        </section>

        {/* SECTION 2: ENGINEERING PHILOSOPHY & TELEMETRY */}
        <section id="about" className="scroll-mt-24 px-4 py-24 sm:px-8 lg:px-14 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow-micro inline-flex items-center gap-2 text-[#ff77bc]">
              <Sparkles className="size-3.5" /> 01 // Engineering Philosophy
            </p>
            <h2 className="editorial-display mt-5 max-w-5xl text-3xl text-white sm:text-5xl lg:text-[3.3rem]">
              {profile.headline}
            </h2>

            <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
              <p className="text-base leading-8 text-[#f3e8ff]/85 sm:text-lg">{profile.bio}</p>
              <p className="text-base leading-8 text-[#d8c6f0]/80">{profile.secondaryBio}</p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {heroSignals.map((signal, idx) => {
                const SignalIcon = signalIcons[idx] ?? Sparkles;
                const badgeTint =
                  idx % 3 === 0
                    ? "border-[#ff77bc]/35 bg-[#ff4da6]/18 text-[#ff77bc]"
                    : idx % 3 === 1
                      ? "border-[#c084fc]/35 bg-[#a855f7]/18 text-[#c084fc]"
                      : "border-[#7dd3fc]/35 bg-[#38bdf8]/18 text-[#7dd3fc]";
                return (
                  <article
                    key={signal.label}
                    className="glass-card rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-3xl font-semibold text-white sm:text-4xl">
                        {signal.value}
                      </p>
                      <span
                        className={`flex size-9 items-center justify-center rounded-full border ${badgeTint}`}
                      >
                        <SignalIcon className="size-4" />
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-medium text-white">{signal.label}</p>
                    <p className="mt-1 font-mono text-[11px] text-[#93c5fd]">{signal.detail}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: RECOGNITION & CREDENTIALS (Balanced 6-col layout) */}
        <section className="border-y border-[#d8b4fe]/20 bg-[#210f38]/55 px-4 py-20 backdrop-blur-md sm:px-8 lg:px-14">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow-micro inline-flex items-center gap-2 text-[#7dd3fc]">
                  <Trophy className="size-3.5 text-[#ff77bc]" /> Impact & Recognition
                </p>
                <h2 className="editorial-display mt-3 text-2xl text-white sm:text-4xl">
                  From clinical production modules to peer-reviewed AI research.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#d8c6f0]/80">
                Shipping daily at <span className="font-semibold text-white">CrelioHealth</span>{" "}
                across three production repositories, alongside IIT NPTEL credentials and conference
                honors.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6">
              {recognition.map((item, idx) => {
                const Icon =
                  item.kind === "Research"
                    ? Trophy
                    : item.kind === "Competition"
                      ? Award
                      : BadgeCheck;
                const spanClass = idx < 2 ? "md:col-span-3" : "md:col-span-2";
                const accentClass =
                  idx % 3 === 0
                    ? "text-[#ff77bc]"
                    : idx % 3 === 1
                      ? "text-[#c084fc]"
                      : "text-[#7dd3fc]";
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Credential ↗"
                    className={`glass-card group flex flex-col justify-between rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#93c5fd]/45 ${spanClass}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ${accentClass}`}
                      >
                        <Icon className="size-3.5" /> {item.kind}
                      </span>
                      <ArrowUpRight className="size-4 text-[#d8c6f0]/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#d8c6f0]/80">
                        {item.detail}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: ALIGNED CASE GALLERY (3 CASES, ZERO OVERLAPPING VIEW CASE BUTTON) */}
        <section id="work" className="scroll-mt-24 px-4 py-24 sm:px-8 lg:px-14 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow-micro inline-flex items-center gap-2 text-[#c084fc]">
                  <Layers className="size-3.5 text-[#ff77bc]" /> 02 // Selected Work
                </p>
                <h2 className="editorial-display mt-3 text-3xl text-white sm:text-5xl">
                  Systems built to endure.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#d8c6f0]/80">
                  Interactive case studies spanning applied OCR research, high-throughput clinical
                  uploads, and test automation.
                </p>
              </div>

              <div className="flex flex-wrap gap-2" aria-label="Filter projects by category">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                    className={`rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-all ${
                      activeCategory === category
                        ? "bg-gradient-to-r from-[#ff4da6] via-[#a855f7] to-[#38bdf8] font-semibold text-white shadow-[0_8px_24px_rgba(168,85,247,0.45)]"
                        : "glass-pill text-[#f3e8ff]/80 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Clean aligned 2-column grid (Case 01 spans full width when All; 02 & 03 sit side-by-side) */}
            <div
              ref={galleryRef}
              className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2"
            >
              {visibleCases.map((item) => {
                const spanClass =
                  item.featuredWide && activeCategory === "All" ? "lg:col-span-2" : "lg:col-span-1";

                return (
                  <figure
                    key={item.id}
                    data-parallax-depth={item.depth}
                    className={`group flex flex-col transition-transform duration-150 will-change-transform ${spanClass}`}
                  >
                    <div
                      onClick={() => setSelectedCase(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedCase(item);
                        }
                      }}
                      data-cursor="View case +"
                      aria-label={`View case study: ${item.title}`}
                      className="glass-card relative min-h-[340px] cursor-pointer overflow-hidden rounded-3xl border border-[#d8b4fe]/25 transition-all duration-500 group-hover:border-[#7dd3fc]/60 sm:min-h-[360px]"
                    >
                      <CasePreviewVisual kind={item.previewKind} />
                    </div>

                    {/* Clean non-overlapping caption & View Case trigger row */}
                    <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-4 px-1">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                          <span className="text-[#ff77bc]">{item.index}</span>
                          <span className="text-[#d8c6f0]/50">·</span>
                          <span className="text-[#7dd3fc]">{item.client}</span>
                          <span className="text-[#d8c6f0]/50">·</span>
                          <span className="text-[#d8c6f0]/65">{item.period}</span>
                        </div>
                        <h3 className="mt-1 text-lg font-medium text-white sm:text-xl">
                          {item.title}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedCase(item)}
                        data-cursor="View case +"
                        className="glass-pill shrink-0 gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white transition-transform duration-300 group-hover:scale-105"
                      >
                        <span>View case</span>
                        <Plus className="size-3.5 text-[#7dd3fc]" />
                      </button>
                    </figcaption>
                  </figure>
                );
              })}
            </div>

            {/* Public GitHub Repositories Strip (aligned 2-column grid) */}
            <div className="mt-20 border-t border-[#d8b4fe]/20 pt-12">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow-micro inline-flex items-center gap-2 text-[#7dd3fc]">
                    <FolderGit2 className="size-3.5 text-[#c084fc]" /> Open Source // GitHub
                  </p>
                  <h3 className="mt-2 text-2xl font-medium text-white">Selected Repositories</h3>
                </div>
                <a
                  href={profile.githubRepos}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="All repos ↗"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-[#e9d5ff]/85 transition-colors hover:text-white"
                >
                  View all on GitHub <ArrowUpRight className="size-4 text-[#ff77bc]" />
                </a>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                {repositories.map((repo) => (
                  <div
                    key={repo.name}
                    className="glass-card flex flex-col justify-between rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7dd3fc]">
                          <GitBranch className="size-3" /> {repo.language}
                        </span>
                        <span className="rounded-full border border-[#d8b4fe]/25 bg-[#a855f7]/18 px-2.5 py-0.5 font-mono text-[10px] text-[#f3e8ff]">
                          {repo.highlight}
                        </span>
                      </div>
                      <h4 className="mt-3 font-mono text-base font-semibold text-white">
                        {repo.name}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#d8c6f0]/80">
                        {repo.description}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center gap-4 border-t border-[#d8b4fe]/15 pt-3 font-mono text-[11px]">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#7dd3fc]"
                      >
                        View Source <ArrowUpRight className="size-3.5 text-[#ff77bc]" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: EXPERIENCE TIMELINE & EDUCATION */}
        <section
          id="experience"
          className="scroll-mt-24 border-y border-[#d8b4fe]/20 bg-[#210f38]/55 px-4 py-24 backdrop-blur-md sm:px-8 lg:px-14"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow-micro inline-flex items-center gap-2 text-[#7dd3fc]">
                  <Briefcase className="size-3.5 text-[#c084fc]" /> 03 // Experience
                </p>
                <h2 className="editorial-display mt-3 text-3xl text-white sm:text-5xl">
                  Growing through production.
                </h2>
              </div>
              <p className="font-mono text-xs text-[#d8c6f0]/75">
                CrelioHealth · Healthcare SaaS (LIMS & RIS Cloud)
              </p>
            </div>

            <div className="mt-12 divide-y divide-[#d8b4fe]/20 border-y border-[#d8b4fe]/20">
              {experience.map((item) => {
                const isOpen = openRoleIndex === item.index;
                return (
                  <div key={item.index} className="py-6 transition-colors">
                    <button
                      type="button"
                      onClick={() => setOpenRoleIndex(isOpen ? "" : item.index)}
                      aria-expanded={isOpen}
                      className="flex w-full flex-wrap items-center gap-x-5 gap-y-2 text-left"
                    >
                      <span className="font-mono text-xs text-[#ff77bc]">{item.index} //</span>
                      <span className="min-w-0 flex-1 text-xl font-medium text-white sm:text-2xl">
                        {item.role}
                      </span>
                      <span className="font-mono text-xs text-[#7dd3fc]">{item.company}</span>
                      <span className="font-mono text-xs text-[#d8c6f0]/70">{item.period}</span>
                      <ChevronDown
                        className={`size-4 text-[#e9d5ff]/65 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-white" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="mt-5 grid gap-6 pl-0 sm:pl-10 lg:grid-cols-[1.2fr_0.8fr]">
                        <div>
                          <p className="font-mono text-xs text-[#c084fc]">{item.focus}</p>
                          <p className="mt-2 text-sm leading-7 text-[#f3e8ff]/85">{item.summary}</p>
                          <ul className="mt-4 space-y-2 text-sm text-[#f3e8ff]/80">
                            {item.highlights.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-2.5">
                                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#38bdf8]" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-wrap content-start gap-2 lg:justify-end">
                          {item.proof.map((chip) => (
                            <span
                              key={chip}
                              className="rounded-full border border-[#d8b4fe]/25 bg-[#a855f7]/15 px-3.5 py-1.5 font-mono text-[11px] text-white"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="glass-card mt-12 grid gap-6 rounded-3xl p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#7dd3fc]/35 bg-[#38bdf8]/15 text-[#7dd3fc]">
                  <GraduationCap className="size-6" />
                </span>
                <div>
                  <p className="eyebrow-micro text-[#c084fc]">Education & Leadership</p>
                  <h3 className="mt-2 text-lg font-medium text-white sm:text-xl">
                    {education.institution}
                  </h3>
                  <p className="mt-1 text-sm text-[#f3e8ff]/80">
                    {education.degree} · <span className="font-mono">{education.period}</span>
                  </p>
                  <p className="mt-2 font-mono text-xs text-[#d8c6f0]/75">{education.leadership}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-[#d8b4fe]/25 bg-[#160929]/75 px-6 py-4 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#d8c6f0]/70">
                  Cumulative GPA
                </p>
                <p className="mt-1 font-mono text-2xl font-semibold text-white">
                  {education.cgpa}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: INTERACTIVE TECHNICAL STACK (Balanced 6-col layout) */}
        <section id="stack" className="scroll-mt-24 px-4 py-24 sm:px-8 lg:px-14">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow-micro inline-flex items-center gap-2 text-[#7dd3fc]">
                  <Terminal className="size-3.5 text-[#ff77bc]" /> 04 // Technical Arsenal
                </p>
                <h2 className="editorial-display mt-3 text-3xl text-white sm:text-5xl">
                  End-to-end engineering stack.
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveStackIndex("All")}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-all ${
                    activeStackIndex === "All"
                      ? "bg-gradient-to-r from-[#ff4da6] via-[#a855f7] to-[#38bdf8] font-semibold text-white shadow-[0_6px_20px_rgba(168,85,247,0.45)]"
                      : "glass-pill text-[#f3e8ff]/80 hover:text-white"
                  }`}
                >
                  All layers
                </button>
                {stackGroups.map((group) => (
                  <button
                    key={group.index}
                    type="button"
                    onClick={() => setActiveStackIndex(group.index)}
                    className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-all ${
                      activeStackIndex === group.index
                        ? "bg-gradient-to-r from-[#ff4da6] via-[#a855f7] to-[#38bdf8] font-semibold text-white shadow-[0_6px_20px_rgba(168,85,247,0.45)]"
                        : "glass-pill text-[#f3e8ff]/80 hover:text-white"
                    }`}
                  >
                    {group.label.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-6">
              {visibleStacks.map((group, idx) => {
                const GroupIcon = stackIcons[idx] ?? Code2;
                const spanClass =
                  activeStackIndex === "All"
                    ? idx < 3
                      ? "md:col-span-2"
                      : "md:col-span-3"
                    : "md:col-span-6";
                const iconStyle =
                  idx % 3 === 0
                    ? "border-[#ff77bc]/30 bg-[#ff4da6]/18 text-[#ff77bc]"
                    : idx % 3 === 1
                      ? "border-[#c084fc]/30 bg-[#a855f7]/18 text-[#c084fc]"
                      : "border-[#7dd3fc]/30 bg-[#38bdf8]/18 text-[#7dd3fc]";
                return (
                  <div key={group.index} className={`glass-card rounded-3xl p-6 ${spanClass}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#7dd3fc]">{group.index} //</span>
                        <h3 className="text-base font-medium text-white">{group.label}</h3>
                      </div>
                      <span
                        className={`flex size-8 items-center justify-center rounded-full border ${iconStyle}`}
                      >
                        <GroupIcon className="size-4" />
                      </span>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[#d8b4fe]/25 bg-[#160929]/55 px-3 py-1.5 font-mono text-xs text-[#f3e8ff] transition-colors hover:border-[#7dd3fc] hover:bg-[#38bdf8]/18 hover:text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 7: WORKING TOGETHER & EDITORIAL CONTACT FINALE */}
        <section
          id="contact"
          className="scroll-mt-24 border-t border-[#d8b4fe]/20 bg-[#180a2b]/82 px-4 pb-12 pt-24 sm:px-8 lg:px-14"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p className="eyebrow-micro inline-flex items-center gap-2 text-[#c084fc]">
                  <Sparkles className="size-3.5 text-[#ff77bc]" /> 05 // Working Together
                </p>
                <h2 className="editorial-display mt-5 text-3xl text-white sm:text-5xl">
                  Software reliability shouldn’t be an afterthought bolted on before release.
                </h2>
              </div>

              <div className="space-y-6">
                <p className="text-base leading-7 text-[#f3e8ff]/80">
                  I partner with product and engineering teams to build clean React interfaces,
                  dependable Django & FastAPI backends, automated test suites, and observable
                  production pipelines.
                </p>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  data-cursor="Copy"
                  className="glass-pill gap-3 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-white"
                >
                  {emailCopied ? (
                    <>
                      <Check className="size-4 text-[#86efac]" />
                      <span className="text-[#86efac]">Email address copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-4 text-[#7dd3fc]" />
                      <span>Copy email address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="glass-card mt-16 grid gap-8 rounded-3xl p-6 sm:p-10 lg:grid-cols-[240px_1fr_auto] lg:items-center">
              <div className="flex flex-col items-center">
                <div className="relative flex size-52 items-center justify-center">
                  <div
                    aria-hidden="true"
                    className="animate-spin-slow absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#ff4da6,#a855f7,#38bdf8,#ff4da6)] p-[3px] opacity-85"
                  >
                    <div className="h-full w-full rounded-full bg-[#1c0b29]" />
                  </div>
                  <img
                    src={stylizedPortrait}
                    alt="Stylized portrait of Neha Lakhdive"
                    className="animate-float relative z-10 size-48 rounded-full border-2 border-[#d8b4fe]/45 object-cover shadow-[0_0_40px_rgba(168,85,247,0.45)]"
                  />
                </div>
                <span className="pink-sticker mt-4 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]">
                  <Sparkles className="size-3" /> Open to Connect
                </span>
              </div>

              <div>
                <p className="eyebrow-micro inline-flex items-center gap-2 text-[#7dd3fc]">
                  <Code2 className="size-3.5 text-[#ff77bc]" /> What I build
                </p>
                <ul className="mt-4 space-y-2.5 text-base font-medium text-white sm:text-lg">
                  {principles.map((item, idx) => (
                    <li key={item} className="flex items-center gap-3">
                      <span
                        className={`size-2 shrink-0 rounded-full ${
                          idx % 3 === 0
                            ? "bg-[#ff4da6]"
                            : idx % 3 === 1
                              ? "bg-[#a855f7]"
                              : "bg-[#38bdf8]"
                        }`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 max-w-xl text-sm leading-6 text-[#d8c6f0]/75">
                  1.5+ years of production full-stack delivery at CrelioHealth, building clinical
                  workflows, automated quality infrastructure, and applied AI tools.
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:items-end">
                <span className="eyebrow-micro text-[#d8c6f0]/65">Get in touch</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  data-cursor="Copy email"
                  className="text-left font-mono text-base font-medium text-white underline decoration-[#a855f7] underline-offset-4 transition-colors hover:text-[#7dd3fc] sm:text-lg"
                >
                  {profile.email}
                </button>

                <div className="mt-2 flex flex-wrap gap-2.5">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="LinkedIn ↗"
                    className="glass-pill gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white"
                  >
                    <Linkedin className="size-3.5 text-[#7dd3fc]" /> LinkedIn
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="GitHub ↗"
                    className="glass-pill gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white"
                  >
                    <Github className="size-3.5 text-[#c084fc]" /> GitHub
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    data-cursor="Email ↗"
                    className="glass-pill gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white"
                  >
                    <Mail className="size-3.5 text-[#ff77bc]" /> Mail
                  </a>
                </div>
              </div>
            </div>

            <footer className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#d8b4fe]/20 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[#d8c6f0]/60">
              <span>© 2026 {profile.name}</span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-3.5 text-[#7dd3fc]" /> {profile.location}
              </span>
              <span>{profile.role}</span>
            </footer>
          </div>
        </section>
      </main>

      <CaseOverlay
        activeCase={selectedCase}
        onClose={() => setSelectedCase(null)}
        onStep={handleStepCase}
      />
      <SystemReelModal open={reelOpen} onClose={() => setReelOpen(false)} />
    </div>
  );
}
