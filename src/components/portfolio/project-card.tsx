import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/resume-store";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return <article className={`project-card ${featured ? "featured" : ""}`}><Link to="/work/$slug" params={{ slug: project.slug }} className="project-card-link" aria-label={`View ${project.title} case study`}><div className="project-media"><ProjectVisual project={project} compact={!featured} /><span className="project-open"><ArrowUpRight /></span><span className="visual-disclosure">Illustrative interface · sample data</span></div><div className="project-card-copy"><div><p className="project-kicker">{project.kicker ?? project.status}</p><h3>{project.title}</h3></div><p>{project.description}</p><div className="project-outcome"><span>{project.facts?.[0] ?? (project.tone === "cogrow" ? "Discovery → collaboration" : project.tone === "agent" ? "Progress → approval → action" : "Information → clarity → action")}</span><span>View case study <ArrowUpRight /></span></div><p className="project-category">{project.category}</p></div></Link></article>;
}
