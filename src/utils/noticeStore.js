const STORAGE_KEY = 'naum_notices_v1';

const DEFAULT_NOTICES = [
  {
    id: "4", category: '공지',
    title: '야간진료 안내 (매주 월·화·목·금 오후 8시까지)',
    date: '2026.09.08', author: '관리자',
    image: '/images/notices/notice_night.jpg',
    hidden: false,
    content: '바쁘신 직장인, 학생 분들을 위해 야간 진료를 시행합니다.\n\n편하신 시간에 오셔서 여유롭게 치료 받으세요!\n\n■ 야간진료 요일: 매주 월, 화, 목, 금\n■ 야간진료 시간: 오후 8시까지 (접수 마감 7시 30분)\n\n감사합니다.'
  },
  {
    id: "3", category: '공지',
    title: '9월 원장님별 진료일정 안내 (추석 연휴 포함)',
    date: '2026.09.05', author: '관리자',
    image: '/images/notices/notice_schedule.jpg',
    hidden: false,
    content: '9월 원장님별 진료일정을 안내해 드립니다.\n\n월, 화, 목, 금요일은 저녁 8시까지 야간진료를 시행합니다.\n원장님별 세부 일정은 첨부된 이미지를 참고해 주시기 바랍니다.\n\n■ 추석 연휴 진료 안내\n- 9월 24일(목), 25일(금), 26일(토) 휴진\n\n진료 예약 및 내원 시 참고 부탁드립니다.'
  },
  {
    id: "2", category: '공지',
    title: '스포츠 손상 클리닉 V2 리뉴얼 오픈 안내',
    date: '2026.09.08', author: '관리자',
    image: '', hidden: false,
    content: '나음재활의학과 스포츠 손상 클리닉이 더욱 업그레이드된 시스템으로 V2 리뉴얼 오픈했습니다.\n\n엘리트 스포츠 선수부터 생활 체육인까지, 더욱 정밀하고 전문화된 재활 시스템을 만나보세요.'
  },
  {
    id: "1", category: '이벤트',
    title: '개원 기념 맞춤 수액 할인 이벤트 안내',
    date: '2026.09.01', author: '관리자',
    image: '', hidden: false,
    content: '나음재활의학과 개원을 기념하여 한시적으로 맞춤 수액 할인 이벤트를 진행합니다.\n\n자세한 비용과 종류는 내원 시 데스크에 문의해 주시면 친절히 안내해 드리겠습니다.'
  }
];

export function getNotices() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) { /* ignore */ }
  return DEFAULT_NOTICES;
}

export function saveNotices(notices) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
  } catch (e) { /* ignore */ }
}

export function addNotice(notice) {
  const notices = getNotices();
  const updated = [notice, ...notices];
  saveNotices(updated);
  return updated;
}

export function removeNotice(id) {
  const updated = getNotices().filter(n => n.id !== id);
  saveNotices(updated);
  return updated;
}

export function toggleHidden(id) {
  const updated = getNotices().map(n =>
    n.id === id ? { ...n, hidden: !n.hidden } : n
  );
  saveNotices(updated);
  return updated;
}

export function updateNotice(notice) {
  const updated = getNotices().map(n => n.id === notice.id ? notice : n);
  saveNotices(updated);
  return updated;
}

export function getNoticeById(id) {
  return getNotices().find(n => n.id === id) || null;
}
