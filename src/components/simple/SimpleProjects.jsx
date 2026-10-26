import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Download, ArrowRight, Layers, FileText } from "lucide-react";
import projectsData from "../../data/projects.json";
import researchData from "../../data/research.json";

const ProjectCard = ({ project, onProjectSelect }) => {
  const [activePlatform, setActivePlatform] = useState(() => {
    return project.platforms && project.platforms.includes("Web")
      ? "Web"
      : project.platforms?.[0] || "Web";
  });

  const currentImage = project.images
    ? (activePlatform === "Mobile" ? project.images.mobile : project.images.web) ||
      project.image
    : project.image;

  return (
    <div className="space-y-4">
      {/* Project Image Box with Subtle Crossfade */}
      <div
        onClick={() => onProjectSelect(project)}
        className="relative aspect-[16/10] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer group transition-all duration-300 hover:shadow-md"
      >
        <img
          key={currentImage}
          src={currentImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Hover hint */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="px-3 py-1.5 bg-white/95 text-black text-[11px] font-bold rounded-lg shadow-sm">
            Read Case Study →
          </span>
        </div>
      </div>

      {/* Project Header: Category & Subtle Platform Switch */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
        <span className="font-semibold uppercase tracking-wider text-[11px] text-gray-400">
          {project.category}
        </span>

        {project.platforms && project.platforms.length > 1 && (
          <div className="flex items-center space-x-2 text-xs">
            {project.platforms.map((plat, i) => (
              <React.Fragment key={plat}>
                {i > 0 && <span className="text-gray-300">·</span>}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePlatform(plat);
                  }}
                  className={`transition-colors ${
                    activePlatform === plat
                      ? "text-black font-bold underline underline-offset-4 decoration-2"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {plat}
                </button>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Title & Short Summary */}
      <div className="space-y-2">
        <h4
          onClick={() => onProjectSelect(project)}
          className="text-2xl font-bold text-black hover:text-gray-700 transition-colors cursor-pointer"
        >
          {project.title}
        </h4>

        <p className="text-sm text-gray-600 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Pipeline Flow */}
        {project.pipeline && (
          <div className="pt-1">
            <div className="inline-block font-mono text-[11px] text-gray-600 bg-gray-50 border border-gray-200/70 px-2.5 py-1 rounded-md">
              {project.pipeline}
            </div>
          </div>
        )}

        {/* Concrete Engineering Problems Solved */}
        {project.engineeringHighlights && (
          <ul className="space-y-1 text-xs text-gray-500 pt-2">
            {project.engineeringHighlights.map((point, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tech Pills */}
      <div className="flex flex-wrap gap-1.5 pt-2">
        {project.technologies.slice(0, 5).map((tech, i) => (
          <span
            key={i}
            className="text-[10px] font-semibold text-gray-600 bg-gray-100/70 px-2.5 py-1 rounded-md"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex items-center justify-between border-t border-gray-100">
        <button
          onClick={() => onProjectSelect(project)}
          className="text-xs font-bold text-black hover:text-gray-600 transition-colors flex items-center space-x-1 group/btn py-1"
        >
          <span>View case study</span>
          <span className="transform group-hover/btn:translate-x-0.5 transition-transform">
            →
          </span>
        </button>

        <div className="flex items-center space-x-3 text-xs text-gray-400">
          {project.links?.huggingFace && (
            <a
              href={project.links.huggingFace}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black font-semibold text-gray-700 transition-colors"
            >
              Hugging Face ↗
            </a>
          )}
          {project.links?.web && (
            <a
              href={project.links.web}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black font-medium transition-colors"
            >
              Web ↗
            </a>
          )}
          {project.links?.playStore && (
            <a
              href={project.links.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black font-medium transition-colors"
            >
              Play Store ↗
            </a>
          )}
          {project.links?.npm && (
            <a
              href={project.links.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black font-medium transition-colors"
            >
              npm ↗
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black font-medium transition-colors"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const SimpleProjects = ({ onProjectSelect }) => {
  const nylonProject = projectsData.find((p) => p.id === "nylon");
  const flagshipProjects = projectsData.filter((p) =>
    ["nylon-v1", "paypaxe", "noteiq", "nova", "openlaw"].includes(p.id)
  );
  const otherProjects = projectsData.filter((p) =>
    ["movieverse", "luckywho", "always-secure"].includes(p.id)
  );

  return (
    <section id="projects" className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400">
            Selected Work
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black">
            Foundational Systems &amp; Products
          </h2>
          <p className="text-base text-gray-500 max-w-xl">
            From pretrained foundation models and hardware-aligned tokenizers to production applications.
          </p>
        </div>

        {/* TECHNICAL REPORTS SHOWCASE */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">
                Peer-Grade Systems Papers
              </span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-black">
                Technical Reports
              </h3>
            </div>

            <Link
              to="/technical-reports"
              className="text-xs font-bold text-black hover:text-gray-600 transition-colors flex items-center space-x-1"
            >
              <span>Explore All Publications &amp; Checkpoints</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Report No. 02 (LATEST) */}
            <div className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all relative">
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 bg-black text-white text-[9px] font-mono font-bold uppercase tracking-wider rounded-md">
                  Latest Publication
                </span>
              </div>

              <div className="space-y-4 pt-1">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-2.5 py-0.5 bg-gray-100 text-black rounded text-[10px] font-mono font-bold uppercase tracking-wider">
                    Report No. 02
                  </span>
                  <span className="text-gray-400 font-mono text-[11px]">October 2026</span>
                </div>

                <div className="space-y-2">
                  <Link
                    to="/technical-reports/nylon-data-curation"
                    className="text-xl sm:text-2xl font-black text-black hover:text-gray-700 transition-colors tracking-tight leading-snug block"
                  >
                    Two-Stage Pretraining Data Curation: Forging 120B Foundation Intelligence &amp; Precision Annealing
                  </Link>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans line-clamp-3">
                    Decoupling foundation representation learning from specialist tool-calling under a Warmup-Stable-Decay cooldown with 15% replay anchors against catastrophic forgetting.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-700 rounded-md">120B Foundation</span>
                  <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-700 rounded-md">30B Anneal</span>
                  <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-700 rounded-md">15% Anchors</span>
                  <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-700 rounded-md">14 Pages</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <a
                  href="/files/Nylon_Data_Curation_Technical_Report.pdf"
                  download
                  className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center space-x-1.5"
                >
                  <Download size={13} />
                  <span>PDF (695 KB)</span>
                </a>

                <Link
                  to="/technical-reports/nylon-data-curation"
                  className="px-5 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all flex items-center space-x-1.5 shadow-xs"
                >
                  <span>Read Report</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Report No. 01 */}
            <div className="bg-gray-50/70 border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:border-gray-300 transition-all">
              <div className="space-y-4 pt-1">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-2.5 py-0.5 bg-gray-200 text-black rounded text-[10px] font-mono font-bold uppercase tracking-wider">
                    Report No. 01
                  </span>
                  <span className="text-gray-400 font-mono text-[11px]">September 2026</span>
                </div>

                <div className="space-y-2">
                  <Link
                    to="/technical-reports/nylon-tokenizer"
                    className="text-xl sm:text-2xl font-black text-black hover:text-gray-700 transition-colors tracking-tight leading-snug block"
                  >
                    Nylon-Tokenizer: Hardware-Aligned Byte-Level BPE with Domain-Aware Pretokenization
                  </Link>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans line-clamp-3">
                    Co-designing subword vocabularies strictly to V = 65,536 for native uint16 serialization, halving 120B pretraining token storage to 240 GB and doubling OS page cache density.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  <span className="px-2.5 py-1 bg-white border border-gray-200 text-gray-700 rounded-md">V = 65,536</span>
                  <span className="px-2.5 py-1 bg-white border border-gray-200 text-gray-700 rounded-md">uint16 Shards</span>
                  <span className="px-2.5 py-1 bg-white border border-gray-200 text-gray-700 rounded-md">50% Saved</span>
                  <span className="px-2.5 py-1 bg-white border border-gray-200 text-gray-700 rounded-md">18 Pages</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between gap-3">
                <a
                  href="/files/Nylon_Tokenizer_Technical_Report.pdf"
                  download
                  className="px-3.5 py-2 bg-white hover:bg-gray-100 text-black border border-gray-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center space-x-1.5"
                >
                  <Download size={13} />
                  <span>PDF (707 KB)</span>
                </a>

                <Link
                  to="/technical-reports/nylon-tokenizer"
                  className="px-5 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all flex items-center space-x-1.5 shadow-xs"
                >
                  <span>Read Report</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Flagship Products Grid */}
        <div className="space-y-8 pt-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-black">
              Production Products & Applications
            </h3>
            <p className="text-xs text-gray-400">
              Cross-platform mobile applications, fintech engines, and autonomous systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-14">
            {flagshipProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onProjectSelect={onProjectSelect}
              />
            ))}
          </div>
        </div>

        {/* OTHER PROJECTS Section */}
        <div className="pt-16 border-t border-gray-100 space-y-8">
          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight text-black">
              Other Selected Projects
            </h3>
            <p className="text-xs text-gray-400">
              Specialized engines, cryptographic tools, and backend ledger systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((item) => (
              <div
                key={item.id}
                onClick={() => onProjectSelect(item)}
                className="p-5 bg-gray-50/70 border border-gray-100 rounded-xl space-y-3 cursor-pointer hover:border-gray-300 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400 group-hover:text-black transition-colors">
                      →
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-black group-hover:text-gray-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-200/50">
                  {item.technologies.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-semibold text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleProjects;
