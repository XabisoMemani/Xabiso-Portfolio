# Xabiso Memani - Portfolio

A custom portfolio website designed and built from scratch to showcase my work, personality, and technical skills. Every element was crafted by hand—no templates, no frameworks dictating the design. This project reflects my approach to frontend development: thoughtful UX, clean code, and attention to detail.

## Project Overview

This portfolio is a full-stack Next.js application that combines modern web technologies with custom design systems. It features a unique custom cursor system, dynamic theme switching, and a fully responsive layout that works seamlessly across all devices.

The project demonstrates my skills in React development, TypeScript, CSS architecture, and UX design—all brought together to create a cohesive, interactive experience that represents who I am as a developer and designer.

## Key Features

- **Custom Cursor System**: Interactive cursor with hover effects and click animations

- **Dynamic Theme Switching**: Three themes (Orange, Dark, Wood) with smooth transitions

- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop

- **Project Showcase**: Filterable project gallery with detailed descriptions and links

- **Interactive Resume Section**: Timeline-style experience and education display

- **Smooth Animations**: Scroll-triggered animations and transitions throughout

- **Contact Integration**: Direct links to GitHub, LinkedIn, Email, WhatsApp, and social media

## Technology Stack

### Frontend

- **Next.js 16** with React 19 and TypeScript

- **100% Custom CSS** — no UI libraries, all styles built from scratch

- Responsive design with mobile-first approach

- Custom animations and transitions

### Design & UX

- Custom cursor system with interactive states

- Theme system with CSS variables for dynamic color switching

- Glassmorphism effects and backdrop filters

- Typography using VT323 monospace and Inter sans-serif

### State Management

- React hooks for theme management and UI state

- LocalStorage for theme persistence

- Scroll-based animations and interactions

## Project Structure

```
xabiso-portfolio/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── globals.css   # All custom styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Main page component
│   ├── components/       # React components
│   │   ├── AboutSection.tsx
│   │   ├── ResumeSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Cursor.tsx
│   │   ├── ThemeSwitcher.tsx
│   │   └── ...
│   └── hooks/
│       └── useTheme.ts  # Theme management hook
├── public/
│   ├── documents/        # PDF files (CV, certificates)
│   └── images/          # Project screenshots and assets
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Running the Application

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser

3. **Build for Production**

   ```bash
   npm run build
   npm start
   ```

## Sections

- **About Me**: Introduction with animated text reveal and service offerings

- **Resume**: Education timeline, work experience, certifications, and skills

- **Projects**: Filterable gallery showcasing school projects, personal projects, and design work

- **Contact**: Social links and contact information with download CV option

## Design Philosophy

This portfolio was built to reflect my personality and design sensibilities. Every interaction, animation, and visual element was intentionally crafted to create a cohesive experience. The custom cursor, theme system, and scroll animations all work together to make the site feel alive and interactive—not just a static collection of information.

## Deployment

The portfolio is designed to be deployed on any platform that supports Next.js:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any Node.js hosting service**

Simply run `npm run build` and deploy the `.next` output directory.

## Collaboration?

This portfolio is part of my professional work, built to showcase my skills in frontend development, UX design, and creative problem-solving.

I'm always open to feedback, especially from fellow developers, designers, or anyone interested in modern web development and UX design.
