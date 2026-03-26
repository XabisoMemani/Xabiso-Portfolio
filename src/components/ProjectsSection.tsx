'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';

type ProjectCategory = 'all' | 'client' | 'personal' | 'design';

type Project = {
    id: number;
    title: string;
    description: string | React.ReactNode;
    tech: string[];
    category: ProjectCategory;
    showInAll?: boolean;
    screenshot?: string;
    githubUrl?: string;
    demoUrl?: string;
    youtubeUrl?: string;
    instagramUrl?: string;
    tiktokUrl?: string;
    chromeUrl?: string;
    year?: string;
    clientOrder?: number;
};
const projects: Project[] = [
    {
        id: 8,
        title: 'JobTrackr',
        description: 'A smart job application tracker that syncs directly with your Gmail to keep all your applications in one place. Built with Next.js and MongoDB, it automatically pulls your latest emails and organizes them in a clean, responsive dashboard so you can apply with clarity and confidence.',
        tech: ['Next.js', 'React', 'TypeScript', 'MongoDB', 'OAuth', 'Nodemailer', 'UI/UX', 'JWT', 'TailwindCSS'],
        category: 'personal' as ProjectCategory,
        screenshot: '/images/jobtrackr.webp',
        githubUrl: 'https://github.com/XabisoMemani/JobTrackr-Showcase',
        demoUrl: 'https://jobtrackr-xabiso.vercel.app/',
        year: 'NEW! (2026)',
    },
    {
        id: 5,
        title: 'Skinn Galleria',
        description: (
            <>
                An e-commerce website for Skinn, an African-inspired clothing brand. As Creative Director, I designed and developed the brand's complete online identity. The platform features an integrated magazine and a seamless, modern shopping experience.
            </>
        ),
        tech: ['E-commerce', 'Brand Design', 'UI/UX', 'Webflow'],
        category: 'client' as ProjectCategory,
        screenshot: '/images/skinnbeta.webp',
        githubUrl: '',
        demoUrl: 'https://skinnnation.webflow.io/',
        youtubeUrl: '',
        instagramUrl: 'https://www.instagram.com/skinnnation/',
        year: '2020',
        clientOrder: 20,
    },
    {
        id: 9,
        title: 'IntelliSave Chrome Extension',
        description:
            'An intelligent Chrome extension I built to automatically sort your downloaded files into organized folders. I started this in 2024 to solve my own messy Downloads folder problem, and decided to publish it for others to enjoy! It runs quietly in the background, keeping your files perfectly categorized by type and source. Download it on Chrome Web Store and clear your messy downloads folder!',
        tech: ['Chrome Extension', 'JavaScript', 'Manifest V3', 'Automation'],
        category: 'personal' as ProjectCategory,
        screenshot: '/images/intellisave.webp',
        demoUrl: 'https://xabisomemani.github.io/IntelliSave/index.html',
        chromeUrl: 'https://chromewebstore.google.com/detail/intellisave/knemlapnohmfinjfondkjhdnoahfafko',
        year: '2024',
    },
    {
        id: 2,
        title: 'Find My Uni',
        description: 'A full-stack web application designed to help South African students find the perfect university program. Simply input your marks to automatically calculate your APS score and discover matching courses. Features user authentication and a smooth, animated UI!',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'WCF', '.NET Framework', 'C#', 'SQL Server'],
        category: 'personal' as ProjectCategory,
        screenshot: '/images/findmyuni.webp',
        githubUrl: 'https://github.com/XabisoMemani/FindMyUni',
        demoUrl: 'https://findmyuni-xabiso.vercel.app',
        youtubeUrl: '',
        year: '2024',
    },
    {
        id: 6,
        title: 'Xabiso Memani Portfolio',
        description: 'My personal portfolio, designed and built entirely from scratch! I wanted a space that truly reflected my personality, all hand-crafted elements with no templates, complete with custom cursors, smooth animations, and a seamless theme switcher.',
        tech: ['Next.js', 'React', 'TypeScript', 'CSS3', 'Custom Design'],
        category: 'personal' as ProjectCategory,
        screenshot: '/images/xabisoportfolio.webp',
        githubUrl: 'https://github.com/XabisoMemani/XabisoMemani-Portfolio',
        demoUrl: '',
        youtubeUrl: '',
        instagramUrl: '',
        year: '2025',
    },
    {
        id: 1,
        title: 'ZenBox Web Frontend',
        description: 'A powerful project management and client onboarding dashboard tailored for SAS Environmental. As part of a full-stack ecosystem, it handles complex role-based access control, automates quotation emails, and generates comprehensive PDF reports.',
        tech: ['ASP.NET', 'Web Forms', 'HTML', 'C#'],
        category: 'client' as ProjectCategory,
        screenshot: '/images/zenbox-web.webp',
        githubUrl: 'https://github.com/IFMTYP2025/team15',
        demoUrl: '',
        youtubeUrl: 'https://youtu.be/L-LNjbStd80?si=GYvhwquhrLbMvps0',
        year: '2025',
        clientOrder: 30,
    },
    {
        id: 3,
        title: 'ZenBox API',
        description: 'The robust backend engine driving the entire ZenBox ecosystem. Built with .NET 8 and Entity Framework Core, this RESTful API securely handles all business logic, data interactions, and JWT authentication.',
        tech: ['ASP.NET Core', 'C#', '.NET 8', 'Entity Framework', 'Azure SQL'],
        category: 'client' as ProjectCategory,
        screenshot: '/images/zenbox-api.webp',
        githubUrl: 'https://github.com/IFMTYP2025/team15-api',
        demoUrl: '',
        youtubeUrl: 'https://youtu.be/L-LNjbStd80?si=GYvhwquhrLbMvps0',
        year: '2025',
        clientOrder: 40,
    },
    {
        id: 4,
        title: 'ZenBox Mobile App',
        description: 'The mobile companion for ZenBox, built with React Native. Designed specifically for employees on the go, it provides real-time task tracking and full role-based access natively on both iOS and Android.',
        tech: ['React Native', 'Expo', 'TypeScript', 'Tailwind CSS'],
        category: 'client' as ProjectCategory,
        screenshot: '/images/zenbox-mobile.webp',
        githubUrl: 'https://github.com/IFMTYP2025/team15-mobile',
        demoUrl: '',
        youtubeUrl: 'https://youtu.be/L-LNjbStd80?t=568',
        year: '2025',
        clientOrder: 50,
    },
    {
        id: 10,
        title: 'Bear Group',
        description:
            'Designed and built a website for Bear Group, a South African company that provides strategic oversight and shared resources across its subsidiaries in construction, earthworks & logistics, security protection, consulting, etc. Built as a clean, responsive site with clear service pages, a gallery, and direct contact details.',
        tech: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Radix UI', 'GSAP', 'Lenis'],
        category: 'client' as ProjectCategory,
        screenshot: '/images/beargroup.webp',
        demoUrl: 'https://beargroup.vercel.app/',
        year: '2026',
        clientOrder: 10,
    },
    {
        id: 11,
        title: 'Dimax Software',
        description: 'Collaborated with Hitek Solutions (the developers behind Spane4All.co.za) to revamp the Dimax Software website. I designed the final wireframes and led the new homepage styling to give the brand a modern feel. To bring the site to life, I took their static logo and animated it into a dynamic motion graphic using LottieFiles, Canva AI, etc.',
        tech: ['UI/UX Design', 'Wireframing', 'Bootstrap', 'Motion Graphics', 'HTML', 'CSS', 'JavaScript',],
        category: 'client' as ProjectCategory,
        screenshot: '/images/dimax.webp',
        demoUrl: 'https://dimax-software.netlify.app/',
        year: '2026',
        clientOrder: 5,
    },
    {
        id: 7,
        title: 'Fleur De Maison',
        description: (
            <>
                Logo design for Fleur De Maison, a boutique floral brand. Inspired by the romance of Parisian gardens, the brand creates bespoke bouquets that transform every moment into something extraordinary. Check them out on tiktok and instagram!
            </>
        ),
        tech: ['Logo Design', 'Graphic Design', 'Adobe Illustrator'],
        category: 'design' as ProjectCategory,
        screenshot: '/images/fleurdemaison.webp',
        githubUrl: '',
        demoUrl: '',
        tiktokUrl: 'https://www.tiktok.com/@fleur.de.maison',
        youtubeUrl: '',
        instagramUrl: 'https://www.instagram.com/fleur.de.maison/',
        year: '2025',
    },
];

