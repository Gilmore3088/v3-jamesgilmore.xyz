import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteBlogPost } from "./actions";

export default async function AdminBlogList() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: posts, error } = await supabase
    .from("blogs")
    .select("id, title, slug, category, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
        <p className="text-red-400">
          Failed to load blog posts: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-gold-light"
        >
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface p-12 text-center">
          <p className="text-text-secondary">No blog posts yet.</p>
          <Link
            href="/admin/blog/new"
            className="mt-4 inline-block text-sm text-gold hover:text-gold-light"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface-light">
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="transition-colors hover:bg-surface-lighter"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-text-primary">
                      {post.title}
                    </p>
                    <p className="mt-0.5 text-xs text-text-muted">
                      /blog/{post.slug}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {post.category ? (
                      <span className="inline-block rounded-full border border-gold/30 px-2.5 py-0.5 text-xs text-gold">
                        {post.category}
                      </span>
                    ) : (
                      <span className="text-xs text-text-muted">--</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/blog/${post.slug}/edit`}
                        className="text-sm text-text-secondary transition-colors hover:text-gold"
                      >
                        Edit
                      </Link>
                      <form action={deleteBlogPost}>
                        <input type="hidden" name="slug" value={post.slug} />
                        <button
                          type="submit"
                          className="text-sm text-text-muted transition-colors hover:text-red-400"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
