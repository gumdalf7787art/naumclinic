import useSubMenus from '../hooks/useSubMenus';
import DynamicSubPage from './DynamicSubPage';
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Home, X } from 'lucide-react';

/* ─────────────────────────── Sub-page Components ─────────────────────────── */

function VideoModal({ video, onClose }) {
  if (!video) return null;
  const vId = video.videoId || 'jfKfPfyJRdk';
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

function Word() {
  const [videos, setVideos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedVideo, setSelectedVideo] = React.useState(null);

  // Pagination states
  const [pageToken, setPageToken] = React.useState('');
  const [tokenHistory, setTokenHistory] = React.useState(['']);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [nextPageToken, setNextPageToken] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    const API_KEY = 'AIzaSyB9KDwffH02W8tbqTA4PusVKr8QruVZ08o';
    // 채널 ID: UCruxV-V5vqm44PbLlQkuKcA
    // 업로드 재생목록 ID는 두 번째 글자를 'U'로 변경: UUruxV-V5vqm44PbLlQkuKcA
    const playlistId = 'UUruxV-V5vqm44PbLlQkuKcA';
    const maxResults = 13; // 1 featured + 12 recent
    
    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${API_KEY}`;
    if (pageToken) {
      url += `&pageToken=${pageToken}`;
    }

    fetch(url)
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
        setNextPageToken(data.nextPageToken || null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch videos', err);
        setLoading(false);
      });
  }, [pageToken]);

  const handleNextPage = () => {
    if (nextPageToken) {
      const nextPageIndex = currentPage + 1;
      if (tokenHistory.length <= nextPageIndex) {
        setTokenHistory([...tokenHistory, nextPageToken]);
      }
      setCurrentPage(nextPageIndex);
      setPageToken(nextPageToken);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      const prevPageIndex = currentPage - 1;
      setCurrentPage(prevPageIndex);
      setPageToken(tokenHistory[prevPageIndex]);
    }
  };

  const featuredVideo = videos.length > 0 ? videos[0] : null;
  const recentVideos = videos.length > 1 ? videos.slice(1) : [];

  return (
    <div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px 0', color: '#666', fontSize: '18px' }}>영상을 불러오는 중입니다...</div>
      ) : (
        <>
          {/* ── 가장 최근 영상 (Featured Video, 65% width) ── */}
          {featuredVideo && (
            <div className="flex justify-center mb-8 md:mb-12">
              <div className="w-full md:w-[65%]">
                {/* 16:9 비율 컨테이너 */}
                <div style={{ 
                  position: 'relative', 
                  width: '100%', 
                  paddingBottom: '56.25%', 
                  backgroundColor: '#000', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)',
                }}>
                  <iframe 
                    src={`https://www.youtube.com/embed/${featuredVideo.videoId}`} 
                    title={featuredVideo.title}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="mt-4 md:mt-5 text-center px-2 md:px-0">
                  <h3 className="text-[18px] md:text-[22px] font-bold text-[#111] mb-1 md:mb-1.5">{featuredVideo.title}</h3>
                  <span className="text-[13px] md:text-[14px] text-[#666]">{featuredVideo.date}</span>
                </div>
              </div>
            </div>
          )}

          {/* 구분선 */}
          {featuredVideo && <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '32px 0 md:margin-48px 0' }} className="my-8 md:my-12" />}

          {/* ── 썸네일 카드 갤러리 (4열 3줄) ── */}
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 mb-8 md:mb-12">
            {recentVideos.map((video) => (
              <div key={video.id} style={{ cursor: 'pointer' }} className="group" onClick={() => setSelectedVideo(video)}>
                <div style={{ 
                  position: 'relative', width: '100%', paddingBottom: '56.25%', 
                  backgroundColor: '#eee', borderRadius: '10px', overflow: 'hidden', marginBottom: '8px' 
                }}>
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                    className="group-hover:scale-105"
                  />
                  {/* 작은 Play 아이콘 오버레이 (호버 시 표시) */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div style={{ width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '10px solid #fff', marginLeft: '4px' }}></div>
                  </div>
                </div>
                <h4 style={{ 
                  fontWeight: '600', color: '#222', lineHeight: '1.4', 
                  marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' 
                }} className="text-[12px] md:text-[15px] group-hover:text-[#cc0000] transition-colors tracking-tight">
                  {video.title}
                </h4>
                <div className="text-[10px] md:text-[13px] text-[#888]">{video.date}</div>
              </div>
            ))}
          </div>

          {/* ── 페이지네이션 (이전/다음 버튼) ── */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              style={{ 
                padding: '8px 20px', 
                border: '1px solid #ddd', 
                backgroundColor: currentPage === 0 ? '#f5f5f5' : '#fff', 
                borderRadius: '6px', 
                cursor: currentPage === 0 ? 'not-allowed' : 'pointer', 
                color: currentPage === 0 ? '#999' : '#333', 
                fontSize: '14px', 
                fontWeight: 'bold',
                transition: 'all 0.2s' 
              }} 
            >
              이전 페이지
            </button>
            <span style={{ fontSize: '14px', color: '#666' }}>{currentPage + 1} 페이지</span>
            <button 
              onClick={handleNextPage}
              disabled={!nextPageToken}
              style={{ 
                padding: '8px 20px', 
                border: '1px solid #cc0000', 
                backgroundColor: !nextPageToken ? '#ffcccc' : '#cc0000', 
                borderRadius: '6px', 
                cursor: !nextPageToken ? 'not-allowed' : 'pointer', 
                color: '#fff', 
                fontSize: '14px', 
                fontWeight: 'bold',
                transition: 'all 0.2s' 
              }} 
            >
              다음 페이지
            </button>
          </div>
        </>
      )}

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </div>
  );
}

