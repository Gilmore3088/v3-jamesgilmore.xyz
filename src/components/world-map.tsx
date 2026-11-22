import JourneyMap from "@/components/journey-map";
import { site } from "@/content/site";
import { buildMapData } from "@/lib/map-data";

/** Server wrapper: builds the map data at build time and renders the client map. */
export default function WorldMap({ intro = false, className = "" }: { intro?: boolean; className?: string }) {
  const data = buildMapData();
  return <JourneyMap data={data} intro={intro} labels={site.placesPage} tripHrefBase={intro ? "/places#" : "#"} className={className} />;
}
