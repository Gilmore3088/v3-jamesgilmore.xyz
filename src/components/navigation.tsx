"use client";

import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="font-display text-2xl font-bold tracking-tight text-gold-gradient"
            onClick={() => setMobileMenuOpen(false)}
          >
            JG
          </Link>

          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative text-[13px] font-medium uppercase tracking-[0.15em] transition-colors hover:text-gold ${
                    isActive(href) ? "text-gold" : "text-text-muted"
                  }`}
                >
                  {label}
                  {isActive(href) && (
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-gold" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="md:hidden text-text-muted hover:text-gold transition-colors"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <ul className="px-6 py-6 space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block rounded-md px-4 py-3 text-sm font-medium uppercase tracking-widest transition-colors ${
                    isActive(href)
                      ? "text-gold bg-surface"
                      : "text-text-muted hover:text-gold hover:bg-surface"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
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
