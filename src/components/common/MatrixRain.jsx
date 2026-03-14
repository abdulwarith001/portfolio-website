import React, { useEffect, useRef } from 'react';

const MatrixRain = ({ colorHex = '#0F0', opacity = 0.8 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to window size
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters - Katakana + Latin + Numerals
    const charset = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const matrixChars = charset.split('');

    const fontSize = 16;
    let columns = Math.ceil(canvas.width / fontSize);
    let drops = Array(columns).fill(1).map(() => Math.random() * -100);

    // Draw frame
    const draw = () => {
      // Create trailing effect by drawing a semi-transparent black rectangle
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = colorHex; // Dynamic color based on props
      ctx.font = fontSize + 'px monospace';
      
      // Update columns if canvas resized significantly
      const currentCols = Math.ceil(canvas.width / fontSize);
      if (currentCols > columns) {
        drops = [...drops, ...Array(currentCols - columns).fill(0)];
        columns = currentCols;
      }

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        
        ctx.globalAlpha = opacity;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        ctx.globalAlpha = 1.0;

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30fps

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [colorHex, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default MatrixRain;
