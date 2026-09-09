const fs = require('fs');
const path = require('path');

const adminPath = path.join(__dirname, 'src/components/AdminHomeManager.jsx');
const appPath = path.join(__dirname, 'src/App.jsx');
const cmsPath = path.join(__dirname, 'src/hooks/useCMS.js');

let adminCode = fs.readFileSync(adminPath, 'utf8');

// 1. Rename tabs and keys
adminCode = adminCode.replace(/cms_pastorSection/g, 'cms_principlesSection');
adminCode = adminCode.replace(/pastorSection/g, 'principlesSection');
adminCode = adminCode.replace(/setPastorSection/g, 'setPrinciplesSection');
adminCode = adminCode.replace(/updatePastorSection/g, 'updatePrinciplesSection');
adminCode = adminCode.replace(/DEFAULT_PASTOR_SECTION/g, 'DEFAULT_PRINCIPLES');

adminCode = adminCode.replace(/cms_worshipSection/g, 'cms_clinicHoursSection');
adminCode = adminCode.replace(/worshipSection/g, 'clinicHoursSection');
adminCode = adminCode.replace(/setWorshipSection/g, 'setClinicHoursSection');
adminCode = adminCode.replace(/updateWorshipSection/g, 'updateClinicHoursSection');
adminCode = adminCode.replace(/DEFAULT_WORSHIP_SECTION/g, 'DEFAULT_CLINIC_HOURS');

// 2. Replace tab labels
adminCode = adminCode.replace(
  /{ id: 'quick', label: '표어 및 바로가기', icon: <LinkIcon size={18} \/> }/g,
  `{ id: 'quick', label: '슬로건 및 퀵메뉴', icon: <LinkIcon size={18} /> }`
);
adminCode = adminCode.replace(
  /{ id: 'worship', label: '예배시간 안내', icon: <Clock size={18} \/> }/g,
  `{ id: 'worship', label: '진료시간 안내', icon: <Clock size={18} /> }`
);
adminCode = adminCode.replace(
  /{ id: 'pastor', label: '담임목사 인사말', icon: <MessageSquare size={18} \/> }/g,
  `{ id: 'pastor', label: '3대 원칙 및 진료철학', icon: <MessageSquare size={18} /> }`
);

// 3. Replace DEFAULT blocks with hospitalData equivalents
// We will replace DEFAULT_HERO_SLIDES, DEFAULT_QUICK_SECTION, DEFAULT_QUICK_LINKS
const heroRegex = /const DEFAULT_HERO_SLIDES = \[[\s\S]*?\];/;
const newHero = `const DEFAULT_HERO_SLIDES = [
    {
      id: 1,
      image: "/hero-1-bg.webp",
      topText: "통증 없는 편안한 일상",
      main: "나음재활의학과의원",
      engText: "NAEUM REHABILITATION CLINIC",
      sub: "정확한 진단과 따뜻한 치료로\\n환자분들의 건강한 일상을 되찾아 드립니다",
      align: "center",
      zoomEffect: "zoom-in"
    },
    {
      id: 2,
      image: "/hero-2-bg.webp",
      main: "비수술적 척추관절\\n통증 치료",
      sub: "원인을 알 수 없는 만성 통증,\\n체계적인 재활 치료로 해결하세요",
      align: "center",
      zoomEffect: "zoom-in"
    },
    {
      id: 3,
      image: "/hero-3-bg.webp",
      main: "최고의 의료진과\\n최첨단 장비",
      sub: "풍부한 임상경험을 바탕으로\\n1:1 맞춤형 진료를 제공합니다",
      align: "center",
      zoomEffect: "zoom-in"
    }
  ];`;
adminCode = adminCode.replace(heroRegex, newHero);

const quickSecRegex = /const DEFAULT_QUICK_SECTION = \{[\s\S]*?\};/;
const newQuickSec = `const DEFAULT_QUICK_SECTION = {
    mottoYear: '스마트 의료 서비스',
    mottoMain: '환자를 최우선으로 생각하는\\n나음재활의학과의원',
    mottoSub: '신뢰할 수 있는 진료로 보답하겠습니다',
    bgImage: '',
    useBgImage: true
  };`;
