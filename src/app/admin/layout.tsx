import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Blog Posts", href: "/admin/blog" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Contacts", href: "/admin/contacts" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed left-0 top-0 flex h-full w-64 flex-col border-r border-border bg-surface">
        <div className="border-b border-border px-6 py-5">
          <Link href="/admin" className="text-lg font-bold text-gold">
            Admin Panel
          </Link>
          <p className="mt-1 truncate text-xs text-text-muted">{user.email}</p>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-light hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="w-full rounded-md border border-border px-3 py-2 text-sm text-text-muted transition-colors hover:border-red-500/30 hover:text-red-400"
            >
              Sign Out
            </button>
          </form>
          <Link
            href="/"
            className="mt-2 block text-center text-xs text-text-muted transition-colors hover:text-gold"
          >
            Back to site
          </Link>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
