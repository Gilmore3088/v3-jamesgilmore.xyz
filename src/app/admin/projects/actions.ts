"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod/v4";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(2000).optional(),
  category: z.string().max(100).optional(),
  technologies: z.string().max(500).optional(),
  github_url: z.string().max(500).optional(),
  project_url: z.string().max(500).optional(),
  display_order: z.coerce.number().int().min(0).max(999).default(0),
  is_friend_project: z.coerce.boolean().default(false),
  featured: z.coerce.boolean().default(false),
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
    category: (formData.get("category") as string)?.trim() || undefined,
    technologies: (formData.get("technologies") as string)?.trim() || undefined,
    github_url: (formData.get("github_url") as string)?.trim() || undefined,
    project_url: (formData.get("project_url") as string)?.trim() || undefined,
    display_order: formData.get("display_order") as string,
    is_friend_project: formData.get("is_friend_project") as string,
    featured: formData.get("featured") as string,
  };

  const result = projectSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { title, description, category, technologies: techRaw, github_url, project_url, display_order, is_friend_project, featured } = result.data;

  const technologies = techRaw
    ? techRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const { error } = await supabase.from("projects").insert({
    title,
    description: description || null,
    category: category || null,
    technologies,
    github_url: github_url || null,
    project_url: project_url || null,
    display_order,
    is_friend_project,
    featured,
  });

  if (error) {
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
    category: (formData.get("category") as string)?.trim() || undefined,
    technologies: (formData.get("technologies") as string)?.trim() || undefined,
    github_url: (formData.get("github_url") as string)?.trim() || undefined,
    project_url: (formData.get("project_url") as string)?.trim() || undefined,
    display_order: formData.get("display_order") as string,
    is_friend_project: formData.get("is_friend_project") as string,
    featured: formData.get("featured") as string,
  };

  const result = projectSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { title, description, category, technologies: techRaw, github_url, project_url, display_order, is_friend_project, featured } = result.data;

  const technologies = techRaw
    ? techRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const { error } = await supabase
    .from("projects")
    .update({
      title,
      description: description || null,
      category: category || null,
      technologies,
      github_url: github_url || null,
      project_url: project_url || null,
      display_order,
      is_friend_project,
      featured,
    })
    .eq("id", projectId);

  if (error) {
    return { error: "Failed to update project. Please try again." };
  }

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
