// src/data/pageTemplates.js
// 이 파일은 AI가 생성한 아름다운 디자인 블록들의 기본 템플릿을 저장합니다.
// 데이터베이스에 내용이 없거나 사용자가 템플릿을 불러오기를 원할 때 사용됩니다.

export const PAGE_TEMPLATES = {
  'about/philosophy': [
    {
      "id": "blk_phil_hero",
      "type": "PhilosophyHero",
      "data": {
        "mainCopy": "통증을 지우고, 일상을 그리다.",
        "subCopy": "나음재활의학과의원은 단순히 증상을 가리지 않습니다.\n아픔의 근본적인 원인을 찾아내어 당신의 가장 건강했던 일상으로 되돌려 놓겠습니다."
      }
    },
    {
      "id": "blk_phil_greeting",
      "type": "PhilosophyGreeting",
      "data": {
        "image": "/doctor-profile.png",
        "quote": "환자의 아픔은 몸에만 머물지 않습니다.\n마음의 고통까지 헤아리는 것이 진짜 의사의 역할입니다.",
        "paragraphs": [
          "통증은 우리 몸이 보내는 절박한 구조 신호입니다. 이 신호를 진통제로 잠시 덮어두거나 무시한다면, 결국 더 큰 질환으로 이어질 수 있습니다.",
          "나음재활의학과의원은 모든 환자분들을 제 가족이라고 생각합니다. 꼼꼼하게 듣고, 첨단 장비로 정확하게 진단하며, 칼을 대지 않는 비수술적 보존 치료를 통해 몸이 스스로 낫는 힘을 길러드립니다.",
          "단순히 병을 고치는 병원이 아니라, 여러분의 남은 평생을 통증 없이 걷고 뛰게 해줄 **든든한 건강 주치의**가 되겠습니다."
        ],
        "signature": "대표원장 홍길동"
      }
    },
    {
      "id": "blk_phil_principles",
      "type": "PhilosophyPrinciples",
      "data": {
        "badge": "CORE PHILOSOPHY",
        "title": "나음의 3대 진료 철학",
        "principles": [
          {
            "icon": "Search",
            "title": "오차 없는 원인 규명",
            "desc": "대학병원급 하이엔드 장비를 통한 정확한 진단 없이는 바른 치료도 없습니다. 눈에 보이지 않는 신경과 근육의 미세한 손상까지 찾아냅니다."
          },
          {
            "icon": "Shield",
            "title": "자생력의 극대화",
            "desc": "불필요한 수술을 권하지 않습니다. 인체가 스스로 회복할 수 있는 가장 안전하고 효과적인 프리미엄 비수술 치료(주사/충격파 등)를 지향합니다."
          },
          {
            "icon": "Activity",
            "title": "재발 없는 일상 복귀",
            "desc": "치료가 끝난 후에도 1:1 전담 물리치료사와 함께 체형 교정과 근육 밸런스를 맞춰, 통증의 근본 원인을 뿌리 뽑고 재발을 완벽히 차단합니다."
          }
        ]
      }
    },
    {
      "id": "blk_phil_promise",
      "type": "PhilosophyPromise",
      "data": {
        "title": "당신의 가장 건강했던 순간으로\n되돌아가는 여정.",
        "desc": "수많은 치료 케이스와 압도적인 임상 경험으로 나음이 증명합니다."
      }
    },
    {
      "id": "blk_phil_cta",
      "type": "PhilosophyCTA",
      "data": {
        "title": "이제, 지긋지긋한 통증과 이별할 시간입니다.",
        "btn1Text": "진료 시간표 보기",
        "btn1Link": "/info/hours",
        "btn2Text": "카카오톡 상담",
        "btn2Link": "#"
      }
    }
  ],
  'about/doctor': [
    {
      "id": "blk_doctor_hero",
      "type": "PastorGreeting",
      "data": {
        "image": "/doctor-profile.png",
        "name": "홍길동",
        "title": "대표원장",
        "history": [
          "재활의학과 전문의<br>서울대학교 의과대학 졸업<br>서울대학교병원 재활의학과 전임의<br>대한재활의학회 정회원"
        ],
        "greetingPart1": "나음재활의학과의원을 찾아주신 여러분, 반갑습니다.<br><br>통증은 우리 몸이 보내는 중요한 신호입니다. 이 신호를 무시하거나 일시적으로만 가려서는 안 됩니다. 우리는 그 원인을 찾아 근본적으로 해결해야 합니다.",
        "quoteText": "환자의 입장에서 한 번 더 생각하고, 가족을 치료하는 마음으로 정성을 다하겠습니다.",
        "greetingPart2": "모든 치료는 정확한 진단에서 출발합니다. 첨단 장비와 세밀한 이학적 검사를 통해 통증의 원인을 파악하고, 개인의 상태에 맞는 최적의 비수술 치료를 시행합니다.<br><br>여러분의 든든한 건강 주치의로서 늘 함께하겠습니다."
      }
    }
  ],
  'about/facility': [
    {
      "id": "blk_facility_gallery",
      "type": "FacilityGallery",
      "data": {
        "title": "나음재활의학과의원 둘러보기",
        "desc": "환자분들의 편안하고 안전한 진료를 위해 대학병원급 시설과 쾌적한 환경을 갖추고 있습니다.",
        "images": [
          { "src": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200", "title": "넓고 쾌적한 로비" },
          { "src": "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200", "title": "최첨단 진료실" },
          { "src": "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200", "title": "프리미엄 수액실" },
          { "src": "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1200", "title": "1:1 맞춤 도수치료실" },
          { "src": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200", "title": "재활 운동실" },
          { "src": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200", "title": "프라이빗 회복실" },
          { "src": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1200", "title": "최신 X-ray 검사실" },
          { "src": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200", "title": "초음파 진단실" }
        ]
      }
    }
  ],
  'pain/spine': [
    {
      "id": "blk_spine_hero_1",
      "type": "SpineHero",
      "data": {
        "mainCopy": "수술 없이. 다시 곧게.",
        "subCopy": "지긋지긋한 목과 허리의 통증. 원인을 덮는 것이 아니라,\n근본을 바로잡는 나음만의 프리미엄 비수술 척추 솔루션."
      }
    },
    {
      "id": "blk_spine_symp_1",
      "type": "SpineSymptoms",
      "data": {
        "title": "척추가 보내는\n조용한 경고.",
        "desc": "아래 증상 중 하나라도 해당된다면,\n척추 건강의 적신호일 수 있습니다.",
        "symptoms": [
          { "title": "목부터 어깨, 팔까지 찌릿하게 저려온다." },
          { "title": "허리를 숙이거나 앉아있을 때 통증이 심해진다." },
          { "title": "아침에 일어날 때 허리가 뻣뻣하고 아프다." },
          { "title": "다리가 당기고 저려서 오래 걷기 힘들다." }
        ]
      }
    },
    {
      "id": "blk_spine_bento_1",
      "type": "SpineBento",
      "data": {
        "title": "오직 당신의 척추를 위한,\n완벽한 3단계 치료.",
        "cards": [
          { "title": "초정밀 진단", "desc": "대학병원급 X-ray 및 최신 초음파 장비를 통해 통증의 근본 원인을 아주 미세한 수준까지 찾아냅니다." },
          { "title": "특수 신경치료", "desc": "C-arm 유도하에 병변 부위에 정확하게 약물을 투여하여 즉각적으로 염증과 통증을 제거합니다." },
          { "title": "무중력 감압", "desc": "디스크 내부 압력을 낮추어 밀려난 디스크가 스스로 제자리로 돌아가도록 돕는 첨단 비수술 치료입니다." },
          { "title": "맞춤 체형 교정", "desc": "숙련된 도수치료사가 틀어진 척추와 관절의 밸런스를 되찾아 통증의 재발을 막습니다." }
        ]
      }
    },
    {
      "id": "blk_spine_outro_1",
      "type": "SpineOutro",
      "data": {
        "title": "건강했던 일상으로의 복귀.\n지금 나음재활의학과에서 시작하세요."
      }
    }
  ],
  'pain/joint': [
    {
      "id": "blk_joint_hero_1",
      "type": "JointHero",
      "data": {
        "mainCopy": "움직임의 자유를 되찾다.",
        "subCopy": "어깨를 움직이는 것조차 두렵다면, 이제 어깨 관절을 위한 맞춤형 회복 솔루션이 필요합니다."
      }
    },
    {
      "id": "blk_joint_symp_1",
      "type": "JointSymptoms",
      "data": {
        "title": "관절이 보내는 경고",
        "symptoms": [
          { "title": "오십견 (유착성 관절낭염): 어깨가 굳어 팔을 올리기 힘들고 야간통증이 심함" },
          { "title": "회전근개 파열: 팔을 들어올릴 때 특정 각도에서 통증이 발생하고 힘이 빠짐" },
          { "title": "석회성 건염: 갑작스럽게 극심한 통증이 발생해 응급실을 찾을 정도" },
          { "title": "어깨 충돌증후군: 팔을 머리 위로 올리거나 뒤로 젖힐 때 걸리는 느낌과 통증" }
        ]
      }
    },
    {
      "id": "blk_joint_sol_1",
      "type": "JointSolutions",
      "data": {
        "title": "맞춤형 회복 솔루션",
        "solutions": [
          {
            "tabName": "정밀 진단",
            "title": "정밀 초음파 진단",
            "desc": "어깨 관절과 인대의 손상 정도를 실시간으로 정확하게 파악하여 원인을 진단합니다.",
            "image": "/card4-opt.webp"
          },
          {
            "tabName": "염증 치료",
            "title": "체외충격파 (ESWT)",
            "desc": "강력한 파동을 병변 부위에 전달하여 염증을 제거하고 혈관 재생을 촉진합니다.",
            "image": "/eswt.webp"
          },
          {
            "tabName": "인대 강화",
            "title": "프롤로 주사 치료",
            "desc": "약해진 어깨 힘줄과 인대에 증식제를 투여하여 스스로 튼튼하게 재생되도록 돕습니다.",
            "image": "/prolo.webp"
          },
          {
            "tabName": "기능 회복",
            "title": "맞춤 재활 도수치료",
            "desc": "굳어진 어깨 관절의 가동 범위를 회복하고 주변 근육을 강화하여 재발을 방지합니다.",
            "image": "/rehab.webp"
          }
        ]
      }
    },
    {
      "id": "blk_joint_outro_1",
      "type": "JointOutro",
      "data": {
        "title": "다시 가벼워진 어깨로 맞이하는 내일."
      }
    }
  ],
  'about/location': [
    {
      id: 'loc-1',
      type: 'LocationBlock',
      data: {
        title: '오시는 길',
        desc: '나음재활의학과의원에 오시는 길을 상세히 안내해 드립니다.',
        mapPlaceholder: '지도 영역 (추후 연동)',
        address: {
          main: '서울 중랑구 봉화산로 120',
          sub: '(지번: 서울 중랑구 신내동 613)'
        },
        phone: '02-000-0000',
        transport: [
          {
            icon: 'train',
            title: '지하철 이용 시',
            details: [
              '1호선 평화역 3번 출구에서 도보 5분',
              '7호선 희망역 1번 출구에서 버스 환승'
            ]
          },
          {
            icon: 'bus',
            title: '버스 이용 시',
            details: [
              '간선버스: 100, 200, 300번',
              '지선버스: 1011, 2022번',
              '정류장 명: 신내동 주민센터 앞'
            ]
          },
          {
            icon: 'car',
            title: '자가용 이용 시',
            details: [
              '병원 건물 지하 주차장 이용 가능',
              '진료 시 무료 주차권 2시간 제공',
              '혼잡 시 인근 공영주차장 이용 권장'
            ]
          }
        ]
      }
    }
  ]
};
