INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('about/vision', 2, '교회비전과 목표', '우리가 세워가는 교회', '', '
      <div style="text-align: center; margin-bottom: 40px;">
        <span style="color: #8DC63F; font-weight: bold; font-size: 14px; display: block; margin-bottom: 16px;">OUR VISION</span>
        <h2 style="font-size: 36px; font-weight: 800; color: #111; margin-bottom: 40px;">우리의 비전</h2>
        <div style="background-color: #f8f9fa; border-left: 6px solid #cc0000; padding: 40px; border-radius: 0 24px 24px 0; text-align: center;">
          <h3 style="font-size: 28px; font-weight: bold; color: #111; margin-bottom: 24px;">"예수 그리스도의 사랑으로 사람을 세우고, 세상을 섬기는 교회"</h3>
          <p style="font-size: 16px; color: #555; line-height: 1.8; margin-bottom: 16px;">평화교회는 예수 그리스도를 삶의 유일한 길로 고백하며, 말씀과 기도 위에 굳게 서서 하나님의 사랑을 세상 가운데 나누는 교회를 꿈꿉니다.</p>
          <p style="font-size: 16px; color: #555; line-height: 1.8; margin-bottom: 16px;">교회 안에서만 머무르는 신앙이 아니라 가정과 일터, 이웃과 지역사회 속에서 그리스도의 사랑을 실천하며, 상처받은 이들을 품고 소외된 이들과 함께하는 것이 우리의 사명입니다.</p>
          <p style="font-size: 16px; color: #111; font-weight: bold; margin-top: 32px;">평화교회는 모든 세대가 믿음 안에서 함께 성장하고 세상 속에서 복음의 빛을 밝히는 건강하고 따뜻한 신앙공동체를 세워가겠습니다.</p>
        </div>
      </div>
      <h3 style="font-size: 28px; font-weight: bold; text-align: center; margin-top: 60px; margin-bottom: 30px;">우리가 세워가는 교회</h3>
      <ul style="list-style-type: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <li style="background: #fff; padding: 24px; border: 1px solid #eee; border-radius: 12px;"><h4 style="font-size: 20px; color: #cc0000; margin-bottom: 10px;">01. 말씀 위에 바로 서는 교회</h4><p>하나님의 말씀을 신앙과 삶의 중심에 두고 실천하는 성도를 세워갑니다.</p></li>
        <li style="background: #fff; padding: 24px; border: 1px solid #eee; border-radius: 12px;"><h4 style="font-size: 20px; color: #cc0000; margin-bottom: 10px;">02. 기도하는 교회</h4><p>하나님의 뜻을 구하며 이웃과 세상을 위해 기도하는 공동체가 됩니다.</p></li>
        <li style="background: #fff; padding: 24px; border: 1px solid #eee; border-radius: 12px;"><h4 style="font-size: 20px; color: #cc0000; margin-bottom: 10px;">03. 다음 세대를 세우는 교회</h4><p>어린이와 청소년들이 사명을 발견하고 성장하도록 돕습니다.</p></li>
        <li style="background: #fff; padding: 24px; border: 1px solid #eee; border-radius: 12px;"><h4 style="font-size: 20px; color: #cc0000; margin-bottom: 10px;">04. 이웃을 사랑하고 섬기는 교회</h4><p>소외된 이들에게 다가가 예수님의 사랑을 행동으로 전합니다.</p></li>
      </ul>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('about/pastor', 3, '담임목사 인사말', '그리스도의 평화가 머무는 교회', '', '[{"id":"blk_pastor_hero","type":"PastorGreeting","data":{"image":"/pastor-profile.jpg","name":"장성진","title":"담임목사","history":["감리교신학교 신학과 졸업<br>감리교신학교 대학원 졸업<br>평화감리교회 담임 (2016-현재)"],"greetingPart1":"평화교회 홈페이지를 찾아주신 여러분을 주님의 이름으로 환영합니다.<br><br>평화교회를 섬기고 있는 담임목사 장성진입니다.<br>교회는 단순히 사람들이 모여 예배드리는 장소가 아니라, 하나님의 사랑을 배우고 그 사랑을 삶으로 살아내는 공동체라고 믿습니다.","quoteText":"복음은 말에만 머무는 것이 아니라 한 사람의 삶 곁으로 다가가 함께 울고, 함께 기뻐하며, 함께 걸어가는 사랑이어야 한다는 것입니다.","greetingPart2":"우리 교회가 예배의 기쁨이 살아 있는 교회, 말씀을 통해 삶의 방향을 발견하는 교회, 다음 세대가 믿음 안에서 꿈을 키우는 교회가 되기를 소망합니다.<br><br>누구든 편안한 마음으로 찾아오십시오. 함께 예배하고, 함께 말씀을 배우며, 서로의 삶을 나누면서 믿음의 길을 함께 걸어가고 싶습니다."}}]', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('about/staff', 4, '섬기는 사람들', '교회를 위해 헌신하는 동역자들', '', '[{"id":"blk_staff_1","type":"StaffGrid","data":{"title":"목회자","staff":[{"role":"부목사","name":"김목사","department":"교구/행정","image":""},{"role":"전도사","name":"이전도사","department":"청년부/찬양","image":""},{"role":"전도사","name":"박전도사","department":"중고등부","image":""},{"role":"전도사","name":"최전도사","department":"아동부","image":""}]}},{"id":"blk_staff_2","type":"StaffGrid","data":{"title":"시무장로","staff":[{"role":"시무장로","name":"최장로","image":""},{"role":"시무장로","name":"정장로","image":""},{"role":"시무장로","name":"강장로","image":""}]}}]', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('about/worship', 5, '예배시간 안내', '예배와 모임 시간', '', '
      <h3 style="font-size: 22px; font-weight: bold; color: #cc0000; margin-bottom: 16px;">주일예배안내</h3>
      <table style="width: 100%; border-collapse: collapse; text-align: center; margin-bottom: 40px;">
        <thead><tr style="background: #f9f9f9; border-top: 2px solid #cc0000; border-bottom: 1px solid #ddd;">
          <th style="padding: 12px;">예배</th><th style="padding: 12px;">시간</th><th style="padding: 12px;">장소</th>
        </tr></thead>
        <tbody>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px; font-weight: bold;">1부예배</td><td style="padding: 12px;">오전 7시</td><td style="padding: 12px;">본당(B1)</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px; font-weight: bold;">2부예배</td><td style="padding: 12px;">오전 9시</td><td style="padding: 12px;">본당(B1)</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px; font-weight: bold;">3부예배 (대예배)</td><td style="padding: 12px;">오전 11시</td><td style="padding: 12px;">본당(B1)</td></tr>
        </tbody>
      </table>
      <h3 style="font-size: 22px; font-weight: bold; color: #cc0000; margin-bottom: 16px;">주중예배안내</h3>
      <table style="width: 100%; border-collapse: collapse; text-align: center; margin-bottom: 40px;">
        <thead><tr style="background: #f9f9f9; border-top: 2px solid #cc0000; border-bottom: 1px solid #ddd;">
          <th style="padding: 12px;">예배</th><th style="padding: 12px;">시간</th><th style="padding: 12px;">장소</th>
        </tr></thead>
        <tbody>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px; font-weight: bold;">수요예배</td><td style="padding: 12px;">오후 7시 30분</td><td style="padding: 12px;">본당(B1)</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px; font-weight: bold;">금요기도회</td><td style="padding: 12px;">오후 9시 00분</td><td style="padding: 12px;">본당(B1)</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px; font-weight: bold;">새벽기도회</td><td style="padding: 12px;">평일 오전 5시</td><td style="padding: 12px;">소예배실(2F)</td></tr>
        </tbody>
      </table>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('about/facility', 6, '층별 시설안내', '교회 공간 안내', '', '
      <div style="border-top: 2px solid #333;">
        <div style="display: flex; padding: 24px 0; border-bottom: 1px solid #eee; align-items: center;">
          <div style="width: 120px; text-align: center; color: #cc0000; font-size: 32px; font-weight: bold; border-right: 2px dashed #ddd; margin-right: 24px;">4F</div>
          <div><h4 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">청소년실 / 하늘정원</h4><p style="color: #555; margin: 0;">중·고등부 예배실 및 휴게 옥상 정원</p></div>
        </div>
        <div style="display: flex; padding: 24px 0; border-bottom: 1px solid #eee; align-items: center;">
          <div style="width: 120px; text-align: center; color: #cc0000; font-size: 32px; font-weight: bold; border-right: 2px dashed #ddd; margin-right: 24px;">3F</div>
          <div><h4 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">비전홀 / 유아실</h4><p style="color: #555; margin: 0;">유치·아동부 예배 및 유아실</p></div>
        </div>
        <div style="display: flex; padding: 24px 0; border-bottom: 1px solid #eee; align-items: center;">
          <div style="width: 120px; text-align: center; color: #cc0000; font-size: 32px; font-weight: bold; border-right: 2px dashed #ddd; margin-right: 24px;">2F</div>
          <div><h4 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">소예배실 / 목양실</h4><p style="color: #555; margin: 0;">새벽기도회 및 담임목사님 집무실</p></div>
        </div>
        <div style="display: flex; padding: 24px 0; border-bottom: 1px solid #eee; align-items: center;">
          <div style="width: 120px; text-align: center; color: #cc0000; font-size: 32px; font-weight: bold; border-right: 2px dashed #ddd; margin-right: 24px;">1F</div>
          <div><h4 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">로비 / 사무실 / 카페 만남</h4><p style="color: #555; margin: 0;">성도들의 친교 공간 및 사무실</p></div>
        </div>
        <div style="display: flex; padding: 24px 0; border-bottom: 1px solid #eee; align-items: center;">
          <div style="width: 120px; text-align: center; color: #cc0000; font-size: 32px; font-weight: bold; border-right: 2px dashed #ddd; margin-right: 24px;">B1</div>
          <div><h4 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">글로리아홀 (본당)</h4><p style="color: #555; margin: 0;">주일 대예배 및 주요 집회</p></div>
        </div>
      </div>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('education/kids', 14, '유초등부', '말씀 안에서 쑥쑥 자라나는 다음 세대', '', '
      <div style="display: flex; background: #fff; border: 1px solid #eee; border-radius: 16px; overflow: hidden; margin-bottom: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="width: 40%; background: url(''https://images.unsplash.com/photo-1519340333755-56e9c1d04079?w=800&q=80'') center/cover;"></div>
        <div style="padding: 40px; flex: 1;">
          <h4 style="color: #cc0000; font-weight: bold; font-size: 20px; margin-bottom: 16px;">사역 소개</h4>
          <p style="line-height: 1.8; color: #444;">평화교회 유초등부는 어린이들이 하나님의 사랑을 배우고, 예수님의 성품을 닮아가는 건강한 공동체입니다.<br/><br/>매주 신나는 찬양과 재미있는 성경 이야기, 그리고 다양한 공과 활동을 통해 믿음의 기초를 튼튼하게 다집니다.</p>
        </div>
      </div>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('education/youth', 15, '중고등부', '세상의 빛과 소금으로 세워지는 청소년', '', '
      <div style="display: flex; background: #fff; border: 1px solid #eee; border-radius: 16px; overflow: hidden; margin-bottom: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="width: 40%; background: url(''https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80'') center/cover;"></div>
        <div style="padding: 40px; flex: 1;">
          <h4 style="color: #cc0000; font-weight: bold; font-size: 20px; margin-bottom: 16px;">사역 소개</h4>
          <p style="line-height: 1.8; color: #444;">사춘기의 고민과 학업의 부담 속에서도 하나님 안에서 참된 비전을 발견하도록 돕습니다.<br/><br/>진실한 예배와 깊이 있는 제자훈련을 통해 세상을 이길 믿음의 세대로 양육합니다.</p>
        </div>
      </div>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('education/young-adult', 16, '청년부', '진리와 사랑으로 하나 되는 청년 공동체', '', '
      <div style="display: flex; background: #fff; border: 1px solid #eee; border-radius: 16px; overflow: hidden; margin-bottom: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="width: 40%; background: url(''https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80'') center/cover;"></div>
        <div style="padding: 40px; flex: 1;">
          <h4 style="color: #cc0000; font-weight: bold; font-size: 20px; margin-bottom: 16px;">사역 소개</h4>
          <p style="line-height: 1.8; color: #444;">열정적으로 하나님을 예배하며, 일상 속에서 그리스도의 향기를 발하는 청년부입니다.<br/><br/>서로의 삶을 나누는 소그룹 모임과 국내외 선교 활동을 통해 실천하는 신앙을 배웁니다.</p>
        </div>
      </div>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('education/womens', 17, '여선교회', '기도와 섬김으로 교회를 세우는 어머니들의 모임', '', '
      <div style="display: flex; background: #fff; border: 1px solid #eee; border-radius: 16px; overflow: hidden; margin-bottom: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="width: 40%; background: url(''https://images.unsplash.com/photo-1573165231977-3f0e27806045?w=800&q=80'') center/cover;"></div>
        <div style="padding: 40px; flex: 1;">
          <h4 style="color: #cc0000; font-weight: bold; font-size: 20px; margin-bottom: 16px;">사역 소개</h4>
          <p style="line-height: 1.8; color: #444;">교회의 든든한 기도의 기둥이자, 소외된 이웃을 향한 따뜻한 섬김을 실천하는 여선교회입니다.<br/><br/>정기적인 기도 모임과 다양한 구제 활동, 교회 내 행사 지원 등을 통해 그리스도의 사랑을 나눕니다.</p>
        </div>
      </div>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('education/mens', 18, '남선교회', '말씀 위에 굳게 서서 헌신하는 아버지들의 공동체', '', '
      <div style="display: flex; background: #fff; border: 1px solid #eee; border-radius: 16px; overflow: hidden; margin-bottom: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="width: 40%; background: url(''https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80'') center/cover;"></div>
        <div style="padding: 40px; flex: 1;">
          <h4 style="color: #cc0000; font-weight: bold; font-size: 20px; margin-bottom: 16px;">사역 소개</h4>
          <p style="line-height: 1.8; color: #444;">가정과 교회의 영적 리더로서 든든히 서가기 위해 함께 모여 말씀을 나누고 기도하는 남선교회입니다.<br/><br/>교회의 굵직한 사역들을 앞장서서 감당하며, 지역 사회를 위한 봉사와 선교 활동에 힘쓰고 있습니다.</p>
        </div>
      </div>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
