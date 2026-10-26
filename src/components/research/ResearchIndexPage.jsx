import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Download, ArrowRight, Layers, FileText, CheckCircle2, ExternalLink } from "lucide-react";
import SEO from "../common/SEO";
import researchData from "../../data/research.json";

const CATEGORIES = ["All", "Systems & Architecture", "Data & Curation", "Pretraining & Alignment"];

const ResearchIndexPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPapers = activeCategory === "All"
    ? researchData
    : researchData.filter((paper) => {
        if (activeCategory === "Systems & Architecture") {
          return paper.category.includes("Systems") || paper.category.includes("Tokenization");
        }
        if (activeCategory === "Data & Curation") {
          return paper.category.includes("Data") || paper.category.includes("Curation");
        }
        if (activeCategory === "Pretraining & Alignment") {
          return paper.category.includes("Pretraining") || paper.category.includes("Alignment");
        }
        return true;
      });

  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-sans selection:bg-black selection:text-white">
      <SEO
        title="Technical Reports & AI Research | Abdulwarith"
        description="Foundation model systems engineering, hardware-aligned tokenization, and two-stage pretraining data curation by Abdulwarith."
        url="https://www.enigmare.xyz/technical-reports"
        image="https://www.enigmare.xyz/images/og-preview.png"
      />

      {/* Sticky Top Nav */}
      <div className="sticky top-0 z-50 px-6 py-4 bg-white/90 backdrop-blur-md border-b border-gray-200/70 flex items-center justify-between">
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
          <span className="text-xs font-mono text-gray-500">
            Enigmare AI Research
          </span>
          <a
            href="mailto:abdulwarith@noteiq.live"
            className="px-3.5 py-1.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all shadow-xs"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-10 md:py-16 space-y-10">
        {/* Header Block */}
        <div className="space-y-5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-black text-white rounded-md text-[11px] font-mono font-semibold">
            <span>Enigmare AI Research</span>
            <span>·</span>
            <span>Publications</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
            <div className="space-y-3 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-black leading-tight">
                Technical Reports &amp; Systems Research
              </h1>
              <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed">
                Empirical investigations in language model pretraining, hardware-aligned tokenization architectures, and two-stage pretraining curation from first principles.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-gray-600 bg-white border border-gray-200 p-3 rounded-2xl shadow-xs">
              <div className="px-2 py-1">
                <span className="font-bold text-black">2</span> Reports
              </div>
              <span className="text-gray-300">·</span>
              <div className="px-2 py-1">
                <span className="font-bold text-black">1</span> Checkpoint
              </div>
              <span className="text-gray-300">·</span>
              <div className="px-2 py-1">
                <span className="font-bold text-black">120B+</span> Tokens
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? "bg-black text-white shadow-xs"
                  : "bg-white text-gray-600 border border-gray-200/80 hover:border-black hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reports Grid (2 Columns on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPapers.map((paper, idx) => {
            const isExternal = paper.readUrl?.startsWith("http");
            const reportBadge = paper.id === "nylon-tokenizer" 
              ? "Report No. 01" 
              : paper.id === "nylon-data-curation" 
                ? "Report No. 02" 
                : "Foundation Model";

            return (
              <article
                key={paper.id}
                className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-md hover:border-gray-300 transition-all group"
              >
                {/* Top Badge & Date */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 bg-black text-white rounded-md text-[10px] font-mono font-bold uppercase tracking-wider">
                        {reportBadge}
                      </span>
                      <span className="text-gray-500 font-mono text-[11px]">
                        {paper.category}
                      </span>
                    </div>
                    <span className="text-gray-400 font-mono text-[11px]">{paper.date}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-2">
                    <h2
                      onClick={() => {
                        if (paper.readUrl) {
                          if (isExternal) {
                            window.open(paper.readUrl, "_blank", "noopener,noreferrer");
                          } else {
                            navigate(paper.readUrl);
                          }
                        }
                      }}
                      className="text-xl sm:text-2xl font-black tracking-tight text-black group-hover:text-gray-700 transition-colors cursor-pointer leading-snug"
                    >
                      {paper.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {paper.subtitle}
                    </p>
                  </div>

                  {/* Key Stats Pills */}
                  {paper.stats && (
                    <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px]">
                      {Object.entries(paper.stats).map(([k, v]) => (
                        <span
                          key={k}
                          className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-700 rounded-md"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Abstract Preview */}
                  <p className="text-xs text-gray-600 leading-relaxed font-serif line-clamp-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                    "{paper.abstract}"
                  </p>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 font-sans">
                  <div className="flex flex-wrap gap-1">
                    {paper.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] font-mono text-gray-400">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    {paper.pdfUrl && (
                      <a
                        href={paper.pdfUrl}
                        download
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center space-x-1.5"
                        title="Download PDF"
                      >
                        <Download size={13} />
                        <span>PDF</span>
                      </a>
                    )}

                    {paper.readUrl && (
                      <button
                        onClick={() => {
                          if (isExternal) {
                            window.open(paper.readUrl, "_blank", "noopener,noreferrer");
                          } else {
                            navigate(paper.readUrl);
                          }
                        }}
                        className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all flex items-center space-x-1.5 shadow-xs"
                      >
                        <span>{isExternal ? "Hugging Face" : "Read"}</span>
                        {isExternal ? <ExternalLink size={12} /> : <ArrowRight size={13} />}
                      </button>
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
