CREATE TABLE IF NOT EXISTS menus (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  path TEXT,
  parent_id INTEGER,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 초기 메뉴 데이터 세팅
INSERT INTO menus (id, name, path, parent_id, sort_order) VALUES (1, '교회소개', '/about', NULL, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order) VALUES (2, '말씀과찬양', '/worship', NULL, 2);
INSERT INTO menus (id, name, path, parent_id, sort_order) VALUES (3, '교회학교', '/school', NULL, 3);
INSERT INTO menus (id, name, path, parent_id, sort_order) VALUES (4, '선교와나눔', '/mission', NULL, 4);

-- 2차 메뉴 데이터 세팅 (교회소개 하위)
INSERT INTO menus (name, path, parent_id, sort_order) VALUES ('환영사', '/about/welcome', 1, 1);
INSERT INTO menus (name, path, parent_id, sort_order) VALUES ('교회연혁', '/about/history', 1, 2);
INSERT INTO menus (name, path, parent_id, sort_order) VALUES ('섬기는사람들', '/about/people', 1, 3);
INSERT INTO menus (name, path, parent_id, sort_order) VALUES ('오시는길', '/about/location', 1, 4);
