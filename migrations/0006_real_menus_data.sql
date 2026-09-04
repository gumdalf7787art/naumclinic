DROP TABLE IF EXISTS menus;

CREATE TABLE menus (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  path TEXT,
  parent_id INTEGER,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 1. 교회소개 (id: 1)
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (1, '교회소개', '/about', NULL, 1, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (2, '교회비전과 목표', '/about/vision', 1, 1, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (3, '담임목사 소개', '/about/pastor', 1, 2, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (4, '섬기는 분', '/about/staff', 1, 3, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (5, '예배안내', '/about/worship', 1, 4, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (6, '교회주보', '/about/bulletin', 1, 5, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (7, '온라인헌금', '/about/offering', 1, 6, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (8, '시설안내', '/about/facility', 1, 7, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (9, '찾아오시는 길', '/about/location', 1, 8, 1);

-- 2. 예배와찬양 (id: 10)
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (10, '예배와찬양', '/worship', NULL, 2, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (11, '예배와말씀', '/worship/word', 10, 1, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (12, '찬양단', '/worship/choir', 10, 2, 1);

-- 3. 교육과선교 (id: 13)
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (13, '교육과선교', '/education', NULL, 3, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (14, '유초등부', '/education/kids', 13, 1, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (15, '중고등부', '/education/youth', 13, 2, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (16, '청년부', '/education/young-adult', 13, 3, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (17, '여선교회', '/education/womens', 13, 4, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (18, '남선교회', '/education/mens', 13, 5, 1);

-- 4. 나눔과교제 (id: 19)
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (19, '나눔과교제', '/fellowship', NULL, 4, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (20, '은혜의글', '/fellowship/grace', 19, 1, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (21, '갤러리', '/fellowship/gallery', 19, 2, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (22, '교우사업장소개', '/fellowship/business', 19, 3, 1);
