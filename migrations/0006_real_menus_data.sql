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

-- 1. 나음 소개 (id: 1)
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (1, '나음 소개', '/about', NULL, 1, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (2, '인사말 및 진료철학', '/about/philosophy', 1, 1, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (3, '의료진 소개', '/about/doctor', 1, 2, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (4, '병원 둘러보기', '/about/facility', 1, 3, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (5, '오시는 길', '/about/location', 1, 4, 1);

-- 2. 비수술 통증 클리닉 (id: 10)
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (10, '비수술 통증 클리닉', '/pain', NULL, 2, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (11, '목·허리 척추 클리닉', '/pain/spine', 10, 1, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (12, '어깨·관절 클리닉', '/pain/joint', 10, 2, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (13, '초음파 유도하 주사치료', '/pain/ultrasound', 10, 3, 1);

-- 3. 맞춤 재활 / 도수치료 (id: 14)
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (14, '맞춤 재활 / 도수치료', '/rehab', NULL, 3, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (15, '체형 교정 도수치료', '/rehab/manual', 14, 1, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (16, '수술 후 재활치료', '/rehab/post-op', 14, 2, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (17, '특수 물리치료', '/rehab/shockwave', 14, 3, 1);

-- 4. 특수 클리닉 (id: 18)
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (18, '특수 클리닉', '/special', NULL, 4, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (19, '최신 하이엔드 장비 치료', '/special/equipment', 18, 1, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (20, '난치성 만성통증 클리닉', '/special/chronic', 18, 2, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (21, '프리미엄 수액/영양 클리닉', '/special/iv', 18, 3, 1);

-- 5. 커뮤니티 (id: 22)
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (22, '나음 커뮤니티', '/community', NULL, 5, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (23, '공지사항', '/community/notice', 22, 1, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (24, '치료 사례 / 후기', '/community/reviews', 22, 2, 1);
INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES (25, '자주 묻는 질문', '/community/faq', 22, 3, 1);
