import Image from "next/image";
import { site } from "@/content/site";

/** The one portrait, framed with a hairline. Renders nothing when `about.photo` is null. */
export default function Portrait({ className = "", sizes, priority = false, caption = false }: { className?: string; sizes: string; priority?: boolean; caption?: boolean }) {
  const photo = site.about.photo;
  if (!photo) return null;
  return (
    <figure className={`m-0 ${className}`}>
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-line bg-paper-2">
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      {caption && <figcaption className="mt-3 text-[0.9rem] text-muted">{photo.caption}</figcaption>}
    </figure>
  );
}
