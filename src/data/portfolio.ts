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
    category: "FINTECH · REAL-TIME SYSTEM · AI · JAVA · KAFKA · REDIS",
    filters: ["Product", "UI", "AI"],
    description: "A fault-tolerant, real-time payment routing platform supporting UPI, cards and digital wallets — achieving sub-30ms routing decisions under high concurrency via a multithreaded rule engine and Redis-based state caching.",
    tone: "flux",
    status: "Professional engineering project · 2025 – Present",
    outcome: "Sub-30ms routing decisions, exactly-once transaction processing, and AI-driven self-healing that reduces manual intervention.",
    screens: ["Operations dashboard", "Routing map", "Transaction monitor", "Provider health", "AI failure analysis"],
    facts: ["<30ms routing decisions", "Kafka idempotent consumers", "Redis-lock deduplication", "Exactly-once processing", "AI agentic self-healing"],
    caseStudy: {
      problem: "Payment success depends on choosing a healthy path in milliseconds while handling provider failures, duplicate events and high concurrency safely.",
      users: "Payment operations and engineering teams monitoring routing health and transaction behavior in real time.",
      constraints: "Sub-30ms latency, concurrency safety, fault tolerance and exactly-once idempotency are non-negotiable system requirements.",
      exploration: "Designed around a multithreaded rule engine with Redis-based state caching to push routing decisions under 30ms even under load.",
      architecture: "Request → Multithreaded Rule Engine → Redis State Cache → Payment Provider → Kafka Event Stream → AI Self-Healing → Monitoring.",
      visual: "The illustrative interface pairs a live routing topology with dense but legible operational tables and provider health signals.",
      system: "Provider states, event severity, transaction status and routing decisions share a consistent operational status language.",
      responsive: "Mobile views prioritize payment health and incident triage over the full routing topology.",
      interaction: "Operators can move from a KPI change to provider detail, event history and failure context without losing their filters.",
      ai: "Agentic self-healing workflows analyze payment failures in real time and automatically adjust routing rules — improving system resilience without manual intervention.",
      engineering: "Idempotent Kafka consumers with Redis-lock deduplication guarantee exactly-once transaction processing during retries and failure scenarios. Scalability validated via load testing with failure isolation and graceful degradation.",
      challenges: "Ensuring exactly-once correctness under concurrent retries while maintaining sub-30ms decision latency at scale.",
      learnings: "Combining idempotent event processing with AI-driven self-healing removes the class of failures that previously required human intervention."
    }
  },
  {
    slug: "savrai",
    number: "04",
    title: "SavrAI",
    category: "AI PRODUCT · FINTECH · MERN STACK · PYTHON · LLMs",
    filters: ["Product", "UI", "AI"],
    description: "An AI-powered personal finance platform engineered with a fine-tuned LLM advisor, reinforcement-style feedback loops, Python spending-pattern pipelines, and secure JWT-based full-stack infrastructure.",
    tone: "savr",
    status: "AI product project · Jan 2025 – Present",
    outcome: "A personalized finance experience where recommendation quality improves over time through user behavior signals and fine-tuned LLM responses.",
    screens: ["Financial overview", "Spending analysis", "AI advisor", "Goals", "Recommendations"],
    caseStudy: {
      problem: "Financial dashboards show what happened but fail to explain why it changed or what a person should do next — and generic AI advisors don't improve from user behavior.",
      users: "People who want to understand spending patterns and make more informed, personalized financial decisions.",
      constraints: "Insights must be privacy-aware; the LLM advisor must improve over time without exposing raw user data; authentication must be role-based.",
      exploration: "Engineered reinforcement-style feedback loops so the fine-tuned LLM improves recommendation quality based on how users respond to suggestions over time.",
      architecture: "MERN Stack frontend and APIs → Python behavioral insight pipelines → Fine-tuned LLM advisor → MongoDB data models → JWT auth with RBAC.",
      visual: "Calm data visualization, clear comparisons and focused recommendation cards built with Tailwind CSS avoid alarmist financial UI patterns.",
      system: "Insight, trend, transaction, goal and recommendation components share the same financial context and adapt across summary and detail views.",
      responsive: "Mobile emphasizes the daily snapshot and lets users reveal deeper trends and advisor suggestions on demand.",
      interaction: "Users can move from an AI explanation to the underlying transactions, then ask a follow-up without losing context.",
      ai: "Fine-tuned LLMs with reinforcement-style feedback loops improve recommendation quality over time. Python pipelines detect spending patterns and generate behavioral insights automatically.",
      engineering: "Secure REST APIs handle authentication, financial data ingestion and analytics. Scalable NoSQL data models in MongoDB support complex financial queries. JWT-based auth with role-based access control secures the full-stack application.",
      challenges: "Ensuring the LLM advisor stays relevant and improves over time without reinforcing poor financial decisions or violating user privacy.",
      learnings: "Reinforcement-style feedback on a domain-specific fine-tuned model produces measurably better recommendations than generic LLM prompting alone."
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
    slug: "political-fund-transparency",
    number: "06",
    title: "Political Fund Transparency",
    kicker: "PUBLISHED RESEARCH · IJRASET 2025",
    category: "BLOCKCHAIN · ETHEREUM · REACT · NODE.JS · WEB3",
    filters: ["Product", "AI", "Experiments"],
    description: "A tamper-proof donation tracking system using Ethereum smart contracts on Sepolia Testnet — ensuring immutable, auditable fund flows with full traceability. Research published in IJRASET 2025.",
    tone: "signal",
    status: "Published research project · Aug 2024 – May 2025",
    outcome: "Immutable, auditable political fund tracking with real-time transparency dashboards, backed by published research in IJRASET 2025.",
    screens: ["Donation dashboard", "Transaction explorer", "Smart contract viewer", "Fund flow graph", "Audit trail"],
    facts: ["Ethereum smart contracts", "Sepolia Testnet deployment", "IJRASET 2025 published", "Immutable audit trail", "Real-time transparency"],
    caseStudy: {
      problem: "Political fund flows are opaque and difficult to audit — donations can be rerouted or misreported without an independent, verifiable record.",
      users: "Citizens, journalists, election monitors and regulatory bodies who need a trustless way to verify political donation flows.",
      constraints: "The system must be tamper-proof by design, publicly verifiable without central authority, and performant enough for real-time dashboards.",
      exploration: "Designed around Ethereum smart contracts as the immutable source of truth, with backend aggregation services providing query performance for dashboards.",
      architecture: "Ethereum smart contracts (Solidity) on Sepolia Testnet → Web3.js event listeners → Node.js aggregation backend → REST APIs → React transparency dashboards.",
      visual: "Clean transparency-first interface with fund flow graphs, transaction explorer and audit trail designed for non-technical citizens.",
      system: "Donation records, smart contract events, fund flows and audit entries share a consistent verification status language.",
      responsive: "Mobile surfaces the most recent transactions and fund totals; desktop enables deep audit trail investigation.",
      interaction: "Users can drill from a headline fund total through aggregated flows down to an individual smart contract transaction on the testnet.",
      ai: "Findings and research methodology published in IJRASET 2025 — 'Corruption Avoidance in Political Party Funds Using Blockchain Technology'.",
      engineering: "Smart contracts deployed on Sepolia Testnet with Solidity. Backend services aggregate blockchain transaction data via Web3.js and expose it through REST APIs. React frontend powers real-time transparency dashboards.",
      challenges: "Balancing blockchain immutability (which prevents corrections) with the real-world need to handle test data, redeployments and evolving contract logic during research.",
      learnings: "Blockchain is most credible when the smart contract logic itself is published and verifiable — the backend and UI only need to present what the chain already proved."
    }
  },
  {
    slug: "orbit",
    number: "07",
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
    number: "08",
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
  { number: "01", title: "Backend & Systems Engineering", copy: "Building high-scale, event-driven, cloud-native backend systems with a focus on correctness, low latency and production reliability.", skills: ["Java", "Spring Boot", "Microservices", "Event-Driven Architecture", "REST APIs", "Distributed Systems", "Low-Latency Systems"] },
  { number: "02", title: "Messaging, Caching & Databases", copy: "Designing resilient data pipelines and storage layers with exactly-once guarantees, idempotent processing and fast state access.", skills: ["Apache Kafka", "Redis", "PostgreSQL", "MongoDB", "MySQL", "Idempotency", "Deduplication"] },
  { number: "03", title: "AI & Agentic Systems", copy: "Integrating LLM-powered automation and agentic workflows into production backend services for real-time intelligence and self-healing capabilities.", skills: ["LLM Fine-Tuning", "HuggingFace", "OpenAI", "Spring AI (MCP)", "Agentic Workflows", "Prompt Engineering", "Anomaly Detection"] }
];

export const experiments = ["Agentic self-healing payment routing", "LLM fine-tuning for financial query understanding", "AI-driven anomaly detection pipelines", "Kafka idempotency patterns", "Spring AI MCP integration", "Redis-lock deduplication strategies", "Blockchain-based fund transparency", "Real-time collaborative interfaces", "AI-powered developer tools", "Human-in-the-loop systems"];

export const tools = {
  Languages: ["Java", "Python", "JavaScript (ES6+)", "TypeScript", "SQL", "C++"],
  Backend: ["Spring Boot", "Spring MVC", "Node.js", "Express.js", "REST APIs", "Microservices"],
  "Concurrency & JVM": ["Multithreading", "Executors", "Thread Pools", "JVM Tuning", "Async Processing"],
  "Messaging & Cache": ["Apache Kafka", "Redis (Caching, Pub/Sub, Locking)"],
  Databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  AI: ["LLM Fine-Tuning (OpenAI, HuggingFace)", "Spring AI (MCP)", "Agentic Workflows", "Prompt Engineering"],
  Frontend: ["React", "Redux", "AngularJS", "HTML5", "CSS3", "Tailwind CSS"],
  "Cloud & DevOps": ["AWS", "Docker", "CI/CD", "Jenkins", "Prometheus", "Grafana", "Git"],
};
