import React, { useState, useEffect } from 'react';
import MatrixRain from './components/common/MatrixRain';
import SimpleWebsite from './components/simple/SimpleWebsite';
import Gateway from './components/gateway/Gateway';
import SophisticatedWebsite from './components/sophisticated/SophisticatedWebsite';

function App() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  const [selectedPill, setSelectedPill] = useState(() => {
    const saved = localStorage.getItem('portfolio_pill_selection');
    if (saved) return saved;
    if (typeof window !== 'undefined' && window.innerWidth < 768) return 'blue';
    return null;
  });

  const [doorsOpen, setDoorsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_pill_selection');
      return !!saved || window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !selectedPill) {
        setSelectedPill('blue');
        setDoorsOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedPill]);

  const handlePillClick = (pill) => {
    setSelectedPill(pill);
    localStorage.setItem('portfolio_pill_selection', pill);
    setDoorsOpen(true);
  };

  const handleReset = () => {
    setDoorsOpen(false);
    setTimeout(() => {
      setSelectedPill(null);
      localStorage.removeItem('portfolio_pill_selection');
    }, 1000); 
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white" style={{ fontFamily: "'Geom', sans-serif" }}>
      
      {/* Background Matrix Rain (Common for Transition) */}
      <div className="absolute inset-0 z-0">
        <MatrixRain colorHex="#0f0" opacity={0.1} />
      </div>

      {/* Website Content (Revealed Layers) */}
      {selectedPill === 'blue' && (
        <SimpleWebsite onReset={handleReset} />
      )}
      
      {selectedPill === 'red' && (
        <SophisticatedWebsite onReset={handleReset} />
      )}

      {/* Selection Gateway (Foreground Layer) */}
      <Gateway 
        doorsOpen={doorsOpen} 
        onPillClick={handlePillClick} 
      />

    </div>
  );
}

export default App;
