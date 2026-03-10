"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function NewProjectPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const title = (formData.get("title") as string).trim();
    const description = (formData.get("description") as string).trim();
    const category = (formData.get("category") as string).trim();
    const technologiesRaw = (formData.get("technologies") as string).trim();
    const githubUrl = (formData.get("github_url") as string).trim();
    const projectUrl = (formData.get("project_url") as string).trim();
    const displayOrder = parseInt(
      (formData.get("display_order") as string) || "0",
      10
    );

    const technologies = technologiesRaw
      ? technologiesRaw.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    if (!title) {
      setError("Title is required.");
      setSaving(false);
      return;
    }

    const supabase = createClient();
    const { error: insertError } = await supabase.from("projects").insert({
      title,
      description: description || null,
      category: category || null,
      technologies,
      github_url: githubUrl || null,
      project_url: projectUrl || null,
      display_order: isNaN(displayOrder) ? 0 : displayOrder,
    });

    if (insertError) {
      setError(insertError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/projects"
          className="text-sm text-text-muted transition-colors hover:text-gold"
        >
          Projects
        </Link>
        <span className="text-text-muted">/</span>
        <h1 className="text-2xl font-bold text-text-primary">New Project</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg border border-border bg-surface p-6"
      >
        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-medium text-text-secondary"
          >
            Title <span className="text-red-400">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full rounded-md border border-border bg-surface-light px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold"
            placeholder="Project name"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-text-secondary"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full rounded-md border border-border bg-surface-light px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold"
            placeholder="Brief description of the project"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-medium text-text-secondary"
            >
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              className="w-full rounded-md border border-border bg-surface-light px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold"
              placeholder="e.g. Web App, CLI Tool"
            />
          </div>

          <div>
            <label
              htmlFor="technologies"
              className="mb-1 block text-sm font-medium text-text-secondary"
            >
              Technologies
            </label>
            <input
              id="technologies"
              name="technologies"
              type="text"
              className="w-full rounded-md border border-border bg-surface-light px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold"
              placeholder="React, TypeScript, Node.js"
            />
            <p className="mt-1 text-xs text-text-muted">Comma-separated</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="github_url"
              className="mb-1 block text-sm font-medium text-text-secondary"
            >
              GitHub URL
            </label>
            <input
              id="github_url"
              name="github_url"
              type="url"
              className="w-full rounded-md border border-border bg-surface-light px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold"
              placeholder="https://github.com/..."
            />
          </div>

          <div>
            <label
              htmlFor="project_url"
              className="mb-1 block text-sm font-medium text-text-secondary"
            >
              Project URL
            </label>
            <input
              id="project_url"
              name="project_url"
              type="url"
              className="w-full rounded-md border border-border bg-surface-light px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div className="max-w-[200px]">
          <label
            htmlFor="display_order"
            className="mb-1 block text-sm font-medium text-text-secondary"
          >
            Display Order
          </label>
          <input
            id="display_order"
            name="display_order"
            type="number"
            defaultValue={0}
            className="w-full rounded-md border border-border bg-surface-light px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold"
          />
          <p className="mt-1 text-xs text-text-muted">
            Lower numbers appear first
          </p>
        </div>

        <div className="flex items-center gap-3 border-t border-border pt-6">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-gold px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-gold-light disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create Project"}
          </button>
          <Link
            href="/admin/projects"
            className="rounded-md border border-border px-5 py-2 text-sm text-text-secondary transition-colors hover:border-gold/50 hover:text-gold"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
