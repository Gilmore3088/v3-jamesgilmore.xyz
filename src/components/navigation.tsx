import Link from "next/link";
import Container from "@/components/container";
import NavLinks from "@/components/nav-links";
import { site } from "@/content/site";

export default function Navigation() {
  return (
    <header>
      <Container>
        <nav aria-label="Primary" className="flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
          <Link href="/" className="serif text-[1.45rem] leading-none tracking-[-0.015em] text-ink no-underline hover:text-evergreen">
            {site.name}
          </Link>
          <NavLinks links={site.nav} />
        </nav>
        <div className="double-rule" aria-hidden="true" />
      </Container>
    </header>
  );
}
