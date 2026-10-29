import { Reveal } from "@/components/ui/Reveal";
import type { SectionProps } from "@/components/ui/types";

export function Career({ dict }: SectionProps) {
  const c = dict.career;
  return (
    <section id="career" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-signal-ink">{c.eyebrow}</p>
          <h2 className="mt-4 max-w-[24ch] font-display text-3xl leading-[1.05] tracking-tight text-ink md:text-5xl">
            {c.title}
          </h2>
          <p className="mt-4 max-w-[60ch] text-muted">{c.note}</p>
        </Reveal>

        <ol className="relative mt-14 border-l border-contour md:mt-20 md:ml-2">
          {c.jobs.map((job, i) => (
            <Reveal as="li" key={job.role + job.date} delay={i * 0.08} className="relative pb-12 pl-8 last:pb-0 md:pl-12">
              <span
                aria-hidden
                className="absolute -left-[7px] top-1 h-0 w-0 border-x-[7px] border-b-[12px] border-x-transparent border-b-signal"
              />
              <p className="font-mono text-xs text-muted">{job.date}</p>
              <h3 className="mt-2 font-display text-xl text-ink md:text-2xl">{job.role}</h3>
              <p className="mt-1 text-muted">{job.org}</p>
              <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-ink md:text-base">{job.text}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-20 grid grid-cols-1 gap-12 md:mt-28 md:grid-cols-[1.6fr_1fr_0.8fr] md:gap-10">
          {c.skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08}>
              <h3 className="font-display text-lg text-ink">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li key={it} className="rounded border border-line px-2.5 py-1 font-mono text-xs text-ink">
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 border-t border-line pt-6">
          <h3 className="font-mono text-xs text-muted">{c.certsTitle}</h3>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink">
            {c.certs.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
