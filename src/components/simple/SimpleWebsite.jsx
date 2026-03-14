import React, { useState, useRef } from 'react';
import SimpleHeader from './SimpleHeader';
import SimpleHero from './SimpleHero';
import SimpleAbout from './SimpleAbout';
import SimpleProjects from './SimpleProjects';
import SimpleExperience from './SimpleExperience';
import SimpleCTA from './SimpleCTA';
import SkillsMarquee from './SkillsMarquee';
import SimpleContact from './SimpleContact';
import ProjectsPage from './ProjectsPage';
import SimpleFooter from './SimpleFooter';
import ProjectDetail from './ProjectDetail';
import SEO from '../common/SEO';

const SimpleWebsite = ({ onReset }) => {
  const [view, setView] = useState('home'); // 'home', 'projects', or 'detail'
  const [activeProject, setActiveProject] = useState(null);
  const scrollContainerRef = useRef(null);

  const handleProjectSelect = (project) => {
    setActiveProject(project);
    setView('detail');
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const handleViewAll = () => {
    setView('projects');
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const handleBackToHome = () => {
    setView('home');
    setActiveProject(null);
    // Optionally scroll back to projects section
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'auto' });
      }
    }, 0);
  };

  return (
    <div 
      ref={scrollContainerRef}
      className={`fixed inset-0 z-50 bg-white overflow-y-auto overflow-x-hidden scroll-smooth animate-fade-in ${view !== 'home' ? 'scroll-auto' : 'scroll-smooth'}`}
      style={{ fontFamily: "'Geom', sans-serif" }}
    >
      {view === 'home' && (
        <>
          <SEO 
            title="Full Stack Developer" 
            description="Portfolio of Abdulwarith, a Full Stack Developer specializing in React, Node.js, and modern web technologies. Explore my projects and professional experience."
          />
          <SimpleHeader />
          <main>
            <SimpleHero />
            <SimpleAbout />
            <SimpleProjects onViewAll={handleViewAll} onProjectSelect={handleProjectSelect} />
            <SimpleExperience />
            <SimpleCTA />
            <SkillsMarquee />
            <SimpleContact />
          </main>
          <SimpleFooter onReset={onReset} />
        </>
      )}

      {view === 'projects' && (
        <>
          <SEO 
            title="All Projects" 
            description="A comprehensive list of web development projects by Abdulwarith, featuring React, Tailwind CSS, and more."
          />
          <ProjectsPage onBack={handleBackToHome} onProjectSelect={handleProjectSelect} />
        </>
      )}

      {view === 'detail' && activeProject && (
        <>
          <SEO 
            title={`${activeProject.title} | Project`}
            description={activeProject.description || `Details about ${activeProject.title} project by Abdulwarith.`}
          />
          <ProjectDetail
            project={activeProject} 
            onClose={handleBackToHome} 
          />
        </>
      )}
    </div>
  );
};

export default SimpleWebsite;
