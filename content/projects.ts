import type { Locale } from "./site";

export type Localized<T> = Record<Locale, T>;

export type ProjectArea = "infra" | "cicd" | "backend" | "frontend" | "security" | "data";

export type ProjectMedia =
  | { kind: "image"; src: string; width: number; height: number; alt: Localized<string>; caption?: Localized<string> }
  | {
      kind: "video";
      mp4: string;
      webm?: string;
      poster: string;
      width: number;
      height: number;
      caption: Localized<string>;
      /** Seconds, for VideoObject. */
      duration?: number;
    }
  | { kind: "doc"; href: string; label: Localized<string>; format: "pdf" | "html" };

export type Project = {
  slug: string;
  name: string;
  /** Public URL. Optional: some work has none (MGMP is not public). */
  url?: string;
  year: string;
  image: { src: string; width: number; height: number; alt: Localized<string> };
  tags: Localized<string[]>;
  summary: Localized<string>;
  role: Localized<string>;
  stack: string[];
  challenge: Localized<string>;
  approach: Localized<string[]>;
  outcome: Localized<string>;
  /** schema.org type used for the case-study JSON-LD. */
  schemaType: "WebSite" | "ScholarlyArticle" | "SoftwareApplication" | "CreativeWork";
  /** Full publication title, used as the ScholarlyArticle headline. */
  headline?: string;
  /** Honest state badge. */
  status?: "live" | "development" | "frozen" | "internal";
  /** One line qualifying the badge, e.g. "soft launch; login not active yet". */
  statusNote?: Localized<string>;
  category?: "client" | "product" | "competition" | "personal" | "research";
  period?: Localized<string>;
  team?: Localized<string>;
  /** Home order, lower first. Omitted = not featured on home. */
  featured?: number;
  /** Default true. false = card only on /work/, no case-study page. */
  caseStudy?: boolean;
  areas?: { area: ProjectArea; items: Localized<string[]> }[];
  metrics?: { value: string; label: Localized<string> }[];
  diagram?: {
    src: string;
    srcDark: string;
    width: number;
    height: number;
    alt: Localized<string>;
    caption?: Localized<string>;
  };
  media?: ProjectMedia[];
  /** Public links only. */
  links?: { label: Localized<string>; href: string }[];
};


import { edunusa } from "./work/edunusa";
import { sobatpart } from "./work/sobatpart";
import { istanaBlock } from "./work/istana-block";
import { asapify } from "./work/asapify";
import { mgmp } from "./work/mgmp";
import { zainaShop } from "./work/zaina-shop";
import { instrumeta } from "./work/instrumeta";
import { heliyonResearch } from "./work/heliyon-research";
import { dkn } from "./work/dkn";

// Copy lives one file per project in content/work/. Order here = /work/ index order.
export const projects: Project[] = [
  edunusa,
  sobatpart,
  istanaBlock,
  asapify,
  mgmp,
  zainaShop,
  instrumeta,
  heliyonResearch,
  dkn,
];

/** Projects that get their own /work/<slug>/ page. */
export const caseStudies: Project[] = projects.filter((p) => p.caseStudy !== false);

/** Home selection, ordered by `featured`. */
export const featuredProjects: Project[] = projects
  .filter((p) => p.featured !== undefined)
  .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
