import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return <article className={`project-card ${featured ? "featured" : ""}`}><Link to="/work/$slug" params={{ slug: project.slug }} className="project-card-link" aria-label={`View ${project.title} case study`}><div className="project-media"><ProjectVisual project={project} compact={!featured} /><span className="project-open"><ArrowUpRight /></span></div><div className="project-card-copy"><div><p className="project-kicker">{project.kicker ?? project.status}</p><h3>{project.title}</h3></div><p>{project.description}</p><p className="project-category">{project.category}</p></div></Link></article>;
}
