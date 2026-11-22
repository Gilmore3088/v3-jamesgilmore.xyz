import Image from "next/image";
import type { Project } from "@/content/site";

type Props = { project: Project; aspect?: string; sizes: string; priority?: boolean; withCaption?: boolean };

/** A real screenshot of the project. Renders nothing when the project has no image. */
export default function ProjectImage({ project, aspect = "aspect-[16/10]", sizes, priority = false, withCaption = false }: Props) {
  if (!project.image) return null;
  const img = (
    <div className={`relative ${aspect} w-full overflow-hidden rounded-xl bg-surface`}>
      <Image src={project.image.src} alt={project.image.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
    </div>
  );
  if (!withCaption) return img;
  return (
    <figure className="m-0">
      {img}
      <figcaption className="mt-3 text-[0.95rem] text-muted">{project.image.caption}</figcaption>
    </figure>
  );
}
