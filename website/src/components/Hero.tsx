import React from 'react';
import { motion } from 'framer-motion';
import { Copy, ChevronRight, Bot, Laptop } from 'lucide-react';

const Hero = () => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText('npx -y chat-relay-mcp');
    alert('Command copied!');
  };

  const renderFisheye = (text: string) => {
    const chars = text.split('');
    const center = (chars.length - 1) / 2;

    return chars.map((char, i) => {
      const dist = Math.abs(i - center);
      const scale = 1.4 - (dist * 0.12);
      const yOffset = Math.pow(dist, 1.4) * 2;

      return (
        <span
          key={i}
          className="inline-block"
          style={{
            transform: `scale(${scale}) translateY(${yOffset}px)`,
            margin: '0 2px'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-4 sm:px-8 bg-transparent overflow-hidden">
      <div className="relative z-10 w-full flex flex-col items-center text-center overflow-hidden">

        {/* Version Text Above Heading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-[11px] md:text-[14px] font-mono font-bold text-brand-purple tracking-[0.4em] uppercase opacity-80"
        >
          VERSION 1.0.0
        </motion.div>

        {/* Centered Heading - Reverted to Original Gradient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-10 w-full max-w-full px-2"
        >
          <h1 className="text-[14vw] sm:text-[11vh] md:text-[16vh] font-display leading-[1.1] uppercase tracking-tighter select-none text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-white to-brand-purple drop-shadow-[0_0_8px_rgba(0,255,255,0.3)] text-center w-full break-words">
            CHAT<br />
            <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">RELAY</span>
          </h1>
        </motion.div>

        {/* Buttons Centered Below - Side-by-Side on Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:max-w-none"
        >
          <a
            href="#setup"
            className="px-12 py-4 border-2 border-brand-purple bg-brand-purple/10 hover:bg-brand-purple/20 transition-all flex items-center justify-center gap-3 text-brand-purple hover:text-white font-bold text-sm md:text-base whitespace-nowrap shadow-[0_0_25px_rgba(255,0,255,0.3)] hover:shadow-[0_0_40px_rgba(255,0,255,0.5)] group w-full sm:w-auto"
          >
            <span className="group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all">
              SETUP
            </span>
            <Laptop size={20} className="group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all" />
          </a>

          <a
            href="#workflow"
            className="px-12 py-4 border-2 border-brand-blue bg-brand-blue/10 hover:bg-brand-blue/20 transition-all flex items-center justify-center gap-3 text-brand-blue hover:text-white font-bold text-sm md:text-base whitespace-nowrap shadow-[0_0_25px_rgba(0,255,255,0.3)] hover:shadow-[0_0_40px_rgba(0,255,255,0.5)] group w-full sm:w-auto"
          >
            <span className="group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all">
              TUTORIAL
            </span>
            <Bot size={20} className="group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
