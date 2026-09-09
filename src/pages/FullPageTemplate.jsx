import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Hero, QuickMenu, ClinicHours, ThreePrinciples, MedicalVideos, Location } from '../components/home/HomeSections';

export default function FullPageTemplate({ isLoggedIn }) {
  // Use global CSS to enable scroll snapping on the html element
  useEffect(() => {
    document.documentElement.style.scrollSnapType = 'y mandatory';
    return () => {
      document.documentElement.style.scrollSnapType = 'none';
    };
  }, []);

  return (
    <div className="w-full bg-surface-canvas">
      <SEO />
      <Navbar isLoggedIn={isLoggedIn} isFullPage={true} />
      
      {/* Fullpage Scroll Container - Now relies on window scroll */}
      <main className="w-full">
        
        <section className="min-h-screen w-full snap-start relative pt-[72px] flex flex-col justify-center">
          <Hero />
        </section>
        
        <section className="min-h-screen w-full snap-start relative flex flex-col justify-center bg-gray-50/50">
          <QuickMenu />
        </section>
        
        <section className="min-h-screen w-full snap-start relative flex flex-col justify-center">
          <ClinicHours />
        </section>

        <section className="min-h-screen w-full snap-start relative flex flex-col justify-center">
          <ThreePrinciples />
        </section>

        <section className="min-h-screen w-full snap-start relative flex flex-col justify-center bg-gray-50/50">
          <MedicalVideos />
        </section>

        <section className="min-h-screen w-full snap-start relative flex flex-col justify-center">
          <Location />
        </section>
        
        <section className="snap-start relative w-full">
          <Footer />
        </section>

      </main>
    </div>
  );
}
