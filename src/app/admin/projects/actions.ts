"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

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
    return { error: error.message };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");

  return { success: true };
}
