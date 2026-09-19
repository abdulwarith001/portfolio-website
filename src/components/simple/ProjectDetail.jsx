import React, { useEffect, useState } from "react";

const ProjectDetail = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState(() => {
    return project?.platforms && project.platforms.includes("Web")
      ? "Web"
      : project?.platforms?.[0] || "Default";
  });
  const [copiedCmd, setCopiedCmd] = useState(false);

  const copyOllama = () => {
    if (project?.ollamaCmd) {
      navigator.clipboard.writeText(project.ollamaCmd);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) return null;

  const currentImage = project.images
    ? (activeTab === "Mobile" ? project.images.mobile : project.images.web) ||
      project.image
    : project.image;

  return (
    <div className="min-h-screen bg-white text-black animate-fade-in relative">
      {/* Sticky Navigation Bar */}
      <div className="sticky top-0 z-50 px-6 py-4 md:px-12 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between">
        <button
          onClick={onClose}
          className="group flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-200/80 rounded-xl text-black hover:bg-black hover:text-white transition-all text-xs font-semibold"
          aria-label="Back to Overview"
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
          <span>Back to Overview</span>
        </button>

        <div className="hidden md:flex items-center space-x-3 text-xs text-gray-400">
          <span className="font-semibold uppercase tracking-wider">{project.category}</span>
          <span>/</span>
          <span className="text-black font-bold">{project.title}</span>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-12">
        {/* Header Block */}
        <div className="space-y-6 border-b border-gray-100 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-black">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* Direct Links */}
            <div className="flex flex-wrap gap-2.5">
              {project.links?.huggingFace && (
                <a
                  href={project.links.huggingFace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all flex items-center space-x-1.5 shadow-sm"
                >
                  <span>Hugging Face</span>
                  <span>↗</span>
                </a>
              )}
              {project.links?.web && (
                <a
                  href={project.links.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all flex items-center space-x-1.5"
                >
                  <span>Visit Web</span>
                  <span>↗</span>
                </a>
              )}
              {project.links?.playStore && (
                <a
                  href={project.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all flex items-center space-x-1.5"
                >
                  <span>Google Play</span>
                  <span>↗</span>
                </a>
              )}
              {project.links?.npm && (
                <a
                  href={project.links.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-gray-100 text-black border border-gray-200 text-xs font-bold uppercase tracking-wider rounded-xl hover:border-black transition-all flex items-center space-x-1.5"
                >
                  <span>npm Package</span>
                  <span>↗</span>
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-white text-black border border-gray-200 text-xs font-bold uppercase tracking-wider rounded-xl hover:border-black transition-all flex items-center space-x-1.5"
                >
                  <span>GitHub</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Architecture Pipeline Banner */}
          {project.pipeline && (
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                Architecture Pipeline
              </span>
              <div className="inline-block font-mono text-xs text-gray-800 bg-gray-50 border border-gray-200 px-3.5 py-2 rounded-lg">
                {project.pipeline}
              </div>
            </div>
          )}

          {/* Interactive Ollama Run Box */}
          {project.ollamaCmd && (
            <div className="pt-2">
              <div className="bg-black text-white border border-gray-800 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block font-semibold">
                    Run locally with Ollama
                  </span>
                  <code className="font-mono text-xs md:text-sm text-emerald-400 font-bold block">
                    {project.ollamaCmd}
                  </code>
                </div>
                <button
                  onClick={copyOllama}
                  className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center space-x-1.5 shrink-0 active:scale-95"
                >
                  <span>{copiedCmd ? "Copied! ✓" : "Copy Command"}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Narrative & Technical Execution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-8 space-y-8">
            {project.engineeringHighlights && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Engineering Highlights
                </h3>
                <ul className="space-y-2.5">
                  {project.engineeringHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start space-x-3 text-base text-gray-800 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Detailed Implementation
              </h3>
              <ul className="space-y-4">
                {(Array.isArray(project.whatWasDone) ? project.whatWasDone : [project.whatWasDone]).map(
                  (point, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm md:text-base text-gray-600 leading-relaxed">
                      <span className="text-gray-300 mt-0.5 shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Full Training Stages Breakdown */}
            {project.trainingStages && (
              <div className="space-y-5 pt-6 border-t border-gray-100">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Training Stages &amp; Empirical Telemetry
                  </h3>
                  <p className="text-xs text-gray-500">
                    Verified training metrics across pretraining, supervised fine-tuning, and direct preference optimization.
                  </p>
                </div>

                <div className="space-y-4">
                  {project.trainingStages.map((stg, i) => (
                    <div
                      key={i}
                      className="p-5 bg-gray-50/80 border border-gray-200/80 rounded-2xl space-y-3.5 shadow-2xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-3">
                        <span className="text-base font-bold text-black tracking-tight">
                          {stg.stage}
                        </span>
                        <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-md">
                          {stg.budget}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="space-y-0.5">
                          <span className="text-gray-400 block font-mono text-[10px] uppercase">Data / Tokens</span>
                          <span className="font-semibold text-gray-900">{stg.tokens}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-gray-400 block font-mono text-[10px] uppercase">Hardware Rig</span>
                          <span className="font-semibold text-gray-900">{stg.hardware}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-gray-400 block font-mono text-[10px] uppercase">Duration &amp; Throughput</span>
                          <span className="font-semibold text-gray-900">{stg.duration} · {stg.throughput}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-gray-400 block font-mono text-[10px] uppercase">Optimization Loop</span>
                          <span className="font-semibold text-gray-900">{stg.optimization}</span>
                        </div>
                      </div>

                      <div className="pt-2.5 border-t border-gray-200/50">
                        <span className="text-gray-400 block font-mono text-[10px] uppercase mb-0.5">Verified Empirical Results</span>
                        <span className="font-mono text-xs font-bold text-gray-950 bg-white border border-gray-200/60 px-2.5 py-1 rounded inline-block">
                          {stg.results}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold text-gray-700 bg-white border border-gray-200/80 px-2.5 py-1 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200/60 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Category
                </span>
                <span className="text-xs font-bold text-gray-900">
                  {project.category}
                </span>
              </div>

              {project.parameters && (
                <div className="pt-3 border-t border-gray-200/60 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Parameters
                  </span>
                  <span className="text-xs font-bold text-gray-900 font-mono">
                    {project.parameters}
                  </span>
                </div>
              )}

              {project.contextLength && (
                <div className="pt-3 border-t border-gray-200/60 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Context Window
                  </span>
                  <span className="text-xs font-bold text-gray-900 font-mono">
                    {project.contextLength}
                  </span>
                </div>
              )}

              {project.computeCost && (
                <div className="pt-3 border-t border-gray-200/60 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Compute Budget
                  </span>
                  <span className="text-xs font-bold text-emerald-600 font-mono">
                    {project.computeCost}
                  </span>
                </div>
              )}
            </div>

            {/* Dedicated Architecture Specs Sidebar */}
            {project.architectureSpecs && (
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Architecture Specifications
                </span>
                <div className="space-y-2 text-xs">
                  {Object.entries(project.architectureSpecs).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between border-b border-gray-200/50 pb-1.5 last:border-0 last:pb-0"
                    >
                      <span className="text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                      </span>
                      <span className="font-mono font-bold text-gray-900 text-right text-[11px]">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Media Preview Section */}
        <div className="space-y-4 pt-8">
          {project.platforms && project.platforms.length > 1 && (
            <div className="flex items-center space-x-3 text-xs font-semibold">
              <span className="text-gray-400">View Platform:</span>
              {project.platforms.map((plat, i) => (
                <React.Fragment key={plat}>
                  {i > 0 && <span className="text-gray-300">·</span>}
                  <button
                    type="button"
                    onClick={() => setActiveTab(plat)}
                    className={`transition-colors ${
                      activeTab === plat
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

          <div className="w-full aspect-[16/10] md:aspect-[2/1] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
            <img
              key={currentImage}
              src={currentImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Return CTA */}
        <div className="pt-12 text-center border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all"
          >
            ← Back to all projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
