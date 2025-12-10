'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Cursor from '@/components/Cursor';
import ScanLines from '@/components/ScanLines';
import Snowflakes from '@/components/Snowflakes';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Navbar from '@/components/Navbar';
import ScrollIndicator from '@/components/ScrollIndicator';
import Notification from '@/components/Notification';
import { useTheme } from '@/hooks/useTheme';

// Lazy load sections below the fold to reduce initial bundle size
// Using ssr: false for client components to avoid Turbopack issues
const AboutSection = dynamic(() => import('@/components/AboutSection'), {
  ssr: false,
});

const ResumeSection = dynamic(() => import('@/components/ResumeSection'), {
  ssr: false,
});

const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'), {
  ssr: false,
});

const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  ssr: false,
});

// Lazy load InfoPanel - only loads when needed
const InfoPanel = dynamic(() => import('@/components/InfoPanel'), {
  ssr: false,
});

// Intersection Observer wrapper for true lazy loading
function LazySection({ children, className }: { children: React.ReactNode; className?: string }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading 200px before it's visible
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {shouldLoad && children}
    </div>
  );
}

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

      {/* Portfolio Sections - Load only when scrolled into view */}
      <LazySection>
        <AboutSection />
      </LazySection>
      <LazySection>
        <ResumeSection />
      </LazySection>
      <LazySection>
        <ProjectsSection />
      </LazySection>
      <LazySection>
        <ContactSection />
      </LazySection>

      {isInfoOpen && (
        <InfoPanel
          isOpen={isInfoOpen}
          onClose={() => setIsInfoOpen(false)}
        />
      )}
    </>
  );
}