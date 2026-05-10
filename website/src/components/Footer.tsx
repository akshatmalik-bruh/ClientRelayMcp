import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const marqueeText = "CHAT RELAY_ ";

  return (
    <footer className="relative h-[30vh] flex items-center border-t-2 border-brand-blue/30 overflow-hidden select-none bg-black">
      
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          repeat: Infinity, 
          duration: 15, 
          ease: "linear" 
        }}
        className="flex whitespace-nowrap items-center relative z-10"
      >
        <span className="text-[12vh] md:text-[20vh] font-display uppercase text-brand-blue drop-shadow-[0_0_20px_rgba(0,255,255,0.4)] mr-20 tracking-[0.1em]">
          {marqueeText} {marqueeText} {marqueeText} {marqueeText}
        </span>
        <span className="text-[12vh] md:text-[20vh] font-display uppercase text-brand-blue drop-shadow-[0_0_20px_rgba(0,255,255,0.4)] mr-20 tracking-[0.1em]">
          {marqueeText} {marqueeText} {marqueeText} {marqueeText}
        </span>
      </motion.div>

      {/* Removed Copyright overlay */}
    </footer>
  );
};

export default Footer;
