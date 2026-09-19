import React from "react";

const capabilities = [
  {
    title: "AI Systems",
    skills: "Foundation models · Tokenizers · Pretraining · RAG · Agents",
    description:
      "Building language model training stacks from first principles, custom hardware-aligned tokenizers, and deterministic reasoning engines.",
    proof: [
      "Hardware-aligned uint16 byte-level BPE tokenizer co-designed for compact models",
      "Decoder-only transformer pretraining with PyTorch DDP and GRPO verifiable RL",
      "Vector retrieval over 320+ constitutional sections with verified citations"
    ],
    projects: [
      { name: "Nylon Engine", link: "nylon" },
      { name: "Nova Agent", link: "nova" },
      { name: "OpenLaw", link: "openlaw" },
      { name: "NoteIQ", link: "noteiq" }
    ]
  },
  {
    title: "Backend & Fintech",
    skills: "Node.js · APIs · financial logic · encryption · data systems",
    description:
      "Developing mission-compliant financial algorithms, ledger reconciliation, and cryptographic privacy.",
    proof: [
      "Automated Nigerian SME PAYE tax and deduction calculation engine",
      "Client-side AES-256 zero-knowledge encryption with burn-on-read storage",
      "Verifiable deterministic randomness (Ngozi sequence) for raffle ticketing"
    ],
    projects: [
      { name: "Paypaxe", link: "paypaxe" },
      { name: "Always Secure", link: "always-secure" },
      { name: "Luckywho", link: "luckywho" }
    ]
  },
  {
    title: "Product Engineering",
    skills: "React · React Native · Expo · TypeScript · production deployment",
    description:
      "Shipping high-reliability cross-platform applications to web browsers and native mobile app stores.",
    proof: [
      "4 mobile applications deployed across iOS App Store & Google Play Store",
      "Biometric security, push notifications, and offline state synchronization",
      "Design systems with tight typographic hierarchy and fast client-side performance"
    ],
    projects: [
      { name: "Paypaxe", link: "paypaxe" },
      { name: "NoteIQ", link: "noteiq" },
      { name: "MovieVerse", link: "movieverse" }
    ]
  }
];

const SkillsCapabilities = ({ onProjectSelect }) => {
  return (
    <section id="capabilities" className="py-16 md:py-24 px-6 bg-gray-50/50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400">
            Core Competencies
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black">
            Engineered Capabilities
          </h2>
          <p className="text-base text-gray-500 max-w-xl">
            Demonstrated engineering domains backed by code in production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-black tracking-tight">
                  {cap.title}
                </h3>
                <p className="font-mono text-xs font-medium text-indigo-600 leading-relaxed">
                  {cap.skills}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed pt-1">
                  {cap.description}
                </p>
                <ul className="space-y-2 pt-3 border-t border-gray-100">
                  {cap.proof.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-gray-700">
                      <span className="text-gray-300 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  Shipped in
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cap.projects.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => {
                        if (onProjectSelect) {
                          onProjectSelect({ id: p.link });
                        }
                      }}
                      className="text-xs font-semibold text-gray-800 hover:text-black bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-md transition-colors"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsCapabilities;
