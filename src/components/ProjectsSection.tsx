'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

type ProjectCategory = 'all' | 'school' | 'personal' | 'design';

type Project = {
    id: number;
    title: string;
    description: string | React.ReactNode;
    tech: string[];
    category: ProjectCategory;
    screenshot?: string;
    githubUrl?: string;
    demoUrl?: string;
    youtubeUrl?: string;
    instagramUrl?: string;
};

export default function ProjectsSection() {
    const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
    const projectCardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
    const [cardAnimations, setCardAnimations] = useState<Map<number, { opacity: number; translateY: number; blur: number }>>(new Map());
    const [isMobile, setIsMobile] = useState(false);

    const projects: Project[] = [
        {
            id: 5,
            title: 'Skinn Galleria',
            description: (
                <>
                    E-commerce website for Skinn, an African-inspired clothing brand founded by <u>Yethu Mabizela</u>. As Creative Director, I designed and developed the brand identity and web presence. Features a modern e-commerce experience with product showcases, magazine integration, and seamless shopping functionality.
                </>
            ),
            tech: ['E-commerce', 'Brand Design', 'UI/UX', 'Webflow'],
            category: 'personal' as ProjectCategory,
            screenshot: '/images/skinnbeta.png',
            githubUrl: '',
            demoUrl: 'https://skinnnation.webflow.io/',
            youtubeUrl: '',
            instagramUrl: 'https://www.instagram.com/skinnnation/',
        },
        {
            id: 2,
            title: 'Find My Uni',
            description: 'Full-stack web application that helps South African students discover university programs based on their subject marks and APS scores. Features course matching, automatic APS calculation, user authentication, and responsive design with custom animations. Do check out the GitHub repo to see the code and how to run FindMyUni locally!',
            tech: ['HTML5', 'CSS3', 'JavaScript', 'WCF', '.NET Framework', 'C#', 'SQL Server'],
            category: 'personal' as ProjectCategory,
            screenshot: '/images/findmyuni.png',
            githubUrl: 'https://github.com/XabisoMemani/FindMyUni',
            demoUrl: 'https://findmyuni-xabiso.vercel.app',
            youtubeUrl: '',
        },
        {
            id: 6,
            title: 'Xabiso Memani Portfolio',
            description: 'Custom portfolio website designed and built from scratch to showcase my personality and work. Features a unique custom cursor system, theme switching, and a fully responsive design. Everything was designed by me with no templates—every element crafted to reflect my creative vision and technical skills.',
            tech: ['Next.js', 'React', 'TypeScript', 'CSS3', 'Custom Design'],
            category: 'personal' as ProjectCategory,
            screenshot: '/images/xabisoportfolio.png',
            githubUrl: 'https://github.com/XabisoMemani/XabisoMemani-Portfolio',
            demoUrl: '',
            youtubeUrl: '',
            instagramUrl: '',
        },
        {
            id: 1,
            title: 'ZenBox Web Frontend',
            description: 'Full-stack project management/client onboarding web application built with ASP.NET Web Forms. Features role-based access control, quotation generation, automated emails, and PDF reporting for SAS Environmental.',
            tech: ['ASP.NET', 'Web Forms', 'HTML', 'C#'],
            category: 'school' as ProjectCategory,
            screenshot: '/images/zenbox-web.png',
            githubUrl: 'https://github.com/IFMTYP2025/team15',
            demoUrl: '',
            youtubeUrl: 'https://youtu.be/L-LNjbStd80?si=GYvhwquhrLbMvps0',
        },
        {
            id: 3,
            title: 'ZenBox API',
            description: 'RESTful backend API built with ASP.NET Core (.NET 8) featuring Entity Framework Core, Azure SQL database, and JWT authentication. Handles business logic, data access, and secure authentication for the ZenBox ecosystem.',
            tech: ['ASP.NET Core', 'C#', '.NET 8', 'Entity Framework', 'Azure SQL'],
            category: 'school' as ProjectCategory,
            screenshot: '/images/zenbox-api.png',
            githubUrl: 'https://github.com/IFMTYP2025/team15-api',
            demoUrl: '',
            youtubeUrl: 'https://youtu.be/L-LNjbStd80?si=GYvhwquhrLbMvps0',
        },
        {
            id: 4,
            title: 'ZenBox Mobile App',
            description: 'React Native mobile application built with Expo for employee task management. Features role-based access, real-time task tracking, and seamless integration with the ZenBox API. Supports both iOS and Android platforms.',
            tech: ['React Native', 'Expo', 'TypeScript', 'Tailwind CSS'],
            category: 'school' as ProjectCategory,
            screenshot: '/images/zenbox-mobile.png',
            githubUrl: 'https://github.com/IFMTYP2025/team15-mobile',
            demoUrl: '',
            youtubeUrl: 'https://youtu.be/L-LNjbStd80?t=568',
        },
        {
            id: 7,
            title: 'Fleur De Maison',
            description: (
                <>
                    Logo design for Fleur De Maison, a boutique floral brand. Inspired by the romance of Parisian gardens, the brand creates bespoke bouquets that transform every moment into something extraordinary. Check them out on instagram!
                </>
            ),
            tech: ['Logo Design', 'Graphic Design', 'Adobe Illustrator'],
            category: 'design' as ProjectCategory,
            screenshot: '/images/fleurdemaison.png',
            githubUrl: '',
            demoUrl: '',
            youtubeUrl: '',
            instagramUrl: 'https://www.instagram.com/fleur.de.maison/',
        },
    ];

    const filters: { label: string; value: ProjectCategory }[] = [
        { label: 'All Projects', value: 'all' },
        { label: 'School Projects', value: 'school' },
        { label: 'Personal Projects', value: 'personal' },
        { label: 'Logos', value: 'design' },
    ];

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') {
            // Exclude Fleur De Maison (id: 7) from "All Projects" - it only shows in "Logos"
            return projects.filter(project => project.id !== 7);
        }
        return projects.filter(project => project.category === activeFilter);
    }, [activeFilter]);

    // Detect mobile vs desktop
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Scroll animation effect for project cards
    useEffect(() => {
        // Access filteredProjects from closure - it's memoized so stable
        const handleScroll = () => {
            const windowHeight = window.innerHeight;

            // ANIMATION PARAMETERS - Same values as ResumeSection
            const animationStart = windowHeight * 0.95; // When animation STARTS
            const animationEnd = windowHeight * 0.8; // When animation ENDS
            const animationRange = animationStart - animationEnd;
            const translateDistance = 15; // Movement distance (in pixels)
            const blurAmount = 10; // Maximum blur (in pixels)
            const blurEnd = windowHeight * 0.9; // When blur ENDS

            const newAnimations = new Map<number, { opacity: number; translateY: number; blur: number }>();

            // Get visible cards per row on desktop
            const getVisibleCardsPerRow = () => {
                if (isMobile) return 1; // Mobile: one card per row

                // Desktop: detect how many cards fit per row
                const firstCard = projectCardRefs.current.get(filteredProjects[0]?.id);
                if (!firstCard || filteredProjects.length === 0) return 3;

                const gridContainer = firstCard.parentElement;
                if (!gridContainer) return 3;

                const containerWidth = gridContainer.clientWidth;
                const cardWidth = firstCard.offsetWidth;
                const gap = 32; // 2rem gap
                const cardsPerRow = Math.floor((containerWidth + gap) / (cardWidth + gap));
                return Math.max(1, Math.min(cardsPerRow, filteredProjects.length));
            };

            const cardsPerRow = getVisibleCardsPerRow();
            const rowGroups: number[][] = [];

            // Group cards by rows
            for (let i = 0; i < filteredProjects.length; i += cardsPerRow) {
                rowGroups.push(filteredProjects.slice(i, i + cardsPerRow).map(p => p.id));
            }

            filteredProjects.forEach((project, index) => {
                const cardElement = projectCardRefs.current.get(project.id);
                if (!cardElement) return;

                const rect = cardElement.getBoundingClientRect();
                const elementTop = rect.top;

                // On mobile: each card animates individually (staggered)
                // On desktop: cards in the same row animate together
                let progress = 0;
                if (elementTop <= animationStart && elementTop >= animationEnd) {
                    progress = Math.max(0, Math.min(1, (animationStart - elementTop) / animationRange));
                } else if (elementTop < animationEnd) {
                    progress = 1;
                }

                // On mobile: add stagger delay based on index
                // On desktop: use row-based timing (cards in same row have same progress)
                let adjustedProgress = progress;
                if (isMobile) {
                    // Stagger: each card starts slightly after the previous one
                    const staggerDelay = 0.15; // 15% delay between cards
                    const cardStartProgress = index * staggerDelay;
                    if (progress > cardStartProgress) {
                        adjustedProgress = Math.min(1, (progress - cardStartProgress) / (1 - cardStartProgress));
                    } else {
                        adjustedProgress = 0;
                    }
                } else {
                    // Desktop: find which row this card belongs to
                    const rowIndex = rowGroups.findIndex(row => row.includes(project.id));
                    if (rowIndex >= 0) {  // Changed from > 0 to >= 0
                        // Use the first card in the row to determine progress
                        const firstCardInRow = projectCardRefs.current.get(rowGroups[rowIndex][0]);
                        if (firstCardInRow) {
                            const rowRect = firstCardInRow.getBoundingClientRect();
                            const rowTop = rowRect.top;
                            if (rowTop <= animationStart && rowTop >= animationEnd) {
                                adjustedProgress = Math.max(0, Math.min(1, (animationStart - rowTop) / animationRange));
                            } else if (rowTop < animationEnd) {
                                adjustedProgress = 1;
                            }
                        }
                    }
                }

                // Ease out function
                const easedProgress = 1 - Math.pow(1 - adjustedProgress, 3);

                // Calculate blur progress separately
                const blurRange = animationStart - blurEnd;
                let blurProgress = 0;
                if (elementTop <= animationStart && elementTop >= blurEnd) {
                    blurProgress = Math.max(0, Math.min(1, (animationStart - elementTop) / blurRange));
                } else if (elementTop < blurEnd) {
                    blurProgress = 1;
                }

                const easedBlurProgress = 1 - Math.pow(1 - blurProgress, 3);
                const currentBlur = blurAmount * (1 - easedBlurProgress);

                newAnimations.set(project.id, {
                    opacity: easedProgress,
                    translateY: translateDistance * (1 - easedProgress),
                    blur: currentBlur
                });
            });

            // Only update if animations actually changed
            setCardAnimations(prev => {
                let hasChanged = false;
                if (prev.size !== newAnimations.size) {
                    hasChanged = true;
                } else {
                    for (const [id, anim] of newAnimations) {
                        const prevAnim = prev.get(id);
                        if (!prevAnim ||
                            Math.abs(prevAnim.opacity - anim.opacity) > 0.01 ||
                            Math.abs(prevAnim.translateY - anim.translateY) > 0.01 ||
                            Math.abs(prevAnim.blur - anim.blur) > 0.01) {
                            hasChanged = true;
                            break;
                        }
                    }
                }
                return hasChanged ? newAnimations : prev;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on mount

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [filteredProjects, isMobile]);

    return (
        <section id="projects" className="portfolio-section">
            <div className="section-content">
                <h2 className="section-title">PROJECTS</h2>

                {/* Filter Tabs */}
                <div className="project-filters">
                    {filters.map((filter, index) => (
                        <span key={filter.value}>
                            <button
                                className={`project-filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter.value)}
                            >
                                {filter.label}
                            </button>
                            {index < filters.length - 1 && <span className="project-filter-separator">|</span>}
                        </span>
                    ))}
                </div>

                <div className={`projects-grid ${filteredProjects.length === 1 ? 'projects-grid-single' : ''}`}>
                    {filteredProjects.map((project) => {
                        const isDesignCategory = project.category === 'design';
                        // Use normal aspect ratio for Fleur De Maison (styled like normal projects)
                        const aspectRatioClass = (isDesignCategory && project.id !== 7) ? 'project-image-square' : 'project-image-video';

                        // Arrow icon SVG
                        const ArrowIcon = () => (
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="project-link-icon"
                            >
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        );

                        const animation = cardAnimations.get(project.id) || { opacity: 0, translateY: 15, blur: 10 };

                        return (
                            <div
                                key={project.id}
                                ref={(el) => {
                                    if (el) {
                                        projectCardRefs.current.set(project.id, el);
                                    } else {
                                        projectCardRefs.current.delete(project.id);
                                    }
                                }}
                                className={`project-card ${project.screenshot ? 'project-card-with-image' : ''}`}
                                style={{
                                    opacity: animation.opacity,
                                    transform: `translateY(${animation.translateY}px)`,
                                    filter: `blur(${animation.blur}px)`,
                                    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out'
                                }}
                            >
                                {/* Image Container */}
                                {project.screenshot && (
                                    <div className={`project-image-container ${aspectRatioClass}`}>
                                        <img
                                            src={project.screenshot}
                                            alt={`${project.title} screenshot`}
                                            className="project-screenshot"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="project-card-content">
                                    <div className="project-card-text">
                                        <h3 className="project-title">
                                            {project.title}
                                        </h3>
                                        <p className="project-description">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Technologies */}
                                    <div className="project-tech">
                                        {project.tech.map((tech, index) => (
                                            <span key={index} className="tech-tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="project-actions">
                                        {project.demoUrl && (
                                            <a
                                                href={project.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link-btn project-link-btn-demo"
                                            >
                                                <span style={{ textAlign: 'center', flex: 1 }}>Demo</span>
                                                <ArrowIcon />
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link-btn project-link-btn-github"
                                            >
                                                <span style={{ textAlign: 'center', flex: 1 }}>GitHub</span>
                                                <ArrowIcon />
                                            </a>
                                        )}
                                        {project.youtubeUrl && (
                                            <a
                                                href={project.youtubeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link-btn project-link-btn-youtube"
                                            >
                                                <span style={{ textAlign: 'center', flex: 1 }}>YouTube</span>
                                                <ArrowIcon />
                                            </a>
                                        )}
                                        {project.instagramUrl && (
                                            <a
                                                href={project.instagramUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link-btn project-link-btn-instagram"
                                            >
                                                <span style={{ textAlign: 'center', flex: 1 }}>Instagram</span>
                                                <ArrowIcon />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

