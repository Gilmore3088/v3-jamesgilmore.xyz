interface SectionHeadingProps {
  title: string;
  note?: string;
  as?: "h1" | "h2";
}

/** Big display heading with an optional handwritten aside. */
export default function SectionHeading({ title, note, as = "h2" }: SectionHeadingProps) {
  const Tag = as;
  return (
    <Tag className="mb-6 font-display text-3xl font-extrabold leading-none tracking-tight sm:text-4xl">
      {title}
      {note && (
        <span className="hand ml-3 inline-block -rotate-2 text-xl font-medium tracking-normal text-muted">
          {note}
        </span>
      )}
    </Tag>
  );
}
