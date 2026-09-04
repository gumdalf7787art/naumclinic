CREATE TABLE IF NOT EXISTS estimates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  region TEXT,
  website TEXT,
  phone TEXT,
  email TEXT NOT NULL,
  user_type TEXT,
  platform_type TEXT,
  features TEXT,
  description TEXT,
  attachment_urls TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'pending'
);
