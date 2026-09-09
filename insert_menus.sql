DELETE FROM menus;
DELETE FROM sqlite_sequence WHERE name='menus';

INSERT INTO menus (id, name, path, parent_id, sort_order, is_active) VALUES
(1, '나음 소개', '/about/philosophy', NULL, 1, 1),
(2, '원장님 인사말', '/about/philosophy', 1, 1, 1),
(3, '의료진 소개', '/about/doctor', 1, 2, 1),
(4, '병원 둘러보기', '/about/facility', 1, 3, 1),
(5, '오시는 길', '/about/location', 1, 4, 1),

(6, '비수술 통증 클리닉', '/pain/spine', NULL, 2, 1),
(7, '목·허리 척추 클리닉', '/pain/spine', 6, 1, 1),
(8, '어깨·관절 클리닉', '/pain/joint', 6, 2, 1),
(9, '초음파 유도하 주사치료', '/pain/ultrasound', 6, 3, 1),

(10, '맞춤 재활 / 도수치료', '/rehab/manual', NULL, 3, 1),
(11, '통증 교정 도수치료', '/rehab/manual', 10, 1, 1),
(12, '수술 후 재활치료', '/rehab/post-op', 10, 2, 1),

(13, '나음 특화 클리닉', '/special/sports', NULL, 4, 1),
(14, '스포츠 손상 클리닉', '/special/sports', 13, 1, 1),
(15, '난치성 신경통 클리닉', '/special/chronic', 13, 2, 1),
(16, '맞춤 수액·면역 클리닉', '/special/iv', 13, 3, 1),

(17, '나음 커뮤니티', '/community/notice', NULL, 5, 1),
(18, '공지사항', '/community/notice', 17, 1, 1),
(19, '비급여 고지', '/community/non-covered', 17, 2, 1);
