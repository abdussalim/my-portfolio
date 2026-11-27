"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";

export type WorkCard = {
  slug: string;
  href?: string; // absent = card only, no case study
  name: string;
  image: { src: string; width: number; height: number; alt: string };
  summary: string;
  tags: string[];
  category?: string;
  categoryLabel?: string;
  status?: { key: string; label: string };
};

type Labels = { all: string; teamCard: string; caseStudy: string };

/** Category chips filter the card list in place. No URL state, all cards render with "All". */
export function WorkGrid({ cards, labels }: { cards: WorkCard[]; labels: Labels }) {
  const [active, setActive] = useState<string>("all");

  const categories = cards.reduce<{ key: string; label: string }[]>((acc, c) => {
    if (c.category && c.categoryLabel && !acc.some((a) => a.key === c.category)) {
      acc.push({ key: c.category, label: c.categoryLabel });
    }
    return acc;
  }, []);
  const shown = active === "all" ? cards : cards.filter((c) => c.category === active);

  const chip =
    "inline-flex h-10 items-center rounded border border-line px-4 font-mono text-xs text-muted transition-colors hover:border-ink hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper";

  return (
    <>
      <div role="group" aria-label="Filter" className="flex flex-wrap gap-2">
        {[{ key: "all", label: labels.all }, ...categories].map((c) => (
          <button key={c.key} type="button" aria-pressed={active === c.key} onClick={() => setActive(c.key)} className={chip}>
            {c.label}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((c) => (
          <li key={c.slug}>
            <article className="group relative flex h-full flex-col">
              <div className="aspect-[16/10] overflow-hidden rounded border border-line bg-surface">
                <Image
                  src={c.image.src}
                  width={c.image.width}
                  height={c.image.height}
                  alt={c.image.alt}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className={`h-full w-full transition-transform duration-500 ease-out-expo group-hover:scale-[1.03] ${c.image.width / c.image.height > 2.2 ? "object-contain p-4" : "object-cover object-top"}`}
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
                {c.status && (
                  <span className="inline-flex items-center gap-2 text-ink">
                    <span
                      aria-hidden="true"
                      className={`size-2 rounded-full ${
                        c.status.key === "live" ? "bg-signal" : c.status.key === "development" ? "border border-signal" : "bg-muted"
                      }`}
                    />
                    {c.status.label}
                  </span>
                )}
                {c.categoryLabel && <span>{c.categoryLabel}</span>}
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                {c.href ? (
                  <a href={c.href} className="after:absolute after:inset-0 after:content-[''] hover:text-signal-ink">
                    {c.name}
                  </a>
                ) : (
                  c.name
                )}
              </h2>
              <p className="mt-2 text-base text-muted">{c.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <li key={t} className="rounded border border-line px-2 py-1 font-mono text-xs text-muted">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-5 text-sm font-medium">
                {c.href ? (
                  <span className="inline-flex items-center gap-1.5 text-signal-ink">
                    {labels.caseStudy}
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                ) : (
                  <span className="text-muted">{labels.teamCard}</span>
                )}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
