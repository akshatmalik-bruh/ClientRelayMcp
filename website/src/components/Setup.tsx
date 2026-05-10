import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, Check } from 'lucide-react';

const Setup = () => {
  const [activeTab, setActiveTab] = useState<'instant' | 'manual'>('instant');
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [cmdText, setCmdText] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  const fullCmd = "npx -y chat-relay-mcp";

  React.useEffect(() => {
    if (activeTab !== 'instant') return;
    setCmdText('');
    setShowOutput(false);
    let i = 0;
    const interval = setInterval(() => {
      setCmdText(fullCmd.slice(0, i + 1));
      i++;
      if (i >= fullCmd.length) {
        clearInterval(interval);
        setTimeout(() => setShowOutput(true), 600);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [activeTab]);

  const jsonConfig = `{
  "chat-relay": {
    "command": "npx",
    "args": ["-y", "chat-relay-mcp"]
  }
}`;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonConfig);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(fullCmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <section id="setup" className="py-24 relative z-10 border-t border-brand-blue/20 bg-black/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl md:text-5xl font-display text-brand-blue drop-shadow-[0_0_10px_rgba(0,255,255,0.6)] mb-4 text-center">
            SETUP
          </h2>
          <p className="text-brand-purple/80">{'>'} SELECT DEPLOYMENT METHOD</p>
        </div>

        <div className="flex justify-center mb-12 px-4">
          <div className="flex flex-col md:inline-flex md:flex-row p-1 bg-black border border-brand-blue/30 shadow-[0_0_15px_rgba(0,255,255,0.1)] w-full md:w-auto">
            <button
              onClick={() => setActiveTab('instant')}
              className={`px-4 py-3 md:px-6 md:py-2 text-xs md:text-sm font-display transition-all whitespace-nowrap w-full md:w-auto ${activeTab === 'instant' ? 'bg-brand-blue text-black shadow-[0_0_10px_rgba(0,255,255,0.6)]' : 'text-brand-blue/50 hover:text-brand-blue'}`}
            >
              NPM_QUICKSTART
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-4 py-3 md:px-6 md:py-2 text-xs md:text-sm font-display transition-all whitespace-nowrap w-full md:w-auto ${activeTab === 'manual' ? 'bg-brand-purple text-black shadow-[0_0_10px_rgba(255,0,255,0.6)]' : 'text-brand-purple/50 hover:text-brand-purple'}`}
            >
              LOCAL_BUILD
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-4 sm:p-8 md:p-12 relative overflow-hidden"
          >
            {/* Terminal Top Bar */}
            <div className="absolute top-0 left-0 w-full h-6 bg-brand-blue/20 border-b border-brand-blue/30 flex items-center px-4 gap-2">
              <div className="w-2 h-2 bg-brand-purple/80 rounded-full"></div>
              <div className="w-2 h-2 bg-brand-blue/80 rounded-full"></div>
            </div>

            <div className="pt-4 w-full">
              {activeTab === 'instant' ? (
                <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 w-full">

                  <div className="w-full overflow-hidden">
                    <div className="flex items-center justify-between mb-4 gap-2">
                      <div className="flex items-center gap-2 text-brand-blue shrink-0">
                        <Terminal size={16} className="md:w-5 md:h-5" />
                        <span className="font-display text-[10px] md:text-xs">{'>'} TERMINAL</span>
                      </div>
                      <button
                        onClick={handleCopyCmd}
                        className="text-xs font-mono text-brand-blue/70 hover:text-brand-blue transition-colors flex items-center gap-1"
                      >
                        {copiedCmd ? <><Check size={14} /> COPIED</> : <><Copy size={14} /> COPY CMD</>}
                      </button>
                    </div>
                    <div className="bg-black/90 border border-brand-blue/30 p-4 md:p-8 font-[Consolas,Monaco,monospace] text-sm md:text-base leading-relaxed tracking-wide shadow-[inset_0_0_20px_rgba(0,255,255,0.05)] min-h-[200px] md:min-h-[240px] flex flex-col w-full overflow-hidden">
                      <div className="text-white mb-2 break-all">
                        <span className="text-brand-purple mr-2 md:mr-3">C:\\USER\\DEV{'>'}</span>
                        {cmdText}
                        {!showOutput && <span className="animate-pulse">_</span>}
                      </div>
                      {showOutput && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: { transition: { staggerChildren: 0.6 } }
                          }}
                          className="mt-4 space-y-4 text-cyan-50/80"
                        >
                          <motion.p variants={{ hidden: { opacity: 0, x: -5 }, visible: { opacity: 1, x: 0 } }}>
                            Fetching chat-relay-mcp@latest...
                          </motion.p>
                          <motion.p variants={{ hidden: { opacity: 0, x: -5 }, visible: { opacity: 1, x: 0 } }} className="text-brand-blue">
                            ✔ Packages installed successfully.
                          </motion.p>
                          <motion.p variants={{ hidden: { opacity: 0, x: -5 }, visible: { opacity: 1, x: 0 } }} className="text-brand-purple">
                            ✔ Database initialized at ./mcp-db.sqlite
                          </motion.p>
                          <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="text-white mt-4 font-bold animate-pulse">
                            Waiting for MCP client connection on stdio...
                          </motion.p>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Right Side: JSON Config */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3 text-brand-purple">
                        <span className="font-display text-sm">{'>'} mcp.json</span>
                      </div>
                      <button
                        onClick={handleCopyJson}
                        className="text-xs font-mono text-brand-purple/70 hover:text-brand-purple transition-colors flex items-center gap-1"
                      >
                        {copiedJson ? <><Check size={14} /> COPIED</> : <><Copy size={14} /> COPY JSON</>}
                      </button>
                    </div>
                    <p className="text-cyan-50/70 mb-4 text-sm font-sans tracking-wide">
                      // Inject this directly into your MCP config file
                    </p>
                    <div className="relative group w-full max-w-full">
                      <pre className="bg-black/80 p-4 md:p-8 border border-brand-purple/30 text-xs md:text-base font-[Consolas,Monaco,monospace] leading-loose tracking-wide overflow-x-auto text-brand-purple shadow-[inset_0_0_20px_rgba(255,0,255,0.05)] min-h-[240px]">
                        {jsonConfig}
                      </pre>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 w-full">

                  {/* Left Side: Compilation Routine */}
                  <div className="space-y-8">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between items-start gap-2 md:gap-0 mb-4">
                        <div className="flex items-center gap-3 text-brand-purple">
                          <Terminal size={20} />
                          <span className="font-display text-sm">{'>'} GIT_CLONE</span>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText("git clone https://github.com/your-username/chat-relay-mcp.git");
                          }}
                          className="text-[10px] md:text-xs font-mono text-brand-purple/70 hover:text-brand-purple transition-colors flex items-center gap-1"
                        >
                          <Copy size={14} /> COPY_GIT
                        </button>
                      </div>
                      <div className="bg-black/90 border-l-4 border-brand-purple p-4 md:p-6 font-[Consolas,Monaco,monospace] text-xs md:text-base leading-relaxed tracking-wide shadow-[inset_0_0_20px_rgba(255,0,255,0.05)] overflow-hidden">
                        <code className="text-brand-blue break-all">git clone https://github.com/your-username/chat-relay-mcp.git</code>
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between items-start gap-2 md:gap-0 mb-4">
                        <div className="flex items-center gap-3 text-brand-purple">
                          <Terminal size={20} />
                          <span className="font-display text-sm">{'>'} BUILD_SEQUENCE</span>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText("cd chat-relay-mcp && npm install && npm run build");
                          }}
                          className="text-[10px] md:text-xs font-mono text-brand-purple/70 hover:text-brand-purple transition-colors flex items-center gap-1"
                        >
                          <Copy size={14} /> COPY_BUILD
                        </button>
                      </div>
                      <div className="bg-black/90 border-l-4 border-brand-purple p-4 md:p-6 font-[Consolas,Monaco,monospace] text-xs md:text-base leading-relaxed tracking-wide shadow-[inset_0_0_20px_rgba(255,0,255,0.05)] overflow-hidden">
                        <code className="text-brand-blue break-all">cd chat-relay-mcp && npm install && npm run build</code>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Local JSON Config */}
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between items-start gap-2 md:gap-0 mb-4">
                      <div className="flex items-center gap-3 text-brand-blue">
                        <span className="font-display text-sm">{'>'} local_mcp.json</span>
                      </div>
                      <button
                        onClick={() => {
                          const localJson = `{
  "chat-relay": {
    "command": "node",
    "args": ["/ABSOLUTE/PATH/TO/chat-relay-mcp/dist/index.js"]
  }
}`;
                          navigator.clipboard.writeText(localJson);
                        }}
                        className="text-[10px] md:text-xs font-mono text-brand-blue/70 hover:text-brand-blue transition-colors flex items-center gap-1"
                      >
                        <Copy size={14} /> COPY JSON
                      </button>
                    </div>
                    <p className="text-cyan-50/70 mb-4 text-sm font-sans tracking-wide">
                      // Reference the compiled build locally
                    </p>
                    <div className="relative group w-full max-w-full">
                      <pre className="bg-black/80 p-4 md:p-8 border border-brand-blue/30 text-xs md:text-base font-[Consolas,Monaco,monospace] leading-loose tracking-wide overflow-x-auto text-brand-blue shadow-[inset_0_0_20px_rgba(0,255,255,0.05)] min-h-[240px]">
                        {`{
  "chat-relay": {
    "command": "node",
    "args": ["/PATH/TO/dist/index.js"]
  }
}`}
                      </pre>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Setup;
