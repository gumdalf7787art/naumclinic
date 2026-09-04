import React, { useState, useEffect } from 'react';
import { useCMSData } from './hooks/useCMS';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { Apple, Search, ShoppingBag, Menu, ArrowRight, Sun, Clock, FileText, PlayCircle, MapPin, Users, ChevronRight, X } from 'lucide-react';
import MoltenMetal from './components/MoltenMetal';
import SplitText from './components/SplitText';
import DashboardMockup from './components/DashboardMockup';
import TiltedCard from './components/TiltedCard';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Estimate from './components/Estimate';
import MyPage from './components/MyPage';
import KakaoCallback from './components/KakaoCallback';
import NaverCallback from './components/NaverCallback';
import GoogleCallback from './components/GoogleCallback';
import Admin from './components/Admin';
import SubPageLayout from './components/SubPageLayout';
import DynamicPage from './components/DynamicPage';
import SEO from './components/SEO';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: '고객' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dynamicMenus, setDynamicMenus] = useState([]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const isHome = pathname === '/';
  const isTransparent = isHome && !isScrolled;

  const defaultHospitalMenus = [
    {
      id: 'intro', name: '병원소개', path: '/intro/ceo', is_active: 1,
      children: [
        { id: 'intro-ceo', name: '병원장 인사말', path: '/intro/ceo', is_active: 1 },
        { id: 'intro-doctors', name: '의료진 소개', path: '/intro/doctors', is_active: 1 },
        { id: 'intro-facility', name: '시설 및 장비안내', path: '/intro/facility', is_active: 1 },
        { id: 'intro-location', name: '오시는 길', path: '/intro/location', is_active: 1 }
      ]
    },
    {
      id: 'info', name: '진료안내', path: '/info/hours', is_active: 1,
      children: [
        { id: 'info-hours', name: '진료시간안내', path: '/info/hours', is_active: 1 },
        { id: 'info-depts', name: '진료과목', path: '/info/departments', is_active: 1 },
        { id: 'info-certs', name: '제증명발급안내', path: '/info/certificates', is_active: 1 },
        { id: 'info-nonpay', name: '비급여진료비', path: '/info/non-payment', is_active: 1 }
      ]
    },
    {
      id: 'center', name: '전문센터', path: '/center/specialty', is_active: 1,
      children: [
        { id: 'center-special', name: '특화진료센터', path: '/center/specialty', is_active: 1 },
        { id: 'center-manual', name: '도수치료 센터', path: '/center/manual', is_active: 1 },
        { id: 'center-checkup', name: '건강검진센터', path: '/center/checkup', is_active: 1 },
        { id: 'center-surgery', name: '수술센터', path: '/center/surgery', is_active: 1 }
      ]
    },
    {
      id: 'community', name: '커뮤니티', path: '/community/notice', is_active: 1,
      children: [
        { id: 'comm-notice', name: '병원소식', path: '/community/notice', is_active: 1 },
        { id: 'comm-consult', name: '건강상담', path: '/community/consult', is_active: 1 },
        { id: 'comm-reviews', name: '진료후기', path: '/community/reviews', is_active: 1 }
      ]
    }
  ];

  useEffect(() => {
    fetch('/api/menus')
      .then(res => {
        if (!res.ok) throw new Error('API fetch failed');
        return res.json();
      })
      .then(data => {
        // Only active menus
        const filterActive = (list) => list.filter(m => m.is_active !== 0).map(m => ({
          ...m,
          children: m.children ? filterActive(m.children) : []
        }));
        setDynamicMenus(filterActive(data));
      })
      .catch((err) => {
        console.log('Using default menus due to:', err.message);
        setDynamicMenus(defaultHospitalMenus);
      });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const saved = localStorage.getItem('userProfile');
      if (saved) {
        setUserProfile(JSON.parse(saved));
      }
    }
  }, [isLoggedIn]);

  return (
    <header className={`z-50 flex justify-center w-full transition-colors duration-300 ${isHome ? 'fixed top-0 left-0' : 'sticky top-0'} ${isTransparent ? 'bg-transparent border-b border-white/30' : 'bg-white border-b border-gray-200 shadow-sm'}`}>
      <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-8 h-[72px]">
        {/* Logo */}
        <Link 
          to="/"
          className="flex items-center cursor-pointer gap-2"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xl shadow-md transition-colors ${isTransparent ? 'bg-white text-[#0050a3]' : 'bg-[#0066cc] text-white'}`}>
            +
          </div>
          <span className={`font-extrabold text-[20px] tracking-tight transition-colors ${isTransparent ? 'text-white' : 'text-[#0050a3]'}`}>나음재활의학과의원</span>
        </Link>
        
        {/* Links */}
        <div className={`hidden md:flex items-center h-full space-x-10 text-[16px] font-semibold relative transition-colors ${isTransparent ? 'text-white/90' : 'text-gray-700'}`}>
          
          {/* 메뉴목록 */}
          {dynamicMenus.length > 0 ? dynamicMenus.map((menu) => (
            <div key={menu.id} className="relative group h-full flex items-center">
              <Link to={menu.path || '#'} className={`transition-colors py-4 px-2 ${isTransparent ? 'hover:text-white' : 'hover:text-black'}`}>{menu.name}</Link>
              {menu.children && menu.children.length > 0 && (
                <div className="absolute top-[56px] left-1/2 -translate-x-1/2 w-[170px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-white/95 backdrop-blur-xl border border-gray-100 shadow-lg rounded-[8px] p-1.5 relative">
                    <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-t border-l border-gray-100 rotate-45 rounded-tl-[2px] z-0"></div>
                    <div className="flex flex-col space-y-0.5 relative z-10">
                      {menu.children.map(child => (
                        <Link key={child.id} to={child.path || '#'} className="flex items-center justify-between px-3 py-1.5 text-[13.5px] text-gray-700 hover:text-[#0050a3] hover:bg-[#0050a3]/5 rounded-md transition-all duration-200 font-medium group/item">
                          <span>{child.name}</span>
                          <ChevronRight size={13} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )) : (
            <div className="animate-pulse w-48 h-6 bg-gray-100 rounded-md"></div>
          )}
        </div>

        {/* Buttons */}
        <div className="hidden lg:flex items-center space-x-6">
          {isLoggedIn ? (
            <button 
              onClick={() => navigate('/mypage')}
              className={`flex items-center space-x-2 py-1.5 px-3 rounded-full transition-colors ${isTransparent ? 'bg-white/10 hover:bg-white/20 border border-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#5227FF] to-[#FF9FFC] p-[1.5px]">
                <div className="w-full h-full bg-white rounded-full border border-white flex items-center justify-center text-gray-500 font-bold text-[10px]">
                  {userProfile.name.charAt(0)}
                </div>
              </div>
              <span className={`text-[13px] font-bold hidden sm:block ${isTransparent ? 'text-white' : 'text-gray-700'}`}>내 정보</span>
            </button>
          ) : (
            <>
              <button 
                onClick={() => navigate('/login')}
                className={`text-[15px] font-medium transition-colors hidden sm:block ${isTransparent ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-black'}`}
              >
                로그인
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className={`!py-2 !px-5 !rounded-lg text-[14px] font-medium shadow-sm transition-colors ${isTransparent ? 'bg-white/10 border border-white/30 text-white hover:bg-white/20' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              >
                회원가입
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`lg:hidden p-2 transition-colors ${isTransparent ? 'text-white' : 'text-gray-700'}`}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Toggle menu"
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[100] lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-white z-[110] shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <span className="font-bold text-lg">전체메뉴</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 hover:text-black">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-5 px-5 space-y-5">
                {/* Mobile Auth Buttons */}
                <div className="flex flex-col space-y-2 border-b border-gray-100 pb-4">
                  {isLoggedIn ? (
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); navigate('/mypage'); }}
                      className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-center font-bold text-gray-700 text-[14px] transition-colors"
                    >
                      내 정보 ({userProfile.name})
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }}
                        className="w-full py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-center font-bold text-gray-700 text-[14px] transition-colors"
                      >
                        로그인
                      </button>
                      <button 
                        onClick={() => { setIsMobileMenuOpen(false); navigate('/signup'); }}
                        className="w-full py-2 bg-black hover:bg-gray-900 text-[#F6BE00] rounded-lg text-center font-bold text-[14px] transition-colors"
                      >
                        회원가입
                      </button>
                    </>
                  )}
                </div>
                
                <div>
                  <h3 className="text-[#0066cc] text-[13px] font-bold mb-2 uppercase tracking-wider">병원소개</h3>
                  <div className="grid grid-cols-2 gap-y-2.5 pl-1">
                    <Link to="/intro/ceo" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium text-[14px]">병원장 인사말</Link>
                    <Link to="/intro/doctors" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium text-[14px]">의료진 소개</Link>
                    <Link to="/intro/facility" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium text-[14px]">시설 및 장비안내</Link>
                    <Link to="/intro/location" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium text-[14px]">오시는 길</Link>
                  </div>
                </div>
                <div>
                  <h3 className="text-[#0066cc] text-[13px] font-bold mb-2 uppercase tracking-wider">진료안내</h3>
                  <div className="grid grid-cols-2 gap-y-2.5 pl-1">
                    <Link to="/info/hours" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium text-[14px]">진료시간안내</Link>
                    <Link to="/info/departments" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium text-[14px]">진료과목</Link>
                    <Link to="/info/certificates" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium text-[14px]">제증명발급안내</Link>
                    <Link to="/info/non-payment" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium text-[14px]">비급여진료비</Link>
                  </div>
                </div>
                <div>
                  <h3 className="text-[#0066cc] text-[13px] font-bold mb-2 uppercase tracking-wider">전문센터</h3>
                  <div className="grid grid-cols-2 gap-y-2.5 pl-1">
                    <Link to="/center/specialty" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium text-[14px]">특화진료센터</Link>
                    <Link to="/center/checkup" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium text-[14px]">건강검진센터</Link>
                    <Link to="/center/surgery" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium text-[14px]">수술센터</Link>
                  </div>
                </div>
                <div>
                  <h3 className="text-[#0066cc] text-[13px] font-bold mb-2 uppercase tracking-wider">커뮤니티</h3>
                  <div className="grid grid-cols-2 gap-y-2.5 pl-1">
                    <Link to="/community/notice" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium text-[14px]">병원소식</Link>
                    <Link to="/community/consult" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium text-[14px]">건강상담</Link>
                    <Link to="/community/reviews" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium text-[14px]">진료후기</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

const DEFAULT_HERO_SLIDES = [
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

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = useCMSData('cms_heroSlides', DEFAULT_HERO_SLIDES);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[580px] lg:h-[700px] overflow-hidden bg-black">
      <AnimatePresence>
        <motion.div
          key={`${currentSlide}-${slides[currentSlide].zoomEffect}-${slides[currentSlide].image}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          {!slides[currentSlide].noDim && (
            <div className="absolute inset-0 bg-[#001533]/50 z-10" />
          )}
          <motion.img 
            src={slides[currentSlide].image} 
            alt="Hero Background" 
            initial={{ scale: slides[currentSlide].zoomEffect === 'zoom-out' ? 1.1 : 1 }}
            animate={{ scale: slides[currentSlide].zoomEffect === 'none' ? 1 : (slides[currentSlide].zoomEffect === 'zoom-out' ? 1 : 1.1) }}
            transition={{ duration: 6, ease: "linear" }}
            className="absolute inset-0 w-full h-full object-cover z-0 origin-center" 
          />
          
          {/* Text Content */}
          <div className={`relative z-20 flex flex-col justify-center h-full max-w-7xl mx-auto px-8 md:px-12 pt-[72px] ${slides[currentSlide].align === 'left' ? 'items-start text-left md:pl-24 lg:pl-32' : (slides[currentSlide].align === 'right' ? 'items-end text-right md:pr-24 lg:pr-32' : 'items-center text-center')}`}>
            
            {slides[currentSlide].topText && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="text-[12px] sm:text-[15px] md:text-[20px] lg:text-[24px] font-bold text-white/95 mb-1 sm:mb-2 drop-shadow-md tracking-tight"
              >
                {slides[currentSlide].topText}
              </motion.div>
            )}

            {slides[currentSlide].main && (
              <SplitText
                tag="h1"
                textAlign={slides[currentSlide].align}
                delay={40}
                duration={1.2}
                splitType="chars"
                from={{ opacity: 0, y: 80, rotationX: -30 }}
                to={{ opacity: 1, y: 0, rotationX: 0 }}
                ease="back.out(1.2)"
                className="text-[30px] sm:text-[38px] md:text-[54px] lg:text-[68px] font-bold text-white mb-2 sm:mb-4 tracking-tight drop-shadow-lg leading-[1.1] sm:leading-none"
              >
                {slides[currentSlide].main.split('\n').map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </SplitText>
            )}

            {slides[currentSlide].engText && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-[10px] sm:text-[12px] md:text-[16px] font-medium text-white/80 mb-4 sm:mb-6 drop-shadow-md tracking-[0.2em] sm:tracking-[0.35em] uppercase"
              >
                {slides[currentSlide].engText}
              </motion.div>
            )}

            {slides[currentSlide].sub && (
              <SplitText
                tag="p"
                textAlign={slides[currentSlide].align}
                delay={30}
                duration={1}
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                ease="power3.out"
                className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] text-white/95 drop-shadow-md font-normal max-w-2xl leading-[1.4] sm:leading-snug break-keep"
              >
                {slides[currentSlide].sub.split('\n').map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </SplitText>
            )}

            {slides[currentSlide].features && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-8 sm:mt-12 flex justify-center"
              >
                <div className="flex items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3 sm:px-10 sm:py-4 shadow-lg divide-x divide-white/20">
                  {slides[currentSlide].features.map((feature, idx) => (
                    <div key={idx} className="flex flex-col items-center px-4 sm:px-8 text-white/90 group cursor-default">
                      <span className="text-[10px] sm:text-[12px] text-white/60 font-medium mb-0.5 tracking-wider">{feature.top}</span>
                      <span className="text-[14px] sm:text-[18px] font-bold tracking-tight group-hover:text-white transition-colors">{feature.bottom}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {slides[currentSlide].btnText && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-6 sm:mt-8"
              >
                <Link to={slides[currentSlide].btnLink || '#'} className="inline-block bg-white text-black text-[14px] sm:text-[16px] font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                  {slides[currentSlide].btnText}
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

const DEFAULT_QUICK_SECTION = {
  mottoYear: '스마트 의료 서비스',
  mottoMain: '환자를 최우선으로 생각하는\n나음재활의학과의원',
  mottoSub: '신뢰할 수 있는 진료로 보답하겠습니다',
  bgImage: '',
  useBgImage: true
};

const DEFAULT_QUICK_LINKS = [
  { id: 1, name: '지긋지긋한 목·허리 통증', tag: '비수술 통증치료', sub: '디스크, 협착증 등 근본적인 원인을 찾아 치료합니다.', path: '/center/specialty', image: '/hero-2-bg.webp' },
  { id: 2, name: '손목터널증후군 & 관절염', tag: '관절·인대 치료', sub: '초기 정확한 진단이 필요한 손목과 팔꿈치 통증.', path: '/center/specialty', image: '/hero-3-bg.webp' },
  { id: 3, name: '체형 교정 도수치료', tag: '1:1 집중 치료', sub: '틀어진 척추를 바로잡고 근육 밸런스를 회복시킵니다.', path: '/center/manual', image: '/hero-1-bg.webp' },
  { id: 4, name: '초음파 유도하 주사치료', tag: '프리미엄 진료', sub: '실시간 초음파 영상을 통해 병변에 정확히 투여합니다.', path: '/center/specialty', image: '/hero-2-bg.webp' },
  { id: 5, name: '체외충격파 치료 (ESWT)', tag: '조직 재생 치료', sub: '강력한 파동으로 손상된 조직과 염증을 치료합니다.', path: '/center/specialty', image: '/hero-3-bg.webp' },
  { id: 6, name: '수술 후 재활치료', tag: '일상 회복 프로그램', sub: '빠른 일상 복귀를 위한 맞춤형 단계별 재활 솔루션.', path: '/center/manual', image: '/hero-1-bg.webp' }
];

const ICONS = {
  Clock: <Clock />,
  FileText: <FileText />,
  PlayCircle: <PlayCircle />,
  MapPin: <MapPin />,
  Search: <Search />,
  Users: <Users />
};

function QuickMenu() {
  const section = useCMSData('cms_quickSection', DEFAULT_QUICK_SECTION);
  const menus = useCMSData('cms_quickLinks', DEFAULT_QUICK_LINKS);

  return (
    <section className="relative bg-[#f5f5f7] py-16 md:py-24 px-4 flex flex-col items-center overflow-hidden">
      {section.useBgImage !== false && section.bgImage && (
        <div className="absolute inset-0 z-0">
          <img src={section.bgImage} alt="Background" className="w-full h-full object-cover opacity-10" />
        </div>
      )}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Motto */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-10 md:mb-16 flex flex-col items-center"
        >
          {section.mottoYear && (
            <span className="text-[18px] md:text-[22px] font-semibold text-[#0066cc] mb-3 tracking-wide uppercase">{section.mottoYear}</span>
          )}
          {section.mottoMain && (
            <h2 className="text-[32px] md:text-[46px] font-black text-black tracking-tight leading-tight">
              {section.mottoMain.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}<br/>
                </React.Fragment>
              ))}
            </h2>
          )}
        </motion.div>
        
        {/* Welcome Line */}
        {section.mottoSub && (
          <div className="flex items-center w-full max-w-5xl mb-12 sm:mb-16">
            <div className="flex-1 h-[1px] bg-gray-300 hidden sm:block"></div>
            <span className="px-4 sm:px-8 text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-gray-600 tracking-wide text-center w-full sm:w-auto break-keep">
              {section.mottoSub}
            </span>
            <div className="flex-1 h-[1px] bg-gray-300 hidden sm:block"></div>
          </div>
        )}
      
      {/* Quick Menus Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 w-full max-w-5xl mx-auto px-4">
        {menus.map((menu, idx) => (
          <Link 
            key={idx} 
            to={menu.link || menu.path} 
            className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            {/* Top Image */}
            <div className="w-full aspect-[16/9] overflow-hidden relative">
              <img 
                src={menu.image || menu.bgImage} 
                alt={menu.title || menu.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              {/* Optional overlay gradient on image */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300"></div>
            </div>
            
            {/* Bottom Text Content */}
            <div className="py-3 px-4 sm:py-4 sm:px-5 flex flex-col flex-1 bg-white relative">
              {(menu.tag || menu.icon) && (
                <span className="inline-block text-[#0066cc] text-[11px] font-bold tracking-wide mb-1.5 px-2 py-0.5 bg-[#0066cc]/10 rounded-full w-fit">
                  {menu.tag || '진료안내'}
                </span>
              )}
              <h3 className="text-[15px] sm:text-[17px] font-bold text-gray-900 tracking-tight leading-snug mb-1 group-hover:text-[#0050a3] transition-colors">
                {menu.title || menu.name}
              </h3>
              {(menu.subtitle || menu.sub) && (
                <p className="text-[12px] sm:text-[13px] text-gray-500 leading-snug mb-2 line-clamp-2 break-keep flex-1">
                  {menu.subtitle || menu.sub}
                </p>
              )}
              
              <div className="mt-auto flex items-center text-[12px] font-bold text-[#0066cc] group/btn">
                자세히 보기 
                <ArrowRight size={12} className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
}

function HomeVideoModal({ video, onClose }) {
  if (!video) return null;
  const vId = video.videoId;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div style={{ position: 'relative', width: '90%', maxWidth: '1000px', backgroundColor: '#000', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, transition: 'background-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}>
          <X size={24} />
        </button>
        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
          <iframe 
            src={`https://www.youtube.com/embed/${vId}?autoplay=1`}
            title={video.title}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div style={{ padding: '24px', backgroundColor: '#fff' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 'bold', color: '#111' }}>{video.title}</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{video.date}</p>
        </div>
      </div>
    </div>
  );
}

function WorshipVideos() {
  const [videos, setVideos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedVideo, setSelectedVideo] = React.useState(null);

  React.useEffect(() => {
    const API_KEY = 'AIzaSyB9KDwffH02W8tbqTA4PusVKr8QruVZ08o';
    const playlistId = 'UUruxV-V5vqm44PbLlQkuKcA';
    const maxResults = 5; // 1 latest + 4 recent
    
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.items) {
          const formattedVideos = data.items.map(item => {
            const snippet = item.snippet;
            const videoId = snippet.resourceId.videoId;
            const dateStr = snippet.publishedAt ? snippet.publishedAt.split('T')[0].replace(/-/g, '.') : '';
            return {
              id: videoId,
              title: snippet.title,
              date: dateStr,
              thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url,
              videoId: videoId
            };
          });
          setVideos(formattedVideos);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch videos', err);
        setLoading(false);
      });
  }, []);

  const latestVideo = videos.length > 0 ? videos[0] : null;
  const recentVideos = videos.length > 1 ? videos.slice(1) : [];

  return (
    <section 
      id="worship-videos" 
      className="text-white relative py-24 md:py-32 px-4 bg-fixed bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: 'url("/worship-bg.webp")' }}
    >
      {/* High-end Subtle Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.4)] z-10"></div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-[36px] md:text-[48px] font-bold tracking-tight leading-[1.2]">
            예배영상
          </h2>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: '#ccc', fontSize: '18px' }}>예배 영상을 불러오는 중입니다...</div>
        ) : (
          <>
            {/* Latest Video - Large */}
            {latestVideo && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-16 flex justify-center"
              >
                <div className="w-full md:w-[65%]">
                  <div className="relative w-full pb-[56.25%] bg-black rounded-2xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]">
                    <iframe 
                      src={`https://www.youtube.com/embed/${latestVideo.videoId}`} 
                      title={latestVideo.title}
                      className="absolute top-0 left-0 w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="mt-6 text-center">
                    <span className="inline-block px-3 py-1 bg-[#0066cc] text-black text-sm font-bold rounded-full mb-3">최신 영상</span>
                    <h3 className="text-[22px] md:text-[28px] font-bold text-white mb-2 leading-tight">{latestVideo.title}</h3>
                    <p className="text-[15px] md:text-[16px] text-white/70">{latestVideo.date}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Recent Videos - Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {recentVideos.map((video, idx) => (
                <motion.div
                  onClick={() => setSelectedVideo(video)}
                  key={video.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                  className="group flex flex-col cursor-pointer"
                >
                  <div className="w-full aspect-video rounded-2xl overflow-hidden relative mb-4 bg-gray-900 border border-white/5">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <h4 className="text-[16px] md:text-[18px] font-bold text-white mb-2 line-clamp-2 group-hover:text-[#0066cc] transition-colors leading-snug">
                    {video.title}
                  </h4>
                  <p className="text-[14px] text-white/50">{video.date}</p>
                </motion.div>
              ))}
            </div>
          </>
        )}
        
        <div className="mt-16 text-center">
          <a href="https://www.youtube.com/@TV-ue9if" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center space-x-2 border border-white/20 rounded-full px-8 py-3 text-white hover:bg-white/10 transition-colors">
            <PlayCircle className="w-5 h-5 text-[#0066cc]" />
            <span className="font-medium text-[15px]">유튜브 채널 바로가기</span>
          </a>
        </div>
      </div>

      <HomeVideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  );
}

function WorshipSchedule() {
  const sections = useCMSData('cms_sections', { worship: true });
  const isVisible = sections.worship !== false;

  if (!isVisible) return null;

  return (
    <section id="worship-schedule" className="bg-white text-[#111] relative min-h-[350px] flex items-center border-t border-black/5 px-4 py-12 md:py-16 overflow-hidden">
      <div className="max-w-[1200px] w-full mx-auto flex flex-col md:flex-row items-center md:items-start h-full">
        
        {/* Left 1/5: Title */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/5 flex flex-col justify-start shrink-0 mb-8 md:mb-0 md:pr-8 text-center md:text-left mt-0 md:mt-2"
        >
          <div className="text-[13px] md:text-[14px] font-bold tracking-widest text-[#0066cc] mb-1 md:mb-2">예배안내</div>
          <h2 className="text-[28px] md:text-[40px] font-bold tracking-tight text-black leading-tight">
            예배시간
          </h2>
          <div className="w-10 md:w-12 h-1 bg-black mt-3 md:mt-5 mx-auto md:mx-0"></div>
        </motion.div>

        {/* Right 4/5: Content Grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-4/5 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8 md:gap-y-10 md:pl-10 border-l-0 md:border-l border-gray-200"
        >
          {/* Group 1: 주일예배 */}
          {/* Group 1: 주일예배 */}
          <div>
            <h3 className="font-bold text-[16px] md:text-[18px] text-black mb-3 md:mb-4 flex items-center">
              <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#0066cc] mr-2 md:mr-2.5"></span> 주일 예배
            </h3>
            <ul className="text-[14px] md:text-[15px]">
              <li className="flex items-center justify-between py-2.5 border-b border-gray-100">
                <span className="w-[28%] font-bold text-gray-800 text-left">1부예배</span>
                <span className="w-[35%] text-gray-600 font-medium text-center">오전 7시</span>
                <span className="w-[37%] text-[13px] md:text-[14px] text-gray-400 text-right">글로리아홀(B1)</span>
              </li>
              <li className="flex items-center justify-between py-2.5 border-b border-gray-100">
                <span className="w-[28%] font-bold text-gray-800 text-left">2부예배</span>
                <span className="w-[35%] text-gray-600 font-medium text-center">오전 9시</span>
                <span className="w-[37%] text-[13px] md:text-[14px] text-gray-400 text-right">글로리아홀(B1)</span>
              </li>
              <li className="flex items-center justify-between py-2.5">
                <span className="w-[28%] font-bold text-gray-800 text-left">3부예배</span>
                <span className="w-[35%] text-gray-600 font-medium text-center">오전 11시</span>
                <span className="w-[37%] text-[13px] md:text-[14px] text-gray-400 text-right">글로리아홀(B1)</span>
              </li>
            </ul>
          </div>

          {/* Group 2: 주중예배 */}
          <div>
            <h3 className="font-bold text-[16px] md:text-[18px] text-black mb-3 md:mb-4 flex items-center">
              <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-black mr-2 md:mr-2.5"></span> 주중 예배
            </h3>
            <ul className="text-[14px] md:text-[15px]">
              <li className="flex items-center justify-between py-2.5 border-b border-gray-100">
                <span className="w-[28%] font-bold text-gray-800 text-left tracking-tight">수요예배</span>
                <span className="w-[35%] text-gray-600 font-medium text-center tracking-tight">오후 7시 30분</span>
                <span className="w-[37%] text-[13px] md:text-[14px] text-gray-400 text-right tracking-tight">글로리아홀(B1)</span>
              </li>
              <li className="flex items-center justify-between py-2.5 border-b border-gray-100">
                <span className="w-[28%] font-bold text-gray-800 text-left tracking-tight">금요기도회</span>
                <span className="w-[35%] text-gray-600 font-medium text-center tracking-tight">오후 9시 00분</span>
                <span className="w-[37%] text-[13px] md:text-[14px] text-gray-400 text-right tracking-tight">글로리아홀(B1)</span>
              </li>
              <li className="flex items-center justify-between py-2.5">
                <span className="w-[28%] font-bold text-gray-800 text-left tracking-tight">새벽기도회</span>
                <span className="w-[35%] text-gray-600 font-medium text-center tracking-tight">평일 오전 5시</span>
                <span className="w-[37%] text-[13px] md:text-[14px] text-gray-400 text-right tracking-tight">소예배실(2F)</span>
              </li>
            </ul>
          </div>

          {/* Group 3: 다음세대 */}
          <div>
            <h3 className="font-bold text-[16px] md:text-[18px] text-black mb-3 md:mb-4 flex items-center">
              <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-gray-400 mr-2 md:mr-2.5"></span> 다음 세대
            </h3>
            <ul className="text-[14px] md:text-[15px]">
              <li className="flex items-center justify-between py-2.5 border-b border-gray-100">
                <span className="w-[28%] font-bold text-gray-800 text-left tracking-tight">유치·아동부</span>
                <span className="w-[35%] text-gray-600 font-medium text-center tracking-tight">주일 오전 11시</span>
                <span className="w-[37%] text-[13px] md:text-[14px] text-gray-400 text-right tracking-tight">비전홀(3F)</span>
              </li>
              <li className="flex items-center justify-between py-2.5 border-b border-gray-100">
                <span className="w-[28%] font-bold text-gray-800 text-left tracking-tight">중·고등부</span>
                <span className="w-[35%] text-gray-600 font-medium text-center tracking-tight">주일 오전 9시</span>
                <span className="w-[37%] text-[13px] md:text-[14px] text-gray-400 text-right tracking-tight">청소년실(4F)</span>
              </li>
              <li className="flex items-center justify-between py-2.5">
                <span className="w-[28%] font-bold text-gray-800 text-left tracking-tight">청년부 예배</span>
                <span className="w-[35%] text-gray-600 font-medium text-center tracking-tight">주일 오후 2시</span>
                <span className="w-[37%] text-[13px] md:text-[14px] text-gray-400 text-right tracking-tight">글로리아홀(B1)</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PastorGreeting() {
  const section = useCMSData('cms_pastorSection', {
    image: '/pastor-bg.png',
    title: '평화 교회에 오신것을 환영합니다.',
    subTitle: '하나님의 사랑과 은혜가 충만한 곳',
    content: '어떠한 어려움 속에서도 믿음의 자리를 지키며 주님의 길을 걷는 교회\n점점 혼탁해져가는 이 시대에 진리를 전하며 거룩함을 세워가는 교회\n주님의 소유된 백성들을 거룩한 제사장으로 세워 이땅에 하나님의 나라를 이루어가는 교회',
    name: '장 성 진'
  });
  const sections = useCMSData('cms_sections', { pastor: true });
  const isVisible = sections.pastor !== false;

  if (!isVisible) return null;

  return (
    <section 
      id="pastor-greeting" 
      className="relative flex items-center justify-center min-h-[85vh] pt-32 pb-[378px] px-4 bg-fixed bg-[85%_center] md:bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url("${section.image || '/pastor-bg.png'}")` }}
    >
      {/* Gradient Overlay for text readability on left, visibility on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10 z-0"></div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto text-left flex flex-col items-start mt-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[32px] md:text-[48px] font-bold text-white tracking-tight"
        >
          {section.title}
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-16 md:w-20 h-1.5 md:h-2 bg-[#F6BE00] mt-4 mb-5 md:mt-5 md:mb-6 origin-left rounded-full"
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col space-y-1.5 md:space-y-2 text-[15px] md:text-[18px] font-medium text-white/90 leading-relaxed tracking-tight break-keep"
        >
          {section.content?.split('\n').map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-8 md:mt-10 flex flex-col items-start"
        >
          <p className="text-[17px] md:text-[19px] text-white/80 font-medium mb-1">담임목사</p>
          <p className="text-[28px] md:text-[40px] font-bold text-white tracking-wider mb-5 md:mb-6">{section.name}</p>
          
          <button className="bg-black text-[#F6BE00] px-8 md:px-10 py-2.5 md:py-3 rounded-[10px] text-[15px] md:text-[16px] font-bold hover:bg-gray-800 transition-colors duration-300 shadow-lg border border-white/10">
            목사님 인사말 바로가기
          </button>
        </motion.div>
      </div>

    </section>
  );
}

function PhotoGallery() {
  const [photos, setPhotos] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/posts?type=gallery')
      .then(res => res.json())
      .then(data => {
        setPhotos(data.slice(0, 4));
      })
      .catch(err => console.error('Failed to fetch gallery:', err));
  }, []);

  return (
    <section id="photo-gallery" className="bg-white text-[#111] relative py-20 md:py-24 px-4 border-t border-black/5">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Title Area */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="text-sm font-bold tracking-widest text-[#0066cc] mb-3">나눔과 교제</div>
          <h2 className="text-[40px] md:text-[56px] font-bold tracking-tight text-black">
            사진게시판
          </h2>
        </motion.div>

        {/* 4x2 Cards Grid */}
        {photos.length === 0 ? (
          <div className="py-20 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            아직 등록된 사진이 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-10">
            {photos.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="h-full"
              >
                <Link to={`/fellowship/gallery/${item.id}`} style={{ textDecoration: 'none', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'block', height: '100%' }} className="group">
                  <div style={{ position: 'relative', width: '100%', paddingBottom: '70%', overflow: 'hidden' }}>
                    <img src={item.image_urls?.[0] || 'https://via.placeholder.com/500x350?text=No+Image'} alt="갤러리 사진" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} className="group-hover:scale-110" />
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: 'calc(100% - 70%)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 'bold', color: '#1f2937', transition: 'color 0.2s' }} className="group-hover:text-[#0050a3] truncate">
                      {item.title}
                    </h4>
                    <p style={{ margin: 'auto 0 0 0', fontSize: '13px', color: '#94a3b8' }}>{new Date(item.created_at).toLocaleDateString()}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* View More Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link to="/fellowship/gallery" className="inline-block bg-transparent border border-gray-300 text-black px-10 py-3 rounded-full text-[15px] font-bold hover:bg-gray-50 hover:border-gray-400 transition-colors duration-300">
            게시판 바로가기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}



function Location() {
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    const initMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("Kakao map SDK is not loaded.");
        return;
      }
      
      window.kakao.maps.load(() => {
        // Fallback coordinates (서울 중랑구 봉화산로 120)
        const fallbackCoords = new window.kakao.maps.LatLng(37.60533, 127.0924); 
        
        const renderMap = (coords) => {
          const options = { center: coords, level: 3 };
          const map = new window.kakao.maps.Map(mapRef.current, options);
          const marker = new window.kakao.maps.Marker({ map: map, position: coords });
          const content = `<div style="padding:5px 10px; border-radius:8px; background:white; font-size:14px; font-weight:bold; color:#0050a3; border:1px solid #ddd; box-shadow:0 2px 4px rgba(0,0,0,0.1);">나음재활의학과의원</div>`;
          const customOverlay = new window.kakao.maps.CustomOverlay({
              position: coords,
              content: content,
              yAnchor: 2.3
          });
          customOverlay.setMap(map);
        };

        if (window.kakao.maps.services) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch('서울 중랑구 봉화산로 120', function(result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              renderMap(coords);
            } else {
              console.warn("Geocoding failed, using fallback coordinates.");
              renderMap(fallbackCoords);
            }
          });
        } else {
          renderMap(fallbackCoords);
        }
      });
    };

    // React가 너무 빨리 렌더링될 경우를 대비해 약간의 지연 후 실행
    const timer = setTimeout(() => {
      initMap();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="location" className="bg-[#f8f9fa] text-[#111] relative py-20 md:py-24 px-4 border-t border-black/5">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="text-sm font-bold tracking-widest text-[#0066cc] mb-3">LOCATION</div>
          <h2 className="text-[36px] md:text-[48px] font-bold tracking-tight text-black">
            오시는 길
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Map Area */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-[60%] h-[400px] md:h-[500px] bg-gray-200 rounded-2xl overflow-hidden shadow-md relative"
          >
            <div ref={mapRef} className="w-full h-full"></div>
          </motion.div>

          {/* Info Area */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-[40%] flex flex-col justify-center"
          >
            <div className="h-full flex flex-col justify-center space-y-8 py-4 pl-4 md:pl-8 lg:pl-12">
              
              <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '10px', textAlign: 'left', alignItems: 'start' }}>
                <h3 className="text-[16px] md:text-[17px] font-bold text-gray-900 pt-0.5">주소</h3>
                <div className="text-[15px] md:text-[16px] text-gray-700 break-keep leading-relaxed font-medium">
                  서울 중랑구 봉화산로 120
                  <span className="text-[14px] text-gray-500 mt-1 block">(지번: 서울 중랑구 신내동 613)</span>
                </div>
              </div>

              <div className="h-[1px] bg-gray-200/80 w-full"></div>

              <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '10px', textAlign: 'left', alignItems: 'start' }}>
                <h3 className="text-[16px] md:text-[17px] font-bold text-gray-900 pt-0.5">대중교통</h3>
                <div className="space-y-3 text-[15px] md:text-[16px] text-gray-700 font-medium">
                  <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '10px', alignItems: 'start' }}>
                    <strong className="text-gray-800">지하철</strong>
                    <p className="break-keep leading-relaxed text-gray-600">1호선 평화역 3번 출구에서 도보 5분</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '10px', alignItems: 'start' }}>
                    <strong className="text-gray-800">버스</strong>
                    <p className="break-keep leading-relaxed text-gray-600">간선: 100, 200, 300<br/>지선: 1011, 2022</p>
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-gray-200/80 w-full"></div>

              <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '10px', textAlign: 'left', alignItems: 'start' }}>
                <h3 className="text-[16px] md:text-[17px] font-bold text-gray-900 pt-0.5">주차 안내</h3>
                <div className="text-[15px] md:text-[16px] text-gray-700 break-keep leading-relaxed font-medium">
                  병원 건물 지하 주차장 이용 가능 (진료 시 무료)
                  <span className="text-[14px] text-gray-500 mt-1 block">주차장이 혼잡할 수 있으니 가급적 대중교통 이용을 권장합니다.</span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const navigate = useNavigate();
  
  const footer = useCMSData('cms_footerSection', {
    logo: '/logo.jpg',
    description: '환자 중심의 맞춤형 진료를 약속합니다.\n최상의 의료 서비스로 보답하는 나음재활의학과의원이 되겠습니다.',
    churchName: '나음재활의학과의원',
    repName: '',
    address: '서울 중랑구 봉화산로 120',
    phone: '02-000-0000',
    fax: '',
    email: 'contact@naeumclinic.com',
    copyright: 'Copyright © 2026 Naeum Clinic. All rights reserved.'
  });

  return (
    <footer className="bg-[#0a0a0a] text-[#888] pt-20 pb-12 px-6 border-t border-white/5 text-[14px] font-body">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
          
          {/* Brand & Call to action */}
          <div className="md:w-1/2">
            <div className="flex items-center mb-6">
              <div className="bg-white px-3 py-2 rounded-lg inline-block">
                <img src={footer.logo || "/logo.jpg"} alt="로고" className="h-10 w-auto object-contain" />
              </div>
            </div>
            <p className="text-[16px] text-[#999] mb-8 max-w-[400px] leading-[1.6] break-keep">
              {footer.description?.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < footer.description.split('\n').length - 1 && <br/>}
                </React.Fragment>
              ))}
            </p>
          </div>

          {/* Business Info */}
          <div className="md:w-1/2 flex flex-col md:items-end">
            <div className="space-y-2 text-left md:text-right text-[13px] leading-relaxed mt-4 md:mt-0">
              <p><strong className="text-white font-medium text-[15px]">{footer.churchName}</strong> {footer.repName && <span className="ml-2 opacity-80">(대표: {footer.repName})</span>}</p>
              <p>{footer.address}</p>
              <div className="pt-3 flex flex-col md:flex-row md:justify-end gap-2 md:gap-6">
                {footer.phone && <span>Tel: <strong className="text-white font-medium tracking-wider">{footer.phone}</strong></span>}
                {footer.fax && <span>Fax: <strong className="text-white font-medium tracking-wider">{footer.fax}</strong></span>}
                {footer.email && <span>Email: <strong className="text-white font-medium">{footer.email}</strong></span>}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[12px] text-[#666]">
          <p className="mt-4 md:mt-0">{footer.copyright}</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    // 앱 초기 로드 시 백엔드(/api/auth/me)로 요청을 보내 HttpOnly 쿠키(JWT)가 유효한지 검증합니다.
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        
        if (data.success && data.user) {
          setIsLoggedIn(true);
          // 프론트엔드 UI용으로만 로컬 스토리지에 최신 유저 정보를 업데이트합니다.
          localStorage.setItem('userProfile', JSON.stringify(data.user));
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          // 토큰이 없거나 만료된 경우 모든 로컬 캐시를 지우고 로그아웃 상태로 만듭니다.
          setIsLoggedIn(false);
          localStorage.removeItem('userProfile');
          localStorage.removeItem('isLoggedIn');
        }
      } catch (error) {
        console.error('Session check error:', error);
        setIsLoggedIn(false);
        localStorage.removeItem('userProfile');
        localStorage.removeItem('isLoggedIn');
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  if (isCheckingSession) {
    // 세션 확인 중일 때는 아무것도 그리지 않거나 로딩 스피너를 보여줄 수 있습니다.
    return <div className="min-h-screen bg-surface-canvas flex items-center justify-center"></div>;
  }

  return (
    <div className="w-full min-h-screen bg-surface-canvas">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <>
            <SEO />
            <Navbar isLoggedIn={isLoggedIn} />
            <main className="w-full">
              <Hero />
              <QuickMenu />
              <WorshipVideos />
              <WorshipSchedule />
              <PastorGreeting />
              <PhotoGallery />
              <Location />
            </main>
            <Footer />
          </>
        } />
        <Route path="/intro/*" element={
          <>
            <Navbar isLoggedIn={isLoggedIn} />
            <SubPageLayout title="병원소개" parentPath="/intro" />
            <Footer />
          </>
        } />
        <Route path="/info/*" element={
          <>
            <Navbar isLoggedIn={isLoggedIn} />
            <SubPageLayout title="진료안내" parentPath="/info" />
            <Footer />
          </>
        } />
        <Route path="/center/*" element={
          <>
            <Navbar isLoggedIn={isLoggedIn} />
            <SubPageLayout title="전문센터" parentPath="/center" />
            <Footer />
          </>
        } />
        <Route path="/community/*" element={
          <>
            <Navbar isLoggedIn={isLoggedIn} />
            <SubPageLayout title="커뮤니티" parentPath="/community" />
            <Footer />
          </>
        } />
        <Route path="/sub/:slug" element={
          <>
            <Navbar isLoggedIn={isLoggedIn} />
            <DynamicPage />
            <Footer />
          </>
        } />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/estimate" element={<Estimate />} />
        <Route path="/mypage" element={<MyPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/auth/naver/callback" element={<NaverCallback setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/auth/google/callback" element={<GoogleCallback setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
