import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionary";
import { getProject, projects } from "@/content/projects";
import type { Locale } from "@/content/site";
import { pageMetadata } from "./seo";

export function homeMetadata(locale: Locale): Metadata {
  const d = getDictionary(locale);
  return pageMetadata({ locale, path: "/", title: d.meta.title, description: d.meta.description });
}

export function originsMetadata(locale: Locale): Metadata {
  const d = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/portfolio/",
    title: d.meta.originsTitle,
    description: d.meta.originsDescription,
    image: "/img/projects/bahinak-instagram.png",
  });
}

export function workMetadata(locale: Locale, slug: string): Metadata {
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({
    locale,
    path: `/work/${slug}/`,
    title: `${p.name}: ${p.role[locale]} | Abdus Salim`,
    description: p.summary[locale],
    image: p.image.src,
  });
}

export const workParams = () => projects.map((p) => ({ slug: p.slug }));
