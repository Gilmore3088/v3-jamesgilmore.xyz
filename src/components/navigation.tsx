import Link from "next/link";
import Container from "@/components/container";
import NavLinks from "@/components/nav-links";
import { site } from "@/content/site";

export default function Navigation() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <Container>
        <nav aria-label="Primary" className="flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5">
          <Link href="/" className="text-[1.15rem] font-bold tracking-[-0.02em] text-ink no-underline hover:text-accent">
            {site.name}
          </Link>
          <NavLinks links={site.nav} />
        </nav>
      </Container>
    </header>
  );
}
