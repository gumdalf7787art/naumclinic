-- Initial schema for Peace Church CMS

CREATE TABLE IF NOT EXISTS pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  file_name TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert some dummy data for existing pages to allow editing them right away
INSERT INTO pages (slug, title, content) VALUES
('about', '교회소개', '{"sections": []}'),
('vision', '비전과 목표', '{"sections": []}'),
('worship', '예배와 찬양', '{"sections": []}')
ON CONFLICT(slug) DO NOTHING;
