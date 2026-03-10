"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod/v4";
import { generateSlug } from "@/lib/utils";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required").max(100000),
  category: z.string().max(100).optional(),
  tags: z.string().max(500).optional(),
  excerpt: z.string().max(500).optional(),
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

export async function createBlogPost(formData: FormData) {
  const supabase = await requireAdmin();

  const raw = {
    title: (formData.get("title") as string)?.trim() ?? "",
    content: (formData.get("content") as string)?.trim() ?? "",
    category: (formData.get("category") as string)?.trim() || undefined,
    tags: (formData.get("tags") as string)?.trim() || undefined,
    excerpt: (formData.get("excerpt") as string)?.trim() || undefined,
  };

  const result = blogSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { title, content, category, tags: tagsRaw, excerpt: excerptRaw } = result.data;

  const slug = generateSlug(title);
  if (!slug) {
    return { error: "Title must contain at least one alphanumeric character." };
  }

  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];
  const excerpt = excerptRaw || content.slice(0, 200);

  const { error } = await supabase.from("blogs").insert({
    title,
    slug,
    content,
    category: category || null,
    tags,
    excerpt,
  });

  if (error) {
    if (error.message.includes("duplicate")) {
      return { error: "A post with this slug already exists. Choose a different title." };
    }
    return { error: "Failed to create post. Please try again." };
  }

  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(postId: string, formData: FormData) {
  const supabase = await requireAdmin();

  const raw = {
    title: (formData.get("title") as string)?.trim() ?? "",
    content: (formData.get("content") as string)?.trim() ?? "",
    category: (formData.get("category") as string)?.trim() || undefined,
    tags: (formData.get("tags") as string)?.trim() || undefined,
    excerpt: (formData.get("excerpt") as string)?.trim() || undefined,
  };

  const result = blogSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { title, content, category, tags: tagsRaw, excerpt: excerptRaw } = result.data;

  const slug = generateSlug(title);
  if (!slug) {
    return { error: "Title must contain at least one alphanumeric character." };
  }

  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];
  const excerpt = excerptRaw || content.slice(0, 200);

  const { error } = await supabase
    .from("blogs")
    .update({
      title,
      slug,
      content,
      category: category || null,
      tags,
      excerpt,
    })
    .eq("id", postId);

  if (error) {
    if (error.message.includes("duplicate")) {
      return { error: "A post with this slug already exists. Choose a different title." };
    }
    return { error: "Failed to update post. Please try again." };
  }

  revalidatePath(`/blog/${slug}`);
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(formData: FormData) {
  const supabase = await requireAdmin();

  const slug = formData.get("slug") as string;
  if (!slug) return;

  await supabase.from("blogs").delete().eq("slug", slug);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}
