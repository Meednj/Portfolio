import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  const pages: MetadataRoute.Sitemap = [
    { url: siteUrl.toString(), priority: 1, changeFrequency: "monthly" },
    {
      url: new URL("/education", siteUrl).toString(),
      priority: 0.7,
      changeFrequency: "yearly",
    },
    ...projects.map(({ slug }) => ({
      url: new URL(`/projects/${slug}`, siteUrl).toString(),
      priority: 0.6,
      changeFrequency: "yearly" as const,
    })),
  ];

  return pages;
}
