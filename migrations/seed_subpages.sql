INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('philosophy', 2, '인사말 및 진료철학', '환자를 최우선으로 생각하는 진료', '', '
      <div style="text-align: center; margin-bottom: 40px; font-family: var(--font-body);">
        <span style="color: #0284C7; font-weight: 700; font-size: 13px; display: block; margin-bottom: 16px; letter-spacing: 0.1em;">OUR PHILOSOPHY</span>
        <h2 style="font-size: 40px; font-weight: 800; color: #1d1d1f; margin-bottom: 30px; letter-spacing: -0.02em;">나음의 진료 철학</h2>
        <div style="background-color: #fafafc; padding: 50px; border-radius: 24px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
          <h3 style="font-size: 24px; font-weight: 700; color: #1d1d1f; margin-bottom: 24px; letter-spacing: -0.01em;">"환자의 아픔을 진심으로 공감하고, 근본적인 원인을 치료합니다."</h3>
          <p style="font-size: 17px; color: #7a7a7a; line-height: 1.6; margin-bottom: 16px;">나음재활의학과의원은 단순한 통증 완화를 넘어, 환자분들이 통증 없는 편안한 일상으로 돌아갈 수 있도록 최선을 다합니다.</p>
          <p style="font-size: 17px; color: #7a7a7a; line-height: 1.6; margin-bottom: 16px;">풍부한 임상 경험과 최신 의료 장비를 바탕으로 정확하게 진단하고, 1:1 맞춤형 비수술 치료를 제공합니다.</p>
          <p style="font-size: 18px; color: #1d1d1f; font-weight: 600; margin-top: 32px;">정직하고 따뜻한 진료로 여러분의 건강한 삶을 약속드립니다.</p>
        </div>
      </div>
      <h3 style="font-size: 28px; font-weight: 700; text-align: center; margin-top: 80px; margin-bottom: 40px; color: #1d1d1f;">나음 3대 원칙</h3>
      <ul style="list-style-type: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px;">
        <li style="background: #fff; padding: 32px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); text-align: center;">
          <h4 style="font-size: 20px; font-weight: 700; color: #0284C7; margin-bottom: 12px;">01. 정확한 진단</h4>
          <p style="color: #7a7a7a; font-size: 15px; line-height: 1.6;">최신 초음파 및 X-ray 장비를 통한 정밀한 검사와 꼼꼼한 진단을 약속합니다.</p>
        </li>
        <li style="background: #fff; padding: 32px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); text-align: center;">
          <h4 style="font-size: 20px; font-weight: 700; color: #0284C7; margin-bottom: 12px;">02. 비수술 원칙</h4>
          <p style="color: #7a7a7a; font-size: 15px; line-height: 1.6;">부담스러운 수술 대신, 인체의 자연 치유력을 높이는 안전한 비수술 치료를 지향합니다.</p>
        </li>
        <li style="background: #fff; padding: 32px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); text-align: center;">
          <h4 style="font-size: 20px; font-weight: 700; color: #0284C7; margin-bottom: 12px;">03. 맞춤형 재활</h4>
          <p style="color: #7a7a7a; font-size: 15px; line-height: 1.6;">숙련된 치료사의 1:1 맞춤형 도수·운동치료로 재발 방지 및 근본적 치유를 돕습니다.</p>
        </li>
      </ul>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('spine', 11, '목·허리 척추 클리닉', '거북목, 디스크 등 척추 질환 비수술 치료', '', '
      <div style="display: flex; gap: 40px; align-items: center; background: #fff; border-radius: 24px; padding: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.03); margin-bottom: 40px;">
        <div style="flex: 1; padding-right: 20px;">
          <span style="color: #0284C7; font-weight: 700; font-size: 13px; display: block; margin-bottom: 12px; letter-spacing: 0.1em;">SPINE CLINIC</span>
          <h3 style="font-size: 32px; font-weight: 800; color: #1d1d1f; margin-bottom: 20px; letter-spacing: -0.02em;">지긋지긋한 목·허리 통증,<br/>근본 원인을 바로잡습니다.</h3>
          <p style="font-size: 16px; color: #7a7a7a; line-height: 1.6; margin-bottom: 24px;">현대인의 고질병인 거북목 증후군부터 목/허리 디스크, 척추관 협착증까지. 수술에 대한 부담 없이 안전하고 효과적인 비수술적 요법으로 척추의 자생력을 회복시킵니다.</p>
          <ul style="list-style-type: none; padding: 0;">
            <li style="margin-bottom: 12px; font-size: 15px; color: #1d1d1f; display: flex; align-items: center;"><span style="color: #0284C7; margin-right: 8px;">✓</span> 비수술 주사치료 (신경차단술)</li>
            <li style="margin-bottom: 12px; font-size: 15px; color: #1d1d1f; display: flex; align-items: center;"><span style="color: #0284C7; margin-right: 8px;">✓</span> 1:1 맞춤 체형 교정 도수치료</li>
            <li style="margin-bottom: 12px; font-size: 15px; color: #1d1d1f; display: flex; align-items: center;"><span style="color: #0284C7; margin-right: 8px;">✓</span> 첨단 무중력 감압치료기 활용</li>
          </ul>
        </div>
        <div style="flex: 1; background: url(''https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800'') center/cover; height: 350px; border-radius: 16px;"></div>
      </div>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
