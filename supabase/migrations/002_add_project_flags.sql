-- Add flags to distinguish featured and friend projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_friend_project boolean DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;

-- Update existing seed data
UPDATE projects SET featured = true WHERE title IN ('GutenBites.com', 'JamesGilmore.xyz');
UPDATE projects SET is_friend_project = true WHERE title IN ('FormulaBot.com', 'MRAP Investments');
