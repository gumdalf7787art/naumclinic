import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCMSData, saveToServer, invalidateCMSCache } from '../hooks/useCMS';
import { Image as ImageIcon, Link as LinkIcon, Type, Plus, Trash2, Edit3, MoveUp, MoveDown, Save, MonitorPlay, MessageSquare, Megaphone, ToggleLeft, ToggleRight, Info, MapPin, Layout, AlignLeft, AlignCenter, AlignRight, ZoomIn, ZoomOut, MousePointer2, CheckCircle2, Loader2, Clock, FileText, PlayCircle } from 'lucide-react';

export default function AdminHomeManager() {
  const [activeTab, setActiveTab] = useState('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const saveTimeoutRef = useRef(null);

  const pendingSaves = useRef({});
  const triggerAutoSave = (key, value) => {
    // Only accept valid CMS keys (string starting with 'cms_')
    if (key && typeof key === 'string' && key.startsWith('cms_')) {
      pendingSaves.current[key] = value;
    }
    setIsSaving(true);
    setSaveError(false);
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        if (Object.keys(pendingSaves.current).length > 0) {
          const payload = Object.keys(pendingSaves.current).map(k => ({ id: k, value: pendingSaves.current[k] }));
          pendingSaves.current = {};
          const success = await saveToServer(payload);
          if (!success) {
            setSaveError(true);
          }
        }
      } catch (e) {
        console.error('[Admin] Save error:', e);
        setSaveError(true);
      } finally {
        setIsSaving(false);
      }
    }, 1000);
  };

  React.useEffect(() => {
    // Always fetch fresh data from server when admin page opens
    invalidateCMSCache();
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
  }, []);

  // Section Toggles
  const [sections, setSections] = useState(() => {
    const saved = localStorage.getItem('cms_sections');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return {
      hero: true,
      quick: true,
      worship: true,
      pastor: true,
      gallery: true,
      location: true,
      footer: true
    };
  });

  const toggleSection = (key) => {
    const newSections = { ...sections, [key]: !sections[key] };
    setSections(newSections);
    localStorage.setItem('cms_sections', JSON.stringify(newSections));
    window.dispatchEvent(new Event('cms_sections_updated'));
    triggerAutoSave('cms_sections', newSections);
  };

  const tabs = [
    { id: 'hero', label: '메인 슬라이드', icon: <MonitorPlay size={18} /> },
    { id: 'quick', label: '표어 및 바로가기', icon: <LinkIcon size={18} /> },
    { id: 'worship', label: '예배시간 안내', icon: <Clock size={18} /> },
    { id: 'pastor', label: '담임목사 인사말', icon: <MessageSquare size={18} /> },
    { id: 'location', label: '오시는길', icon: <MapPin size={18} /> },
    { id: 'footer', label: '풋터 설정', icon: <Layout size={18} /> },
  ];

  const DEFAULT_HERO_SLIDES = [
    {
      id: 1,
      image: "/hero-1-bg.webp",
      topText: "기독교대한감리회",
      main: "평화교회",
      engText: "PEACE METHODIST CHURCH",
      sub: "예수님의 사랑으로 사람을 세우고,\n세상을 섬기는 교회",
      align: "left",
      zoomEffect: "zoom-in"
    },
    {
      id: 2,
      image: "/hero-2-bg.webp",
      main: "말씀이 삶이 되는\n은혜의 예배",
      sub: "진리와 성령으로 드리는\n참된 예배의 자리",
      align: "left",
      zoomEffect: "zoom-in"
    },
    {
      id: 3,
      image: "/hero-3-bg.webp",
      main: "세상을 섬기는\n사랑의 공동체",
      sub: "이웃과 함께하며\n세상의 빛과 소금의 역할을 다합니다",
      align: "left",
      zoomEffect: "zoom-in"
    },
    {
      id: 4,
      image: "/hero4.jpg",
      main: "",
      sub: "",
      align: "left",
      zoomEffect: "none",
      noDim: true
    }
  ];

  const [heroSlides, setHeroSlides] = useState(() => {
    const saved = localStorage.getItem('cms_heroSlides');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_HERO_SLIDES;
  });

  const updateHeroSlide = (id, field, value) => {
    const newSlides = heroSlides.map(slide => 
      slide.id === id ? { ...slide, [field]: value } : slide
    );
    setHeroSlides(newSlides);
    localStorage.setItem('cms_heroSlides', JSON.stringify(newSlides));
    window.dispatchEvent(new Event('cms_hero_updated'));
    triggerAutoSave('cms_heroSlides', newSlides);
  };

  const processAndUploadImage = (file, callback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        const MAX_WIDTH = 1920;
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const optimizedDataUrl = canvas.toDataURL('image/webp', 0.8);
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
  };

  const handleHeroImageUpload = (id, e) => {
    processAndUploadImage(e.target.files[0], (optimizedDataUrl) => {
      updateHeroSlide(id, 'image', optimizedDataUrl);
    });
  };

  const handleQuickBgUpload = (e) => {
    processAndUploadImage(e.target.files[0], (optimizedDataUrl) => {
      updateQuickSection('bgImage', optimizedDataUrl);
    });
  };

  const handleQuickLinkImageUpload = (id, e) => {
    processAndUploadImage(e.target.files[0], (optimizedDataUrl) => {
      updateQuickLink(id, 'bgImage', optimizedDataUrl);
    });
  };

  const handleQuickLinkIconUpload = (id, e) => {
    processAndUploadImage(e.target.files[0], (optimizedDataUrl) => {
      updateQuickLink(id, 'customIcon', optimizedDataUrl);
    });
  };

  const handleQuickLinkIconReset = (id, e) => {
    e.preventDefault();
    updateQuickLink(id, 'customIcon', null);
  };

  const DEFAULT_QUICK_SECTION = {
    mottoYear: '2026년 표어',
    mottoMain: '주 안에서 하나 되는 평화교회',
    mottoSub: '평화교회에 오신 여러분을 환영합니다',
    bgImage: '',
    useBgImage: true
  };

  const DEFAULT_QUICK_LINKS = [
    { id: 1, title: '예배안내', path: '/about/worship', bgImage: '/hero-2-bg.webp', icon: 'Clock' },
    { id: 2, title: '주보', path: '/about/bulletin', bgImage: '/korean-bible-bg.webp', icon: 'FileText' },
    { id: 3, title: '유튜브채널', path: '/worship/word', bgImage: '/hero-3-bg.webp', icon: 'PlayCircle' },
    { id: 4, title: '오시는길', path: '/about/location', bgImage: '/hero-1-bg.webp', icon: 'MapPin' }
  ];

  const [quickSection, setQuickSection] = useState(() => {
    const saved = localStorage.getItem('cms_quickSection');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return DEFAULT_QUICK_SECTION;
  });

  const [quickLinks, setQuickLinks] = useState(() => {
    const saved = localStorage.getItem('cms_quickLinks');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return DEFAULT_QUICK_LINKS;
  });

  const updateQuickSection = (field, value) => {
    const newSec = { ...quickSection, [field]: value };
    setQuickSection(newSec);
    localStorage.setItem('cms_quickSection', JSON.stringify(newSec));
    window.dispatchEvent(new Event('cms_quick_updated'));
    triggerAutoSave('cms_quickSection', newSec);
  };

  const updateQuickLink = (id, field, value) => {
    const newLinks = quickLinks.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    );
    setQuickLinks(newLinks);
    localStorage.setItem('cms_quickLinks', JSON.stringify(newLinks));
    window.dispatchEvent(new Event('cms_quick_updated'));
    triggerAutoSave('cms_quickLinks', newLinks);
  };

  const DEFAULT_PASTOR_SECTION = {
    image: '/pastor-bg.png',
    title: '평화 교회에 오신것을 환영합니다.',
    subTitle: '하나님의 사랑과 은혜가 충만한 곳',
    content: '어떠한 어려움 속에서도 믿음의 자리를 지키며 주님의 길을 걷는 교회\n점점 혼탁해져가는 이 시대에 진리를 전하며 거룩함을 세워가는 교회\n주님의 소유된 백성들을 거룩한 제사장으로 세워 이땅에 하나님의 나라를 이루어가는 교회',
    name: '장 성 진'
  };

  const [pastorSection, setPastorSection] = useState(() => {
    const saved = localStorage.getItem('cms_pastorSection');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return DEFAULT_PASTOR_SECTION;
  });

  const updatePastorSection = (field, value) => {
    const newSec = { ...pastorSection, [field]: value };
    setPastorSection(newSec);
    localStorage.setItem('cms_pastorSection', JSON.stringify(newSec));
    window.dispatchEvent(new Event('cms_pastor_updated'));
    triggerAutoSave('cms_pastorSection', newSec);
  };

  const handlePastorImageUpload = (e) => {
    processAndUploadImage(e.target.files[0], (optimizedDataUrl) => {
      updatePastorSection('image', optimizedDataUrl);
    });
  };

  const DEFAULT_FOOTER_SECTION = {
    logo: '/logo.jpg',
    description: '하나님의 사랑과 은혜가 넘치는 진정한 쉼터\n세상의 빛과 소금이 되는 평화교회입니다.',
    churchName: '기독교대한감리회 평화교회',
    repName: '',
    address: '서울 중랑구 봉화산로 120',
    phone: '02-000-0000',
    fax: '',
    email: 'peace@peacechurch.com',
    copyright: 'Copyright © 2026 Peace Church. All rights reserved.'
  };

  const [footerSection, setFooterSection] = useState(() => {
    const saved = localStorage.getItem('cms_footerSection');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return DEFAULT_FOOTER_SECTION;
  });

  const updateFooterSection = (field, value) => {
    const newSec = { ...footerSection, [field]: value };
    setFooterSection(newSec);
    localStorage.setItem('cms_footerSection', JSON.stringify(newSec));
    window.dispatchEvent(new Event('cms_footer_updated'));
    triggerAutoSave('cms_footerSection', newSec);
  };

  const handleFooterLogoUpload = (e) => {
    processAndUploadImage(e.target.files[0], (optimizedDataUrl) => {
      updateFooterSection('logo', optimizedDataUrl);
    });
  };

  const [locationGroups, setLocationGroups] = useState([
    {
      id: 'contact',
      title: '연락처',
      items: [
        { id: 'c1', label: '전화번호', value: '02-123-4567' },
        { id: 'c2', label: '팩스', value: '02-123-4568' },
        { id: 'c3', label: '이메일', value: 'peacechurch@example.com' },
      ]
    },
    {
      id: 'address',
      title: '주소',
      items: [
        { id: 'a1', label: '', value: '서울 중랑구 봉화산로 120\n(지번: 서울 중랑구 신내동 613)' }
      ]
    },
    {
      id: 'transit',
      title: '대중교통',
      items: [
        { id: 't1', label: '지하철', value: '1호선 평화역 3번 출구에서 도보 5분' },
        { id: 't2', label: '버스', value: '간선: 100, 200, 300\n지선: 1011, 2022' }
      ]
    },
    {
      id: 'parking',
      title: '주차 안내',
      items: [
        { id: 'p1', label: '', value: '교회 본관 지하 주차장 이용 가능 (무료)\n주일에는 혼잡할 수 있으니 대중교통 이용을 권장합니다.' }
      ]
    }
  ]);

  const handleAddLocationGroup = () => {
    setLocationGroups([...locationGroups, { id: Date.now().toString(), title: '새 항목 그룹', items: [{ id: Date.now().toString() + '-1', label: '', value: '' }] }]);
    triggerAutoSave();
  };

  const handleAddLocationItem = (groupId) => {
    setLocationGroups(locationGroups.map(group => {
      if (group.id === groupId) {
        return { ...group, items: [...group.items, { id: Date.now().toString(), label: '', value: '' }] };
      }
      return group;
    }));
    triggerAutoSave();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl space-y-6 pb-20"
    >
      {/* Header */}
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-6">
        <div>
          <h2 className="text-[24px] font-bold text-black flex items-center">
            <MonitorPlay className="mr-3 text-[#5227FF]" size={28} /> 
            메인 페이지 (홈 화면) 설정
          </h2>
          <p className="text-gray-500 text-[15px] mt-2 flex items-center">
            <Info size={16} className="mr-1 text-gray-400" />
            각 섹션의 내용과 보이기/숨기기 상태를 관리할 수 있습니다.
          </p>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center text-[14px] font-bold text-gray-500 bg-gray-100 px-5 py-2.5 rounded-xl border border-gray-200">
            {isSaving ? (
              <><Loader2 size={16} className="animate-spin text-blue-500 mr-2" /> <span className="text-blue-600">자동 저장 중...</span></>
            ) : saveError ? (
              <><span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] mr-2">!</span> <span className="text-red-600">저장 실패 — 서버 연결을 확인해주세요</span></>
            ) : (
              <><CheckCircle2 size={16} className="text-green-500 mr-2" /> 모든 변경사항 저장됨</>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 rounded-xl flex items-center font-bold text-[14px] transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-black text-white border-2 border-black shadow-md' 
                : 'bg-white text-gray-600 border border-gray-300 hover:border-black hover:text-black'
            }`}
          >
            <span className={`mr-2 ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* HERO SLIDER SETTINGS */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className={`bg-white rounded-[24px] p-8 border ${sections.hero ? 'border-gray-200 shadow-sm' : 'border-gray-100 bg-gray-50'}`}>
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-100 gap-4">
                  <div>
                    <h3 className="text-[20px] font-bold text-gray-900 flex items-center">
                      메인 슬라이드 관리
                      <span className={`ml-3 text-[12px] px-2 py-0.5 rounded-full ${sections.hero ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                        {sections.hero ? 'ON' : 'OFF'}
                      </span>
                    </h3>
                    <p className="text-[13px] text-gray-500 mt-1">드래그하여 순서를 변경할 수 있습니다.</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => toggleSection('hero')}
                      className={`flex items-center font-bold ${sections.hero ? 'text-[#5227FF]' : 'text-gray-400'}`}
                    >
                      <span className="mr-2 text-[14px]">{sections.hero ? '섹션 노출됨' : '섹션 숨김'}</span>
                      {sections.hero ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                    </button>
                    <button className="text-[#5227FF] bg-[#5227FF]/10 hover:bg-[#5227FF]/20 px-4 py-2 rounded-lg text-[14px] font-bold flex items-center transition-colors">
                      <Plus size={16} className="mr-2" /> 추가
                    </button>
                  </div>
                </div>

                <div className={`space-y-6 transition-opacity ${!sections.hero ? 'opacity-40 pointer-events-none' : ''}`}>
                  {heroSlides.map((slide, idx) => (
                    <div key={slide.id} className="border border-gray-200 rounded-2xl overflow-hidden bg-white flex flex-col md:flex-row shadow-sm">
                      <div className="w-full md:w-[280px] h-[200px] md:h-auto bg-gray-200 relative group shrink-0 border-r border-gray-200">
                        <img src={slide.image} alt="배너" className="w-full h-full object-cover absolute inset-0" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <label className="bg-white text-black text-[12px] font-bold px-3 py-1.5 rounded-lg flex items-center shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
                            <ImageIcon size={14} className="mr-1" /> 이미지 변경
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleHeroImageUpload(slide.id, e)} 
                            />
                          </label>
                        </div>
                      </div>

                      <div className="flex-1 p-6 space-y-4">
                        <div className="flex space-x-6 pb-4 border-b border-gray-100">
                          <div>
                            <label className="block text-[12px] font-bold text-gray-500 mb-2">텍스트 정렬</label>
                            <div className="flex bg-gray-50 border border-gray-200 rounded-lg p-1 w-fit">
                              <button onClick={() => updateHeroSlide(slide.id, 'align', 'left')} className={`p-1.5 rounded-md ${slide.align === 'left' ? 'bg-white shadow-sm border border-gray-200 text-black' : 'text-gray-400'}`}><AlignLeft size={16}/></button>
                              <button onClick={() => updateHeroSlide(slide.id, 'align', 'center')} className={`p-1.5 rounded-md ${slide.align === 'center' ? 'bg-white shadow-sm border border-gray-200 text-black' : 'text-gray-400'}`}><AlignCenter size={16}/></button>
                              <button onClick={() => updateHeroSlide(slide.id, 'align', 'right')} className={`p-1.5 rounded-md ${slide.align === 'right' ? 'bg-white shadow-sm border border-gray-200 text-black' : 'text-gray-400'}`}><AlignRight size={16}/></button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-[12px] font-bold text-gray-500 mb-2">줌 효과</label>
                            <div className="flex bg-gray-50 border border-gray-200 rounded-lg p-1 w-fit">
                              <button onClick={() => updateHeroSlide(slide.id, 'zoomEffect', 'zoom-in')} className={`px-3 py-1.5 rounded-md text-[12px] font-bold flex items-center ${slide.zoomEffect === 'zoom-in' ? 'bg-white shadow-sm border border-gray-200 text-black' : 'text-gray-400'}`}><ZoomIn size={14} className="mr-1"/> 줌인</button>
                              <button onClick={() => updateHeroSlide(slide.id, 'zoomEffect', 'zoom-out')} className={`px-3 py-1.5 rounded-md text-[12px] font-bold flex items-center ${slide.zoomEffect === 'zoom-out' ? 'bg-white shadow-sm border border-gray-200 text-black' : 'text-gray-400'}`}><ZoomOut size={14} className="mr-1"/> 줌아웃</button>
                              <button onClick={() => updateHeroSlide(slide.id, 'zoomEffect', 'none')} className={`px-3 py-1.5 rounded-md text-[12px] font-bold flex items-center ${!slide.zoomEffect || slide.zoomEffect === 'none' ? 'bg-white shadow-sm border border-gray-200 text-black' : 'text-gray-400'}`}><MousePointer2 size={14} className="mr-1"/> 없음</button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-1">
                            <label className="block text-[12px] font-bold text-gray-500 mb-1">상단 문구 (Top Text)</label>
                            <input type="text" value={slide.topText || ''} onChange={(e) => updateHeroSlide(slide.id, 'topText', e.target.value)} placeholder="예: 기독교대한감리회" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] focus:border-black outline-none bg-gray-50 focus:bg-white" />
                          </div>
                          <div className="col-span-1">
                            <label className="block text-[12px] font-bold text-gray-500 mb-1">영문 문구 (English Text)</label>
                            <input type="text" value={slide.engText || ''} onChange={(e) => updateHeroSlide(slide.id, 'engText', e.target.value)} placeholder="예: PEACE METHODIST CHURCH" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] focus:border-black outline-none bg-gray-50 focus:bg-white uppercase" />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-[12px] font-bold text-gray-500 mb-1 flex items-center"><Type size={14} className="mr-1"/> 메인 카피</label>
                            <textarea value={slide.main || ''} onChange={(e) => updateHeroSlide(slide.id, 'main', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px] font-bold focus:border-black outline-none resize-none h-16 bg-gray-50 focus:bg-white" />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-[12px] font-bold text-gray-500 mb-1">서브 카피</label>
                            <textarea value={slide.sub || ''} onChange={(e) => updateHeroSlide(slide.id, 'sub', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px] focus:border-black outline-none resize-none h-16 bg-gray-50 focus:bg-white" />
                          </div>
                          <div>
                            <label className="block text-[12px] font-bold text-gray-500 mb-1">버튼 텍스트</label>
                            <input type="text" value={slide.btnText || ''} onChange={(e) => updateHeroSlide(slide.id, 'btnText', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] focus:border-black outline-none bg-gray-50 focus:bg-white" />
                          </div>
                          <div>
                            <label className="block text-[12px] font-bold text-gray-500 mb-1">연결 주소</label>
                            <input type="text" value={slide.btnLink || ''} onChange={(e) => updateHeroSlide(slide.id, 'btnLink', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] focus:border-black outline-none bg-gray-50 focus:bg-white font-mono" />
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-[60px] flex flex-row md:flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-200 bg-gray-50 p-2">
                        <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-200 rounded-lg" title="위로 이동"><MoveUp size={18} /></button>
                        <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-200 rounded-lg" title="아래로 이동"><MoveDown size={18} /></button>
                        <div className="w-[1px] md:w-[60%] h-[20px] md:h-[1px] bg-gray-200 mx-2 md:mx-0 md:my-2"></div>
                        <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="삭제"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* QUICK LINKS SETTINGS */}
          {activeTab === 'quick' && (
            <div className="space-y-6">
              <div className={`bg-white rounded-[24px] p-8 border ${sections.quick ? 'border-gray-200 shadow-sm' : 'border-gray-100 bg-gray-50'}`}>
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-100 gap-4">
                  <div>
                    <h3 className="text-[20px] font-bold text-gray-900 flex items-center">
                      표어 및 바로가기
                      <span className={`ml-3 text-[12px] px-2 py-0.5 rounded-full ${sections.quick ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                        {sections.quick ? 'ON' : 'OFF'}
                      </span>
                    </h3>
                    <p className="text-[13px] text-gray-500 mt-1">올해의 표어와 메인 중앙 4개의 빠른 이동 버튼입니다.</p>
                  </div>
                  <button 
                    onClick={() => toggleSection('quick')}
                    className={`flex items-center font-bold ${sections.quick ? 'text-[#5227FF]' : 'text-gray-400'}`}
                  >
                    <span className="mr-2 text-[14px]">{sections.quick ? '섹션 노출됨' : '섹션 숨김'}</span>
                    {sections.quick ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                  </button>
                </div>

                <div className={`transition-opacity ${!sections.quick ? 'opacity-40 pointer-events-none' : ''}`}>
                  <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-gray-100">
                    <div className="flex-1 space-y-5">
                      <h4 className="text-[15px] font-bold text-gray-900">올해의 표어 설정</h4>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-500 mb-1">표어 연도 및 타이틀</label>
                        <input type="text" value={quickSection.mottoYear || ''} onChange={(e) => updateQuickSection('mottoYear', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-[14px] font-bold focus:border-black outline-none bg-gray-50 focus:bg-white" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-500 mb-1">표어 내용 (큰 글씨)</label>
                        <textarea value={quickSection.mottoMain || ''} onChange={(e) => updateQuickSection('mottoMain', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[18px] font-black focus:border-black outline-none text-[#5227FF] bg-gray-50 focus:bg-white resize-none h-24" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-500 mb-1">서브 표어 (작은 글씨)</label>
                        <input type="text" value={quickSection.mottoSub || ''} onChange={(e) => updateQuickSection('mottoSub', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-[14px] focus:border-black outline-none bg-gray-50 focus:bg-white" />
                      </div>
                    </div>

                    <div className="w-full md:w-1/3 shrink-0">
                      <div className="flex justify-between items-end mb-4">
                        <h4 className="text-[15px] font-bold text-gray-900">표어 배경 이미지</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-[12px] font-bold text-gray-500">배경 사용</span>
                          <button onClick={() => updateQuickSection('useBgImage', quickSection.useBgImage === false ? true : false)} className={`${quickSection.useBgImage !== false ? 'text-[#5227FF]' : 'text-gray-400'}`}>
                            {quickSection.useBgImage !== false ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                          </button>
                          {quickSection.bgImage && (
                            <button onClick={() => updateQuickSection('bgImage', '')} className="text-[12px] font-bold text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors ml-2">
                              삭제
                            </button>
                          )}
                        </div>
                      </div>
                      <label className={`aspect-video bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:bg-gray-50 transition-all block ${quickSection.useBgImage === false ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                        {quickSection.bgImage ? (
                          <div className="w-full h-full bg-blue-900 flex items-center justify-center text-white/50 text-[12px]">
                            <img src={quickSection.bgImage} className="w-full h-full object-cover opacity-50" />
                          </div>
                        ) : (
                          <ImageIcon color="gray" size={32} className="opacity-50" />
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity">
                          <ImageIcon color="white" size={32} className="mb-2" />
                          <span className="text-white font-bold text-[13px]">사진 변경</span>
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={handleQuickBgUpload} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900 mb-4">바로가기 메뉴 관리</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {quickLinks.map((link, idx) => (
                        <div key={link.id} className="border border-gray-200 p-5 rounded-xl flex gap-4 bg-white relative group hover:border-black transition-colors shadow-sm">
                          <div className="flex flex-col gap-2 shrink-0">
                            <label className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 relative overflow-hidden group/bg block">
                              {link.bgImage && <img src={link.bgImage} className="absolute inset-0 w-full h-full object-cover opacity-50" />}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/bg:opacity-100 transition-opacity flex flex-col items-center justify-center z-20">
                                <span className="text-white text-[11px] font-bold">배경 변경</span>
                              </div>
                              <span className="text-[10px] text-gray-700 font-bold mt-auto mb-1 relative z-10 bg-white/80 px-1 rounded">배경 이미지</span>
                              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleQuickLinkImageUpload(link.id, e)} />
                            </label>
                            
                            <label className="w-20 h-20 bg-white rounded-xl border border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 relative overflow-hidden group/icon block">
                              {link.customIcon ? (
                                <img src={link.customIcon} className="w-10 h-10 object-contain z-10" />
                              ) : (
                                <div className="z-10 text-gray-700">
                                  {link.icon === 'Clock' && <Clock size={28} />}
                                  {link.icon === 'FileText' && <FileText size={28} />}
                                  {link.icon === 'PlayCircle' && <PlayCircle size={28} />}
                                  {link.icon === 'MapPin' && <MapPin size={28} />}
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/icon:opacity-100 transition-opacity flex flex-col items-center justify-center z-20">
                                <span className="text-white text-[11px] font-bold">아이콘 변경</span>
                              </div>
                              <span className="text-[10px] text-gray-500 font-bold mt-auto mb-1 relative z-10 bg-white/90 px-1 rounded">아이콘</span>
                              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleQuickLinkIconUpload(link.id, e)} />
                            </label>
                            
                            <div className="w-full flex justify-between mt-1 px-1">
                              {link.bgImage !== DEFAULT_QUICK_LINKS.find(l => l.id === link.id).bgImage ? (
                                <button onClick={(e) => { e.preventDefault(); updateQuickLink(link.id, 'bgImage', DEFAULT_QUICK_LINKS.find(l => l.id === link.id).bgImage); }} className="text-[10px] text-red-500 font-bold hover:underline">
                                  배경 복구
                                </button>
                              ) : (
                                <span className="text-[10px] text-gray-300 font-bold">배경 복구</span>
                              )}
                              
                              {link.customIcon ? (
                                <button onClick={(e) => handleQuickLinkIconReset(link.id, e)} className="text-[10px] text-red-500 font-bold hover:underline">
                                  아이콘 복구
                                </button>
                              ) : (
                                <span className="text-[10px] text-gray-300 font-bold">아이콘 복구</span>
                              )}
                            </div>
                          </div>
                          <div className="flex-1 space-y-3">
                            <div>
                              <label className="block text-[11px] font-bold text-gray-500 mb-1">메뉴명 (타이틀)</label>
                              <input type="text" value={link.title || link.name || ''} onChange={(e) => updateQuickLink(link.id, 'title', e.target.value)} className="w-full px-3 py-1.5 border border-gray-200 bg-gray-50 focus:bg-white rounded-md text-[14px] font-bold outline-none focus:border-black" />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-500 mb-1">설명 (서브 타이틀)</label>
                              <input type="text" value={link.subtitle || ''} onChange={(e) => updateQuickLink(link.id, 'subtitle', e.target.value)} className="w-full px-3 py-1.5 border border-gray-200 bg-gray-50 focus:bg-white rounded-md text-[13px] outline-none focus:border-black" />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-500 mb-1">연결 URL</label>
                              <input type="text" value={link.path || link.link || ''} onChange={(e) => updateQuickLink(link.id, 'path', e.target.value)} className="w-full px-3 py-1.5 border border-gray-200 bg-blue-50 focus:bg-white rounded-md text-[12px] font-mono text-blue-600 outline-none focus:border-black" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WORSHIP SECTION SETTINGS */}
          {activeTab === 'worship' && (
            <div className={`bg-white rounded-[24px] p-8 border ${sections.worship ? 'border-gray-200 shadow-sm' : 'border-gray-100 bg-gray-50'}`}>
              <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-100 gap-4">
                <div>
                  <h3 className="text-[20px] font-bold text-gray-900 flex items-center">
                    예배시간 안내 카드
                    <span className={`ml-3 text-[12px] px-2 py-0.5 rounded-full ${sections.worship ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                      {sections.worship ? 'ON' : 'OFF'}
                    </span>
                  </h3>
                </div>
                <button 
                  onClick={() => toggleSection('worship')}
                  className={`flex items-center font-bold ${sections.worship ? 'text-[#5227FF]' : 'text-gray-400'}`}
                >
                  <span className="mr-2 text-[14px]">{sections.worship ? '섹션 노출됨' : '섹션 숨김'}</span>
                  {sections.worship ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                </button>
              </div>

              <div className={`transition-opacity ${!sections.worship ? 'opacity-40 pointer-events-none' : ''}`}>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600 shrink-0">
                      <Info size={24} />
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold text-gray-900 mb-2">예배시간 안내 연동</h4>
                      <p className="text-[14px] text-gray-600 leading-relaxed break-keep">
                        예배시간 안내의 내용은 <strong className="text-black">교회소개 {'>'} 예배안내</strong> 페이지의 내용을 가져와서 표기됩니다. 내용 수정이 필요하신 경우 해당 페이지 설정에서 변경해 주세요.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PASTOR SECTION SETTINGS */}
          {activeTab === 'pastor' && (
            <div className={`bg-white rounded-[24px] p-8 border ${sections.pastor ? 'border-gray-200 shadow-sm' : 'border-gray-100 bg-gray-50'}`}>
              <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-100 gap-4">
                <div>
                  <h3 className="text-[20px] font-bold text-gray-900 flex items-center">
                    담임목사 인사말
                    <span className={`ml-3 text-[12px] px-2 py-0.5 rounded-full ${sections.pastor ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                      {sections.pastor ? 'ON' : 'OFF'}
                    </span>
                  </h3>
                </div>
                <button 
                  onClick={() => toggleSection('pastor')}
                  className={`flex items-center font-bold ${sections.pastor ? 'text-[#5227FF]' : 'text-gray-400'}`}
                >
                  <span className="mr-2 text-[14px]">{sections.pastor ? '섹션 노출됨' : '섹션 숨김'}</span>
                  {sections.pastor ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                </button>
              </div>

              <div className={`flex flex-col md:flex-row gap-8 transition-opacity ${!sections.pastor ? 'opacity-40 pointer-events-none' : ''}`}>
                <div className="w-full md:w-1/3">
                  <label className="block text-[14px] font-bold text-gray-700 mb-2">프로필 (배경) 이미지</label>
                  <label className="aspect-video bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:bg-gray-50 block">
                    <img src={pastorSection.image || "/pastor-bg.png"} alt="목사님" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity z-10">
                      <ImageIcon color="white" size={32} className="mb-2" />
                      <span className="text-white font-bold text-[13px]">사진 변경</span>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handlePastorImageUpload} />
                  </label>
                </div>

                <div className="flex-1 space-y-5">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-2">이름</label>
                    <input type="text" value={pastorSection.name} onChange={(e) => updatePastorSection('name', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[18px] focus:bg-white focus:border-black outline-none" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-2">인사말 큰 제목</label>
                    <input type="text" value={pastorSection.title} onChange={(e) => updatePastorSection('title', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[18px] focus:bg-white focus:border-black outline-none" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-2">인사말 본문 내용 (엔터로 줄바꿈)</label>
                    <textarea 
                      value={pastorSection.content}
                      onChange={(e) => updatePastorSection('content', e.target.value)}
                      className="w-full h-[200px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[14px] leading-relaxed focus:bg-white focus:border-black outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LOCATION SETTINGS */}
          {activeTab === 'location' && (
            <div className={`bg-white rounded-[24px] p-8 border ${sections.location ? 'border-gray-200 shadow-sm' : 'border-gray-100 bg-gray-50'}`}>
              <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-100 gap-4">
                <div>
                  <h3 className="text-[20px] font-bold text-gray-900 flex items-center">
                    오시는 길 정보
                    <span className={`ml-3 text-[12px] px-2 py-0.5 rounded-full ${sections.location ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                      {sections.location ? 'ON' : 'OFF'}
                    </span>
                  </h3>
                  <p className="text-[13px] text-gray-500 mt-1">입력하신 주소를 기반으로 지도가 <strong className="text-[#5227FF]">자동으로 연동</strong>됩니다.</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => toggleSection('location')}
                    className={`flex items-center font-bold ${sections.location ? 'text-[#5227FF]' : 'text-gray-400'}`}
                  >
                    <span className="mr-2 text-[14px]">{sections.location ? '섹션 노출됨' : '섹션 숨김'}</span>
                    {sections.location ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                  </button>
                  <button onClick={handleAddLocationGroup} className="text-[#5227FF] bg-[#5227FF]/10 hover:bg-[#5227FF]/20 px-4 py-2 rounded-lg text-[14px] font-bold flex items-center transition-colors">
                    <Plus size={16} className="mr-2" /> 새 그룹 추가
                  </button>
                </div>
              </div>

              <div className={`space-y-8 transition-opacity ${!sections.location ? 'opacity-40 pointer-events-none' : ''}`}>
                {locationGroups.map((group, groupIdx) => (
                  <div key={group.id} className="border border-gray-200 rounded-xl bg-white p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                      <input 
                        type="text" 
                        defaultValue={group.title} 
                        className="text-[16px] font-bold text-gray-900 border-none bg-transparent focus:ring-0 w-[200px] outline-none" 
                        placeholder="항목 그룹명 (예: 연락처)"
                      />
                      <div className="flex space-x-2">
                        <button onClick={() => handleAddLocationItem(group.id)} className="text-[#5227FF] text-[13px] font-bold bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                          + 하위 입력줄 추가
                        </button>
                        {groupIdx > 3 && (
                          <button className="text-red-500 text-[13px] font-bold bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">
                            그룹 삭제
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {group.items.map((item, itemIdx) => (
                        <div key={item.id} className="flex space-x-4 items-start">
                          <div className="w-[120px]">
                            <input 
                              type="text" 
                              defaultValue={item.label} 
                              placeholder="라벨 (선택)"
                              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:bg-white focus:border-black" 
                            />
                          </div>
                          <div className="flex-1 flex space-x-2">
                            <textarea 
                              defaultValue={item.value} 
                              placeholder="내용을 입력하세요 (엔터로 줄바꿈 가능)"
                              className="flex-1 px-4 py-2 border border-gray-200 bg-gray-50 focus:bg-white rounded-lg text-[14px] focus:border-black outline-none resize-none min-h-[42px] h-[42px] focus:h-[84px] transition-all overflow-hidden" 
                            />
                            {(group.items.length > 1 || groupIdx > 3) && (
                              <button className="px-3 py-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-lg border border-gray-200 hover:border-red-200 transition-colors h-[42px]">
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <button onClick={handleAddLocationGroup} className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:bg-gray-50 hover:text-black transition-colors flex items-center justify-center">
                  <Plus size={18} className="mr-2" /> 새로운 항목 그룹 추가 (예: 예배시간 안내 등)
                </button>
              </div>
            </div>
          )}

          {/* FOOTER SETTINGS */}
          {activeTab === 'footer' && (
            <div className={`bg-white rounded-[24px] p-8 border ${sections.footer ? 'border-gray-200 shadow-sm' : 'border-gray-100 bg-gray-50'}`}>
              <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-100 gap-4">
                <h3 className="text-[20px] font-bold text-gray-900 flex items-center">
                  풋터(하단 영역) 정보
                  <span className={`ml-3 text-[12px] px-2 py-0.5 rounded-full ${sections.footer ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                    {sections.footer ? 'ON' : 'OFF'}
                  </span>
                </h3>
                <button 
                  onClick={() => toggleSection('footer')}
                  className={`flex items-center font-bold ${sections.footer ? 'text-[#5227FF]' : 'text-gray-400'}`}
                >
                  <span className="mr-2 text-[14px]">{sections.footer ? '섹션 노출됨' : '섹션 숨김'}</span>
                  {sections.footer ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                </button>
              </div>
              
              <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 transition-opacity ${!sections.footer ? 'opacity-40 pointer-events-none' : ''}`}>
                
                {/* Logo Section */}
                <div className="col-span-1 md:col-span-4 space-y-6">
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">하단 로고</label>
                    <label className="aspect-[2/1] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:bg-gray-50 transition-colors block">
                      {footerSection.logo ? (
                        <img src={footerSection.logo} alt="로고" className="w-full h-full object-contain p-4 opacity-80" />
                      ) : (
                        <div className="text-gray-400 text-center flex flex-col items-center">
                          <ImageIcon size={24} className="mb-2 opacity-50" />
                          <span className="text-[12px] font-bold">클릭하여 로고 업로드</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity z-10">
                        <ImageIcon color="white" size={24} className="mb-2" />
                        <span className="text-white font-bold text-[12px]">사진 변경</span>
                      </div>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFooterLogoUpload} />
                    </label>
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">로고 하단 문구</label>
                    <textarea 
                      value={footerSection.description}
                      onChange={(e) => updateFooterSection('description', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-[13px] leading-relaxed focus:border-black outline-none resize-none h-24" 
                    />
                  </div>
                </div>

                {/* Info Section */}
                <div className="col-span-1 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-2">교회(기관)명</label>
                    <input type="text" value={footerSection.churchName} onChange={(e) => updateFooterSection('churchName', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-[14px] focus:border-black outline-none" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-2">대표자명 (선택)</label>
                    <input type="text" value={footerSection.repName} onChange={(e) => updateFooterSection('repName', e.target.value)} placeholder="홍길동 목사" className="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-[14px] focus:border-black outline-none" />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-[13px] font-bold text-gray-700 mb-2">주소</label>
                    <input type="text" value={footerSection.address} onChange={(e) => updateFooterSection('address', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-[14px] focus:border-black outline-none" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-2">대표 전화번호</label>
                    <input type="text" value={footerSection.phone} onChange={(e) => updateFooterSection('phone', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-[14px] focus:border-black outline-none" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-2">팩스번호 (선택)</label>
                    <input type="text" value={footerSection.fax} onChange={(e) => updateFooterSection('fax', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-[14px] focus:border-black outline-none" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-2">이메일 주소 (선택)</label>
                    <input type="text" value={footerSection.email} onChange={(e) => updateFooterSection('email', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-[14px] focus:border-black outline-none" />
                  </div>
                  <div className="col-span-1 md:col-span-2 mt-2 pt-4 border-t border-gray-100">
                    <label className="block text-[13px] font-bold text-gray-700 mb-2">카피라이트 (Copyright)</label>
                    <input type="text" value={footerSection.copyright} onChange={(e) => updateFooterSection('copyright', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-[13px] text-gray-500 focus:border-black outline-none" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
