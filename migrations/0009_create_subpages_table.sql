CREATE TABLE IF NOT EXISTS subpages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL, -- e.g., 'welcome', 'history', 'location' (or full path '/about/welcome')
  menu_id INTEGER, -- Foreign key to menus table
  title TEXT NOT NULL,
  subtitle TEXT,
  banner_image TEXT,
  content TEXT, -- HTML content from WYSIWYG
  is_published INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
