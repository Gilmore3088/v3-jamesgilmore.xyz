/** Roman numeral + small label + display heading, used to open sections. */
export default function SectionHead({ numeral, label, title, id }: { numeral: string; label: string; title: string; id: string }) {
  return (
    <div className="min-w-0">
      <p className="label m-0 flex items-baseline gap-3">
        <span className="numeral text-[1.5rem] not-italic" aria-hidden="true">{numeral}</span>
        <span>{label}</span>
      </p>
      <h2 id={id} className="display m-0 mt-5 max-w-[20ch] text-[2rem] sm:text-[2.5rem]">
        {title}
      </h2>
    </div>
  );
}
