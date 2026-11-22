"use client";

import Link from "next/link";
import Arrow from "@/components/arrow";
import Container from "@/components/container";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container>
      <section className="pb-16 pt-16 sm:pt-28">
        <p className="label m-0">Something went wrong</p>
        <h1 className="display m-0 mt-5 max-w-[14ch] text-[2.75rem] sm:text-6xl">This page didn&apos;t load properly.</h1>
        <p className="deck m-0 mt-7 max-w-[40ch] text-[1.3rem] leading-[1.4] text-ink-soft">
          Trying again usually fixes it. If it keeps happening, the home page still works.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-4">
          <button type="button" onClick={reset} className="arrow-link cursor-pointer border-0 bg-transparent p-0">
            Try again <Arrow />
          </button>
          <Link href="/" className="arrow-link">
            Home <Arrow />
          </Link>
        </div>
      </section>
    </Container>
  );
}
