import React from "react";

const SimpleHero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 pb-10 bg-white overflow-hidden"
    >
      <div className="max-w-xl w-full text-left space-y-10">
        {/* Avatar Section */}
        <div className="animate-fade-in">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-indigo-100 overflow-hidden border-4 border-white shadow-sm ring-1 ring-gray-100">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Typography Section */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black leading-[1.15] tracking-tighter text-black animate-slide-up">
            Hello, I'm{" "}
            <span className="text-gray-900 underline decoration-4 decoration-indigo-500/20 underline-offset-8">
              Abdulwarith
            </span>
            .
          </h1>

          <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-lg animate-slide-up-delayed">
            Software Engineer specializing in Fintech, Ed.Tech, Mobile Apps, AI,
            and Autonomous Agents.
          </p>
        </div>

        {/* Action Pills Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1 animate-fade-in-delayed">
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 bg-black text-white text-sm font-bold rounded-2xl hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/10 flex items-center justify-center"
          >
            Get In Touch
          </a>

          <div className="inline-flex items-center space-x-2 px-5 py-3.5 bg-green-50 rounded-full border border-green-100/50">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest whitespace-nowrap">
              Available for new project
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Gradient Blob (Optional refinement) */}
      <div className="fixed -bottom-48 -right-48 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none z-0"></div>
    </section>
  );
};

export default SimpleHero;
