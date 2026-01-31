'use client';

import { useState, useEffect, useRef } from 'react';

export default function ResumeSection() {
    const educationRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);
    const certificationsRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);
    const [educationAnimation, setEducationAnimation] = useState<{ opacity: number; translateY: number; blur: number }>({ opacity: 0, translateY: 20, blur: 10 });
    const [experienceAnimation, setExperienceAnimation] = useState<{ opacity: number; translateY: number; blur: number }>({ opacity: 0, translateY: 20, blur: 10 });
    const [certificationsAnimation, setCertificationsAnimation] = useState<{ opacity: number; translateY: number; blur: number }>({ opacity: 0, translateY: 20, blur: 10 });
    const [skillsAnimation, setSkillsAnimation] = useState<{ opacity: number; translateY: number; blur: number }>({ opacity: 0, translateY: 20, blur: 10 });

    // Scroll animation effect for Education, Experience, Certifications, and Skills sections
    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;

            // ============================================
            // ANIMATION SETTINGS - EDIT THESE VALUES:
            // ============================================
            // animationStart: When animation STARTS (0.0 to 1.0, where 1.0 = bottom of viewport)
            //   - Higher value (e.g., 0.9) = starts later (when element is closer to viewport)
            //   - Lower value (e.g., 0.7) = starts earlier (when element is further down)
            const animationStart = windowHeight * 0.95; // EDIT THIS: Change 0.95 to adjust when animation STARTS

            // animationEnd: When animation ENDS/COMPLETES (0.0 to 1.0, where 1.0 = bottom of viewport)
            //   - Higher value (e.g., 0.6) = finishes later (element needs to scroll more)
            //   - Lower value (e.g., 0.4) = finishes earlier (element animates faster)
            const animationEnd = windowHeight * 0.5; // EDIT THIS: Change 0.5 to adjust when animation ENDS

            // translateDistance: How far the element moves UP (in pixels)
            //   - Higher value (e.g., 40) = more movement
            //   - Lower value (e.g., 10) = less movement
            const translateDistance = 15; // EDIT THIS: Change 15 to adjust movement DISTANCE (in pixels)

            // blurAmount: Maximum blur when opacity is 0 (in pixels)
            //   - Higher value (e.g., 15) = more blur when hidden
            //   - Lower value (e.g., 5) = less blur when hidden
            const blurAmount = 10; // EDIT THIS: Change 10 to adjust maximum BLUR (in pixels)

            // blurEnd: When blur animation ENDS/COMPLETES (0.0 to 1.0, where 1.0 = bottom of viewport)
            //   - Higher value (e.g., 0.6) = blur finishes later (element needs to scroll more)
            //   - Lower value (e.g., 0.3) = blur finishes earlier (blur clears faster)
            //   - Can be different from animationEnd to control blur timing separately
            const blurEnd = windowHeight * 0.9; // EDIT THIS: Change 0.5 to adjust when blur ENDS

            // SPEED: Animation speed is controlled by the difference between animationStart and animationEnd
            //   - Larger difference (e.g., 0.8 to 0.3) = slower animation (more scroll needed)
            //   - Smaller difference (e.g., 0.8 to 0.7) = faster animation (less scroll needed)
            const animationRange = animationStart - animationEnd;

            // TRANSITION DURATION: How smooth/fast the CSS transition is (in seconds)
            //   - Higher value (e.g., 0.5s) = smoother, slower transition
            //   - Lower value (e.g., 0.1s) = snappier, faster transition
            //   Note: This is set in the style prop below as 'transition: opacity 0.3s ease-out, transform 0.3s ease-out'
            //   To change it, edit the '0.3s' value in the transition style on each section
            // ============================================

            // Helper function to animate a section
            const animateSection = (
                ref: React.RefObject<HTMLDivElement | null>,
                setAnimation: React.Dispatch<React.SetStateAction<{ opacity: number; translateY: number; blur: number }>>
            ) => {
                if (!ref.current) return;

                const rect = ref.current.getBoundingClientRect();
                const elementTop = rect.top;

                // Calculate opacity/translateY progress
                let progress = 0;
                if (elementTop <= animationStart && elementTop >= animationEnd) {
                    progress = Math.max(0, Math.min(1, (animationStart - elementTop) / animationRange));
                } else if (elementTop < animationEnd) {
                    progress = 1; // Animation complete
                }

                // Ease out function for smoother animation
                const easedProgress = 1 - Math.pow(1 - progress, 3);

                // Calculate blur progress separately (can end at different point than opacity)
                const blurRange = animationStart - blurEnd;
                let blurProgress = 0;
                if (elementTop <= animationStart && elementTop >= blurEnd) {
                    blurProgress = Math.max(0, Math.min(1, (animationStart - elementTop) / blurRange));
                } else if (elementTop < blurEnd) {
                    blurProgress = 1; // Blur animation complete
                }

                // Ease out function for blur
                const easedBlurProgress = 1 - Math.pow(1 - blurProgress, 3);

                // Blur decreases as blur progress increases (inverse relationship)
                const currentBlur = blurAmount * (1 - easedBlurProgress);

                setAnimation({
                    opacity: easedProgress,
                    translateY: translateDistance * (1 - easedProgress),
                    blur: currentBlur
                });
            };

            // Animate all sections
            animateSection(educationRef, setEducationAnimation);
            animateSection(experienceRef, setExperienceAnimation);
            animateSection(certificationsRef, setCertificationsAnimation);
            animateSection(skillsRef, setSkillsAnimation);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on mount

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section id="resume" className="portfolio-section">
            <div className="section-content">
                <div className="resume-header">
                    <h2 className="section-title">RESUME</h2>
                    <div className="experience-badge">7+ Years Coding Experience</div>
                </div>
                <div className="resume-grid">
                    <div className="resume-left">
                        <div
                            ref={educationRef}
                            className="resume-section-group"
                            style={{
                                opacity: educationAnimation.opacity,
                                transform: `translateY(${educationAnimation.translateY}px)`,
                                filter: `blur(${educationAnimation.blur}px)`,
                                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out'
                            }}
                        >
                            <h3 className="resume-group-title">EDUCATION</h3>
                            <div className="timeline">
                                <div className="timeline-item">
                                    <div className="timeline-divider"></div>
                                    <div className="timeline-left-part">
                                        <div className="timeline-year">2022 - 2025</div>
                                    </div>
                                    <div className="timeline-right-part">
                                        <h4 className="timeline-title">Bachelor of Science in Information Technology (BSc IT - ​​​​B2E01Q)</h4>
                                        <p className="timeline-institution">University of Johannesburg</p>
                                        <p className="timeline-description">
                                            Majoring in Computer Science and Informatics.<br /> Coursework includes Algorithms and Data Structures, Object Orientation, Full Stack Web Development, Databases, Computer Networks, IT Management, Calculus, Linear Algebra, Applied Mathematics and more.
                                        </p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-divider"></div>
                                    <div className="timeline-left-part">
                                        <div className="timeline-year">2017 - 2021</div>
                                    </div>
                                    <div className="timeline-right-part">
                                        <h4 className="timeline-title">National Senior Certificate/Matric</h4>
                                        <p className="timeline-institution">Bracken High School</p>
                                        <div className="timeline-description">
                                            <div className="achievement-badge achievement-badge-tooltip resume-interactive" data-tooltip="(with 83%)">Trophy for Top Matric Learner in Computer Applications Technology</div>
                                            <div className="achievement-badge">RCL Prefect / Leader</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            ref={experienceRef}
                            className="resume-section-group"
                            style={{
                                opacity: experienceAnimation.opacity,
                                transform: `translateY(${experienceAnimation.translateY}px)`,
                                filter: `blur(${experienceAnimation.blur}px)`,
                                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out'
                            }}
                        >
                            <h3 className="resume-group-title">EXPERIENCE</h3>
                            <div className="experience-list">
                                {/* Mbungela Consulting Experience */}
                                <div className="experience-entry">
                                    <div className="experience-employer-row">
                                        <div className="experience-employer">
                                            Mbungela Consulting (MiWay Life Insurance)
                                            <span className="experience-address"> – 16 Empire Road, Parktown</span>
                                        </div>
                                        <div className="experience-duration">14 February 2024 – 3 April 2024</div>
                                    </div>
                                    <div className="experience-job-title">Call Centre Agent</div>
                                    <p className="experience-description">
                                        Gained valuable sales experience conducting cold calls and promoting MiWay Life insurance products, demonstrating strong communication skills and customer relationship management.
                                    </p>
                                    <div className="experience-achievement">
                                        <strong>Achievement:</strong> Recognized as the junior agent with the most transfers in the first 30-day cycle
                                    </div>
                                </div>

                                {/* Tokoos Studio Experience */}
                                <div className="experience-entry">
                                    <div className="experience-employer-row">
                                        <div className="experience-employer">
                                            Tokoos Studio (Pty) Ltd
                                            <span className="experience-address"> - 55 King George Street, Braamfontein</span>
                                        </div>
                                        <div className="experience-duration">27 October 2022 – 26 April 2023</div>
                                    </div>
                                    <div className="experience-job-title">Internet Café Assistant / IT Customer Assistant</div>
                                    <p className="experience-description">
                                        Provided technical support and operated professional printing equipment, showcasing proficiency with hardware systems and customer service skills. Managed cash transactions and inventory, applying business acumen everyday. Designed marketing materials such as posters, flyers, and business cards, developing visual communication skills that I now use in my UI/UX design projects. Delivered <u>24-hour support</u> to select clients, strengthening my problem-solving abilities and responsiveness in technical roles.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="resume-right">
                        <div
                            ref={certificationsRef}
                            className="resume-section-group"
                            style={{
                                opacity: certificationsAnimation.opacity,
                                transform: `translateY(${certificationsAnimation.translateY}px)`,
                                filter: `blur(${certificationsAnimation.blur}px)`,
                                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out'
                            }}
                        >
                            <h3 className="resume-group-title">CERTIFICATIONS</h3>
                            <div className="certifications-list">
                                <div className="certification-item">
                                    <div className="certification-header">
                                        <h4 className="certification-title">
                                            • Responsive Web Design
                                            <a href="https://www.freecodecamp.org/certification/xabiso4/responsive-web-design" target="_blank" rel="noopener noreferrer" className="certification-link certification-link-tooltip" aria-label="View certification" data-tooltip="Credential ID: xabiso4-rwd">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                </svg>
                                            </a>
                                        </h4>
                                    </div>
                                    <p className="certification-institution">freeCodeCamp</p>
                                    <p className="certification-date">Obtained: January 2025</p>
                                    <p className="certification-skills">Skills: HTML, CSS, Js, Web Accessibility</p>
                                </div>
                                <div className="certification-item">
                                    <div className="certification-header">
                                        <h4 className="certification-title">
                                            • Prompt Design in Vertex AI
                                            <a href="https://www.credly.com/badges/2704440b-6b83-4236-875a-9f968df9b63e/linked_in_profile" target="_blank" rel="noopener noreferrer" className="certification-link certification-link-tooltip" aria-label="View certification" data-tooltip="Credential ID: 2704440b-6b83-4236-875a-9f968df9b63e">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                </svg>
                                            </a>
                                        </h4>
                                    </div>
                                    <p className="certification-institution">Google</p>
                                    <p className="certification-date">Obtained: October 2024</p>
                                    <p className="certification-skills">Skills: Generative AI, Prompt Engineering, Vertex AI</p>
                                </div>
                                <div className="certification-item">
                                    <div className="certification-header">
                                        <h4 className="certification-title">
                                            • Call Centre Training
                                            <a href="/documents/SkillsExcelCertificate.pdf" target="_blank" rel="noopener noreferrer" className="certification-link" aria-label="View certification">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                </svg>
                                            </a>
                                        </h4>
                                    </div>
                                    <p className="certification-institution">Skills Excel Training Institute</p>
                                    <p className="certification-date">Obtained: January 2024</p>
                                    <p className="certification-skills">Skills: Customer Service, Telesales Scripting, Telephone Etiquette</p>
                                </div>
                            </div>
                        </div>
                        <div
                            ref={skillsRef}
                            className="resume-section-group"
                            style={{
                                opacity: skillsAnimation.opacity,
                                transform: `translateY(${skillsAnimation.translateY}px)`,
                                filter: `blur(${skillsAnimation.blur}px)`,
                                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out'
                            }}
                        >
                            <h3 className="resume-group-title">SKILLS</h3>
                            <div className="skill-item">
                                <div className="skill-header">
                                    <span className="skill-name"><strong>Programming Languages:</strong> C#, C++, Java, SQL</span>
                                    <span className="skill-percentage">90%</span>
                                </div>
                                <div className="skill-bar">
                                    <div className="skill-bar-fill" style={{ width: '90%' }}></div>
                                </div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header">
                                    <span className="skill-name"><strong>Web Technologies:</strong> HTML, CSS, JavaScript, TypeScript</span>
                                    <span className="skill-percentage">100%</span>
                                </div>
                                <div className="skill-bar">
                                    <div className="skill-bar-fill" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header">
                                    <span className="skill-name"><strong>Frameworks:</strong> ASP.NET Web Forms, ASP.NET API, Next.js</span>
                                    <span className="skill-percentage">90%</span>
                                </div>
                                <div className="skill-bar">
                                    <div className="skill-bar-fill" style={{ width: '90%' }}></div>
                                </div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header">
                                    <span className="skill-name"><strong>Mobile Development:</strong> React Native with Expo</span>
                                    <span className="skill-percentage">95%</span>
                                </div>
                                <div className="skill-bar">
                                    <div className="skill-bar-fill" style={{ width: '95%' }}></div>
                                </div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header">
                                    <span className="skill-name"><strong>Design Tools:</strong> Adobe Photoshop, Illustrator, Figma</span>
                                    <span className="skill-percentage">85%</span>
                                </div>
                                <div className="skill-bar">
                                    <div className="skill-bar-fill" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header">
                                    <span className="skill-name"><strong>Team Collaboration:</strong> Git, Github, Trello, Agile workflows, Strong Communicator & Team Player</span>
                                    <span className="skill-percentage">95%</span>
                                </div>
                                <div className="skill-bar">
                                    <div className="skill-bar-fill" style={{ width: '95%' }}></div>
                                </div>
                            </div>
                            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                                <a href="/documents/XabisoMemaniCV.pdf" download="XabisoMemaniCV.pdf" className="download-cv-link download-cv-link-orange">
                                    Download CV
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

