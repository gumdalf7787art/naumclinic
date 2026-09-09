import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Hero, QuickMenu, ClinicHours, ThreePrinciples, MedicalVideos, Location } from '../components/home/HomeSections';

export default function OnePageTemplate({ isLoggedIn }) {
  return (
    <>
      <SEO />
      <Navbar isLoggedIn={isLoggedIn} isOnePage={true} />
      <main className="w-full relative">
        <Hero />
        <QuickMenu />
        <ClinicHours />
        <ThreePrinciples />
        <MedicalVideos />
        <Location />
      </main>
      <Footer />
    </>
  );
}
