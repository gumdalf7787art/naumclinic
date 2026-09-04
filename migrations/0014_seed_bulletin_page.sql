INSERT INTO subpages (slug, menu_id, title, subtitle, content, is_published)
VALUES ('about/bulletin', 6, '교회 주보', '주간 소식', '[]', 1)
ON CONFLICT(slug) DO UPDATE SET content = '[]';
