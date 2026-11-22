import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, Geometry } from "geojson";
import countries110 from "world-atlas/countries-110m.json";
import land110 from "world-atlas/land-110m.json";
import PlacesMap, { type MapPin, type MapTrip } from "@/components/places-map";
import { site } from "@/content/site";

export const MAP_W = 1000;
export const MAP_H = 520;

/**
 * Projects the world and every pin at build time and hands plain numbers to the
 * interactive client map. Nothing geographic ships to the browser except SVG paths.
 */
export default function WorldMap() {
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
  const landPath = path(land) ?? "";

  const visited = new Set(site.visitedCountries);
  const visitedPaths = countries.features.filter((f) => visited.has(f.properties.name)).map((f) => path(f) ?? "").filter(Boolean);

  // Labels are placed in trip order; one that would overlap an earlier label is hidden until hover.
  const taken: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const overlaps = (b: { x1: number; y1: number; x2: number; y2: number }) => taken.some((o) => b.x1 < o.x2 && b.x2 > o.x1 && b.y1 < o.y2 && b.y2 > o.y1);

  const trips: MapTrip[] = site.trips.map((t) => {
    const pins = (t.pins ?? [])
      .map(([lat, lng]) => projection([lng, lat]))
      .filter((pt): pt is [number, number] => Boolean(pt))
      .map(([x, y]) => ({ x, y }));
    let showLabel = false;
    if (pins.length > 0) {
      const { x, y } = pins[0];
      const box = { x1: x - 8, y1: y - 10, x2: x + 12 + t.name.length * 7.6, y2: y + 8 };
      if (!overlaps(box)) {
        taken.push(box);
        showLabel = true;
      }
    }
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

  const wishes: MapPin[] = site.wishlist.flatMap((w) =>
    w.pins
      .map(([lat, lng]) => projection([lng, lat]))
      .filter((pt): pt is [number, number] => Boolean(pt))
      .map(([x, y]) => ({ x, y, name: w.name, note: w.note ?? null }))
  );

  return <PlacesMap width={MAP_W} height={MAP_H} landPath={landPath} visitedPaths={visitedPaths} trips={trips} wishes={wishes} labels={site.placesPage} />;
}
