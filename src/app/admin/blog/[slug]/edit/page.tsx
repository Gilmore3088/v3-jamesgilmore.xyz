"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string | null;
  tags: string[];
  excerpt: string | null;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("blogs")
        .select("id, title, slug, content, category, tags, excerpt")
        .eq("slug", params.slug)
        .single();

      if (fetchError) {
        setError(`Failed to load post: ${fetchError.message}`);
        setLoading(false);
        return;
      }

      if (!data) {
        setError("Post not found.");
        setLoading(false);
        return;
      }

      setPost(data);
      setLoading(false);
    }

    fetchPost();
  }, [params.slug]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!post) return;

    setError(null);
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    const title = (formData.get("title") as string).trim();
    const content = (formData.get("content") as string).trim();
    const category = (formData.get("category") as string).trim() || null;
    const tagsRaw = (formData.get("tags") as string).trim();
    const excerptRaw = (formData.get("excerpt") as string).trim();

    if (!title || !content) {
      setError("Title and content are required.");
      setSaving(false);
      return;
    }

    const slug = slugify(title);

    if (!slug) {
      setError("Title must contain at least one alphanumeric character.");
      setSaving(false);
      return;
    }

    const tags = tagsRaw
      ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const excerpt = excerptRaw || content.slice(0, 200);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("blogs")
      .update({
        title,
        slug,
        content,
        category,
        tags,
        excerpt,
        updated_at: new Date().toISOString(),
      })
      .eq("id", post.id);

    if (updateError) {
      if (updateError.message.includes("duplicate")) {
        setError("A post with this slug already exists. Choose a different title.");
      } else {
        setError(`Failed to update post: ${updateError.message}`);
      }
      setSaving(false);
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-12">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <p className="text-text-secondary">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
        <p className="text-red-400">{error || "Post not found."}</p>
        <Link
          href="/admin/blog"
          className="mt-3 inline-block text-sm text-text-muted hover:text-gold"
        >
          &larr; Back to blog posts
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="text-sm text-text-muted transition-colors hover:text-gold"
        >
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold text-text-primary">Edit Post</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <div>
          <label
            htmlFor="title"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={post.title}
            className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold/50"
            placeholder="Post title"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={16}
            defaultValue={post.content}
            className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold/50"
            placeholder="Write your post content..."
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="category"
              className="mb-1.5 block text-sm font-medium text-text-secondary"
            >
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              defaultValue={post.category ?? ""}
              className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold/50"
              placeholder="e.g. Engineering"
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="mb-1.5 block text-sm font-medium text-text-secondary"
            >
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              defaultValue={post.tags?.join(", ") ?? ""}
              className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold/50"
              placeholder="react, nextjs, typescript"
            />
            <p className="mt-1 text-xs text-text-muted">Comma-separated</p>
          </div>
        </div>

        <div>
          <label
            htmlFor="excerpt"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            defaultValue={post.excerpt ?? ""}
            className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold/50"
            placeholder="Brief summary (auto-generated from content if left empty)"
          />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-gold px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-gold-light disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href="/admin/blog"
            className="text-sm text-text-muted transition-colors hover:text-text-secondary"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
