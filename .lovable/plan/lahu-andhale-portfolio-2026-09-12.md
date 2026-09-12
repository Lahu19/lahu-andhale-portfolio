# Lahu Andhale Portfolio

## Goal
Build a dark, editorial portfolio that presents Lahu as a multidisciplinary product builder across design, frontend engineering, and AI/agentic interfaces. The site itself will function as the strongest portfolio piece: polished, responsive, accessible, and deliberately product-like rather than resume-like.

## Site structure
- **Home** — sticky navigation, editorial hero with interactive AI workspace, positioning statement, capabilities, featured work, systems showcase, design-to-code process, agentic UI philosophy, experience, achievements, tools, lab preview, and contact CTA.
- **Work** — filterable project gallery for Product, Web Design, UI, AI, Agentic UI, and Experiments.
- **Seven case studies** — Legal Intelligence, CoGrow, FluxPay, SavrAI, AgentOS, Orbit, and Signal, each with the requested 17-part case-study narrative and honest labels for real, confidential, and conceptual work.
- **About** — biography, working philosophy, experience timeline, achievements, and toolset.
- **Experiments** — premium lab presentation for the ten requested exploration themes with small interactive demonstrations.
- **Contact** — focused closing page with conversation, email, LinkedIn, GitHub, and resume actions.

## Visual direction
- Near-black and graphite surfaces, off-white type, restrained borders, and selective bright green accents.
- Modern grotesk typography with a monospace companion for metadata and system states.
- Subtle technical grid and noise, strong whitespace, sharp editorial hierarchy, and compact product controls.
- Original dashboard and interface compositions created directly in the site for every project, including desktop, tablet, and mobile presentations.
- No generic developer imagery, framework-first branding, fake testimonials, invented clients, or unsupported metrics.

## Interaction and behavior
- Compact-on-scroll desktop navigation and an accessible mobile menu.
- Animated project filtering and polished case-study navigation.
- AI workspace streaming simulation, agent progress and approval states, interactive project visuals, restrained reveals, and button/image micro-interactions.
- Smooth scrolling and page transitions with reduced-motion support.
- Keyboard-accessible controls, visible focus states, semantic landmarks, strong contrast, and descriptive image/interface labels.

## Content integrity
- Preserve the supplied employers, roles, dates, technologies, and measurable achievements exactly.
- Mark Legal Intelligence details as confidential where needed.
- Label AgentOS as **Experiment · Self-initiated**, and Orbit/Signal as concepts where appropriate.
- Keep project outcomes qualitative unless the brief supplies a verified metric.
- Use clearly replaceable placeholders for personal email, LinkedIn, GitHub, and resume destinations because URLs were not provided.

## Technical approach
- Extend the existing TanStack Start structure with shared navigation, footer, project data, reusable product mockups, and dedicated route files.
- Build semantic color, typography, spacing, glow, grid, and motion tokens in the global Tailwind v4 design system.
- Add route-specific metadata for every page and case study, including the requested home title, description, OpenGraph fields, canonical path, and social card type.
- Keep all experiences frontend-only; no account, database, or private integration is required.

## Validation
- Verify desktop and mobile layouts in the running preview.
- Test navigation, menu behavior, filtering, case-study links, AI workspace controls, and keyboard focus.
- Check console output, route metadata, reduced-motion behavior, content overflow, and contrast-sensitive text.
