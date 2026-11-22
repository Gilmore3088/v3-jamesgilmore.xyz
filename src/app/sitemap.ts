import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: site.url, priority: 1, changeFrequency: "monthly" },
    { url: `${site.url}/projects`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${site.url}/about`, priority: 0.8, changeFrequency: "yearly" },
    { url: `${site.url}/contact`, priority: 0.6, changeFrequency: "yearly" },
  ];
  const projects: MetadataRoute.Sitemap = site.projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));
  return [...pages, ...projects];
}
