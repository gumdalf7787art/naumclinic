const fs = require('fs');

let appJsx = fs.readFileSync('src/App.jsx', 'utf-8');

// Add import if not present
if (!appJsx.includes('useCMSData')) {
  appJsx = appJsx.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { useCMSData } from './hooks/useCMS';");
}

// 1. Refactor Hero
appJsx = appJsx.replace(
  /const \[slides, setSlides\] = useState\(DEFAULT_HERO_SLIDES\);[\s\S]*?\}, \[slides\.length\]\);/m,
  `const slides = useCMSData('cms_heroSlides', DEFAULT_HERO_SLIDES);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);`
);

// 2. Refactor QuickMenu
appJsx = appJsx.replace(
  /const \[section, setSection\] = useState\(DEFAULT_QUICK_SECTION\);[\s\S]*?const \[menus, setMenus\] = useState\(DEFAULT_QUICK_LINKS\);[\s\S]*?window\.removeEventListener\('cms_quick_updated', handleStorage\);\n    \};\n  \}, \[\]\);/m,
  `const section = useCMSData('cms_quickSection', DEFAULT_QUICK_SECTION);\n  const menus = useCMSData('cms_quickLinks', DEFAULT_QUICK_LINKS);`
);

// 3. Refactor WorshipSchedule
appJsx = appJsx.replace(
  /const \[isVisible, setIsVisible\] = React\.useState\(\(\) => \{[\s\S]*?return \(\) => window\.removeEventListener\('cms_sections_updated', handleUpdate\);\n  \}, \[\]\);\n\n  if \(\!isVisible\) return null;/m,
  `const sections = useCMSData('cms_sections', { worship: true });\n  const isVisible = sections.worship !== false;\n\n  if (!isVisible) return null;`
);

// 4. Refactor PastorGreeting
appJsx = appJsx.replace(
  /const \[pastor, setPastor\] = React\.useState\(\(\) => \{[\s\S]*?return \(\) => window\.removeEventListener\('cms_pastor_updated', handleUpdate\);\n  \}, \[\]\);/m,
  `const pastor = useCMSData('cms_pastorSection', {
    image: '/pastor-bg.png',
    title: '사랑과 평화가 넘치는 기독교대한감리회 평화교회입니다.',
    content: '평화교회는 예수 그리스도의 사랑을 바탕으로 이웃과 세상을 섬기는 따뜻한 공동체입니다.\\n우리 교회는 진리의 말씀 안에서 각 사람의 삶이 회복되고, 예배의 감격이 살아 숨쉬는 곳입니다.\\n상처 입은 영혼들이 치유받고, 다음 세대가 믿음 안에서 든든히 자라나는 믿음의 요람이 되기를 소망합니다.\\n\\n여러분의 발걸음을 진심으로 환영하며, 주님의 평화가 가정과 일터 위에 늘 함께하시기를 기도합니다.',
    name: '대표목사 홍길동'
  });`
);

// 5. Refactor Footer
appJsx = appJsx.replace(
  /const \[footer, setFooter\] = React\.useState\(\(\) => \{[\s\S]*?return \(\) => window\.removeEventListener\('cms_footer_updated', handleUpdate\);\n  \}, \[\]\);/m,
  `const footer = useCMSData('cms_footerSection', {
    logo: '/logo.jpg',
    description: '하나님의 사랑과 은혜가 넘치는 진정한 쉼터\\n세상의 빛과 소금이 되는 평화교회입니다.',
    churchName: '기독교대한감리회 평화교회',
    repName: '',
    address: '서울 중랑구 봉화산로 120',
    phone: '02-000-0000',
    fax: '',
    email: 'peace@peacechurch.com',
    copyright: 'Copyright © 2026 Peace Church. All rights reserved.'
  });`
);

fs.writeFileSync('src/App.jsx', appJsx);
console.log('App.jsx successfully patched.');
