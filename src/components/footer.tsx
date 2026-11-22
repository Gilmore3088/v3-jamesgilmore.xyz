import Link from "next/link";
import Container from "@/components/container";
import { site } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-28 lg:mt-36">
      <Container>
        <div className="double-rule" aria-hidden="true" />
        <div className="grid gap-10 pb-10 pt-8 sm:grid-cols-12 sm:gap-8">
          <div className="sm:col-span-4">
            <p className="m-0 serif text-2xl leading-none tracking-[-0.015em]">{site.name}</p>
            <p className="m-0 mt-2 text-sm text-muted">{site.role}.</p>
            <p className="m-0 mt-1 text-sm text-muted">{site.location}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="label m-0">{site.footer.pagesLabel}</p>
            <ul className="m-0 mt-3 list-none space-y-1.5 p-0 text-sm">
              <li>
                <Link href="/" className="link">
                  Home
                </Link>
              </li>
              {site.nav.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2">
            <p className="label m-0">{site.footer.elsewhereLabel}</p>
            <ul className="m-0 mt-3 list-none space-y-1.5 p-0 text-sm">
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
          </div>

          <div className="sm:col-span-4">
            <p className="label m-0">{site.footer.colophonLabel}</p>
            <p className="m-0 mt-3 max-w-[34ch] text-sm leading-relaxed text-muted">{site.footer.colophon}</p>
            <p className="m-0 mt-3 text-sm text-muted">
              © {year} {site.name}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
