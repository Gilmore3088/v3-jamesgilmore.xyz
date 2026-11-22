import Link from "next/link";
import Arrow from "@/components/arrow";
import Container from "@/components/container";

export default function NotFoundContent() {
  return (
    <Container>
      <section className="rise pb-16 pt-14 sm:pt-24">
        <p className="label m-0 flex items-baseline gap-3">
          <span className="numeral text-[1.5rem]" aria-hidden="true">404</span>
          <span>Error 404, not found</span>
        </p>
        <h1 className="display m-0 mt-5 max-w-[14ch] text-[2.75rem] sm:text-6xl lg:text-7xl">There&apos;s nothing at this address.</h1>
        <p className="deck m-0 mt-7 max-w-[40ch] text-[1.3rem] leading-[1.4] text-ink-soft">
          The page may have moved, or the link may have been wrong. Everything on the site is reachable from the home page.
        </p>
        <div className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
          <Link href="/" className="arrow-link">
            Home <Arrow />
          </Link>
          <Link href="/projects" className="arrow-link">
            Projects <Arrow />
          </Link>
        </div>
      </section>
    </Container>
  );
}
