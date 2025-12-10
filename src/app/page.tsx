'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Cursor from '@/components/Cursor';
import ScanLines from '@/components/ScanLines';
import Snowflakes from '@/components/Snowflakes';
import InfoPanel from '@/components/InfoPanel';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';
import ResumeSection from '@/components/ResumeSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import ScrollIndicator from '@/components/ScrollIndicator';
import Notification from '@/components/Notification';
import { useTheme } from '@/hooks/useTheme';

export default function Home() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [showLandingButtons, setShowLandingButtons] = useState(true);
  const { theme, mounted } = useTheme();

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

    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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

      {/* Theme Switcher - only on landing (staggered on the element itself).
          We set a lower delay so the theme button appears before the info button.
          Tip: change the inline `--delay` value (milliseconds) on this element
          to move it earlier/later in the sequence. */}
      <div className={`theme-btn-wrapper staggered-btn ${!showLandingButtons ? 'hidden' : ''}`}
        style={{ ['--delay' as any]: '450ms' }}>
        <ThemeSwitcher />
      </div>

      {/* Info Button - only on landing (staggered).
          Tip: change `--delay` (ms) below to alter when this button appears. */}
      <div
        className={`info-btn staggered-btn ${!showLandingButtons ? 'hidden' : ''}`}
        style={{ ['--delay' as any]: '650ms' }}
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

      {/* Landing Section */}
      <section className="landing-section">
        <Snowflakes />
        <Notification />
        <div className="container">
          <div className="stagger-parent">
            <div className="stagger-item" style={{ ['--delay' as any]: '0ms' }}>
              <div className="stagger-inner">
                <div className="profile-container">
                  <Image
                    key={`profile-${theme}`}
                    src={theme === 'christmas' ? '/images/profile-picture-chrismas.jpg' : '/images/profile-picture.png'}
                    alt="Xabiso Memani"
                    width={200}
                    height={200}
                    className="profile-pic"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>
            <div className="stagger-item" style={{ ['--delay' as any]: '200ms' }}>
              <div className="stagger-inner">
                <h1 className="logo">XABISO MEMANI</h1>
              </div>
            </div>
            <div className="stagger-item" style={{ ['--delay' as any]: '400ms' }}>
              <div className="stagger-inner">
                <p className="subtitle">SOFTWARE ENGINEER</p>
              </div>
            </div>
            {/*
              Stagger delays are controlled via the inline CSS variable `--delay`.
              You can edit the millisecond values below to change the sequence/timing.
              Order here controls visual stacking: profile -> title -> subtitle.
            */}
          </div>

        </div>
        <ScrollIndicator />
      </section>

      {/* Portfolio Sections */}
      <AboutSection />
      <ResumeSection />
      <ProjectsSection />
      <ContactSection />

      <InfoPanel
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </>
  );
}