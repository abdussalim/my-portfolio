import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { localePath, site } from "@/content/site";

export const dynamic = "force-static";

const paths = ["/", "/portfolio/", ...projects.map((p) => `/work/${p.slug}/`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    (["en", "id"] as const).map((locale) => ({
      url: `${site.url}${localePath(locale, path)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: {
          en: `${site.url}${localePath("en", path)}`,
          id: `${site.url}${localePath("id", path)}`,
        },
      },
    })),
  );
}
