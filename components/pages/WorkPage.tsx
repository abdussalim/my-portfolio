import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/components/ui/types";
import { buttonPrimary, linkArrow } from "@/components/ui/button";
import { getProject, projects } from "@/content/projects";
import { localePath, site } from "@/content/site";

const personRef = { "@id": `${site.url}/#person` };

export function WorkPage({ locale, dict, slug }: SectionProps & { slug: string }) {
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const pageUrl = `${site.url}${localePath(locale, `/work/${project.slug}/`)}`;
  const t = dict.work;

  const entity =
    project.schemaType === "ScholarlyArticle"
      ? {
          "@type": "ScholarlyArticle",
          headline: project.headline ?? project.name,
          url: pageUrl,
          sameAs: project.url,
          description: project.summary[locale],
          datePublished: project.year,
          publisher: { "@type": "Organization", name: "Elsevier (Heliyon)" },
          author: personRef,
        }
      : {
          "@type": "WebSite",
          name: project.name,
          url: project.url,
          description: project.summary[locale],
          creator: personRef,
        };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}${localePath(locale, "/")}` },
          { "@type": "ListItem", position: 2, name: project.name, item: pageUrl },
        ],
      },
      entity,
    ],
  };

  const meta = [
    { label: t.role, value: project.role[locale] },
    { label: t.stack, value: project.stack.join(", ") },
    { label: t.year, value: project.year },
  ];

  return (
    <article className="pb-24 pt-12 md:pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <Link href={localePath(locale, "/#projects")} className={linkArrow}>
          <ArrowLeft size={16} aria-hidden="true" />
          {t.back}
        </Link>

        <header className="mt-8 max-w-3xl">
          <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink md:text-7xl">
            {project.name}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">{project.summary[locale]}</p>
        </header>

        <dl className="mt-12 grid grid-cols-1 border-y border-line font-mono text-sm md:grid-cols-3">
          {meta.map((m, i) => (
            <div
              key={m.label}
              className={`py-4 md:px-6 md:py-5 ${i === 0 ? "md:pl-0" : "md:border-l md:border-line"} ${
                i > 0 ? "border-t border-line md:border-t-0" : ""
              }`}
            >
              <dt className="text-xs uppercase tracking-widest text-muted">{m.label}</dt>
              <dd className="mt-1 text-ink">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12">
          <Image
            src={project.image.src}
            alt={project.image.alt[locale]}
            width={project.image.width}
            height={project.image.height}
            priority
            sizes="(min-width: 1240px) 1176px, 100vw"
            className="h-auto w-full rounded border border-line"
          />
        </div>

        <div className="mt-16 grid gap-x-16 gap-y-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-y-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">{t.challenge}</h2>
          <p className="max-w-2xl text-lg leading-relaxed text-ink">{project.challenge[locale]}</p>

          <h2 className="mt-6 font-mono text-xs uppercase tracking-widest text-muted md:mt-0">{t.approach}</h2>
          <ul className="max-w-2xl space-y-4">
            {project.approach[locale].map((step) => (
              <li key={step} className="flex gap-3 text-lg leading-relaxed text-ink">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 10"
                  className="mt-[0.6em] h-2.5 w-2.5 shrink-0 text-signal"
                >
                  <path d="M1 1 L9 5 L1 9 Z" fill="currentColor" />
                </svg>
                <span>{step}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-6 font-mono text-xs uppercase tracking-widest text-muted md:mt-0">{t.outcome}</h2>
          <p className="max-w-2xl font-display text-2xl font-medium leading-snug text-ink">
            {project.outcome[locale]}
          </p>
        </div>

        <div className="mt-12">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
            {t.visit} {project.name}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        <footer className="mt-20 border-t border-line pt-8">
          <Link
            href={localePath(locale, `/work/${next.slug}/`)}
            className="group flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-muted">{t.next}</span>
            <span className="inline-flex items-center gap-3 font-display text-3xl font-semibold text-ink transition-colors group-hover:text-signal-ink md:text-4xl">
              {next.name}
              <ArrowRight
                size={28}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </footer>
      </div>
    </article>
  );
}
