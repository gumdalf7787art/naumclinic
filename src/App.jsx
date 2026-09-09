import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
import FloatingMenu from './components/FloatingMenu';
import NoticeDetail from './components/NoticeDetail';
import NoticeWrite from './components/NoticeWrite';
import SEO from './components/SEO';

import { Hero, QuickMenu, MedicalVideos, ClinicHours, ThreePrinciples, Location } from './components/home/HomeSections';
import OnePageTemplate from './pages/OnePageTemplate';
import FullPageTemplate from './pages/FullPageTemplate';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
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
    <div className="w-full min-h-screen bg-surface-canvas relative overflow-hidden">
      <ScrollToTop />
      <FloatingMenu />
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
        <Route path="/onepage" element={<OnePageTemplate isLoggedIn={isLoggedIn} />} />
        <Route path="/fullpage" element={<FullPageTemplate isLoggedIn={isLoggedIn} />} />
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
