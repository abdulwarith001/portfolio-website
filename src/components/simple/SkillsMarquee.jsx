import React from 'react';

const skillsRow1 = [
  { name: 'React', slug: 'react', color: '#61DAFB' },
  { name: 'React Native', slug: 'react', color: '#61DAFB' },
  { name: 'Expo', slug: 'expo', color: '#000000' },
  { name: 'Next.js', slug: 'nextdotjs', color: '#000000' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '#06B6D4' },
  { name: 'Python', slug: 'python', color: '#3776ab' },
  { name: 'OpenAI', slug: 'openai', color: '#412991' },
  { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
  { name: 'PostgreSQL', slug: 'postgresql', color: '#4169e1' },
  { name: 'Node.js', slug: 'nodedotjs', color: '#339933' }
];

const skillsRow2 = [
  { name: 'AWS', slug: 'amazonaws', color: '#232F3E' },
  { name: 'Docker', slug: 'docker', color: '#2496ed' },
  { name: 'Git', slug: 'git', color: '#f05032' },
  { name: 'Redis', slug: 'redis', color: '#DC382D' },
  { name: 'Framer Motion', slug: 'framer', color: '#0055FF' },
  { name: 'GSAP', slug: 'greensock', color: '#88CE02' },
  { name: 'Figma', slug: 'figma', color: '#f24e1e' }
];

const SkillsMarquee = () => {
  const renderSkill = (skill, index) => (
    <div 
      key={index} 
      className="flex items-center space-x-4 px-6 py-3 bg-gray-50/50 rounded-2xl border border-transparent transition-all duration-300"
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        <img 
          src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color.replace('#', '').toLowerCase()}`} 
          alt={skill.name}
          className="w-6 h-6 object-contain transition-all duration-300"
        />
      </div>
      <span 
        className="text-2xl md:text-3xl font-black tracking-tighter text-black transition-colors duration-300"
      >
        {skill.name}
      </span>
    </div>
  );

  return (
    <div className="relative py-12 bg-white overflow-hidden border-y border-gray-50">
      {/* Side Masks for Fade Effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div className="space-y-6">
        {/* Row 1: Left to Right */}
        <div className="flex whitespace-nowrap animate-marquee-left">
          <div className="flex items-center space-x-12 px-6">
            {[...skillsRow1, ...skillsRow1, ...skillsRow1].map((skill, index) => renderSkill(skill, index))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex whitespace-nowrap animate-marquee-right">
          <div className="flex items-center space-x-12 px-6">
            {[...skillsRow2, ...skillsRow2, ...skillsRow2].map((skill, index) => renderSkill(skill, index))}
          </div>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 35s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SkillsMarquee;
