import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectVisual } from "@/components/portfolio/project-visual";
import { getResume } from "@/lib/resume-store";

export const Route = createFileRoute("/work/$slug")({
  loader: () => getResume(),
  head: ({ loaderData: r, params }) => {
    const project = r.projects.find((p) => p.slug === params.slug);
    return {
      meta: [
        {
          title: project
            ? `${project.title} — ${r.meta.name}`
            : `Project unavailable — ${r.meta.name}`,
        },
        {
          name: "description",
          content: project?.description ?? `A project case study by ${r.meta.name}.`,
        },
        {
          property: "og:title",
          content: project
            ? `${project.title} — ${r.meta.name}`
            : "Project unavailable",
        },
        {
          property: "og:description",
          content: project?.outcome ?? `A case study by ${r.meta.name}.`,
        },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/work/${params.slug}` }],
    };
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { slug } = Route.useParams();
  const { projects, meta } = Route.useLoaderData();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="page-shell">
        <section className="page-hero">
          <p className="eyebrow">PROJECT / UNAVAILABLE</p>
          <h1>This project is not here.</h1>
          <Button asChild>
            <Link to="/work">
              <ArrowLeft /> Back to work
            </Link>
          </Button>
        </section>
      </div>
    );
  }

  const narrative: [string, string][] = [
    ["Overview", project.description],
    ["The problem", project.caseStudy.problem],
    ["The people", project.caseStudy.users],
    ["The constraints", project.caseStudy.constraints],
    ["Exploration", project.caseStudy.exploration],
    ["Product architecture", project.caseStudy.architecture],
    [
      "Wireframe direction",
      `The interface study organizes ${project.screens.slice(0, 3).join(", ").toLowerCase()} into a focused task hierarchy. Original research and working wireframe files are not included here.`,
    ],
    ["Visual direction", project.caseStudy.visual],
    ["System thinking", project.caseStudy.system],
    [
      "Final interface study",
      `The illustrative interface above translates this direction into a product composition. Sample content demonstrates hierarchy and state; it is not a production screenshot.`,
    ],
    ["Responsive behavior", project.caseStudy.responsive],
    ["Interaction model", project.caseStudy.interaction],
    ["AI behavior", project.caseStudy.ai],
    ["Engineering", project.caseStudy.engineering],
    ["Challenges", project.caseStudy.challenges],
    ["Outcome", project.outcome],
    ["Learnings", project.caseStudy.learnings],
  ];

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length] ?? projects[0];

  return (
    <div className="page-shell case-study">
      <header className="case-hero grid-surface">
        <div>
          <p className="eyebrow">{project.number} / CASE STUDY</p>
          <h1>{project.title}</h1>
        </div>
        <div>
          <p>{project.description}</p>
          <div className="case-meta">
            <span>{project.status}</span>
            <span>{project.category}</span>
          </div>
        </div>
      </header>

      <section className="case-evidence section-pad" aria-label="Project evidence">
        <div>
          <small>PROJECT CONTEXT</small>
          <p>
            {project.status}.{" "}
            {project.tone === "flux"
              ? "Engineering evidence: sub-30ms routing decisions, Kafka event flow, Redis state, and idempotent processing."
              : project.tone === "legal"
                ? "High-level legal workflow experience. Confidential product and client details are omitted."
                : "Product and interface exploration; no production adoption or business impact is claimed."}
          </p>
        </div>
        <div>
          <small>WHAT THIS CASE STUDY SHOWS</small>
          <p>
            {project.tone === "flux"
              ? "Professional system engineering with an illustrative operations interface. The UI composition is a separate presentation study, not a shipped production UI claim."
              : "Product hierarchy, interface direction, reusable patterns, and AI interaction opportunities. Visuals use sample content; outcomes remain qualitative."}
          </p>
        </div>
      </section>

      <figure className="case-cover">
        <ProjectVisual project={project} />
        <figcaption>Illustrative product interface · Sample data · Not a production screenshot</figcaption>
      </figure>

      <section className="case-content section-pad">
        {narrative.map(([title, copy], index) => (
          <article className="case-block" key={title}>
            <div>
              <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <h2>{title}</h2>
            </div>
            <div>
              <p>{copy}</p>
              {index === 0 && project.facts && project.facts.length > 0 && (
                <div className="case-facts">
                  {project.facts.map((fact) => (
                    <span key={fact}>{fact}</span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      {nextProject && (
        <section className="next-project section-pad grid-surface">
          <p className="eyebrow">NEXT CASE STUDY</p>
          <div>
            <h2>{nextProject.title}</h2>
            <Button asChild variant="outline">
              <Link to="/work/$slug" params={{ slug: nextProject.slug }}>
                View project <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
