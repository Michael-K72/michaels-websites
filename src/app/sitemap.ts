import type { MetadataRoute } from "next";
import { CONCEPTS } from "@/data/concepts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://michaelkalachin.com";
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
    { url: `${base}/impressum`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
    ...CONCEPTS.map((c) => ({
      url: `${base}${c.href}`,
      lastModified: new Date(),
    })),
  ];
}
