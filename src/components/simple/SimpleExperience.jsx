import React from 'react';
import experienceData from '../../data/experience.json';

const SimpleExperience = () => {
  return (
    <section id="experience" className="py-10 md:py-20 px-6 bg-white border-t border-gray-50">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-left md:text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
            Work Experience
          </h2>
          <div className="h-0.5 w-12 bg-gray-100 md:mx-auto"></div>
        </div>

        {/* Experience Rows */}
        <div className="space-y-8">
          {experienceData.map((exp) => (
            <div 
              key={exp.id} 
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 group transition-all duration-300"
            >
              {/* Duration */}
              <div className="md:w-1/3">
                <span className="text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
                  {exp.duration}
                </span>
              </div>

              {/* Position & Company & Achievements */}
              <div className="md:w-2/3 space-y-4">
                <div className="flex flex-wrap items-center md:justify-end gap-x-2 gap-y-3">
                  <span className="text-lg font-semibold text-gray-900 leading-tight">
                    {exp.role} at
                  </span>
                  
                  {/* Company Pill */}
                  <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white border border-gray-100 rounded-full shadow-sm shadow-blue-500/5 group-hover:border-blue-200 group-hover:bg-blue-50/30 transition-all duration-300 cursor-pointer">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-bold text-blue-600 tracking-tight">
                      {exp.company}
                    </span>
                  </div>
                </div>

                {/* Achievements List */}
                {exp.achievements && (
                  <ul className="space-y-2 md:text-right">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm text-gray-500 leading-relaxed">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Subtle Bottom Divider */}
        <div className="pt-6">
          <div className="h-px w-full bg-gray-50"></div>
        </div>
      </div>
    </section>
  );
};

export default SimpleExperience;
