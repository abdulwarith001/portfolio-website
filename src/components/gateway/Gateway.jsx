import React from 'react';
import MatrixRain from '../common/MatrixRain';

const Gateway = ({ doorsOpen, onPillClick }) => {
  return (
    <>
      {/* Container for initial text (Choose a Pill) */}
      <div 
        className={`absolute inset-x-0 top-1/4 z-30 flex justify-center pointer-events-none transition-opacity duration-700 ${
          doorsOpen ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <h2 className="text-4xl md:text-6xl uppercase font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-red-400 animate-text-shimmer">
          Choose A Pill
        </h2>
      </div>

      {/* LEFT DOOR: BLUE */}
      <div 
        className={`absolute top-0 left-0 w-1/2 h-full bg-black border-r border-blue-900/50 flex items-center justify-center z-20 transition-transform duration-1000 ease-in-out ${
          doorsOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <MatrixRain colorHex="#3b82f6" opacity={0.3} />
        
        <button 
          onClick={() => onPillClick('blue')}
          className="group relative z-10"
        >
          {/* Subtle Glow */}
          <div className="absolute -inset-2 rounded-full bg-blue-500 opacity-10 group-hover:opacity-30 blur-md transition duration-500"></div>
          
          {/* The Pill - Realistic Capsule Shape (Horizontal, smaller size) */}
          <div className="relative animate-float animate-shine w-32 h-16 md:w-48 md:h-24 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-blue-400/30 group-hover:scale-110 transition duration-300 cursor-pointer overflow-hidden isolate" style={{ maskImage: 'radial-gradient(white, black)' }}>
            {/* Pill Top Half */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-300 via-blue-600 to-blue-800"></div>
            {/* Pill Bottom Half */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900 via-blue-800 to-blue-800"></div>
            {/* Pill Specular Highlight (Reflection) */}
            <div className="absolute top-2 left-2 right-2 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-full mix-blend-overlay"></div>
            {/* Pill Separator Line (Vertical) */}
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-blue-900/60 shadow-[1px_0_2px_rgba(255,255,255,0.2)]"></div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-white font-black tracking-widest text-xl md:text-2xl uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 shadow-black
                [text-shadow:0_1px_0_#3b82f6,0_2px_0_#2563eb,0_3px_0_#1d4ed8,0_4px_5px_rgba(0,0,0,0.5)]">
                Simple
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* RIGHT DOOR: RED */}
      <div 
        className={`absolute top-0 right-0 w-1/2 h-full bg-black border-l border-red-900/50 flex items-center justify-center z-20 transition-transform duration-1000 ease-in-out ${
          doorsOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <MatrixRain colorHex="#ef4444" opacity={0.3} />
        
        <button 
          onClick={() => onPillClick('red')}
          className="group relative z-10"
        >
          {/* Subtle Glow */}
          <div className="absolute -inset-2 rounded-full bg-red-500 opacity-10 group-hover:opacity-30 blur-md transition duration-500"></div>
          
          {/* The Pill - Realistic Capsule Shape (Horizontal, smaller size) */}
          <div className="relative animate-float-reverse animate-shine w-32 h-16 md:w-48 md:h-24 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.3)] border border-red-400/30 group-hover:scale-110 transition duration-300 cursor-pointer overflow-hidden isolate" style={{ maskImage: 'radial-gradient(white, black)' }}>
            {/* Pill Top Half */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-red-400 via-red-600 to-red-800"></div>
            {/* Pill Bottom Half */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-red-950 via-red-900 to-red-800"></div>
            {/* Pill Specular Highlight (Reflection) */}
            <div className="absolute top-2 left-2 right-2 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-full mix-blend-overlay"></div>
            {/* Pill Separator Line (Vertical) */}
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-red-950/80 shadow-[1px_0_2px_rgba(255,255,255,0.2)]"></div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-white font-black tracking-widest text-xl md:text-2xl uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 shadow-black
                [text-shadow:0_1px_0_#ef4444,0_2px_0_#dc2626,0_3px_0_#b91c1c,0_4px_5px_rgba(0,0,0,0.5)]">
                Complex
              </span>
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

export default Gateway;
