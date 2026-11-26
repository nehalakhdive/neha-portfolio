export interface CaseStudy {
  id: string;
  index: string;
  client: string;
  title: string;
  subtitle: string;
  category: string;
  period: string;
  featuredWide?: boolean;
  depth: number;
  summary: string;
  problem: string;
  implementation: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
  links: { label: string; href: string }[];
  previewKind: "modi" | "uploads" | "audit";
}

export interface ExperienceEntry {
  index: string;
  role: string;
  company: string;
  context: string;
  period: string;
  focus: string;
  summary: string;
  highlights: string[];
  proof: string[];
}

export interface RepositoryItem {
  name: string;
  description: string;
  language: string;
  highlight: string;
  url: string;
}

export const profile = {
  name: "Neha Lakhdive",
  monogram: "NL",
  role: "Full-Stack Software Developer",
  location: "Pune, India",
  email: "lakhdiveneha@gmail.com",
  github: "https://github.com/nehalakhdive",
  githubRepos: "https://github.com/nehalakhdive?tab=repositories",
  linkedin: "https://www.linkedin.com/in/nehalakhdive-dev/",
  x: "https://x.com/LakhdiveNeha",
  headline: "Full-stack systems built with clarity, telemetry, and test-backed precision.",
  bio: "I am Neha Lakhdive, a Full-Stack Software Developer with 1.5+ years of production engineering experience across React, TypeScript, Python, and Django. My work sits at the intersection of responsive frontend architecture and resilient backend systems—turning high-volume clinical and enterprise workflows into fast, observable, and maintainable software.",
  secondaryBio:
    "Beyond full-stack product engineering, I research applied AI and computer vision—co-developing a recognition and translation pipeline for historical handwritten Modi script.",
};

export const heroSignals = [
  { value: "632", label: "Automated tests", detail: "Jest · RTL · pytest" },
  { value: "14", label: "Clinical screens", detail: "6× upload capacity" },
  { value: "113", label: "Failure paths", detail: "Sentry · OpenTelemetry" },
  { value: "15", label: "Production fixes", detail: "Live clinical modules" },
] as const;

