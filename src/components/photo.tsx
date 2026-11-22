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
  /** Override the natural crop, e.g. "aspect-[16/9]". */
  aspect?: string;
  caption?: boolean;
  className?: string;
};

/** One photograph, hairline frame, optional caption. */
export default function Photo({ photo, sizes, priority = false, aspect, caption = true, className = "" }: Props) {
  return (
    <figure className={`m-0 min-w-0 ${className}`}>
      <div className={`relative ${aspect ?? ASPECT[photo.orientation]} w-full overflow-hidden border border-line bg-paper-2`}>
        <Image src={`/photos/${photo.src}.jpg`} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      {caption && <figcaption className="mt-2.5 text-xs text-muted">{photo.caption}</figcaption>}
    </figure>
  );
}
