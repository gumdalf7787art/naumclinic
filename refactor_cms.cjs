const fs = require('fs');
const path = require('path');

const hookContent = `import { useState, useEffect } from 'react';

let cmsDataCache = null;
let cmsDataPromise = null;

export const fetchCMSData = async () => {
  if (cmsDataCache) return cmsDataCache;
  if (cmsDataPromise) return cmsDataPromise;
  cmsDataPromise = fetch('/api/cms/data').then(res => res.json()).then(data => {
    if (data.success) {
      cmsDataCache = data.data;
      return cmsDataCache;
    }
    return {};
  }).catch(() => ({}));
  return cmsDataPromise;
};

export const saveToServer = async (payload) => {
  try {
    await fetch('/api/cms/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    console.error('Failed to save to CMS API', e);
  }
};

export function useCMSData(key, defaultData) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return defaultData;
  });

  useEffect(() => {
    fetchCMSData().then(serverData => {
      if (serverData && serverData[key] !== undefined) {
        setData(serverData[key]);
        localStorage.setItem(key, JSON.stringify(serverData[key]));
      }
    });

    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem(key);
        if (saved) setData(JSON.parse(saved));
      } catch(e) {}
    };
    
    let eventName = 'storage';
    if (key === 'cms_sections') eventName = 'cms_sections_updated';
    else if (key === 'cms_heroSlides') eventName = 'cms_hero_updated';
    else if (key === 'cms_quickSection' || key === 'cms_quickLinks') eventName = 'cms_quick_updated';
    else if (key === 'cms_pastorSection') eventName = 'cms_pastor_updated';
    else if (key === 'cms_footerSection') eventName = 'cms_footer_updated';

    window.addEventListener(eventName, handleUpdate);
    return () => window.removeEventListener(eventName, handleUpdate);
  }, [key]);

  return data;
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'hooks', 'useCMS.js'), hookContent);
console.log('useCMS hook created.');

// Modify App.jsx
let appJsx = fs.readFileSync(path.join(__dirname, 'src', 'App.jsx'), 'utf-8');
appJsx = appJsx.replace(/import React, \{ useState, useEffect \} from 'react';/, "import React, { useState, useEffect } from 'react';\nimport { useCMSData } from './hooks/useCMS';");

appJsx = appJsx.replace(/const \[heroSlides, setHeroSlides\] = React\.useState\(\(\) => \{[\s\S]*?\}\);[\s\S]*?React\.useEffect\(\(\) => \{[\s\S]*?return \(\) => window\.removeEventListener\('cms_hero_updated', handleUpdate\);[\s\S]*?\}, \[\]\);/g, `const heroSlides = useCMSData('cms_heroSlides', [\n    { id: 1, image: "/hero-1-bg.webp", topText: "기독교대한감리회", main: "평화교회", engText: "PEACE METHODIST CHURCH", sub: "예수님의 사랑으로 사람을 세우고,\\n세상을 섬기는 교회", align: "left", zoomEffect: "zoom-in" },\n    { id: 2, image: "/hero-2-bg.webp", main: "말씀이 삶이 되는\\n은혜의 예배", sub: "진리와 성령으로 드리는\\n참된 예배의 자리", align: "left", zoomEffect: "zoom-in" },\n    { id: 3, image: "/hero-3-bg.webp", main: "세상을 섬기는\\n사랑의 공동체", sub: "이웃과 함께하며\\n세상의 빛과 소금의 역할을 다합니다", align: "left", zoomEffect: "zoom-in" },\n    { id: 4, image: "/hero4.jpg", main: "", sub: "", align: "left", zoomEffect: "none", noDim: true }\n  ]);`);

appJsx = appJsx.replace(/const \[section, setSection\] = useState\(DEFAULT_QUICK_SECTION\);[\s\S]*?const \[menus, setMenus\] = useState\(DEFAULT_QUICK_LINKS\);[\s\S]*?useEffect\(\(\) => \{[\s\S]*?return \(\) => \{[\s\S]*?window\.removeEventListener\('cms_quick_updated', handleStorage\);[\s\S]*?\};[\s\S]*?\}, \[\]\);/g, `const section = useCMSData('cms_quickSection', DEFAULT_QUICK_SECTION);\n  const menus = useCMSData('cms_quickLinks', DEFAULT_QUICK_LINKS);`);

appJsx = appJsx.replace(/const \[isVisible, setIsVisible\] = React\.useState\(\(\) => \{[\s\S]*?return true;\n  \}\);[\s\S]*?React\.useEffect\(\(\) => \{[\s\S]*?return \(\) => window\.removeEventListener\('cms_sections_updated', handleUpdate\);[\s\S]*?\}, \[\]\);/g, `const sections = useCMSData('cms_sections', { worship: true });\n  const isVisible = sections.worship !== false;`);

appJsx = appJsx.replace(/const \[pastor, setPastor\] = React\.useState\(\(\) => \{[\s\S]*?\}\);[\s\S]*?React\.useEffect\(\(\) => \{[\s\S]*?return \(\) => window\.removeEventListener\('cms_pastor_updated', handleUpdate\);[\s\S]*?\}, \[\]\);/g, `const pastor = useCMSData('cms_pastorSection', {\n    image: '/pastor-bg.png',\n    title: '사랑과 평화가 넘치는 기독교대한감리회 평화교회입니다.',\n    content: '평화교회는 예수 그리스도의 사랑을 바탕으로 이웃과 세상을 섬기는 따뜻한 공동체입니다.\\n우리 교회는 진리의 말씀 안에서 각 사람의 삶이 회복되고, 예배의 감격이 살아 숨쉬는 곳입니다.\\n상처 입은 영혼들이 치유받고, 다음 세대가 믿음 안에서 든든히 자라나는 믿음의 요람이 되기를 소망합니다.\\n\\n여러분의 발걸음을 진심으로 환영하며, 주님의 평화가 가정과 일터 위에 늘 함께하시기를 기도합니다.',\n    name: '대표목사 홍길동'\n  });`);

appJsx = appJsx.replace(/const \[footer, setFooter\] = React\.useState\(\(\) => \{[\s\S]*?\}\);[\s\S]*?React\.useEffect\(\(\) => \{[\s\S]*?return \(\) => window\.removeEventListener\('cms_footer_updated', handleUpdate\);[\s\S]*?\}, \[\]\);/g, `const footer = useCMSData('cms_footerSection', {\n    logo: '/logo.jpg',\n    description: '하나님의 사랑과 은혜가 넘치는 진정한 쉼터\\n세상의 빛과 소금이 되는 평화교회입니다.',\n    churchName: '기독교대한감리회 평화교회',\n    repName: '',\n    address: '서울 중랑구 봉화산로 120',\n    phone: '02-000-0000',\n    fax: '',\n    email: 'peace@peacechurch.com',\n    copyright: 'Copyright © 2026 Peace Church. All rights reserved.'\n  });`);

fs.writeFileSync(path.join(__dirname, 'src', 'App.jsx'), appJsx);
console.log('App.jsx updated.');

// Modify AdminHomeManager.jsx
let adminJsx = fs.readFileSync(path.join(__dirname, 'src', 'components', 'AdminHomeManager.jsx'), 'utf-8');
adminJsx = adminJsx.replace(/import \{ motion, AnimatePresence \} from 'framer-motion';/, "import { motion, AnimatePresence } from 'framer-motion';\nimport { fetchCMSData, saveToServer } from '../hooks/useCMS';");

adminJsx = adminJsx.replace(/const triggerAutoSave = \(\) => \{[\s\S]*?\}, 800\);\n  \};/g, `const pendingSaves = useRef({});
  const triggerAutoSave = (key, value) => {
    if (key) pendingSaves.current[key] = value;
    setIsSaving(true);
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        if (Object.keys(pendingSaves.current).length > 0) {
          const payload = Object.keys(pendingSaves.current).map(k => ({ id: k, value: pendingSaves.current[k] }));
          pendingSaves.current = {};
          await saveToServer(payload);
        }
      } finally {
        setIsSaving(false);
      }
    }, 1000);
  };

  React.useEffect(() => {
    fetchCMSData().then(serverData => {
      if (serverData) {
        if (serverData.cms_sections) setSections(serverData.cms_sections);
        if (serverData.cms_heroSlides) setHeroSlides(serverData.cms_heroSlides);
        if (serverData.cms_quickSection) setQuickSection(serverData.cms_quickSection);
        if (serverData.cms_quickLinks) setQuickLinks(serverData.cms_quickLinks);
        if (serverData.cms_pastorSection) setPastorSection(serverData.cms_pastorSection);
        if (serverData.cms_footerSection) setFooterSection(serverData.cms_footerSection);
      }
    });
  }, []);`);

adminJsx = adminJsx.replace(/localStorage\.setItem\('cms_sections', JSON\.stringify\(newSections\)\);\n    window\.dispatchEvent\(new Event\('cms_sections_updated'\)\);\n    triggerAutoSave\(\);/g, `localStorage.setItem('cms_sections', JSON.stringify(newSections));
    window.dispatchEvent(new Event('cms_sections_updated'));
    triggerAutoSave('cms_sections', newSections);`);

adminJsx = adminJsx.replace(/localStorage\.setItem\('cms_heroSlides', JSON\.stringify\(newSlides\)\);\n    window\.dispatchEvent\(new Event\('cms_hero_updated'\)\);\n    triggerAutoSave\(\);/g, `localStorage.setItem('cms_heroSlides', JSON.stringify(newSlides));
    window.dispatchEvent(new Event('cms_hero_updated'));
    triggerAutoSave('cms_heroSlides', newSlides);`);

adminJsx = adminJsx.replace(/localStorage\.setItem\('cms_quickSection', JSON\.stringify\(newSec\)\);\n    window\.dispatchEvent\(new Event\('cms_quick_updated'\)\);\n    triggerAutoSave\(\);/g, `localStorage.setItem('cms_quickSection', JSON.stringify(newSec));
    window.dispatchEvent(new Event('cms_quick_updated'));
    triggerAutoSave('cms_quickSection', newSec);`);

adminJsx = adminJsx.replace(/localStorage\.setItem\('cms_quickLinks', JSON\.stringify\(newLinks\)\);\n    window\.dispatchEvent\(new Event\('cms_quick_updated'\)\);\n    triggerAutoSave\(\);/g, `localStorage.setItem('cms_quickLinks', JSON.stringify(newLinks));
    window.dispatchEvent(new Event('cms_quick_updated'));
    triggerAutoSave('cms_quickLinks', newLinks);`);

adminJsx = adminJsx.replace(/localStorage\.setItem\('cms_pastorSection', JSON\.stringify\(newSec\)\);\n    window\.dispatchEvent\(new Event\('cms_pastor_updated'\)\);\n    triggerAutoSave\(\);/g, `localStorage.setItem('cms_pastorSection', JSON.stringify(newSec));
    window.dispatchEvent(new Event('cms_pastor_updated'));
    triggerAutoSave('cms_pastorSection', newSec);`);

adminJsx = adminJsx.replace(/localStorage\.setItem\('cms_footerSection', JSON\.stringify\(newSec\)\);\n    window\.dispatchEvent\(new Event\('cms_footer_updated'\)\);\n    triggerAutoSave\(\);/g, `localStorage.setItem('cms_footerSection', JSON.stringify(newSec));
    window.dispatchEvent(new Event('cms_footer_updated'));
    triggerAutoSave('cms_footerSection', newSec);`);

// Replace processAndUploadImage
adminJsx = adminJsx.replace(/const optimizedDataUrl = canvas\.toDataURL\('image\/webp', 0\.8\);\n        callback\(optimizedDataUrl\);\n      \};\n    \};\n    reader\.readAsDataURL\(file\);\n  \};/g, `const optimizedDataUrl = canvas.toDataURL('image/webp', 0.8);
        fetch('/api/cms/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64Data: optimizedDataUrl, extension: 'webp' })
        }).then(res => res.json()).then(data => {
          if (data.success) {
            callback(data.url);
          } else {
            callback(optimizedDataUrl);
          }
        }).catch(() => callback(optimizedDataUrl));
      };
    };
    reader.readAsDataURL(file);
  };`);

fs.writeFileSync(path.join(__dirname, 'src', 'components', 'AdminHomeManager.jsx'), adminJsx);
console.log('AdminHomeManager.jsx updated.');
