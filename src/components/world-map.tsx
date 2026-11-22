import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import land110 from "world-atlas/land-110m.json";
import type { Trip } from "@/content/site";

const W = 1000;
const H = 520;

/** World map with a pin per trip. Drawn at build time; pins link to the trip's photos. */
export default function WorldMap({ trips }: { trips: Trip[] }) {
  const topo = land110 as unknown as Topology<{ land: GeometryCollection }>;
  const land = feature(topo, topo.objects.land);
  const projection = geoNaturalEarth1().fitExtent(
    [
      [8, 8],
      [W - 8, H - 8],
    ],
    land
  );
  const path = geoPath(projection);
  const d = path(land) ?? "";

  const pinned = trips.filter((t) => t.pins && t.pins.length > 0);

  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="World map with a pin for each trip" className="h-auto w-full">
        <path d={d} fill="var(--color-surface-2)" stroke="var(--color-line)" strokeWidth="0.6" />
        {pinned.map((t) =>
          t.pins!.map(([lat, lng], i) => {
            const pt = projection([lng, lat]);
            if (!pt) return null;
            const [x, y] = pt;
            const first = i === 0;
            return (
              <a key={`${t.id}-${i}`} href={`#${t.id}`} aria-label={`${t.name}: jump to photos`} className="group outline-none">
                <circle cx={x} cy={y} r="14" fill="transparent" />
                <circle cx={x} cy={y} r="5" fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth="2" className="transition-transform group-hover:scale-125 group-focus-visible:scale-125" style={{ transformOrigin: `${x}px ${y}px` }} />
                {first && (
                  <text x={x + 10} y={y + 4} fontSize="14" fontWeight="600" fill="var(--color-ink)" className="hidden sm:block group-hover:fill-[var(--color-accent)]" style={{ paintOrder: "stroke", stroke: "var(--color-bg)", strokeWidth: 4, strokeLinejoin: "round" }}>
                    {t.name}
                  </text>
                )}
              </a>
            );
          })
        )}
      </svg>
    </figure>
  );
}
