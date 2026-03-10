"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function requireAuth() {
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
  const supabase = await requireAuth();
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Missing contact ID");
  }

  const { error } = await supabase
    .from("contacts")
    .update({ read: true })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to mark contact as read: ${error.message}`);
  }

  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

export async function deleteContact(formData: FormData) {
  const supabase = await requireAuth();
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Missing contact ID");
  }

  const { error } = await supabase.from("contacts").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete contact: ${error.message}`);
  }

  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

export async function deleteAllRead() {
  const supabase = await requireAuth();

  const { error } = await supabase
    .from("contacts")
    .delete()
    .eq("read", true);

  if (error) {
    throw new Error(`Failed to delete read contacts: ${error.message}`);
  }

  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}
