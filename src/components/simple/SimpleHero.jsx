import React from "react";
import { Link } from "react-router-dom";

const SimpleHero = () => {
  return (
    <section
      id="home"
      className="min-h-[80vh] flex flex-col justify-center items-center px-6 pt-28 pb-16 bg-white"
    >
      <div className="max-w-2xl w-full text-left space-y-8">
        {/* Name & Focal Statement */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-black leading-none">
            Abdulwarith.
          </h1>

          <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug tracking-tight max-w-xl">
            I build language model training stacks from first principles, AI systems, and mobile products.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            to="/technical-reports"
            className="px-7 py-3.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all active:scale-95 shadow-sm flex items-center space-x-2"
          >
            <span>Technical Reports</span>
            <span className="text-[11px]">→</span>
          </Link>

          <a
            href="/files/Abdulwahab Abdulwarith.pdf"
            download="Abdulwarith_CV.pdf"
            className="px-6 py-3.5 bg-white text-black border border-gray-200 text-xs font-bold uppercase tracking-wider rounded-xl hover:border-black transition-all active:scale-95 flex items-center space-x-2"
          >
            <span>Download CV</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SimpleHero;
