import Image from "next/image";
import type { Photo as PhotoType } from "@/content/site";
import { site } from "@/content/site";

export function getPhoto(src: string): PhotoType | undefined {
  return site.photos.find((p) => p.src === src);
}

const ASPECT: Record<PhotoType["orientation"], string> = {
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
};

type Props = {
  photo: PhotoType;
  sizes: string;
  priority?: boolean;
  aspect?: string;
  caption?: boolean;
  /** Fill the parent grid cell instead of using an aspect ratio. Caption overlays the photo. */
  fillParent?: boolean;
  className?: string;
};

export default function Photo({ photo, sizes, priority = false, aspect, caption = true, fillParent = false, className = "" }: Props) {
  if (fillParent) {
    return (
      <figure className={`group relative m-0 min-w-0 overflow-hidden rounded-xl bg-surface ${className}`}>
        <Image src={`/photos/${photo.src}.jpg`} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        {caption && (
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/80 to-transparent px-3 pb-2.5 pt-8 text-sm font-medium text-ink">
            {photo.caption}
          </figcaption>
        )}
      </figure>
    );
  }
  return (
    <figure className={`m-0 min-w-0 ${className}`}>
      <div className={`relative ${aspect ?? ASPECT[photo.orientation]} w-full overflow-hidden rounded-xl bg-surface`}>
        <Image src={`/photos/${photo.src}.jpg`} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      {caption && <figcaption className="mt-3 text-[0.95rem] text-muted">{photo.caption}</figcaption>}
    </figure>
  );
}
