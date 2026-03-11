import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Project } from "@/types";

function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function getFeaturedProjects() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .eq("is_friend_project", false)
    .neq("status", "draft")
    .order("display_order", { ascending: true });
  return data ?? [];
}

export async function getMyProjects() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("is_friend_project", false)
    .neq("status", "draft")
    .order("display_order", { ascending: true });
  return data ?? [];
}

export async function getFriendsProjects() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("is_friend_project", true)
    .neq("status", "draft")
    .order("display_order", { ascending: true });
  return data ?? [];
}

export async function getProjectBySlug(slug: string) {
  const supabase = createStaticClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .neq("status", "draft")
    .single();
  return data as Project | null;
}

export async function getAllProjectSlugs() {
  const supabase = createStaticClient();
  const { data } = await supabase
    .from("projects")
    .select("slug")
    .eq("is_friend_project", false)
    .neq("status", "draft");
  return data ?? [];
}

export async function getLatestPosts(limit = 3) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, category, tags, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getAllPosts() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, category, tags, created_at")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getPostBySlug(slug: string) {
  const supabase = createStaticClient();
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getAllSlugs() {
  const supabase = createStaticClient();
  const { data } = await supabase.from("blogs").select("slug");
  return data ?? [];
}
