import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Hero, QuickMenu, ClinicHours, ThreePrinciples, MedicalVideos, Location } from '../components/home/HomeSections';

export default function FullPageTemplate({ isLoggedIn }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);
  const totalSections = 7; // Hero, Quick, Hours, Principles, Videos, Location, Footer

  // Prevent body from scrolling natively
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Remove the html snap style if it was there
    document.documentElement.style.scrollSnapType = 'none';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleWheel = (e) => {
    if (isScrolling.current) return;
    
    if (e.deltaY > 0 && activeIndex < totalSections - 1) {
      isScrolling.current = true;
      setActiveIndex(prev => prev + 1);
    } else if (e.deltaY < 0 && activeIndex > 0) {
      isScrolling.current = true;
      setActiveIndex(prev => prev - 1);
    }
    
    setTimeout(() => {
      isScrolling.current = false;
    }, 1000); // 1 second cooldown for scroll animation
  };

  return (
    <div 
      className="w-full h-screen bg-surface-canvas overflow-hidden relative" 
      onWheel={handleWheel}
    >
      <SEO />
      <Navbar isLoggedIn={isLoggedIn} isFullPage={true} forceSolid={activeIndex > 0} />
      
      {/* Fullpage Scroll Container with animation */}
      <div 
        className="w-full h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(-${activeIndex * 100}vh)` }}
      >
        
        {/* Section 0: Hero */}
        <section className="h-screen w-full relative">
          <div className="w-full h-full [&>section]:!h-full [&>section]:!min-h-0 [&>section]:!max-h-none">
            <Hero />
          </div>
        </section>
        
        {/* Section 1: QuickMenu */}
        <section className="h-screen w-full relative bg-[#f5f5f7]">
          <div className="w-full h-full flex flex-col justify-center [&>section]:!h-full [&>section]:!py-8 md:[&>section]:!py-12 lg:[&>section]:!py-20 [&>section]:overflow-hidden">
            <QuickMenu />
          </div>
        </section>
        
        {/* Section 2: ClinicHours */}
        <section className="h-screen w-full relative bg-white">
          <div className="w-full h-full flex flex-col justify-center [&>section]:!h-full [&>section]:!py-8 md:[&>section]:!py-12">
            <ClinicHours />
          </div>
        </section>

        {/* Section 3: ThreePrinciples */}
        <section className="h-screen w-full relative">
          <div className="w-full h-full flex flex-col justify-center [&>section]:!h-full [&>section]:!min-h-0 [&>section]:!py-8 md:[&>section]:!py-12">
            <ThreePrinciples />
          </div>
        </section>

        {/* Section 4: MedicalVideos */}
        <section className="h-screen w-full relative bg-gray-50/50">
          <div className="w-full h-full flex flex-col justify-center [&>section]:!h-full [&>section]:!py-8 md:[&>section]:!py-12">
            <MedicalVideos />
          </div>
        </section>

        {/* Section 5: Location */}
        <section className="h-screen w-full relative bg-white">
          <div className="w-full h-full flex flex-col justify-center [&>section]:!h-full [&>section]:!py-8 md:[&>section]:!py-12">
            <Location />
          </div>
        </section>
        
        {/* Section 6: Footer */}
        <section className="h-screen w-full relative bg-[#1c222b]">
          <div className="w-full h-full flex flex-col justify-end">
            <Footer />
          </div>
        </section>

      </div>
    </div>
  );
}
