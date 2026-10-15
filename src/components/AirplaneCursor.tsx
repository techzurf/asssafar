import React, { useEffect, useRef, useState } from 'react';

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
  age: number;
}

export const AirplaneCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // References for animation loop
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);

  // State refs for 60fps rAF loop without triggering React re-renders
  const mousePos = useRef({ x: -100, y: -100 });
  const planePos = useRef({ x: -100, y: -100 });
  const lastMousePos = useRef({ x: -100, y: -100 });
  const planeAngle = useRef(0);
  const targetAngle = useRef(0);
  const idleFrames = useRef(0);
  const trailPoints = useRef<TrailPoint[]>([]);
  const pointCounter = useRef(0);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Check if the device has a mouse / fine pointer and supports hover
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!mediaQuery.matches || prefersReducedMotion.matches) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);
    document.documentElement.classList.add('airplane-cursor-enabled');

    const checkInteractive = (target: HTMLElement | null): boolean => {
      if (!target) return false;
      const interactiveSelector =
        'a, button, [role="button"], [role="tab"], [role="link"], [role="menuitem"], [role="option"], input, select, textarea, summary, label, .clickable, .cursor-pointer, .umrah-package-card, .google-reviews-card, [onclick], [onClick], [data-interactive="true"]';
      let isInteractive = Boolean(target.closest(interactiveSelector));

      if (!isInteractive) {
        try {
          const computedCursor = window.getComputedStyle(target).cursor;
          if (computedCursor === 'pointer' || computedCursor === 'text') {
            isInteractive = true;
          }
        } catch {
          // ignore
        }
      }
      return isInteractive;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      setIsHovering(checkInteractive(target));
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setIsHovering(checkInteractive(target));
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Resize trail canvas to match viewport
    const resizeCanvas = () => {
      if (trailCanvasRef.current) {
        trailCanvasRef.current.width = window.innerWidth;
        trailCanvasRef.current.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation Loop
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // Initialize on first move
      if (planePos.current.x < 0) {
        planePos.current = { x: targetX, y: targetY };
        lastMousePos.current = { x: targetX, y: targetY };
      }

      // Linear interpolation for smooth tracking (lerp factor ~ 0.28)
      const lerp = 0.28;
      planePos.current.x += (targetX - planePos.current.x) * lerp;
      planePos.current.y += (targetY - planePos.current.y) * lerp;

      // Calculate direction from delta
      const dx = targetX - lastMousePos.current.x;
      const dy = targetY - lastMousePos.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 1.2) {
        idleFrames.current = 0;
        // SVG nose points right (0 deg)
        targetAngle.current = Math.atan2(dy, dx) * (180 / Math.PI);

        // Add flight trail point from tail/engine
        // Tail is approximately 14px backwards from center along flight angle
        const rad = (planeAngle.current * Math.PI) / 180;
        const tailX = planePos.current.x - Math.cos(rad) * 12;
        const tailY = planePos.current.y - Math.sin(rad) * 12;

        pointCounter.current += 1;
        if (pointCounter.current % 2 === 0) {
          trailPoints.current.push({
            id: Math.random(),
            x: tailX,
            y: tailY,
            opacity: 0.65,
            size: 2.8,
            age: 0,
          });

          // Limit trail length to 14 points
          if (trailPoints.current.length > 14) {
            trailPoints.current.shift();
          }
        }
      } else {
        idleFrames.current += 1;
      }

      lastMousePos.current = { x: targetX, y: targetY };

      // Shortest angle difference interpolation
      let angleDiff = targetAngle.current - planeAngle.current;
      while (angleDiff < -180) angleDiff += 360;
      while (angleDiff > 180) angleDiff -= 360;
      planeAngle.current += angleDiff * 0.18;

      // Update Cursor Element Transform
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${planePos.current.x}px, ${planePos.current.y}px, 0px) rotate(${planeAngle.current}deg)`;
      }

      // Update and Render Flight Trail on Canvas
      const canvas = trailCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Update trail points
          for (let i = trailPoints.current.length - 1; i >= 0; i--) {
            const p = trailPoints.current[i];
            p.age += dt;
            p.opacity -= dt * 1.8; // Fades out in ~400-500ms
            p.size = Math.max(0.6, p.size - dt * 2.5);

            if (p.opacity <= 0 || p.size <= 0.6) {
              trailPoints.current.splice(i, 1);
              continue;
            }

            // Draw glowing soft gold/white vapor contrail dot
            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(201, 151, 61, ${p.opacity * 0.85})`;
            ctx.shadowColor = 'rgba(245, 213, 138, 0.6)';
            ctx.shadowBlur = 4;
            ctx.fill();

            // Center highlight
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.9})`;
            ctx.fill();
            ctx.restore();
          }
        }
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      document.documentElement.classList.remove('airplane-cursor-enabled');
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Flight Trail Canvas */}
      <canvas
        ref={trailCanvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isVisible && !isHovering ? 1 : 0,
          transition: 'opacity 150ms ease-out',
        }}
      />

      {/* Airplane Cursor */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 -ml-[14px] -mt-[14px] w-[28px] h-[28px] pointer-events-none will-change-transform"
        style={{
          opacity: isVisible && !isHovering ? 1 : 0,
          transition: 'opacity 150ms ease-out',
        }}
      >
        <div
          className={`w-full h-full flex items-center justify-center transition-transform duration-200 ease-out ${
            isClicking ? 'scale-90' : 'scale-100'
          }`}
        >
          {/* Premium As-Safar Airplane SVG */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] drop-shadow-[0_0_2px_rgba(201,151,61,0.5)]"
          >
            {/* Main Swept Wings (Deep Green #075C4B with Gold tips) */}
            <path
              d="M17 14L10 3C9.4 2.2 8.4 2.5 8.7 3.5L11.5 14H17Z"
              fill="#075C4B"
              stroke="#04382E"
              strokeWidth="0.6"
            />
            <path
              d="M17 18L10 29C9.4 29.8 8.4 29.5 8.7 28.5L11.5 18H17Z"
              fill="#075C4B"
              stroke="#04382E"
              strokeWidth="0.6"
            />

            {/* Wingtips in As-Safar Gold */}
            <polygon points="10,3 8.7,3.5 10.2,6 11,4" fill="#C9973D" />
            <polygon points="10,29 8.7,28.5 10.2,26 11,28" fill="#C9973D" />

            {/* Twin Jet Engines under wings */}
            <rect
              x="12"
              y="9"
              width="5"
              height="2"
              rx="1"
              fill="#C9973D"
              stroke="#8C651F"
              strokeWidth="0.4"
            />
            <rect
              x="12"
              y="21"
              width="5"
              height="2"
              rx="1"
              fill="#C9973D"
              stroke="#8C651F"
              strokeWidth="0.4"
            />

            {/* Horizontal Stabilizers / Tail Wings */}
            <path
              d="M6 14L2.8 8.5C2.5 8 1.9 8.2 2.1 8.8L3.8 14H6Z"
              fill="#075C4B"
            />
            <path
              d="M6 18L2.8 23.5C2.5 24 1.9 23.8 2.1 23.2L3.8 18H6Z"
              fill="#075C4B"
            />

            {/* Fuselage / Main Airplane Body */}
            <path
              d="M2 16C2 14.5 4 13.5 10 13.5C18 13.5 26 14.3 30 16C26 17.7 18 18.5 10 18.5C4 18.5 2 17.5 2 16Z"
              fill="#075C4B"
              stroke="#C9973D"
              strokeWidth="0.75"
            />

            {/* Central Pinstripe Gold Brand Line */}
            <line
              x1="5"
              y1="16"
              x2="27"
              y2="16"
              stroke="#C9973D"
              strokeWidth="0.6"
            />

            {/* Cockpit Canopy Window (White / Gold reflection) */}
            <path
              d="M25 15C26 15 28 15.5 29 16C28 16.5 26 17 25 17C24.5 17 24.5 15 25 15Z"
              fill="#FFFFFF"
              opacity="0.95"
            />

            {/* Vertical Stabilizer Fin Highlight (Gold accent on tail) */}
            <polygon points="2,16 5,14.8 5,17.2" fill="#F5D58A" />
          </svg>
        </div>
      </div>
    </div>
  );
};
