"use client";

import { useEffect, useRef } from "react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";

export type LightboxItem = { src: string; alt: string; width: number; height: number; caption?: string };
export type LightboxLabels = { close: string; prev: string; next: string };

const control =
  "pointer-events-auto grid size-11 place-items-center rounded border border-line bg-paper text-ink transition-colors hover:border-ink";

/**
 * Modal image viewer on a native <dialog>: Esc closes, focus is trapped by the browser
 * and handed back to whatever opened it. Mount it only while open.
 */
export function Lightbox({
  items,
  index,
  onIndex,
  onClose,
  labels,
}: {
  items: LightboxItem[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  labels: LightboxLabels;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const item = items[index];
  const many = items.length > 1;

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    ref.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, []);

  function step(d: number) {
    onIndex((index + d + items.length) % items.length);
  }

  return (
    <dialog
      ref={ref}
      aria-label={item.alt}
      onClose={onClose}
      onClick={(e) => {
        // Only a click on the empty backdrop area hits the dialog itself.
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 text-white backdrop:bg-black/85"
    >
      <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-3 p-4 md:p-8">
        <div className="flex w-full max-w-[1400px] items-center justify-between">
          <p className="font-mono text-xs" aria-live="polite">
            {many ? `${index + 1} / ${items.length}` : ""}
          </p>
          <button type="button" onClick={onClose} aria-label={labels.close} className={control}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="flex min-h-0 w-full max-w-[1400px] flex-1 items-center justify-center gap-3">
          {many && (
            <button type="button" onClick={() => step(-1)} aria-label={labels.prev} className={`${control} hidden sm:grid`}>
              <CaretLeft size={20} aria-hidden="true" />
            </button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className="pointer-events-auto max-h-full min-h-0 min-w-0 max-w-full rounded border border-line bg-surface object-contain"
          />
          {many && (
            <button type="button" onClick={() => step(1)} aria-label={labels.next} className={`${control} hidden sm:grid`}>
              <CaretRight size={20} aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex w-full max-w-[1400px] items-center justify-between gap-4">
          <p className="max-w-[70ch] text-sm">{item.caption}</p>
          {many && (
            <div className="flex gap-2 sm:hidden">
              <button type="button" onClick={() => step(-1)} aria-label={labels.prev} className={control}>
                <CaretLeft size={20} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label={labels.next} className={control}>
                <CaretRight size={20} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
