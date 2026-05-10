import React from 'react';
import { Monitor, Layers, House, Bot, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const NavItem = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => (
    <a
      href={href}
      className="group relative p-2 md:p-3 rounded-full border border-transparent transition-all duration-300 hover:bg-white/20 hover:border-white hover:text-white text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]"
      title={label}
    >
      <Icon size={18} className="md:w-5 md:h-5" strokeWidth={2.5} />
    </a>
  );

  return (
    <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center px-4">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-row items-center gap-0.5 md:gap-1 p-1 md:p-2 bg-white/5 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-xl rounded-full max-w-full"
      >
        <NavItem href="#" icon={House} label="Home" />

        <div className="w-[2px] h-4 bg-white/40 mx-1 rounded-full" />

        <NavItem href="#features" icon={Layers} label="Features" />
        <NavItem href="#workflow" icon={Bot} label="Tutorial" />
        <NavItem href="#setup" icon={Monitor} label="Setup" />

        <div className="w-[2px] h-4 bg-white/40 mx-1 rounded-full" />

        <a
          href="https://github.com/akshatmalik-bruh/ClientRelayMcp.git"
          target="_blank"
          className="p-3 rounded-full border border-transparent transition-all duration-300 hover:bg-white/20 hover:border-white hover:text-white text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]"
          title="GitHub"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
        </a>

        <a
          href="https://www.npmjs.com/package/chat-relay-mcp"
          target="_blank"
          className="p-3 rounded-full border border-transparent transition-all duration-300 hover:bg-red-500/20 hover:border-red-500 hover:text-red-500 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.9)] flex items-center justify-center"
          title="NPM Package"
        >
          <img src="/npm.svg" alt="NPM" className="w-5 h-5 brightness-0 invert transition-all duration-300" />
        </a>
      </motion.div>
    </div>
  );
};

export default Sidebar;
