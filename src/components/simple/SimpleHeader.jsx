import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const SimpleHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Projects', 'Experience', 'Contact'];

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'pt-2' : 'pt-6'} px-4 animate-fade-in-down`}>
      <header className={`w-full max-w-5xl mx-auto backdrop-blur-xl border border-gray-200/50 px-6 py-3 flex justify-between items-center rounded-3xl shadow-sm transition-all ${isScrolled ? 'bg-white/80' : 'bg-white/20'}`}>
        <a href="#home" className="text-xl font-black tracking-tighter text-black hover:opacity-70 transition-opacity cursor-pointer">
          Enigmare
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[10px] font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-[0.25em]"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <a href="#contact" className="hidden sm:inline-block px-5 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-gray-800 transition-all hover:shadow-md active:scale-95 text-center">
            Contact Me
          </a>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-black hover:bg-gray-100 rounded-xl transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-full left-4 right-4 mt-2 transition-all duration-300 origin-top ${isMenuOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-95 opacity-0 invisible'}`}>
        <nav className="bg-white/90 backdrop-blur-2xl border border-gray-200/50 rounded-3xl p-6 shadow-xl flex flex-col space-y-6">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-xs font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-[0.3em] py-2 border-b border-gray-50"
            >
              {item}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-gray-800 transition-all text-center">
            Contact Me
          </a>
        </nav>
      </div>
    </div>
  );
};

export default SimpleHeader;
