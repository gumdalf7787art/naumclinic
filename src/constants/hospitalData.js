export const HOSPITAL_MENUS = [
  {
    id: 'about', name: '나음 소개', path: '/about/philosophy', is_active: 1,
    children: [
      { id: 'about-philosophy', name: '원장님 인사말', path: '/about/philosophy', is_active: 1 },
      { id: 'about-doctor', name: '의료진 소개', path: '/about/doctor', is_active: 1 },
      { id: 'about-facility', name: '병원 둘러보기', path: '/about/facility', is_active: 1 },
      { id: 'about-location', name: '오시는 길', path: '/about/location', is_active: 1 }
    ]
  },
  {
    id: 'pain', name: '비수술 통증 클리닉', path: '/pain/spine', is_active: 1,
    children: [
      { id: 'pain-spine', name: '목·허리 척추 클리닉', path: '/pain/spine', is_active: 1 },
      { id: 'pain-joint', name: '어깨·관절 클리닉', path: '/pain/joint', is_active: 1 },
      { id: 'pain-ultrasound', name: '초음파 유도하 주사치료', path: '/pain/ultrasound', is_active: 1 }
    ]
  },
  {
    id: 'rehab', name: '맞춤 재활 / 도수치료', path: '/rehab/manual', is_active: 1,
    children: [
      { id: 'rehab-manual', name: '통증 교정 도수치료', path: '/rehab/manual', is_active: 1 },
      { id: 'rehab-postop', name: '수술 후 재활치료', path: '/rehab/post-op', is_active: 1 }
    ]
  },
  {
    id: 'special', name: '나음 특화 클리닉', path: '/special/sports', is_active: 1,
    children: [
      { id: 'special-sports', name: '스포츠 손상 클리닉', path: '/special/sports', is_active: 1 },
      { id: 'special-chronic', name: '난치성 신경통 클리닉', path: '/special/chronic', is_active: 1 },
      { id: 'special-iv', name: '맞춤 수액·면역 클리닉', path: '/special/iv', is_active: 1 }
    ]
  },
  {
    id: 'community', name: '나음 커뮤니티', path: '/community/notice', is_active: 1,
    children: [
      { id: 'comm-notice', name: '공지사항', path: '/community/notice', is_active: 1 },
      { id: 'comm-noncovered', name: '비급여 고지', path: '/community/non-covered', is_active: 1 }
    ]
  }
];

export const HERO_SLIDES = [
  {
    id: 1,
    image: "/hero-1-bg.webp",
    topText: "통증 없는 편안한 일상",
    main: "나음재활의학과의원",
    engText: "NAEUM REHABILITATION CLINIC",
    sub: "정확한 진단과 따뜻한 치료로\n환자분들의 건강한 일상을 되찾아 드립니다",
    align: "center",
    zoomEffect: "zoom-in",
    features: [
      { top: "전문의 경력", bottom: "25년" },
      { top: "1:1 집중", bottom: "맞춤형 진료" },
      { top: "주말에도 편안하게", bottom: "토요일 진료" }
    ]
  },
  {
    id: 2,
    image: "/hero-2-bg.webp",
    main: "비수술적 척추관절\n통증 치료",
    sub: "원인을 알 수 없는 만성 통증,\n체계적인 재활 치료로 해결하세요",
    align: "center",
    zoomEffect: "zoom-in"
  },
  {
    id: 3,
    image: "/hero-3-bg.webp",
    main: "최고의 의료진과\n최첨단 장비",
    sub: "풍부한 임상경험을 바탕으로\n1:1 맞춤형 진료를 제공합니다",
    align: "center",
    zoomEffect: "zoom-in"
  }
];

export const QUICK_SECTION = {
  mottoYear: '스마트 의료 서비스',
  mottoMain: '환자를 최우선으로 생각하는\n나음재활의학과의원',
  mottoSub: '신뢰할 수 있는 진료로 보답하겠습니다',
  bgImage: '',
  useBgImage: true
};

