import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { SOCIAL } from "@/lib/site";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Say hi",
  description: "Send James Gilmore a note about data, automation, running, travel, or an idea worth building.",
  alternates: { canonical: "/contact" },
};

const CONTACT_LINKS = [
  { label: "Email", value: SOCIAL.email, href: `mailto:${SOCIAL.email}` },
  { label: "LinkedIn", value: "linkedin.com/in/JamesLGilmore", href: SOCIAL.linkedin },
  { label: "GitHub", value: "github.com/Gilmore3088", href: SOCIAL.github },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="animate-fade-up">
        <p className="hand m-0 text-2xl">{profile.hello.hand}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-gold-gradient sm:text-6xl">{profile.hello.title}</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">{profile.hello.text}</p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <div className="relative lg:col-span-3 animate-fade-up animation-delay-100">
          <ContactForm />
        </div>

        <aside className="lg:col-span-2 animate-fade-up animation-delay-200">
          <div className="card p-6">
            <p className="hand m-0 text-xl">or find me here</p>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted"><MapPin size={15} className="text-gold" aria-hidden="true" /> Seattle, WA</p>
            <div className="mt-4 grid gap-3">
              {CONTACT_LINKS.map((link) => (
                <div key={link.label}>
                  <p className="m-0 eyebrow">{link.label}</p>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">{link.value}</a>
                </div>
              ))}
            </div>
            <p className="m-0 mt-5 text-sm text-muted">I usually reply within a couple of days. If it&apos;s urgent, email wins.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
