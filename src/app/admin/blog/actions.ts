"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function deleteBlogPost(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const slug = formData.get("slug") as string;

  if (!slug) {
    throw new Error("Missing slug parameter");
  }

  const { error } = await supabase.from("blogs").delete().eq("slug", slug);

  if (error) {
    throw new Error(`Failed to delete blog post: ${error.message}`);
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
