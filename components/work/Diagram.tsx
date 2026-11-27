"use client";

import { useState } from "react";
import Image from "next/image";
import { MagnifyingGlassPlus } from "@phosphor-icons/react";
import { Lightbox, type LightboxLabels } from "./Lightbox";

type Props = {
  src: string;
  srcDark: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  zoom: string;
  labels: LightboxLabels;
};

/** Architecture diagram: light and dark renders swap with the theme, click opens the full image. */
export function Diagram({ src, srcDark, width, height, alt, caption, zoom, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  function show() {
    setDark(document.documentElement.dataset.theme === "dark");
    setOpen(true);
  }

  const img = "h-auto w-full";
  return (
    <figure>
      <button
        type="button"
        onClick={show}
        aria-label={`${zoom}: ${alt}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded border border-line bg-surface"
      >
        <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1240px) 1176px, 100vw" className={`${img} dark:hidden`} />
        <Image src={srcDark} alt={alt} width={width} height={height} sizes="(min-width: 1240px) 1176px, 100vw" className={`${img} hidden dark:block`} />
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 inline-flex h-9 items-center gap-1.5 rounded border border-line bg-paper px-3 font-mono text-xs text-ink transition-colors group-hover:border-ink"
        >
          <MagnifyingGlassPlus size={16} />
          {zoom}
        </span>
      </button>
      {caption && <figcaption className="mt-3 max-w-[70ch] font-mono text-xs text-muted">{caption}</figcaption>}
      {open && (
        <Lightbox
          items={[{ src: dark ? srcDark : src, alt, width, height, caption }]}
          index={0}
          onIndex={() => {}}
          onClose={() => setOpen(false)}
          labels={labels}
        />
      )}
    </figure>
  );
}
