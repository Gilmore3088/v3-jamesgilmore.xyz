"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Stuff I made" },
  { href: "/blog", label: "Writing" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Say hi" },
] as const;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <Link
            href="/"
            className="font-display text-xl font-extrabold tracking-tight"
            onClick={() => setOpen(false)}
          >
            James Gilmore
            <span aria-hidden="true" className="ml-0.5 inline-block h-2.5 w-2.5 rounded-full bg-coral align-baseline" />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm font-bold transition-colors ${
                    isActive(href)
                      ? "bg-ink text-bg"
                      : "text-muted hover:bg-paper hover:text-ink"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="rounded-full border-2 border-ink p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-b-2 border-ink bg-bg md:hidden">
          <ul className="space-y-1 px-4 py-4">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3 text-base font-bold ${
                    isActive(href) ? "bg-ink text-bg" : "text-ink hover:bg-paper"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
