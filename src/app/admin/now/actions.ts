"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod/v4";
import { createClient } from "@/lib/supabase/server";

const ACCENTS = ["coral", "teal", "mustard", "lilac", "mint"] as const;

const itemSchema = z.object({
  id: z.string().uuid().optional(),
  label: z.string().min(1, "Label is required").max(60),
  text: z.string().min(1, "Text is required").max(240),
  accent: z.enum(ACCENTS),
  display_order: z.coerce.number().int().min(0).max(99),
});

export async function saveNowItems(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const count = Number(formData.get("count") ?? 0);
  const rows = [];
  for (let i = 0; i < count; i++) {
    const raw = {
      id: (formData.get(`id_${i}`) as string) || undefined,
      label: ((formData.get(`label_${i}`) as string) ?? "").trim(),
      text: ((formData.get(`text_${i}`) as string) ?? "").trim(),
      accent: (formData.get(`accent_${i}`) as string) || "mustard",
      display_order: i,
    };
    if (!raw.label && !raw.text) continue;
    const result = itemSchema.safeParse(raw);
    if (!result.success) {
      return { error: `Box ${i + 1}: ${result.error.issues[0].message}` };
    }
    rows.push(result.data);
  }

  const { error } = await supabase.from("now_items").upsert(rows, { onConflict: "id" });
  if (error) {
    return { error: "Could not save. Has migration 005_now_items.sql been applied?" };
  }

  revalidatePath("/");
  revalidatePath("/admin/now");
  return { success: true };
}
