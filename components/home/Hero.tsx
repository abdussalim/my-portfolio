import Image from "next/image";
import { Triangle } from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/components/ui/types";
import { buttonPrimary, buttonSecondary } from "@/components/ui/button";
import { site } from "@/content/site";
import { ContourField } from "./ContourField";

// Entrance runs in CSS (.rise in globals.css) so the hero paints before hydration.
const rise = (i: number) => ({ style: { animationDelay: `${i * 90}ms` } });

export function Hero({ dict }: SectionProps) {
  return (
    <section
      id="home"
      className="flex min-h-[calc(100dvh-64px)] items-center py-10 md:py-16"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <p {...rise(0)} className="rise font-mono text-xs uppercase tracking-wider text-muted">
              {dict.hero.eyebrow}
            </p>
            <h1
              {...rise(1)}
              className="rise mt-5 max-w-[20ch] font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl"
            >
              {dict.hero.title}
            </h1>
            <p
              {...rise(2)}
              className="rise mt-6 max-w-[48ch] text-base leading-relaxed text-muted md:text-lg"
            >
              {dict.hero.lead}
            </p>
            <div {...rise(3)} className="rise mt-8 flex flex-wrap gap-3">
              <a href="#projects" className={buttonPrimary}>
                {dict.hero.primary}
              </a>
              <a href="#contact" className={buttonSecondary}>
                {dict.hero.secondary}
              </a>
            </div>
          </div>

          <div {...rise(2)} className="rise md:col-span-5">
            {/* The map is the panel; the photo sits on it as an inset plate (the portrait has a solid backdrop). */}
            <div className="relative aspect-square w-full overflow-hidden rounded border border-line bg-surface md:aspect-[4/5]">
              <ContourField />
              <div className="absolute left-[7%] top-[9%] flex items-start gap-2 font-mono text-xs">
                <Triangle weight="fill" size={14} className="mt-px shrink-0 text-signal" aria-hidden="true" />
                <span className="flex flex-col leading-snug">
                  <span className="text-ink">{site.coordinates.label}</span>
                  <span className="text-muted">{dict.hero.station}</span>
                </span>
              </div>
              <div className="absolute bottom-[6%] right-[6%] w-[44%] overflow-hidden rounded border border-line shadow-[0_24px_60px_-24px_rgb(21_32_28/0.45)] md:w-[62%]">
                <Image
                  src="/img/portraits/sarimu-1-hero.png"
                  alt={dict.hero.portraitAlt}
                  width={760}
                  height={1014}
                  priority
                  sizes="(min-width: 768px) 28vw, 44vw"
                  className="aspect-[3/4] h-auto w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
