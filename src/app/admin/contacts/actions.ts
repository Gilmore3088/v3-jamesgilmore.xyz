"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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

export async function markAsRead(formData: FormData) {
  const supabase = await requireAdmin();
  const id = formData.get("id") as string;
  if (!id) return;

  await supabase
    .from("contacts")
    .update({ read: true })
    .eq("id", id);

  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

export async function deleteContact(formData: FormData) {
  const supabase = await requireAdmin();
  const id = formData.get("id") as string;
  if (!id) return;

  await supabase.from("contacts").delete().eq("id", id);

  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

export async function deleteAllRead() {
  const supabase = await requireAdmin();

  await supabase
    .from("contacts")
    .delete()
    .eq("read", true);

  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}
