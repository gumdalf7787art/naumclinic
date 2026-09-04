import useSubMenus from '../hooks/useSubMenus';
import DynamicSubPage from './DynamicSubPage';
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

/* ─────────────────────────── Sub-page Components ─────────────────────────── */

function DepartmentInfo({ title, subtitle, imageSrc, description }) {
  return (
    <div>
      {/* Title Box */}
      <div className="bg-[#f8fafc] border-l-[4px] border-[#cc0000] p-4 md:py-6 md:px-8 rounded-r-lg mb-8 md:mb-10 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        <h3 className="text-[20px] md:text-[24px] font-bold text-[#111] mb-1 md:mb-2 m-0">{title}</h3>
        <p className="text-[13px] md:text-[15px] text-[#555] m-0">{subtitle}</p>
      </div>

      {/* Card News (Horizontal) */}
      <div className="flex flex-col md:flex-row bg-white border border-[#eee] rounded-[16px] overflow-hidden shadow-[0_10px_20px_-5px_rgba(0,0,0,0.05)] mb-8 md:mb-12 gap-0 md:gap-8">
        <div className="w-full md:w-[45%] shrink-0">
          <div 
            className="w-full h-[200px] md:h-full md:min-h-[260px] bg-cover bg-center"
            style={{ backgroundImage: `url(${imageSrc})` }} 
          />
        </div>
        <div className="flex-1 flex flex-col justify-center p-6 md:py-8 md:pr-8 md:pl-0">
          <h4 className="text-[18px] md:text-[20px] font-bold text-[#cc0000] mb-3 md:mb-4 m-0">사역 소개</h4>
          <div className="text-[14px] md:text-[15px] text-[#444] leading-[1.8] break-keep">
            {description}
          </div>
        </div>
      </div>

      {/* Custom Content Section (빈 공간) */}
      <div className="bg-[#fafafa] border-2 border-dashed border-[#ddd] rounded-[16px] p-6 md:p-14 text-center min-h-[150px] md:min-h-[200px] flex items-center justify-center text-[#888] text-[13px] md:text-[15px]">
        자유롭게 추가하실 수 있는 빈 공간입니다. <br className="hidden md:block" />(사진 갤러리, 표, 조직도, 게시판 등을 넣을 수 있습니다)
      </div>
    </div>
  );
}

function Kids() {
  return <DepartmentInfo 
    title="유초등부" 
    subtitle="말씀 안에서 쑥쑥 자라나는 다음 세대" 
    imageSrc="https://images.unsplash.com/photo-1519340333755-56e9c1d04079?w=800&q=80"
    description={<>
      평화교회 유초등부는 어린이들이 하나님의 사랑을 배우고, 예수님의 성품을 닮아가는 건강한 공동체입니다. <br/><br/>
      매주 신나는 찬양과 재미있는 성경 이야기, 그리고 다양한 공과 활동을 통해 믿음의 기초를 튼튼하게 다집니다.
    </>}
  />;
}

function Youth() {
  return <DepartmentInfo 
    title="중고등부" 
    subtitle="세상의 빛과 소금으로 세워지는 청소년" 
    imageSrc="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80"
    description={<>
      사춘기의 고민과 학업의 부담 속에서도 하나님 안에서 참된 비전을 발견하도록 돕습니다. <br/><br/>
      진실한 예배와 깊이 있는 제자훈련을 통해 세상을 이길 믿음의 세대로 양육합니다.
    </>}
  />;
}

function YoungAdult() {
  return <DepartmentInfo 
    title="청년부" 
    subtitle="진리와 사랑으로 하나 되는 청년 공동체" 
    imageSrc="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
    description={<>
      열정적으로 하나님을 예배하며, 일상 속에서 그리스도의 향기를 발하는 청년부입니다. <br/><br/>
      서로의 삶을 나누는 소그룹 모임과 국내외 선교 활동을 통해 실천하는 신앙을 배웁니다.
    </>}
  />;
}

function Womens() {
  return <DepartmentInfo 
    title="여선교회" 
    subtitle="기도와 섬김으로 교회를 세우는 어머니들의 모임" 
    imageSrc="https://images.unsplash.com/photo-1573165231977-3f0e27806045?w=800&q=80"
    description={<>
      교회의 든든한 기도의 기둥이자, 소외된 이웃을 향한 따뜻한 섬김을 실천하는 여선교회입니다. <br/><br/>
      정기적인 기도 모임과 다양한 구제 활동, 교회 내 행사 지원 등을 통해 그리스도의 사랑을 나눕니다.
    </>}
  />;
}

function Mens() {
  return <DepartmentInfo 
    title="남선교회" 
    subtitle="말씀 위에 굳게 서서 헌신하는 아버지들의 공동체" 
    imageSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
    description={<>
      가정과 교회의 영적 리더로서 든든히 서가기 위해 함께 모여 말씀을 나누고 기도하는 남선교회입니다. <br/><br/>
      교회의 굵직한 사역들을 앞장서서 감당하며, 지역 사회를 위한 봉사와 선교 활동에 힘쓰고 있습니다.
    </>}
  />;
}

/* ─────────────────────────── Main Education Layout ─────────────────────────── */



export default function Education() {
  const MENU_ITEMS = useSubMenus('/education');
  const currentMenuItems = MENU_ITEMS.length > 0 ? MENU_ITEMS : [{ path: '/education/kids', label: '유초등부' }];

  const location = useLocation();
  const currentPath = location.pathname === '/education' ? '/education/kids' : location.pathname;
  const currentMenu = currentMenuItems.find(item => item.path === currentPath) || currentMenuItems[0];

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      
      {/* ── Full Width Top Banner ── */}
      <div style={{
        width: '100%',
        height: '200px',
        backgroundImage: 'url("/sub-header-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        {/* Semi-transparent overlay for better text readability */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{ color: '#fff', fontSize: '38px', fontWeight: 700, letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {/* 교육과선교 */}
          </h1>
        </div>
      </div>

      {/* ── Body: Sidebar + Content ── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-5 py-8 md:py-[60px] flex flex-col md:flex-row gap-8 md:gap-[60px] items-start w-full">
        
        {/* ── Sidebar (LNB) ── */}
        <nav className="hidden md:block w-[240px] shrink-0">
          {/* LNB Header */}
          <div style={{
            background: '#2a4358',
            color: '#fff',
            textAlign: 'center',
            padding: '18px 0',
            fontSize: '20px',
            fontWeight: 500
          }}>
            교육과선교
          </div>
          
          {/* LNB Menu */}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid #eee' }}>
            {currentMenuItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <li key={item.path} style={{ borderBottom: '1px solid #eee' }}>
                  <Link 
                    to={item.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 20px',
                      fontSize: '15px',
                      fontWeight: isActive ? 'bold' : 'normal',
                      color: isActive ? '#e64835' : '#444',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = '#e64835';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = '#444';
                    }}
                  >
                    <span>{item.label}</span>
                    {isActive && <ChevronRight size={16} color="#e64835" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Main Content ── */}
        <div className="flex-1 w-full min-w-0">
          
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#888', marginBottom: '16px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', color: '#888', textDecoration: 'none' }} title="홈으로 이동" onMouseEnter={(e) => e.currentTarget.style.color = '#333'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>
              <Home size={12} />
            </Link>
            <ChevronRight size={12} color="#ccc" />
            <Link to="/education" style={{ color: '#888', textDecoration: 'none' }} title="교육과선교로 이동" onMouseEnter={(e) => e.currentTarget.style.color = '#333'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>
              교육과선교
            </Link>
            <ChevronRight size={12} color="#ccc" />
            <span style={{ color: '#333' }}>{currentMenu.label}</span>
          </div>

          {/* Page Title */}
          <h2 className="text-[26px] md:text-[32px] font-normal text-[#333] pb-4 md:pb-5 border-b border-[#999] mb-6 md:mb-10 m-0">
            {currentMenu.label}
          </h2>

          {/* Dynamic Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Routes>
                <Route path="/" element={<DynamicSubPage defaultSlug="education/kids" />} />
                <Route path="kids" element={<DynamicSubPage defaultSlug="education/kids" />} />
                <Route path="youth" element={<DynamicSubPage defaultSlug="education/youth" />} />
                <Route path="young-adult" element={<DynamicSubPage defaultSlug="education/young-adult" />} />
                <Route path="womens" element={<DynamicSubPage defaultSlug="education/womens" />} />
                <Route path="mens" element={<DynamicSubPage defaultSlug="education/mens" />} />
                <Route path="*" element={<DynamicSubPage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
