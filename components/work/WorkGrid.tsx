"use client";

import { useState } from "react";
import { ProjectCard, type CardLabels, type WorkCard } from "./ProjectCard";

type Labels = CardLabels & { all: string };

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
            <ProjectCard
              c={c}
              labels={labels}
              heading="h2"
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            />
          </li>
        ))}
      </ul>
    </>
  );
}