function Choir() {
  // 샘플 유튜브 영상 데이터 (추후 API 연동으로 교체 가능)
  const featuredVideo = {
    id: '1',
    title: '[특별찬양] 여호와는 나의 목자시니 - 할렐루야 찬양대',
    date: '2026.08.23',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80'
  };

  // 과거 영상 더미 데이터 (총 12개)
  const recentVideos = Array.from({ length: 12 }).map((_, i) => ({
    id: `v${i}`,
    title: `[주일찬양] 하나님의 은혜 - 할렐루야 찬양대`,
    date: `2026.08.${String(20 - i).padStart(2, '0')}`,
    thumbnail: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80',
  }));

  const [selectedVideo, setSelectedVideo] = React.useState(null);

  return (
    <div>
      {/* ── 가장 최근 영상 (Featured Video, 65% width) ── */}
      <div className="flex justify-center mb-8 md:mb-12">
        <div className="w-full md:w-[65%]">
          {/* 16:9 비율 컨테이너 */}
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            paddingBottom: '56.25%', 
            backgroundColor: '#000', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)',
          }}
          >
            <iframe 
              src="https://www.youtube.com/embed/jfKfPfyJRdk" 
              title={featuredVideo.title}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-4 md:mt-5 text-center px-2 md:px-0">
            <h3 className="text-[18px] md:text-[22px] font-bold text-[#111] mb-1 md:mb-1.5">{featuredVideo.title}</h3>
            <span className="text-[13px] md:text-[14px] text-[#666]">{featuredVideo.date}</span>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} className="my-8 md:my-12" />

      {/* ── 썸네일 카드 갤러리 (4열 3줄) ── */}
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 mb-8 md:mb-12">
        {recentVideos.map((video) => (
          <div key={video.id} style={{ cursor: 'pointer' }} className="group" onClick={() => setSelectedVideo(video)}>
            <div style={{ 
              position: 'relative', width: '100%', paddingBottom: '56.25%', 
              backgroundColor: '#eee', borderRadius: '10px', overflow: 'hidden', marginBottom: '8px' 
            }}>
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                className="group-hover:scale-105"
              />
              {/* 작은 Play 아이콘 오버레이 (호버 시 표시) */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div style={{ width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '10px solid #fff', marginLeft: '4px' }}></div>
              </div>
            </div>
            <h4 style={{ 
              fontWeight: '600', color: '#222', lineHeight: '1.4', 
              marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' 
            }} className="text-[12px] md:text-[15px] group-hover:text-[#cc0000] transition-colors tracking-tight">
              {video.title}
            </h4>
            <div className="text-[10px] md:text-[13px] text-[#888]">{video.date}</div>
          </div>
        ))}
      </div>

      {/* ── 페이지네이션 (번호표) ── */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
        <button style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', backgroundColor: '#fff', borderRadius: '6px', cursor: 'pointer', color: '#666', fontSize: '14px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>&lt;</button>
        <button style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cc0000', backgroundColor: '#cc0000', borderRadius: '6px', cursor: 'pointer', color: '#fff', fontWeight: 'bold', fontSize: '14px', transition: 'all 0.2s' }}>1</button>
        <button style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', backgroundColor: '#fff', borderRadius: '6px', cursor: 'pointer', color: '#666', fontSize: '14px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>2</button>
        <button style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', backgroundColor: '#fff', borderRadius: '6px', cursor: 'pointer', color: '#666', fontSize: '14px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>3</button>
        <button style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', backgroundColor: '#fff', borderRadius: '6px', cursor: 'pointer', color: '#666', fontSize: '14px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>&gt;</button>
      </div>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </div>
  );
}

/* ─────────────────────────── Main Worship Layout ─────────────────────────── */



export default function Worship() {
  const MENU_ITEMS = useSubMenus('/worship');
  const currentMenuItems = MENU_ITEMS.length > 0 ? MENU_ITEMS : [{ path: '/worship/word', label: '예배와말씀' }];

  const location = useLocation();
  const currentPath = location.pathname === '/worship' ? '/worship/word' : location.pathname;
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
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{ color: '#fff', fontSize: '38px', fontWeight: 700, letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {/* 예배와찬양 */}
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
            예배와찬양
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
            <Link to="/worship/word" style={{ color: '#888', textDecoration: 'none' }} title="예배와찬양으로 이동" onMouseEnter={(e) => e.currentTarget.style.color = '#333'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>
              예배와찬양
            </Link>
            <ChevronRight size={12} color="#ccc" />
            <span style={{ color: '#333' }}>{currentMenu.label}</span>
          </div>

          {/* Page Title & YouTube Button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-4 md:pb-5 border-b border-[#999] mb-6 md:mb-10 gap-4 md:gap-0">
            <h2 className="text-[26px] md:text-[32px] font-normal text-[#333] m-0">
              {currentMenu.label}
            </h2>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#ff0000] hover:bg-[#cc0000] text-white rounded-lg text-sm font-bold shadow-[0_4px_6px_rgba(255,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              유튜브 채널 바로가기
            </a>
          </div>

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
                <Route path="/" element={<Word />} />
                <Route path="word" element={<Word />} />
                <Route path="choir" element={<Choir />} />
                <Route path="*" element={<DynamicSubPage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
