"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/site";

const ASPECT: Record<Photo["orientation"], string> = {
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
};

/** Photos in two columns; click one to open it large in a dialog with prev / next. */
export default function LightboxGallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const show = useCallback((i: number) => setOpen(((i % photos.length) + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") show(open! + 1);
      if (e.key === "ArrowLeft") show(open! - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, show]);

  const columns: Photo[][] = [[], []];
  photos.forEach((p, i) => columns[i % 2].push(p));
  const current = open !== null ? photos[open] : null;

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
        {columns.map((col, c) => (
          <div key={c} className="grid content-start gap-5 lg:gap-6">
            {col.map((p) => {
              const i = photos.indexOf(p);
              return (
                <figure key={p.src} className="m-0 min-w-0">
                  <button
                    type="button"
                    onClick={() => show(i)}
                    aria-label={`Open larger: ${p.caption}`}
                    className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-surface ${ASPECT[p.orientation]}`}
                  >
                    <Image src={`/photos/${p.src}.jpg`} alt={p.alt} fill sizes="(min-width: 640px) 45vw, 90vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </button>
                  <figcaption className="mt-3 text-[1.1rem] font-medium text-ink">{p.caption}</figcaption>
                </figure>
              );
            })}
          </div>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null);
        }}
        aria-label={current ? current.caption : "Photo"}
        className="m-auto w-[min(96vw,80rem)] max-w-none bg-transparent p-0 text-ink backdrop:bg-bg/92"
      >
        {current && (
          <div className="relative">
            <div className="relative mx-auto h-[min(82vh,56rem)] w-full">
              <Image key={current.src} src={`/photos/${current.src}.jpg`} alt={current.alt} fill sizes="96vw" className="object-contain" priority />
            </div>
            <div className="mt-3 flex items-center justify-between gap-6 px-1">
              <p className="m-0 text-[1.1rem] font-medium">{current.caption}</p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => show(open! - 1)} aria-label="Previous photo" className="panel cursor-pointer border-0 px-4 py-2 text-ink hover:text-accent">
                  ←
                </button>
                <button type="button" onClick={() => show(open! + 1)} aria-label="Next photo" className="panel cursor-pointer border-0 px-4 py-2 text-ink hover:text-accent">
                  →
                </button>
                <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="panel cursor-pointer border-0 px-4 py-2 text-ink hover:text-accent">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
