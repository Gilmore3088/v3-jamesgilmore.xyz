export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  excerpt: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string | null;
  category: string | null;
  technologies: string[];
  github_url: string | null;
  project_url: string | null;
  image_url: string | null;
  thumbnail_url: string | null;
  display_order: number;
  is_friend_project: boolean;
  featured: boolean;
  status: "draft" | "in_progress" | "completed" | "archived";
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}
