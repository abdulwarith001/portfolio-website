import React, { useState, useRef, useEffect, useCallback } from "react";

const SimpleFooter = () => {
  const [isHoveringText, setIsHoveringText] = useState(false);
  const textRef = useRef(null);
  const charRefs = useRef([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const smoothMousePosRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const requestRef = useRef(null);

  const characters = "ENIGMARE".split("");

  const updateCharacterDOM = useCallback(() => {
    if (!textRef.current) return;
    const textRect = textRef.current.getBoundingClientRect();
    const maxDistance = 200;
    const hovering = isHoveringRef.current;
    const smoothX = smoothMousePosRef.current.x;
    const smoothY = smoothMousePosRef.current.y;

    characters.forEach((_, i) => {
      const el = charRefs.current[i];
      if (!el) return;

      if (!hovering) {
        el.style.transform = "scale(1)";
        el.style.backgroundImage = "none";
        el.style.webkitBackgroundClip = "none";
        el.style.webkitTextFillColor = "inherit";
        el.style.color = "inherit";
        return;
      }

      const charRect = el.getBoundingClientRect();
      const charCenterX = charRect.left + charRect.width / 2 - textRect.left;
      const charCenterY = charRect.top + charRect.height / 2 - textRect.top;
      const distance = Math.sqrt(
        Math.pow(smoothX - charCenterX, 2) + Math.pow(smoothY - charCenterY, 2)
      );

      const scale =
        distance > maxDistance ? 1 : 1 + 0.35 * (1 - distance / maxDistance);
      el.style.transform = `scale(${scale})`;

      const relX = smoothX - el.offsetLeft;
      const relY = smoothY - el.offsetTop;
      el.style.backgroundImage = `radial-gradient(circle 120px at ${relX}px ${relY}px, #000000 0%, rgba(0, 0, 0, 0.05) 90%)`;
      el.style.webkitBackgroundClip = "text";
      el.style.webkitTextFillColor = "transparent";
      el.style.color = "transparent";
    });
  }, [characters]);

  useEffect(() => {
    isHoveringRef.current = isHoveringText;
    if (!isHoveringText) {
      updateCharacterDOM();
    }
  }, [isHoveringText, updateCharacterDOM]);

  const handleMouseMove = (e) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  useEffect(() => {
    const loop = () => {
      if (isHoveringRef.current) {
        smoothMousePosRef.current = {
          x:
            smoothMousePosRef.current.x +
            (mousePosRef.current.x - smoothMousePosRef.current.x) * 0.15,
          y:
            smoothMousePosRef.current.y +
            (mousePosRef.current.y - smoothMousePosRef.current.y) * 0.15,
        };
        updateCharacterDOM();
      }
      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [updateCharacterDOM]);

  return (
    <footer className="relative bg-white text-black pt-16 pb-0 px-6 overflow-hidden border-t border-gray-100 min-h-[35vh] flex flex-col items-center justify-between">
      {/* Background Dotted Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="max-w-5xl w-full mx-auto relative z-10 flex flex-col items-center">
        {/* Info (Centered) */}
        <div className="flex flex-col items-center space-y-4">
          <div className="text-[11px] uppercase tracking-[0.25em] text-gray-400 font-semibold flex items-center space-x-2">
            <span>Built by</span>
            <span className="text-black font-bold">Abdulwarith</span>
            <span>·</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </div>

      {/* Large Text Section */}
      <div className="relative w-full select-none mt-12 overflow-hidden hidden md:flex justify-center py-10 pointer-events-none">
        <h2
          ref={textRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringText(true)}
          onMouseLeave={() => setIsHoveringText(false)}
          className="flex text-[clamp(3rem,15vw,14rem)] font-black tracking-[0.08em] leading-[0.7] text-center uppercase pointer-events-auto cursor-default"
          style={{
            color: "rgba(0, 0, 0, 0.05)",
          }}
        >
          {characters.map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                charRefs.current[i] = el;
              }}
              className="inline-block transition-transform duration-100 ease-out origin-center relative"
            >
              {char}
            </span>
          ))}
        </h2>
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </footer>
  );
};

export default SimpleFooter;
