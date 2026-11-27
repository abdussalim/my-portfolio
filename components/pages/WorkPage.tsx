import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, FilePdf, FileHtml } from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/components/ui/types";
import { buttonPrimary, buttonSecondary, linkArrow } from "@/components/ui/button";
import { Diagram } from "@/components/work/Diagram";
import { Evidence, type EvidenceItem } from "@/components/work/Evidence";
import { StatusBadge } from "@/components/work/StatusBadge";
import { caseStudies, getProject } from "@/content/projects";
import { localePath, site } from "@/content/site";

const personRef = { "@id": `${site.url}/#person` };

const sectionTitle = "font-mono text-xs uppercase tracking-widest text-muted";

/** Triangle-bullet list, shared by the legacy and the area layouts. */
function Steps({ items }: { items: string[] }) {
  return (
    <ul className="max-w-2xl space-y-4">
      {items.map((step) => (
        <li key={step} className="flex gap-3 text-lg leading-relaxed text-ink">
          <svg aria-hidden="true" viewBox="0 0 10 10" className="mt-[0.6em] h-2.5 w-2.5 shrink-0 text-signal">
            <path d="M1 1 L9 5 L1 9 Z" fill="currentColor" />
          </svg>
          <span>{step}</span>
        </li>
      ))}
    </ul>
  );
}

