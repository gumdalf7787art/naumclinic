-- 7. CMS 설정 테이블 (CMS Settings)
CREATE TABLE IF NOT EXISTS cms_settings (
  id TEXT PRIMARY KEY,
  value TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
