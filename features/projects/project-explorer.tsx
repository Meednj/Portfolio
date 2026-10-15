"use client";

import { useState } from "react";
import { ProjectCard } from "@/features/projects/project-card";
import {
  filterShowcaseProjects,
  projectFilters,
  showcaseProjects,
  type ProjectFilter,
} from "@/data/projects";

export function ProjectExplorer() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const visibleProjects = filterShowcaseProjects(activeFilter);

  return (
    <>
      <div aria-label="Filter projects by discipline" className="project-filters" role="group">
        {projectFilters.map((filter) => (
          <button
            aria-pressed={activeFilter === filter}
            className="project-filter"
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
        <span aria-live="polite" className="project-filter-count">
          {String(visibleProjects.length).padStart(2, "0")} / {String(showcaseProjects.length).padStart(2, "0")}
        </span>
      </div>
      <ul aria-label="Projects" className="project-grid">
        {visibleProjects.map((project) => (
          <li key={project.slug}>
            <ProjectCard
              number={String(showcaseProjects.findIndex(({ slug }) => slug === project.slug) + 1).padStart(2, "0")}
              project={project}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
