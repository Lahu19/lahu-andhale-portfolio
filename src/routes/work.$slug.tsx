import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectVisual } from "@/components/portfolio/project-visual";
import { projects } from "@/data/portfolio";

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => {
    const project = projects.find((item) => item.slug === params.slug);
    return {
      meta: [
        { title: project ? `${project.title} — Lahu Andhale` : "Project unavailable — Lahu Andhale" },
        { name: "description", content: project?.description ?? "A Lahu Andhale product and interface case study." },
        { property: "og:title", content: project ? `${project.title} — Lahu Andhale` : "Project unavailable — Lahu Andhale" },
        { property: "og:description", content: project?.outcome ?? "A product and interface case study by Lahu Andhale." },
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
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    return <div className="page-shell"><section className="page-hero"><p className="eyebrow">PROJECT / UNAVAILABLE</p><h1>This project isn’t here.</h1><Button asChild><Link to="/work"><ArrowLeft /> Back to work</Link></Button></section></div>;
  }
  const narrative = [
    ["The problem", project.caseStudy.problem], ["The people", project.caseStudy.users], ["The constraints", project.caseStudy.constraints],
    ["Exploration", project.caseStudy.exploration], ["Product architecture", project.caseStudy.architecture], ["Visual direction", project.caseStudy.visual],
    ["System thinking", project.caseStudy.system], ["Responsive behavior", project.caseStudy.responsive], ["Interaction model", project.caseStudy.interaction],
    ["AI behavior", project.caseStudy.ai], ["Engineering", project.caseStudy.engineering], ["Challenges", project.caseStudy.challenges], ["Learnings", project.caseStudy.learnings],
  ];
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  return <div className="page-shell case-study">
    <header className="case-hero grid-surface"><div><p className="eyebrow">{project.number} / CASE STUDY</p><h1>{project.title}</h1></div><div><p>{project.description}</p><div className="case-meta"><span>{project.status}</span><span>{project.category}</span></div></div></header>
    <div className="case-cover"><ProjectVisual project={project} /></div>
    <section className="case-content section-pad">{narrative.map(([title, copy], index) => <article className="case-block" key={title}><div><p className="eyebrow">{String(index + 1).padStart(2, "0")}</p><h2>{title}</h2></div><div><p>{copy}</p>{index === 0 && project.facts && <div className="case-facts">{project.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>}</div></article>)}</section>
    <section className="next-project section-pad grid-surface"><p className="eyebrow">NEXT CASE STUDY</p><div><h2>{nextProject.title}</h2><Button asChild variant="outline"><Link to="/work/$slug" params={{ slug: nextProject.slug }}>View project <ArrowRight /></Link></Button></div></section>
  </div>;
}