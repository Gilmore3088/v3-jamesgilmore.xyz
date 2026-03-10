"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  technologies: string[] | null;
  github_url: string | null;
  project_url: string | null;
  display_order: number;
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (fetchError) {
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      setProject(data);
      setLoading(false);
    }

    fetchProject();
  }, [projectId]);

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
    const { error: updateError } = await supabase
      .from("projects")
      .update({
        title,
        description: description || null,
        category: category || null,
        technologies,
        github_url: githubUrl || null,
        project_url: projectUrl || null,
        display_order: isNaN(displayOrder) ? 0 : displayOrder,
      })
      .eq("id", projectId);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/projects");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-text-muted">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
        {error ?? "Project not found."}
      </div>
    );
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
        <h1 className="text-2xl font-bold text-text-primary">Edit Project</h1>
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
            defaultValue={project.title}
            className="w-full rounded-md border border-border bg-surface-light px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold"
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
            defaultValue={project.description ?? ""}
            className="w-full rounded-md border border-border bg-surface-light px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold"
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
              defaultValue={project.category ?? ""}
              className="w-full rounded-md border border-border bg-surface-light px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold"
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
              defaultValue={(project.technologies ?? []).join(", ")}
              className="w-full rounded-md border border-border bg-surface-light px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold"
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
              defaultValue={project.github_url ?? ""}
              className="w-full rounded-md border border-border bg-surface-light px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold"
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
              defaultValue={project.project_url ?? ""}
              className="w-full rounded-md border border-border bg-surface-light px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold"
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
            defaultValue={project.display_order ?? 0}
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
            {saving ? "Saving..." : "Save Changes"}
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
