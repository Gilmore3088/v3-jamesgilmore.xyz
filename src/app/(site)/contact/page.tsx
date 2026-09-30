import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { SOCIAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with James Gilmore about data, automation, fintech, or an idea worth building.",
  alternates: { canonical: "/contact" },
};

const CONTACT_LINKS = [
  {
    label: "Email",
    value: SOCIAL.email,
    href: `mailto:${SOCIAL.email}`,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/JamesLGilmore",
    href: SOCIAL.linkedin,
  },
  {
    label: "GitHub",
    value: "github.com/Gilmore3088",
    href: SOCIAL.github,
  },
];

export default function ContactPage() {
  return (
    <div className="noise-bg">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* Page Header */}
        <div className="animate-fade-up">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
            Let&apos;s Connect
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-gold-gradient sm:text-5xl">
            Contact
          </h1>
          <p className="mt-4 max-w-xl text-text-secondary">
            Have a question or want to connect? Send me a message and I will
            get back to you.
          </p>
          <hr className="hr-gold opacity-30 mt-6" />
        </div>

        {/* Split Layout: Form Left, Info Right */}
        <div className="mt-14 grid gap-16 lg:grid-cols-5">
          {/* Form - Left */}
          <div className="relative lg:col-span-3 animate-fade-up animation-delay-100">
            <ContactForm />
          </div>

          {/* Contact Info - Right */}
          <div className="lg:col-span-2 animate-fade-up animation-delay-200">
            <div className="rounded-lg border border-border bg-surface p-8">
              <h2 className="font-display text-xl font-semibold text-text-primary">
                Get in Touch
              </h2>
              <hr className="hr-gold opacity-20 my-5" />

              {/* Location */}
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={15} className="text-gold flex-shrink-0" aria-hidden="true" />
                <span className="text-sm text-text-secondary">
                  Seattle, WA
                </span>
              </div>

              {/* Links */}
              <div className="space-y-5">
                {CONTACT_LINKS.map((link) => (
                  <div key={link.label}>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
                      {link.label}
                    </p>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm text-text-secondary transition-colors duration-300 hover:text-gold"
                    >
                      {link.value}
                    </a>
                  </div>
                ))}
              </div>

              <hr className="hr-gold opacity-20 my-6" />
              <p className="text-xs leading-relaxed text-text-muted">
                I typically reply within a couple of days. For anything
                time-sensitive, email is the fastest route.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
