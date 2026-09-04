-- 0011_fix_slugs_and_vision_content.sql
-- 모든 서브페이지의 slug를 프론트엔드 라우팅과 일치하도록 전체 경로로 업데이트합니다.

-- 교회소개 하위 페이지
UPDATE subpages SET slug = 'about/vision' WHERE slug = 'vision' AND menu_id = 2;
UPDATE subpages SET slug = 'about/pastor' WHERE slug = 'pastor' AND menu_id = 3;
UPDATE subpages SET slug = 'about/staff' WHERE slug = 'staff' AND menu_id = 4;
UPDATE subpages SET slug = 'about/worship' WHERE slug = 'worship' AND menu_id = 5;
UPDATE subpages SET slug = 'about/facility' WHERE slug = 'facility' AND menu_id = 6;

-- 교육과선교 하위 페이지
UPDATE subpages SET slug = 'education/kids' WHERE slug = 'kids' AND menu_id = 14;
UPDATE subpages SET slug = 'education/youth' WHERE slug = 'youth' AND menu_id = 15;
UPDATE subpages SET slug = 'education/young-adult' WHERE slug = 'young-adult' AND menu_id = 16;
UPDATE subpages SET slug = 'education/womens' WHERE slug = 'womens' AND menu_id = 17;
UPDATE subpages SET slug = 'education/mens' WHERE slug = 'mens' AND menu_id = 18;

-- worship-info가 혹시 있다면 통합
UPDATE subpages SET slug = 'about/worship' WHERE slug = 'worship-info' AND menu_id = 5;
