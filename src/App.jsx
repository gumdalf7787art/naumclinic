import React, { useState, useEffect } from 'react';
import { useCMSData } from './hooks/useCMS';
import * as C from './constants/hospitalData';
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
import NoticeDetail from './components/NoticeDetail';
import NoticeWrite from './components/NoticeWrite';
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

  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const isTransparent = !isScrolled && !isHeaderHovered && !isMenuHovered;

  const defaultHospitalMenus = C.HOSPITAL_MENUS;

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
    <header 
      className={`z-50 flex justify-center w-full transition-colors duration-300 fixed top-0 left-0 ${isTransparent ? 'bg-transparent border-b border-white/30' : 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm'}`}
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => setIsHeaderHovered(false)}
    >
      <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-8 h-[72px]">
        {/* Mega Menu Background */}
        <div 
          className={`fixed top-[72px] left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl transition-all duration-300 ease-in-out border-t border-gray-200/50 overflow-hidden ${isMenuHovered ? 'h-[320px] opacity-100 visible' : 'h-0 opacity-0 invisible border-t-0'}`}
          onMouseEnter={() => setIsMenuHovered(true)}
          onMouseLeave={() => setIsMenuHovered(false)}
        >
          <div className="w-full max-w-7xl mx-auto px-8 h-full flex">
            {/* Left Info Block (Clinic Hours) - Underneath the logo */}
            <div className={`w-[280px] h-full pt-10 pb-8 border-r border-gray-100 pr-8 transition-all duration-500 delay-100 ${isMenuHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h4 className="text-[#0369A1] font-bold mb-4 flex items-center tracking-tight text-[15px]">
                <Clock size={16} className="mr-2" />
                진료 시간 안내
              </h4>
              <ul className="space-y-2.5 text-[13px] text-gray-600 pr-6">
                <li className="flex justify-between items-center">
                  <span className="font-medium text-gray-500">평일</span>
                  <span className="font-bold text-gray-800">09:00 - 19:00</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium text-[#0369A1]">수·금 (야간진료)</span>
                  <span className="font-bold text-[#0369A1]">09:00 - 20:00</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium text-gray-500">토요일</span>
                  <span className="font-bold text-gray-800">09:00 - 14:00</span>
                </li>
                <li className="flex justify-between items-center pt-2.5 mt-2.5 border-t border-gray-100/70">
                  <span className="font-medium text-gray-500">점심시간</span>
                  <span className="text-gray-600 font-medium">13:00 - 14:00</span>
                </li>
              </ul>
              <div className="mt-5 text-[12px] font-medium text-gray-400 bg-gray-50 rounded-md py-2.5 px-3 text-center border border-gray-100">
                토요일 점심시간 없음 / 일·공휴일 휴진
              </div>
            </div>
            
            {/* Right side is intentionally left blank because the sub-menus from nav will overlay perfectly on top of it */}
          </div>
        </div>

        {/* Logo */}
        <Link 
          to="/"
          className="flex items-center cursor-pointer gap-2"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="flex items-center justify-center">
            <img src="/logo-mark.png" alt="나음재활의학과" className="h-8 w-auto object-contain" />
          </div>
          <span className={`font-extrabold text-[20px] tracking-tight transition-colors z-10 ${isTransparent ? 'text-white' : 'text-[#0369A1]'}`}>나음재활의학과의원</span>
        </Link>
        
        {/* Links */}
        <div 
          className={`hidden md:flex items-center h-full space-x-10 text-[16px] font-semibold transition-colors z-10 ${isTransparent ? 'text-white/90' : 'text-[#404b5c]'}`}
          onMouseEnter={() => setIsMenuHovered(true)}
          onMouseLeave={() => setIsMenuHovered(false)}
        >
          {/* Main Menus */}
          {dynamicMenus.length > 0 ? dynamicMenus.map((menu) => (
            <div key={menu.id} className="relative h-full flex items-center">
              <Link to={menu.path || '#'} className={`transition-colors py-4 px-2 h-full flex items-center relative ${isTransparent ? 'hover:text-white' : 'hover:text-[#0369A1]'}`}>
                {menu.name}
              </Link>
              
              {/* Sub Menu Column */}
              <div className={`absolute top-[72px] left-2 w-[200px] pt-8 pb-8 transition-all duration-300 ease-in-out ${isMenuHovered ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                {menu.children && menu.children.length > 0 && (
                  <div className="flex flex-col space-y-4">
                    {menu.children.map(child => (
                      <Link key={child.id} to={child.path || '#'} className="text-[14px] text-gray-600 font-medium hover:text-[#0284C7] transition-colors flex items-center group/item">
                        <span className="w-1 h-1 rounded-full bg-gray-300 mr-2.5 group-hover/item:bg-[#0284C7] group-hover/item:scale-125 transition-all"></span>
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
              <span className={`text-[13px] font-bold hidden sm:block ${isTransparent ? 'text-white' : 'text-[#404b5c]'}`}>내 정보</span>
            </button>
          ) : (
            <>
              {/* 데스크탑 로그인 버튼 */}
              <button
                onClick={() => navigate('/login')}
                className={`text-[15px] font-semibold transition-all duration-200 hidden sm:block cursor-pointer ${
                  isTransparent
                    ? 'text-white/90 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                    : 'text-[#404b5c] hover:text-[#0284c7]'
                }`}
              >
                로그인
              </button>
              {/* 데스크탑 회원가입 버튼 */}
              <button
                onClick={() => navigate('/signup')}
                className={`!py-2 !px-5 !rounded-lg text-[14px] font-bold shadow-sm transition-all duration-200 cursor-pointer ${
                  isTransparent
                    ? 'bg-white/15 border border-white/40 text-white hover:bg-white/35 hover:border-white/60'
                    : 'bg-[#0284c7] border border-[#0284c7] text-white hover:bg-[#0369a1] hover:border-[#0369a1] hover:shadow-md'
                }`}
              >
                회원가입
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`lg:hidden p-2 transition-colors ${isTransparent ? 'text-white' : 'text-[#404b5c]'}`}
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
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 hover:text-[#404b5c]">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-5 px-5 space-y-5">
                {/* Mobile Auth Buttons */}
                <div className="flex flex-col space-y-2 border-b border-gray-100 pb-4">
                  {isLoggedIn ? (
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); navigate('/mypage'); }}
                      className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-center font-bold text-[#404b5c] text-[14px] transition-colors"
                    >
                      내 정보 ({userProfile.name})
                    </button>
                  ) : (
                    <>
                    {/* 모바일 로그인 버튼 */}
                    <button
                      onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }}
                      className="w-full py-2.5 bg-white border-2 border-[#0284c7] hover:bg-[#0284c7] hover:text-white rounded-lg text-center font-bold text-[#0284c7] text-[14px] transition-all duration-200 cursor-pointer"
                    >
                      로그인
                    </button>
                    {/* 모바일 회원가입 버튼 */}
                    <button
                      onClick={() => { setIsMobileMenuOpen(false); navigate('/signup'); }}
                      className="w-full py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-lg text-center font-bold text-[14px] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      회원가입
                    </button>
                  </>
                  )}
                </div>
                
                <div>
                  <h3 className="text-[#0284C7] text-[13px] font-bold mb-2 uppercase tracking-wider">나음 소개</h3>
                  <div className="grid grid-cols-2 gap-y-2.5 pl-1">
                    <Link to="/about/philosophy" onClick={() => setIsMobileMenuOpen(false)} className="text-[#404b5c] font-medium text-[14px]">원장님 인사말</Link>
                    <Link to="/about/doctor" onClick={() => setIsMobileMenuOpen(false)} className="text-[#404b5c] font-medium text-[14px]">의료진 소개</Link>
                    <Link to="/about/facility" onClick={() => setIsMobileMenuOpen(false)} className="text-[#404b5c] font-medium text-[14px]">병원 둘러보기</Link>
                    <Link to="/about/location" onClick={() => setIsMobileMenuOpen(false)} className="text-[#404b5c] font-medium text-[14px]">오시는 길</Link>
                  </div>
                </div>
                <div>
                  <h3 className="text-[#0284C7] text-[13px] font-bold mb-2 uppercase tracking-wider">비수술 통증 클리닉</h3>
                  <div className="grid grid-cols-2 gap-y-2.5 pl-1">
                    <Link to="/pain/spine" onClick={() => setIsMobileMenuOpen(false)} className="text-[#404b5c] font-medium text-[14px]">목·허리 척추 클리닉</Link>
                    <Link to="/pain/joint" onClick={() => setIsMobileMenuOpen(false)} className="text-[#404b5c] font-medium text-[14px]">어깨·관절 클리닉</Link>
                    <Link to="/pain/ultrasound" onClick={() => setIsMobileMenuOpen(false)} className="text-[#404b5c] font-medium text-[14px]">초음파 유도하 주사치료</Link>
                  </div>
                </div>
                <div>
                  <h3 className="text-[#0284C7] text-[13px] font-bold mb-2 uppercase tracking-wider">맞춤 재활 / 도수치료</h3>
                  <div className="grid grid-cols-2 gap-y-2.5 pl-1">
                    <Link to="/rehab/manual" onClick={() => setIsMobileMenuOpen(false)} className="text-[#404b5c] font-medium text-[14px]">통증 교정 도수치료</Link>
                    <Link to="/rehab/post-op" onClick={() => setIsMobileMenuOpen(false)} className="text-[#404b5c] font-medium text-[14px]">수술 후 재활치료</Link>
                  </div>
                </div>
                <div>
                  <h3 className="text-[#0284C7] text-[13px] font-bold mb-2 uppercase tracking-wider">나음 특화 클리닉</h3>
                  <div className="grid grid-cols-2 gap-y-2.5 pl-1">
                    <Link to="/special/sports" onClick={() => setIsMobileMenuOpen(false)} className="text-[#404b5c] font-medium text-[14px]">스포츠 손상 클리닉</Link>
                    <Link to="/special/chronic" onClick={() => setIsMobileMenuOpen(false)} className="text-[#404b5c] font-medium text-[14px]">난치성 신경통 클리닉</Link>
                    <Link to="/special/iv" onClick={() => setIsMobileMenuOpen(false)} className="text-[#404b5c] font-medium text-[14px]">맞춤 수액·면역 클리닉</Link>
                  </div>
                </div>
                <div>
                  <h3 className="text-[#0284C7] text-[13px] font-bold mb-2 uppercase tracking-wider">나음 커뮤니티</h3>
                  <div className="grid grid-cols-2 gap-y-2.5 pl-1">
                    <Link to="/community/notice" onClick={() => setIsMobileMenuOpen(false)} className="text-[#404b5c] font-medium text-[14px]">공지사항</Link>
                    <Link to="/community/non-covered" onClick={() => setIsMobileMenuOpen(false)} className="text-[#404b5c] font-medium text-[14px]">비급여 고지</Link>
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

const DEFAULT_HERO_SLIDES = C.HERO_SLIDES;

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
    <section className="relative w-full h-[580px] lg:h-[700px] overflow-hidden bg-gray-800">
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
                <Link to={slides[currentSlide].btnLink || '#'} className="inline-block bg-white text-[#404b5c] text-[14px] sm:text-[16px] font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
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

const DEFAULT_QUICK_SECTION = C.QUICK_SECTION;

const DEFAULT_QUICK_LINKS = C.QUICK_LINKS;

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
            <span className="text-[18px] md:text-[22px] font-semibold text-[#0284C7] mb-3 tracking-wide uppercase">{section.mottoYear}</span>
          )}
          {section.mottoMain && (
            <h2 className="text-[32px] md:text-[46px] font-black text-[#404b5c] tracking-tight leading-tight">
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
          <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
              className="h-full"
            >
              <Link 
                to={menu.link || menu.path} 
                className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
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
                <span className="inline-block text-[#0284C7] text-[11px] font-bold tracking-wide mb-1.5 px-2 py-0.5 bg-[#0284C7]/10 rounded-full w-fit">
                  {menu.tag || '진료안내'}
                </span>
              )}
              <h3 className="text-[15px] sm:text-[17px] font-bold text-[#404b5c] tracking-tight leading-snug mb-1 group-hover:text-[#0369A1] transition-colors">
                {menu.title || menu.name}
              </h3>
              {(menu.subtitle || menu.sub) && (
                <p className="text-[12px] sm:text-[13px] text-gray-500 leading-snug mb-2 line-clamp-2 break-keep flex-1">
                  {menu.subtitle || menu.sub}
                </p>
              )}
              
              <div className="mt-auto flex items-center text-[12px] font-bold text-[#0284C7] group/btn">
                자세히 보기 
                <ArrowRight size={12} className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
          </motion.div>
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
      <div style={{ position: 'relative', width: '90%', maxWidth: '1000px', backgroundColor: '#111827', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
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
          <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>{video.title}</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{video.date}</p>
        </div>
      </div>
    </div>
  );
}

function MedicalVideos() {
  const [videos, setVideos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedVideo, setSelectedVideo] = React.useState(null);

  React.useEffect(() => {
    const API_KEY = 'AIzaSyB9KDwffH02W8tbqTA4PusVKr8QruVZ08o';
    const playlistId = 'UUdXw-_i5MesRrzKbd4pTs_A';
    // fetch 30 to filter shorts
    
    // Fetch more items initially to account for filtered out Shorts
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`)
      .then(res => res.json())
      .then(async data => {
        if (data.items) {
          const videoIds = data.items.map(item => item.snippet.resourceId.videoId).join(',');
          // Fetch duration details
          const durationRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}`);
          const durationData = await durationRes.json();
          
          const durationMap = {};
          if (durationData.items) {
            durationData.items.forEach(v => {
              durationMap[v.id] = v.contentDetails.duration;
            });
          }

          let formattedVideos = data.items
            .filter(item => {
              const duration = durationMap[item.snippet.resourceId.videoId] || '';
              const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
              let totalSeconds = 0;
              if (match) {
                const hours = parseInt(match[1] || '0', 10);
                const minutes = parseInt(match[2] || '0', 10);
                const seconds = parseInt(match[3] || '0', 10);
                totalSeconds = hours * 3600 + minutes * 60 + seconds;
              }
              // Show only videos that are 3 minutes (180 seconds) or longer
              return totalSeconds >= 180;
            })
            .map(item => {
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
            
          // Take exactly 9 videos (1 latest, 8 recent)
          setVideos(formattedVideos.slice(0, 9));
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
      id="medical-videos" 
      className="text-white relative py-24 md:py-32 px-4 bg-fixed bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url("${C.MEDIA_SECTION.bgImage}")` }}
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
            {C.MEDIA_SECTION.title}
          </h2>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: '#ccc', fontSize: '18px' }}>영상을 불러오는 중입니다...</div>
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
                  <div className="relative w-full pb-[56.25%] bg-gray-800 rounded-2xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]">
                    <iframe 
                      src={`https://www.youtube.com/embed/${latestVideo.videoId}`} 
                      title={latestVideo.title}
                      className="absolute top-0 left-0 w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="mt-6 text-center">
                    <span className="inline-block px-3 py-1 bg-[#0284C7] text-white text-sm font-bold rounded-full mb-3">최신 영상</span>
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
                  <h4 className="text-[16px] md:text-[18px] font-bold text-white mb-2 line-clamp-2 group-hover:text-[#0284C7] transition-colors leading-snug">
                    {video.title}
                  </h4>
                  <p className="text-[14px] text-white/50">{video.date}</p>
                </motion.div>
              ))}
            </div>
          </>
        )}
        
        <div className="mt-16 text-center">
          <a href={C.MEDIA_SECTION.youtubeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center space-x-2 border border-white/20 rounded-full px-8 py-3 text-white hover:bg-white/10 transition-colors">
            <PlayCircle className="w-5 h-5 text-[#0284C7]" />
            <span className="font-medium text-[15px]">{C.MEDIA_SECTION.youtubeText}</span>
          </a>
        </div>
      </div>

      <HomeVideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  );
}

