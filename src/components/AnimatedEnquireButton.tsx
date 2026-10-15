import React, { useEffect, useRef, useState } from 'react';
import { CalendarClock } from 'lucide-react';

const TARGET_TEXT = 'Custom Package';
const CHARS = '!@#$%^&*():{};|,.<>/?';
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

interface AnimatedEnquireButtonProps {
  onClick: () => void;
  className?: string;
}

export const AnimatedEnquireButton: React.FC<AnimatedEnquireButtonProps> = ({ 
  onClick, 
  className = '' 
}) => {
  const [text, setText] = useState(TARGET_TEXT);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopScramble = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setText(TARGET_TEXT);
  };

  const scramble = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (pos / CYCLES_PER_LETTER > index) return char;

          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      onFocus={scramble}
      onBlur={stopScramble}
      className={`group relative isolate overflow-hidden rounded-lg
        bg-[#C2185B] hover:bg-[#AD1457] text-white
        px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold
        transition-all duration-[250ms] ease-out hover:-translate-y-[2px] active:translate-y-0
        shadow-[0_4px_12px_rgba(194,24,91,0.22)] hover:shadow-[0_6px_16px_rgba(194,24,91,0.3)]
        min-h-[40px] cursor-pointer whitespace-nowrap
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2185B] ${className}`}
    >
      {/* Animated Vertical Shimmer Beam (Mirrored sweep on hover / focus) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 animate-beam-sweep
          bg-gradient-to-t from-rose-300/0
          via-white/25 to-rose-300/0
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      <span className="relative z-10 flex items-center gap-1.5">
        <CalendarClock className="w-4 h-4 text-white shrink-0" aria-hidden="true" />
        <span aria-label={TARGET_TEXT} className="inline-block min-w-[105px] text-left text-white">
          {text}
        </span>
      </span>
    </button>
  );
};

export default AnimatedEnquireButton;
