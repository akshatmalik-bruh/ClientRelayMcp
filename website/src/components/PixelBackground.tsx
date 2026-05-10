import React, { useEffect, useRef } from 'react';

const COLORS = [
  '#00ffff', // Cyan
  '#ff00ff', // Magenta
  '#ffffff', // White
  '#a855f7', // Purple
];

interface Star {
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
  shineIntensity: number; // 0-1, only bright stars get the cross-spike shine
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
}

const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const nebulasRef = useRef<Nebula[]>([]);
  const animFrameRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable background for mobile performance
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const STAR_COUNT = 280;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initGalaxy();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX - window.innerWidth / 2) * 0.05,
        y: (e.clientY - window.innerHeight / 2) * 0.05,
      };
    };

    const initGalaxy = () => {
      starsRef.current = Array.from({ length: STAR_COUNT }, () => {
        const size = Math.random() * 3 + 0.4;
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size,
          twinkleSpeed: Math.random() * 0.025 + 0.008,
          phase: Math.random() * Math.PI * 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          // Only larger stars get the dramatic cross-shine effect
          shineIntensity: size > 2 ? Math.random() * 0.8 + 0.2 : 0,
        };
      });

      nebulasRef.current = [
        {
          x: window.innerWidth * 0.2,
          y: window.innerHeight * 0.3,
          radius: window.innerWidth * 0.65,
          color: 'rgba(255, 0, 255, 0.04)',
        },
        {
          x: window.innerWidth * 0.8,
          y: window.innerHeight * 0.7,
          radius: window.innerWidth * 0.55,
          color: 'rgba(0, 255, 255, 0.04)',
        },
        {
          x: window.innerWidth * 0.5,
          y: window.innerHeight * 0.5,
          radius: window.innerWidth * 0.4,
          color: 'rgba(168, 85, 247, 0.03)',
        },
      ];
    };

    // Draw a cross-spike shine effect (like a real telescope star)
    const drawStarShine = (
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      intensity: number
    ) => {
      const spikeLen = size * 12 * intensity * opacity;
      if (spikeLen < 1) return;

      const gradient = ctx.createLinearGradient(x - spikeLen, y, x + spikeLen, y);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.5, color);
      gradient.addColorStop(1, 'transparent');

      const gradientV = ctx.createLinearGradient(x, y - spikeLen, x, y + spikeLen);
      gradientV.addColorStop(0, 'transparent');
      gradientV.addColorStop(0.5, color);
      gradientV.addColorStop(1, 'transparent');

      ctx.save();
      ctx.globalAlpha = opacity * intensity * 0.6;

      // Horizontal spike
      ctx.strokeStyle = gradient;
      ctx.lineWidth = size * 0.3;
      ctx.beginPath();
      ctx.moveTo(x - spikeLen, y);
      ctx.lineTo(x + spikeLen, y);
      ctx.stroke();

      // Vertical spike
      ctx.strokeStyle = gradientV;
      ctx.beginPath();
      ctx.moveTo(x, y - spikeLen);
      ctx.lineTo(x, y + spikeLen);
      ctx.stroke();

      // Diagonal spikes (shorter, fainter)
      const diagLen = spikeLen * 0.5;
      ctx.globalAlpha = opacity * intensity * 0.25;
      ctx.lineWidth = size * 0.15;

      ctx.beginPath();
      ctx.moveTo(x - diagLen, y - diagLen);
      ctx.lineTo(x + diagLen, y + diagLen);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x + diagLen, y - diagLen);
      ctx.lineTo(x - diagLen, y + diagLen);
      ctx.stroke();

      ctx.restore();
    };

    const draw = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const offsetX = mouseRef.current.x;
      const offsetY = mouseRef.current.y;

      // Draw Nebulas (parallax layer 1 - slowest)
      nebulasRef.current.forEach(n => {
        const nx = n.x - offsetX * 0.4;
        const ny = n.y - offsetY * 0.4;
        const gradient = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.radius);
        gradient.addColorStop(0, n.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Draw Stars with shine (parallax layer 2)
      starsRef.current.forEach(s => {
        s.phase += s.twinkleSpeed;

        // Smooth sine-based twinkling — peaks and valleys
        const rawOpacity = (Math.sin(s.phase) + 1) / 2;
        const currentOpacity = rawOpacity * 0.75 + 0.25;

        // Wrap with parallax
        let sx = (s.x - offsetX) % window.innerWidth;
        let sy = (s.y - offsetY) % window.innerHeight;
        if (sx < 0) sx += window.innerWidth;
        if (sy < 0) sy += window.innerHeight;

        // Draw cross-spike shine BEHIND the star (only for bright stars at peak brightness)
        if (s.shineIntensity > 0 && rawOpacity > 0.5) {
          drawStarShine(sx, sy, s.size, s.color, rawOpacity, s.shineIntensity);
        }

        // Draw multi-layer glow for larger stars
        if (s.size > 1.5) {
          ctx.beginPath();
          ctx.arc(sx, sy, s.size * 2.5, 0, Math.PI * 2);
          const outerGlow = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.size * 2.5);
          outerGlow.addColorStop(0, s.color + '33');
          outerGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = outerGlow;
          ctx.globalAlpha = currentOpacity * 0.6;
          ctx.fill();
        }

        // Core star dot
        ctx.globalAlpha = currentOpacity;
        ctx.shadowBlur = s.size * 8;
        ctx.shadowColor = s.color;
        ctx.fillStyle = s.color;

        ctx.beginPath();
        ctx.arc(sx, sy, s.size / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 hidden md:block"
    />
  );
};

export default GalaxyBackground;
