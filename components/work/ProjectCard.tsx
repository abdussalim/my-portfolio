import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { linkArrow } from "@/components/ui/button";

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
  url?: string; // live site, shown as a second action
};

export type CardLabels = { teamCard: string; caseStudy: string; open: string };

/**
 * One card anatomy for the home Works section and the /work/ index:
 * thumbnail, meta line (status + category), name, summary, tags, actions.
 * "feature" lays the same parts out as image beside text on md+ (flip puts the text first).
 */
export function ProjectCard({
  c,
  labels,
  size = "card",
  flip = false,
  heading: Heading = "h3",
  sizes,
}: {
  c: WorkCard;
  labels: CardLabels;
  size?: "card" | "feature";
  flip?: boolean;
  heading?: "h2" | "h3";
  sizes: string;
}) {
  const feature = size === "feature";
  return (
    <article
      className={`group relative ${feature ? "grid items-center gap-6 md:grid-cols-12 md:gap-10" : "flex h-full flex-col"}`}
    >
      <div className={feature ? `md:col-span-7 ${flip ? "md:order-2" : ""}` : undefined}>
        <div className="aspect-[16/10] overflow-hidden rounded border border-line bg-surface">
          <Image
            src={c.image.src}
            width={c.image.width}
            height={c.image.height}
            alt={c.image.alt}
            sizes={sizes}
            className={`h-full w-full transition-transform duration-500 ease-out-expo group-hover:scale-[1.03] ${c.image.width / c.image.height > 2.2 ? "object-contain p-4" : "object-cover object-top"}`}
          />
        </div>
      </div>
      <div className={`flex flex-col ${feature ? `md:col-span-5 ${flip ? "md:order-1" : ""}` : "mt-4 flex-1"}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
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
        <Heading className={`mt-2 font-display font-semibold text-ink ${feature ? "text-3xl md:text-4xl" : "text-2xl"}`}>
          {c.href ? (
            <a href={c.href} className="after:absolute after:inset-0 after:content-[''] hover:text-signal-ink">
              {c.name}
            </a>
          ) : (
            c.name
          )}
        </Heading>
        <p className="mt-2 text-base text-muted">{c.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {c.tags.map((t) => (
            <li key={t} className="rounded border border-line px-2 py-1 font-mono text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-5">
          {c.href ? (
            <span className={linkArrow}>
              {labels.caseStudy}
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          ) : (
            <span className="text-sm font-medium text-muted">{labels.teamCard}</span>
          )}
          {c.url && (
            <a
              href={c.url}
              target="_blank"
              rel="noopener"
              className={`${linkArrow} relative z-10 !text-muted`}
            >
              {labels.open}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
