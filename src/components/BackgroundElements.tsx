import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const useParallax = (speed: number) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const offsetX = (clientX - innerWidth / 2) * speed;
        const offsetY = (clientY - innerHeight / 2) * speed;

        setPosition({ x: offsetX, y: offsetY });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [speed]);

  return { ref, position };
};

export const BackgroundElements = () => {
  const navBarWidth = 250;

  const elements = {
    // Parallax speeds for different layers
    smallDiamond: useParallax(0.15),
    triangle: useParallax(0.12),
    plus: useParallax(0.1),
    star: useParallax(0.09),
    diamond: useParallax(0.08),
    dots: useParallax(0.07),
    squigglyLine: useParallax(0.06),
    smallCircle: useParallax(0.06),
    hexagon: useParallax(0.05),
    cross: useParallax(0.04),
    wave: useParallax(0.03),
    heart: useParallax(0.05),
    moon: useParallax(0.025),
    line: useParallax(0.02),
    // New elements to match the uploaded image
    topLeftCircle: useParallax(0.11),
    bottomRightCircle: useParallax(0.07),
    zigzag: useParallax(0.05),
    square: useParallax(0.09),
    topMiddlePentagon: useParallax(0.1),
  };

  const elementStyle = {
    position: 'absolute',
    pointerEvents: 'none',
    transition: 'transform 0.08s ease-out',
    zIndex: 0,
    opacity: 0.7,
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* ======================= Top-Left Zone (Matching Image) ======================= */}
      <Box
        ref={elements.topLeftCircle.ref}
        sx={{
          ...elementStyle,
          left: `${navBarWidth + 60}px`,
          top: '8%',
          opacity: 0.9,
          transform: `translate(${elements.topLeftCircle.position.x * 0.4}px, ${elements.topLeftCircle.position.y * 0.4}px)`,
        }}
      >
        <svg width="25" height="25" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8" fill="none" stroke="#4dd0e1" strokeWidth="2" />
        </svg>
      </Box>
      <Box
  ref={elements.topMiddlePentagon.ref}
  sx={{
    ...elementStyle,
    left: '50%',
    top: '5%',
    opacity: 0.85,
    transform: `translate(-50%, ${elements.topMiddlePentagon.position.y * 0.2}px)`,
  }}
>
  <svg width="28" height="28" viewBox="0 0 24 24">
    <polygon points="12,2 22,9 18,22 6,22 2,9" fill="none" stroke="#00BCD4" strokeWidth="2" />
  </svg>
</Box>


      <Box
        ref={elements.smallDiamond.ref}
        sx={{
          ...elementStyle,
          left: `${navBarWidth + 120}px`,
          top: '20%',
          opacity: 0.8,
          transform: `translate(${elements.smallDiamond.position.x * 0.4}px, ${elements.smallDiamond.position.y * 0.4}px)`,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <polygon points="10,2 18,10 10,18 2,10" fill="none" stroke="#FF5722" strokeWidth="1.5" />
        </svg>
      </Box>

      <Box
        ref={elements.triangle.ref}
        sx={{
          ...elementStyle,
          left: `${navBarWidth + 190}px`,
          top: '30%',
          opacity: 0.7,
          transform: `translate(${elements.triangle.position.x * 0.3}px, ${elements.triangle.position.y * 0.3}px)`,
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24">
          <polygon points="12,20 6,8 18,8" fill="none" stroke="#FFD966" strokeWidth="2" />
        </svg>
      </Box>

      {/* ======================= Top-Right Zone (Matching Image) ======================= */}
      <Box
        ref={elements.star.ref}
        sx={{
          ...elementStyle,
          right: '15%',
          top: '15%',
          opacity: 0.8,
          transform: `translate(${elements.star.position.x * 0.2}px, ${elements.star.position.y * 0.2}px)`,
        }}
      >
        <svg width="30" height="30" viewBox="0 0 20 20">
          <polygon points="10,2 12,7 18,7 14,10 16,15 10,12 4,15 6,10 2,7 8,7" fill="none" stroke="#FFAB00" strokeWidth="1.5" />
        </svg>
      </Box>

      <Box
        ref={elements.zigzag.ref}
        sx={{
          ...elementStyle,
          right: '5%',
          top: '25%',
          opacity: 0.6,
          transform: `translate(${elements.zigzag.position.x * 0.25}px, ${elements.zigzag.position.y * 0.25}px)`,
        }}
      >
        <svg width="40" height="20" viewBox="0 0 40 20">
          <polyline points="0,10 10,0 20,10 30,0 40,10" fill="none" stroke="#607d8b" strokeWidth="2" />
        </svg>
      </Box>

      <Box
        ref={elements.square.ref}
        sx={{
          ...elementStyle,
          right: '25%',
          top: '5%',
          opacity: 0.9,
          transform: `translate(${elements.square.position.x * 0.15}px, ${elements.square.position.y * 0.15}px)`,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <rect x="2" y="2" width="16" height="16" fill="none" stroke="#673AB7" strokeWidth="2" />
        </svg>
      </Box>

      {/* ======================= Mid-Screen Zone (Matching Image) ======================= */}
      <Box
        ref={elements.diamond.ref}
        sx={{
          ...elementStyle,
          left: '20%',
          top: '45%',
          opacity: 0.7,
          transform: `translate(${elements.diamond.position.x * 0.3}px, ${elements.diamond.position.y * 0.3}px)`,
        }}
      >
        <svg width="30" height="30" viewBox="0 0 20 20">
          <polygon points="10,2 18,10 10,18 2,10" fill="none" stroke="#71F37A" strokeWidth="2" />
        </svg>
      </Box>

      <Box
        ref={elements.squigglyLine.ref}
        sx={{
          ...elementStyle,
          right: '15%',
          top: '50%',
          opacity: 0.6,
          transform: `translate(${elements.squigglyLine.position.x * 0.15}px, ${elements.squigglyLine.position.y * 0.15}px)`,
        }}
      >
        <svg width="50" height="20" viewBox="0 0 50 20">
          <path d="M5,10 Q15,0 25,10 T45,10" fill="none" stroke="#d5b234" strokeWidth="2" />
        </svg>
      </Box>

      <Box
        ref={elements.wave.ref}
        sx={{
          ...elementStyle,
          left: '50%',
          top: '30%',
          opacity: 0.4,
          transform: `translate(${elements.wave.position.x * 0.1}px, ${elements.wave.position.y * 0.1}px)`,
        }}
      >
        <svg width="40" height="30" viewBox="0 0 24 16">
          <path d="M0,8 C4,4 8,12 12,8 C16,4 20,12 24,8" fill="none" stroke="#03A9F4" strokeWidth="2" />
        </svg>
      </Box>

      {/* ======================= Bottom-Left Zone (Matching Image) ======================= */}
      <Box
        ref={elements.plus.ref}
        sx={{
          ...elementStyle,
          left: '10%',
          bottom: '20%',
          opacity: 0.8,
          transform: `translate(${elements.plus.position.x * 0.2}px, ${elements.plus.position.y * 0.2}px)`,
        }}
      >
        <svg width="30" height="30" viewBox="0 0 16 16">
          <line x1="8" y1="2" x2="8" y2="14" stroke="#4CAF50" strokeWidth="2" />
          <line x1="2" y1="8" x2="14" y2="8" stroke="#4CAF50" strokeWidth="2" />
        </svg>
      </Box>

      <Box
        ref={elements.heart.ref}
        sx={{
          ...elementStyle,
          left: '25%',
          bottom: '10%',
          opacity: 0.5,
          transform: `translate(${elements.heart.position.x * 0.1}px, ${elements.heart.position.y * 0.1}px)`,
        }}
      >
        <svg width="30" height="27" viewBox="0 0 20 18">
          <path d="M10,3 C7,0 0,2 10,12 C20,2 13,0 10,3" fill="none" stroke="#F44336" strokeWidth="2" />
        </svg>
      </Box>

      {/* ======================= Bottom-Right Zone (Matching Image) ======================= */}
      <Box
        ref={elements.hexagon.ref}
        sx={{
          ...elementStyle,
          right: '10%',
          bottom: '25%',
          opacity: 0.7,
          transform: `translate(${elements.hexagon.position.x * 0.2}px, ${elements.hexagon.position.y * 0.2}px)`,
        }}
      >
        <svg width="30" height="30" viewBox="0 0 22 22">
          <polygon points="11,2 19,7 19,15 11,20 3,15 3,7" fill="none" stroke="#FF6666" strokeWidth="2" />
        </svg>
      </Box>

      <Box
        ref={elements.bottomRightCircle.ref}
        sx={{
          ...elementStyle,
          right: '25%',
          bottom: '40%',
          opacity: 0.6,
          transform: `translate(${elements.bottomRightCircle.position.x * 0.1}px, ${elements.bottomRightCircle.position.y * 0.1}px)`,
        }}
      >
        <svg width="25" height="25" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8" fill="none" stroke="#FF6666" strokeWidth="2" />
        </svg>
      </Box>
      <Box
        ref={elements.diamond.ref}
        sx={{
          ...elementStyle,
          right: '50%',
          bottom: '5%',
          opacity: 0.9,
          transform: `translate(${elements.diamond.position.x * 0.3}px, ${elements.diamond.position.y * 0.3}px)`,
        }}
      >
        <svg width="30" height="30" viewBox="0 0 18 18">
          <polygon points="3,3 15,3 15,15 3,15" fill="none" stroke="#f7ea37" strokeWidth="2" />
         
        </svg>
      </Box>

      <Box
        ref={elements.cross.ref}
        sx={{
          ...elementStyle,
          right: '15%',
          bottom: '5%',
          opacity: 0.9,
          transform: `translate(${elements.cross.position.x * 0.3}px, ${elements.cross.position.y * 0.3}px)`,
        }}
      >
        <svg width="30" height="30" viewBox="0 0 18 18">
          <line x1="3" y1="3" x2="15" y2="15" stroke="#9C27B0" strokeWidth="2" />
          <line x1="3" y1="15" x2="15" y2="3" stroke="#9C27B0" strokeWidth="2" />
        </svg>
      </Box>
    </Box>
  );
};