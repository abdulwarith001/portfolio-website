import React, { useState, useEffect, useRef } from 'react';

const SophisticatedWebsite = ({ onReset }) => {
  const [glitchText, setGlitchText] = useState("COMING SOON");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Glitch effect logic
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&";
    const original = "COMING SOON";
    let interval;

    const startGlitch = () => {
      let iterations = 0;
      clearInterval(interval);
      
      interval = setInterval(() => {
        setGlitchText(prev => 
          original.split("").map((char, index) => {
            if (index < iterations) return original[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );
        
        if (iterations >= original.length) clearInterval(interval);
        iterations += 1/3;
      }, 30);
    };

    const triggerInterval = setInterval(startGlitch, 3000);
    startGlitch();

    return () => {
      clearInterval(interval);
      clearInterval(triggerInterval);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 bg-black text-white flex flex-col items-center justify-center p-8 overflow-hidden font-mono"
    >
      {/* High-Tech Background: Grid + Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 0, 0, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>

      {/* Interactive Red Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-30"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, rgba(220, 38, 38, 0.15), transparent)`
        }}
      ></div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]">
        <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(255,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
      </div>

      <div className="relative z-20 text-center flex flex-col items-center max-w-4xl">
        {/* SOPHISTICATED Tag */}
        <div className="mb-4 inline-flex items-center space-x-2 px-3 py-1 border border-red-500/30 rounded-sm bg-red-500/5">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-red-500/80">
            System: Sophisticated_v2.0
          </span>
        </div>

        {/* Main Title with Glitch */}
        <div className="relative group cursor-default">
          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white mb-2 uppercase leading-none mix-blend-difference">
            {glitchText}
          </h1>
          {/* Chromatic Aberration Shadows */}
          <h1 className="absolute inset-0 text-7xl md:text-9xl font-black italic tracking-tighter text-red-600/50 mb-2 uppercase leading-none -translate-x-1 translate-y-1 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {glitchText}
          </h1>
          <h1 className="absolute inset-0 text-7xl md:text-9xl font-black italic tracking-tighter text-blue-600/50 mb-2 uppercase leading-none translate-x-1 -translate-y-1 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {glitchText}
          </h1>
        </div>

        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent mb-12 shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>

        <div className="space-y-6 max-w-xl text-center">
          <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed border-x border-red-900/30 px-8 py-4 bg-red-950/5">
            The complex version of the portfolio is currently compiling. 
            Expect <span className="text-red-500 font-bold">dynamic layouts</span>, 
            <span className="text-red-500 font-bold italic px-1">generative shaders</span>, 
            and <span className="text-red-500 font-bold">deep interactions</span>.
          </p>
          
          <div className="flex flex-col items-center space-y-8 mt-12">
            <button 
              onClick={onReset}
              className="relative group px-10 py-4 overflow-hidden border border-red-600/20 transition-all duration-300"
            >
              {/* Button Background Animation */}
              <div className="absolute inset-0 bg-red-600/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <div className="absolute top-0 right-0 w-1 h-1 bg-red-600"></div>
              <div className="absolute bottom-0 left-0 w-1 h-1 bg-red-600"></div>
              
              <span className="relative z-10 text-red-500 group-hover:text-white transition-colors duration-300 uppercase tracking-[0.4em] text-[10px] font-black">
                Return to the Construct
              </span>
            </button>
            
            <div className="flex items-center space-x-4 opacity-30 text-[9px] uppercase tracking-widest text-red-500">
              <span>Status: Offline</span>
              <span className="w-1 h-1 rounded-full bg-red-500"></span>
              <span>Buffer: 0%</span>
              <span className="w-1 h-1 rounded-full bg-red-500"></span>
              <span>Core: Locked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-red-600/30"></div>
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-red-600/30"></div>
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-red-600/30"></div>
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-red-600/30"></div>
    </div>
  );
};

export default SophisticatedWebsite;
