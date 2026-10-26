import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Download, FileDown, Copy, Check, ShieldCheck, Flame, Cpu, BookOpen, Layers } from "lucide-react";
import SEO from "../common/SEO";

const SECTIONS = [
  { id: "abstract", label: "Abstract" },
  { id: "introduction", label: "1. Two-Stage Philosophy" },
  { id: "yaml-engine", label: "2. Declarative Data Architecture" },
  { id: "stage1-foundation", label: "3. Stage 1: Foundation (120B)" },
  { id: "curation-pipeline", label: "4. 8-Stage Verification Engine" },
  { id: "stage2-annealing", label: "5. Stage 2: Specialist Annealing" },
  { id: "replay-anchors", label: "6. 15% Replay Anchor Defense" },
  { id: "optimization-codesign", label: "7. Optimization Co-Design" },
  { id: "sharding-telemetry", label: "8. Sharding & Systems Telemetry" },
  { id: "conclusion", label: "9. Conclusion" },
  { id: "references", label: "References" }
];

const DataCurationPaperPage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("abstract");
  const [readingProgress, setReadingProgress] = useState(0);

  const bibtex = `@article{abdulwarith2026nyloncuration,
  title={Two-Stage Pretraining Data Curation: Forging 120B-Token Foundation Intelligence and Precision Annealing for Compact Language Models},
  author={Abdulwarith, Abdulwahab},
  journal={Enigmare AI Research Technical Report No. 02},
  year={2026},
  url={https://www.enigmare.xyz/technical-reports/nylon-data-curation}
}`;

  const copyBibtex = () => {
    navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const observerCallback = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveSection(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-90px 0px -60% 0px",
      threshold: [0, 0.2, 0.5]
    });

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <SEO
        title="Two-Stage Pretraining Data Curation: Technical Report No. 02 | Abdulwarith"
        description="Forging 120B-Token Foundation Intelligence and Precision Annealing for Compact Language Models. Co-designing data and optimization with 15% replay anchors."
        url="https://www.enigmare.xyz/technical-reports/nylon-data-curation"
        image="https://www.enigmare.xyz/images/og-preview.png"
        type="article"
      />

      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-black z-[60] transition-all duration-75"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 h-16 z-50 px-6 bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4 md:space-x-6">
          <Link
            to="/technical-reports"
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
            <span>Technical Reports</span>
          </Link>

          <span className="text-gray-300">/</span>

          <span className="text-xs font-mono text-gray-400 truncate max-w-[200px] md:max-w-none">
            Report No. 02 · Data Curation & Annealing
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="/files/Nylon_Data_Curation_Technical_Report.pdf"
            download="Nylon_Data_Curation_Technical_Report.pdf"
            className="px-3.5 py-1.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all flex items-center space-x-1.5 shadow-sm active:scale-95"
          >
            <Download size={13} />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Sticky Table of Contents (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 space-y-6">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400">
              Table of Contents
            </div>
            <nav className="space-y-1 text-xs">
              {SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => scrollToSection(e, sec.id)}
                    className={`block py-1.5 px-3 rounded-lg transition-colors font-medium ${
                      isActive
                        ? "bg-black text-white font-semibold"
                        : "text-gray-600 hover:text-black hover:bg-gray-50"
                    }`}
                  >
                    {sec.label}
                  </a>
                );
              })}
            </nav>

            {/* Quick Metrics Badge Card */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 font-mono text-[11px]">
              <div className="text-gray-400 uppercase tracking-wider text-[10px] font-bold">
                Curation Telemetry
              </div>
              <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                <span className="text-gray-500">Stage 1:</span>
                <span className="font-bold text-black">120B Tokens</span>
              </div>
              <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                <span className="text-gray-500">Stage 2:</span>
                <span className="font-bold text-black">30B Tokens</span>
              </div>
              <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                <span className="text-gray-500">Replay Anchor:</span>
                <span className="font-bold text-black">15.0%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Deduplication:</span>
                <span className="font-bold text-black">128-Perm MinHash</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Paper Content Body */}
        <main className="lg:col-span-9 max-w-3xl space-y-14 text-gray-800 leading-relaxed font-serif">
          {/* Paper Header */}
          <header className="space-y-6 font-sans border-b border-gray-100 pb-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-black text-white rounded-md text-[11px] font-mono font-semibold">
              <span>Enigmare AI Research</span>
              <span>·</span>
              <span>Technical Report No. 02</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-black leading-tight font-sans">
              Two-Stage Pretraining Data Curation: Forging 120B-Token Foundation Intelligence and Precision Annealing for Compact Language Models
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed font-sans">
              Co-designing high-density data ingestion with Warmup-Stable-Decay optimization and an invariant 15% replay anchor defense against catastrophic forgetting.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-500 border-t border-gray-100 pt-4">
              <div>
                <span className="font-bold text-black">Abdulwahab Abdulwarith</span>
                <span className="text-gray-400"> — Enigmare AI Research</span>
              </div>
              <div>Published: October 2026</div>
            </div>
          </header>

          {/* Section: Abstract */}
          <section id="abstract" className="space-y-4">
            <h2 className="text-xl font-bold text-black font-sans tracking-tight">Abstract</h2>
            <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl text-sm leading-relaxed text-gray-700 italic">
              In compact autoregressive language models (≤ 1.5B parameters), representational capacity is a scarce, strictly bounded resource. Standard industrial pretraining treats data as a monolithic, single-pass web scrape where general language, code, conversations, and tool syntaxes are mixed haphazardly from step zero. We demonstrate that this naive paradigm severely impairs compact models by inducing premature representational collapse and catastrophic forgetting. We present the Nylon Two-Stage Pretraining Data Curation Architecture, decoupling pretraining into Stage 1 Foundation Forging across 120B high-density tokens and Stage 2 Specialist Annealing across 30B tokens with saturated tool-calling schemas, negative instruction constraints, and an invariant 15% Replay Anchor defense.
            </div>
          </section>

          {/* Section: 1. Introduction */}
          <section id="introduction" className="space-y-6">
            <h2 className="text-2xl font-black text-black font-sans tracking-tight border-b border-gray-100 pb-2">
              1. Introduction: The Two-Stage Pretraining Philosophy
            </h2>
            <p className="text-base">
              Modern frontier artificial intelligence research has spent hundreds of millions of dollars scaling parameter count to brute-force comprehension over noisy, uncurated internet scrapes. In trillion-parameter systems (N ≥ 405B), parameter overcapacity is vast enough that models can absorb noise, forum arguments, and arbitrary markup syntax without immediately degrading their core mathematical or coding logic.
            </p>
            <p className="text-base">
              However, in <strong>compact language models</strong> (N ≈ 500M – 1.5B parameters), parameter capacity is strictly bounded. When a compact model is trained on a monolithic mixture containing chat templates, tool markup (<code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">&lt;|tool_call|&gt;</code>), and conversational chit-chat from step zero, it encounters a catastrophic dilemma: <em>it wastes parameter capacity learning superficial formatting rules before it understands the underlying mechanisms of logic and reality.</em>
            </p>

            {/* Medical Analogy Highlight Card */}
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-4 font-sans">
              <div className="flex items-center space-x-2 text-xs font-bold text-black uppercase tracking-wider">
                <BookOpen size={16} />
                <span>The Intuitive Analogy: Medical School vs. Surgical Residency</span>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                <p>
                  <strong>The Naive Approach:</strong> If an 8-year-old child is placed inside an operating room on Day 1 and taught how to hold a scalpel, talk to patients, and fill out surgical consent forms, they do not become a genius surgeon. They become an actor mimicking surface gestures without understanding cellular biochemistry or anatomy.
                </p>
                <p>
                  <strong>The Nylon Approach:</strong> In Stage 1 (Medical School), the model spends 120 billion tokens acquiring pure foundational knowledge: mathematical derivations, polyglot syntax trees, physics, and world literature. Only in Stage 2 (Surgical Residency) is it flooded with surgical tools, strict operational constraints, and multi-turn patient consultations.
                </p>
              </div>
            </div>

            {/* Metallurgy Principle */}
            <div className="p-6 bg-black text-white rounded-2xl space-y-3 font-sans">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Flame size={16} />
                <span>The Metallurgical Principle: Why It Is Called "Annealing"</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                In physical metallurgy, <strong>annealing</strong> heats metal above its recrystallization point and then cools it at a controlled, gradual rate to relieve internal stresses and lock into a hardened crystalline structure. In Nylon, Stage 1 maintains high optimization heat (constant peak LR 3e-4) to explore broad loss basins. Stage 2 gradually cools the learning rate (1.5e-4 ➔ 1e-5) under a fresh optimizer state, locking weights into precision tool-calling grooves without shattering general intelligence.
              </p>
            </div>
          </section>

          {/* Section: 2. Declarative Data Architecture */}
          <section id="yaml-engine" className="space-y-6">
            <h2 className="text-2xl font-black text-black font-sans tracking-tight border-b border-gray-100 pb-2">
              2. Declarative Data Architecture: The YAML Single Source of Truth
            </h2>
            <p className="text-base">
              Nylon eliminates pipeline divergence by establishing declarative YAML configurations as the single source of truth across ingestion, filtering, binary sharding, and distributed GPU execution.
            </p>

            <div className="bg-gray-950 text-gray-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto space-y-1">
              <div className="text-gray-400"># config/yaml/stage1/data_pipeline.yaml (Excerpt)</div>
              <div>corpus:</div>
              <div className="pl-4">name: "stage1_foundation_120b"</div>
              <div className="pl-4">target_tokens: 120000000000 <span className="text-gray-500"># 120B tokens</span></div>
              <div className="pl-4">min_tokens_required: 108000000000 <span className="text-gray-500"># 90% floor</span></div>
              <div>quality_policy:</div>
              <div className="pl-4">never_pad_with_low_quality_data: true</div>
              <div className="pl-4">allow_underfill: true</div>
              <div>deduplication:</div>
              <div className="pl-4">exact_hash: true</div>
              <div className="pl-4">minhash_lsh: true</div>
              <div className="pl-4">minhash_threshold: 0.85</div>
              <div className="pl-4">num_perm: 128</div>
              <div>decontamination:</div>
              <div className="pl-4">n_gram_size: 13</div>
              <div className="pl-4">benchmark_sets: ["humaneval", "mbpp", "gsm8k"]</div>
            </div>

            <p className="text-base">
              The <strong>Never Pad Quality Policy</strong> ensures that if a high-quality dataset produces 112 billion verified tokens rather than 120 billion, training executes strictly on the verified 112 billion tokens rather than repeating samples or diluting the distribution with synthetic web noise.
            </p>
          </section>

          {/* Section: 3. Stage 1 Foundation */}
          <section id="stage1-foundation" className="space-y-6">
            <h2 className="text-2xl font-black text-black font-sans tracking-tight border-b border-gray-100 pb-2">
              3. Stage 1: Forging Foundation Intelligence (120B Tokens)
            </h2>
            <p className="text-base">
              Stage 1 distributes 120 billion tokens across 2,400 binary shards (50M tokens each) spanning six balanced knowledge pools:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-100 text-gray-800 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Pool</th>
                    <th className="p-3">Domain</th>
                    <th className="p-3">Volume</th>
                    <th className="p-3">Weight</th>
                    <th className="p-3">Key Sub-Sources</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-3 font-semibold">Pool 1</td>
                    <td className="p-3">Knowledge & Science</td>
                    <td className="p-3 font-mono">35.0B</td>
                    <td className="p-3 font-mono">29.17%</td>
                    <td className="p-3">FineWeb-Edu (score ≥ 4.0), Cosmopedia-v2</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Pool 2</td>
                    <td className="p-3">Polyglot Code & ASTs</td>
                    <td className="p-3 font-mono">35.0B</td>
                    <td className="p-3 font-mono">29.17%</td>
                    <td className="p-3">The Stack Dedup (Python 12B, TS 8B, JS 5B, SQL 5B, JSON 5B)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Pool 3</td>
                    <td className="p-3">Math & Proofs</td>
                    <td className="p-3 font-mono">20.0B</td>
                    <td className="p-3 font-mono">16.67%</td>
                    <td className="p-3">AutoMathText ArXiv (score ≥ 0.50), NuminaMath CoT</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Pool 4</td>
                    <td className="p-3">Conversational Foundations</td>
                    <td className="p-3 font-mono">20.0B</td>
                    <td className="p-3 font-mono">16.66%</td>
                    <td className="p-3">C4 RealNewsLike, FineWeb Technical Forums</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Pool 5</td>
                    <td className="p-3">Specs & Markdown</td>
                    <td className="p-3 font-mono">10.0B</td>
                    <td className="p-3 font-mono">8.33%</td>
                    <td className="p-3">Wikipedia EN, Repository Readmes & API Specs</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Pool 6</td>
                    <td className="p-3">Scientific Derivations</td>
                    <td className="p-3 font-mono">3.0B</td>
                    <td className="p-3 font-mono">2.50%</td>
                    <td className="p-3">Open-Web-Math Peer-Reviewed STEM Content</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: 4. 8-Stage Curation */}
          <section id="curation-pipeline" className="space-y-6">
            <h2 className="text-2xl font-black text-black font-sans tracking-tight border-b border-gray-100 pb-2">
              4. The 8-Stage Curation & Verification Pipeline
            </h2>
            <p className="text-base">
              Raw documents pass through eight deterministic verification stages before entering the training engine:
            </p>

            <div className="space-y-3 font-sans text-xs">
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start space-x-3">
                <span className="font-mono font-bold text-black px-2 py-0.5 bg-gray-200 rounded">1</span>
                <div>
                  <strong className="text-black">Document Normalization:</strong> Unicode NFKC, strip zero-width characters, quote normalization.
                </div>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start space-x-3">
                <span className="font-mono font-bold text-black px-2 py-0.5 bg-gray-200 rounded">2</span>
                <div>
                  <strong className="text-black">Domain Quality Filtering:</strong> Code AST validation, LaTeX math formatting preservation, edu score threshold ≥ 4.0.
                </div>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start space-x-3">
                <span className="font-mono font-bold text-black px-2 py-0.5 bg-gray-200 rounded">3</span>
                <div>
                  <strong className="text-black">Exact Deduplication:</strong> SHA-256 hexadecimal digest matching discarding exact duplicate documents.
                </div>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start space-x-3">
                <span className="font-mono font-bold text-black px-2 py-0.5 bg-gray-200 rounded">4</span>
                <div>
                  <strong className="text-black">MinHash Locality-Sensitive Hashing:</strong> 5-gram shingling across 128 permutation hashes with 16 bands of 8 rows, filtering near-duplicates at Jaccard similarity J ≥ 0.85.
                </div>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start space-x-3">
                <span className="font-mono font-bold text-black px-2 py-0.5 bg-gray-200 rounded">5</span>
                <div>
                  <strong className="text-black">13-Gram Benchmark Decontamination:</strong> Rolling 13-token window filter immediately quarantining any document with consecutive overlap on HumanEval, MBPP, or GSM8K.
                </div>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start space-x-3">
                <span className="font-mono font-bold text-black px-2 py-0.5 bg-gray-200 rounded">6</span>
                <div>
                  <strong className="text-black">Nylon-Tokenizer Encoding:</strong> Hardware-aligned byte-level BPE with single-digit isolation and greedy 8/4/2-space indentation compression.
                </div>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start space-x-3">
                <span className="font-mono font-bold text-black px-2 py-0.5 bg-gray-200 rounded">7</span>
                <div>
                  <strong className="text-black">Binary Sharding:</strong> Packs token arrays into uniform 50,000,000-token uint16 binary files (~100MB per chunk).
                </div>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start space-x-3">
                <span className="font-mono font-bold text-black px-2 py-0.5 bg-gray-200 rounded">8</span>
                <div>
                  <strong className="text-black">Corpus Manifest Generation:</strong> Emits corpus_manifest.json recording verified token distributions and shard counts.
                </div>
              </div>
            </div>
          </section>

          {/* Section: 5. Stage 2 Annealing */}
          <section id="stage2-annealing" className="space-y-6">
            <h2 className="text-2xl font-black text-black font-sans tracking-tight border-b border-gray-100 pb-2">
              5. Stage 2: Specialist Annealing (30B Tokens)
            </h2>
            <p className="text-base">
              Once the foundational model converges, Stage 2 shifts the data distribution into high-density operational tool schemas, negative instruction constraints, and multi-turn human dialogues.
            </p>
            <p className="text-base">
              Tool calling is embedded directly into base pretraining weights using native delimiters (<code className="text-xs bg-gray-100 px-1 py-0.5 rounded">&lt;|tool_call|&gt;</code> and <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">&lt;|tool_response|&gt;</code>). This trains the model to inherently understand parameter schemas, JSON invariants, and error handling before reaching post-training.
            </p>
          </section>

          {/* Section: 6. 15% Replay Anchors */}
          <section id="replay-anchors" className="space-y-6">
            <h2 className="text-2xl font-black text-black font-sans tracking-tight border-b border-gray-100 pb-2">
              6. The 15% Replay Anchor & Catastrophic Forgetting Defense
            </h2>
            <p className="text-base">
              When models are fine-tuned or annealed exclusively on conversational datasets, they suffer from <strong>Catastrophic Forgetting</strong>—their gradients overwrite the orthogonal parameter subspaces encoding mathematical proofs and code syntax.
            </p>

            <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl space-y-4 font-sans">
              <div className="flex items-center space-x-2 text-xs font-bold text-black uppercase tracking-wider">
                <ShieldCheck size={16} />
                <span>The Mathematical Replay Anchor Mixture</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                Nylon mathematically enforces that exactly 15.0% of the Stage 2 annealing mixture remains invariant foundational knowledge:
              </p>
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-xs font-mono space-y-1">
                <div>D_stage2 = 0.85 · D_specialist + 0.15 · D_anchor</div>
                <div className="text-gray-500 pt-1"># Anchor Partitioning:</div>
                <div>• The Stack Python/TypeScript/SQL: 7.0%</div>
                <div>• OpenWebMath STEM Derivations: 4.0%</div>
                <div>• FineWeb-Edu (Score ≥ 4.5): 4.0%</div>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                By projecting 15% of all annealing updates back along the foundational loss landscape, the expected gradient update guarantees bounded KL-divergence, allowing the model to master tools without losing mathematical rigor.
              </p>
            </div>
          </section>

          {/* Section: 7. Optimization Co-Design */}
          <section id="optimization-codesign" className="space-y-6">
            <h2 className="text-2xl font-black text-black font-sans tracking-tight border-b border-gray-100 pb-2">
              7. Optimization Co-Design: Bridging YAML to Training Schedules
            </h2>
            <p className="text-base">
              The data split maps directly to optimization schedules in <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">stage1/train.yaml</code> and <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">stage2/train.yaml</code>:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-100 text-gray-800 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Parameter</th>
                    <th className="p-3">Stage 1: Foundation</th>
                    <th className="p-3">Stage 2: Specialist Anneal</th>
                    <th className="p-3">Architectural Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-mono">
                  <tr>
                    <td className="p-3 font-semibold text-black">Target Tokens</td>
                    <td className="p-3">120.0 Billion</td>
                    <td className="p-3">7.43B – 30.0 Billion</td>
                    <td className="p-3 font-sans text-gray-600">Broad base vs. specialized saturation</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-black">Learning Rate</td>
                    <td className="p-3">3.0e-4 (Constant)</td>
                    <td className="p-3">1.5e-4 ➔ 1.0e-5</td>
                    <td className="p-3 font-sans text-gray-600">Thermodynamic plasticity vs. cooling</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-black">Scheduler</td>
                    <td className="p-3">WSD (Stable Phase)</td>
                    <td className="p-3">Continuous 1-Cosine</td>
                    <td className="p-3 font-sans text-gray-600">Stable exploration vs. smooth settling</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-black">Optimizer State</td>
                    <td className="p-3">Initialized Clean</td>
                    <td className="p-3">Fresh (weights_only: true)</td>
                    <td className="p-3 font-sans text-gray-600">Discards momentum to prevent gradient fighting</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-black">Batch Size</td>
                    <td className="p-3">2.1M Tokens/Step</td>
                    <td className="p-3">2.1M Tokens/Step</td>
                    <td className="p-3 font-sans text-gray-600">Strict invariant batch statistics</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: 8. Sharding & Systems Telemetry */}
          <section id="sharding-telemetry" className="space-y-6">
            <h2 className="text-2xl font-black text-black font-sans tracking-tight border-b border-gray-100 pb-2">
              8. Sharding & Systems Telemetry
            </h2>
            <p className="text-base">
              The output of the data curation pipeline is serialized into compact, memory-mapped <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">uint16</code> binary shards:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-xl font-bold text-black">65,536</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-sans">Vocab Size (uint16)</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-xl font-bold text-black">50M</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-sans">Tokens / Shard</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-xl font-bold text-black">100.0 MB</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-sans">Size Per .bin File</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-xl font-bold text-black">240.0 GB</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-sans">120B Token Footprint</div>
              </div>
            </div>
            <p className="text-base">
              Because token IDs are stored natively as 2-byte unsigned integers, 8× H100 GPU workers stream directly from the Linux page cache via <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">np.memmap</code> without copying datasets into host RAM, doubling resident memory density.
            </p>
          </section>

          {/* Section: 9. Conclusion */}
          <section id="conclusion" className="space-y-6">
            <h2 className="text-2xl font-black text-black font-sans tracking-tight border-b border-gray-100 pb-2">
              9. Conclusion
            </h2>
            <p className="text-base">
              Data curation is the primary architectural driver of compact language model performance. By replacing uncurated, single-pass web dumps with a co-designed Two-Stage Curation Protocol, Nylon AI provides an empirically grounded blueprint for training high-efficiency models that punch drastically above their parameter weight class.
            </p>
          </section>

          {/* BibTeX Citation Box */}
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-4 font-sans">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-black uppercase tracking-wider font-mono">
                Cite This Technical Report
              </span>
              <button
                onClick={copyBibtex}
                className="px-3 py-1 bg-white border border-gray-200 text-black text-xs font-medium rounded-lg hover:border-black transition-all flex items-center space-x-1.5 active:scale-95 shadow-sm"
              >
                {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
                <span>{copied ? "Copied!" : "Copy BibTeX"}</span>
              </button>
            </div>
            <pre className="text-[11px] font-mono text-gray-700 bg-white p-4 rounded-xl border border-gray-200 overflow-x-auto leading-relaxed">
              {bibtex}
            </pre>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DataCurationPaperPage;
