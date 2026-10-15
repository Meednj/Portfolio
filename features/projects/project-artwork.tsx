import {
  Boxes,
  BrainCircuit,
  Disc3,
  PanelsTopLeft,
  ServerCog,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectArtworkProps = {
  project: Project;
  variant?: "card" | "detail";
};

const artwork = {
  "oneep-it-asset-management": { icon: Boxes, mark: "01 / ASSETS" },
  "estm-platform": { icon: PanelsTopLeft, mark: "02 / PLATFORM" },
  "secure-spring-boot-backend": { icon: ServerCog, mark: "03 / BACKEND" },
  "harris-vs-cnn-feature-detection": { icon: BrainCircuit, mark: "04 / VISION" },
  "medtheg-prod": { icon: Disc3, mark: "01 / AUDIO" },
  "marjane-ems": { icon: Boxes, mark: "02 / SYSTEMS" },
  portfolio: { icon: PanelsTopLeft, mark: "03 / WEB" },
} satisfies Record<Project["slug"], { icon: LucideIcon; mark: string }>;

export function ProjectArtwork({ project, variant = "card" }: ProjectArtworkProps) {
  const { icon: Icon, mark } = artwork[project.slug];

  return (
    <div
      aria-hidden="true"
      className={`project-art project-art--${project.slug} project-art--${variant}`}
    >
      <span className="artwork-coordinate">{mark}</span>
      <span className="artwork-concept">CONCEPTUAL STUDY</span>
      <span className="artwork-grid" />
      <span className="artwork-symbol"><Icon strokeWidth={1.1} /></span>
      <span className="artwork-baseline"><i /><i /><i /><i /><i /></span>
      <span className="artwork-code">{project.slug}</span>
    </div>
  );
}
