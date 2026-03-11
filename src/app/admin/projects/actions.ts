"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod/v4";
import { generateSlug } from "@/lib/utils";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(2000).optional(),
  content: z.string().max(100000).optional(),
  category: z.string().max(100).optional(),
  technologies: z.string().max(500).optional(),
  github_url: z.string().max(500).optional(),
  project_url: z.string().max(500).optional(),
  thumbnail_url: z.string().max(500).optional(),
  display_order: z.coerce.number().int().min(0).max(999).default(0),
  is_friend_project: z.coerce.boolean().default(false),
  featured: z.coerce.boolean().default(false),
  status: z.enum(["draft", "in_progress", "completed", "archived"]).default("completed"),
});

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return supabase;
}

export async function createProject(formData: FormData) {
  const supabase = await requireAdmin();

  const raw = {
    title: (formData.get("title") as string)?.trim() ?? "",
    description: (formData.get("description") as string)?.trim() || undefined,
    content: (formData.get("content") as string)?.trim() || undefined,
    category: (formData.get("category") as string)?.trim() || undefined,
    technologies: (formData.get("technologies") as string)?.trim() || undefined,
    github_url: (formData.get("github_url") as string)?.trim() || undefined,
    project_url: (formData.get("project_url") as string)?.trim() || undefined,
    thumbnail_url: (formData.get("thumbnail_url") as string)?.trim() || undefined,
    display_order: formData.get("display_order") as string,
    is_friend_project: formData.get("is_friend_project") as string,
    featured: formData.get("featured") as string,
    status: (formData.get("status") as string) || "completed",
  };

  const result = projectSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { title, description, content, category, technologies: techRaw, github_url, project_url, thumbnail_url, display_order, is_friend_project, featured, status } = result.data;

  const slug = generateSlug(title);
  if (!slug) {
    return { error: "Title must contain at least one alphanumeric character." };
  }

  const technologies = techRaw
    ? techRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const { error } = await supabase.from("projects").insert({
    title,
    slug,
    description: description || null,
    content: content || null,
    category: category || null,
    technologies,
    github_url: github_url || null,
    project_url: project_url || null,
    thumbnail_url: thumbnail_url || null,
    display_order,
    is_friend_project,
    featured,
    status,
  });

  if (error) {
    if (error.message.includes("duplicate")) {
      return { error: "A project with this slug already exists. Choose a different title." };
    }
    return { error: "Failed to create project. Please try again." };
  }

  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(projectId: string, formData: FormData) {
  const supabase = await requireAdmin();

  const raw = {
    title: (formData.get("title") as string)?.trim() ?? "",
    description: (formData.get("description") as string)?.trim() || undefined,
    content: (formData.get("content") as string)?.trim() || undefined,
    category: (formData.get("category") as string)?.trim() || undefined,
    technologies: (formData.get("technologies") as string)?.trim() || undefined,
    github_url: (formData.get("github_url") as string)?.trim() || undefined,
    project_url: (formData.get("project_url") as string)?.trim() || undefined,
    thumbnail_url: (formData.get("thumbnail_url") as string)?.trim() || undefined,
    display_order: formData.get("display_order") as string,
    is_friend_project: formData.get("is_friend_project") as string,
    featured: formData.get("featured") as string,
    status: (formData.get("status") as string) || "completed",
  };

  const result = projectSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { title, description, content, category, technologies: techRaw, github_url, project_url, thumbnail_url, display_order, is_friend_project, featured, status } = result.data;

  const slug = generateSlug(title);
  if (!slug) {
    return { error: "Title must contain at least one alphanumeric character." };
  }

  const technologies = techRaw
    ? techRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const { error } = await supabase
    .from("projects")
    .update({
      title,
      slug,
      description: description || null,
      content: content || null,
      category: category || null,
      technologies,
      github_url: github_url || null,
      project_url: project_url || null,
      thumbnail_url: thumbnail_url || null,
      display_order,
      is_friend_project,
      featured,
      status,
    })
    .eq("id", projectId);

  if (error) {
    if (error.message.includes("duplicate")) {
      return { error: "A project with this slug already exists. Choose a different title." };
    }
    return { error: "Failed to update project. Please try again." };
  }

  revalidatePath(`/projects/${slug}`);
  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    return { error: "Failed to delete project. Please try again." };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");

  return { success: true };
}