export const QUICK_LINKS = [
  { id: 1, name: '지긋지긋한 목·허리 통증', tag: '비수술 통증치료', sub: '디스크, 협착증 등 근본적인 원인을 찾아 치료합니다.', path: '/pain/spine', image: '/card1-opt.webp' },
  { id: 2, name: '손목터널증후군 & 관절염', tag: '관절·인대 치료', sub: '초기 정확한 진단이 필요한 손목과 팔꿈치 통증.', path: '/pain/joint', image: '/card2-opt.webp' },
  { id: 3, name: '통증 교정 도수치료', tag: '1:1 집중 치료', sub: '틀어진 척추를 바로잡고 근육 밸런스를 회복시킵니다.', path: '/rehab/manual', image: '/card3-opt.webp' },
  { id: 4, name: '초음파 유도하 주사치료', tag: '프리미엄 진료', sub: '실시간 초음파 영상을 통해 병변에 정확히 투여합니다.', path: '/pain/ultrasound', image: '/card4-opt.webp' },
  { id: 5, name: '체외충격파 치료 (ESWT)', tag: '조직 재생 치료', sub: '강력한 파동으로 손상된 조직과 염증을 치료합니다.', path: '/rehab/shockwave', image: '/card5-opt.webp' },
  { id: 6, name: '수술 후 재활치료', tag: '일상 회복 프로그램', sub: '빠른 일상 복귀를 위한 맞춤형 단계별 재활 솔루션.', path: '/rehab/post-op', image: '/card6-opt.webp' }
];

export const MEDIA_SECTION = {
  bgImage: '/worship-bg.webp',
  tag: 'MEDICAL INFO',
  title: '건강 정보 영상',
  youtubeLink: 'https://www.youtube.com/@대재의사회TV',
  youtubeText: '유튜브 채널 바로가기'
};

export const CLINIC_HOURS_SECTION = {
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
};

export const THREE_PRINCIPLES = {
  image: '/principles-bg.png',
  tag: 'CORE PRINCIPLES',
  title: '나음재활의학과의 3대 원칙',
  subTitle: '환자 중심의 바른 진료를 약속합니다',
  principles: [
    {
      num: '01',
      title: '정확한 원인 분석과 맞춤 진단',
      desc: '통증의 겉모습이 아닌, 숨겨진 근본 원인을 과학적이고 정밀하게 찾아내어 환자 개인별 맞춤 진단을 내립니다.'
    },
    {
      num: '02',
      title: '비수술적 보존 치료 우선',
      desc: '불필요한 수술을 권하지 않습니다. 환자의 몸에 부담이 적은 비수술적 보존 치료를 최우선으로 시행하여 자연스러운 회복을 돕습니다.'
    },
    {
      num: '03',
      title: '끝까지 책임지는 재활 파트너',
      desc: '치료가 끝났다고 안심하지 않습니다. 통증 없는 일상으로 완벽히 복귀할 수 있도록 사후 관리와 재활까지 책임지고 함께합니다.'
    }
  ]
};

export const GALLERY_SECTION = {
  tag: 'FACILITIES & REVIEWS',
  title: '병원 소식 및 시설안내',
  emptyText: '아직 등록된 사진이 없습니다.',
  buttonText: '게시판 바로가기',
  buttonLink: '/community/notice'
};

export const LOCATION_SECTION = {
  tag: 'LOCATION',
  title: '오시는 길',
  address: '서울 중랑구 봉화산로 120',
  addressSub: '(지번: 서울 중랑구 신내동 613)',
  transport: {
    subway: { title: '지하철', desc: '1호선 평화역 3번 출구에서 도보 5분' },
    bus: { title: '버스', desc: '간선: 100, 200, 300\n지선: 1011, 2022' }
  },
  parking: {
    title: '주차 안내',
    desc: '병원 건물 지하 주차장 이용 가능 (진료 시 무료)',
    sub: '주차장이 혼잡할 수 있으니 가급적 대중교통 이용을 권장합니다.'
  }
};

export const FOOTER_SECTION = {
  logo: '/logo-full.png',
  description: '환자 중심의 맞춤형 진료를 약속합니다.\n최상의 의료 서비스로 보답하는 나음재활의학과의원이 되겠습니다.',
  clinicName: '나음재활의학과의원',
  repName: '나음',
  address: '서울 중랑구 봉화산로 120',
  phone: '02-000-0000',
  fax: '02-000-0001',
  email: 'contact@naeumclinic.com',
  copyright: 'Copyright © 2026 Naeum Clinic. All rights reserved.',
  links: [
    { label: '이용약관', path: '/policy/terms' },
    { label: '개인정보처리방침', path: '/policy/privacy' }
  ]
};
