'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Cursor from '@/components/Cursor';
import ScanLines from '@/components/ScanLines';
import InfoPanel from '@/components/InfoPanel';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';
import ResumeSection from '@/components/ResumeSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import ScrollIndicator from '@/components/ScrollIndicator';

export default function Home() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [showLandingButtons, setShowLandingButtons] = useState(true);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const landingSection = document.querySelector('.landing-section');
      const aboutSection = document.getElementById('about');

      if (landingSection && aboutSection) {
        const landingBottom = landingSection.getBoundingClientRect().bottom;
        const aboutTop = aboutSection.getBoundingClientRect().top;
        // Hide buttons instantly when navbar should appear (when about section is visible)
        const shouldHide = landingBottom <= 0 && aboutTop <= window.innerHeight;
        setShowLandingButtons(!shouldHide);
      }

      // Show footer when near bottom of page
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      
      // Show footer when within 100px of bottom
      setShowFooter(distanceFromBottom < 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Cursor />
      <ScanLines />
      <Navbar />

      {/* Info Button - only on landing */}
      <div
        className={`info-btn ${!showLandingButtons ? 'hidden' : ''}`}
        onClick={() => setIsInfoOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsInfoOpen(true);
          }
        }}
      >
        i
      </div>

      {/* Theme Switcher - only on landing */}
      <div className={`theme-btn-wrapper ${!showLandingButtons ? 'hidden' : ''}`}>
        <ThemeSwitcher />
      </div>

      {/* Landing Section */}
      <section className="landing-section">
        <div className="container">
          <div className="profile-container">
            <Image
              src="/images/profile-picture.png"
              alt="Xabiso Memani"
              width={200}
              height={200}
              className="profile-pic"
              priority
            />
          </div>

          <h1 className="logo">XABISO MEMANI</h1>
          <p className="subtitle">SOFTWARE ENGINEER</p>

        </div>
        <ScrollIndicator />
      </section>

      {/* Portfolio Sections */}
      <AboutSection />
      <ResumeSection />
      <ProjectsSection />
      <ContactSection />

      {/* Footer */}
      <footer className={`portfolio-footer ${showFooter ? 'footer-visible' : ''}`}>
        <div className="footer-content">
          <p className="footer-tag">Designed from scratch by <u>Xabiso Memani</u> © 2025</p>
        </div>
      </footer>

      <InfoPanel
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </>
  );
}