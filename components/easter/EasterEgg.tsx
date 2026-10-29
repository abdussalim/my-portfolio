"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "@phosphor-icons/react";
import type { SectionProps } from "@/components/ui/types";
import { japanese } from "@/content/japanese";
import { projects } from "@/content/projects";

const STORAGE_KEY = "easter-hint-seen";
const HINT_DELAY_MS = 2500;
const LENS_RADIUS = 160;
const TEXT_SELECTOR =
  "h1,h2,h3,h4,h5,h6,p,a,button,label,span,li,figcaption,dt,dd,div,small,time";
const ROOT_SELECTOR = "main,header,footer";

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

/** Flatten a nested dictionary into dotted-path -> string. */
function flatten(value: unknown, path: string, out: Record<string, string>) {
  if (typeof value === "string") {
    out[path] = value;
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => flatten(v, path ? `${path}.${i}` : String(i), out));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) flatten(v, path ? `${path}.${k}` : k, out);
  }
}

function buildTextMap(dict: SectionProps["dict"], locale: SectionProps["locale"]) {
  const flat: Record<string, string> = {};
  flatten(dict, "", flat);
  for (const p of projects) {
    flatten(
      { summary: p.summary[locale], tags: p.tags[locale], role: p.role[locale] },
      `projects.items.${p.slug}`,
      flat,
    );
  }
  const map = new Map<string, string>();
  for (const [path, text] of Object.entries(flat)) {
    const ja = japanese[path];
    if (ja) map.set(norm(text), ja);
  }
  return map;
}

type Item = { el: HTMLElement; node: HTMLDivElement };

export function EasterEgg({ locale, dict }: SectionProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hintOpen, setHintOpen] = useState(false);
  const hintOpenRef = useRef(false);

  const dismissHint = useCallback(() => {
    hintOpenRef.current = false;
    setHintOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage unavailable */
    }
  }, []);

  // Hint card: fine pointer, motion allowed, once per visitor, after a delay.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* storage unavailable */
    }
    if (seen) return;
    const t = window.setTimeout(() => {
      hintOpenRef.current = true;
      setHintOpen(true);
    }, HINT_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  // The lens itself. Disabled under reduced motion (as the original was).
  useEffect(() => {
    const layer = layerRef.current;
    const ring = ringRef.current;
    if (!layer || !ring) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const textMap = buildTextMap(dict, locale);
    let active = false;
    let items: Item[] = [];
    let frame = 0;
    let x = -9999;
    let y = -9999;

    const setPointer = () => {
      layer.style.setProperty("--lx", `${x}px`);
      layer.style.setProperty("--ly", `${y}px`);
      ring.style.transform = `translate3d(${x - LENS_RADIUS}px, ${y - LENS_RADIUS}px, 0)`;
    };

    const onPointerMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (active) setPointer();
    };

    const collect = () => {
      const roots = document.querySelectorAll<HTMLElement>(ROOT_SELECTOR);
      const matched = new Map<HTMLElement, string>();
      roots.forEach((root) => {
        root.querySelectorAll<HTMLElement>(TEXT_SELECTOR).forEach((el) => {
          if (el.closest("[aria-hidden='true']")) return;
          if (el.tagName === "DIV" && el.childElementCount > 0) return;
          const ja = textMap.get(norm(el.textContent ?? ""));
          if (ja) matched.set(el, ja);
        });
      });
      // Prefer the innermost element: drop any match that contains another match.
      const els = [...matched.keys()];
      return els
        .filter((el) => !els.some((o) => o !== el && el.contains(o)))
        .map((el) => ({ el, ja: matched.get(el)! }));
    };

    const place = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const { el, node } of items) {
        const r = el.getBoundingClientRect();
        if (r.width < 2 || r.height < 2 || r.bottom < -100 || r.top > vh + 100) {
          node.style.display = "none";
          continue;
        }
        node.style.display = "flex";
        node.style.width = `${r.width}px`;
        node.style.height = `${r.height}px`;
        node.style.transform = `translate3d(${r.left}px, ${r.top}px, 0)`;
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };

    const build = () => {
      layer.replaceChildren();
      items = collect().map(({ el, ja }) => {
        const cs = getComputedStyle(el);
        const node = document.createElement("div");
        const st = node.style;
        st.position = "absolute";
        st.left = "0";
        st.top = "0";
        st.boxSizing = "border-box";
        st.overflow = "hidden";
        st.background = "var(--paper)";
        st.color = cs.color;
        st.fontFamily = cs.fontFamily;
        st.fontSize = cs.fontSize;
        st.fontWeight = cs.fontWeight;
        st.fontStyle = cs.fontStyle;
        st.lineHeight = cs.lineHeight;
        st.letterSpacing = cs.letterSpacing;
        st.textTransform = "none";
        st.textAlign = cs.textAlign;
        st.padding = cs.padding;
        st.whiteSpace = "normal";
        const center = el.tagName === "BUTTON" || cs.display !== "block";
        st.alignItems = center ? "center" : "flex-start";
        const ta = cs.textAlign;
        st.justifyContent = ta === "center" ? "center" : ta === "right" || ta === "end" ? "flex-end" : "flex-start";
        const span = document.createElement("span");
        span.textContent = ja;
        node.appendChild(span);
        layer.appendChild(node);
        return { el, node };
      });
      place();
    };

    const activate = () => {
      if (active) return;
      active = true;
      build();
      setPointer();
      layer.style.visibility = "visible";
      ring.style.visibility = "visible";
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      if (hintOpenRef.current) dismissHint();
    };

    const deactivate = () => {
      if (!active) return;
      active = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      layer.style.visibility = "hidden";
      ring.style.visibility = "hidden";
      layer.replaceChildren();
      items = [];
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control") activate();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control") deactivate();
    };

    const mask = `radial-gradient(circle ${LENS_RADIUS}px at var(--lx, -9999px) var(--ly, -9999px), #000 calc(100% - 1px), transparent 100%)`;
    layer.style.setProperty("mask-image", mask);
    layer.style.setProperty("-webkit-mask-image", mask);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", deactivate);
    document.addEventListener("mouseleave", deactivate);

    return () => {
      deactivate();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", deactivate);
      document.removeEventListener("mouseleave", deactivate);
    };
  }, [dict, locale, dismissHint]);

  return (
    <>
      <div
        ref={layerRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        style={{ visibility: "hidden" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 rounded-full border border-signal"
        style={{ width: LENS_RADIUS * 2, height: LENS_RADIUS * 2, visibility: "hidden" }}
      />
      {hintOpen ? (
        <div
          role="note"
          className="fixed bottom-4 left-4 z-50 flex max-w-xs items-start gap-3 rounded-[4px] border border-line bg-surface p-3 text-ink"
        >
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-wider text-signal-ink">{dict.easter.kicker}</p>
            <p className="mt-1 text-sm text-muted">{dict.easter.text}</p>
          </div>
          <button
            type="button"
            onClick={dismissHint}
            aria-label={dict.easter.close}
            className="-m-1 shrink-0 rounded-[4px] p-1 text-muted hover:text-ink"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </>
  );
}
