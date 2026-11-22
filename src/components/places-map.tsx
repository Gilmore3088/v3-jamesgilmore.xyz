"use client";

import Image from "next/image";
import { useState } from "react";
import Arrow from "@/components/arrow";

export type MapTrip = {
  id: string;
  name: string;
  note: string | null;
  photos: { src: string; alt: string; caption: string }[];
  pins: { x: number; y: number }[];
};
export type MapPin = { x: number; y: number; name: string; note: string | null };

type Props = {
  width: number;
  height: number;
  landPath: string;
  visitedPaths: string[];
  trips: MapTrip[];
  wishes: MapPin[];
  labels: { beenLabel: string; wishLabel: string; panelHint: string };
};

/** Interactive map: solid pins for trips, hollow pins for the wish list, a panel for the selected pin. */
export default function PlacesMap({ width, height, landPath, visitedPaths, trips, wishes, labels }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [wish, setWish] = useState<MapPin | null>(null);
  const trip = trips.find((t) => t.id === selected) ?? null;

  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
      <div className="panel p-3 sm:p-5 lg:col-span-8">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="World map with a pin for each trip" className="h-auto w-full">
          <path d={landPath} fill="var(--color-surface-2)" stroke="var(--color-line)" strokeWidth="0.6" />
          {visitedPaths.map((d, i) => (
            <path key={i} d={d} fill="var(--color-accent)" fillOpacity="0.16" stroke="var(--color-accent)" strokeOpacity="0.5" strokeWidth="0.7" />
          ))}

          {wishes.map((w, i) => {
            const active = wish === w;
            return (
              <g key={`w-${i}`} role="button" tabIndex={0} aria-label={`${w.name}, want to go`} aria-pressed={active} className="cursor-pointer outline-none" onClick={() => { setWish(w); setSelected(null); }} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setWish(w); setSelected(null); } }}>
                <circle cx={w.x} cy={w.y} r="13" fill="transparent" />
                <circle cx={w.x} cy={w.y} r={active ? 6.5 : 5} fill="var(--color-bg)" stroke="var(--color-ink-soft)" strokeWidth="2" strokeDasharray={active ? undefined : "2.5 2"} />
              </g>
            );
          })}

          {trips.map((t) =>
            t.pins.map((p, i) => {
              const active = selected === t.id;
              return (
                <g key={`${t.id}-${i}`} role="button" tabIndex={0} aria-label={`${t.name}: show trip`} aria-pressed={active} className="group cursor-pointer outline-none" onClick={() => { setSelected(t.id); setWish(null); }} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(t.id); setWish(null); } }}>
                  <circle cx={p.x} cy={p.y} r="14" fill="transparent" />
                  {active && <circle cx={p.x} cy={p.y} r="11" fill="var(--color-accent)" fillOpacity="0.25" />}
                  <circle cx={p.x} cy={p.y} r={active ? 6.5 : 5} fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth="2" className="transition-[r] group-hover:r-[6.5] group-focus-visible:r-[6.5]" />
                  {i === 0 && (
                    <text x={p.x + 10} y={p.y + 4} fontSize="14" fontWeight="600" fill={active ? "var(--color-accent)" : "var(--color-ink)"} className="hidden select-none sm:block" style={{ paintOrder: "stroke", stroke: "var(--color-bg)", strokeWidth: 4, strokeLinejoin: "round" }}>
                      {t.name}
                    </text>
                  )}
                </g>
              );
            })
          )}
        </svg>
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 px-1 text-[0.95rem] text-muted">
          <span className="inline-flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full bg-accent" /> {labels.beenLabel}</span>
          {wishes.length > 0 && (
            <span className="inline-flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full border-2 border-dashed border-ink-soft" /> {labels.wishLabel}</span>
          )}
        </div>
      </div>

      <aside aria-live="polite" className="panel min-h-[14rem] p-6 lg:col-span-4">
        {trip ? (
          <div>
            <h3 className="title m-0 text-[1.8rem]">{trip.name}</h3>
            {trip.note && <p className="body-text m-0 mt-2 text-[1.02rem] text-muted">{trip.note}</p>}
            <ul className="m-0 mt-5 grid list-none grid-cols-3 gap-2 p-0">
              {trip.photos.slice(0, 6).map((p) => (
                <li key={p.src} className="relative aspect-square overflow-hidden rounded-lg bg-surface-2">
                  <Image src={`/photos/${p.src}.jpg`} alt={p.alt} fill sizes="12vw" className="object-cover" />
                </li>
              ))}
            </ul>
            <p className="m-0 mt-5">
              <a href={`#${trip.id}`} className="arrow-link">
                {trip.photos.length === 1 ? "See the photo" : `See all ${trip.photos.length} photos`} <Arrow />
              </a>
            </p>
          </div>
        ) : wish ? (
          <div>
            <p className="label m-0">{labels.wishLabel}</p>
            <h3 className="title m-0 mt-2 text-[1.8rem]">{wish.name}</h3>
            {wish.note && <p className="body-text m-0 mt-2 text-[1.02rem] text-muted">{wish.note}</p>}
          </div>
        ) : (
          <div className="flex h-full min-h-[11rem] items-center">
            <p className="body-text m-0 text-[1.1rem] text-muted">{labels.panelHint}</p>
          </div>
        )}
      </aside>
    </div>
  );
}
