import { describe, expect, it } from "vitest";
import {
  filterShowcaseProjects,
  getProjectBySlug,
  projectFilters,
  projectSlugs,
  projects,
  showcaseProjects,
} from "../../data/projects";

describe("project data", () => {
  it("contains the six showcase projects and preserves the portfolio detail route", () => {
    expect(showcaseProjects).toHaveLength(6);
    expect(showcaseProjects.map(({ slug }) => slug)).toEqual([
      "oneep-it-asset-management",
      "estm-platform",
      "secure-spring-boot-backend",
      "harris-vs-cnn-feature-detection",
      "marjane-ems",
      "medtheg-prod",
    ]);
    expect(getProjectBySlug("portfolio")?.slug).toBe("portfolio");
  });

  it("keeps every slug unique and within the declared slug set", () => {
    const slugs = projects.map(({ slug }) => slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toEqual([...projectSlugs]);
  });

  it("uses valid HTTPS GitHub URLs for configured repository links", () => {
    for (const project of projects) {
      if (!project.repositoryUrl) continue;

      const url = new URL(project.repositoryUrl);
      expect(url.protocol).toBe("https:");
      expect(url.hostname).toBe("github.com");
      expect(url.pathname.split("/").filter(Boolean)).toHaveLength(1 + 1);
    }
  });

  it("looks up each project by its stable slug", () => {
    for (const project of projects) {
      expect(getProjectBySlug(project.slug)).toBe(project);
    }
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProjectBySlug("unknown-project")).toBeUndefined();
  });

  it("provides project-specific case study content and separates planned work", () => {
    for (const project of projects) {
      expect(project.overview.length).toBeGreaterThan(0);
      expect(project.architecture.length).toBeGreaterThan(0);
      expect(project.engineeringDetails.length).toBeGreaterThan(0);
      expect(project.delivery.length).toBeGreaterThan(0);
      expect(project.status.length).toBeGreaterThan(0);
    }

    expect(getProjectBySlug("portfolio")?.implementedFeatures.length).toBeGreaterThan(0);
    expect(getProjectBySlug("medtheg-prod")?.implementedFeatures.length).toBeGreaterThan(0);
    expect(getProjectBySlug("medtheg-prod")?.plannedFeatures).toEqual([]);
  });

  it("filters showcase projects by their declared disciplines", () => {
    expect(filterShowcaseProjects("All")).toEqual(showcaseProjects);
    expect(filterShowcaseProjects("Backend").map(({ slug }) => slug)).toEqual([
      "oneep-it-asset-management",
      "secure-spring-boot-backend",
      "harris-vs-cnn-feature-detection",
      "marjane-ems",
      "medtheg-prod",
    ]);
    expect(filterShowcaseProjects("AI / Computer Vision").map(({ slug }) => slug)).toEqual([
      "harris-vs-cnn-feature-detection",
    ]);
    expect(projectFilters).toContain("Frontend");
  });
});
