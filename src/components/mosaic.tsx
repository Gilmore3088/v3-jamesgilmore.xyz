import Photo from "@/components/photo";
import type { Photo as PhotoType } from "@/content/site";

/* A repeating five-up pattern: one big, one tall, three small. */
const SPANS = [
  "col-span-2 row-span-2 lg:col-span-4 lg:row-span-2",
  "col-span-1 row-span-1 lg:col-span-2 lg:row-span-2",
  "col-span-1 row-span-1 lg:col-span-2",
  "col-span-1 row-span-1 lg:col-span-2",
  "col-span-1 row-span-1 lg:col-span-2",
];

export default function Mosaic({ photos, captions = true }: { photos: PhotoType[]; captions?: boolean }) {
  if (photos.length === 0) return null;
  return (
    <div className="grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] lg:auto-rows-[14rem] lg:grid-cols-6 lg:gap-4">
      {photos.map((p, i) => (
        <Photo key={p.src} photo={p} fillParent sizes="(min-width: 1024px) 60vw, 100vw" caption={captions} className={SPANS[i % SPANS.length]} />
      ))}
    </div>
  );
}
