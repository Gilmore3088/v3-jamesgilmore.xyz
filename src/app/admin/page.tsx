import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const [blogResult, projectResult, contactResult, unreadResult] =
    await Promise.all([
      supabase.from("blogs").select("id", { count: "exact", head: true }),
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("contacts").select("id", { count: "exact", head: true }),
      supabase
        .from("contacts")
        .select("id", { count: "exact", head: true })
        .eq("read", false),
    ]);

  const blogCount = blogResult.count ?? 0;
  const projectCount = projectResult.count ?? 0;
  const contactCount = contactResult.count ?? 0;
  const unreadCount = unreadResult.count ?? 0;

  const stats = [
    {
      label: "Blog Posts",
      count: blogCount,
      href: "/admin/blog",
      description: "Published articles",
    },
    {
      label: "Projects",
      count: projectCount,
      href: "/admin/projects",
      description: "Portfolio items",
    },
    {
      label: "Contacts",
      count: contactCount,
      href: "/admin/contacts",
      description: `${unreadCount} unread`,
    },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-text-primary">Dashboard</h1>

      <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-gold/50"
          >
            <p className="text-sm font-medium text-text-secondary">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-gold">{stat.count}</p>
            <p className="mt-1 text-sm text-text-muted">{stat.description}</p>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-text-primary">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/blog/new"
            className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-gold-light"
          >
            New Blog Post
          </Link>
          <Link
            href="/admin/projects/new"
            className="rounded-md border border-gold px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
          >
            New Project
          </Link>
          <Link
            href="/admin/contacts"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-gold/50 hover:text-gold"
          >
            View Messages
          </Link>
        </div>
      </div>
    </div>
  );
}
