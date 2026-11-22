import Image from "next/image";
import Container from "@/components/container";
import type { Photo } from "@/content/site";

type Props = { photo: Photo; children: React.ReactNode; tall?: boolean; /** CSS object-position for the photo. */ position?: string };

/** Full-bleed photo with the headline sitting on it. */
export default function Hero({ photo, children, tall = true, position = "center 40%" }: Props) {
  return (
    <section className={`scrim relative w-full overflow-hidden ${tall ? "min-h-[34rem] sm:min-h-[40rem] lg:min-h-[min(88vh,52rem)]" : "min-h-[26rem] sm:min-h-[32rem] lg:min-h-[38rem]"}`}>
      <Image src={`/photos/${photo.src}.jpg`} alt={photo.alt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
      <div className="relative z-10 flex h-full min-h-[inherit] items-end">
        <Container className="pb-10 pt-40 sm:pb-14 lg:pb-16">{children}</Container>
      </div>
    </section>
  );
}
