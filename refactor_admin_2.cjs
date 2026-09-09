const fs = require('fs');
const path = require('path');

const adminPath = path.join(__dirname, 'src/components/AdminHomeManager.jsx');
let adminCode = fs.readFileSync(adminPath, 'utf8');

const principlesRegex = /const DEFAULT_PRINCIPLES = \{[\s\S]*?\};/;
const newPrinciples = `const DEFAULT_PRINCIPLES = {
    image: '/principles-bg.png',
    tag: 'CORE PRINCIPLES',
    title: '나음재활의학과의 3대 원칙',
    subTitle: '환자 중심의 바른 진료를 약속합니다',
    content: '01. 정확한 원인 분석과 맞춤 진단\\n02. 비수술적 보존 치료 우선\\n03. 끝까지 책임지는 재활 파트너',
    name: '나음재활의학과의원'
  };`;
adminCode = adminCode.replace(principlesRegex, newPrinciples);

const footerRegex = /const DEFAULT_FOOTER_SECTION = \{[\s\S]*?\];\n  \};/;
const newFooter = `const DEFAULT_FOOTER_SECTION = {
    logo: '/logo-full.png',
    description: '환자 중심의 맞춤형 진료를 약속합니다.\\n최상의 의료 서비스로 보답하는 나음재활의학과의원이 되겠습니다.',
    churchName: '나음재활의학과의원',
    repName: '나음',
    address: '경기도 안양시 만안구 안양로 249, 안양디오르나인 2BL 302호 (안양동)',
    phone: '031-445-7502',
    fax: '',
    email: 'contact@naeumclinic.com',
    copyright: 'Copyright © 2026 Naeum Clinic. All rights reserved.',
    links: [
      { label: '이용약관', path: '/policy/terms' },
      { label: '개인정보처리방침', path: '/policy/privacy' }
    ]
  };`;
adminCode = adminCode.replace(footerRegex, newFooter);

// Fix UI fields inside the Principles tab
adminCode = adminCode.replace(/인사말 제목/g, '섹션 제목');
adminCode = adminCode.replace(/인사말 부제목 \(선택\)/g, '섹션 부제목 (선택)');
adminCode = adminCode.replace(/인사말 내용/g, '본문 내용');
adminCode = adminCode.replace(/목사님 성함/g, '하단 강조 텍스트 (병원명 등)');

// Fix UI fields inside Footer tab
adminCode = adminCode.replace(/교회\(기관\)명/g, '병원(기관)명');
adminCode = adminCode.replace(/홍길동 목사/g, '홍길동 원장');

fs.writeFileSync(adminPath, adminCode);
console.log("Admin 2 refactoring complete.");
