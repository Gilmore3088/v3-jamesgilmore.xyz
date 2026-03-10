"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewBlogPost() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
    const { error: insertError } = await supabase.from("blogs").insert({
      title,
      slug,
      content,
      category,
      tags,
      excerpt,
    });

    if (insertError) {
      if (insertError.message.includes("duplicate")) {
        setError("A post with this slug already exists. Choose a different title.");
      } else {
        setError(`Failed to create post: ${insertError.message}`);
      }
      setSaving(false);
      return;
    }

    router.push("/admin/blog");
    router.refresh();
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
        <h1 className="text-2xl font-bold text-text-primary">New Blog Post</h1>
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
            {saving ? "Creating..." : "Create Post"}
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
