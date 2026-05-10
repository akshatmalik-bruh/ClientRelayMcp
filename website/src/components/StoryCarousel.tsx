import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Terminal, Bot } from 'lucide-react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const steps = [
  {
    title: "1. INITIALIZE",
    ide: "ANTIGRAVITY",
    user: "create_session id='LearnMCP'",
    tool: "> Executing: mcp_chat-relay_create_session",
    response: "Session 'LearnMCP' created successfully. Ready to track context."
  },
  {
    title: "2. INJECT MEMORY",
    ide: "ANTIGRAVITY",
    user: "add_memory text='Use TypeScript, not Python'",
    tool: "> Executing: mcp_chat-relay_add_memory",
    response: "Memory saved to session 'LearnMCP'. I will remember this rule."
  },
  {
    title: "3. SNAPSHOT STATE",
    ide: "ANTIGRAVITY",
    user: "save_messages count=20",
    tool: "> Executing: mcp_chat-relay_save_messages",
    response: "Snapshot captured. 20 messages synced to SQLite database."
  },
  {
    title: "4. LIST SESSIONS",
    ide: "CURSOR",
    user: "list_sessions",
    tool: "> Executing: mcp_chat-relay_list_sessions",
    response: "[ { id: 'LearnMCP', name: 'LearnMCP', snapshot: 'TS Project' } ]"
  },
  {
    title: "5. LOAD CONTEXT",
    ide: "CURSOR",
    user: "get_session id='LearnMCP'",
    tool: "> Executing: mcp_chat-relay_get_session id='LearnMCP'",
    response: "Context restored. Memory: 'Use TypeScript, not Python'. Past 20 messages recovered. Ready to continue."
  },
  {
    title: "6. TERMINATE SESSION",
    ide: "TERMINAL",
    user: "delete_session id='LearnMCP'",
    tool: "> Executing: mcp_chat-relay_delete_session id='LearnMCP'",
    response: "Session 'LearnMCP' purged. All associated context and memories destroyed."
  }
];

const StoryCarousel = () => {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Kill previous timeline if it exists
    if (tlRef.current) {
      tlRef.current.kill();
    }

    const ctx = gsap.context(() => {
      const step = steps[current];

      // Reset text nodes
      gsap.set(".user-text", { text: "" });
      gsap.set(".tool-text", { text: "", opacity: 0 });
      gsap.set(".response-text", { text: "", opacity: 0 });

      const tl = gsap.timeline();
      tlRef.current = tl;

      // Type out User Prompt
      tl.to(".user-text", {
        duration: step.user.length * 0.03,
        text: step.user,
        ease: "none"
      })
        // Reveal Tool Execution
        .to(".tool-text", {
          opacity: 1,
          duration: 0.1
        }, "+=0.3")
        .to(".tool-text", {
          duration: step.tool.length * 0.02,
          text: step.tool,
          ease: "none"
        })
        // Reveal AI Response
        .to(".response-text", {
          opacity: 1,
          duration: 0.1
        }, "+=0.4")
        .to(".response-text", {
          duration: step.response.length * 0.02,
          text: step.response,
          ease: "none"
        });

    }, containerRef);

    return () => {
      if (tlRef.current) tlRef.current.kill();
      ctx.revert();
    };
  }, [current]);

  const nextStep = () => {
    setCurrent((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrent((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section id="workflow" className="py-24 relative z-10 bg-black border-t border-brand-purple/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-display text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] mb-4 uppercase tracking-tighter text-center">
            WORKFLOW<span className="hidden md:inline">_SIMULATION</span>
          </h2>
          <p className="text-brand-purple/80 font-mono tracking-widest text-center text-xs md:text-sm">{'>'} Tested for Cursor IDE and AntigravityIDE</p>
        </div>

        {/* Carousel Container */}
        <div className="bg-black/80 border-2 border-brand-blue/30 shadow-[0_0_30px_rgba(0,255,255,0.1)] relative mx-4 md:mx-0 max-w-full overflow-hidden md:overflow-visible">

          {/* Header Bar */}
          <div className="flex items-center justify-between border-b-2 border-brand-blue/30 p-4 bg-brand-blue/5">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <span className="text-[10px] md:text-xs font-mono text-brand-blue/70 uppercase tracking-widest border-l border-brand-blue/20 pl-4">
                SYSTEM_STORY_TERMINAL
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] md:text-xs font-mono text-brand-blue/40">
                STEP_{current + 1}_OF_{steps.length}
              </span>
            </div>
          </div>

          {/* Navigation Arrows - Middle Overlay */}
          <button
            onClick={prevStep}
            className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-10 h-10 md:w-14 md:h-14 bg-black border-2 border-brand-blue text-brand-blue flex items-center justify-center hover:bg-brand-blue hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] transition-all z-20"
          >
            <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
          </button>

          <button
            onClick={nextStep}
            className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-1/2 w-10 h-10 md:w-14 md:h-14 bg-black border-2 border-brand-purple text-brand-purple flex items-center justify-center hover:bg-brand-purple hover:text-black hover:shadow-[0_0_20px_rgba(255,0,255,0.6)] transition-all z-20"
          >
            <ChevronRight className="w-5 h-5 md:w-8 md:h-8" />
          </button>

          {/* Chat / Terminal Window */}
          <div ref={containerRef} className="p-4 sm:p-6 md:p-12 min-h-[400px] flex flex-col font-[Consolas,Monaco,monospace] text-sm md:text-base leading-relaxed tracking-wide overflow-x-hidden">

            {/* User Prompt */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-2 text-cyan-50/50 mb-2 font-bold text-[10px] md:text-xs uppercase break-words">
                <span className="w-2 h-2 rounded-full bg-cyan-50/50 shrink-0"></span>
                USER ({steps[current].ide})
              </div>
              <div className="text-white bg-white/5 p-3 md:p-4 border-l-2 border-white/20 min-h-[60px] break-all sm:break-normal">
                <span className="user-text"></span><span className="animate-pulse">_</span>
              </div>
            </div>

            {/* Tool Execution */}
            <div className="mb-6 md:mb-8 pl-4 md:pl-8 border-l-2 border-brand-purple/30">
              <div className="text-brand-purple/50 font-bold text-[10px] md:text-xs mb-1">SYSTEM_ROUTINE</div>
              <div className="tool-text text-brand-purple font-mono break-all sm:break-normal text-xs md:text-base"></div>
            </div>

            {/* AI Response */}
            <div>
              <div className="flex items-center gap-2 text-brand-blue mb-2 font-bold text-[10px] md:text-xs uppercase break-words">
                <Bot size={14} className="text-brand-blue shrink-0" />
                CHAT_RELAY AGENT
              </div>
              <div className="text-brand-blue bg-brand-blue/5 p-3 md:p-4 border-l-2 border-brand-blue shadow-[inset_0_0_20px_rgba(0,255,255,0.05)] min-h-[80px] text-xs md:text-base break-words">
                <span className="response-text"></span>
              </div>
            </div>

          </div>
        </div>

        {/* Loop Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-12 h-1 transition-all ${i === current ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-white/20'}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default StoryCarousel;
