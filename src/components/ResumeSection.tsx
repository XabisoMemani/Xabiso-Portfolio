'use client';

export default function ResumeSection() {
    return (
        <section id="resume" className="portfolio-section">
            <div className="section-content">
                <div className="resume-header">
                    <h2 className="section-title">RESUME</h2>
                    <div className="experience-badge">7+ Years Coding Experience</div>
                </div>
                <div className="resume-grid">
                    <div className="resume-left">
                        <div className="resume-section-group">
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
                                            <div className="achievement-badge achievement-badge-tooltip" data-tooltip="(83% Final Mark)">Trophy for Top Matric Learner in Computer Applications Technology</div>
                                            <div className="achievement-badge">RCL Prefect / Leader</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="resume-section-group">
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
                                        Gained valuable sales experience conducting cold calls and promoting insurance products, demonstrating strong communication skills and customer relationship management.
                                    </p>
                                    <div className="experience-achievement">
                                        <strong>Achievement:</strong> Recognized as the junior agent with the most transfers in the first 30-day cycle, earning an achievement badge for outstanding performance
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
                                        Provided technical support and operated professional printing equipment, showcasing proficiency with hardware systems and customer-facing troubleshooting. Managed cash transactions and inventory, applying business acumen in a fast-paced environment. Designed marketing materials including posters, flyers, and business cards, developing visual communication skills that now inform my approach to UI/UX design. Delivered <u>24-hour support</u> to select clients, strengthening my problem-solving abilities and responsiveness in technical roles.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="resume-right">
                        <div className="resume-section-group">
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
                        <div className="resume-section-group">
                            <h3 className="resume-group-title">SKILLS</h3>
                            <div className="skill-item">
                                <div className="skill-header">
                                    <span className="skill-name"><strong>Programming Languages:</strong> C#, C++, Java, Python, SQL</span>
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
                                <div className="download-cv-link download-cv-link-orange">
                                    Download CV
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

