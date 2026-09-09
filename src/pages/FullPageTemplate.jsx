import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Hero, QuickMenu, ClinicHours, ThreePrinciples, MedicalVideos, Location } from '../components/home/HomeSections';

export default function FullPageTemplate({ isLoggedIn }) {
  // Prevent body from scrolling when fullpage template is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="h-screen w-full bg-surface-canvas overflow-hidden">
      <SEO />
      {/* Navbar with fullpage flag to handle navigation if needed */}
      <Navbar isLoggedIn={isLoggedIn} isFullPage={true} />
      
      {/* Fullpage Scroll Container */}
      <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth pb-0">
        
        <section className="h-screen w-full snap-start relative pt-[72px] flex items-center justify-center">
          <Hero />
        </section>
        
        <section className="h-screen w-full snap-start relative flex flex-col justify-center bg-gray-50/50">
          <QuickMenu />
        </section>
        
        <section className="h-screen w-full snap-start relative flex flex-col justify-center">
          <ClinicHours />
        </section>

        <section className="h-screen w-full snap-start relative flex flex-col justify-center">
          <ThreePrinciples />
        </section>

        <section className="h-screen w-full snap-start relative flex flex-col justify-center bg-gray-50/50">
          <MedicalVideos />
        </section>

        <section className="h-screen w-full snap-start relative flex flex-col justify-center">
          <Location />
        </section>
        
        <section className="snap-start relative w-full">
          <Footer />
        </section>

      </main>
    </div>
  );
}
