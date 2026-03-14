import React from "react";
import projectsData from "../../data/projects.json";

const SimpleProjects = ({ onViewAll, onProjectSelect }) => {
  return (
    <section
      id="projects"
      className="py-10 md:py-20 px-6 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">
            Selected Work
          </h2>
          <h3 className="text-4xl md:text-7xl font-black tracking-tighter text-black max-w-2xl leading-[1.1]">
            Selected Projects & Case Studies
          </h3>
        </div>

        {/* Projects Grid - 2 columns on desktop for premium look */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projectsData.slice(0, 4).map((project, index) => (
            <div
              key={project.id}
              className="group space-y-4 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image Card */}
              <div
                onClick={() => onProjectSelect(project)}
                className="relative aspect-[16/10] bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl shadow-indigo-500/5 transition-all duration-700 cursor-pointer group-hover:-translate-y-3 group-hover:shadow-3xl group-hover:shadow-indigo-500/10"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110"
                />

                {/* Overlay Link */}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center backdrop-blur-md">
                  <div className="flex items-center space-x-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                    <div className="px-8 py-4 bg-black text-white text-[9px] font-bold uppercase tracking-[0.25em] rounded-full shadow-xl">
                      {project.liveLink ? "View Live Project" : "View Project"}
                    </div>

                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-3.5 bg-white text-black hover:bg-black hover:text-white rounded-full transition-all duration-300 shadow-xl border border-gray-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.303 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-3 px-2">
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">
                    {project.category}
                  </span>
                  <div className="h-px w-8 bg-gray-200"></div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-3xl font-bold text-gray-900 leading-tight">
                    {project.title}
                  </h4>
                  <p className="text-base text-gray-400 font-medium leading-relaxed max-w-md">
                    {project.shortDescription}
                  </p>
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-bold uppercase tracking-wider px-3 py-1 bg-indigo-50/50 text-indigo-500 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4 animate-fade-in-delayed">
          <button
            onClick={onViewAll}
            className="px-10 py-5 bg-white border border-gray-200 text-black text-[10px] font-bold uppercase tracking-[0.25em] rounded-3xl hover:bg-black hover:text-white hover:border-black transition-all shadow-sm active:scale-95 group flex items-center space-x-4"
          >
            <span>View All Projects</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transform group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SimpleProjects;
