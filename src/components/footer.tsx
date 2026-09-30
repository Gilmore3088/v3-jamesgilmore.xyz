import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIAL } from "@/lib/site";
import { profile } from "@/content/profile";

const SOCIAL_LINKS = [
  { href: SOCIAL.github, label: "GitHub", icon: Github },
  { href: SOCIAL.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: `mailto:${SOCIAL.email}`, label: "Email", icon: Mail },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-dashed border-line py-8 text-sm text-muted">
        <p className="m-0">
          © {year} James Gilmore · Seattle
        </p>
        <p className="hand m-0 text-lg text-muted">{profile.footerLine}</p>
        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink transition-transform hover:-translate-y-0.5 hover:bg-mustard"
            >
              <Icon size={16} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
