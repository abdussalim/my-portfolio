import { Reveal } from "@/components/ui/Reveal";
import type { SectionProps } from "@/components/ui/types";

export function About({ dict }: SectionProps) {
  const { title, text, metrics } = dict.about;
  return (
    <section id="about" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <Reveal>
          <h2 className="max-w-[20ch] font-display text-3xl leading-[1.05] tracking-tight text-ink md:text-5xl">
            {title}
          </h2>
          <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-muted md:text-lg">{text}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-14 md:mt-20">
          <dl className="grid grid-cols-1 border-y border-line md:grid-cols-3">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`flex flex-col-reverse py-8 md:px-8 md:py-10 ${i > 0 ? "border-t border-line md:border-l md:border-t-0" : "md:pl-0"}`}
              >
                {/* dt must precede dd in the DOM; flex-col-reverse keeps the number on top. */}
                <dt className="mt-3 text-sm text-muted">{m.label}</dt>
                <dd className="font-display text-6xl leading-none tracking-tight text-ink tabular-nums md:text-7xl">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
