import { geoInterpolate, geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, Geometry } from "geojson";
import countries110 from "world-atlas/countries-110m.json";
import land110 from "world-atlas/land-110m.json";
import { site } from "@/content/site";

export const MAP_W = 1000;
export const MAP_H = 520;

export type MapTrip = {
  id: string;
  name: string;
  note: string | null;
  when: string | null;
  photos: { src: string; alt: string; caption: string }[];
  pins: { x: number; y: number }[];
  /** False when the label would collide with another; it then shows on hover or selection. */
  showLabel: boolean;
};
export type MapWish = { x: number; y: number; name: string; note: string | null };
export type MapStop = { x: number; y: number; name: string; note: string | null };
export type MapData = {
  width: number;
  height: number;
  landPath: string;
  visitedPaths: string[];
  trips: MapTrip[];
  wishes: MapWish[];
  stops: MapStop[];
  /** One great-circle segment per leg of the journey, in order. */
  legs: string[];
};

/**
 * Projects the world, the journey, and every pin once at build time and returns
 * plain numbers and SVG path strings for the client map.
 */
export function buildMapData(): MapData {
  const landTopo = land110 as unknown as Topology<{ land: GeometryCollection }>;
  const countriesTopo = countries110 as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
  const land = feature(landTopo, landTopo.objects.land);
  const countries = feature(countriesTopo, countriesTopo.objects.countries) as unknown as { features: Feature<Geometry, { name: string }>[] };

  const projection = geoNaturalEarth1().fitExtent(
    [
      [8, 8],
      [MAP_W - 8, MAP_H - 8],
    ],
    land
  );
  const path = geoPath(projection);
  const project = ([lat, lng]: [number, number]) => projection([lng, lat]) as [number, number] | null;

  const visited = new Set(site.visitedCountries);
  const visitedPaths = countries.features.filter((f) => visited.has(f.properties.name)).map((f) => path(f) ?? "").filter(Boolean);

  const taken: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const overlaps = (b: { x1: number; y1: number; x2: number; y2: number }) => taken.some((o) => b.x1 < o.x2 && b.x2 > o.x1 && b.y1 < o.y2 && b.y2 > o.y1);
  const claim = (x: number, y: number, name: string) => {
    const box = { x1: x - 8, y1: y - 10, x2: x + 12 + name.length * 7.6, y2: y + 8 };
    if (overlaps(box)) return false;
    taken.push(box);
    return true;
  };

  const stops: MapStop[] = site.journey
    .map((j) => {
      const pt = project(j.pin);
      return pt ? { x: pt[0], y: pt[1], name: j.name, note: j.note ?? null } : null;
    })
    .filter((s): s is MapStop => Boolean(s));
  stops.forEach((s) => claim(s.x, s.y, s.name));

  const legs: string[] = [];
  for (let i = 1; i < site.journey.length; i++) {
    const a = site.journey[i - 1].pin;
    const b = site.journey[i].pin;
    const interp = geoInterpolate([a[1], a[0]], [b[1], b[0]]);
    const pts: string[] = [];
    for (let t = 0; t <= 1.0001; t += 1 / 40) {
      const p = projection(interp(Math.min(t, 1)));
      if (p) pts.push(`${p[0].toFixed(2)},${p[1].toFixed(2)}`);
    }
    legs.push("M" + pts.join("L"));
  }

  const trips: MapTrip[] = site.trips.map((t) => {
    const pins = (t.pins ?? []).map(project).filter((pt): pt is [number, number] => Boolean(pt)).map(([x, y]) => ({ x, y }));
    const showLabel = pins.length > 0 ? claim(pins[0].x, pins[0].y, t.name) : false;
    return {
      id: t.id,
      name: t.name,
      note: t.note ?? null,
      when: t.when ?? null,
      photos: site.photos.filter((p) => p.trip === t.id).map((p) => ({ src: p.src, alt: p.alt, caption: p.caption })),
      pins,
      showLabel,
    };
  });

  const wishes: MapWish[] = site.wishlist.flatMap((w) =>
    w.pins.map(project).filter((pt): pt is [number, number] => Boolean(pt)).map(([x, y]) => ({ x, y, name: w.name, note: w.note ?? null }))
  );

  return { width: MAP_W, height: MAP_H, landPath: path(land) ?? "", visitedPaths, trips, wishes, stops, legs };
}
