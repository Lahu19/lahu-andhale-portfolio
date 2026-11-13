import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProjectCard } from "@/components/portfolio/project-card";
import { Button } from "@/components/ui/button";
import { getResume } from "@/lib/resume-store";

type Filter = "All" | "Product" | "Web Design" | "UI" | "AI" | "Agentic UI" | "Experiments";
const FILTERS: Filter[] = ["All", "Product", "Web Design", "UI", "AI", "Agentic UI", "Experiments"];

export const Route = createFileRoute("/work/")({
  loader: () => getResume(),
  head: ({ loaderData: r }) => ({
    meta: [
      { title: `Selected Work — ${r.meta.name}` },
      { name: "description", content: `Projects and case studies by ${r.meta.name} — ${r.meta.title}.` },
      { property: "og:title", content: `Selected Work — ${r.meta.name}` },
      { property: "og:description", content: `Engineering projects, AI systems and interface case studies by ${r.meta.name}.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { projects, meta } = Route.useLoaderData();
  const [active, setActive] = useState<Filter>("All");

  const visible =
    active === "All"
      ? projects
      : projects.filter((p) => p.filters.includes(active));

  return (
    <div className="page-shell">
      <header className="page-hero grid-surface">
        <p className="eyebrow">SELECTED WORK / 2023—2026</p>
        <h1>
          Products, systems,
          <br />
          and interfaces <span>built to work.</span>
        </h1>
        <p>
          Professional engineering work and self-initiated explorations across fintech,
          distributed systems, AI automation, and product interfaces.
        </p>
      </header>
      <section className="work-index">
        <div className="filters" role="group" aria-label="Filter projects">
          {FILTERS.map((filter) => (
            <Button
              variant="ghost"
              key={filter}
              className={active === filter ? "active" : ""}
              onClick={() => setActive(filter)}
              aria-pressed={active === filter}
            >
              {filter}
            </Button>
          ))}
        </div>
        <p className="result-count" aria-live="polite">
          {String(visible.length).padStart(2, "0")} PROJECTS
        </p>
        <div className="work-grid">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
