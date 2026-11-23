import JourneyMap from "@/components/journey-map";
import { site } from "@/content/site";
import { buildMapData } from "@/lib/map-data";

/** Server wrapper: builds the map data at build time and renders the client map. */
export default function WorldMap({ intro = false, layout = "page", className = "" }: { intro?: boolean; layout?: "hero" | "page"; className?: string }) {
  const data = buildMapData();
  return <JourneyMap data={data} intro={intro} labels={site.placesPage} tripHrefBase={intro ? "/places#" : "#"} layout={layout} className={className} />;
}
