"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Arrow from "@/components/arrow";
import type { MapData, MapStop, MapWish } from "@/lib/map-data";

type Props = {
  data: MapData;
  /** Draw the journey and populate the dots on first view. Off on the Places page. */
  intro?: boolean;
  labels: { beenLabel: string; wishLabel: string; panelHint: string };
  /** Prefix for a trip's "see the photos" link; the trip id is appended. */
  tripHrefBase: string;
  className?: string;
};

type Selection = { kind: "trip"; id: string } | { kind: "stop"; stop: MapStop } | { kind: "wish"; wish: MapWish } | null;

/* Intro timing, in seconds. */
const STOP_GAP = 1.1;

/** A viewBox that holds the given points with padding, at least `minW` wide, never wider than the map. */
function frame(points: { x: number; y: number }[], minW: number, W: number, H: number) {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const x1 = Math.min(...xs);
  const x2 = Math.max(...xs);
  const y1 = Math.min(...ys);
  const y2 = Math.max(...ys);
  const span = Math.max(x2 - x1, ((y2 - y1) * W) / H);
  // padding: room for labels on the right and a little air all round
  let w = Math.min(W, Math.max(minW, span * 1.9 + 120));
  let h = (w * H) / W;
  const cx = (x1 + x2) / 2 + w * 0.06;
  const cy = (y1 + y2) / 2;
  let x = cx - w / 2;
  let y = cy - h / 2;
  if (w > W) w = W;
  if (h > H) h = H;
  x = Math.min(W - w, Math.max(0, x));
  y = Math.min(H - h, Math.max(0, y));
  return { x, y, w, h };
}

/**
 * The map. Draws the journey first, then the world fills in; afterwards it pans,
 * zooms, and answers clicks with a panel.
 */
