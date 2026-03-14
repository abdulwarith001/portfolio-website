import React, { useState } from "react";
import projectsData from "../../data/projects.json";
import ProjectDetail from "./ProjectDetail";

const ProjectsPage = ({ onBack, onProjectSelect }) => {
  return (
    <div className="min-h-screen bg-white py-32 px-6 overflow-y-auto animate-fade-in relative">
      {/* Fixed Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <button
          onClick={onBack}
          className="group flex items-center space-x-3 p-4 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all shadow-xl shadow-black/5 active:scale-95 text-black"
          aria-label="Back to Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transform group-hover:-translate-x-1 transition-transform"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black leading-none">
              All Projects.
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-xl">
              A detailed collection of my recent technical projects and case studies.
            </p>
          </div>

          <button
            onClick={onBack}
            className="group flex items-center space-x-3 px-8 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-black hover:bg-black hover:text-white transition-all active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transform group-hover:-translate-x-1 transition-transform"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Back to Home
            </span>
          </button>
        </div>

        {/* Full Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="group space-y-6 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                onClick={() => onProjectSelect(project)}
                className="relative aspect-[4/5] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-xl shadow-indigo-500/5 transition-all duration-500 cursor-pointer group-hover:-translate-y-2 group-hover:shadow-2xl"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                  <div className="px-6 py-3 bg-black text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                    View Details
                  </div>
                </div>
              </div>

              <div className="space-y-2 px-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">
                  {project.category}
                </span>
                <h4 className="text-xl font-bold text-gray-900">
                  {project.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
