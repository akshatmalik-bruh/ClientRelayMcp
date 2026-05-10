import React from 'react';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Setup from '../components/Setup';
import Footer from '../components/Footer';
import PixelBackground from '../components/PixelBackground';
import StoryCarousel from '../components/StoryCarousel';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Home = () => {
  // Activate scroll reveal for all sections
  useScrollReveal();

  return (
    <div className="min-h-screen text-cyan-50">
      <PixelBackground />
      <Sidebar />
      <main>
        <Hero />
        {/* Each section wrapper gets scroll-reveal class */}
        <div className="scroll-reveal-scale">
          <Features />
        </div>
        <div className="scroll-reveal">
          <StoryCarousel />
        </div>
        <div className="scroll-reveal">
          <Setup />
        </div>
      </main>
      <div className="scroll-reveal">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
