"use client";

import Link from "next/link";
import Arrow from "@/components/arrow";
import Container from "@/components/container";
import PageHead from "@/components/page-head";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <>
      <PageHead label="Something went wrong" title="This page didn't load properly." lede="Trying again usually fixes it. If it keeps happening, the home page still works." />
      <Container>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <button type="button" onClick={reset} className="arrow-link cursor-pointer border-0 bg-transparent p-0">
            Try again <Arrow />
          </button>
          <Link href="/" className="arrow-link">
            Home <Arrow />
          </Link>
        </div>
      </Container>
    </>
  );
}
