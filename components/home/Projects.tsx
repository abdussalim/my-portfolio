import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/components/ui/types";
import { Reveal } from "@/components/ui/Reveal";
import { buttonSecondary, linkArrow } from "@/components/ui/button";
import { projects, type Project } from "@/content/projects";
import { localePath } from "@/content/site";

function Meta({ p, locale, dict }: SectionProps & { p: Project }) {
  return (
    <>
      <p className="mt-3 text-base text-muted">{p.summary[locale]}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {p.tags[locale].map((t) => (
          <li key={t} className="rounded border border-line px-2 py-1 font-mono text-xs text-muted">
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href={localePath(locale, `/work/${p.slug}/`)} className={linkArrow}>
          {dict.projects.caseStudy}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
        <a href={p.url} target="_blank" rel="noopener" className={`${linkArrow} !text-muted`}>
          {dict.projects.open}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}

function Shot({ p, locale, sizes, priority }: { p: Project; locale: SectionProps["locale"]; sizes: string; priority?: boolean }) {
  return (
    <div className="group overflow-hidden rounded border border-line bg-surface">
      <Image
        src={p.image.src}
        width={p.image.width}
        height={p.image.height}
        alt={p.image.alt[locale]}
        priority={priority}
        sizes={sizes}
        className="h-auto w-full transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
      />
    </div>
  );
}

export function Projects({ locale, dict }: SectionProps) {
  const [feature, second, third] = projects;
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-signal-ink">{dict.projects.eyebrow}</p>
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
          <Reveal as="article" className="grid items-center gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <Shot p={feature} locale={locale} sizes="(min-width: 768px) 58vw, 100vw" />
            </div>
            <div className="md:col-span-5">
              <h3 className="font-display text-3xl font-semibold text-ink md:text-4xl">{feature.name}</h3>
              <Meta p={feature} locale={locale} dict={dict} />
            </div>
          </Reveal>

          <div className="grid gap-16 md:grid-cols-12 md:items-start md:gap-10">
            {[
              { p: second, cols: "md:col-span-7" },
              { p: third, cols: "md:col-span-5" },
            ].map(({ p, cols }) => (
              <Reveal as="article" key={p.slug} className={`flex flex-col gap-6 ${cols}`}>
                <Shot p={p} locale={locale} sizes="(min-width: 768px) 55vw, 100vw" />
                <div>
                  <h3 className="font-display text-2xl font-semibold text-ink md:text-3xl">{p.name}</h3>
                  <Meta p={p} locale={locale} dict={dict} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-20">
          <a href={localePath(locale, "/portfolio/")} className={buttonSecondary}>
            {dict.projects.origins}
          </a>
        </div>
      </div>
    </section>
  );
}
