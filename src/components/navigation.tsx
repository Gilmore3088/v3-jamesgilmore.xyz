"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold text-gold tracking-tight"
            onClick={closeMobileMenu}
          >
            James Gilmore
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative py-1 text-sm font-medium transition-colors hover:text-gold ${
                    isActive(href)
                      ? "text-gold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gold"
                      : "text-text-secondary"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="md:hidden text-text-secondary hover:text-gold transition-colors"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <ul className="px-4 py-4 space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-light hover:text-gold ${
                    isActive(href)
                      ? "text-gold bg-surface"
                      : "text-text-secondary"
                  }`}
                  onClick={closeMobileMenu}
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
