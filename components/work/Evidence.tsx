"use client";

import { useState } from "react";
import Image from "next/image";
import { MagnifyingGlassPlus } from "@phosphor-icons/react";
import { Lightbox, type LightboxItem, type LightboxLabels } from "./Lightbox";

export type EvidenceItem =
  | ({ kind: "image" } & LightboxItem)
  | { kind: "video"; mp4: string; webm?: string; poster: string; width: number; height: number; caption: string };

/** Column spans on the 12-col md grid. Portrait shots stay narrow, landscape alternate wide and mid. */
function spanFor(item: EvidenceItem, n: number): string {
  if (item.kind === "video") return "md:col-span-9";
  if (item.height > item.width) return "md:col-span-4";
  return n % 2 === 0 ? "md:col-span-7" : "md:col-span-5";
}

export function Evidence({ items, zoom, labels }: { items: EvidenceItem[]; zoom: string; labels: LightboxLabels }) {
  const [open, setOpen] = useState<number | null>(null);
  const images = items.filter((i): i is Extract<EvidenceItem, { kind: "image" }> => i.kind === "image");
  let imageIndex = -1;
  let landscape = -1;

  return (
    <>
      <ul className="grid grid-flow-dense grid-cols-1 items-start gap-x-6 gap-y-10 md:grid-cols-12">
        {items.map((item, i) => {
          if (item.kind === "video") {
            return (
              <li key={`v${i}`} className={spanFor(item, 0)}>
                <figure>
                  <video
                    className="w-full rounded border border-line bg-surface"
                    style={{ aspectRatio: `${item.width} / ${item.height}` }}
                    controls
                    muted
                    playsInline
                    preload="none"
                    poster={item.poster}
                    aria-describedby={`ev-cap-${i}`}
                  >
                    {item.webm && <source src={item.webm} type="video/webm" />}
                    <source src={item.mp4} type="video/mp4" />
                  </video>
                  <figcaption id={`ev-cap-${i}`} className="mt-3 max-w-[70ch] font-mono text-xs text-muted">
                    {item.caption}
                  </figcaption>
                </figure>
              </li>
            );
          }
          const at = ++imageIndex;
          const portrait = item.height > item.width;
          if (!portrait) landscape++;
          return (
            <li key={item.src} className={spanFor(item, landscape)}>
              <figure className={portrait ? "mx-auto max-w-xs md:max-w-none" : undefined}>
                <button
                  type="button"
                  onClick={() => setOpen(at)}
                  aria-label={`${zoom}: ${item.alt}`}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded border border-line bg-surface"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="h-auto w-full transition-transform duration-500 ease-out-expo group-hover:scale-[1.02]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-2 top-2 grid size-9 place-items-center rounded border border-line bg-paper text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <MagnifyingGlassPlus size={16} />
                  </span>
                </button>
                {item.caption && (
                  <figcaption className="mt-3 font-mono text-xs text-muted">{item.caption}</figcaption>
                )}
              </figure>
            </li>
          );
        })}
      </ul>
      {open !== null && (
        <Lightbox items={images} index={open} onIndex={setOpen} onClose={() => setOpen(null)} labels={labels} />
      )}
    </>
  );
}
