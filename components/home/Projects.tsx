import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/components/ui/types";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buttonPrimary, buttonSecondary } from "@/components/ui/button";
import { ProjectCard, type WorkCard } from "@/components/work/ProjectCard";
import { featuredProjects, type Project } from "@/content/projects";
import { localePath } from "@/content/site";

function toCard(p: Project, { locale, dict }: SectionProps): WorkCard {
  return {
    slug: p.slug,
    href: p.caseStudy === false ? undefined : localePath(locale, `/work/${p.slug}/`),
    name: p.name,
    image: { ...p.image, alt: p.image.alt[locale] },
    summary: p.summary[locale],
    tags: p.tags[locale],
    category: p.category,
    categoryLabel: p.category && dict.work.categoryLabel[p.category],
    status: p.status && { key: p.status, label: dict.work.statusLabel[p.status] },
    url: p.url,
  };
}

export function Projects({ locale, dict }: SectionProps) {
  const [feature, second, third, fourth] = featuredProjects.map((p) => toCard(p, { locale, dict }));
  const labels = { teamCard: dict.work.teamCard, caseStudy: dict.projects.caseStudy, open: dict.projects.open };
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <Reveal>
          <Eyebrow>{dict.projects.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-[20ch] font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
            {dict.projects.title}
          </h2>
          <p className="mt-5 max-w-[56ch] text-base text-muted md:text-lg">{dict.projects.note}</p>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <figure>
            <video
              className="aspect-video w-full rounded border border-line bg-surface"
              controls
              muted
              playsInline
              preload="none"
              poster="/video/showreel-poster.jpg"
              aria-label={dict.projects.reel}
            >
              <source src="/video/showreel.webm" type="video/webm" />
              <source src="/video/showreel.mp4" type="video/mp4" />
            </video>
            <figcaption className="mt-3 font-mono text-xs text-muted">{dict.projects.reel}</figcaption>
          </figure>
        </Reveal>

        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          <Reveal>
            <ProjectCard c={feature} labels={labels} size="feature" sizes="(min-width: 768px) 58vw, 100vw" />
          </Reveal>

          {/* Equal columns keep both 16:10 shots the same height, so the titles line up. */}
          <div className="grid gap-16 md:grid-cols-2 md:gap-10">
            {[second, third].map((c) => (
              <Reveal key={c.slug}>
                <ProjectCard c={c} labels={labels} sizes="(min-width: 768px) 50vw, 100vw" />
              </Reveal>
            ))}
          </div>

          {/* Fourth project mirrors the opener: text left, shot right, so the page keeps a zigzag rhythm. */}
          <Reveal>
            <ProjectCard c={fourth} labels={labels} size="feature" flip sizes="(min-width: 768px) 58vw, 100vw" />
          </Reveal>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 md:mt-12">
          <a href={localePath(locale, "/work/")} className={buttonPrimary}>
            {dict.projects.viewAll}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a href={localePath(locale, "/portfolio/")} className={buttonSecondary}>
            {dict.projects.origins}
          </a>
        </div>
      </div>
    </section>
  );
}
