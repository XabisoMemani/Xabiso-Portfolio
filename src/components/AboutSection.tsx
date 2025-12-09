'use client';

import { useState, useEffect, useRef } from 'react';

export default function AboutSection() {
    const introRef = useRef<HTMLParagraphElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [wordOpacities, setWordOpacities] = useState<number[]>([]);
    const [hoveredService, setHoveredService] = useState<number | null>(null);

    // Note: scroll-based word opacity animation remains below.

    // Split text into parts for line breaks
    // Desktop: forced 2 lines with <br> after part 1
    // Mobile: natural wrapping—let text flow as many lines as needed
    const textPart1 = "Software Engineer based in Johannesburg, ";
    const textPart2 = "South Africa, passionate about ";
    const textPart3 = "creating innovative digital experiences.";
    const wordsPart1 = textPart1.split(' ');
    const wordsPart2 = textPart2.split(' ');
    const wordsPart3 = textPart3.split(' ');
    const words = [...wordsPart1, ...wordsPart2, ...wordsPart3];

    useEffect(() => {
        // Initialize all words with low opacity
        setWordOpacities(new Array(words.length).fill(0.05));

        const handleScroll = () => {
            if (!introRef.current || !sectionRef.current) return;

            const sectionRect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionTop = sectionRect.top; // Position relative to viewport top

            // Animation timing based on viewport position:
            // Start at 30% into about section = when section top is at 70% down viewport (windowHeight * 0.7)
            // End at 95% into about section = when section top is at 5% down viewport (windowHeight * 0.05)
            const animationStart = windowHeight * 0.7; // Start when section top is 70% down viewport
            const animationEnd = windowHeight * 0.05; // End when section top is 5% down viewport
            const animationRange = animationStart - animationEnd;

            // Calculate progress: 0 when section top is at animationStart, 1 when at animationEnd
            // Invert because as we scroll, sectionTop decreases
            const scrollProgress = Math.max(0, Math.min(1,
                (animationStart - sectionTop) / animationRange
            ));

            // Only animate when section is in the animation range
            if (sectionTop <= animationStart && sectionTop >= animationEnd) {

                // Calculate opacity for each word based on scroll progress
                const newOpacities = words.map((_, index) => {
                    // Each word appears sequentially
                    // Total progress is divided among all words
                    const wordsPerProgress = words.length;
                    const wordStartProgress = index / wordsPerProgress;
                    const wordEndProgress = (index + 1) / wordsPerProgress;

                    // Calculate word-specific progress
                    let wordProgress = 0;
                    if (scrollProgress >= wordEndProgress) {
                        wordProgress = 1; // Word fully visible
                    } else if (scrollProgress > wordStartProgress) {
                        // Word is in transition
                        const wordRange = wordEndProgress - wordStartProgress;
                        wordProgress = (scrollProgress - wordStartProgress) / wordRange;
                    } else {
                        wordProgress = 0; // Word not started yet
                    }

                    // Interpolate from 0.1 (low opacity) to 1 (full opacity)
                    return 0.1 + (wordProgress * 0.9);
                });

                setWordOpacities(newOpacities);
            } else if (sectionTop > animationStart) {
                // Before animation starts (section top > 80% down viewport), all words at low opacity
                setWordOpacities(new Array(words.length).fill(0.05));
            } else if (sectionTop < animationEnd) {
                // After animation ends (section top < 60% down viewport), all words at full opacity
                setWordOpacities(new Array(words.length).fill(1));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on mount

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [words.length]);

    return (
        <section id="about" ref={sectionRef} className="portfolio-section">
            <div className="section-content">
                <h2 className="section-title">ABOUT ME</h2>
                <p ref={introRef} className="about-intro">
                    {wordsPart1.map((word, index) => (
                        <span
                            key={`part1-${index}`}
                            className="about-intro-word"
                            style={{
                                opacity: wordOpacities[index] || 0.10
                            }}
                        >
                            {word}
                            {index < wordsPart1.length - 1 && ' '}
                        </span>
                    ))}
                    <br className="about-intro-break" />
                    {wordsPart2.map((word, index) => {
                        const wordIndex = wordsPart1.length + index;
                        return (
                            <span
                                key={`part2-${index}`}
                                className="about-intro-word"
                                style={{
                                    opacity: wordOpacities[wordIndex] || 0.10
                                }}
                            >
                                {word}
                                {index < wordsPart2.length - 1 && ' '}
                            </span>
                        );
                    })}
                    <br className="about-intro-break about-intro-break-mobile" />
                    {wordsPart3.map((word, index) => {
                        const wordIndex = wordsPart1.length + wordsPart2.length + index;
                        return (
                            <span
                                key={`part3-${index}`}
                                className="about-intro-word"
                                style={{
                                    opacity: wordOpacities[wordIndex] || 0.10
                                }}
                            >
                                {word}
                                {index < wordsPart3.length - 1 && ' '}
                            </span>
                        );
                    })}
                </p>
                <div className="about-content">
                    {/* Card 01 - Who I Am */}
                    <div className="about-section-card">
                        <div className="about-section-header">
                            <div className="about-section-number">01</div>
                            <h3 className="about-section-title">Who I Am</h3>
                        </div>
                        <div className="about-section-body">
                            <div className="about-section-lines">
                                <p className="about-section-line">
                                    Hello, my name is <strong>Xabiso Memani</strong>.

                                    I am a <strong>22-year-old</strong> recent graduate with a

                                    <strong> Bachelor of Science in Information Technology (BSc IT)</strong> from the <span className="university-orange">University of Johannesburg</span> majoring in Computer Science and Informatics.
                                </p>
                                <p className="about-section-line">Hire the boy</p>
                            </div>
                            <a href="/documents/XabisoMemaniCV.pdf" download="XabisoMemaniCV.pdf" className="download-cv-link">
                                Download CV
                            </a>
                        </div>
                    </div>

                    {/* Card 02 - Why to Hire Me */}
                    <div className="about-section-card">
                        <div className="about-section-header">
                            <div className="about-section-number">02</div>
                            <h3 className="about-section-title">Why to Hire Me</h3>
                        </div>
                        <div className="about-section-body">
                            <p className="about-section-text">
                                I'm passionate about building software that makes a real impact, is clean, intuitive and enjoyable to use. I love crafting code and thoughtful design that solves real problems.
                            </p><p className="about-section-text">
                                With a strong foundation in theory and hands-on development, I'm always learning and improving. I'm looking to join a team that values innovation, collaboration and user experience.
                            </p><p className="about-section-text">
                                If you're looking for someone thats driven, adaptable and  generally excited about software and design-I'm ready to contribute and grow.
                            </p>
                        </div>
                    </div>

                    {/* Card 03 - What I Offer */}
                    <div className="about-section-card">
                        <div className="about-section-header">
                            <div className="about-section-number">03</div>
                            <h3 className="about-section-title">What I Offer</h3>
                        </div>
                        <div className="about-section-body">
                            <div className="services-grid">
                                {/* Full Stack Development - Monitor that scales up */}
                                <div
                                    className="service-item"
                                    onMouseEnter={() => setHoveredService(0)}
                                    onMouseLeave={() => setHoveredService(null)}
                                >
                                    <div
                                        className="service-icon-wrapper"
                                        style={{
                                            transform: hoveredService === 0 ? 'scale(1.2) rotate(5deg)' : 'scale(1) rotate(0deg)',
                                            transition: 'transform 0.3s ease-out'
                                        }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                            <line x1="8" y1="21" x2="16" y2="21"></line>
                                            <line x1="12" y1="17" x2="12" y2="21"></line>
                                        </svg>
                                    </div>
                                    <div className="service-content">
                                        <h4 className="service-title">Full Stack Development</h4>
                                        <p className="service-description">Yes I do it all, front-end and back-end development</p>
                                    </div>
                                </div>

                                {/* UI/UX Design - Layout that expands */}
                                <div
                                    className="service-item"
                                    onMouseEnter={() => setHoveredService(1)}
                                    onMouseLeave={() => setHoveredService(null)}
                                >
                                    <div
                                        className="service-icon-wrapper"
                                        style={{
                                            transform: hoveredService === 1 ? 'scale(1.3)' : 'scale(1)',
                                            transition: 'transform 0.3s ease-out'
                                        }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="9" y1="9" x2="15" y2="9"></line>
                                            <line x1="9" y1="15" x2="15" y2="15"></line>
                                        </svg>
                                    </div>
                                    <div className="service-content">
                                        <h4 className="service-title">UI/UX Design</h4>
                                        <p className="service-description">I design immersive, accessible interfaces with animation and branding</p>
                                    </div>
                                </div>

                                {/* API Development - Box that opens up */}
                                <div
                                    className="service-item"
                                    onMouseEnter={() => setHoveredService(2)}
                                    onMouseLeave={() => setHoveredService(null)}
                                >
                                    <div
                                        className="service-icon-wrapper"
                                        style={{
                                            transform: hoveredService === 2 ? 'scale(1.2) rotateY(15deg)' : 'scale(1) rotateY(0deg)',
                                            transition: 'transform 0.3s ease-out'
                                        }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                        </svg>
                                    </div>
                                    <div className="service-content">
                                        <h4 className="service-title">API Development</h4>
                                        <p className="service-description">RESTful APIs and seamless integrations for modern applications</p>
                                    </div>
                                </div>

                                {/* IT Management - Calendar that expands */}
                                <div
                                    className="service-item"
                                    onMouseEnter={() => setHoveredService(3)}
                                    onMouseLeave={() => setHoveredService(null)}
                                >
                                    <div
                                        className="service-icon-wrapper"
                                        style={{
                                            transform: hoveredService === 3 ? 'scale(1.25) translateY(-3px)' : 'scale(1) translateY(0px)',
                                            transition: 'transform 0.3s ease-out'
                                        }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                            <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"></path>
                                        </svg>
                                    </div>
                                    <div className="service-content">
                                        <h4 className="service-title">IT Management with ITIL</h4>
                                        <p className="service-description">IT management aligned with ITIL best practices for efficient delivery</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