export const caseStudies: CaseStudy[] = [
  {
    id: "modi-script-translator",
    index: "01",
    client: "Applied AI & Computer Vision",
    title: "Modi Script Recognition & Translation Pipeline",
    subtitle: "ICRACE 2026 Best Paper Award · React + FastAPI + ResNet-50",
    category: "Applied AI",
    period: "2026",
    featuredWide: true,
    depth: -14,
    summary:
      "End-to-end optical character recognition and transliteration pipeline converting handwritten historical Modi script into Devanagari, Marathi, and English.",
    problem:
      "Historical documents written in cursive Modi script remain inaccessible to modern digital search and linguistic analysis due to complex ligatures, stroke variations, and the lack of standardized OCR tooling.",
    implementation:
      "Combined image preprocessing (noise reduction, binarization, character segmentation) with a fine-tuned ResNet-50 classifier, Unicode Modi script mapping (U+11600–U+1165F), Levenshtein dictionary correction, and GPT-4o Vision OCR behind a React and FastAPI architecture.",
    highlights: [
      "Received the Best Paper Award at ICRACE 2026 (1st International Conference on Recent Advances in Computer Engineering).",
      "Combines Unicode range U+11600–U+1165F mapping with Levenshtein post-correction for cleaner Marathi output.",
      "Built an end-to-end React + FastAPI workflow pairing classical computer vision with modern OCR.",
    ],
    metrics: [
      { label: "Unicode Block", value: "U+11600" },
      { label: "Recognition", value: "ResNet-50" },
      { label: "Award", value: "Best Paper" },
    ],
    stack: ["Python", "FastAPI", "React", "TypeScript", "ResNet-50", "GPT-4o Vision", "OpenCV"],
    links: [
      { label: "GitHub Repository", href: "https://github.com/nehalakhdive/modi-script-translator" },
      {
        label: "ICRACE 2026 Paper",
        href: "https://drive.google.com/file/d/1447odykK7bYoXd-ls5Ql7b6a6KrsJiP2/view?usp=sharing",
      },
    ],
    previewKind: "modi",
  },
  {
    id: "upload-architecture",
    index: "02",
    client: "CrelioHealth · LIMS & RIS Cloud",
    title: "Unified File Handling & Telemetry Architecture",
    subtitle: "14 Clinical Screens · 6× Upload Capacity · 113 Traced Paths",
    category: "Architecture",
    period: "2026",
    depth: 16,
    summary:
      "Consolidated fragmented patient, billing, and insurance file flows into one shared React + TypeScript upload architecture backed by granular Sentry and OpenTelemetry instrumentation.",
    problem:
      "Fragmented upload implementations across clinical screens produced inconsistent validation, constrained file-size limits, and silent client-side failures during network interruptions.",
    implementation:
      "Standardized upload, preview, and scan workflows across 14 screens with upfront client-side format and boundary validation, resilient retry logic, and structured telemetry across 113 failure paths.",
    highlights: [
      "Increased maximum file-upload capacity by 6× across all 14 standardized clinical screens.",
      "Instrumented 113 distinct failure paths with Sentry and OpenTelemetry for actionable traces.",
      "Eliminated duplicate per-screen upload logic through shared, strictly typed React components.",
    ],
    metrics: [
      { label: "Screens Unified", value: "14" },
      { label: "Capacity Gain", value: "6×" },
      { label: "Traced Paths", value: "113" },
    ],
    stack: ["React", "TypeScript", "Django REST", "Sentry", "OpenTelemetry", "AWS S3"],
    links: [],
    previewKind: "uploads",
  },
  {
    id: "audit-test-modernization",
    index: "03",
    client: "CrelioHealth · Quality & Data Integrity",
    title: "Test Automation & Audit Trail Modernization",
    subtitle: "632 Automated Tests · 7 Audit Action Types · JSON-Safe Pipelines",
    category: "Reliability",
    period: "2025 – 2026",
    depth: 16,
    summary:
      "Scaled automated frontend and backend test suites to 632 tests, engineered MySQL-backed audit logging across 7 core user actions, and replaced legacy pickle payloads with JSON-safe pipelines.",
    problem:
      "Rapid product iteration in regulated healthcare workflows demanded stronger regression guarantees, traceable user-action auditing, and safer serialization boundaries.",
    implementation:
      "Expanded Jest, React Testing Library, and pytest suites; shipped MySQL schema migrations for structured 7-action audit logging; and eliminated deserialization risks by migrating legacy pickle retry state to JSON-safe identifiers.",
    highlights: [
      "Expanded automated test coverage to 632 tests across frontend and backend codebases.",
      "Resolved 15 high-priority production exceptions with explicit boundary validation.",
      "Implemented 7 structured audit action types backed by MySQL migrations.",
    ],
    metrics: [
      { label: "Automated Tests", value: "632" },
      { label: "Audit Actions", value: "7" },
      { label: "Prod Fixes", value: "15" },
    ],
    stack: ["Jest", "React Testing Library", "pytest", "Python", "Django", "MySQL", "Redis"],
    links: [],
    previewKind: "audit",
  },
];

export const experience: ExperienceEntry[] = [
  {
    index: "03",
    role: "Software Developer",
    company: "CrelioHealth",
    context: "Healthcare SaaS (LIMS & RIS Cloud Platform) · Pune, India",
    period: "Nov 2026 – Present",
    focus: "Scalable Architecture, Test Engineering & Observability",
    summary:
      "Leading full-stack feature delivery and platform reliability across React/TypeScript and Python/Django, uniting automated quality gates with end-to-end observability.",
    highlights: [
      "Expanded end-to-end automated test coverage to 632 frontend and backend tests using Jest, React Testing Library, and pytest.",
      "Standardized file-handling workflows across 14 application screens, delivering a 6× upload-capacity increase.",
      "Instrumented structured telemetry across 113 failure paths using Sentry and OpenTelemetry.",
    ],
    proof: ["632 automated tests", "14 screens · 6× capacity", "113 instrumented paths"],
  },
  {
    index: "02",
    role: "Junior Software Developer",
    company: "CrelioHealth",
    context: "Healthcare SaaS (LIMS & RIS Cloud Platform) · Pune, India",
    period: "Aug 2025 – Nov 2026",
    focus: "Production Reliability, Auditability & Core Workflows",
    summary:
      "Delivered high-impact product modules, data traceability migrations, and real-time clinical workflows across three production repositories.",
    highlights: [
      "Diagnosed and resolved 15 high-priority production exceptions across live clinical modules.",
      "Architected structured audit logging across 7 core user action types and executed MySQL schema migrations.",
      "Built interactive data views and real-time integrations with React, Redux, Django REST Framework, and Redis.",
    ],
    proof: ["15 production fixes", "7 audit action types", "React · DRF · Redis"],
  },
  {
    index: "01",
    role: "Engineering Intern (Converted via PPO)",
    company: "CrelioHealth",
    context: "Healthcare SaaS (LIMS & RIS Cloud Platform) · Pune, India",
    period: "Feb 2025 – Aug 2025",
    focus: "Data Security & Query Localization",
    summary:
      "Shipped production frontend and backend enhancements for healthcare laboratory workflows, earning a Pre-Placement Offer for engineering ownership.",
    highlights: [
      "Eliminated deserialization vulnerabilities by replacing legacy pickle serialization with JSON-safe pipelines.",
      "Engineered localized US-format date search and filtering workflows across patient and diagnostic records.",
      "Contributed full-stack features across React, TypeScript, Python, and Django.",
    ],
    proof: ["PPO conversion", "JSON-safe retries", "US date localization"],
  },
];

