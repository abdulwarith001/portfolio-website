import React from 'react';

const ProjectDetail = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="min-h-screen bg-white animate-fade-in relative overflow-y-auto">
      {/* Immersive Navigation Bar */}
      <div className="sticky top-0 z-50 px-6 py-6 md:px-12 md:py-8 bg-white/80 backdrop-blur-xl border-b border-gray-50 flex items-center justify-between">
        <button 
          onClick={onClose}
          className="group flex items-center space-x-3 px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-black hover:bg-black hover:text-white transition-all active:scale-95"
          aria-label="Back to Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Back to Home</span>
        </button>

        <div className="hidden md:flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-gray-300">
          <span>{project.category}</span>
          <div className="w-1 h-1 rounded-full bg-gray-200"></div>
          <span className="text-gray-900">{project.title}</span>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto">
        {/* Cinematic Content Section */}
        <div className="p-8 md:px-24 md:py-16 space-y-12 lg:space-y-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 border-b border-gray-50 pb-12">
            <div className="space-y-4">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500">
                Case Study / {project.category}
              </span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-[0.9]">
                {project.title}.
              </h2>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.liveLink && (
                <a 
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-800 transition-all shadow-xl shadow-black/10 active:scale-95 group"
                >
                  <span>Visit Live Project</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                </a>
              )}
              {project.githubLink && (
                <a 
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-black border border-gray-200 text-[11px] font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-50 transition-all shadow-lg active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.303 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  <span>View Source</span>
                </a>
              )}
            </div>
          </div>

          {/* Main Narrative Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Narrative: What Was Done */}
            <div className="lg:col-span-8 space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-300">
                The Objective & Execution
              </h4>
              <ul className="space-y-6">
                {(Array.isArray(project.whatWasDone) ? project.whatWasDone : [project.whatWasDone]).map((point, i) => (
                  <li key={i} className="flex items-start space-x-4">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <p className="text-xl md:text-2xl text-gray-800 leading-[1.5] font-medium tracking-tight">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Meta: Technical Details */}
            <div className="lg:col-span-4 space-y-12">
              <div className="space-y-6">
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-300">
                  Core Stack
                </h4>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-bold text-gray-900 uppercase tracking-widest shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-gray-50 space-y-4">
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-300">
                  Deliverable
                </h4>
                <p className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                  {project.category}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Widescreen Image Section */}
        <div className="w-full aspect-[21/9] md:aspect-[2.5/1] overflow-hidden bg-gray-50 border-y border-gray-50">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale-[0.02] hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* Specialized Footer for Case Study */}
        <div className="p-8 md:p-24 bg-gray-50 border-t border-white flex flex-col items-center text-center space-y-8">
          <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">
            End of Case Study
          </h5>
          <button 
            onClick={onClose}
            className="group px-12 py-6 bg-black text-white text-[11px] font-bold uppercase tracking-[0.25em] rounded-full hover:bg-gray-800 transition-all active:scale-95 shadow-2xl flex items-center space-x-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
            <span>Return to Portfolio</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