export default function JourneyMap({ data, intro = false, labels, tripHrefBase, className = "" }: Props) {
  const { width: W, height: H } = data;
  const svgRef = useRef<SVGSVGElement>(null);
  const first = data.stops[0];
  const startVb = intro && first ? frame([first], W / 9, W, H) : { x: 0, y: 0, w: W, h: H };
  const [vb, setVb] = useState(startVb);
  const [sel, setSel] = useState<Selection>(null);
  const [intro_, setIntro] = useState(intro);
  const drag = useRef<{ id: number; x: number; y: number; moved: boolean } | null>(null);
  const pinch = useRef<{ d: number; w: number } | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());

  const clamp = useCallback(
    (n: { x: number; y: number; w: number; h: number }) => {
      const w = Math.min(W, Math.max(W / 8, n.w));
      const h = (w * H) / W;
      const x = Math.min(W - w, Math.max(0, n.x));
      const y = Math.min(H - h, Math.max(0, n.y));
      return { x, y, w, h };
    },
    [W, H]
  );

  /* Smooth camera: the rendered viewBox eases toward `vb` while the intro plays. */
  const [shown, setShown] = useState(startVb);
  const tween = useRef<number | null>(null);
  useEffect(() => {
    if (!intro_) {
      setShown(vb);
      return;
    }
    const from = { ...shownRef.current };
    const to = vb;
    const t0 = performance.now();
    const dur = 950;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      const e = ease(t);
      const next = { x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e, w: from.w + (to.w - from.w) * e, h: from.h + (to.h - from.h) * e };
      shownRef.current = next;
      setShown(next);
      if (t < 1) tween.current = window.requestAnimationFrame(step);
    };
    if (tween.current) window.cancelAnimationFrame(tween.current);
    tween.current = window.requestAnimationFrame(step);
    return () => {
      if (tween.current) window.cancelAnimationFrame(tween.current);
    };
  }, [vb, intro_]);
  const shownRef = useRef(startVb);
  useEffect(() => {
    if (!intro_) shownRef.current = vb;
  }, [vb, intro_]);

  const view = intro_ ? shown : vb;
  const k = view.w / W; // scale factor so dots stay the same size on screen

  /* Phones (without the intro) start framed on the journey; the world is a pinch away. */
  useEffect(() => {
    if (intro || !svgRef.current || data.stops.length === 0) return;
    const narrow = svgRef.current.getBoundingClientRect().width < 560;
    if (!narrow) return;
    const xs = data.stops.map((s) => s.x);
    const ys = data.stops.map((s) => s.y);
    const pad = 70;
    const x1 = Math.min(...xs) - pad;
    const x2 = Math.max(...xs) + pad * 2.2;
    const y1 = Math.min(...ys) - pad;
    const y2 = Math.max(...ys) + pad;
    const w = Math.max(x2 - x1, ((y2 - y1) * W) / H, W / 3);
    const id = window.requestAnimationFrame(() => setVb(clamp({ x: x1 - (w - (x2 - x1)) / 2, y: y1 - ((w * H) / W - (y2 - y1)) / 2, w, h: (w * H) / W })));
    return () => window.cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const trip = sel?.kind === "trip" ? data.trips.find((t) => t.id === sel.id) ?? null : null;
  const routeDone = data.stops.length * STOP_GAP + 0.4;

  /*
   * The intro only plays once per page view. The camera starts on the first stop and
   * widens with each leg, then pulls out to the whole world as the dots arrive.
   * Reduced motion skips straight to the finished map.
   */
  useEffect(() => {
    if (!intro) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    if (reduced) {
      setVb({ x: 0, y: 0, w: W, h: H });
      timers.push(window.setTimeout(() => setIntro(false), 0));
      return () => timers.forEach(window.clearTimeout);
    }
    const stops = data.stops;
    stops.forEach((_, i) => {
      if (i === 0) return;
      const seen = stops.slice(0, i + 1);
      // each move lands as the leg finishes drawing
      timers.push(window.setTimeout(() => setVb(frame(seen, W / 6, W, H)), (0.5 + (i - 1) * STOP_GAP) * 1000));
    });
    const narrow = (svgRef.current?.getBoundingClientRect().width ?? 1000) < 560;
    timers.push(window.setTimeout(() => setVb(narrow ? frame(stops, W / 3, W, H) : { x: 0, y: 0, w: W, h: H }), (routeDone - 0.1) * 1000));
    timers.push(window.setTimeout(() => setIntro(false), (routeDone + 0.06 * (data.trips.length + 6) + 1.4) * 1000));
    return () => timers.forEach(window.clearTimeout);
  }, [intro, routeDone, data.trips.length, data.stops, W, H]);

  const delay = (s: number) => (intro_ ? { animationDelay: `${s}s` } : undefined);

  const toSvg = useCallback(
    (cx: number, cy: number) => {
      const r = svgRef.current!.getBoundingClientRect();
      return { x: vb.x + ((cx - r.left) / r.width) * vb.w, y: vb.y + ((cy - r.top) / r.height) * vb.h };
    },
    [vb]
  );


  const zoomAt = useCallback(
    (factor: number, cx?: number, cy?: number) => {
      setVb((v) => {
        const p = cx !== undefined && cy !== undefined ? toSvg(cx, cy) : { x: v.x + v.w / 2, y: v.y + v.h / 2 };
        const w = v.w * factor;
        const h = v.h * factor;
        return clamp({ x: p.x - (p.x - v.x) * factor, y: p.y - (p.y - v.y) * factor, w, h });
      });
    },
    [toSvg, clamp]
  );

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomAt(e.deltaY > 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  function onPointerDown(e: React.PointerEvent<SVGSVGElement>) {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { d: Math.hypot(a.x - b.x, a.y - b.y), w: vb.w };
      drag.current = null;
    }
  }
  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const r = e.currentTarget.getBoundingClientRect();
    if (pinch.current && pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const w = pinch.current.w * (pinch.current.d / Math.max(d, 1));
      setVb((v) => clamp({ x: v.x + (v.w - w) / 2, y: v.y + (v.h - (w * H) / W) / 2, w, h: (w * H) / W }));
      return;
    }
    if (drag.current && drag.current.id === e.pointerId) {
      const dx = ((e.clientX - drag.current.x) / r.width) * vb.w;
      const dy = ((e.clientY - drag.current.y) / r.height) * vb.h;
      if (!drag.current.moved && Math.abs(e.clientX - drag.current.x) + Math.abs(e.clientY - drag.current.y) > 4) {
        drag.current.moved = true;
        e.currentTarget.setPointerCapture(e.pointerId);
      }
      drag.current.x = e.clientX;
      drag.current.y = e.clientY;
      setVb((v) => clamp({ ...v, x: v.x - dx, y: v.y - dy }));
    }
  }
  function onPointerUp(e: React.PointerEvent<SVGSVGElement>) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (drag.current?.id === e.pointerId) {
      // keep `moved` for the click that follows, then forget
      window.setTimeout(() => (drag.current = null), 0);
    }
  }
  const pick = (s: Selection) => {
    if (drag.current?.moved) return;
    setSel(s);
  };
  const keyPick = (e: React.KeyboardEvent, s: Selection) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSel(s);
    }
  };

  const dotR = 5 * k;
  const ring = 11 * k;
  const stroke = 2 * k;
  const font = 14 * k;

  /* A lived-in stop that shares a spot with a trip links to that trip's photos. */
  const tripNear = (st: MapStop) => data.trips.find((t) => t.pins.some((p) => Math.hypot(p.x - st.x, p.y - st.y) < 6)) ?? null;

  return (
    <div className={`grid gap-4 lg:grid-cols-12 lg:gap-5 ${className}`}>
      <div className="relative min-w-0 lg:col-span-9">
      <svg
        ref={svgRef}
        viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
        role="img"
        aria-label="World map: the places James has lived, in order, and the places he has been"
        className="h-auto w-full cursor-grab touch-none select-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <path d={data.landPath} fill="var(--color-surface-2)" stroke="var(--color-line)" strokeWidth={0.6 * k} />
        {data.visitedPaths.map((d, i) => (
          <path key={i} d={d} fill="var(--color-accent)" fillOpacity="0.16" stroke="var(--color-accent)" strokeOpacity="0.5" strokeWidth={0.7 * k} className={intro_ ? "map-fade" : ""} style={delay(routeDone + 0.3)} />
        ))}

        {/* the journey */}
        {data.legs.map((d, i) => (
          <path key={i} d={d} pathLength={1} fill="none" stroke="var(--color-accent)" strokeWidth={1.6 * k} strokeDasharray="1" strokeDashoffset={intro_ ? 1 : 0} strokeLinecap="round" className={intro_ ? "map-draw" : ""} style={delay(0.5 + i * STOP_GAP)} />
        ))}
        {/* wish list */}
        {data.wishes.map((w, i) => {
          const active = sel?.kind === "wish" && sel.wish === w;
          return (
            <g key={`w-${i}`} role="button" tabIndex={0} aria-label={`${w.name}, want to go`} aria-pressed={active} className="cursor-pointer outline-none" onClick={() => pick({ kind: "wish", wish: w })} onKeyDown={(e) => keyPick(e, { kind: "wish", wish: w })}>
              <circle cx={w.x} cy={w.y} r={13 * k} fill="transparent" />
              <g className={intro_ ? "map-pop" : ""} style={{ ...delay(routeDone + 0.06 * (data.trips.length + i) + 0.4), transformOrigin: `${w.x}px ${w.y}px` }}>
                <circle cx={w.x} cy={w.y} r={active ? dotR * 1.3 : dotR} fill="var(--color-bg)" stroke="var(--color-ink-soft)" strokeWidth={stroke} strokeDasharray={active ? undefined : `${2.5 * k} ${2 * k}`} />
              </g>
            </g>
          );
        })}

        {/* trips */}
        {data.trips.map((t, ti) =>
          t.pins.map((p, i) => {
            const active = sel?.kind === "trip" && sel.id === t.id;
            return (
              <g key={`${t.id}-${i}`} role="button" tabIndex={0} aria-label={`${t.name}: show trip`} aria-pressed={active} className="group cursor-pointer outline-none" onClick={() => pick({ kind: "trip", id: t.id })} onKeyDown={(e) => keyPick(e, { kind: "trip", id: t.id })}>
                <circle cx={p.x} cy={p.y} r={14 * k} fill="transparent" />
                <g className={intro_ ? "map-pop" : ""} style={{ ...delay(routeDone + 0.06 * ti + 0.02 * i + 0.4), transformOrigin: `${p.x}px ${p.y}px` }}>
                  {active && <circle cx={p.x} cy={p.y} r={ring} fill="var(--color-accent)" fillOpacity="0.25" />}
                  <circle cx={p.x} cy={p.y} r={active ? dotR * 1.3 : dotR} fill={t.photos.length > 0 ? "var(--color-accent)" : "var(--color-accent-deep)"} stroke="var(--color-bg)" strokeWidth={stroke} />
                  {i === 0 && (
                    <text
                      x={p.x + 10 * k}
                      y={p.y + 4 * k}
                      fontSize={font}
                      fontWeight="600"
                      fill={active ? "var(--color-accent)" : "var(--color-ink)"}
                      className={`select-none ${t.showLabel || active ? "hidden sm:block" : "hidden sm:group-hover:block sm:group-focus-visible:block"}`}
                      style={{ paintOrder: "stroke", stroke: "var(--color-bg)", strokeWidth: 4 * k, strokeLinejoin: "round" }}
                    >
                      {t.name}
                    </text>
                  )}
                </g>
              </g>
            );
          })
        )}

        {/* where I have lived, drawn last so they stay on top */}
        {data.stops.map((s, i) => {
          const active = sel?.kind === "stop" && sel.stop === s;
          return (
            <g key={s.name} role="button" tabIndex={0} aria-label={`${s.name}: lived here`} aria-pressed={active} className="group cursor-pointer outline-none" onClick={() => pick({ kind: "stop", stop: s })} onKeyDown={(e) => keyPick(e, { kind: "stop", stop: s })}>
              <circle cx={s.x} cy={s.y} r={14 * k} fill="transparent" />
              <g className={intro_ ? "map-pop" : ""} style={{ ...delay(0.4 + i * STOP_GAP), transformOrigin: `${s.x}px ${s.y}px` }}>
                {active && <circle cx={s.x} cy={s.y} r={ring} fill="var(--color-accent)" fillOpacity="0.25" />}
                <circle cx={s.x} cy={s.y} r={dotR * 1.3} fill="var(--color-ink)" stroke="var(--color-accent)" strokeWidth={stroke} />
                <text x={s.x + 11 * k} y={s.y + 4.5 * k} fontSize={font} fontWeight="700" fill="var(--color-ink)" className="select-none" style={{ paintOrder: "stroke", stroke: "var(--color-bg)", strokeWidth: 4 * k, strokeLinejoin: "round" }}>
                  {s.name}
                </text>
              </g>
            </g>
          );
        })}

      </svg>

      {/* zoom controls */}
      <div className="absolute right-3 top-3 flex flex-col gap-1.5">
        <button type="button" onClick={() => zoomAt(1 / 1.4)} aria-label="Zoom in" className="panel h-10 w-10 cursor-pointer border border-line text-xl font-semibold text-ink hover:text-accent">
          +
        </button>
        <button type="button" onClick={() => zoomAt(1.4)} aria-label="Zoom out" className="panel h-10 w-10 cursor-pointer border border-line text-xl font-semibold text-ink hover:text-accent">
          −
        </button>
        {(vb.w < W - 1 || vb.x > 0 || vb.y > 0) && (
          <button type="button" onClick={() => setVb({ x: 0, y: 0, w: W, h: H })} aria-label="Reset view" className="panel h-10 w-10 cursor-pointer border border-line text-sm font-semibold text-muted hover:text-accent">
            ⟲
          </button>
        )}
      </div>

      </div>

      <div className="flex min-w-0 flex-col gap-3 lg:col-span-3">
      {/* panel */}
      <aside aria-live="polite" className={`panel flex-1 p-5 ${intro_ ? "map-fade" : ""}`} style={delay(routeDone + 1.2)}>
        {trip ? (
          <div>
            {trip.when && <p className="label m-0">{trip.when}</p>}
            <h3 className="title m-0 mt-1 text-[1.5rem]">{trip.name}</h3>
            {trip.note && <p className="body-text m-0 mt-2 text-[0.98rem] text-muted">{trip.note}</p>}
            {trip.photos.length > 0 ? (
              <>
                <ul className="m-0 mt-4 grid list-none grid-cols-3 gap-2 p-0">
                  {trip.photos.slice(0, 3).map((p) => (
                    <li key={p.src} className="relative aspect-square overflow-hidden rounded-lg bg-surface-2">
                      <Image src={`/photos/${p.src}.jpg`} alt={p.alt} fill sizes="7rem" className="object-cover" />
                    </li>
                  ))}
                </ul>
                <p className="m-0 mt-4">
                  <Link href={`${tripHrefBase}${trip.id}`} className="arrow-link text-[0.98rem]">
                    {trip.photos.length === 1 ? "See the photo" : `See all ${trip.photos.length} photos`} <Arrow />
                  </Link>
                </p>
              </>
            ) : (
              <p className="body-text m-0 mt-4 text-[0.95rem] text-muted">No photos up yet.</p>
            )}
          </div>
        ) : sel?.kind === "stop" ? (
          <div>
            <p className="label m-0">Lived</p>
            <h3 className="title m-0 mt-1 text-[1.5rem]">{sel.stop.name}</h3>
            {sel.stop.note && <p className="body-text m-0 mt-2 text-[0.98rem] text-muted">{sel.stop.note}</p>}
            {(() => {
              const t = tripNear(sel.stop);
              return t && t.photos.length > 0 ? (
                <p className="m-0 mt-4">
                  <button type="button" onClick={() => setSel({ kind: "trip", id: t.id })} className="arrow-link cursor-pointer border-0 bg-transparent p-0 text-[0.98rem]">
                    Photos from {t.name} <Arrow />
                  </button>
                </p>
              ) : null;
            })()}
          </div>
        ) : sel?.kind === "wish" ? (
          <div>
            <p className="label m-0">{labels.wishLabel}</p>
            <h3 className="title m-0 mt-1 text-[1.5rem]">{sel.wish.name}</h3>
            {sel.wish.note && <p className="body-text m-0 mt-2 text-[0.98rem] text-muted">{sel.wish.note}</p>}
          </div>
        ) : (
          <p className="body-text m-0 text-[0.98rem] text-muted">{labels.panelHint}</p>
        )}
      </aside>

      {/* legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-1 text-[0.92rem] text-muted">
        <span className="inline-flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full border-2 border-accent bg-ink" /> Lived</span>
        <span className="inline-flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full bg-accent" /> {labels.beenLabel}</span>
        {data.wishes.length > 0 && (
          <span className="inline-flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full border-2 border-dashed border-ink-soft" /> {labels.wishLabel}</span>
        )}
      </div>
      </div>
    </div>
  );
}
