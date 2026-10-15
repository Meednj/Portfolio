import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectArtwork } from "@/features/projects/project-artwork";
import { RepositoryLink } from "@/features/projects/repository-link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  number: string;
};

export function ProjectCard({ project, number }: ProjectCardProps) {
  const headingId = `project-${project.slug}`;

  return (
    <Card className="project-card">
      <CardContent className="project-card-content">
        <div className="project-card-meta">
          <span className="project-category">{project.category}</span>
          <div className="project-card-meta-actions">
            {project.repositoryUrl ? (
              <RepositoryLink
                href={project.repositoryUrl}
                projectTitle={project.title}
                variant="card"
              />
            ) : null}
            <span aria-hidden="true" className="mono-label">
              {number}
            </span>
          </div>
        </div>
        <Link
          aria-labelledby={headingId}
          className="project-card-link"
          href={`/projects/${project.slug}`}
        >
          <ProjectArtwork project={project} />
          <h3 id={headingId}>{project.title}</h3>
          <p>{project.summary}</p>
          {project.technologies.length > 0 ? (
            <ul aria-label={`${project.title} technologies`} className="project-tags">
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          ) : (
            <p className="project-card-note">Technical details to be confirmed.</p>
          )}
          <span className="project-card-action">
            View project <ArrowUpRight aria-hidden="true" size={15} />
          </span>
        </Link>
      </CardContent>
    </Card>
  );
}
