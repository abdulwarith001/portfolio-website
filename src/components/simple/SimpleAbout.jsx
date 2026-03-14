import React from 'react';

const SimpleAbout = () => {
  return (
    <section
      id="about"
      className="py-12 md:py-24 px-6 bg-white overflow-hidden"
    >
      <div className="max-w-xl mx-auto space-y-12">
        {/* Bio Text Section */}
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
            About Me
          </h2>
          <p className="text-xl md:text-3xl font-bold tracking-tight text-gray-900 leading-tight">
            I’m Abdulwarith, I build high-performance products that solve real
            problems. 
          </p>
          <p className="text-gray-500 font-medium leading-relaxed">
            From automated payroll systems at Paypaxe to AI-powered knowledge
            platforms like NoteIQ and autonomous agents like Nova, I turn
            complex logic into seamless, user-first experiences. I specialize
            in React Native for cross-platform mobile apps and Next.js for
            scalable web applications. I'm passionate about building clean,
            performant, and accessible experiences that solve real-world
            problems.
          </p>
        </div>

        {/* Image Card Section - Two Portrait Grid */}
        {/* <div className="animate-slide-up-delayed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="aspect-[4/5] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-2xl shadow-indigo-500/5 transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src="/src/assets/images/portrait_1.png"
                  alt="Abdulwarith Portrait 1"
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full border-2 border-indigo-50 rounded-3xl transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"></div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/5] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-2xl shadow-indigo-500/5 transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src="/src/assets/images/portrait_2.png"
                  alt="Abdulwarith Portrait 2"
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full border-2 border-indigo-50 rounded-3xl transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"></div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default SimpleAbout;