const filters: { label: string; value: ProjectCategory }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'Personal Projects', value: 'personal' },
    { label: 'Client Projects', value: 'client' },
    { label: 'Graphic Design', value: 'design' },
];

export default function ProjectsSection() {
    const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
    const projectCardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
    const [cardAnimations, setCardAnimations] = useState<Map<number, { opacity: number; translateY: number; blur: number }>>(new Map());
    const [isMobile, setIsMobile] = useState(false);
    const [visibleCount, setVisibleCount] = useState(6);

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') {
            // Return projects in the same order as declared in the `projects` array.
            // Use `showInAll` flag to hide specific items (like duplicates) from the All view.
            return projects.filter(project => project.showInAll !== false);
        }

        const filtered = projects.filter(project => project.category === activeFilter);

        if (activeFilter === 'client') {
            return filtered.sort((a, b) => (a.clientOrder || 99) - (b.clientOrder || 99));
        }

        return filtered;
    }, [activeFilter]);

    const baseVisibleCount = isMobile ? 4 : 6;
    const visibleProjects = useMemo(() => filteredProjects.slice(0, visibleCount), [filteredProjects, visibleCount]);

    // Detect mobile vs desktop
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // Breakpoint for mobile. hardcoded but works well for this use case. Adjust if needed.
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Reset visible cards when filter changes or breakpoint changes
    useEffect(() => {
        // eslint-disable-next-line
        setVisibleCount(Math.min(baseVisibleCount, filteredProjects.length));
    }, [activeFilter, isMobile, filteredProjects.length, baseVisibleCount]);

    // Scroll animation effect for project cards
    useEffect(() => {
        // Access filteredProjects from closure
        const handleScroll = () => {
            const windowHeight = window.innerHeight;

            // ANIMATION PARAMETERS - Same values as ResumeSection
            const animationStart = windowHeight * 0.95; // When animation STARTS
            const animationEnd = windowHeight * 0.8; // When animation ENDS
            const translateDistance = 15; // Movement distance (in pixels)
            const animationRange = animationStart - animationEnd; // Range height
            const blurAmount = 10; // Maximum blur (in pixels)
            const blurEnd = windowHeight * 0.9; // When blur ENDS

            const newAnimations = new Map<number, { opacity: number; translateY: number; blur: number }>();

            // Get visible cards per row on desktop
            const getVisibleCardsPerRow = () => {
                if (isMobile) return 1; // Mobile: one card per row

                // Desktop: detect how many cards fit per row
                const firstCard = projectCardRefs.current.get(visibleProjects[0]?.id);
                if (!firstCard || visibleProjects.length === 0) return 3;

                const gridContainer = firstCard.parentElement;
                if (!gridContainer) return 3;

                const containerWidth = gridContainer.clientWidth;
                const cardWidth = firstCard.offsetWidth;
                const gap = 32; // 2rem gap
                const cardsPerRow = Math.floor((containerWidth + gap) / (cardWidth + gap));
                return Math.max(1, Math.min(cardsPerRow, visibleProjects.length));
            };

            const cardsPerRow = getVisibleCardsPerRow();
            const rowGroups: number[][] = [];

            // Group cards by rows
            for (let i = 0; i < visibleProjects.length; i += cardsPerRow) {
                rowGroups.push(visibleProjects.slice(i, i + cardsPerRow).map(p => p.id));
            }

            // Remove unused 'index' parameter
            visibleProjects.forEach((project) => {
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
                // Unified logic for both mobile and desktop
                // On mobile: cardsPerRow is 1, so each card is its own row
                // On desktop: cards calculate progress based on their row's position

                // Find which row this card belongs to
                const rowIndex = rowGroups.findIndex(row => row.includes(project.id));
                if (rowIndex >= 0) {
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
    }, [visibleProjects, isMobile]);

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

                <div className={`projects-grid ${visibleProjects.length === 1 ? 'projects-grid-single' : ''}`}>
                    {visibleProjects.map((project) => {
                        //can i remove this line?
                        const isDesignCategory = project.category === 'design';
                        const aspectRatioClass = 'project-image-video';

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
                                        <Image
                                            src={project.screenshot}
                                            alt={`${project.title} screenshot`}
                                            className="project-screenshot"
                                            width={800}
                                            height={600}
                                            loading="lazy"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="project-card-content">
                                    <div className="project-card-text">
                                        <h3 className="project-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span>{project.title}</span>
                                            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: '500', padding: '0.25rem 0.5rem', border: '1px solid #e5e5e5', borderRadius: '999px', color: '#1a1a1a', background: 'transparent' }}>{project.year || 'NEW!'}</span>
                                        </h3>
                                        <p className="project-description" style={{ textAlign: 'justify', marginTop: '1em' }}>
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Technologies */}
                                    <div className="project-tech" style={{ marginTop: '1rem' }}>
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
                                                href={project.demoUrl === '#' ? undefined : project.demoUrl}
                                                target={project.demoUrl === '#' ? undefined : '_blank'}
                                                rel={project.demoUrl === '#' ? undefined : 'noopener noreferrer'}
                                                className="project-link-btn project-link-btn-demo"
                                                onClick={project.demoUrl === '#' ? (e) => e.preventDefault() : undefined}
                                                style={project.demoUrl === '#' ? { cursor: 'not-allowed', opacity: 0.6, pointerEvents: 'none' } : {}}
                                            >
                                                <span style={{ textAlign: 'center', flex: 1 }}>Live</span>
                                                <ArrowIcon />
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl === '#' ? undefined : project.githubUrl}
                                                target={project.githubUrl === '#' ? undefined : '_blank'}
                                                rel={project.githubUrl === '#' ? undefined : 'noopener noreferrer'}
                                                className="project-link-btn project-link-btn-github"
                                                onClick={project.githubUrl === '#' ? (e) => e.preventDefault() : undefined}
                                                style={project.githubUrl === '#' ? { cursor: 'not-allowed', opacity: 0.6, pointerEvents: 'none' } : {}}
                                            >
                                                <span style={{ textAlign: 'center', flex: 1 }}>GitHub</span>
                                                <ArrowIcon />
                                            </a>
                                        )}
                                        {project.youtubeUrl && (
                                            <a
                                                href={project.youtubeUrl === '#' ? undefined : project.youtubeUrl}
                                                target={project.youtubeUrl === '#' ? undefined : '_blank'}
                                                rel={project.youtubeUrl === '#' ? undefined : 'noopener noreferrer'}
                                                className="project-link-btn project-link-btn-youtube"
                                                onClick={project.youtubeUrl === '#' ? (e) => e.preventDefault() : undefined}
                                                style={project.youtubeUrl === '#' ? { cursor: 'not-allowed', opacity: 0.6, pointerEvents: 'none' } : {}}
                                            >
                                                <span style={{ textAlign: 'center', flex: 1 }}>YouTube</span>
                                                <ArrowIcon />
                                            </a>
                                        )}
                                        {project.tiktokUrl && (
                                            <a
                                                href={project.tiktokUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link-btn project-link-btn-tiktok"
                                            >
                                                <span style={{ textAlign: 'center', flex: 1 }}>TikTok</span>
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
                                        {project.chromeUrl && (
                                            <a
                                                href={project.chromeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link-btn project-link-btn-demo"
                                            >
                                                <span style={{ textAlign: 'center', flex: 1 }}>Chrome Store</span>
                                                <ArrowIcon />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {(filteredProjects.length > baseVisibleCount) && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            marginTop: isMobile ? '1rem' : '2rem',
                            marginBottom: isMobile ? '1rem' : undefined,
                        }}
                    >
                        {visibleCount < filteredProjects.length && (
                            <button
                                type="button"
                                onClick={() => setVisibleCount(filteredProjects.length)}
                                className="project-filter-btn active"
                                style={{ padding: '0.75rem 1.25rem', borderRadius: '999px' }}
                            >
                                See more
                            </button>
                        )}
                        {visibleCount > baseVisibleCount && (
                            <button
                                type="button"
                                onClick={() => setVisibleCount(Math.min(baseVisibleCount, filteredProjects.length))}
                                className="project-filter-btn"
                                style={{ padding: '0.75rem 1.25rem', borderRadius: '999px' }}
                            >
                                See less
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

