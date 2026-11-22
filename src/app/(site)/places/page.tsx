import type { Metadata } from "next";
import Container from "@/components/container";
import LightboxGallery from "@/components/lightbox-gallery";
import PageHead from "@/components/page-head";
import WorldMap from "@/components/world-map";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Places",
  description: site.placesPage.lede,
  alternates: { canonical: "/places" },
  openGraph: { title: `Places · ${site.name}`, description: site.placesPage.lede, url: "/places" },
};

export default function PlacesPage() {
  const { trips, photos, placesPage } = site;
  const groups = trips.map((t) => ({ trip: t, photos: photos.filter((p) => p.trip === t.id) })).filter((g) => g.photos.length > 0);

  return (
    <>
      <PageHead label="Places" title={placesPage.title} lede={placesPage.lede} />
      <Container>
        <div className="mb-6">
          <WorldMap />
        </div>
        <nav aria-label="Trips" className="mb-16 flex flex-wrap items-center gap-2 lg:mb-24">
          <span className="mr-2 text-[0.95rem] text-muted">{placesPage.mapNote}</span>
          {groups.map(({ trip }) => (
            <a key={trip.id} href={`#${trip.id}`} className="panel px-3.5 py-1.5 text-[0.95rem] font-semibold text-ink-soft no-underline hover:text-accent">
              {trip.name}
            </a>
          ))}
        </nav>
        <div className="grid gap-20 lg:gap-28">
          {groups.map(({ trip, photos }) => (
            <section key={trip.id} id={trip.id} aria-labelledby={`trip-${trip.id}`} className="grid gap-8 lg:grid-cols-12 lg:gap-8">
              <div className="min-w-0 lg:col-span-3">
                <h2 id={`trip-${trip.id}`} className="title m-0 text-[2.2rem] sm:text-[2.6rem]">
                  {trip.name}
                </h2>
                {trip.note && <p className="body-text m-0 mt-3 text-[1.05rem] text-muted">{trip.note}</p>}
              </div>
              <div className="lg:col-span-9">
                <LightboxGallery photos={photos} />
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