export const stackGroups = [
  {
    index: "01",
    label: "Frontend Architecture",
    items: ["React", "TypeScript", "Next.js", "JavaScript", "Redux", "Tailwind CSS", "HTML5 / SCSS", "AG Grid", "Recharts"],
  },
  {
    index: "02",
    label: "Backend & APIs",
    items: ["Python", "Django", "Django REST Framework", "FastAPI", "Node.js", "REST APIs", "Webhooks"],
  },
  {
    index: "03",
    label: "Data & Cloud Infra",
    items: ["MySQL", "MongoDB", "Redis", "Elasticsearch", "Docker", "AWS S3"],
  },
  {
    index: "04",
    label: "Quality & Observability",
    items: ["Jest", "React Testing Library", "pytest", "Sentry", "OpenTelemetry", "Git", "CI/CD"],
  },
  {
    index: "05",
    label: "Applied AI & Vision",
    items: ["ResNet-50", "GPT-4o Vision", "OCR Pipelines", "OpenCV", "Unicode U+11600"],
  },
] as const;

export const repositories: RepositoryItem[] = [
  {
    name: "modi-script-translator",
    description:
      "Full-stack Modi Lipi to Marathi translator combining Unicode script mapping (U+11600–U+1165F), Levenshtein dictionary correction, and GPT-4o Vision OCR with React + FastAPI.",
    language: "Python",
    highlight: "OCR + FastAPI + React",
    url: "https://github.com/nehalakhdive/modi-script-translator",
  },
  {
    name: "Page-Replacement-Algorithm",
    description: "Python implementation and comparative analysis of operating system page-replacement scheduling strategies.",
    language: "Python",
    highlight: "Systems & Algorithms",
    url: "https://github.com/nehalakhdive/Page-Replacement-Algorithm",
  },
];

export const recognition = [
  {
    title: "Best Paper Award — ICRACE 2026",
    detail: "1st International Conference on Recent Advances in Computer Engineering",
    kind: "Research",
    href: "https://drive.google.com/file/d/1550cvwhzY11KSi9tBzvhCklkaFYOMgBQ/view?usp=drive_link",
  },
  {
    title: "1st Place — Technovation 2026",
    detail: "3rd National-Level Project Competition, MES Wadia College of Engineering",
    kind: "Competition",
    href: "https://drive.google.com/file/d/12WeH34uiqpFl_aQ3mMlGb8amixWc5kov/view?usp=sharing",
  },
  {
    title: "Programming in Java",
    detail: "NPTEL — Indian Institute of Technology (IIT) Kharagpur",
    kind: "Certification",
    href: "https://drive.google.com/file/d/1dv-D8H6ypOGziLQDle2yZQblbbFgiAuZ/view?usp=drive_link",
  },
  {
    title: "DSA Using Python",
    detail: "NPTEL — Indian Institute of Technology (IIT) Madras",
    kind: "Certification",
    href: "https://drive.google.com/file/d/1M0yppZdsDQsmpFZGJcMPEqiabsRPs-FM/view?usp=drive_link",
  },
  {
    title: "Complete Full-Stack Web Bootcamp",
    detail: "Udemy — Full-Stack Web Engineering",
    kind: "Certification",
    href: "https://drive.google.com/file/d/15FN8StIFPlcKjBotMy2Btq9LhA2OtWUN/view?usp=drive_link",
  },
] as const;

export const education = {
  institution: "Modern Education Society's Wadia College of Engineering, Pune",
  degree: "Bachelor of Engineering (B.E.) in Computer Engineering",
  period: "2022 – 2026",
  cgpa: "9.02 / 10",
  leadership: "Event Manager — Techverse, MESWCOE",
};

export const principles = [
  "Full-stack React & TypeScript architecture",
  "Python, Django & FastAPI backend systems",
  "Automated testing (Jest, RTL, pytest)",
  "Sentry & OpenTelemetry observability",
  "Applied OCR & computer vision pipelines",
] as const;
