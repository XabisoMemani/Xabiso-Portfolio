'use client';

import { useState } from 'react';

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

    const projects: Project[] = [
        {
            id: 5,
            title: 'Skinn Galleria',
            description: (
                <>
                    E-commerce website for Skinn, an African-inspired clothing brand founded by <u>Yethu Mabizela</u>. As Creative Director, I designed and developed the brand identity and web presence. Features a modern e-commerce experience with product showcases, magazine integration, and seamless shopping functionality.
                </>
            ),
            tech: ['E-commerce', 'Brand Design', 'UI/UX'],
            category: 'personal' as ProjectCategory,
            screenshot: '/images/skinnbeta.png',
            githubUrl: '',
            demoUrl: 'https://skinnbeta.webflow.io/',
            youtubeUrl: '',
            instagramUrl: 'https://www.instagram.com/skinnnation/',
        },
        {
            id: 2,
            title: 'Find My Uni',
            description: 'Full-stack web application that helps South African students discover university programs based on their subject marks and APS scores. Features course matching, automatic APS calculation, user authentication, and responsive design with custom animations.',
            tech: ['HTML5', 'CSS3', 'JavaScript', 'WCF', '.NET Framework', 'C#', 'SQL Server'],
            category: 'personal' as ProjectCategory,
            screenshot: '/images/findmyuni.png', // Add screenshot when available
            githubUrl: 'https://github.com/XabisoMemani/FindMyUni',
            demoUrl: 'https://findmyuni-xabiso4.vercel.app',
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
    ];

    const filters: { label: string; value: ProjectCategory }[] = [
        { label: 'All Projects', value: 'all' },
        { label: 'School Projects', value: 'school' },
        { label: 'Personal Projects', value: 'personal' },
        { label: 'Graphic Design', value: 'design' },
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

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

                <div className="projects-grid">
                    {filteredProjects.map((project) => {
                        const isDesignCategory = project.category === 'design';
                        const aspectRatioClass = isDesignCategory ? 'project-image-square' : 'project-image-video';

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

                        return (
                            <div
                                key={project.id}
                                className={`project-card ${project.screenshot ? 'project-card-with-image' : ''}`}
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