function ClinicHours() {
  const sections = useCMSData('cms_sections', { clinicHours: true });
  const isVisible = sections.clinicHours !== false;

  if (!isVisible) return null;

  return (
    <section id="clinic-hours" className="bg-white text-[#404b5c] relative min-h-[350px] flex items-center border-t border-black/5 px-4 py-12 md:py-16 overflow-hidden">
      <div className="max-w-[1200px] w-full mx-auto flex flex-col md:flex-row items-center md:items-start h-full">
        
        {/* Left 1/5: Title */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/5 flex flex-col justify-start shrink-0 mb-8 md:mb-0 md:pr-8 text-center md:text-left mt-0 md:mt-2"
        >
          <div className="text-[13px] md:text-[14px] font-bold tracking-widest text-[#0284C7] mb-1 md:mb-2">{C.CLINIC_HOURS_SECTION.tag}</div>
          <h2 className="text-[28px] md:text-[40px] font-bold tracking-tight text-[#404b5c] leading-tight">
            {C.CLINIC_HOURS_SECTION.title.split(' ')[0]}<br className="hidden md:block"/> {C.CLINIC_HOURS_SECTION.title.split(' ').slice(1).join(' ')}
          </h2>
          <div className="w-10 md:w-12 h-1 bg-gray-800 mt-3 md:mt-5 mx-auto md:mx-0"></div>
        </motion.div>

        {/* Right 4/5: Content Grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-4/5 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8 md:gap-y-10 md:pl-10 border-l-0 md:border-l border-gray-200"
        >
          {C.CLINIC_HOURS_SECTION.groups.map((group, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-[16px] md:text-[18px] text-[#404b5c] mb-3 md:mb-4 flex items-center">
                <span className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full ${group.dotColor} mr-2 md:mr-2.5`}></span> {group.title}
              </h3>
              <ul className="text-[14px] md:text-[15px]">
                {group.items.map((item, itemIdx) => (
                  <li key={itemIdx} className={`flex flex-col py-3 ${itemIdx < group.items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#404b5c] tracking-tight">{item.label}</span>
                        <span className="text-[13px] text-gray-400 tracking-tight">{item.desc}</span>
                      </div>
                      <span className="text-gray-600 font-medium tracking-tight whitespace-pre-wrap">{item.time}</span>
                    </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ThreePrinciples() {
    const section = useCMSData('cms_pastorSection', C.THREE_PRINCIPLES);
    const sections = useCMSData('cms_sections', { pastor: true });
    const isVisible = sections.pastor !== false;
  
    if (!isVisible) return null;
  
    return (
      <section 
        id="three-principles" 
        className="relative flex items-center min-h-[85vh] py-24 md:py-32 px-4 bg-center bg-cover bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url("/principles-bg-new.png")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/40 z-0"></div>
  
        <div className="relative z-10 w-full max-w-[1200px] mx-auto text-left flex flex-col md:flex-row items-center justify-between">
          
          <div className="w-full md:w-[55%] z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="text-[#0284C7] font-bold tracking-widest text-[14px] md:text-[16px] mb-3">{section.tag}</div>
              <h2 className="text-[36px] md:text-[50px] font-bold text-white tracking-tight leading-tight mb-4">
                {section.title}
              </h2>
              <p className="text-[18px] md:text-[22px] text-white/80 font-medium mb-12">{section.subTitle}</p>
            </motion.div>

            <div className="space-y-6 md:space-y-8">
              {section.principles && section.principles.map((principle, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
                  className="flex items-start group"
                >
                  <div className="text-[28px] md:text-[36px] font-black text-white/20 group-hover:text-[#0284C7] transition-colors duration-500 mr-6 md:mr-8 mt-1">
                    {principle.num}
                  </div>
                  <div>
                    <h3 className="text-[20px] md:text-[24px] font-bold text-white mb-2">{principle.title}</h3>
                    <p className="text-[15px] md:text-[16px] text-white/70 leading-relaxed break-keep max-w-[450px]">
                      {principle.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden md:block w-full md:w-[45%] absolute right-0 bottom-[-130px] z-10"
          >
            <img 
              src="/doctor-profile.png" 
              alt="대표원장" 
              className="w-full h-auto object-contain drop-shadow-2xl max-h-[800px]"
            />
          </motion.div>
        </div>
      </section>
    );
  }
  
  function HospitalGallery() {
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
    <section id="hospital-gallery" className="bg-white text-[#404b5c] relative py-20 md:py-24 px-4 border-t border-black/5">
      <div className="max-w-[1200px] mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="text-sm font-bold tracking-widest text-[#0284C7] mb-3">{C.GALLERY_SECTION.tag}</div>
          <h2 className="text-[40px] md:text-[56px] font-bold tracking-tight text-[#404b5c]">
            {C.GALLERY_SECTION.title}
          </h2>
        </motion.div>

        {photos.length === 0 ? (
          <div className="py-20 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            {C.GALLERY_SECTION.emptyText}
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
                <Link to={`/community/gallery/${item.id}`} style={{ textDecoration: 'none', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'block', height: '100%' }} className="group">
                  <div style={{ position: 'relative', width: '100%', paddingBottom: '70%', overflow: 'hidden' }}>
                    <img src={item.image_urls?.[0] || 'https://via.placeholder.com/500x350?text=No+Image'} alt="사진" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} className="group-hover:scale-110" />
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: 'calc(100% - 70%)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 'bold', color: '#1f2937', transition: 'color 0.2s' }} className="group-hover:text-[#0369A1] truncate">
                      {item.title}
                    </h4>
                    <p style={{ margin: 'auto 0 0 0', fontSize: '13px', color: '#94a3b8' }}>{new Date(item.created_at).toLocaleDateString()}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link to={C.GALLERY_SECTION.buttonLink} className="inline-block bg-transparent border border-gray-300 text-[#404b5c] px-10 py-3 rounded-full text-[15px] font-bold hover:bg-gray-50 hover:border-gray-400 transition-colors duration-300">
            {C.GALLERY_SECTION.buttonText}
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
        const fallbackCoords = new window.kakao.maps.LatLng(37.60533, 127.0924); 
        
        const renderMap = (coords) => {
          const options = { center: coords, level: 3 };
          const map = new window.kakao.maps.Map(mapRef.current, options);
          const marker = new window.kakao.maps.Marker({ map: map, position: coords });
          const content = `<div style="padding:5px 10px; border-radius:8px; background:white; font-size:14px; font-weight:bold; color:#0369A1; border:1px solid #ddd; box-shadow:0 2px 4px rgba(0,0,0,0.1);">${C.LOCATION_SECTION.title}</div>`;
          const customOverlay = new window.kakao.maps.CustomOverlay({
              position: coords,
              content: content,
              yAnchor: 2.3
          });
          customOverlay.setMap(map);
        };

        if (window.kakao.maps.services) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(C.LOCATION_SECTION.address, function(result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              renderMap(coords);
            } else {
              renderMap(fallbackCoords);
            }
          });
        } else {
          renderMap(fallbackCoords);
        }
      });
    };

    const timer = setTimeout(() => {
      initMap();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="location" className="bg-[#f8f9fa] text-[#404b5c] relative py-20 md:py-24 px-4 border-t border-black/5">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="text-sm font-bold tracking-widest text-[#0284C7] mb-3">{C.LOCATION_SECTION.tag}</div>
          <h2 className="text-[36px] md:text-[48px] font-bold tracking-tight text-[#404b5c]">
            {C.LOCATION_SECTION.title}
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-[60%] h-[400px] md:h-[500px] bg-gray-200 rounded-2xl overflow-hidden shadow-md relative"
          >
            <div ref={mapRef} className="w-full h-full"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-[40%] flex flex-col justify-center"
          >
            <div className="h-full flex flex-col justify-center space-y-8 py-4 pl-4 md:pl-8 lg:pl-12">
              
              <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '10px', textAlign: 'left', alignItems: 'start' }}>
                <h3 className="text-[16px] md:text-[17px] font-bold text-[#404b5c] pt-0.5">주소</h3>
                <div className="text-[15px] md:text-[16px] text-[#404b5c] break-keep leading-relaxed font-medium">
                  {C.LOCATION_SECTION.address}
                  <span className="text-[14px] text-gray-500 mt-1 block">{C.LOCATION_SECTION.addressSub}</span>
                </div>
              </div>

              <div className="h-[1px] bg-gray-200/80 w-full"></div>

              <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '10px', textAlign: 'left', alignItems: 'start' }}>
                <h3 className="text-[16px] md:text-[17px] font-bold text-[#404b5c] pt-0.5">대중교통</h3>
                <div className="space-y-3 text-[15px] md:text-[16px] text-[#404b5c] font-medium">
                  <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '10px', alignItems: 'start' }}>
                    <strong className="text-[#404b5c]">{C.LOCATION_SECTION.transport.subway.title}</strong>
                    <p className="break-keep leading-relaxed text-gray-600">{C.LOCATION_SECTION.transport.subway.desc}</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '10px', alignItems: 'start' }}>
                    <strong className="text-[#404b5c]">{C.LOCATION_SECTION.transport.bus.title}</strong>
                    <p className="break-keep leading-relaxed text-gray-600">
                      {C.LOCATION_SECTION.transport.bus.desc.split('\n').map((line, i) => (
                        <React.Fragment key={i}>{line}<br/></React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-gray-200/80 w-full"></div>

              <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '10px', textAlign: 'left', alignItems: 'start' }}>
                <h3 className="text-[16px] md:text-[17px] font-bold text-[#404b5c] pt-0.5">{C.LOCATION_SECTION.parking.title}</h3>
                <div className="text-[15px] md:text-[16px] text-[#404b5c] break-keep leading-relaxed font-medium">
                  {C.LOCATION_SECTION.parking.desc}
                  <span className="text-[14px] text-gray-500 mt-1 block">{C.LOCATION_SECTION.parking.sub}</span>
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
  const footer = useCMSData('cms_footerSection', C.FOOTER_SECTION);

  return (
    <footer className="bg-gray-900 text-[#888] pt-20 pb-12 px-6 border-t border-white/5 text-[14px] font-body">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
          
          <div className="md:w-1/2">
            <div className="flex items-center mb-6">
              <div className="bg-white px-4 py-3 rounded-xl inline-block shadow-md">
                  <img src={footer.logo || "/logo-full.png"} alt="로고" className="h-20 sm:h-24 w-auto object-contain" />
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

          <div className="md:w-1/2 flex flex-col md:items-end">
            <div className="space-y-2 text-left md:text-right text-[13px] leading-relaxed mt-4 md:mt-0">
              <p><strong className="text-white font-medium text-[15px]">{footer.clinicName}</strong> {footer.repName && <span className="ml-2 opacity-80">(대표: {footer.repName})</span>}</p>
              <p>{footer.address}</p>
              <div className="pt-3 flex flex-col md:flex-row md:justify-end gap-2 md:gap-6">
                {footer.phone && <span>Tel: <strong className="text-white font-medium tracking-wider">{footer.phone}</strong></span>}
                {footer.fax && <span>Fax: <strong className="text-white font-medium tracking-wider">{footer.fax}</strong></span>}
                {footer.email && <span>Email: <strong className="text-white font-medium">{footer.email}</strong></span>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[12px] text-[#666]">
          <p className="mt-4 md:mt-0">{footer.copyright}</p>
          <div className="flex space-x-6">
            {footer.links?.map((link, idx) => (
              <Link key={idx} to={link.path} className="hover:text-white transition-colors">{link.label}</Link>
            ))}
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
              <ClinicHours />
              <ThreePrinciples />
              <MedicalVideos />
              <Location />
            </main>
            <Footer />
          </>
        } />
        <Route path="/about/*" element={
          <>
            <Navbar isLoggedIn={isLoggedIn} />
            <SubPageLayout title="나음 소개" engTitle="ABOUT US" parentPath="/about" />
            <Footer />
          </>
        } />
        <Route path="/pain/*" element={
          <>
            <Navbar isLoggedIn={isLoggedIn} />
            <SubPageLayout title="비수술 통증 클리닉" engTitle="PAIN CLINIC" parentPath="/pain" />
            <Footer />
          </>
        } />
        <Route path="/rehab/*" element={
          <>
            <Navbar isLoggedIn={isLoggedIn} />
            <SubPageLayout title="맞춤 재활 / 도수치료" engTitle="REHABILITATION" parentPath="/rehab" />
            <Footer />
          </>
        } />
        <Route path="/special/*" element={
          <>
            <Navbar isLoggedIn={isLoggedIn} />
            <SubPageLayout title="나음 특화 클리닉" engTitle="NAUM SPECIAL CLINIC" parentPath="/special" />
            <Footer />
          </>
        } />
        <Route path="/community/notice/write" element={
          <>
            <Navbar isLoggedIn={isLoggedIn} />
            <SubPageLayout title="나음 커뮤니티" engTitle="COMMUNITY" parentPath="/community">
              <NoticeWrite />
            </SubPageLayout>
            <Footer />
          </>
        } />
        <Route path="/community/notice/:id" element={
          <>
            <Navbar isLoggedIn={isLoggedIn} />
            <SubPageLayout title="나음 커뮤니티" engTitle="COMMUNITY" parentPath="/community">
              <NoticeDetail />
            </SubPageLayout>
            <Footer />
          </>
        } />
        <Route path="/community/*" element={
          <>
            <Navbar isLoggedIn={isLoggedIn} />
            <SubPageLayout title="나음 커뮤니티" engTitle="COMMUNITY" parentPath="/community" />
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
