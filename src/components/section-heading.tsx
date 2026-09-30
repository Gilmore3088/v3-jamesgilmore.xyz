interface SectionHeadingProps {
  title: string;
  note?: string;
  eyebrow?: string;
  as?: "h1" | "h2";
}

/** Gold eyebrow, serif heading, optional italic aside, thin gold rule. */
export default function SectionHeading({ title, note, eyebrow, as = "h2" }: SectionHeadingProps) {
  const Tag = as;
  return (
    <div className="mb-8">
      {eyebrow && <p className="eyebrow m-0 mb-2">{eyebrow}</p>}
      <Tag className="m-0 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {title}
        {note && <span className="hand ml-3 text-xl font-normal tracking-normal sm:text-2xl">{note}</span>}
      </Tag>
      <hr className="hr-gold mt-4" />
    </div>
  );
}
