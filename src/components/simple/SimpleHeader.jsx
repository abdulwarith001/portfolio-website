import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const SimpleHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Projects", href: isHome ? "#projects" : "/#projects" },
    { name: "Technical Reports", href: "/technical-reports" },
    { name: "Capabilities", href: isHome ? "#capabilities" : "/#capabilities" },
    { name: "About", href: isHome ? "#about" : "/#about" },
    { name: "Contact", href: isHome ? "#contact" : "/#contact" }
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "pt-2" : "pt-6"
      } px-4`}
    >
      <header
        className={`w-full max-w-5xl mx-auto backdrop-blur-xl border border-gray-200/60 px-6 py-3 flex justify-between items-center rounded-2xl shadow-sm transition-all ${
          isScrolled ? "bg-white/90" : "bg-white/70"
        }`}
      >
        <Link
          to="/"
          className="text-lg font-black tracking-tight text-black hover:opacity-70 transition-opacity"
        >
          Abdulwarith
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xs font-semibold text-gray-500 hover:text-black transition-colors uppercase tracking-wider"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <a
            href={isHome ? "#contact" : "/#contact"}
            className="hidden sm:inline-block px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all active:scale-95"
          >
            Contact
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle Navigation"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 bg-white/95 backdrop-blur-2xl border border-gray-200/70 rounded-2xl p-6 shadow-lg flex flex-col space-y-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-xs font-bold text-gray-600 hover:text-black uppercase tracking-wider py-1 border-b border-gray-50"
            >
              {item.name}
            </a>
          ))}
          <a
            href={isHome ? "#contact" : "/#contact"}
            onClick={() => setIsMenuOpen(false)}
            className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all text-center"
          >
            Contact
          </a>
        </div>
      )}
    </div>
  );
};

export default SimpleHeader;
