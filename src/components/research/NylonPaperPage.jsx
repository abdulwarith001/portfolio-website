import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lightbulb, Download, FileDown, Copy, Check } from "lucide-react";
import SEO from "../common/SEO";

const SECTIONS = [
  { id: "abstract", label: "Abstract" },
  { id: "introduction", label: "1. Introduction" },
  { id: "corpus-prep", label: "2. Corpus Prep & Provenance" },
  { id: "hardware-storage", label: "3. Hardware-Aligned Storage" },
  { id: "pretokenization", label: "4. Domain Pretokenization" },
  { id: "bpe-induction", label: "5. Affected-Sequence BPE" },
  { id: "evaluation", label: "6. Experimental Evaluation" },
  { id: "downstream", label: "7. Downstream Evaluation" },
  { id: "limitations", label: "8. Limitations" },
  { id: "conclusion", label: "9. Conclusion" },
  { id: "references", label: "References" }
];

const NylonPaperPage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("abstract");
  const [readingProgress, setReadingProgress] = useState(0);

  const bibtex = `@article{abdulwarith2026nylon,
  title={Nylon-Tokenizer: Hardware-Aligned Byte-Level BPE with Domain-Aware Pretokenization for Compact Language Models},
  author={Abdulwarith, Abdulwahab},
  journal={Enigmare AI Research},
  year={2026},
  url={https://www.enigmare.xyz/technical-reports/nylon-tokenizer}
}`;

  const copyBibtex = () => {
    navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Scrollspy via IntersectionObserver & reading progress
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
        title="Nylon-Tokenizer: Technical Report No. 01 | Abdulwarith"
        description="Hardware-aligned byte-level BPE with domain-aware pretokenization for compact language models. Native uint16 serialization at V = 65,536."
        url="https://www.enigmare.xyz/technical-reports/nylon-tokenizer"
        image="https://www.enigmare.xyz/images/og-nylon-tokenizer.png"
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
            <span>All Reports</span>
          </Link>

          <span className="hidden md:inline text-xs font-mono text-gray-400">
            Enigmare AI Research · Technical Report No. 01
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate("/")}
            className="hidden sm:inline-block text-xs font-semibold text-gray-500 hover:text-black transition-colors"
          >
            Portfolio
          </button>
          <a
            href="/files/Nylon_Tokenizer_Technical_Report.pdf"
            download="Nylon_Tokenizer_Technical_Report.pdf"
            className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all flex items-center space-x-1.5 shadow-sm"
          >
            <span>Download PDF (707 KB)</span>
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
      </header>

      {/* Mobile Quick Section Selector */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 px-6 py-2.5 bg-gray-50/95 backdrop-blur-md border-b border-gray-200 flex items-center justify-between text-xs">
        <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">
          Jump to:
        </span>
        <select
          value={activeSection}
          onChange={(e) => scrollToSection(e, e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-black"
        >
          {SECTIONS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <span className="text-[11px] font-mono text-gray-500">{Math.round(readingProgress)}% read</span>
      </div>

      {/* Fixed Left Sidebar (TOC) */}
      <aside className="hidden lg:block fixed top-16 left-0 bottom-0 w-72 xl:w-80 bg-white border-r border-gray-100 overflow-y-auto px-6 py-8 z-30 scrollbar-thin">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Table of Contents
              </span>
              <span className="text-[10px] font-mono text-gray-400">
                {Math.round(readingProgress)}% read
              </span>
            </div>
            <nav className="space-y-1 border-l-2 border-gray-100 pl-3">
              {SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => scrollToSection(e, sec.id)}
                    className={`block transition-all text-xs py-1.5 ${
                      isActive
                        ? "text-black font-bold -ml-[14px] pl-3 border-l-2 border-black"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {sec.label}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
              Paper Artifacts
            </span>
            <a
              href="/files/Nylon_Tokenizer_Technical_Report.pdf"
              download="Nylon_Tokenizer_Technical_Report.pdf"
              className="text-xs font-semibold text-black hover:underline flex items-center space-x-1.5"
            >
              <FileDown className="w-3.5 h-3.5 text-gray-700" />
              <span>Download Technical Report (PDF)</span>
            </a>
            <button
              onClick={copyBibtex}
              className="text-xs text-gray-500 hover:text-black flex items-center space-x-1.5 text-left transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Copied BibTeX</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-400" />
                  <span>Copy BibTeX Citation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Reading Container */}
      <div className="lg:pl-72 xl:pl-80 pt-28 lg:pt-20 min-h-screen">
        <article className="max-w-3xl mx-auto px-6 md:px-10 py-8 space-y-16 leading-relaxed">
          {/* Header Block */}
          <header className="space-y-4 border-b border-gray-100 pb-8">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-black leading-tight">
              Nylon-Tokenizer
            </h1>
            <p className="text-base md:text-lg text-gray-600 font-medium leading-normal">
              Hardware-Aligned Byte-Level BPE with Domain-Aware Pretokenization for Compact Language Models
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 text-sm text-gray-600">
              <div>
                <p className="font-bold text-black text-sm">Abdulwahab Abdulwarith</p>
                <p className="text-xs text-gray-500 font-mono">Enigmare AI Research · abdulwarith@noteiq.live</p>
              </div>
              <div className="text-left sm:text-right text-xs font-mono text-gray-400">
                <p>September 2026 · Target: Nylon 1.35B</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-3">
              <a
                href="/files/Nylon_Tokenizer_Technical_Report.pdf"
                download="Nylon_Tokenizer_Technical_Report.pdf"
                className="px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all flex items-center space-x-2 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF (707 KB)</span>
              </a>
              <button
                onClick={copyBibtex}
                className="px-5 py-2.5 bg-white text-black border border-gray-200 text-xs font-bold uppercase tracking-wider rounded-xl hover:border-black transition-all flex items-center space-x-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied BibTeX!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-500" />
                    <span>Copy BibTeX</span>
                  </>
                )}
              </button>
            </div>
          </header>

          {/* Abstract */}
          <section id="abstract" className="scroll-mt-24 space-y-6">
            <div className="bg-gray-50/80 border border-gray-200/80 p-6 md:p-8 rounded-2xl space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Abstract
              </h2>
              <p className="text-sm md:text-base text-gray-800 leading-relaxed font-serif">
                Subword tokenization is a foundational architectural interface in autoregressive language models, dictating the trade-off between sequence length, vocabulary embedding parameter volume, and pretraining data storage. We present <strong>Nylon-Tokenizer</strong>, an open byte-level Byte-Pair Encoding (BPE) system co-designed around the systems and workload constraints of compact language models (≤ 1.5B parameters). Nylon-Tokenizer combines four co-designed components:
              </p>
              <ol className="space-y-3 text-xs md:text-sm text-gray-700 list-decimal pl-5">
                <li>
                  <strong>Curated Multi-Domain Induction Corpus:</strong> Rather than relying on uncurated web dumps, subwords and merge rankings are learned from a balanced 501.2 MB corpus combining educational knowledge (40% FineWeb-Edu), multi-turn dialogue (25% UltraChat), mathematical derivations (15% Open-Web-Math), polyglot code across five languages (15% The Stack), and structured tool schemas (5% Glaive &amp; XLAM).
                </li>
                <li>
                  <strong>Hardware-Aligned Token Storage:</strong> By sizing the vocabulary strictly to <em>V = 2<sup>16</sup> = 65,536</em> with token IDs indexed as <em>0 ... 65,535</em>, pretraining token streams serialize natively as 2-byte unsigned integers (<code>uint16</code>). On memory-mapped disk shards, this halves the token-array storage footprint from 4 bytes/token (<code>uint32</code>) to 2 bytes/token, saving 240 GB across our 120-billion-token dataset and doubling operating system page-cache token density.
                </li>
                <li>
                  <strong>Domain-Aware Pretokenization:</strong> Prior to BPE merge induction, we enforce explicit boundary constraints: atomic single-digit isolation (<code>\d</code>) to preserve decimal place structure; greedy longest-match indentation runs (8, 4, and 2 spaces) that compress structured code up to 8.0x; polyglot multi-character operator preservation; and Unicode NFC normalization for African orthographies (Yoruba, Hausa, Igbo).
                </li>
                <li>
                  <strong>Affected-Sequence BPE Induction:</strong> We formulate pair-frequency tracking using an inverted pair-to-sequence index, bounding merge updates to <em>O(∑<sub>m</sub> ∑<sub>w ∈ A_m</sub> L_w)</em>, completing all 65,266 merges across 501.2 MB of text in 52.79 seconds on an Apple M1 workstation.
                </li>
              </ol>
            </div>

            {/* In Simple Terms Callout Box */}
            <div className="p-5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-2 text-xs md:text-sm text-emerald-950">
              <span className="font-bold uppercase tracking-wider text-[11px] text-emerald-800 flex items-center space-x-2">
                <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Core Engineering Insight (In Plain English)</span>
              </span>
              <p className="leading-relaxed">
                In models under 1.5 billion parameters, standard 128,000-word dictionaries (like LLaMA-3) allocate over 260M parameters just to token lookup tables and force computers to use heavy 4-byte numbers for every token. By capping vocabulary strictly at <strong>65,536</strong>, every token ID fits into a lightweight 2-byte integer (<code>uint16</code>). This cuts our 120-billion-token dataset from <strong>480 GB down to 240 GB</strong>, doubles token-ID density in memory-mapped storage and page cache, and reclaims <strong>128.45M parameters</strong> from the embedding matrix for hidden transformer blocks (attention and feed-forward layers) under a fixed 1.35B model envelope.
              </p>
            </div>
          </section>

          {/* Section 1: Introduction */}
          <section id="introduction" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black border-b border-gray-100 pb-3">
              1. Introduction
            </h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              Autoregressive language models define probability distributions over a discrete vocabulary <em>V</em>:
            </p>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center font-mono text-sm md:text-base text-gray-900">
              P(X) = ∏<sub>t=1</sub><sup>T</sup> P(x<sub>t</sub> | x<sub>&lt;t</sub>; θ), &nbsp;&nbsp; x<sub>t</sub> ∈ V
            </div>

            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              where continuous UTF-8 byte streams are segmented into discrete tokens by an encoder <em>T: Σ* → V*</em>. While general-purpose tokenizers (e.g., SentencePiece, Tiktoken) provide broad linguistic coverage, subword tokenizers are rarely co-designed with the underlying pretraining storage representations or the workload constraints of compact models (<em>N ≈ 500M – 1.5B</em> parameters).
            </p>

            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              In frontier models with 70 billion or 405 billion parameters and hidden dimensions <em>d ≥ 8192</em>, scaling vocabulary to 128,000 carries negligible relative overhead. However, in <strong>compact language models</strong>, tokenization choices carry outsized operational and empirical implications:
            </p>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="p-4 border border-gray-200 rounded-xl space-y-1.5">
                <h4 className="font-bold text-black text-sm">Embedding Parameter Overhead</h4>
                <p className="text-xs md:text-sm text-gray-600">
                  In compact architectures, the embedding layer constitutes a substantial fraction of total parameters. For a vocabulary embedding matrix with hidden dimension <em>d = 2048</em>, scaling vocabulary from <em>V = 32,000</em> to <em>V = 128,256</em> expands the matrix from 65.5M to 262.7M parameters. With untied input embeddings and output projection layers, this consumes up to <strong>35% of the total parameter budget</strong> in a 1.5B model on token lookup tables alone, consuming parameters that could otherwise be allocated to hidden feed-forward and self-attention transformer blocks, reducing structural representational depth under a fixed 1.35B model envelope.
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-xl space-y-1.5">
                <h4 className="font-bold text-black text-sm">Storage Footprint &amp; Page-Cache Density</h4>
                <p className="text-xs md:text-sm text-gray-600">
                  Large-scale pretraining streams hundreds of billions of tokens from persistent storage via operating system memory mapping (<code>mmap</code>). Representing token IDs with wider integer representations than mathematically required wastes hundreds of gigabytes of disk space and reduces the density of tokens held in host RAM.
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-xl space-y-1.5">
                <h4 className="font-bold text-black text-sm">Structural Context Consumption</h4>
                <p className="text-xs md:text-sm text-gray-600">
                  In indentation-sensitive programming languages (Python, YAML) and mathematical derivations, whitespace runs consume context slots. Tokenizing spaces as individual units rapidly exhausts the model&apos;s finite context length <em>T<sub>ctx</sub></em>, reducing the effective sequence capacity available for reasoning.
                </p>
              </div>
            </div>

            {/* Central Hypothesis & 3-Tier Validation Framework */}
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-black uppercase tracking-wider">
                1.1 Central Research Hypothesis &amp; Validation Framework
              </h3>
              <blockquote className="text-xs md:text-sm text-gray-800 italic border-l-2 border-black pl-3 py-0.5">
                &ldquo;For compact language models, tokenizer design should be optimized jointly for representation density, workload structure, and training-system constraints rather than vocabulary compression alone.&rdquo;
              </blockquote>
              <p className="text-xs text-gray-600">
                We evaluate this hypothesis across three progressive tiers of empirical evidence:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
                  <span className="font-bold text-black block">1. Storage &amp; Host I/O</span>
                  <span className="text-[11px] text-emerald-700 font-semibold block">Empirically Demonstrated</span>
                  <p className="text-gray-500 text-[11px]">
                    <em>V=65,536</em> cuts disk shard footprint by 50% via native <code>uint16</code>, doubling page-cache token residency (Section 3).
                  </p>
                </div>
                <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
                  <span className="font-bold text-black block">2. Representation Density</span>
                  <span className="text-[11px] text-emerald-700 font-semibold block">Empirically Demonstrated</span>
                  <p className="text-gray-500 text-[11px]">
                    Ablations prove domain pretokenization preserves up to +16.5% BPT on multilingual text and +15.0% BPT on code (Section 6).
                  </p>
                </div>
                <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
                  <span className="font-bold text-black block">3. Downstream Model Impact</span>
                  <span className="text-[11px] text-amber-700 font-semibold block">Falsifiable Pretraining Protocol</span>
                  <p className="text-gray-500 text-[11px]">
                    Controlled 1.35B pretraining protocol isolating tokenizer rules as the single independent variable (Section 7).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Corpus Preparation & Provenance */}
          <section id="corpus-prep" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black border-b border-gray-100 pb-3">
              2. Tokenizer Corpus Preparation &amp; Data Provenance
            </h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              In data-driven subword tokenization, the distribution of learned subwords and merge priorities is directly determined by the composition of the training corpus. Tokenizers trained solely on natural language web text learn poor subword representations for programming structures, JSON keys, and mathematical symbols, resulting in severe token fragmentation in downstream technical tasks.
            </p>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              To ensure balanced representation across natural language, code, mathematics, and agentic workflows, Nylon-Tokenizer was trained on a strictly curated <strong>501.2 MB uncompressed UTF-8 corpus</strong> (5,170,984 lines) adhering to a deterministic domain quota recipe.
            </p>

            {/* Domain Quota Table */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-black">
                2.1 Multi-Domain Quota Composition
              </h3>
              <div className="border border-gray-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Domain</th>
                      <th className="py-2.5 px-3">Quota</th>
                      <th className="py-2.5 px-3">Volume</th>
                      <th className="py-2.5 px-3">Primary Source</th>
                      <th className="py-2.5 px-3">Target Capability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-black">Educational Knowledge</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">40%</td>
                      <td className="py-2.5 px-3">200.0 MB</td>
                      <td className="py-2.5 px-3"><code>fineweb-edu (10BT)</code></td>
                      <td className="py-2.5 px-3">Reasoning, science, textbook prose</td>
                    </tr>
                    <tr className="bg-gray-50/50">
                      <td className="py-2.5 px-3 font-semibold text-black">Dialogue &amp; Instructions</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">25%</td>
                      <td className="py-2.5 px-3">125.0 MB</td>
                      <td className="py-2.5 px-3"><code>ultrachat_200k</code></td>
                      <td className="py-2.5 px-3">Multi-turn dialogue, user/assistant turns</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-black">Mathematical Reasoning</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">15%</td>
                      <td className="py-2.5 px-3">75.0 MB</td>
                      <td className="py-2.5 px-3"><code>open-web-math</code></td>
                      <td className="py-2.5 px-3">LaTeX proofs, operators, formulas</td>
                    </tr>
                    <tr className="bg-gray-50/50">
                      <td className="py-2.5 px-3 font-semibold text-black">Polyglot Source Code</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">15%</td>
                      <td className="py-2.5 px-3">75.0 MB</td>
                      <td className="py-2.5 px-3"><code>the-stack-dedup</code></td>
                      <td className="py-2.5 px-3">Indentation, AST syntax, operators</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-black">Tool Calling &amp; Schemas</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">5%</td>
                      <td className="py-2.5 px-3">25.0 MB</td>
                      <td className="py-2.5 px-3"><code>glaive / xlam-60k</code></td>
                      <td className="py-2.5 px-3">Function calling, JSON schema tokens</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Code Language Distribution */}
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-bold text-black">
                2.2 Polyglot Code Language Distribution (15% Split)
              </h3>
              <p className="text-xs text-gray-600">
                Within the 75.0 MB code quota, data was stratified across five ecosystems to balance whitespace and syntax primitives:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs text-center">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="font-bold text-black block">Python</span>
                  <span className="text-emerald-700 font-bold">40%</span>
                  <span className="text-[10px] text-gray-400 block">Indentation / Colons</span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="font-bold text-black block">TypeScript</span>
                  <span className="text-emerald-700 font-bold">25%</span>
                  <span className="text-[10px] text-gray-400 block">Types / Interfaces</span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="font-bold text-black block">JavaScript</span>
                  <span className="text-emerald-700 font-bold">15%</span>
                  <span className="text-[10px] text-gray-400 block">Async / Objects</span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="font-bold text-black block">SQL</span>
                  <span className="text-emerald-700 font-bold">10%</span>
                  <span className="text-[10px] text-gray-400 block">Relational Queries</span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="font-bold text-black block">Bash</span>
                  <span className="text-emerald-700 font-bold">10%</span>
                  <span className="text-[10px] text-gray-400 block">CLI Flags / Pipes</span>
                </div>
              </div>
            </div>

            {/* Normalization & Filtering */}
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-bold text-black">
                2.3 Normalization, Quality Filters &amp; Seeded Shuffling
              </h3>
              <ul className="space-y-2 text-xs md:text-sm text-gray-700 pl-4 border-l-2 border-gray-200">
                <li>
                  <strong>Domain-Specific Normalization:</strong> Code, math, and tool calling use Unicode Normalization Form C (NFC) to preserve exact mathematical symbols and operator glyphs. Natural language prose uses NFKC.
                </li>
                <li>
                  <strong>Exact Deduplication:</strong> Identical documents were purged across splits to prevent high-frequency boilerplate from skewing BPE merge priorities.
                </li>
                <li>
                  <strong>Quality Heuristics:</strong> Discarded documents with repetition ratio &gt; 0.20 (boilerplate spam) or character length &lt; 50 (truncated fragments).
                </li>
                <li>
                  <strong>Deterministic Shuffling:</strong> Shuffled with fixed random seed (<code>seed: 42</code>) to ensure the BPE trainer encounters an even mix of all domains from merge 1 through 65,266.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Hardware-Aligned Token Storage */}
          <section id="hardware-storage" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black border-b border-gray-100 pb-3">
              3. Hardware-Aligned Token Storage
            </h2>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-black">
                3.1 The V = 65,536 Storage Boundary
              </h3>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                In distributed pretraining pipelines (e.g., Megatron-LM, NanoGPT, and Nylon), tokenized datasets are serialized into binary flat files containing contiguous arrays of integer token IDs. The integer data type required to represent any <em>t ∈ V</em> on disk is determined strictly by the maximum token ID:
              </p>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center font-mono text-xs md:text-sm text-gray-900">
                dtype(V) = &#123; uint16 if max(t) ≤ 65,535 ⟺ V ≤ 65,536; uint32 if max(t) &gt; 65,535 ⟺ V &gt; 65,536 &#125;
              </div>

              {/* ASCII Diagram */}
              <pre className="bg-gray-950 text-gray-200 p-5 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed shadow-sm">
{`                   STORAGE FORMAT PER TOKEN ON DISK
 ┌───────────────────────────────────────────────────────────────┐
 │ uint32 Format (V > 65,536): 4 Bytes per Token ID              │
 │ [ Byte 0 ][ Byte 1 ][ 0x00 ][ 0x00 ] (16 bits unused for IDs) │
 ├───────────────────────────────────────────────────────────────┤
 │ uint16 Format (V = 65,536): 2 Bytes per Token ID              │
 │ [ Byte 0 ][ Byte 1 ]                 (100% capacity utilized) │
 └───────────────────────────────────────────────────────────────┘`}
              </pre>

              {/* Intuitive Systems Explanation */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2 text-xs md:text-sm text-gray-700">
                <span className="font-bold text-black text-xs uppercase tracking-wider block">
                  The Hardware Reality Behind the Integer Boundary
                </span>
                <p>
                  Computers store integers in fixed widths: 1 byte (up to 255), 2 bytes (up to 65,535), or 4 bytes (up to 4.2 billion). If a tokenizer exceeds 65,536 by even a single token (such as LLaMA-3 with 128,256 tokens), the system is forced to store <strong>every single token as a 4-byte integer (`uint32`)</strong>.
                </p>
                <p>
                  In a 4-byte integer representing a subword ID like <code>452</code>, the upper two bytes are empty zeroes (<code>0x00 0x00</code>). On a 120-billion-token dataset, writing these empty zeroes wastes <strong>240.0 Gigabytes of storage</strong> with zero linguistic benefit.
                </p>
              </div>

              {/* Storage Analysis Table */}
              <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">
                  Storage Footprint on 120-Billion-Token Pretraining Corpus
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-white border border-gray-200 rounded-lg">
                    <span className="text-xs text-gray-400 block">uint32 Baseline Storage</span>
                    <span className="text-xl font-black text-gray-900 font-mono">480.0 GB</span>
                    <span className="text-[11px] text-gray-500 block mt-1">120B tokens × 4 bytes</span>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <span className="text-xs text-emerald-600 font-semibold block">Nylon uint16 Storage</span>
                    <span className="text-xl font-black text-emerald-700 font-mono">240.0 GB (-50%)</span>
                    <span className="text-[11px] text-emerald-600 block mt-1">120B tokens × 2 bytes</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 leading-relaxed pt-1 space-y-2">
                  <p>
                    <strong>Storage Representation vs. GPU Forward Pass:</strong> In PyTorch dataloaders, token IDs read from <code>mmap</code> arrays are cast to <code>torch.int64</code> tensors before embedding lookup. Therefore, the systems efficiency of <em>V = 65,536</em> is realized in <strong>halving persistent disk storage, doubling OS page-cache token density, and reducing host inter-process memory bandwidth</strong>, rather than altering GPU matrix multiplication.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-black">
                3.2 Vocabulary Structure &amp; Byte Fallback
              </h3>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                The vocabulary <em>V</em> is partitioned into three contiguous, non-overlapping index ranges:
              </p>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center font-mono text-xs md:text-sm text-gray-900">
                V = V<sub>special</sub> ∪ V<sub>base</sub> ∪ V<sub>subword</sub><br />
                where |V<sub>special</sub>| = 14, |V<sub>base</sub>| = 256, |V<sub>subword</sub>| = 65,266
              </div>

              <ul className="space-y-2 text-xs md:text-sm text-gray-700 pl-4 border-l-2 border-gray-200">
                <li>
                  <strong>Special Control Tokens (IDs 0 ... 13):</strong> Reserved for structural prompts (<code>&lt;|im_start|&gt;</code>, <code>&lt;|im_end|&gt;</code>), reasoning trace bounds (<code>&lt;think&gt;</code>, <code>&lt;/think&gt;</code>), and tool interfaces (<code>&lt;|tool_call|&gt;</code>).
                </li>
                <li>
                  <strong>Base Octet Vocabulary (IDs 14 ... 269):</strong> Direct identity mapping for all raw byte values <code>b ∈ [0x00, 0xFF]</code>.
                </li>
                <li>
                  <strong>Learned Subwords (IDs 270 ... 65,535):</strong> 65,266 subword tokens induced via BPE merges.
                </li>
                <li>
                  <strong>Byte Fallback Guarantee:</strong> Because every raw byte value 0 ... 255 is permanently assigned an explicit token ID, any arbitrary byte stream can be encoded as base-byte tokens when no learned subword applies. The tokenizer exhibits zero out-of-vocabulary (OOV) tokens by construction.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: Domain-Aware Pretokenization */}
          <section id="pretokenization" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black border-b border-gray-100 pb-3">
              4. Domain-Aware Pretokenization
            </h2>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-black">
                4.1 Regular Expression Specification
              </h3>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                Nylon-Tokenizer employs a compiled regular expression with Unicode support:
              </p>
              <pre className="bg-gray-950 text-gray-200 p-5 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed shadow-sm">
{`PRODUCTION_PATTERN = (
    r"<think>|</think>|<solution>|</solution>|<eos>|<pad>|<unk>|<bos>"  # 1. Special Tokens
    r"|https?://[^\\s><\\"'()]+|www\\.[^\\s><\\"'()]+"                       # 2. URLs
    r"|'(?:[sS]|[tT]|[rR][eE]|[vV][eE]|[mM]|[lL][lL]|[dD])"          # 3. Contractions
    r"|        |    |  |\\t|\\r?\\n"                                       # 4. Indentation Runs
    r"|==|!=|<=|>=|=>|->|\\+\\+|--|\\*\\*|//|&&|\\|\\||::|\\+=|-=|\\*=|/="    # 5. Polyglot Operators
    r"|[^\\W\\d_]+(?:'[^\\W\\d_]+)*"                                       # 6. Unicode Alpha Words
    r"|\\d"                                                              # 7. Single Decimal Digits
    r"|[^\\s\\w]"                                                         # 8. Punctuation / Symbols
    r"|\\s+"                                                             # 9. Generic Whitespaces
)`}
              </pre>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-black">
                4.2 Digit Boundary Preservation
              </h3>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                In standard frequency-driven BPE (e.g., GPT-2), multi-digit numbers are merged into subwords based on corpus co-occurrence (e.g., <code>&quot;1234&quot;</code> → <code>[&quot;12&quot;, &quot;34&quot;]</code>, while <code>&quot;5678&quot;</code> → <code>[&quot;567&quot;, &quot;8&quot;]</code>). Nylon-Tokenizer enforces <strong>Single-Digit Isolation</strong> via <code>|\d</code>:
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-gray-700 pl-4 border-l-2 border-gray-200">
                <li>
                  Every numerical sequence is segmented into single-digit units: <code>PreTokenize(&quot;1234&quot;) = [&quot;1&quot;, &quot;2&quot;, &quot;3&quot;, &quot;4&quot;]</code>.
                </li>
                <li>
                  For contiguous ASCII decimal digit sequences, single-digit isolation yields exactly 1.00 BPT.
                </li>
                <li>
                  <strong>Scientific Scope:</strong> Single-digit isolation guarantees deterministic alignment between token boundaries and base-10 digit positions (1.00 BPT). While this incurs a deliberate 5.4% byte-density penalty on mathematical text (Section 6.4), it structurally eliminates multi-digit amalgamation across place-value boundaries. Whether this boundary preservation directly translates into improved multi-step arithmetic reasoning remains an empirical question evaluated under our Section 7 protocol.
                </li>
              </ul>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-black">
                4.3 Greedy Longest-Match Indentation &amp; Whitespace Runs
              </h3>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                In source code and structured data, whitespace occurs predominantly in structured multi-space increments (2, 4, and 8 spaces). Rather than relying on line-start anchors—which fail across wrapped lines or multi-line expressions—Nylon-Tokenizer matches multi-space sequences greedily using longest-match alternation ordering:
              </p>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs text-center text-gray-800">
                S<sub>indent</sub> = &#123; &quot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;, &quot;&nbsp;&nbsp;&nbsp;&nbsp;&quot;, &quot;&nbsp;&nbsp;&quot;, &quot;\t&quot;, &quot;\n&quot;, &quot;\r\n&quot; &#125;
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs text-center">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="font-bold text-black block">16 Spaces</span>
                  <span className="text-emerald-600 font-bold">2 tokens</span>
                  <span className="text-gray-400 block text-[10px]">8.0x compression</span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="font-bold text-black block">12 Spaces</span>
                  <span className="text-emerald-600 font-bold">2 tokens</span>
                  <span className="text-gray-400 block text-[10px]">6.0x compression</span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="font-bold text-black block">6 Spaces</span>
                  <span className="text-emerald-600 font-bold">2 tokens</span>
                  <span className="text-gray-400 block text-[10px]">3.0x compression</span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="font-bold text-black block">4 Spaces</span>
                  <span className="text-emerald-600 font-bold">1 token</span>
                  <span className="text-gray-400 block text-[10px]">4.0x compression</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-black">
                4.4 Unicode Pretokenization &amp; Diacritic Preservation
              </h3>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                Standard ASCII-centric pretokenizers (e.g., <code>[a-zA-Z]+</code>) segment text at non-ASCII code points, separating Latin base letters from their combining diacritics. Nylon-Tokenizer addresses this via two mechanisms:
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-gray-700 pl-4 border-l-2 border-gray-200">
                <li>
                  <strong>Normalization Form:</strong> We deploy Unicode Normalization Form C (NFC) for multilingual text, ensuring that accented characters with precomposed representations are preserved in their canonical composite forms without the aggressive decompositions of NFKC.
                </li>
                <li>
                  <strong>Pretoken Boundary Grouping:</strong> The regex pattern <code>[^\W\d_]+(?:&apos;[^\W\d_]+)*</code> uses NFC normalization and Unicode-aware pretokenization to preserve pretoken boundaries around supported non-ASCII orthographic sequences, including commonly precomposed characters used in Yoruba (<em>ẹ, ọ</em>), Hausa (<em>ɓ, ɗ</em>), and Igbo (<em>ị, ụ</em>).
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5: Affected-Sequence BPE Induction */}
          <section id="bpe-induction" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black border-b border-gray-100 pb-3">
              5. Affected-Sequence BPE Induction
            </h2>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-black">
                5.1 Inverted-Index Formulation
              </h3>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                Let <em>W</em> denote the multiset of unique pretokenized word byte sequences, where each sequence <em>w = (b<sub>1</sub>, b<sub>2</sub>, ..., b<sub>|w|</sub>)</em> has an associated corpus count <em>C(w)</em>. A naive or unindexed BPE implementation repeatedly rescans candidate pair frequencies across corpus representations after each merge. Nylon-Tokenizer maintains an <strong>Inverted Pair Index</strong> mapping each adjacent byte pair to the exact subset of unique sequences containing that pair:
              </p>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs md:text-sm text-gray-900 text-center space-y-2">
                <div>I(p<sub>1</sub>, p<sub>2</sub>) = &#123; w ∈ W | ∃ i s.t. w[i] = p<sub>1</sub> ∧ w[i+1] = p<sub>2</sub> &#125;</div>
                <div>F(p<sub>1</sub>, p<sub>2</sub>) = ∑<sub>w ∈ I(p<sub>1</sub>, p<sub>2</sub>)</sub> C(w) · Count((p<sub>1</sub>, p<sub>2</sub>), w)</div>
              </div>

              {/* Unabridged Algorithm 1 */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-black block">
                  Algorithm 1: Affected-Sequence Byte-Pair Encoding Induction (Verbatim)
                </span>
                <pre className="bg-gray-950 text-gray-200 p-5 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed shadow-sm">
{`Algorithm 1: Affected-Sequence Byte-Pair Encoding Induction
Input: Pretokenized word counts C(w) for w in W; Target vocabulary size V_target
Output: Ordered merge list M; Final vocabulary V

1: Initialize V with V_special and V_base (256 bytes)
2: Initialize frequency map F and inverted index I
3: for each sequence w in W with count c do
4:     for i = 0 to |w| - 2 do
5:         pair = (w[i], w[i+1]); F[pair] += c; I[pair].add(w)
6:     end for
7: end for
8: while |V| < V_target and |F| > 0 do
9:     best_pair = argmax_p (F[p], p)
10:    if F[best_pair] <= 1 then break
11:    merged_token = best_pair[0] + best_pair[1]
12:    V.add_token(merged_token); M.append(best_pair)
13:    A_m = copy(I[best_pair])
14:    for each old_seq in A_m do
15:        c = C.pop(old_seq)
16:        for j = 0 to |old_seq| - 2 do
17:            p = (old_seq[j], old_seq[j+1]); F[p] -= c
18:            if F[p] <= 0 then F.delete(p)
19:            I[p].discard(old_seq)
20:        end for
21:        new_seq = ReplacePair(old_seq, best_pair, merged_token)
22:        C[new_seq] = C.get(new_seq, 0) + c
23:        for j = 0 to |new_seq| - 2 do
24:            p = (new_seq[j], new_seq[j+1]); F[p] += c
25:            I[p].add(new_seq)
26:        end for
27:    end for
28: end while
29: return M, V`}
                </pre>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-sm font-bold text-black">Computational Complexity</h4>
                <p className="text-xs md:text-sm text-gray-700">
                  Let <em>M = V<sub>target</sub> - |V<sub>initial</sub>|</em> be the total number of merge operations. In iteration <em>m ∈ [1, M]</em>, updates are restricted to the set of sequences <em>A<sub>m</sub> = I(best_pair<sub>m</sub>)</em>. The operational complexity is <em>O(∑<sub>m=1</sub><sup>M</sup> ∑<sub>w ∈ A<sub>m</sub></sub> L<sub>w</sub>)</em>, where <em>L<sub>w</sub></em> is the sequence length of word <em>w</em>.
                </p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-black block">
                  Table 1: Affected-Sequence Scaling Across 65,266 Merges
                </span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="border-b border-gray-200 text-gray-400 uppercase text-[10px]">
                      <tr>
                        <th className="py-2">Merge Progress Interval</th>
                        <th className="py-2">Median Affected Sequences (|A_m|)</th>
                        <th className="py-2">Fraction of Unique Vocabulary (|A_m| / |W|)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                      <tr><td className="py-2 font-semibold text-black">0% – 25%</td><td>1,428 sequences</td><td>0.296%</td></tr>
                      <tr><td className="py-2 font-semibold text-black">25% – 50%</td><td>486 sequences</td><td>0.101%</td></tr>
                      <tr><td className="py-2 font-semibold text-black">50% – 75%</td><td>162 sequences</td><td>0.034%</td></tr>
                      <tr><td className="py-2 font-semibold text-black">75% – 90%</td><td>58 sequences</td><td>0.012%</td></tr>
                      <tr><td className="py-2 font-semibold text-black">90% – 99%</td><td>9 sequences</td><td>0.002%</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-black">
                5.2 Bounded Memoized Encoding &amp; Lossless Decoding
              </h3>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                During inference, raw text chunks are encoded using priority merge ranks <em>R(p<sub>1</sub>, p<sub>2</sub>) ∈ [0, M-1]</em> with a cache bounded strictly to 300,000 entries. Decoding enforces contiguous byte concatenation:
              </p>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs md:text-sm text-gray-900 text-center">
                Decode(t) = UTF8Decode( ⨁<sub>i=1</sub><sup>|t|</sup> Lookup(t<sub>i</sub>) )
              </div>
            </div>
          </section>

          {/* Section 6: Experimental Evaluation */}
          <section id="evaluation" className="scroll-mt-24 space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black border-b border-gray-100 pb-3">
              6. Experimental Evaluation
            </h2>

            {/* Table 2 */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-black">
                6.1 Training Hardware &amp; Reproducibility Specification
              </h3>
              <div className="border border-gray-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Parameter</th>
                      <th className="py-2.5 px-3">Specification / Measurement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr><td className="py-2 px-3 font-semibold text-black">Corpus File</td><td className="py-2 px-3"><code>output/tokenizer/train.txt</code></td></tr>
                    <tr className="bg-gray-50/50"><td className="py-2 px-3 font-semibold text-black">Corpus Raw Size</td><td className="py-2 px-3">501.2 MB (uncompressed UTF-8 text, 5,170,984 lines)</td></tr>
                    <tr><td className="py-2 px-3 font-semibold text-black">Target Vocabulary Size (V)</td><td className="py-2 px-3">65,536 (indexed 0 ... 65,535)</td></tr>
                    <tr className="bg-gray-50/50"><td className="py-2 px-3 font-semibold text-black">Special &amp; Base Tokens</td><td className="py-2 px-3">14 protected tokens + 256 base octets (0x00 ... 0xFF)</td></tr>
                    <tr><td className="py-2 px-3 font-semibold text-black">Host Hardware</td><td className="py-2 px-3">Apple M1 (8 cores: 4 Firestorm @ 3.2 GHz + 4 Icestorm @ 2.06 GHz), 8.0 GB Unified LPDDR4X-4266</td></tr>
                    <tr className="bg-gray-50/50"><td className="py-2 px-3 font-semibold text-black">Memory Bandwidth</td><td className="py-2 px-3">68.25 GB/s unified memory bus</td></tr>
                    <tr><td className="py-2 px-3 font-semibold text-black">Software Environment</td><td className="py-2 px-3">Python 3.9.6 / 3.12, Rust fast-tokenizers backend (release build)</td></tr>
                    <tr className="bg-emerald-50 text-emerald-950 font-bold"><td className="py-2.5 px-3">Measured Training Wall-Clock</td><td className="py-2.5 px-3">52.79 seconds (all 65,266 merges completed; excludes 0.41s JSON dump)</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Artifact Directory Structure */}
              <div className="pt-3 space-y-2">
                <span className="text-xs font-bold text-gray-700 block">
                  Tokenizer Artifact Directory Structure:
                </span>
                <pre className="bg-gray-950 text-gray-200 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
{`models/v3/tokenizer/
├── tokenizer.json          # Complete Hugging Face tokenizer with 65,536 vocabulary
├── vocab.json              # Direct token-to-integer mapping (IDs 0 .. 65,535)
├── merges.txt              # 65,266 ordered BPE merge operations
├── tokenizer.stats.json    # Exact execution metadata (52.79s latency, line & byte counts)
└── special_tokens.json     # 14 protected control tokens`}
                </pre>
              </div>
            </div>

            {/* Table 3: Corpora Provenance */}
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-bold text-black">
                6.2 Evaluation Corpora Provenance (Held-Out Test Splits)
              </h3>
              <p className="text-xs text-gray-500">
                Table 3: All evaluation benchmark corpora were constructed from independent, mutually exclusive data sources with zero overlap with the 501.2 MB training split.
              </p>
              <div className="border border-gray-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Corpus Domain</th>
                      <th className="py-2.5 px-3">Source / Description</th>
                      <th className="py-2.5 px-3">Documents</th>
                      <th className="py-2.5 px-3">Raw Size</th>
                      <th className="py-2.5 px-3">Split</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr><td className="py-2 px-3 font-semibold text-black">Python Code</td><td className="py-2 px-3">Curated open-source repositories (Permissive licenses)</td><td className="py-2 px-3">1,200 files</td><td className="py-2 px-3">24.5 MB</td><td className="py-2 px-3">Held-out Test</td></tr>
                    <tr className="bg-gray-50/50"><td className="py-2 px-3 font-semibold text-black">Structured JSON/YAML</td><td className="py-2 px-3">Configuration &amp; API schema datasets</td><td className="py-2 px-3">850 files</td><td className="py-2 px-3">18.2 MB</td><td className="py-2 px-3">Held-out Test</td></tr>
                    <tr><td className="py-2 px-3 font-semibold text-black">Mathematical Proofs</td><td className="py-2 px-3">ArXiv LaTeX mathematics monographs</td><td className="py-2 px-3">400 papers</td><td className="py-2 px-3">32.0 MB</td><td className="py-2 px-3">Held-out Test</td></tr>
                    <tr className="bg-gray-50/50"><td className="py-2 px-3 font-semibold text-black">African Languages</td><td className="py-2 px-3">Parallel news &amp; literature (Yoruba, Hausa, Igbo)</td><td className="py-2 px-3">1,500 articles</td><td className="py-2 px-3">15.8 MB</td><td className="py-2 px-3">Held-out Test</td></tr>
                    <tr><td className="py-2 px-3 font-semibold text-black">Standard English</td><td className="py-2 px-3">Wikitext-103 &amp; educational textbooks</td><td className="py-2 px-3">1,000 articles</td><td className="py-2 px-3">25.0 MB</td><td className="py-2 px-3">Held-out Test</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 4: Controlled Compression Comparison */}
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-bold text-black">
                6.3 Controlled Compression Comparison: Bytes per Token (BPT)
              </h3>
              <p className="text-xs text-gray-500">
                Table 4: Comparing Nylon-Tokenizer against GPT-2 (50k), LLaMA-3 (128k), and a Controlled Standard BPE (65k) baseline sharing identical training corpus, NFC normalization, byte fallback, and merge budget (M=65,266).
              </p>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 leading-relaxed">
                <span className="font-semibold text-black">Metric Definition:</span> <strong>Bytes per Token (BPT) ↑</strong> measures representation density. <strong>Higher is better</strong> (more raw bytes compressed per context token, reducing total sequence length). <strong>Tokens / 1k Chars ↓</strong> measures sequence consumption. <strong>Lower is better</strong>.
              </div>
              <div className="border border-gray-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Modality / Benchmark Corpus</th>
                      <th className="py-2.5 px-3">GPT-2 (50k) ↑</th>
                      <th className="py-2.5 px-3">LLaMA-3 (128k) ↑</th>
                      <th className="py-2.5 px-3">Controlled BPE (65k) ↑</th>
                      <th className="py-2.5 px-3 text-black font-bold">Nylon (65k) ↑</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr><td className="py-2 px-3 font-semibold text-black">Python Code (Repos, Indented)</td><td>3.12</td><td>4.18</td><td>3.62</td><td className="font-bold text-black bg-emerald-50/50">4.21</td></tr>
                    <tr className="bg-gray-50/50"><td className="py-2 px-3 font-semibold text-black">Structured JSON &amp; YAML</td><td>2.95</td><td>3.89</td><td>3.35</td><td className="font-bold text-black bg-emerald-50/50">4.04</td></tr>
                    <tr><td className="py-2 px-3 font-semibold text-black">Mathematical Proofs (LaTeX)</td><td>2.84</td><td>3.65</td><td>3.31</td><td className="font-bold text-black bg-emerald-50/50">3.72</td></tr>
                    <tr className="bg-gray-50/50"><td className="py-2 px-3 font-semibold text-black">African Texts (Yoruba, Hausa, Igbo)</td><td>1.82</td><td>3.01</td><td>2.85</td><td className="font-bold text-black bg-emerald-50/50">3.28</td></tr>
                    <tr><td className="py-2 px-3 font-semibold text-black">Contiguous Decimal Digits</td><td>2.01</td><td>1.00*</td><td>2.05</td><td className="font-bold text-black bg-emerald-50/50">1.00*</td></tr>
                    <tr className="bg-gray-50/50"><td className="py-2 px-3 font-semibold text-black">Standard English Prose</td><td>3.94</td><td>4.62</td><td>4.15</td><td className="font-bold text-black bg-emerald-50/50">4.19</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 italic">
                *Note: Single-digit isolation yields exactly 1.00 BPT by design for contiguous ASCII decimal digits.
              </p>
            </div>

            {/* Table 5: Ablation Analysis */}
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-bold text-black">
                6.4 Component Ablation Analysis
              </h3>
              <div className="border border-gray-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Tokenizer Configuration</th>
                      <th className="py-2.5 px-3">Code (BPT) ↑</th>
                      <th className="py-2.5 px-3">Math (BPT) ↑</th>
                      <th className="py-2.5 px-3">Multilingual (BPT) ↑</th>
                      <th className="py-2.5 px-3">Tokens / 1k Chars ↓</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr className="font-bold text-black bg-gray-50/80"><td className="py-2 px-3">Full Nylon-Tokenizer</td><td>4.21</td><td>3.72</td><td>3.28</td><td>264</td></tr>
                    <tr><td className="py-2 px-3">– Indentation Runs (spaces only)</td><td>3.58 (-15.0%)</td><td>3.68 (-1.1%)</td><td>3.28 (0.0%)</td><td>298 (+12.9%)</td></tr>
                    <tr className="bg-gray-50/50"><td className="py-2 px-3">– Single-Digit Isolation</td><td>4.24 (+0.7%)</td><td>3.92 (+5.4%)</td><td>3.30 (+0.6%)</td><td>258 (-2.3%)</td></tr>
                    <tr><td className="py-2 px-3">– Polyglot Operators</td><td>4.11 (-2.4%)</td><td>3.65 (-1.9%)</td><td>3.28 (0.0%)</td><td>271 (+2.6%)</td></tr>
                    <tr className="bg-gray-50/50"><td className="py-2 px-3">– Unicode Word Pattern (ASCII regex)</td><td>4.21 (0.0%)</td><td>3.71 (-0.3%)</td><td>2.74 (-16.5%)</td><td>312 (+18.2%)</td></tr>
                    <tr className="text-gray-400"><td className="py-2 px-3">Unconstrained Baseline BPE (65k)</td><td>3.62 (-14.0%)</td><td>3.31 (-11.0%)</td><td>2.85 (-13.1%)</td><td>305 (+15.5%)</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Detailed Ablation Insights */}
              <div className="p-4 border border-gray-200 rounded-xl space-y-3 bg-gray-50/50 text-xs">
                <h4 className="font-bold text-black uppercase tracking-wider text-[11px]">
                  Component-Level Empirical Findings
                </h4>
                <ul className="space-y-2 text-gray-700 list-disc pl-4 leading-relaxed">
                  <li>
                    <strong>Multilingual Representation (-16.5% BPT):</strong> Reverting the Unicode word pattern to standard ASCII regex (<code>[a-zA-Z]+</code>) shatters accented African characters (<em>ẹ, ọ, ɓ, ɗ</em>) across UTF-8 multi-byte boundaries. Multilingual compression collapses from <strong>3.28 down to 2.74 BPT</strong> (+18.2% token sequence inflation), confirming that Unicode-aware pretokenization is a critical systems mechanism, not cosmetic engineering.
                  </li>
                  <li>
                    <strong>Indentation Run Preservation (-15.0% BPT):</strong> Removing greedy 2/4/8 space collapsing forces code files to encode indentation runs via single spaces, reducing code compression from <strong>4.21 to 3.58 BPT</strong> (+12.9% token volume).
                  </li>
                  <li>
                    <strong>Single-Digit Isolation Trade-Off (+5.4% BPT on Math):</strong> Disabling single-digit isolation allows multi-digit sequences (e.g., <code>1000</code>, <code>2024</code>) to merge into single subword tokens, which paradoxically <em>increases</em> raw byte compression on mathematical LaTeX from <strong>3.72 to 3.92 BPT</strong> (-2.3% token volume). Nylon deliberately accepts this compression penalty to guarantee deterministic place-value alignment, eliminating arbitrary token boundary contamination in numerical sequences.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7: Proposed Downstream Evaluation */}
          <section id="downstream" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black border-b border-gray-100 pb-3">
              7. Proposed Downstream Language Model Evaluation
            </h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              To measure downstream effects on neural generative capability, we define a controlled pretraining protocol:
            </p>

            <pre className="bg-gray-950 text-gray-200 p-5 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed shadow-sm">
{`                         CONTROLLED EXPERIMENTAL DESIGN
 ┌────────────────────────────────────────────────────────────────────────┐
 │ Fixed Invariants:                                                      │
 │ • Model Architecture: Nylon 1.35B (L=24, d=2048, h_q=16, h_kv=4)       │
 │ • Optimization: AdamW, peak LR = 3.0e-4, WSD schedule, 120B tokens    │
 │ • Compute Budget: 8x NVIDIA H100 SXM5, identical batch size (512 seqs) │
 ├──────────────────────────────────┬─────────────────────────────────────┤
 │ Model Variant A:                 │ Model Variant B:                    │
 │ Controlled Standard BPE (65k)    │ Full Nylon-Tokenizer (65k)          │
 └──────────────────────────────────┴─────────────────────────────────────┘`}
            </pre>

            <div className="border border-gray-200 rounded-xl overflow-x-auto text-xs font-mono">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Evaluation Domain</th>
                    <th className="py-2.5 px-3">Benchmark Metric</th>
                    <th className="py-2.5 px-3">Target Mechanism Tested</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  <tr><td className="py-2 px-3 font-semibold text-black">Arithmetic Reasoning</td><td>GSM8K &amp; SVAMP accuracy</td><td>Single-digit boundary preservation vs. multi-digit chunking</td></tr>
                  <tr className="bg-gray-50/50"><td className="py-2 px-3 font-semibold text-black">Code Synthesis</td><td>HumanEval &amp; MBPP pass@1</td><td>Indentation run compression &amp; operator preservation</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-black">Tool Calling / JSON</td><td>Schema conformance &amp; pass rate</td><td>Special token isolation (<code>&lt;|tool_call|&gt;</code>)</td></tr>
                  <tr className="bg-gray-50/50"><td className="py-2 px-3 font-semibold text-black">Pretraining Systems</td><td>Page-cache residency &amp; tokens/sec</td><td><code>uint16</code> binary shard streaming efficiency</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 8: Limitations */}
          <section id="limitations" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black border-b border-gray-100 pb-3">
              8. Limitations
            </h2>
            <ul className="space-y-3 text-xs md:text-sm text-gray-700 pl-4 border-l-2 border-gray-200">
              <li>
                <strong>Number-Heavy Sequence Inflation:</strong> Single-digit isolation enforces a 1:1 digit-to-token ratio, increasing sequence length on dense numerical matrices and financial spreadsheets relative to unconstrained tokenizers.
              </li>
              <li>
                <strong>Vocabulary Scale Trade-Off:</strong> Anchoring vocabulary to <em>V = 65,536</em> is optimized for compact parameter regimes (≤ 1.5B). In frontier architectures with embedding dimensions <em>d ≥ 8192</em>, scaling to <em>V ≥ 128k</em> may yield favorable compression without disproportionate parameter overhead.
              </li>
              <li>
                <strong>Chunking Boundary Artifacts:</strong> Partitioning degenerate sequences &gt; 1024 bytes into 512-byte slices bounds merge latency, but prevents BPE merges from spanning across slice boundaries.
              </li>
              <li>
                <strong>Scope of Empirical Evidence:</strong> Reported findings evaluate tokenizer compression, shard storage footprint, and BPE induction latency. Downstream impacts on neural generative capability remain subject to the proposed pretraining evaluation in Section 7.
              </li>
            </ul>
          </section>

          {/* Section 9: Conclusion */}
          <section id="conclusion" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black border-b border-gray-100 pb-3">
              9. Conclusion
            </h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              By halving token-ID storage requirements at the dataset representation layer (<em>V = 2<sup>16</sup> = 65,536</em>), preserving explicit single-digit boundaries, compressing structured indentation through greedy longest-match runs, and learning subwords from a curated multi-domain induction corpus, Nylon-Tokenizer provides a systems-oriented tokenizer design for compact language-model training. The results establish measurable improvements in tokenization compression and tokenizer induction efficiency under the evaluated workloads; whether these properties translate into improved neural language-model capability remains an empirical question addressed by the controlled downstream evaluation protocol.
            </p>
          </section>

          {/* References */}
          <section id="references" className="scroll-mt-24 space-y-4 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-bold tracking-tight text-black">
              References
            </h2>
            <ol className="space-y-3 text-xs text-gray-600 list-decimal pl-5 leading-relaxed">
              <li>Sennrich, R., Haddow, B., &amp; Birch, A. (2016). <em>Neural Machine Translation of Rare Words with Subword Units</em>. In Proceedings of ACL 2016.</li>
              <li>Kudo, T., &amp; Richardson, J. (2018). <em>SentencePiece: A simple and language independent subword tokenizer and detokenizer for Neural Text Processing</em>. In Proceedings of EMNLP 2018.</li>
              <li>OpenAI. (2022). <em>Tiktoken: A fast BPE tokeniser for use with OpenAI&apos;s models</em>. GitHub repository: <code>github.com/openai/tiktoken</code>.</li>
              <li>Radford, A., et al. (2019). <em>Language Models are Unsupervised Multitask Learners</em>. OpenAI Technical Report.</li>
              <li>Touvron, H., et al. (2023). <em>LLaMA: Open and Efficient Foundation Language Models</em>. arXiv:2302.13971.</li>
              <li>AI@Meta. (2024). <em>The Llama 3 Herd of Models</em>. arXiv:2407.21783.</li>
              <li>DeepSeek-AI. (2024). <em>DeepSeek-V3 Technical Report</em>. arXiv:2412.19437.</li>
              <li>Bostrom, K., &amp; Durrett, G. (2020). <em>Byte Pair Encoding is Suboptimal for Language Model Pretraining</em>. In Findings of EMNLP 2020.</li>
              <li>Unicode Consortium. (2024). <em>Unicode Standard Annex #15: Unicode Normalization Forms</em>.</li>
            </ol>
          </section>

          {/* BibTeX Citation */}
          <section className="space-y-3 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                BibTeX Citation
              </h3>
              <button
                onClick={copyBibtex}
                className="text-xs font-bold text-gray-700 hover:text-black transition-colors"
              >
                {copied ? "Copied!" : "Copy Citation"}
              </button>
            </div>
            <pre className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs font-mono text-gray-800 overflow-x-auto">
              {bibtex}
            </pre>
          </section>

          {/* Next Technical Report Card */}
          <div className="pt-8 border-t border-gray-100">
            <div className="p-6 md:p-8 bg-gray-50 border border-gray-200 rounded-3xl space-y-4 hover:border-black transition-all group">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 bg-black text-white rounded text-[10px] font-mono font-bold uppercase tracking-wider">
                  Next in Series · Report No. 02
                </span>
                <span className="text-gray-400 font-mono text-xs">October 2026</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-black text-black tracking-tight group-hover:text-gray-700 transition-colors">
                  Two-Stage Pretraining Data Curation: Forging 120B-Token Foundation Intelligence and Precision Annealing
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-sans">
                  How data curation is co-designed with Warmup-Stable-Decay optimization, 128-permutation MinHash LSH deduplication, and an invariant 15% replay anchor defense against catastrophic forgetting.
                </p>
              </div>
              <div className="pt-2 flex items-center space-x-3">
                <Link
                  to="/technical-reports/nylon-data-curation"
                  className="px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all flex items-center space-x-2 shadow-xs"
                >
                  <span>Read Technical Report No. 02</span>
                  <span>→</span>
                </Link>
                <a
                  href="/files/Nylon_Data_Curation_Technical_Report.pdf"
                  download
                  className="px-4 py-2.5 bg-white border border-gray-200 text-black text-xs font-bold uppercase tracking-wider rounded-xl hover:border-black transition-all"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>

          {/* Article Footer */}
          <footer className="pt-10 border-t border-gray-100 text-center space-y-6">
            <h4 className="text-xl font-bold text-black">
              Download the 18-page technical report PDF
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/files/Nylon_Tokenizer_Technical_Report.pdf"
                download="Nylon_Tokenizer_Technical_Report.pdf"
                className="px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all shadow-md flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF (707 KB)</span>
              </a>
              <Link
                to="/technical-reports"
                className="px-8 py-4 bg-white text-black border border-gray-200 text-xs font-bold uppercase tracking-wider rounded-xl hover:border-black transition-all"
              >
                ← Back to Technical Reports
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default NylonPaperPage;
