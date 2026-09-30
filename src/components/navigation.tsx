"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Say hi" },
] as const;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <nav className={`sticky top-0 z-50 transition-colors duration-300 ${scrolled || open ? "border-b border-line bg-bg/90 backdrop-blur-md" : "bg-transparent"}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <Link href="/" className="font-display text-2xl font-bold tracking-tight text-gold-gradient" onClick={() => setOpen(false)}>
            JG
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`relative text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-gold ${isActive(href) ? "text-gold" : "text-muted"}`}
                >
                  {label}
                  {isActive(href) && <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold" />}
                </Link>
              </li>
            ))}
          </ul>

          <button type="button" className="text-muted transition-colors hover:text-gold md:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="bg-bg/95 backdrop-blur-md md:hidden">
          <ul className="space-y-1 px-4 py-5">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} aria-current={isActive(href) ? "page" : undefined} className={`block rounded-md px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] ${isActive(href) ? "bg-paper text-gold" : "text-muted hover:bg-paper hover:text-gold"}`} onClick={() => setOpen(false)}>
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
