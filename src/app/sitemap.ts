import type { MetadataRoute } from "next";
import { getAllSlugs, getAllProjectSlugs } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = await getAllSlugs();
  const projectSlugs = await getAllProjectSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    { url: "https://jamesgilmore.xyz", priority: 1 },
    { url: "https://jamesgilmore.xyz/projects", priority: 0.9 },
    { url: "https://jamesgilmore.xyz/blog", priority: 0.8 },
    { url: "https://jamesgilmore.xyz/about", priority: 0.7 },
    { url: "https://jamesgilmore.xyz/contact", priority: 0.6 },
    { url: "https://jamesgilmore.xyz/resume", priority: 0.5 },
  ];

  const projectPages: MetadataRoute.Sitemap = projectSlugs.map((s) => ({
    url: `https://jamesgilmore.xyz/projects/${s.slug}`,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((s) => ({
    url: `https://jamesgilmore.xyz/blog/${s.slug}`,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...blogPages];
}
