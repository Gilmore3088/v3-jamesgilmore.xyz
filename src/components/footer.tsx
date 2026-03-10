import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/Gilmore3088",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://linkedin.com/in/JamesLGilmore",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "mailto:JLGilmore2@gmail.com",
    label: "Email",
    icon: Mail,
  },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold text-gold-gradient">
              James Gilmore
            </p>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Building systems, exploring ideas, and taking advantage of
              the most creative technological moment in history.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted mb-4">
              Navigation
            </p>
            <div className="grid grid-cols-2 gap-2">
              {["About", "Projects", "Resume", "Blog", "Contact"].map(
                (label) => (
                  <Link
                    key={label}
                    href={`/${label.toLowerCase()}`}
                    className="text-sm text-text-secondary hover:text-gold transition-colors"
                  >
                    {label}
                  </Link>
                )
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted mb-4">
              Connect
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-all hover:border-gold hover:text-gold"
                  aria-label={label}
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <hr className="hr-gold my-10 opacity-30" />

        <p className="text-center text-xs text-text-muted">
          {currentYear} James Gilmore. Built with Next.js & Supabase.
        </p>
      </div>
    </footer>
  );
}
