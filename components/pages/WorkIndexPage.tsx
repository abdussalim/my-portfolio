import type { SectionProps } from "@/components/ui/types";
import { WorkGrid, type WorkCard } from "@/components/work/WorkGrid";
import { caseStudies, projects } from "@/content/projects";
import { localePath, site } from "@/content/site";

export function WorkIndexPage({ locale, dict }: SectionProps) {
  const t = dict.work;

  const cards: WorkCard[] = projects.map((p) => ({
    slug: p.slug,
    href: p.caseStudy === false ? undefined : localePath(locale, `/work/${p.slug}/`),
    name: p.name,
    image: { ...p.image, alt: p.image.alt[locale] },
    summary: p.summary[locale],
    tags: p.tags[locale],
    category: p.category,
    categoryLabel: p.category && t.categoryLabel[p.category],
    status: p.status && { key: p.status, label: t.statusLabel[p.status] },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}${localePath(locale, "/")}` },
          { "@type": "ListItem", position: 2, name: t.allWork, item: `${site.url}${localePath(locale, "/work/")}` },
        ],
      },
      {
        "@type": "ItemList",
        name: dict.workIndex.title,
        itemListElement: caseStudies.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: `${site.url}${localePath(locale, `/work/${p.slug}/`)}`,
        })),
      },
    ],
  };

  return (
    <section className="pb-24 pt-12 md:pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <h1 className="max-w-[20ch] font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
          {dict.workIndex.title}
        </h1>
        <p className="mt-5 max-w-[56ch] text-base text-muted md:text-lg">{dict.workIndex.lead}</p>

        <div className="mt-12">
          <WorkGrid cards={cards} labels={{ all: dict.workIndex.all, teamCard: t.teamCard, caseStudy: dict.projects.caseStudy }} />
        </div>
      </div>
    </section>
  );
}
