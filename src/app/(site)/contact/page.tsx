import type { Metadata } from "next";
import Arrow from "@/components/arrow";
import Container from "@/components/container";
import PageHead from "@/components/page-head";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: site.contact.lede,
  alternates: { canonical: "/contact" },
  openGraph: { title: `Contact · ${site.name}`, description: site.contact.lede, url: "/contact" },
};

export default function ContactPage() {
  const { contact, links, email } = site;
  const hasAnyLink = links.length > 0 || Boolean(email);
  return (
    <>
      <PageHead label="Contact" title={contact.title} lede={contact.lede} />
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 max-w-[40rem] lg:col-span-6">
            <p className="body-text m-0 text-[1.25rem] text-ink-soft">{contact.body}</p>
            <p className="body-text m-0 mt-6 text-[1.05rem] text-muted">{contact.formNote}</p>
          </div>
          {hasAnyLink && (
            <ul className="m-0 grid list-none gap-3 p-0 lg:col-span-5 lg:col-start-8">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="card panel flex items-baseline justify-between gap-6 p-6">
                    <span className="card-title text-[1.5rem] font-bold">{contact.emailLabel}</span>
                    <span className="flex items-baseline gap-2 text-right text-[1rem] text-muted">
                      <span className="break-all">{email}</span> <Arrow className="text-accent" />
                    </span>
                  </a>
                </li>
              )}
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="me noopener noreferrer" className="card panel flex items-baseline justify-between gap-6 p-6">
                    <span className="card-title text-[1.5rem] font-bold">{l.label}</span>
                    <span className="flex items-baseline gap-2 text-right text-[1rem] text-muted">
                      <span className="break-all">{l.handle ?? l.href}</span> <Arrow className="-rotate-45 text-accent" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </>
  );
}