adminCode = adminCode.replace(quickSecRegex, newQuickSec);

const quickLinksRegex = /const DEFAULT_QUICK_LINKS = \[[\s\S]*?\];/;
const newQuickLinks = `const DEFAULT_QUICK_LINKS = [
    { id: 1, title: '비수술 통증치료', path: '/pain/spine', bgImage: '/card1-opt.webp', icon: 'Link' },
    { id: 2, title: '관절·인대 치료', path: '/pain/joint', bgImage: '/card2-opt.webp', icon: 'Link' },
    { id: 3, title: '통증 교정 도수치료', path: '/rehab/manual', bgImage: '/card3-opt.webp', icon: 'Link' },
    { id: 4, title: '수술 후 재활치료', path: '/rehab/post-op', bgImage: '/card6-opt.webp', icon: 'Link' }
  ];`;
adminCode = adminCode.replace(quickLinksRegex, newQuickLinks);

const worshipSecRegex = /const DEFAULT_CLINIC_HOURS = \{[\s\S]*?\]\n  \};/;
const newWorshipSec = `const DEFAULT_CLINIC_HOURS = {
    tag: 'CLINIC HOURS',
    title: '진료 시간 안내',
    groups: [
      {
        title: '외래 진료',
        dotColor: 'bg-[#0284C7]',
        items: [
          { label: '평일', time: '오전 9시 - 오후 6시 30분', desc: '(접수마감 18:00)' },
          { label: '토요일', time: '오전 9시 - 오후 1시 30분', desc: '(접수마감 13:00)' },
        ]
      },
      {
        title: '점심 시간',
        dotColor: 'bg-[#F59E0B]',
        items: [
          { label: '평일', time: '오후 1시 - 오후 2시', desc: '진료 불가' },
          { label: '토요일', time: '점심시간 없이 진료', desc: '연속 진료' },
        ]
      },
      {
        title: '휴진 안내',
        dotColor: 'bg-red-500',
        items: [
          { label: '일요일/공휴일', time: '휴진', desc: '외래 진료 없음' },
        ]
      }
    ]
  };`;
adminCode = adminCode.replace(worshipSecRegex, newWorshipSec);

// Let's replace the tab UIs
adminCode = adminCode.replace(/표어 및 바로가기/g, '슬로건 및 퀵메뉴');
adminCode = adminCode.replace(/예배시간 안내/g, '진료시간 안내');
adminCode = adminCode.replace(/담임목사 인사말/g, '3대 원칙 및 진료철학');
adminCode = adminCode.replace(/올해의 표어 설정/g, '슬로건 및 모토 설정');
adminCode = adminCode.replace(/표어 연도 및 타이틀/g, '슬로건 상단 태그');
adminCode = adminCode.replace(/표어 내용 \(큰 글씨\)/g, '메인 슬로건 (큰 글씨)');
adminCode = adminCode.replace(/표어 서브 텍스트/g, '서브 슬로건');

fs.writeFileSync(adminPath, adminCode);


let appCode = fs.readFileSync(appPath, 'utf8');
appCode = appCode.replace(/cms_pastorSection/g, 'cms_principlesSection');
appCode = appCode.replace(/cms_worshipSection/g, 'cms_clinicHoursSection');
// Update App.jsx clinic hours section
appCode = appCode.replace(
  /const sections = useCMSData\('cms_sections', \{ clinicHours: true \}\);/g,
  `const clinicHours = useCMSData('cms_clinicHoursSection', C.CLINIC_HOURS_SECTION);\n  const sections = useCMSData('cms_sections', { clinicHours: true });`
);
appCode = appCode.replace(/C\.CLINIC_HOURS_SECTION/g, 'clinicHours');

fs.writeFileSync(appPath, appCode);


let cmsCode = fs.readFileSync(cmsPath, 'utf8');
cmsCode = cmsCode.replace(/cms_pastorSection/g, 'cms_principlesSection');
cmsCode = cmsCode.replace(/cms_worshipSection/g, 'cms_clinicHoursSection');
fs.writeFileSync(cmsPath, cmsCode);

console.log("Refactoring complete.");
