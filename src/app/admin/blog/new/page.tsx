"use client";

import { useState } from "react";
import Link from "next/link";
import { createBlogPost } from "../actions";

export default function NewBlogPost() {
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const formData = new FormData(e.currentTarget);

    const result = await createBlogPost(formData);
    if (result?.error) {
      setError(result.error);
      setSaving(false);
    }
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
