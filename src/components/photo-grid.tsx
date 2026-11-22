import Photo from "@/components/photo";
import type { Photo as PhotoType } from "@/content/site";

/** Photos in three columns, each kept at its natural shape. */
export default function PhotoGrid({ photos, sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" }: { photos: PhotoType[]; sizes?: string }) {
  if (photos.length === 0) return null;
  const columns: PhotoType[][] = [[], [], []];
  photos.forEach((p, i) => columns[i % 3].push(p));
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {columns.map((col, i) => (
        <div key={i} className={`grid content-start gap-6 lg:gap-8 ${i === 2 ? "sm:col-span-2 sm:grid-cols-2 lg:col-span-1 lg:grid-cols-1" : ""}`}>
          {col.map((p) => (
            <Photo key={p.src} photo={p} sizes={sizes} />
          ))}
        </div>
      ))}
    </div>
  );
}
