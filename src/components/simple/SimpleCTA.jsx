import React from 'react';

const SimpleCTA = () => {
  return (
    <section className="py-12 md:py-32 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-8xl font-black tracking-tighter text-black leading-[1.1]">
            Ready to <span className="text-indigo-600">work</span>?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            I'm currently available for freelance projects and full-time opportunities. Let's build something exceptional together.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <a 
            href="#contact"
            className="w-full md:w-auto px-10 py-5 bg-black text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-black/10 active:scale-95"
          >
            Get in touch
          </a>
          <a 
            href="/cv.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-10 py-5 bg-white border border-gray-200 text-black rounded-full text-sm font-bold uppercase tracking-widest hover:border-black transition-all active:scale-95"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default SimpleCTA;
