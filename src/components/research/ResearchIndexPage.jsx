import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../common/SEO";
import researchData from "../../data/research.json";

const ResearchIndexPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <SEO
        title="Technical Reports | Abdulwarith"
        description="Technical reports and foundation model systems engineering by Abdulwarith."
        url="https://www.enigmare.xyz/technical-reports"
        image="https://www.enigmare.xyz/images/og-preview.png"
      />

      {/* Sticky Top Nav */}
      <div className="sticky top-0 z-50 px-6 py-4 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between">
        <Link
          to="/"
          className="group flex items-center space-x-2 text-xs font-semibold text-gray-600 hover:text-black transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transform group-hover:-translate-x-0.5 transition-transform"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>Return to Portfolio</span>
        </Link>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono text-gray-400">
            Enigmare AI Research
          </span>
          <a
            href="mailto:abdulwarith@noteiq.live"
            className="px-3.5 py-1.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-16">
        {/* Header Block */}
        <div className="space-y-4 border-b border-gray-100 pb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md text-[11px] font-mono text-gray-700 font-semibold">
            <span>Enigmare AI Research</span>
            <span>·</span>
            <span>Technical Reports</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-black">
            Technical Reports
          </h1>

          <p className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl leading-relaxed">
            Empirical research and systems engineering focused on language model pretraining, hardware-aligned tokenization, and verifiable reasoning from first principles.
          </p>
        </div>

        {/* Papers Listing */}
        <div className="space-y-10">
          {researchData.map((paper) => {
            const isPublished = paper.status === "Published";

            return (
              <article
                key={paper.id}
                className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 space-y-6 shadow-sm hover:border-gray-300 transition-all"
              >
                {/* Status & Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isPublished
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {paper.status}
                    </span>
                    <span className="text-gray-400 font-mono">
                      {paper.category}
                    </span>
                  </div>

                  <span className="text-gray-400 font-mono">{paper.date}</span>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-3">
                  <h2
                    onClick={() => {
                      if (paper.readUrl) navigate(paper.readUrl);
                    }}
                    className={`text-2xl md:text-3xl font-black tracking-tight text-black leading-snug ${
                      paper.readUrl
                        ? "cursor-pointer hover:text-gray-700 transition-colors"
                        : ""
                    }`}
                  >
                    {paper.title}
                  </h2>

                  <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed">
                    {paper.subtitle}
                  </p>
                </div>

                {/* Quantitative Stats Pills */}
                {paper.stats && (
                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                    {Object.entries(paper.stats).map(([key, val]) => (
                      <span
                        key={key}
                        className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-700 rounded-md"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                )}

                {/* Abstract Preview */}
                <div className="p-5 bg-gray-50/70 border border-gray-100 rounded-2xl space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                    Abstract Preview
                  </span>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-serif">
                    {paper.abstract}
                  </p>
                </div>

                {/* Tags & Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-1.5">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {paper.pdfUrl && (
                      <a
                        href={paper.pdfUrl}
                        download
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center space-x-1.5"
                      >
                        <span>Download PDF</span>
                        <span>↓</span>
                      </a>
                    )}

                    {paper.readUrl ? (
                      <button
                        onClick={() => navigate(paper.readUrl)}
                        className="px-5 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all flex items-center space-x-1.5 shadow-sm"
                      >
                        <span>Read Technical Report</span>
                        <span>→</span>
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-mono">
                        Manuscript in progress
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ResearchIndexPage;
