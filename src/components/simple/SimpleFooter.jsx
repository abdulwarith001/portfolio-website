import React, { useState, useRef, useEffect } from "react";

const SimpleFooter = ({ onReset }) => {
  const [textMousePos, setTextMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringText, setIsHoveringText] = useState(false);
  const textRef = useRef(null);

  // Smooth mouse movement for elastic spotlight and scaling
  const [smoothMousePos, setSmoothMousePos] = useState({ x: 0, y: 0 });
  const requestRef = useRef();

  const characters = "ENIGMARE".split("");
  const charRefs = useRef([]);

  const handleMouseMove = (e) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    setTextMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const animate = () => {
    setSmoothMousePos((prev) => ({
      x: prev.x + (textMousePos.x - prev.x) * 0.1, // Even smoother (0.1)
      y: prev.y + (textMousePos.y - prev.y) * 0.1,
    }));
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [textMousePos]);

  // Function to calculate scale based on distance from smoothMousePos
  const getCharScale = (index) => {
    if (!isHoveringText || !charRefs.current[index] || !textRef.current)
      return 1;

    const charRect = charRefs.current[index].getBoundingClientRect();
    const textRect = textRef.current.getBoundingClientRect();

    // Character center relative to textRef
    const charCenterX = charRect.left + charRect.width / 2 - textRect.left;
    const charCenterY = charRect.top + charRect.height / 2 - textRect.top;

    const distance = Math.sqrt(
      Math.pow(smoothMousePos.x - charCenterX, 2) +
        Math.pow(smoothMousePos.y - charCenterY, 2),
    );

    // Scale effect: max scale of 1.4 within 200px distance
    const maxDistance = 200;
    if (distance > maxDistance) return 1;

    const scaleFactor = 1 + 0.4 * (1 - distance / maxDistance);
    return scaleFactor;
  };

  return (
    <footer className="relative bg-white text-black pt-12 md:pt-24 pb-0 px-6 overflow-hidden border-t border-gray-100 min-h-[40vh] md:min-h-[50vh] flex flex-col items-center justify-between">
      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none mix-blend-overlay z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Background Dotted Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center flex-grow">
        {/* Top Section: Reset Button (Centered) */}
        <div className="flex flex-col items-center mb-16">
          <button
            onClick={onReset}
            className="group flex flex-col items-center space-y-4 transition-all hover:opacity-70"
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-gray-200 group-hover:to-indigo-500 transition-all duration-500"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-gray-400 group-hover:text-black">
              CHOOSE ANOTHER PILL
            </span>
          </button>
        </div>

        {/* Middle Section: Info (Centered) */}
        <div className="flex flex-col items-center space-y-8 mb-auto">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold flex items-center space-x-2">
            <span>Built with</span>
            <span className="text-red-500 animate-pulse text-xs">❤️</span>
            <span>by</span>
            <span className="text-black hover:opacity-70 transition-colors pointer-events-auto cursor-pointer border-b border-transparent hover:border-black">
              Abdulwarith
            </span>
          </div>
        </div>
      </div>

      {/* Large Text Section - Hidden on mobile, Flex on desktop */}
      <div className="relative w-full select-none mt-12  overflow-hidden hidden md:flex justify-center py-12 pointer-events-none">
        <h2
          ref={textRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringText(true)}
          onMouseLeave={() => setIsHoveringText(false)}
          className="flex text-[clamp(3rem,16vw,15rem)] font-black tracking-[0.1em] leading-[0.7] text-center uppercase pointer-events-auto cursor-default"
          style={{
            // The container holds the base colors
            color: "rgba(0, 0, 0, 0.05)",
          }}
        >
          {characters.map((char, i) => (
            <span
              key={i}
              ref={(el) => (charRefs.current[i] = el)}
              className="inline-block transition-all duration-300 ease-out origin-center relative"
              style={{
                transform: `scale(${getCharScale(i)})`,
                // We apply the background-clip to each character for maximum reliability
                backgroundImage: isHoveringText
                  ? `radial-gradient(circle 120px at ${smoothMousePos.x - (charRefs.current[i]?.offsetLeft || 0)}px ${smoothMousePos.y - (charRefs.current[i]?.offsetTop || 0)}px, #000000 0%, rgba(0, 0, 0, 0.05) 90%)`
                  : "none",
                WebkitBackgroundClip: isHoveringText ? "text" : "none",
                WebkitTextFillColor: isHoveringText ? "transparent" : "inherit",
                color: isHoveringText ? "transparent" : "inherit",
              }}
            >
              {char}
            </span>
          ))}
        </h2>
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
    </footer>
  );
};

export default SimpleFooter;
