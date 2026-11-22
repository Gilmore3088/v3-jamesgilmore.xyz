import Link from "next/link";
import Container from "@/components/container";
import { site } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-28 border-t border-line lg:mt-36">
      <Container className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4 py-8 text-sm text-muted">
        <p className="m-0">
          © {year} {site.name} · {site.footer.line}
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
          {site.nav.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="link">
                {label}
              </Link>
            </li>
          ))}
          {site.links.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="link" rel="me noopener noreferrer" target="_blank">
                {label}
              </a>
            </li>
          ))}
          {site.email && (
            <li>
              <a href={`mailto:${site.email}`} className="link">
                Email
              </a>
            </li>
          )}
        </ul>
      </Container>
    </footer>
  );
}
