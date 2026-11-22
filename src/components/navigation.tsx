import Link from "next/link";
import Container from "@/components/container";
import NavLinks from "@/components/nav-links";
import { site } from "@/content/site";

export default function Navigation() {
  return (
    <header className="border-b border-line">
      <Container>
        <nav aria-label="Primary" className="flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
          <Link href="/" className="serif text-[1.3rem] leading-none tracking-[-0.01em] text-ink no-underline hover:text-evergreen">
            {site.name}
          </Link>
          <NavLinks links={site.nav} />
        </nav>
      </Container>
    </header>
  );
}
