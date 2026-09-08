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
      "id": "blk_sports_hero_1",
      "type": "HeroSection",
      "data": {
        "title": "스포츠 손상 클리닉",
        "desc": "다시 뛰는 당신을 위해,\n나음이 완벽한 복귀를 돕습니다.",
        "bgImage": "/sports-bg.webp"
      }
    },
    {
      "id": "blk_sports_target_1",
      "type": "ManualTarget",
      "data": {
        "title": "이런 증상이 있다면 치료가 필요합니다",
        "targets": [
          { "title": "골프/테니스 엘보", "desc": "팔꿈치 바깥쪽이나 안쪽에 찌릿한 통증이 발생한 분" },
          { "title": "회전근개 및 어깨 손상", "desc": "스윙 동작이나 무거운 물건을 들 때 어깨가 아픈 분" },
          { "title": "무릎/발목 염좌 및 인대 손상", "desc": "러닝, 축구, 등산 중 관절을 삐끗하여 붓고 아픈 분" },
          { "title": "족저근막염 및 아킬레스건염", "desc": "아침에 첫 발을 디딜 때 발바닥이나 발뒤꿈치가 아픈 분" }
        ]
      }
    },
    {
      "id": "blk_sports_process_1",
      "type": "ManualProcess",
      "data": {
        "title": "스포츠 특화 치료 프로세스",
        "steps": [
          { "title": "정확한 원인 진단", "desc": "초음파 및 X-ray를 통해 인대, 건, 근육의 미세한 손상 파악" },
          { "title": "급성기 염증 제어", "desc": "체외충격파, 주사치료, 고주파 치료로 빠른 통증 감소" },
          { "title": "조직 재생 유도", "desc": "손상된 부위에 혈류를 공급하여 세포 단위의 근본적 재생 촉진" },
          { "title": "퍼포먼스 회복", "desc": "스포츠 도수치료 및 운동 처방으로 안전한 복귀 지원" }
        ]
      }
    },
    {
      "id": "blk_sports_outro_1",
      "type": "ManualOutro",
      "data": {
        "title": "단순한 통증 완화를 넘어\n안전한 스포츠 복귀(Return to Play)를 약속합니다."
      }
    }
  ]
};
