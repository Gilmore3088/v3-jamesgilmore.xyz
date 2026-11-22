import Container from "@/components/container";

/** Plain page opening for pages without a hero photo. Leaves room for the absolute nav. */
export default function PageHead({ label, title, lede }: { label: string; title: string; lede?: string }) {
  return (
    <Container>
      <header className="rise grid gap-6 pb-12 pt-28 sm:pt-32 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-36">
        <div className="min-w-0 lg:col-span-7">
          <p className="label m-0">{label}</p>
          <h1 className="display m-0 mt-4 text-[2.9rem] sm:text-[4rem] lg:text-[5rem]">{title}</h1>
        </div>
        {lede && <p className="deck m-0 max-w-[40ch] text-[1.35rem] text-ink-soft lg:col-span-5 lg:col-start-8 lg:self-end sm:text-[1.5rem]">{lede}</p>}
      </header>
    </Container>
  );
}
