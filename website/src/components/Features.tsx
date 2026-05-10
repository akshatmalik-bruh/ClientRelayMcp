import React, { useState } from 'react';
import { Database, Zap, Share2, Shield, Search, Terminal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const features = [
    {
      icon: <Database size={32} />,
      title: "PERSISTENT_MEMORY",
      description: "LTM (Long Term Memory) injection for deep session continuity across development cycles.",
      color: "#00ffff" // Cyan
    },
    {
      icon: <Share2 size={32} />,
      title: "CROSS-IDE SYNC",
      description: "Handoff context between Cursor, Antigravity, and Cline instantly.",
      color: "#ff00ff" // Magenta
    },
    {
      icon: <Terminal size={32} />,
      title: "CLI NATIVE",
      description: "No bloat. Runs purely as an NPM executable. Fast boot sequence.",
      color: "#ffffff" // White
    },
    {
      icon: <Search size={32} />,
      title: "SEMANTIC RECALL",
      description: "Intelligent indexing retrieves exact memories when the LLM needs them.",
      color: "#a855f7" // Purple
    },
    {
      icon: <Shield size={32} />,
      title: "ZOD VALIDATED",
      description: "Strict input sanitization prevents AI hallucination and data corruption.",
      color: "#00ffff" // Cyan
    },
    {
      icon: <Zap size={32} />,
      title: "ZERO CONFIG",
      description: "No environment variables. No accounts. Just add it to your MCP settings.",
      color: "#ff00ff" // Magenta
    }
  ];

  return (
    <section id="features" className="relative min-h-screen pt-32 pb-12 z-10 flex flex-col items-center justify-center">
      <div className="w-full md:max-w-5xl md:mx-auto px-0 md:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display text-brand-purple drop-shadow-[0_0_10px_rgba(255,0,255,0.6)] mb-6 uppercase tracking-tighter text-center">
            FEATURES
          </h2>
          <p className="text-brand-blue/80 max-w-2xl mx-auto text-center px-4">
            {'>'} CLICK MODULE FOR DETAILED ANALYSIS...
          </p>
        </div>

        {/* Grid of Icons - Card Style on Mobile, Horizontal on Computer */}
        <div className="flex flex-col md:flex-row md:flex-nowrap items-center md:justify-between gap-6 md:gap-6 w-full max-w-full md:overflow-x-auto pb-12 px-4 no-scrollbar">
          {features.map((feature, index) => (
            <motion.button
              key={index}
              layoutId={`feature-card-${index}`}
              onClick={() => setSelectedFeature(index)}
              style={{
                borderColor: feature.color,
                boxShadow: `0 0 15px ${feature.color}33`
              }}
              className="w-[92%] max-w-sm md:w-40 md:h-40 flex flex-col items-center justify-center gap-4 md:gap-3 border-2 bg-black transition-all group py-8 md:py-0 px-6 md:px-0"
            >
              <div
                style={{ color: feature.color }}
                className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] group-hover:scale-110"
              >
                {feature.icon}
              </div>
              <span className="text-sm md:text-[10px] lg:text-xs font-display leading-tight text-white/70 group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] uppercase text-center px-2 break-all md:break-normal">
                {feature.title.includes('_') ? (
                  <>
                    {feature.title.split('_')[0]}<br />
                    {feature.title.split('_')[1]}
                  </>
                ) : feature.title}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Windows-style Modal */}
        <AnimatePresence>
          {selectedFeature !== null && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 pointer-events-none">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
                onClick={() => setSelectedFeature(null)}
              />

              {/* Modal Card */}
              <motion.div
                layoutId={`feature-card-${selectedFeature}`}
                style={{ borderColor: features[selectedFeature].color }}
                className="w-full max-w-2xl bg-black border-2 relative z-10 pointer-events-auto flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              >
                {/* Title Bar */}
                <div
                  style={{ backgroundColor: features[selectedFeature].color }}
                  className="w-full text-black flex items-center justify-between px-6 py-3 border-b-2"
                >
                  <span className="font-display text-sm tracking-widest">{features[selectedFeature].title}</span>
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="hover:bg-black hover:text-white transition-colors p-1"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 flex flex-col md:flex-row items-start gap-6 md:gap-8 overflow-y-auto max-h-[70vh]">
                  <div style={{ color: features[selectedFeature].color }} className="shrink-0 mt-1 scale-125 md:scale-150">
                    {features[selectedFeature].icon}
                  </div>
                  <div>
                    <p className="text-base md:text-xl text-cyan-50 font-mono leading-relaxed tracking-tight">
                      {features[selectedFeature].description}
                    </p>
                    <div
                      style={{ color: `${features[selectedFeature].color}88` }}
                      className="mt-6 md:mt-10 flex items-center gap-3 text-xs md:text-sm font-bold"
                    >
                      <div
                        style={{ backgroundColor: features[selectedFeature].color }}
                        className="w-2 h-2 md:w-3 md:h-3 animate-pulse"
                      ></div>
                      <span>SYSTEM_STATUS: ACTIVE</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Features;
