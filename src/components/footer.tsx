import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/jamesgilmore",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://linkedin.com/in/jamesgilmore",
    label: "LinkedIn",
    icon: Linkedin,
  },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-gold transition-colors"
                aria-label={label}
              >
                <Icon size={20} />
              </Link>
            ))}
          </div>

          <div className="text-center space-y-1">
            <p className="text-sm text-text-secondary">
              &copy; {currentYear} James Gilmore. All rights reserved.
            </p>
            <p className="text-xs text-text-muted">
              Built with Next.js &amp; Supabase
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
