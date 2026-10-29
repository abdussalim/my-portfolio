import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { SectionProps } from "@/components/ui/types";

// Desktop: asymmetric 12-col composition, one large + two smaller staggered.
const layout = [
  "md:col-span-5 md:col-start-1",
  "md:col-span-3 md:col-start-7 md:mt-24",
  "md:col-span-3 md:col-start-10 md:mt-0",
];

export function Photos({ dict }: SectionProps) {
  const { title, note, items } = dict.photos;
  return (
    <section id="photos" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <Reveal>
          <h2 className="font-display text-3xl leading-[1.05] tracking-tight text-ink md:text-5xl">{title}</h2>
          <p className="mt-4 max-w-[48ch] text-muted">{note}</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
          {items.map((item, i) => (
            <Reveal
              key={item.src}
              delay={i * 0.1}
              className={`${i === 0 ? "col-span-2" : "col-span-1"} ${layout[i] ?? ""}`}
            >
              <figure>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={560}
                  height={840}
                  loading="lazy"
                  className={`${i === 0 ? "aspect-[4/5]" : "aspect-[2/3]"} w-full rounded object-cover`}
                />
                <figcaption className="mt-3 font-mono text-xs text-muted">{item.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
