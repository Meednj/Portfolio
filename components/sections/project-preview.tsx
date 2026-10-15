import { ArrowUpRight } from "lucide-react";
import { ProjectExplorer } from "@/features/projects/project-explorer";

export function ProjectPreview() {
  return (
    <section aria-labelledby="projects-title" className="projects-section" id="projects">
      <div className="shell">
        <div className="projects-heading-row">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2 id="projects-title">Six projects. Different systems.</h2>
            <p className="section-description">
              A curated set across enterprise software, backend engineering, the web and computer vision.
            </p>
          </div>
          <a className="text-link" href="#contact">
            Get in touch <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>

        <ProjectExplorer />
        <p className="content-note">
          Cards and detail pages use confirmed summaries only; functionality and technical
          details are labeled when they still need confirmation.
        </p>
      </div>
    </section>
  );
}
