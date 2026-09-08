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
            "desc": "치료가 끝난 후에도 1:1 전담 물리치료사와 함께 통증 교정과 근육 밸런스를 맞춰, 통증의 근본 원인을 뿌리 뽑고 재발을 완벽히 차단합니다."
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
          { "title": "맞춤 통증 교정", "desc": "숙련된 도수치료사가 틀어진 척추와 관절의 밸런스를 되찾아 통증의 재발을 막습니다." }
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
            "image": "/card5-opt.webp"
          },
          {
            "tabName": "인대 강화",
            "title": "프롤로 주사 치료",
            "desc": "약해진 어깨 힘줄과 인대에 증식제를 투여하여 스스로 튼튼하게 재생되도록 돕습니다.",
            "image": "/hero-3-bg.webp"
          },
          {
            "tabName": "기능 회복",
            "title": "맞춤 재활 도수치료",
            "desc": "굳어진 어깨 관절의 가동 범위를 회복하고 주변 근육을 강화하여 재발을 방지합니다.",
            "image": "/card3-opt.webp"
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
  'pain/ultrasound': [
    {
      "id": "blk_ultra_hero_1",
      "type": "UltraHero",
      "data": {
        "mainCopy": "보이지 않던 통증의 뿌리를 찾다.",
        "subCopy": "감각에 의존하지 않고, 직접 보면서 치료합니다."
      }
    },
    {
      "id": "blk_ultra_features_1",
      "type": "UltraFeatures",
      "data": {
        "title": "왜 초음파 유도하 주사인가?",
        "features": [
          { "title": "정밀 타겟팅", "desc": "뼈, 근육, 신경, 혈관을 실시간으로 확인하며 오차율 0%에 도전합니다." },
          { "title": "안전성 극대화", "desc": "주변 정상 조직이나 신경 손상 위험을 차단하여 안전하게 치료합니다." },
          { "title": "높은 치료율", "desc": "정확한 위치에 적정량의 약물이 투여되어 1회 치료만으로도 높은 통증 감소 효과를 기대할 수 있습니다." }
        ]
      }
    },
    {
      "id": "blk_ultra_target_1",
      "type": "UltraTarget",
      "data": {
        "title": "머리부터 발끝까지",
        "targets": [
          { "part": "어깨", "title": "어깨 관절 질환", "desc": "오십견, 회전근개파열, 석회성건염 등 어깨 통증의 원인을 정확히 찾아 치료합니다." },
          { "part": "팔꿈치", "title": "엘보 및 수부 질환", "desc": "테니스엘보, 골프엘보, 손목터널증후군 등 미세한 힘줄과 신경 부위를 타겟팅합니다." },
          { "part": "무릎", "title": "무릎 및 족부 질환", "desc": "퇴행성 관절염, 연골 손상, 족저근막염 등 체중 부하가 많은 하지 관절을 회복시킵니다." }
        ]
      }
    },
    {
      "id": "blk_ultra_outro_1",
      "type": "UltraOutro",
      "data": {
        "title": "정확한 진단이\n정확한 치료를 만듭니다."
      }
    }
  ],
  'rehab/manual': [
    {
      "id": "blk_manual_hero_1",
      "type": "ManualHero",
      "data": {
        "mainCopy": "손끝에서 시작되는 척추의 바른 균형",
        "subCopy": "숙련된 치료사의 손길로 굳어진 근육을 풀고, 원인 모를 통증을 바로잡아 통증의 근본 원인을 해결하는 1:1 맞춤 치료입니다."
      }
    },
    {
      "id": "blk_manual_target_1",
      "type": "ManualTarget",
      "data": {
        "title": "이런 분들께 필요합니다",
        "targets": [
          { "title": "거북목 / 일자목", "desc": "스마트폰과 PC 사용으로 목과 어깨가 항상 뭉쳐있는 분" },
          { "title": "만성 통증", "desc": "목, 허리 디스크나 협착증으로 고생하시는 분" },
          { "title": "신체 불균형 및 통증", "desc": "골반이 틀어지거나 양쪽 어깨 높이가 달라 통증 관리가 필요한 분" },
          { "title": "수술 후 재활", "desc": "척추/관절 수술 후 굳어진 관절의 가동 범위를 회복해야 하는 분" }
        ]
      }
    },
    {
      "id": "blk_manual_process_1",
      "type": "ManualProcess",
      "data": {
        "title": "나음만의 4단계 도수치료 시스템",
        "steps": [
          { "title": "정밀 진단", "desc": "전문의의 X-ray 및 통증 분석을 통한 1:1 처방" },
          { "title": "근막 이완", "desc": "긴장되고 굳어진 근육과 근막을 부드럽게 이완" },
          { "title": "통증 교정", "desc": "척추와 관절의 미세한 틀어짐을 본래 자리로 회복" },
          { "title": "기능 강화", "desc": "약해진 심부 근육을 강화하여 통증 재발을 방지" }
        ]
      }
    },
    {
      "id": "blk_manual_outro_1",
      "type": "ManualOutro",
      "data": {
        "title": "통증 없는 몸이\n바른 일상을 만듭니다."
      }
    }
  ],
  'rehab/post-op': [
    {
      "id": "blk_postop_hero_1",
      "type": "PostOpHero",
      "data": {
        "mainCopy": "수술의 완성은 온전한 재활입니다.",
        "subCopy": "성공적인 수술 이후, 약해진 근력과 굳어진 관절을 체계적으로 회복시켜 예전의 빛나는 일상으로 돌려드립니다."
      }
    },
    {
      "id": "blk_postop_needs_1",
      "type": "PostOpNeeds",
      "data": {
        "title": "왜 수술 후 재활이 필수일까요?",
        "needs": [
          { "title": "가동 범위 회복", "desc": "수술 후 굳어버린 관절의 움직임을 정상 각도로 되돌립니다." },
          { "title": "근력 및 기능 강화", "desc": "수술 부위 주변의 약해진 근육을 강화하여 관절을 보호합니다." },
          { "title": "유착 및 후유증 방지", "desc": "조직이 엉겨 붙는 유착을 막고 만성 통증으로 이어지는 것을 예방합니다." }
        ]
      }
    },
    {
      "id": "blk_postop_types_1",
      "type": "PostOpTypes",
      "data": {
        "title": "모든 수술에 대한 해답",
        "types": [
          { 
            "category": "척추", 
            "items": [
              { "name": "디스크 수술 (추간판 제거술) 후", "desc": "수술로 인한 통증 완화 및 약해진 코어 근육을 집중 강화하여 재발을 방지합니다." },
              { "name": "척추 유합술 후", "desc": "뼈가 단단히 굳을 때까지 척추의 안정성을 유지하며 점진적으로 허리 근력을 키웁니다." },
              { "name": "척추관 협착증 수술 후", "desc": "보행 시 통증을 줄이고, 올바른 보행 패턴을 다시 학습하는 훈련을 진행합니다." },
              { "name": "인공디스크 치환술 후", "desc": "인공디스크가 잘 자리잡도록 주변 조직의 적응을 돕고 척추 유연성을 회복합니다." }
            ]
          },
          { 
            "category": "어깨", 
            "items": [
              { "name": "회전근개 봉합술 후", "desc": "수술 부위의 파열을 막으면서 점진적으로 어깨 관절 가동 범위를 회복시킵니다." },
              { "name": "어깨 인공관절 치환술 후", "desc": "새로운 관절에 적응하고 어깨 주변 근력을 강화하여 일상생활의 팔 움직임을 되찾습니다." },
              { "name": "오십견 (동결견) 수술 후", "desc": "관절낭 유리술 이후 다시 굳어지는 것을 막기 위한 집중적인 스트레칭을 시행합니다." },
              { "name": "어깨 탈구 (관절와순 봉합술) 후", "desc": "어깨 관절의 불안정성을 해소하고 재탈구를 방지하는 어깨 안정화 운동을 합니다." }
            ]
          },
          { 
            "category": "무릎 / 하지", 
            "items": [
              { "name": "십자인대 파열 재건술 후", "desc": "수술 직후 부종 감소부터 시작해 넙다리네갈래근(대퇴사두근) 근력을 회복하고 스포츠 복귀를 준비합니다." },
              { "name": "반월상 연골 봉합술 후", "desc": "연골 치유를 위해 일정 기간 체중 부하를 조절하며, 이후 점진적 무릎 굽힘 및 근력 운동을 진행합니다." },
              { "name": "무릎 인공관절 치환술 후", "desc": "관절이 굳기 전에 가동 범위를 확보하고 독립적인 보행이 가능하도록 돕습니다." },
              { "name": "아킬레스건 수술 후", "desc": "발목 가동 범위 제한 및 근력 약화를 막기 위해 시기별 체중 부하 및 종아리 근력 강화 운동을 합니다." }
            ]
          }
        ]
      }
    },
    {
      "id": "blk_postop_stages_1",
      "type": "PostOpStages",
      "data": {
        "title": "단계별 안심 회복 시스템",
        "stages": [
          { "title": "통증 조절기", "desc": "염증 및 붓기를 완화하고, 수술 부위 조직의 치유를 촉진하며 가벼운 수동적 관절 운동(CPM 등)을 시행합니다.", "bgImage": "/postop-stage1.webp" },
          { "title": "가동 범위 회복기", "desc": "부드러운 스트레칭과 능동 보조 운동을 통해 굳어진 관절의 가동 범위(ROM)를 정상 수준까지 확대합니다.", "bgImage": "/postop-stage2.webp" },
          { "title": "근력 강화기", "desc": "수술 부위 및 주변 약해진 근육을 집중적으로 단련하고, 점진적인 체중 부하 및 밸런스 훈련을 진행합니다.", "bgImage": "/postop-stage3.webp" },
          { "title": "일상 / 스포츠 복귀기", "desc": "고유수용성 감각 훈련과 실전 동작 훈련을 통해 안전하게 일상생활이나 스포츠 활동으로 복귀합니다.", "bgImage": "/postop-stage4.webp" }
        ]
      }
    },
    {
      "id": "blk_postop_outro_1",
      "type": "PostOpOutro",
      "data": {
        "title": "혼자서는 힘든 재활,\n나음이 끝까지 함께합니다."
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
  ],
  'special/sports': [
    {
      "id": "blk_sports_v2_hero_1",
      "type": "SportsV2Hero",
      "data": {
        "title": "다시 뛰는 당신을 위해,\n한계 없는 복귀를 선사합니다.",
        "desc": "단순한 통증 치료가 아닙니다. 부상 이전의 완벽한 퍼포먼스를 되찾아주는\n나음만의 프리미엄 스포츠 재활입니다.",
        "bgImage": "/sports-v2-bg.webp"
      }
    },
    {
      "id": "blk_sports_v2_problem_1",
      "type": "SportsV2Problem",
      "data": {
        "title": "일반 통증과 스포츠 손상의\n치료 목표는 다릅니다.",
        "desc": "단순히 일상생활이 가능할 정도로 아프지 않은 상태가 아니라, 스윙, 점프, 러닝 등 폭발적인 동작을 견뎌낼 수 있는 '퍼포먼스의 완벽한 회복'이 우리의 목표입니다.",
        "points": [
          { "title": "원인 파악", "desc": "과사용으로 인한 미세 손상 및 구조적 불균형 진단" },
          { "title": "목표 설정", "desc": "통증 완화를 넘어 폭발적 퍼포먼스 수행 능력 회복" },
          { "title": "재발 방지", "desc": "생체역학적 교정을 통한 부상 근본 원인 차단" },
          { "title": "RTP 최적화", "desc": "종목별 특수성을 고려한 복귀 시점 및 강도 설정" }
        ]
      }
    },
    {
      "id": "blk_sports_v2_philosophy_1",
      "type": "SportsV2Philosophy",
      "data": {
        "title": "일반적인 일상 복귀를 넘어,\n완벽한 스포츠 복귀(Return to Play)를 약속합니다."
      }
    },
    {
      "id": "blk_sports_v2_targets_1",
      "type": "SportsV2Targets",
      "data": {
        "title": "핵심 집중 치료 질환",
        "targets": [
          { "title": "골프/테니스 엘보", "desc": "팔꿈치 힘줄의 미세 파열 및 과사용 증후군", "sports": ["골프", "테니스", "배드민턴"] },
          { "title": "어깨 손상", "desc": "회전근개 파열 및 충돌증후군, 슬랩 병변", "sports": ["야구", "수영", "웨이트트레이닝"] },
          { "title": "무릎/발목 관절", "desc": "십자인대, 반월상연골 파열, 만성 발목 염좌", "sports": ["축구", "농구", "러닝"] },
          { "title": "족부 질환", "desc": "족저근막염, 아킬레스건염 등 발의 과부하로 인한 염증", "sports": ["마라톤", "등산", "축구"] }
        ]
      }
    },
    {
      "id": "blk_sports_v2_solutions_1",
      "type": "SportsV2Solutions",
      "data": {
        "title": "특화 치료 솔루션",
        "solutions": [
          { "title": "스포츠 전문 도수·운동치료", "desc": "단순히 굳은 근육을 푸는 것을 넘어, 생체역학(Biomechanics) 기반으로 손상된 관절의 가동 범위를 회복하고 코어 근력을 강화합니다." },
          { "title": "초정밀 재생 주사 (프롤로)", "desc": "고해상도 초음파를 이용하여 파열되고 늘어난 인대와 힘줄을 정확히 타겟팅, 조직 증식제를 주입하여 근본적인 재생을 유도합니다." },
          { "title": "고강도 체외충격파(ESWT)", "desc": "충격파 에너지를 병변 깊숙이 전달하여 만성 염증을 깨뜨리고 미세 혈류를 재건하여 회복 속도를 극대화합니다." }
        ]
      }
    },
    {
      "id": "blk_sports_v2_process_1",
      "type": "SportsV2Process",
      "data": {
        "title": "4단계 RTP 회복 시스템",
        "steps": [
          { "title": "통증 및 부종 제어", "desc": "급성기 통증과 염증을 빠르게 억제합니다." },
          { "title": "가동 범위(ROM) 회복", "desc": "관절의 굳어짐을 막고 유연성을 확보합니다." },
          { "title": "근력 및 밸런스 강화", "desc": "손상된 부위 주변 근력을 키워 안정성을 높입니다." },
          { "title": "스포츠 복귀 훈련", "desc": "종목별 특화 퍼포먼스 훈련으로 완벽한 복귀를 돕습니다." }
        ]
      }
    },
    {
      "id": "blk_sports_v2_outro_1",
      "type": "SportsV2Outro",
      "data": {
        "title": "당신의 가장 빛나는 필드를 위해,\n나음이 든든한 페이스메이커가 되겠습니다."
      }
    }
  ],
  'special/chronic': [
    {
      "id": "blk_neuro_hero_1",
      "type": "NeuroHero",
      "data": {
        "title": "끝나지 않는 통증의 사슬,\n나음이 끊어냅니다.",
        "desc": "어디를 가도 낫지 않던 지독한 신경통,\n이제 대학병원급 미세 신경 치료로 근본적인 평안을 되찾으세요.",
        "bgImage": "/neuro-bg.webp"
      }
    },
    {
      "id": "blk_neuro_empathy_1",
      "type": "NeuroEmpathy",
      "data": {
        "title": "당신을 괴롭히는 지독한 통증들",
        "targets": [
          { "title": "대상포진 후 신경통", "desc": "피부가 스치기만 해도 칼로 베는 듯한 극심한 고통" },
          { "title": "삼차신경통", "desc": "얼굴 한쪽이 번쩍거리며 전기에 감전된 듯 찌릿한 통증" },
          { "title": "척추수술 후 통증증후군", "desc": "수술 후에도 다리가 저리고 허리가 끊어질 듯한 만성 통증" },
          { "title": "복합부위통증증후군", "desc": "외상 후 불균형적인 통증과 부종, 피부색 변화" }
        ]
      }
    },
    {
      "id": "blk_neuro_philosophy_1",
      "type": "NeuroPhilosophy",
      "data": {
        "title": "진통제로 덮어두는 임시방편이 아닙니다.\n변성된 신경의 뿌리를 치료합니다."
      }
    },
    {
      "id": "blk_neuro_solutions_1",
      "type": "NeuroSolutions",
      "data": {
        "title": "최상위 비수술 시술 라인업",
        "solutions": [
          { "title": "초정밀 신경차단술", "desc": "1mm의 오차도 허용하지 않는 표적 신경 치료" },
          { "title": "고주파 신경 열응고술", "desc": "통증을 전달하는 신경만을 선택적으로 차단해 장기적인 효과 도모" },
          { "title": "신경 영양 주사 및 프롤로테라피", "desc": "손상된 신경 주변의 조직을 재생시키고 영양을 공급하여 회복력 극대화" }
        ]
      }
    },
    {
      "id": "blk_neuro_process_1",
      "type": "NeuroProcess",
      "data": {
        "title": "3단계 신경 리셋 프로세스",
        "steps": [
          { "title": "정확한 원인 진단", "desc": "미세한 신경 손상 부위까지 찾아내는 초음파 정밀 진단" },
          { "title": "통증 및 염증 제어", "desc": "통증 신호를 차단하고 과흥분된 신경의 스위치를 끄는 처치" },
          { "title": "신경 세포 재생", "desc": "신경막 회복을 돕는 수액 요법 및 심부조직 재생 치료" }
        ]
      }
    },
    {
      "id": "blk_neuro_outro_1",
      "type": "NeuroOutro",
      "data": {
        "title": "포기하지 마세요.\n통증 없는 평범한 아침을 돌려드리겠습니다."
      }
    }
  ],
  'special/iv': [
    {
      "id": "blk_iv_hero_1",
      "type": "IVHero",
      "data": {
        "title": "내 몸이 깨어나는 시간,\n1:1 맞춤 영양 설계",
        "desc": "단순한 피로 회복을 넘어, 근본적인 세포 재생과 면역력 강화를 위한\n나음만의 프리미엄 수액 치료입니다.",
        "bgImage": "/iv-bg.webp"
      }
    },
    {
      "id": "blk_iv_problem_1",
      "type": "IVProblem",
      "data": {
        "title": "잘 낫지 않는 만성 통증,\n진짜 원인은 세포의 영양 결핍일 수 있습니다.",
        "desc": "면역 저하, 만성 피로, 수술 후 체력 저하는 신체의 회복력을 무너뜨려 근골격계 통증의 악순환을 만듭니다. 겉으로 드러난 통증만을 쫓는 것이 아니라, 몸속 세포부터 다시 세우는 것이 진정한 재활의 완성입니다."
      }
    },
    {
      "id": "blk_iv_synergy_1",
      "type": "IVSynergy",
      "data": {
        "title": "재활 치료와 수액의 강력한 시너지",
        "benefits": [
          { "title": "염증의 빠른 배출", "desc": "혈관을 통해 직접 투여된 고농도 영양분이 체내 염증 물질을 빠르게 해독하고 배출합니다." },
          { "title": "즉각적인 재생 물질 공급", "desc": "손상된 인대, 건, 신경에 필수적인 비타민과 미네랄을 공급하여 자연 치유력을 극대화합니다." },
          { "title": "회복(리커버리) 속도 가속화", "desc": "도수치료 및 수술 후 저하된 체력을 끌어올려 재활 치료의 효과를 배가시킵니다." }
        ]
      }
    },
    {
      "id": "blk_iv_lineup_1",
      "type": "IVLineup",
      "data": {
        "title": "프리미엄 수액 라인업",
        "lineup": [
          { "tag": "활력/피로", "title": "마이어스 칵테일", "desc": "만성 피로 증후군 및 면역력 급감 개선", "ingredients": ["비타민C", "마그네슘", "비타민B군"] },
          { "tag": "신경/관절", "title": "신경 재생 수액", "desc": "대상포진, 척추/관절 통증 환자의 신경 염증 치료", "ingredients": ["알파리포산", "비타민D", "은행잎추출물"] },
          { "tag": "수술 회복", "title": "포스트옵(Post-Op) 수액", "desc": "근골격계 수술 후 조직 재생 및 체력 보충", "ingredients": ["고농도 아미노산", "단백질", "미네랄"] },
          { "tag": "항산화/안티에이징", "title": "프리미엄 항산화", "desc": "항노화, 갱년기 극복 및 강력한 체질 개선", "ingredients": ["태반", "글루타치온", "셀레늄"] }
        ]
      }
    },
    {
      "id": "blk_iv_process_1",
      "type": "IVProcess",
      "data": {
        "title": "개인 맞춤 처방 시스템",
        "steps": [
          { "title": "정밀 진단", "desc": "체성분 및 증상 정밀 진단" },
          { "title": "1:1 맞춤 처방", "desc": "전문의의 1:1 맞춤 영양 배합" },
          { "title": "안전한 투여", "desc": "숙련된 간호팀의 프라이빗 수액 투여" },
          { "title": "지속 관리", "desc": "치료 경과 추적 및 성분 재조정" }
        ]
      }
    },
    {
      "id": "blk_iv_facility_1",
      "type": "IVFacility",
      "data": {
        "title": "치료의 질은 쉬는 공간에서 완성됩니다.\n최고급 VIP 1인실에서 누리는 온전한 휴식"
      }
    },
    {
      "id": "blk_iv_outro_1",
      "type": "IVOutro",
      "data": {
        "title": "지친 당신의 세포에\n프리미엄 휴식을 선사합니다."
      }
    }
  ],
  'community/notice': [
    {
      "id": "blk_comm_hero_1",
      "type": "CommunityHero",
      "data": {
        "title": "공지사항",
        "desc": "나음재활의학과의 다양한 소식과 진료 일정을 전해드립니다."
      }
    },
    {
      "id": "blk_comm_notice_1",
      "type": "CommunityNotice",
      "data": {
        "notices": [
          { "category": "이벤트", "title": "개원 기념 맞춤 수액 할인 이벤트 안내", "date": "2026.09.08", "author": "관리자" },
          { "category": "공지", "title": "스포츠 손상 클리닉 V2 리뉴얼 오픈 안내", "date": "2026.09.08", "author": "관리자" },
          { "category": "휴진", "title": "추석 연휴 진료 안내 (연휴 중 하루 정상진료)", "date": "2026.09.05", "author": "관리자" },
          { "category": "공지", "title": "나음재활의학과의원 공식 홈페이지 오픈", "date": "2026.09.01", "author": "관리자" }
        ]
      }
    }
  ],
  'community/non-covered': [
    {
      "id": "blk_comm_hero_2",
      "type": "CommunityHero",
      "data": {
        "title": "비급여 고지",
        "desc": "환자분들의 알 권리를 보장하고 투명한 진료를 약속합니다."
      }
    },
    {
      "id": "blk_comm_noncovered_1",
      "type": "CommunityNonCovered",
      "data": {
        "title": "비급여 진료비 안내",
        "desc": "의료법 제45조 및 동법 시행규칙 제42조의 2에 의거하여 비급여 진료비용을 고지합니다.",
        "sections": [
          {
            "title": "비급여 진료비용",
            "items": [
              { "midClass": "이학요법료", "subClass": "도수치료", "itemCode": "MZ007", "itemName": "도수치료(40분)", "type": "일반", "price": "120000", "minPrice": "120000", "maxPrice": "120000", "materialIncluded": "포함", "medicineIncluded": "미포함", "note": "근골격계 통증, 체형교정", "lastUpdated": "2026.09.01" },
              { "midClass": "이학요법료", "subClass": "체외충격파", "itemCode": "MZ012", "itemName": "체외충격파(집중형)", "type": "일반", "price": "90000", "minPrice": "90000", "maxPrice": "90000", "materialIncluded": "포함", "medicineIncluded": "미포함", "note": "1부위 당 1회 (Wolf/Piezo)", "lastUpdated": "2026.09.01" },
              { "midClass": "주사료", "subClass": "증식치료", "itemCode": "MZ008", "itemName": "프롤로테라피", "type": "초음파 유도", "price": "80000", "minPrice": "80000", "maxPrice": "80000", "materialIncluded": "포함", "medicineIncluded": "포함", "note": "인대/힘줄 조직 재생 목적", "lastUpdated": "2026.09.01" },
              { "midClass": "초음파검사료", "subClass": "초음파", "itemCode": "EB451", "itemName": "근골격계 초음파", "type": "진단용", "price": "80000", "minPrice": "80000", "maxPrice": "80000", "materialIncluded": "포함", "medicineIncluded": "미포함", "note": "관절, 인대 등 세부 정밀 진단", "lastUpdated": "2026.09.01" }
            ]
          },
          {
            "title": "치료재료대",
            "items": [
              { "midClass": "치료재료대", "subClass": "기타재료", "itemCode": "BM001", "itemName": "부목(반기브스)", "type": "재료대", "price": "30000", "minPrice": "30000", "maxPrice": "50000", "materialIncluded": "해당없음", "medicineIncluded": "해당없음", "note": "부위별 상이", "lastUpdated": "2026.09.01" },
              { "midClass": "치료재료대", "subClass": "주사기", "itemCode": "SY001", "itemName": "1회용 주사기", "type": "재료대", "price": "1000", "minPrice": "1000", "maxPrice": "1000", "materialIncluded": "해당없음", "medicineIncluded": "해당없음", "note": "비급여 시", "lastUpdated": "2026.09.01" }
            ]
          },
          {
            "title": "수액 영양제",
            "items": [
              { "midClass": "주사료", "subClass": "수액치료", "itemCode": "IV001", "itemName": "마늘주사(푸르설타민)", "type": "영양수액", "price": "50000", "minPrice": "50000", "maxPrice": "50000", "materialIncluded": "포함", "medicineIncluded": "포함", "note": "만성 피로 회복 및 활력 증진", "lastUpdated": "2026.09.01" },
              { "midClass": "주사료", "subClass": "수액치료", "itemCode": "IV002", "itemName": "백옥주사(글루타치온)", "type": "영양수액", "price": "60000", "minPrice": "60000", "maxPrice": "60000", "materialIncluded": "포함", "medicineIncluded": "포함", "note": "항산화, 간 기능 개선", "lastUpdated": "2026.09.01" }
            ]
          },
          {
            "title": "제증명 수수료",
            "items": [
              { "midClass": "제증명수수료", "subClass": "진단서", "itemCode": "C001", "itemName": "일반진단서", "type": "서류발급", "price": "20000", "minPrice": "20000", "maxPrice": "20000", "materialIncluded": "해당없음", "medicineIncluded": "해당없음", "note": "국문 기준", "lastUpdated": "2026.09.01" },
              { "midClass": "제증명수수료", "subClass": "진료기록사본", "itemCode": "C002", "itemName": "진료기록부 사본(1~5매)", "type": "서류발급", "price": "1000", "minPrice": "1000", "maxPrice": "1000", "materialIncluded": "해당없음", "medicineIncluded": "해당없음", "note": "1매당", "lastUpdated": "2026.09.01" }
            ]
          }
        ]
      }
    }
  ]
};
