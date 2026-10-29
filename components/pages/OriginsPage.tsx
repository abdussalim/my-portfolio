import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/components/ui/types";
import { buttonSecondary } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { localePath } from "@/content/site";

type Item = {
  key: "bahinak" | "motobike" | "qr";
  name: string;
  href?: string;
  domain?: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  layout: string;
  imgWrap: string;
};

// Staggered 12-col arrangement on desktop, single column on mobile.
const items: Item[] = [
  {
    key: "bahinak",
    name: "Bahinak Project",
    href: "https://www.instagram.com/p/B3psNzPhYep/?img_index=2",
    domain: "instagram.com",
    src: "/img/projects/bahinak-instagram.png",
    width: 720,
    height: 994,
    alt: "Bahinak air quality monitoring prototype",
    layout: "md:col-span-5",
    imgWrap: "aspect-[720/994]",
  },
  {
    key: "motobike",
    name: "Google's Motobike",
    href: "https://drive.google.com/file/d/1ZbSLP3XSisBeTnsXE7NtFlgtudwacsfF/view",
    domain: "drive.google.com",
    src: "/img/projects/motorcycle-assistant.jpeg",
    width: 1080,
    height: 599,
    alt: "Voice activated motorcycle prototype",
    layout: "md:col-span-7 md:mt-32",
    imgWrap: "aspect-[1080/599]",
  },
  {
    key: "qr",
    name: "QR Code Goods Scanner",
    src: "/img/projects/3.jpg",
    width: 2400,
    height: 3600,
    alt: "QR code goods scanner prototype",
    layout: "md:col-span-5 md:col-start-6 md:-mt-24",
    imgWrap: "aspect-[4/5]",
  },
];

export function OriginsPage({ locale, dict }: SectionProps) {
  const o = dict.origins;
  return (
    <section className="pb-24 pt-12 md:pt-20">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <header className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-signal-ink">{o.label}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
            {o.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{o.text}</p>
        </header>

        <ul className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-x-10 md:gap-y-0">
          {items.map((item, i) => {
            const card = o.cards[item.key];
            const image = (
              <div className={`relative overflow-hidden rounded border border-line bg-surface ${item.imgWrap}`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  priority={i === 0}
                  sizes="(min-width: 768px) 560px, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            );
            return (
              <Reveal as="li" key={item.key} className={item.layout}>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
                    {image}
                    <ItemText name={item.name} kicker={card.kicker} text={card.text}>
                      <span className="inline-flex items-center gap-1 font-mono text-xs text-signal-ink underline-offset-4 group-hover:underline">
                        {item.domain}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </span>
                    </ItemText>
                  </a>
                ) : (
                  <div>
                    {image}
                    <ItemText name={item.name} kicker={card.kicker} text={card.text}>
                      <span className="font-mono text-xs text-muted">{o.archived}</span>
                    </ItemText>
                  </div>
                )}
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-20">
          <Link href={localePath(locale, "/#projects")} className={buttonSecondary}>
            <ArrowLeft size={16} aria-hidden="true" />
            {o.back}
          </Link>
        </div>
      </div>
    </section>
  );
}

function ItemText({
  name,
  kicker,
  text,
  children,
}: {
  name: string;
  kicker: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-5">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">{kicker}</p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-ink">{name}</h2>
      <p className="mt-2 max-w-md leading-relaxed text-muted">{text}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
