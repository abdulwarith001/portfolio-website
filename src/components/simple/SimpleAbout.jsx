import React from "react";

const SimpleAbout = () => {
  return (
    <section id="about" className="py-20 md:py-28 px-6 bg-white border-t border-gray-100">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400 font-mono">
            About · Engineering Philosophy
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black">
            Engineering from First Principles
          </h2>
        </div>

        <div className="space-y-6 text-gray-600 text-base md:text-lg leading-relaxed">
          <p className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
            I build software systems from the ground up — from hardware-aligned subword tokenizers and language model data pipelines to mission-critical financial backends and production client applications.
          </p>

          <p className="text-base text-gray-600 leading-relaxed font-normal">
            My work focuses on turning complex constraints into deterministic, verifiable software that ships. Whether co-designing vocabulary boundaries strictly to V = 65,536 to halve pretraining memory overhead, calculating statutory PAYE payroll taxes, or deploying native applications with biometric security, I prioritize system reliability, mechanical sympathy, and clean abstractions.
          </p>
        </div>

        {/* Bottom Metadata Badges */}
        <div className="pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-gray-500">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-gray-700 font-mono">Nigeria (WAT / UTC+1)</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-400 text-xs font-mono">
            <span className="text-gray-700">Software Engineer</span>
            <span>·</span>
            <span>AI Systems</span>
            <span>·</span>
            <span>Backend</span>
            <span>·</span>
            <span>Mobile</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleAbout;

