"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Link as NavLink } from "@/content/site";

export default function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <ul className="m-0 flex list-none items-center gap-5 p-0 sm:gap-8">
      {links.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`label inline-block py-1 no-underline transition-colors hover:text-ink ${
                active ? "text-ink underline decoration-evergreen decoration-1 underline-offset-[0.6em]" : ""
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
