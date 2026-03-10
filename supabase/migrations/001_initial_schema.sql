-- Create blogs table
CREATE TABLE blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  category text,
  tags text[],
  excerpt text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text,
  technologies text[],
  github_url text,
  project_url text,
  image_url text,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create contacts table
CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Blogs policies
CREATE POLICY "blogs_select_public"
  ON blogs FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "blogs_insert_authenticated"
  ON blogs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "blogs_update_authenticated"
  ON blogs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "blogs_delete_authenticated"
  ON blogs FOR DELETE
  TO authenticated
  USING (true);

-- Projects policies
CREATE POLICY "projects_select_public"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "projects_insert_authenticated"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "projects_update_authenticated"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "projects_delete_authenticated"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Contacts policies
CREATE POLICY "contacts_insert_public"
  ON contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "contacts_select_authenticated"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "contacts_update_authenticated"
  ON contacts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "contacts_delete_authenticated"
  ON contacts FOR DELETE
  TO authenticated
  USING (true);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to blogs
CREATE TRIGGER set_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
