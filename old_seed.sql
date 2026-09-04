INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('about/vision', 2, '援먰쉶鍮꾩쟾怨?紐⑺몴', '?곕━媛 ?몄썙媛??援먰쉶', '', '
      <div style="text-align: center; margin-bottom: 40px;">
        <span style="color: #8DC63F; font-weight: bold; font-size: 14px; display: block; margin-bottom: 16px;">OUR VISION</span>
        <h2 style="font-size: 36px; font-weight: 800; color: #111; margin-bottom: 40px;">?곕━??鍮꾩쟾</h2>
        <div style="background-color: #f8f9fa; border-left: 6px solid #cc0000; padding: 40px; border-radius: 0 24px 24px 0; text-align: center;">
          <h3 style="font-size: 28px; font-weight: bold; color: #111; margin-bottom: 24px;">"?덉닔 洹몃━?ㅻ룄???щ옉?쇰줈 ?щ엺???몄슦怨? ?몄긽???ш린??援먰쉶"</h3>
          <p style="font-size: 16px; color: #555; line-height: 1.8; margin-bottom: 16px;">?됲솕援먰쉶???덉닔 洹몃━?ㅻ룄瑜??띠쓽 ?좎씪??湲몃줈 怨좊갚?섎ŉ, 留먯?怨?湲곕룄 ?꾩뿉 援녠쾶 ?쒖꽌 ?섎굹?섏쓽 ?щ옉???몄긽 媛?대뜲 ?섎늻??援먰쉶瑜?轅덇퓠?덈떎.</p>
          <p style="font-size: 16px; color: #555; line-height: 1.8; margin-bottom: 16px;">援먰쉶 ?덉뿉?쒕쭔 癒몃Т瑜대뒗 ?좎븰???꾨땲??媛?뺢낵 ?쇳꽣, ?댁썐怨?吏??궗???띿뿉??洹몃━?ㅻ룄???щ옉???ㅼ쿇?섎ŉ, ?곸쿂諛쏆? ?대뱾???덇퀬 ?뚯쇅???대뱾怨??④퍡?섎뒗 寃껋씠 ?곕━???щ챸?낅땲??</p>
          <p style="font-size: 16px; color: #111; font-weight: bold; margin-top: 32px;">?됲솕援먰쉶??紐⑤뱺 ?몃?媛 誘우쓬 ?덉뿉???④퍡 ?깆옣?섍퀬 ?몄긽 ?띿뿉??蹂듭쓬??鍮쏆쓣 諛앺엳??嫄닿컯?섍퀬 ?곕쑜???좎븰怨듬룞泥대? ?몄썙媛寃좎뒿?덈떎.</p>
        </div>
      </div>
      <h3 style="font-size: 28px; font-weight: bold; text-align: center; margin-top: 60px; margin-bottom: 30px;">?곕━媛 ?몄썙媛??援먰쉶</h3>
      <ul style="list-style-type: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <li style="background: #fff; padding: 24px; border: 1px solid #eee; border-radius: 12px;"><h4 style="font-size: 20px; color: #cc0000; margin-bottom: 10px;">01. 留먯? ?꾩뿉 諛붾줈 ?쒕뒗 援먰쉶</h4><p>?섎굹?섏쓽 留먯????좎븰怨??띠쓽 以묒떖???먭퀬 ?ㅼ쿇?섎뒗 ?깅룄瑜??몄썙媛묐땲??</p></li>
        <li style="background: #fff; padding: 24px; border: 1px solid #eee; border-radius: 12px;"><h4 style="font-size: 20px; color: #cc0000; margin-bottom: 10px;">02. 湲곕룄?섎뒗 援먰쉶</h4><p>?섎굹?섏쓽 ?살쓣 援ы븯硫??댁썐怨??몄긽???꾪빐 湲곕룄?섎뒗 怨듬룞泥닿? ?⑸땲??</p></li>
        <li style="background: #fff; padding: 24px; border: 1px solid #eee; border-radius: 12px;"><h4 style="font-size: 20px; color: #cc0000; margin-bottom: 10px;">03. ?ㅼ쓬 ?몃?瑜??몄슦??援먰쉶</h4><p>?대┛?댁? 泥?냼?꾨뱾???щ챸??諛쒓껄?섍퀬 ?깆옣?섎룄濡??뺤뒿?덈떎.</p></li>
        <li style="background: #fff; padding: 24px; border: 1px solid #eee; border-radius: 12px;"><h4 style="font-size: 20px; color: #cc0000; margin-bottom: 10px;">04. ?댁썐???щ옉?섍퀬 ?ш린??援먰쉶</h4><p>?뚯쇅???대뱾?먭쾶 ?ㅺ?媛 ?덉닔?섏쓽 ?щ옉???됰룞?쇰줈 ?꾪빀?덈떎.</p></li>
      </ul>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('about/pastor', 3, '?댁엫紐⑹궗 ?몄궗留?, '洹몃━?ㅻ룄???됲솕媛 癒몃Т??援먰쉶', '', '
      <div style="display: flex; gap: 40px; flex-wrap: wrap;">
        <div style="flex: 0 0 300px;">
          <img src="/pastor-profile.jpg" alt="?댁엫紐⑹궗" style="width: 100%; border-radius: 12px; margin-bottom: 20px;" />
          <div style="background: #f8f9fa; padding: 20px; border-radius: 12px;">
            <h4 style="font-weight: bold; border-bottom: 2px solid #cc0000; padding-bottom: 10px; margin-bottom: 10px;">?μ꽦吏??댁엫紐⑹궗</h4>
            <ul style="font-size: 14px; color: #555; padding-left: 20px;">
              <li>媛먮━援먯떊?숆탳 ?좏븰怨?議몄뾽</li>
              <li>媛먮━援먯떊?숆탳 ??숈썝 議몄뾽</li>
              <li>?됲솕媛먮━援먰쉶 ?댁엫 (2016-?꾩옱)</li>
            </ul>
          </div>
        </div>
        <div style="flex: 1; font-size: 16px; line-height: 1.8;">
          <p>?됲솕援먰쉶 ?덊럹?댁?瑜?李얠븘二쇱떊 ?щ윭遺꾩쓣 二쇰떂???대쫫?쇰줈 ?섏쁺?⑸땲??<br/>?됲솕援먰쉶瑜??ш린怨??덈뒗 ?댁엫紐⑹궗 <strong>?μ꽦吏?/strong>?낅땲??</p>
          <br/>
          <p>援먰쉶???⑥닚???щ엺?ㅼ씠 紐⑥뿬 ?덈같?쒕━???μ냼媛 ?꾨땲?? ?섎굹?섏쓽 ?щ옉??諛곗슦怨?洹??щ옉???띠쑝濡??댁븘?대뒗 怨듬룞泥대씪怨?誘우뒿?덈떎.</p>
          <div style="padding: 20px; background: #fff; border-left: 4px solid #cc0000; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin: 24px 0; font-weight: bold;">
            蹂듭쓬? 留먯뿉留?癒몃Т??寃껋씠 ?꾨땲?????щ엺????怨곸쑝濡??ㅺ?媛 ?④퍡 ?멸퀬, ?④퍡 湲곕퍙?섎ŉ, ?④퍡 嫄몄뼱媛???щ옉?댁뼱???쒕떎??寃껋엯?덈떎.
          </div>
          <p>?곕━ 援먰쉶媛 ?덈같??湲곗겏???댁븘 ?덈뒗 援먰쉶, 留먯????듯빐 ?띠쓽 諛⑺뼢??諛쒓껄?섎뒗 援먰쉶, ?ㅼ쓬 ?몃?媛 誘우쓬 ?덉뿉??轅덉쓣 ?ㅼ슦??援먰쉶媛 ?섍린瑜??뚮쭩?⑸땲??</p>
          <p>?꾧뎄???몄븞??留덉쓬?쇰줈 李얠븘?ㅼ떗?쒖삤. ?④퍡 ?덈같?섍퀬, ?④퍡 留먯???諛곗슦硫? ?쒕줈???띠쓣 ?섎늻硫댁꽌 誘우쓬??湲몄쓣 ?④퍡 嫄몄뼱媛怨??띠뒿?덈떎.</p>
        </div>
      </div>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('about/staff', 4, '?ш린???щ엺??, '援먰쉶瑜??꾪빐 ?뚯떊?섎뒗 ?숈뿭?먮뱾', '', '
      <h3 style="font-size: 22px; font-weight: bold; border-left: 4px solid #cc0000; padding-left: 12px; margin-bottom: 24px;">紐⑺쉶??/h3>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px;">
        <div style="border: 1px solid #eee; border-radius: 8px; text-align: center; padding: 20px;"><div style="color: #cc0000; font-size: 13px;">遺紐⑹궗</div><div style="font-weight: bold; font-size: 18px;">源紐⑹궗</div></div>
        <div style="border: 1px solid #eee; border-radius: 8px; text-align: center; padding: 20px;"><div style="color: #cc0000; font-size: 13px;">?꾨룄??/div><div style="font-weight: bold; font-size: 18px;">?댁쟾?꾩궗</div></div>
        <div style="border: 1px solid #eee; border-radius: 8px; text-align: center; padding: 20px;"><div style="color: #cc0000; font-size: 13px;">?꾨룄??/div><div style="font-weight: bold; font-size: 18px;">諛뺤쟾?꾩궗</div></div>
        <div style="border: 1px solid #eee; border-radius: 8px; text-align: center; padding: 20px;"><div style="color: #cc0000; font-size: 13px;">?꾨룄??/div><div style="font-weight: bold; font-size: 18px;">理쒖쟾?꾩궗</div></div>
      </div>
      <h3 style="font-size: 22px; font-weight: bold; border-left: 4px solid #cc0000; padding-left: 12px; margin-bottom: 24px;">?λ줈</h3>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px;">
        <div style="border: 1px solid #eee; border-radius: 8px; text-align: center; padding: 20px;"><div style="color: #cc0000; font-size: 13px;">?쒕Т?λ줈</div><div style="font-weight: bold; font-size: 18px;">理쒖옣濡?/div></div>
        <div style="border: 1px solid #eee; border-radius: 8px; text-align: center; padding: 20px;"><div style="color: #cc0000; font-size: 13px;">?쒕Т?λ줈</div><div style="font-weight: bold; font-size: 18px;">?뺤옣濡?/div></div>
        <div style="border: 1px solid #eee; border-radius: 8px; text-align: center; padding: 20px;"><div style="color: #cc0000; font-size: 13px;">?쒕Т?λ줈</div><div style="font-weight: bold; font-size: 18px;">媛뺤옣濡?/div></div>
      </div>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('about/worship', 5, '?덈같?쒓컙 ?덈궡', '?덈같? 紐⑥엫 ?쒓컙', '', '
      <h3 style="font-size: 22px; font-weight: bold; color: #cc0000; margin-bottom: 16px;">二쇱씪?덈같?덈궡</h3>
      <table style="width: 100%; border-collapse: collapse; text-align: center; margin-bottom: 40px;">
        <thead><tr style="background: #f9f9f9; border-top: 2px solid #cc0000; border-bottom: 1px solid #ddd;">
          <th style="padding: 12px;">?덈같</th><th style="padding: 12px;">?쒓컙</th><th style="padding: 12px;">?μ냼</th>
        </tr></thead>
        <tbody>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px; font-weight: bold;">1遺?덈같</td><td style="padding: 12px;">?ㅼ쟾 7??/td><td style="padding: 12px;">蹂몃떦(B1)</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px; font-weight: bold;">2遺?덈같</td><td style="padding: 12px;">?ㅼ쟾 9??/td><td style="padding: 12px;">蹂몃떦(B1)</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px; font-weight: bold;">3遺?덈같 (??덈같)</td><td style="padding: 12px;">?ㅼ쟾 11??/td><td style="padding: 12px;">蹂몃떦(B1)</td></tr>
        </tbody>
      </table>
      <h3 style="font-size: 22px; font-weight: bold; color: #cc0000; margin-bottom: 16px;">二쇱쨷?덈같?덈궡</h3>
      <table style="width: 100%; border-collapse: collapse; text-align: center; margin-bottom: 40px;">
        <thead><tr style="background: #f9f9f9; border-top: 2px solid #cc0000; border-bottom: 1px solid #ddd;">
          <th style="padding: 12px;">?덈같</th><th style="padding: 12px;">?쒓컙</th><th style="padding: 12px;">?μ냼</th>
        </tr></thead>
        <tbody>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px; font-weight: bold;">?섏슂?덈같</td><td style="padding: 12px;">?ㅽ썑 7??30遺?/td><td style="padding: 12px;">蹂몃떦(B1)</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px; font-weight: bold;">湲덉슂湲곕룄??/td><td style="padding: 12px;">?ㅽ썑 9??00遺?/td><td style="padding: 12px;">蹂몃떦(B1)</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px; font-weight: bold;">?덈꼍湲곕룄??/td><td style="padding: 12px;">?됱씪 ?ㅼ쟾 5??/td><td style="padding: 12px;">?뚯삁諛곗떎(2F)</td></tr>
        </tbody>
      </table>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('about/facility', 6, '痢듬퀎 ?쒖꽕?덈궡', '援먰쉶 怨듦컙 ?덈궡', '', '
      <div style="border-top: 2px solid #333;">
        <div style="display: flex; padding: 24px 0; border-bottom: 1px solid #eee; align-items: center;">
          <div style="width: 120px; text-align: center; color: #cc0000; font-size: 32px; font-weight: bold; border-right: 2px dashed #ddd; margin-right: 24px;">4F</div>
          <div><h4 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">泥?냼?꾩떎 / ?섎뒛?뺤썝</h4><p style="color: #555; margin: 0;">以뫢룰퀬?깅? ?덈같??諛??닿쾶 ?μ긽 ?뺤썝</p></div>
        </div>
        <div style="display: flex; padding: 24px 0; border-bottom: 1px solid #eee; align-items: center;">
          <div style="width: 120px; text-align: center; color: #cc0000; font-size: 32px; font-weight: bold; border-right: 2px dashed #ddd; margin-right: 24px;">3F</div>
          <div><h4 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">鍮꾩쟾? / ?좎븘??/h4><p style="color: #555; margin: 0;">?좎튂쨌?꾨룞遺 ?덈같 諛??좎븘??/p></div>
        </div>
        <div style="display: flex; padding: 24px 0; border-bottom: 1px solid #eee; align-items: center;">
          <div style="width: 120px; text-align: center; color: #cc0000; font-size: 32px; font-weight: bold; border-right: 2px dashed #ddd; margin-right: 24px;">2F</div>
          <div><h4 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">?뚯삁諛곗떎 / 紐⑹뼇??/h4><p style="color: #555; margin: 0;">?덈꼍湲곕룄??諛??댁엫紐⑹궗??吏묐Т??/p></div>
        </div>
        <div style="display: flex; padding: 24px 0; border-bottom: 1px solid #eee; align-items: center;">
          <div style="width: 120px; text-align: center; color: #cc0000; font-size: 32px; font-weight: bold; border-right: 2px dashed #ddd; margin-right: 24px;">1F</div>
          <div><h4 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">濡쒕퉬 / ?щТ??/ 移댄럹 留뚮궓</h4><p style="color: #555; margin: 0;">?깅룄?ㅼ쓽 移쒓탳 怨듦컙 諛??щТ??/p></div>
        </div>
        <div style="display: flex; padding: 24px 0; border-bottom: 1px solid #eee; align-items: center;">
          <div style="width: 120px; text-align: center; color: #cc0000; font-size: 32px; font-weight: bold; border-right: 2px dashed #ddd; margin-right: 24px;">B1</div>
          <div><h4 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">湲濡쒕━?꾪? (蹂몃떦)</h4><p style="color: #555; margin: 0;">二쇱씪 ??덈같 諛?二쇱슂 吏묓쉶</p></div>
        </div>
      </div>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('education/kids', 14, '?좎큹?깅?', '留먯? ?덉뿉???μ뫁 ?먮씪?섎뒗 ?ㅼ쓬 ?몃?', '', '
      <div style="display: flex; background: #fff; border: 1px solid #eee; border-radius: 16px; overflow: hidden; margin-bottom: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="width: 40%; background: url(''https://images.unsplash.com/photo-1519340333755-56e9c1d04079?w=800&q=80'') center/cover;"></div>
        <div style="padding: 40px; flex: 1;">
          <h4 style="color: #cc0000; font-weight: bold; font-size: 20px; margin-bottom: 16px;">?ъ뿭 ?뚭컻</h4>
          <p style="line-height: 1.8; color: #444;">?됲솕援먰쉶 ?좎큹?깅????대┛?대뱾???섎굹?섏쓽 ?щ옉??諛곗슦怨? ?덉닔?섏쓽 ?깊뭹????븘媛??嫄닿컯??怨듬룞泥댁엯?덈떎.<br/><br/>留ㅼ＜ ?좊굹??李ъ뼇怨??щ??덈뒗 ?깃꼍 ?댁빞湲? 洹몃━怨??ㅼ뼇??怨듦낵 ?쒕룞???듯빐 誘우쓬??湲곗큹瑜??쇳듉?섍쾶 ?ㅼ쭛?덈떎.</p>
        </div>
      </div>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('education/youth', 15, '以묎퀬?깅?', '?몄긽??鍮쏄낵 ?뚭툑?쇰줈 ?몄썙吏??泥?냼??, '', '
      <div style="display: flex; background: #fff; border: 1px solid #eee; border-radius: 16px; overflow: hidden; margin-bottom: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="width: 40%; background: url(''https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80'') center/cover;"></div>
        <div style="padding: 40px; flex: 1;">
          <h4 style="color: #cc0000; font-weight: bold; font-size: 20px; margin-bottom: 16px;">?ъ뿭 ?뚭컻</h4>
          <p style="line-height: 1.8; color: #444;">?ъ텣湲곗쓽 怨좊?怨??숈뾽??遺???띿뿉?쒕룄 ?섎굹???덉뿉??李몃맂 鍮꾩쟾??諛쒓껄?섎룄濡??뺤뒿?덈떎.<br/><br/>吏꾩떎???덈같? 源딆씠 ?덈뒗 ?쒖옄?덈젴???듯빐 ?몄긽???닿만 誘우쓬???몃?濡??묒쑁?⑸땲??</p>
        </div>
      </div>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('education/young-adult', 16, '泥?뀈遺', '吏꾨━? ?щ옉?쇰줈 ?섎굹 ?섎뒗 泥?뀈 怨듬룞泥?, '', '
      <div style="display: flex; background: #fff; border: 1px solid #eee; border-radius: 16px; overflow: hidden; margin-bottom: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="width: 40%; background: url(''https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80'') center/cover;"></div>
        <div style="padding: 40px; flex: 1;">
          <h4 style="color: #cc0000; font-weight: bold; font-size: 20px; margin-bottom: 16px;">?ъ뿭 ?뚭컻</h4>
          <p style="line-height: 1.8; color: #444;">?댁젙?곸쑝濡??섎굹?섏쓣 ?덈같?섎ŉ, ?쇱긽 ?띿뿉??洹몃━?ㅻ룄???κ린瑜?諛쒗븯??泥?뀈遺?낅땲??<br/><br/>?쒕줈???띠쓣 ?섎늻???뚭렇猷?紐⑥엫怨?援?궡???좉탳 ?쒕룞???듯빐 ?ㅼ쿇?섎뒗 ?좎븰??諛곗썎?덈떎.</p>
        </div>
      </div>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('education/womens', 17, '?ъ꽑援먰쉶', '湲곕룄? ?ш??쇰줈 援먰쉶瑜??몄슦???대㉧?덈뱾??紐⑥엫', '', '
      <div style="display: flex; background: #fff; border: 1px solid #eee; border-radius: 16px; overflow: hidden; margin-bottom: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="width: 40%; background: url(''https://images.unsplash.com/photo-1573165231977-3f0e27806045?w=800&q=80'') center/cover;"></div>
        <div style="padding: 40px; flex: 1;">
          <h4 style="color: #cc0000; font-weight: bold; font-size: 20px; margin-bottom: 16px;">?ъ뿭 ?뚭컻</h4>
          <p style="line-height: 1.8; color: #444;">援먰쉶???좊뱺??湲곕룄??湲곕뫁?댁옄, ?뚯쇅???댁썐???ν븳 ?곕쑜???ш????ㅼ쿇?섎뒗 ?ъ꽑援먰쉶?낅땲??<br/><br/>?뺢린?곸씤 湲곕룄 紐⑥엫怨??ㅼ뼇??援ъ젣 ?쒕룞, 援먰쉶 ???됱궗 吏???깆쓣 ?듯빐 洹몃━?ㅻ룄???щ옉???섎닏?덈떎.</p>
        </div>
      </div>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published)
VALUES ('education/mens', 18, '?⑥꽑援먰쉶', '留먯? ?꾩뿉 援녠쾶 ?쒖꽌 ?뚯떊?섎뒗 ?꾨쾭吏?ㅼ쓽 怨듬룞泥?, '', '
      <div style="display: flex; background: #fff; border: 1px solid #eee; border-radius: 16px; overflow: hidden; margin-bottom: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="width: 40%; background: url(''https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80'') center/cover;"></div>
        <div style="padding: 40px; flex: 1;">
          <h4 style="color: #cc0000; font-weight: bold; font-size: 20px; margin-bottom: 16px;">?ъ뿭 ?뚭컻</h4>
          <p style="line-height: 1.8; color: #444;">媛?뺢낵 援먰쉶???곸쟻 由щ뜑濡쒖꽌 ?좊뱺???쒓?湲??꾪빐 ?④퍡 紐⑥뿬 留먯????섎늻怨?湲곕룄?섎뒗 ?⑥꽑援먰쉶?낅땲??<br/><br/>援먰쉶??援듭쭅???ъ뿭?ㅼ쓣 ?욎옣?쒖꽌 媛먮떦?섎ŉ, 吏???ы쉶瑜??꾪븳 遊됱궗? ?좉탳 ?쒕룞???섏벐怨??덉뒿?덈떎.</p>
        </div>
      </div>
    ', 1)
ON CONFLICT(slug) DO UPDATE SET content = excluded.content, title = excluded.title, subtitle = excluded.subtitle;
