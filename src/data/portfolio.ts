export type ProjectCategory = "Product" | "Web Design" | "UI" | "AI" | "Agentic UI" | "Experiments";

export type Project = {
  slug: string;
  number: string;
  title: string;
  kicker?: string;
  category: string;
  filters: ProjectCategory[];
  description: string;
  tone: "legal" | "cogrow" | "flux" | "savr" | "agent" | "orbit" | "signal";
  status: string;
  outcome: string;
  screens: string[];
  facts?: string[];
  caseStudy: {
    problem: string;
    users: string;
    constraints: string;
    exploration: string;
    architecture: string;
    visual: string;
    system: string;
    responsive: string;
    interaction: string;
    ai: string;
    engineering: string;
    challenges: string;
    learnings: string;
  };
};

export const projects: Project[] = [
  {
    slug: "legal-intelligence",
    number: "01",
    title: "Legal Intelligence",
    kicker: "CONFIDENTIAL DETAILS OMITTED",
    category: "PRODUCT UI · ENTERPRISE UX · AI · FRONTEND",
    filters: ["Product", "UI", "AI"],
    description: "A modern legal workflow experience designed to help teams manage complex information, documents, workflows and decisions through a clearer digital interface.",
    tone: "legal",
    status: "Professional work · High-level case study",
    outcome: "A clearer product model for dense legal work, designed around discoverability, context and user control.",
    screens: ["Matter workspace", "Document review", "Case timeline", "AI insights", "Global search"],
    caseStudy: {
      problem: "Legal work can involve large volumes of documents, statuses, deadlines and decisions. The interface needed to make complexity navigable without hiding important context.",
      users: "Legal professionals and operations teams working across matters, documents and review workflows.",
      constraints: "Sensitive product details, client information and production data are intentionally omitted. The design had to support dense information and careful decision-making.",
      exploration: "Mapped recurring tasks, information dependencies and moments where users needed confidence before acting.",
      architecture: "Organized the workspace around matters, documents, activity, search and insights rather than disconnected feature screens.",
      visual: "A restrained enterprise visual language prioritizes legibility, state clarity and scan-friendly density.",
      system: "Reusable navigation, tables, filters, document states, timelines and feedback patterns create a consistent workflow.",
      responsive: "Critical actions remain available on smaller screens while secondary context moves into focused panels.",
      interaction: "Progressive disclosure keeps advanced controls available without making the default view overwhelming.",
      ai: "AI can summarize documents, surface relevant information and prepare actions while keeping review and approval with the user.",
      engineering: "The interface maps to reusable frontend components and stateful application workflows rather than static screens.",
      challenges: "Balancing information density with clarity and introducing assistance without reducing trust.",
      learnings: "In high-stakes tools, transparent state and predictable interaction matter more than decorative novelty."
    }
  },
  {
    slug: "cogrow",
    number: "02",
    title: "CoGrow",
    category: "PRODUCT DESIGN · SOCIAL COMMERCE · MARKETPLACE · FRONTEND",
    filters: ["Product", "Web Design", "UI", "AI"],
    description: "An influencer-brand collaboration platform designed to help creators and brands discover each other, run campaigns, manage partnerships and grow together.",
    tone: "cogrow",
    status: "Product concept",
    outcome: "A connected two-sided marketplace experience from discovery through campaign delivery.",
    screens: ["Discovery marketplace", "Creator profile", "Campaign builder", "Collaboration workspace", "Campaign Copilot"],
    caseStudy: {
      problem: "Campaign discovery, outreach and delivery are often fragmented across search tools, spreadsheets and messages.",
      users: "Brands planning creator campaigns and influencers looking for relevant partnerships.",
      constraints: "The product must serve two distinct user journeys while keeping campaign state understandable to both sides.",
      exploration: "Explored discovery-first, campaign-first and relationship-first models before combining them into a shared workflow.",
      architecture: "Discovery, profiles, campaigns, collaboration, messaging and analytics connect through a consistent campaign object.",
      visual: "Confident editorial profiles meet clear marketplace controls and action-oriented campaign surfaces.",
      system: "Shared cards, filters, profile modules, milestones and messaging states work across both brand and creator views.",
      responsive: "Discovery becomes a focused feed on mobile; campaign controls collapse into a persistent action tray.",
      interaction: "Filters update results without losing context, and campaign milestones make next actions explicit.",
      ai: "Campaign Copilot analyzes requirements, recommends creator segments, explains why and prepares outreach for user approval.",
      engineering: "Structured around reusable marketplace, profile and workflow primitives suitable for responsive frontend implementation.",
      challenges: "Supporting rich discovery without turning the experience into an endless, low-signal directory.",
      learnings: "Recommendations become more useful when users can inspect reasoning and edit the plan before action."
    }
  },
  {
    slug: "fluxpay",
    number: "03",
    title: "FluxPay",
    category: "FINTECH · REAL-TIME SYSTEM · AI · PRODUCT UI",
    filters: ["Product", "UI", "AI"],
    description: "An intelligent payment routing platform designed to dynamically select optimal payment paths across UPI, cards and digital wallets.",
    tone: "flux",
    status: "Professional engineering project",
    outcome: "Sub-30ms routing decisions with a resilient operational model for real-time payment flows.",
    screens: ["Operations dashboard", "Routing map", "Transaction monitor", "Provider health", "AI failure analysis"],
    facts: ["<30ms routing", "Kafka events", "Redis state", "Fault tolerant", "Idempotent processing"],
    caseStudy: {
      problem: "Payment success depends on choosing a healthy path quickly while handling provider failures and duplicate events safely.",
      users: "Payment operations and engineering teams monitoring routing health and transaction behavior.",
      constraints: "Latency, concurrency, fault tolerance and idempotency are core system requirements. Sensitive production details are omitted.",
      exploration: "Connected operational questions—what failed, why and what changed—to the system events needed to answer them.",
      architecture: "Request → Routing Engine → Rules → Redis State → Payment Provider → Event Stream → Monitoring / AI.",
      visual: "The interface pairs a live routing topology with dense but legible operational tables and health signals.",
      system: "Provider states, event severity, transaction status and routing decisions share a consistent status language.",
      responsive: "Mobile views prioritize payment health and incident triage over the full routing topology.",
      interaction: "Operators can move from a KPI change to provider detail, event history and failure context without losing their filters.",
      ai: "AI-driven failure analysis groups related signals, explains likely causes and proposes recovery steps for human review.",
      engineering: "Kafka supports event flow, Redis supports fast state access, and concurrent processing is designed for resilient routing decisions.",
      challenges: "Representing a fast distributed system without implying certainty where signals are incomplete.",
      learnings: "Operational interfaces should make uncertainty visible and shorten the path from anomaly to evidence."
    }
  },
  {
    slug: "savrai",
    number: "04",
    title: "SavrAI",
    category: "AI PRODUCT · FINTECH · PERSONALIZATION · UI",
    filters: ["Product", "UI", "AI"],
    description: "An AI-powered personal finance platform that transforms financial activity into understandable insights and personalized recommendations.",
    tone: "savr",
    status: "AI product project",
    outcome: "A finance experience that turns transaction data into understandable explanations and next steps.",
    screens: ["Financial overview", "Spending analysis", "AI advisor", "Goals", "Recommendations"],
    caseStudy: {
      problem: "Financial dashboards show what happened but often fail to explain why it changed or what a person can do next.",
      users: "People who want to understand spending patterns and make more informed financial decisions.",
      constraints: "Insights must be understandable, privacy-aware and careful not to present automated suggestions as certainty.",
      exploration: "Tested chart-first, conversation-first and guided-insight models before centering the experience on explainable findings.",
      architecture: "Overview, transactions, trends, goals and advisor views share the same financial context.",
      visual: "Calm data visualization, clear comparisons and focused recommendation cards avoid alarmist financial UI.",
      system: "Insight, trend, transaction, goal and recommendation components adapt across summary and detail contexts.",
      responsive: "Mobile emphasizes the daily snapshot and lets users reveal deeper trends when needed.",
      interaction: "Users can move from an explanation to the underlying transactions, then ask a follow-up without losing context.",
      ai: "The advisor explains changes with evidence and offers a specific analysis action instead of ending at a generic chat response.",
      engineering: "The UI is modeled around structured insight objects that can stream, cite transaction groups and expose next actions.",
      challenges: "Making AI feel useful without overstepping into opaque or overly prescriptive financial advice.",
      learnings: "A strong AI answer pairs a concise explanation with inspectable evidence and a reversible next step."
    }
  },
  {
    slug: "agentos",
    number: "05",
    title: "AgentOS",
    kicker: "EXPERIMENT · SELF-INITIATED",
    category: "AGENTIC UI · PRODUCT SYSTEM · EXPERIMENT",
    filters: ["Product", "UI", "AI", "Agentic UI", "Experiments"],
    description: "A workspace where multiple specialized AI agents collaborate with a user to complete real tasks—without hiding progress, context or control.",
    tone: "agent",
    status: "Self-initiated concept",
    outcome: "A transparent multi-agent interaction model organized around progress, approval and reversibility.",
    screens: ["Project queue", "Agent workspace", "Context panel", "Approval request", "Execution history"],
    caseStudy: {
      problem: "Multi-agent systems can feel opaque when users cannot see who is acting, what tools are used or how to stop a plan.",
      users: "Product and operations teams delegating multi-step knowledge work while retaining final control.",
      constraints: "The experience must communicate streaming progress, shared context, dependencies, approvals and failures clearly.",
      exploration: "Compared chat timelines, kanban plans and process graphs before combining conversation with a visible execution plan.",
      architecture: "Projects and tasks on the left, active agent work in the center, context and approvals on the right.",
      visual: "Agent identity is communicated through roles and state—not avatars—within a restrained operational workspace.",
      system: "Agent status, tool call, action preview, approval, handoff, retry and result patterns form an AI-specific component library.",
      responsive: "On mobile, the active task leads while project context and approvals open as dedicated layers.",
      interaction: "Every consequential action supports preview, approval, progress, completion and rollback states.",
      ai: "Research, strategy, design and execution agents coordinate around one user-approved plan with explicit handoffs.",
      engineering: "Event-driven interface states are designed for streamed responses, parallel tools and recoverable execution.",
      challenges: "Showing enough system behavior to build trust without overwhelming the user with implementation detail.",
      learnings: "Agentic products need an interaction grammar for intent, plans, tools, approvals and recovery—not just a message list."
    }
  },
  {
    slug: "orbit",
    number: "06",
    title: "Orbit",
    kicker: "CONCEPT · WEB DESIGN",
    category: "AI SAAS · MARKETING · WEB DESIGN",
    filters: ["Web Design", "UI", "AI", "Experiments"],
    description: "A conversion-focused website for a fictional AI operations platform helping growing teams coordinate work with intelligent workflows.",
    tone: "orbit",
    status: "Self-initiated concept",
    outcome: "A complete marketing narrative that makes a complex AI product tangible and credible.",
    screens: ["Editorial hero", "Interactive demo", "Benefit story", "Workflow", "Pricing"],
    caseStudy: {
      problem: "AI operations products often use abstract claims without showing the product, workflow or boundaries of automation.",
      users: "Operations leaders and growing teams evaluating practical AI workflow software.",
      constraints: "The page must create trust, explain the product quickly and support conversion across desktop and mobile.",
      exploration: "Tested product-led, outcome-led and category-led narratives, selecting a product-led story with visible workflow evidence.",
      architecture: "Hero, proof, demo, benefits, features, workflow, testimonials, pricing, FAQ and final CTA.",
      visual: "Editorial typography and crisp product demonstrations make the interface itself the visual centerpiece.",
      system: "Marketing sections reuse a controlled type scale, content grid, buttons, proof modules and product frames.",
      responsive: "The mobile story preserves the product demo early and converts wide comparisons into focused sequences.",
      interaction: "Demo states and plan comparison controls create useful interaction without distracting from the narrative.",
      ai: "The site demonstrates what Orbit plans, what it can execute and where approval remains required.",
      engineering: "The page is designed as a performant component system with accessible disclosure and pricing controls.",
      challenges: "Balancing conversion density with the whitespace and restraint of a premium product brand.",
      learnings: "The best AI marketing replaces broad promises with visible product behavior and precise boundaries."
    }
  },
  {
    slug: "signal",
    number: "07",
    title: "Signal",
    kicker: "CONCEPT · SELF-INITIATED",
    category: "DATA VISUALIZATION · DASHBOARD · PRODUCT UI",
    filters: ["Product", "UI", "AI", "Experiments"],
    description: "A modern operational intelligence command center for monitoring KPIs, real-time activity, alerts and the causes behind change.",
    tone: "signal",
    status: "Self-initiated concept",
    outcome: "A responsive command center that connects a metric change to evidence, explanation and action.",
    screens: ["Command center", "KPI drilldown", "Alert stream", "Ask Signal", "Mobile operations"],
    caseStudy: {
      problem: "Operational teams can see that a metric changed but must search across multiple views to understand why.",
      users: "Operators and product leaders monitoring business and system health in real time.",
      constraints: "Dense information must remain scannable, responsive and clear during high-attention moments.",
      exploration: "Mapped monitoring, investigation and action as one continuous loop rather than separate dashboard pages.",
      architecture: "Overview KPIs lead into dimensions, events, correlated alerts and an evidence-backed AI explanation.",
      visual: "A dark command-center canvas uses color only for meaning, with calm charts and clear alert hierarchy.",
      system: "Metrics, filters, charts, alerts, drilldowns and query states share consistent density and interaction rules.",
      responsive: "Mobile surfaces urgent changes, alert context and essential actions in a single-column priority order.",
      interaction: "Cross-filtering preserves the investigation trail and makes the active comparison visible.",
      ai: "Ask Signal analyzes linked metrics, highlights likely causes and cites the data behind each explanation.",
      engineering: "Designed for streaming event data, query state, responsive visualizations and modular dashboard composition.",
      challenges: "Avoiding false causality while still helping the user form a useful next question.",
      learnings: "AI analysis earns trust by separating observation, correlation and recommendation."
    }
  }
];

