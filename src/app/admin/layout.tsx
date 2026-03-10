import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Mail,
  LogOut,
  ArrowLeft,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Contacts", href: "/admin/contacts", icon: Mail },
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
      <aside className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-border bg-surface">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/admin" className="text-lg font-bold text-gold">
            Admin Panel
          </Link>
        </div>

        <div className="px-6 py-3 border-b border-border">
          <p className="truncate text-xs text-text-muted">{user.email}</p>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-light hover:text-gold"
            >
              <item.icon size={16} className="shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-4 space-y-2">
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-muted transition-colors hover:text-red-400"
            >
              <LogOut size={16} className="shrink-0" />
              Sign Out
            </button>
          </form>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-1 text-xs text-text-muted transition-colors hover:text-gold"
          >
            <ArrowLeft size={14} className="shrink-0" />
            Back to site
          </Link>
        </div>
      </aside>

      <main className="ml-64 flex-1">
        <div className="sticky top-0 z-30 flex h-16 items-center border-b border-border bg-background/90 backdrop-blur-md px-8">
          <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-text-muted">
            Admin
          </h2>
        </div>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
