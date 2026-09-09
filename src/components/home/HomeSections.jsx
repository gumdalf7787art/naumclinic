import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle, MapPin, X, Clock, FileText, Search, Users } from 'lucide-react';
import { useCMSData } from '../../hooks/useCMS';
import * as C from '../../constants/hospitalData';

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
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-10 w-full max-w-5xl mx-auto px-4">
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
            <div className="py-2.5 px-3 sm:py-4 sm:px-5 flex flex-col flex-1 bg-white relative">
              {(menu.tag || menu.icon) && (
                <span className="inline-block text-[#0284C7] text-[10px] sm:text-[11px] font-bold tracking-wide mb-1.5 px-2 py-0.5 bg-[#0284C7]/10 rounded-full w-fit">
                  {menu.tag || '진료안내'}
                </span>
              )}
              <h3 className="text-[14px] sm:text-[17px] font-bold text-[#404b5c] tracking-tight leading-snug mb-1 group-hover:text-[#0369A1] transition-colors">
                {menu.title || menu.name}
              </h3>
              {(menu.subtitle || menu.sub) && (
                <p className="text-[11px] sm:text-[13px] text-gray-500 leading-snug mb-2 line-clamp-2 break-keep flex-1">
                  {menu.subtitle || menu.sub}
                </p>
              )}
              
              <div className="mt-auto flex items-center text-[11px] sm:text-[12px] font-bold text-[#0284C7] group/btn">
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
  const clinicHours = useCMSData('cms_clinicHoursSection', C.CLINIC_HOURS_SECTION);
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
          <div className="text-[13px] md:text-[14px] font-bold tracking-widest text-[#0284C7] mb-1 md:mb-2">{clinicHours.tag}</div>
          <h2 className="text-[28px] md:text-[40px] font-bold tracking-tight text-[#404b5c] leading-tight">
            {clinicHours.title.split(' ')[0]}<br className="hidden md:block"/> {clinicHours.title.split(' ').slice(1).join(' ')}
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
          {clinicHours.groups.map((group, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-[16px] md:text-[18px] text-[#404b5c] mb-3 md:mb-4 flex items-center">
                <span className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full ${group.dotColor} mr-2 md:mr-2.5`}></span> {group.title}
              </h3>
              <ul className="text-[14px] md:text-[15px]">
                {group.items.map((item, itemIdx) => (
                  <li key={itemIdx} className={`py-3.5 ${itemIdx < group.items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      {/* 모바일 뷰 */}
                      <div className="md:hidden flex flex-col gap-1.5">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="font-bold text-[#404b5c] text-[15px] tracking-tight">{item.label}</span>
                          <span className="text-gray-600 font-medium tracking-tight text-[14px]">{item.time}</span>
                        </div>
                        {item.desc && (
                          <span className="text-[13px] text-gray-500 tracking-tight flex items-center before:content-[''] before:w-1 before:h-1 before:bg-gray-300 before:rounded-full before:mr-1.5">{item.desc}</span>
                        )}
                      </div>
                      
                      {/* 데스크탑 뷰 */}
                      <div className="hidden md:flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[#404b5c] tracking-tight">{item.label}</span>
                          <span className="text-[13px] text-gray-400 tracking-tight">{item.desc}</span>
                        </div>
                        <span className="text-gray-600 font-medium tracking-tight whitespace-pre-wrap">{item.time}</span>
                      </div>
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
    const section = useCMSData('cms_principlesSection', C.THREE_PRINCIPLES);
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
            <div className="h-full flex flex-col justify-center space-y-7 py-4 pl-4 md:pl-8 lg:pl-12">
              
              {/* 전화번호 (크게 강조) */}
              <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '10px', textAlign: 'left', alignItems: 'center' }}>
                <h3 className="text-[16px] md:text-[17px] font-bold text-[#404b5c]">상담/예약</h3>
                <div className="text-[26px] md:text-[32px] font-extrabold text-[#0369A1] tracking-tight">
                  {C.LOCATION_SECTION.phone}
                </div>
              </div>

              <div className="h-[1px] bg-gray-200/80 w-full"></div>

              {/* 진료시간 */}
              <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '10px', textAlign: 'left', alignItems: 'start' }}>
                <h3 className="text-[16px] md:text-[17px] font-bold text-[#404b5c] pt-0.5">진료시간</h3>
                <div className="text-[15px] md:text-[16px] text-[#404b5c] font-medium break-keep">
                  {C.LOCATION_SECTION.time}
                </div>
              </div>

              <div className="h-[1px] bg-gray-200/80 w-full"></div>
              
              {/* 주소 */}
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

export { Hero, QuickMenu, MedicalVideos, ClinicHours, ThreePrinciples, Location };