export const capabilities = [
  { number: "01", title: "UI & Web Design", copy: "Designing clean, responsive interfaces with strong hierarchy, typography, spacing, interaction patterns and visual systems.", skills: ["Web Design", "UI Design", "Responsive Design", "Design Systems", "Figma", "Prototyping", "Accessibility"] },
  { number: "02", title: "Frontend Engineering", copy: "Turning product ideas and designs into scalable, responsive and production-ready experiences.", skills: ["React", "Angular", "TypeScript", "JavaScript", "HTML/CSS", "REST APIs", "Real-time interfaces", "Performance"] },
  { number: "03", title: "AI & Agentic UI", copy: "Designing interfaces where AI can understand context, reason about tasks, interact with tools and help users accomplish real work.", skills: ["AI Interfaces", "Agentic Workflows", "AI Copilots", "LLM Interfaces", "Human-in-the-loop", "Tool Calling", "Streaming UI"] }
];

export const experiments = ["Agentic UI", "AI-native dashboards", "Adaptive interfaces", "AI design assistants", "Generative interfaces", "Voice + UI interactions", "Real-time collaborative interfaces", "AI-powered developer tools", "Design-to-code workflows", "Human-in-the-loop systems"];

export const tools = {
  Frontend: ["React", "Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind"],
  Backend: ["Java", "Spring Boot", "Node.js", "Express"],
  AI: ["LLMs", "Prompt Engineering", "AI Workflow Orchestration", "Spring AI", "HuggingFace"],
  Systems: ["Kafka", "Redis", "PostgreSQL", "MongoDB", "MySQL"],
  Cloud: ["AWS", "Docker", "CI/CD", "Prometheus", "Grafana", "Git"],
  Design: ["Figma", "Design Systems", "Responsive Design", "Prototyping", "UI Design"]
};
