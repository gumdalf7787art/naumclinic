// src/data/pageTemplates.js
// 이 파일은 AI가 생성한 아름다운 디자인 블록들의 기본 템플릿을 저장합니다.
// 데이터베이스에 내용이 없거나 사용자가 템플릿을 불러오기를 원할 때 사용됩니다.

export const PAGE_TEMPLATES = {
  'about/vision': [
    {
      "id": "blk1",
      "type": "VisionHero",
      "data": {
        "title": "평화교회 비전과 목표",
        "slogan": "예수 그리스도의 사랑으로\n사람을 세우고, 세상을 섬기는 교회",
        "paragraphs": [
          "평화교회는 예수 그리스도를 삶의 유일한 길로 고백하며,\n말씀과 기도 위에 굳게 서서 하나님의 사랑을 세상 가운데 나누는 교회를 꿈꿉니다.",
          "교회 안에서만 머무르는 신앙이 아니라\n가정과 일터, 이웃과 지역사회 속에서 그리스도의 사랑을 실천하며,\n상처받은 이들을 품고 소외된 이들과 함께하는 것이 우리의 사명입니다.",
          "한 사람의 변화가 한 가정을 변화시키고,\n한 가정의 변화가 지역사회를 변화시키며,\n그 변화가 세상을 향한 하나님의 사랑으로 이어지기를 소망합니다.",
          "평화교회는 모든 세대가 믿음 안에서 함께 성장하고\n세상 속에서 복음의 빛을 밝히는 **건강하고 따뜻한 신앙공동체**를 세워가겠습니다."
        ]
      }
    },
    {
      "id": "blk2",
      "type": "CoreValues",
      "data": {
        "title": "우리가 세워가는 교회",
        "values": [
          { "num": "01", "title": "말씀 위에 바로 서는 교회", "desc": "하나님의 말씀을 신앙과 삶의 중심에 두고, 말씀을 배우고 묵상하며 삶으로 실천하는 성도를 세워갑니다.", "icon": "BookOpen" },
          { "num": "02", "title": "기도하는 교회", "desc": "기도를 통해 하나님의 뜻을 구하며 개인과 가정, 교회와 이웃, 그리고 세상을 위해 함께 기도하는 공동체가 됩니다.", "icon": "Flame" },
          { "num": "03", "title": "다음 세대를 세우는 교회", "desc": "어린이와 청소년, 청년들이 믿음 안에서 자신의 꿈과 사명을 발견하고 세상을 섬기는 그리스도인으로 성장하도록 돕습니다.", "icon": "Users" },
          { "num": "04", "title": "이웃을 사랑하고 섬기는 교회", "desc": "도움이 필요한 이웃과 소외된 이들에게 먼저 다가가 예수님의 사랑을 말이 아닌 삶과 행동으로 전합니다.", "icon": "Heart" },
          { "num": "05", "title": "세상에 복음을 전하는 교회", "desc": "지역사회를 넘어 국내외 선교와 이주민 사역에 동참하며 모든 민족과 세대를 향해 복음과 사랑을 나누는 교회가 됩니다.", "icon": "Globe" }
        ]
      }
    },
    {
      "id": "blk3",
      "type": "VisionGoals",
      "data": {
        "title": "우리의 목표",
        "goals": [
          { "title": "예배가 살아있는 교회", "desc": "하나님을 기쁘시게 하는 진실한 예배를 드립니다." },
          { "title": "말씀으로 성장하는 교회", "desc": "말씀을 배우고 삶으로 살아내는 성숙한 그리스도인을 세웁니다." },
          { "title": "기도로 하나 되는 교회", "desc": "서로를 위해 기도하며 사랑과 믿음으로 하나 되는 공동체를 만듭니다." },
          { "title": "다음 세대와 함께하는 교회", "desc": "다음 세대가 교회의 미래가 아니라 오늘의 교회로 함께 서도록 돕습니다." },
          { "title": "지역과 세상을 섬기는 교회", "desc": "교회의 문을 세상을 향해 열고 도움이 필요한 곳으로 먼저 찾아갑니다." }
        ]
      }
    },
    {
      "id": "blk4",
      "type": "VisionOutro",
      "data": {
        "slogan": "ONE WAY JESUS",
        "title": "오직 예수, 사랑으로 세상을 향하여",
        "paragraphs": [
          "평화교회는 예수 그리스도를 따라\n**예배하고, 배우고, 사랑하며, 섬기고, 전하는 교회**가 되겠습니다.",
          "그리고 우리를 통해\n한 사람이 살아나고, 한 가정이 회복되며,\n지역사회와 세상에 하나님의 평화가 흘러가기를 소망합니다."
        ],
        "logoText": "평화교회 · Peace Methodist Church"
      }
    }
  ],
  'about/pastor': [
    {
      "id": "blk_pastor_hero",
      "type": "PastorGreeting",
      "data": {
        "image": "/pastor-profile.jpg",
        "name": "장성진",
        "title": "담임목사",
        "history": [
          "감리교신학교 신학과 졸업<br>감리교신학교 대학원 졸업<br>평화감리교회 담임 (2016-현재)"
        ],
        "greetingPart1": "평화교회 홈페이지를 찾아주신 여러분을 주님의 이름으로 환영합니다.<br><br>평화교회를 섬기고 있는 담임목사 장성진입니다.<br>교회는 단순히 사람들이 모여 예배드리는 장소가 아니라, 하나님의 사랑을 배우고 그 사랑을 삶으로 살아내는 공동체라고 믿습니다.",
        "quoteText": "복음은 말에만 머무는 것이 아니라 한 사람의 삶 곁으로 다가가 함께 울고, 함께 기뻐하며, 함께 걸어가는 사랑이어야 한다는 것입니다.",
        "greetingPart2": "우리 교회가 예배의 기쁨이 살아 있는 교회, 말씀을 통해 삶의 방향을 발견하는 교회, 다음 세대가 믿음 안에서 꿈을 키우는 교회가 되기를 소망합니다.<br><br>누구든 편안한 마음으로 찾아오십시오. 함께 예배하고, 함께 말씀을 배우며, 서로의 삶을 나누면서 믿음의 길을 함께 걸어가고 싶습니다."
      }
    }
  ],
  'about/staff': [
    {
      "id": "blk_staff_1",
      "type": "StaffGrid",
      "data": {
        "title": "목회자",
        "staff": [
          { "role": "부목사", "name": "김목사", "department": "교구/행정", "image": "" },
          { "role": "전도사", "name": "이전도사", "department": "청년부/찬양", "image": "" },
          { "role": "전도사", "name": "박전도사", "department": "중고등부", "image": "" },
          { "role": "전도사", "name": "최전도사", "department": "아동부", "image": "" }
        ]
      }
    },
    {
      "id": "blk_staff_2",
      "type": "StaffGrid",
      "data": {
        "title": "시무장로",
        "staff": [
          { "role": "시무장로", "name": "최장로", "image": "" },
          { "role": "시무장로", "name": "정장로", "image": "" },
          { "role": "시무장로", "name": "강장로", "image": "" }
        ]
      }
    }
  ],
  'about/worship': [
    {
      "id": "blk_worship_1",
      "type": "HeadingText",
      "data": {
        "badge": "WORSHIP SCHEDULE",
        "title": "예배 및 모임 안내",
        "description": "평화교회의 예배와 모임에 여러분을 초대합니다."
      }
    },
    {
      "id": "blk_worship_2",
      "type": "WorshipSchedule",
      "data": {
        "title": "주일 예배",
        "schedules": [
          { "name": "1부 예배", "time": "오전 9:00", "location": "본당 (3층)", "description": "전통 예배 양식으로 드립니다." },
          { "name": "2부 예배", "time": "오전 11:00", "location": "본당 (3층)", "description": "현대적인 찬양과 함께하는 열린 예배입니다." },
          { "name": "오후 찬양예배", "time": "오후 2:00", "location": "본당 (3층)", "description": "다양한 주제의 특강과 찬양으로 채워집니다." }
        ]
      }
    },
    {
      "id": "blk_worship_3",
      "type": "WorshipSchedule",
      "data": {
        "title": "교회학교 예배",
        "schedules": [
          { "name": "아동부", "time": "오전 11:00", "location": "믿음홀 (2층)", "description": "유치부, 유년부, 초등부 통합 예배" },
          { "name": "중고등부", "time": "오전 11:00", "location": "소망홀 (2층)", "description": "청소년을 위한 맞춤형 예배와 분반 공부" },
          { "name": "청년부", "time": "오후 2:00", "location": "사랑홀 (지하 1층)", "description": "예배 후 소그룹 모임과 교제" }
        ]
      }
    },
    {
      "id": "blk_worship_4",
      "type": "WorshipSchedule",
      "data": {
        "title": "주중 모임",
        "schedules": [
          { "name": "새벽기도회", "time": "매일 오전 5:00", "location": "본당 (3층)", "description": "월~토요일 진행 (주일 제외)" },
          { "name": "수요예배", "time": "수요일 오후 7:30", "location": "본당 (3층)", "description": "말씀 강해와 뜨거운 기도의 시간" },
          { "name": "금요성령집회", "time": "금요일 오후 8:30", "location": "본당 (3층)", "description": "찬양과 치유, 성령의 임재를 구하는 집회" }
        ]
      }
    }
  ],
  'about/bulletin': [
    {
      "id": "blk_bulletin_1",
      "type": "HeadingText",
      "data": {
        "badge": "WEEKLY BULLETIN",
        "title": "교회 주보",
        "description": "평화교회의 매주 소식과 예배 순서를 확인하실 수 있습니다."
      }
    },
    {
      "id": "blk_bulletin_2",
      "type": "BulletinBoard",
      "data": {
        "title": "최신 주보",
        "bulletins": []
      }
    }
  ]
};
