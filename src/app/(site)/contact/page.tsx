import type { Metadata } from "next";
import Arrow from "@/components/arrow";
import Container from "@/components/container";
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
    <Container>
      <header className="rise grid gap-8 pb-12 pt-10 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-20">
        <div className="min-w-0 lg:col-span-5">
          <p className="label m-0">Contact</p>
          <h1 className="display m-0 mt-5 text-[3.5rem] sm:text-7xl lg:text-[6rem]">{contact.title}</h1>
        </div>
        <p className="deck m-0 max-w-[40ch] text-[1.35rem] leading-[1.4] text-ink lg:col-span-6 lg:col-start-7 lg:mt-3 sm:text-[1.6rem]">
          {contact.lede}
        </p>
      </header>

      <div className="grid gap-12 border-t-2 border-ink pt-9 lg:grid-cols-12 lg:gap-8 lg:pt-11">
        <div className="min-w-0 max-w-[40rem] lg:col-span-6">
          <p className="m-0 serif-text text-[1.22rem] leading-[1.6] text-ink-soft">{contact.body}</p>
          <p className="m-0 mt-8 border-t border-line pt-5 text-[0.95rem] leading-relaxed text-muted">{contact.formNote}</p>
        </div>

        {hasAnyLink && (
          <div className="min-w-0 lg:col-span-5 lg:col-start-8">
            <p className="label m-0">{contact.linksLabel}</p>
            <ul className="m-0 mt-4 list-none border-t border-ink p-0">
              {email && (
                <li className="border-b border-line">
                  <a href={`mailto:${email}`} className="card group flex items-baseline justify-between gap-6 py-5">
                    <span className="card-title serif text-[1.75rem] leading-none tracking-[-0.015em]">{contact.emailLabel}</span>
                    <span className="flex items-baseline gap-2 text-right text-sm text-muted">
                      <span className="break-all">{email}</span> <Arrow className="text-evergreen" />
                    </span>
                  </a>
                </li>
              )}
              {links.map((l) => (
                <li key={l.href} className="border-b border-line">
                  <a href={l.href} target="_blank" rel="me noopener noreferrer" className="card group flex items-baseline justify-between gap-6 py-5">
                    <span className="card-title serif text-[1.75rem] leading-none tracking-[-0.015em]">{l.label}</span>
                    <span className="flex items-baseline gap-2 text-right text-sm text-muted">
                      <span className="break-all">{l.handle ?? l.href}</span> <Arrow className="-rotate-45 text-evergreen" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Container>
  );
}
