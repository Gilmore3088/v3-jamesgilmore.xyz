-- "Currently" boxes on the home page, editable from the admin panel.
CREATE TABLE IF NOT EXISTS now_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  text TEXT NOT NULL,
  accent TEXT NOT NULL DEFAULT 'mustard'
    CHECK (accent IN ('coral', 'teal', 'mustard', 'lilac', 'mint')),
  display_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE now_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "now_items_select_public"
  ON now_items FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "now_items_insert_admin"
  ON now_items FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() ->> 'email') = 'JLGilmore2@gmail.com');

CREATE POLICY "now_items_update_admin"
  ON now_items FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'JLGilmore2@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'JLGilmore2@gmail.com');

CREATE POLICY "now_items_delete_admin"
  ON now_items FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'JLGilmore2@gmail.com');

CREATE TRIGGER update_now_items_updated_at
  BEFORE UPDATE ON now_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

INSERT INTO now_items (label, text, accent, display_order) VALUES
  ('Training for', 'The next long one. Distance first, speed never.', 'coral', 0),
  ('Building', 'Notebooks that turn a 20-hour reporting cycle into a coffee break.', 'mint', 1),
  ('Reading', 'Something about how incentives quietly run the world.', 'lilac', 2),
  ('Plotting', 'The next trip. The spreadsheet already has nine tabs.', 'mustard', 3);