export function WorkPage({ locale, dict, slug }: SectionProps & { slug: string }) {
  const project = getProject(slug);
  if (!project || project.caseStudy === false) notFound();

  const index = caseStudies.findIndex((p) => p.slug === project.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const pageUrl = `${site.url}${localePath(locale, `/work/${project.slug}/`)}`;
  const t = dict.work;
  const lightboxLabels = { close: t.close, prev: t.prev, next: t.nextImage };

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
      : project.schemaType === "SoftwareApplication"
        ? {
            "@type": "SoftwareApplication",
            name: project.name,
            applicationCategory: "WebApplication",
            operatingSystem: "Web",
            url: project.url ?? pageUrl,
            description: project.summary[locale],
            creator: personRef,
          }
        : project.schemaType === "CreativeWork"
          ? {
              "@type": "CreativeWork",
              name: project.name,
              url: project.url ?? pageUrl,
              description: project.summary[locale],
              dateCreated: project.year,
              creator: personRef,
            }
          : {
              "@type": "WebSite",
              name: project.name,
              url: project.url ?? pageUrl,
              description: project.summary[locale],
              creator: personRef,
            };

  // VideoObject needs an uploadDate that no project records yet, and a guessed date would be
  // fabricated data, so videos are deliberately left out of the JSON-LD.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}${localePath(locale, "/")}` },
          { "@type": "ListItem", position: 2, name: t.allWork, item: `${site.url}${localePath(locale, "/work/")}` },
          { "@type": "ListItem", position: 3, name: project.name, item: pageUrl },
        ],
      },
      entity,
    ],
  };

  const facts = [
    { label: t.role, value: project.role[locale] },
    { label: t.period, value: project.period?.[locale] ?? project.year },
    ...(project.team ? [{ label: t.team, value: project.team[locale] }] : []),
  ];

  const evidence: EvidenceItem[] = (project.media ?? []).flatMap((m): EvidenceItem[] =>
    m.kind === "image"
      ? [{ kind: "image", src: m.src, alt: m.alt[locale], width: m.width, height: m.height, caption: m.caption?.[locale] }]
      : m.kind === "video"
        ? [{ kind: "video", mp4: m.mp4, webm: m.webm, poster: m.poster, width: m.width, height: m.height, caption: m.caption[locale] }]
        : [],
  );
  const docs = (project.media ?? []).flatMap((m) => (m.kind === "doc" ? [m] : []));

  return (
    <article className="pb-24 pt-12 md:pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <Link href={localePath(locale, "/work/")} className={linkArrow}>
          <ArrowLeft size={16} aria-hidden="true" />
          {t.back}
        </Link>

        <header className="mt-8 max-w-3xl">
          {(project.status || project.category) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {project.status && <StatusBadge status={project.status} dict={dict} />}
              {project.category && (
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  {t.categoryLabel[project.category]}
                </p>
              )}
            </div>
          )}
          {project.statusNote && <p className="mt-3 font-mono text-xs text-muted">{project.statusNote[locale]}</p>}
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink md:text-7xl">
            {project.name}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">{project.summary[locale]}</p>
        </header>

        <dl className="mt-12 grid grid-cols-1 border-y border-line font-mono text-sm md:grid-cols-3">
          {facts.map((m, i) => (
            <div
              key={m.label}
              className={`py-4 md:px-6 md:py-5 ${i % 3 === 0 ? "md:pl-0" : "md:border-l md:border-line"} ${
                i > 0 ? "border-t border-line md:border-t-0" : ""
              }`}
            >
              <dt className="text-xs uppercase tracking-widest text-muted">{m.label}</dt>
              <dd className="mt-1 text-ink">{m.value}</dd>
            </div>
          ))}
          <div className="border-t border-line py-4 md:col-span-3 md:px-0 md:py-5">
            <dt className="text-xs uppercase tracking-widest text-muted">{t.stack}</dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="rounded border border-line px-2 py-1 text-xs text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        {(project.url || project.links?.length) && (
          <div className="mt-8 flex flex-wrap items-center gap-3" aria-label={t.links}>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
                {t.visit} {project.name}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
            {project.links?.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
                {l.label[locale]}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        )}

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

        {project.metrics && project.metrics.length > 0 && (
          <section aria-label={t.metrics} className="mt-12">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-line py-8 md:grid-cols-4">
              {project.metrics.map((m) => (
                <div key={m.label.en}>
                  <dd className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">{m.value}</dd>
                  <dt className="mt-2 text-sm text-muted">{m.label[locale]}</dt>
                </div>
              ))}
            </dl>
          </section>
        )}

        {project.areas ? (
          <div className="mt-16 grid gap-x-16 gap-y-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-y-12">
            <h2 className={sectionTitle}>{t.challenge}</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-ink">{project.challenge[locale]}</p>

            <h2 className={`${sectionTitle} mt-6 md:mt-0`}>{t.did}</h2>
            <div className="max-w-2xl space-y-10">
              {project.areas.map((a) => (
                <section key={a.area} aria-labelledby={`area-${a.area}`}>
                  <h3 id={`area-${a.area}`} className="mb-4 font-display text-xl font-semibold text-ink">
                    {t.areaLabel[a.area]}
                  </h3>
                  <Steps items={a.items[locale]} />
                </section>
              ))}
            </div>

            <h2 className={`${sectionTitle} mt-6 md:mt-0`}>{t.outcome}</h2>
            <p className="max-w-2xl font-display text-2xl font-medium leading-snug text-ink">
              {project.outcome[locale]}
            </p>
          </div>
        ) : (
          <div className="mt-16 grid gap-x-16 gap-y-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-y-12">
            <h2 className={sectionTitle}>{t.challenge}</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-ink">{project.challenge[locale]}</p>

            <h2 className={`${sectionTitle} mt-6 md:mt-0`}>{t.approach}</h2>
            <Steps items={project.approach[locale]} />

            <h2 className={`${sectionTitle} mt-6 md:mt-0`}>{t.outcome}</h2>
            <p className="max-w-2xl font-display text-2xl font-medium leading-snug text-ink">
              {project.outcome[locale]}
            </p>
          </div>
        )}

        {project.diagram && (
          <section className="mt-20" aria-labelledby="architecture">
            <h2 id="architecture" className={`${sectionTitle} mb-6`}>
              {t.architecture}
            </h2>
            <Diagram
              src={project.diagram.src}
              srcDark={project.diagram.srcDark}
              width={project.diagram.width}
              height={project.diagram.height}
              alt={project.diagram.alt[locale]}
              caption={project.diagram.caption?.[locale]}
              zoom={t.zoom}
              labels={lightboxLabels}
            />
          </section>
        )}

        {evidence.length > 0 && (
          <section className="mt-20" aria-labelledby="evidence">
            <h2 id="evidence" className={`${sectionTitle} mb-6`}>
              {t.evidence}
            </h2>
            <Evidence items={evidence} zoom={t.zoom} labels={lightboxLabels} />
          </section>
        )}

        {docs.length > 0 && (
          <ul className="mt-12 flex flex-wrap gap-3">
            {docs.map((d) => (
              <li key={d.href}>
                <a href={d.href} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
                  {d.format === "pdf" ? <FilePdf size={16} aria-hidden="true" /> : <FileHtml size={16} aria-hidden="true" />}
                  {d.label[locale]}
                </a>
              </li>
            ))}
          </ul>
        )}

        <footer className="mt-20 border-t border-line pt-8">
          <Link
            href={localePath(locale, `/work/${next.slug}/`)}
            className="group flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between"
          >
            <span className={sectionTitle}>{t.next}</span>
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
