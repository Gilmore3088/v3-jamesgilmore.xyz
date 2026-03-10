-- Tighten RLS policies: restrict write operations to the admin user only
-- This replaces the overly permissive "authenticated WITH CHECK (true)" policies

-- Get the admin user's email for the policy check
-- The admin email is checked via auth.jwt() ->> 'email'

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "blogs_insert_authenticated" ON blogs;
DROP POLICY IF EXISTS "blogs_update_authenticated" ON blogs;
DROP POLICY IF EXISTS "blogs_delete_authenticated" ON blogs;

DROP POLICY IF EXISTS "projects_insert_authenticated" ON projects;
DROP POLICY IF EXISTS "projects_update_authenticated" ON projects;
DROP POLICY IF EXISTS "projects_delete_authenticated" ON projects;

DROP POLICY IF EXISTS "contacts_update_authenticated" ON contacts;
DROP POLICY IF EXISTS "contacts_delete_authenticated" ON contacts;

-- Recreate with admin-only check (using email from JWT)
CREATE POLICY "blogs_insert_admin"
  ON blogs FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() ->> 'email') = 'JLGilmore2@gmail.com');

CREATE POLICY "blogs_update_admin"
  ON blogs FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'JLGilmore2@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'JLGilmore2@gmail.com');

CREATE POLICY "blogs_delete_admin"
  ON blogs FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'JLGilmore2@gmail.com');

CREATE POLICY "projects_insert_admin"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() ->> 'email') = 'JLGilmore2@gmail.com');

CREATE POLICY "projects_update_admin"
  ON projects FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'JLGilmore2@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'JLGilmore2@gmail.com');

CREATE POLICY "projects_delete_admin"
  ON projects FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'JLGilmore2@gmail.com');

CREATE POLICY "contacts_update_admin"
  ON contacts FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'JLGilmore2@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'JLGilmore2@gmail.com');

CREATE POLICY "contacts_delete_admin"
  ON contacts FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'JLGilmore2@gmail.com');

-- Keep existing public policies unchanged:
-- blogs_select_public: anon + authenticated can SELECT
-- projects_select_public: anon + authenticated can SELECT
-- contacts_insert_public: anon + authenticated can INSERT
-- contacts_select_authenticated: authenticated can SELECT
