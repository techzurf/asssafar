import React, { useEffect, useRef, useState } from 'react';
import { CalendarClock } from 'lucide-react';

const TARGET_TEXT = 'Enquire Now';
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
        bg-[#0B5D4B] hover:bg-[#084538] text-white
        px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold
        transition-all duration-200 hover:scale-[1.025] active:scale-[0.975]
        shadow-sm hover:shadow min-h-[40px] cursor-pointer whitespace-nowrap
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24D] ${className}`}
    >
      {/* Animated Vertical Shimmer Beam (Mirrored sweep on hover / focus) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 animate-beam-sweep
          bg-gradient-to-t from-emerald-400/0
          via-emerald-400/50 to-emerald-400/0
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      <span className="relative z-10 flex items-center gap-1.5">
        <CalendarClock className="w-4 h-4 text-[#C9A24D] shrink-0" aria-hidden="true" />
        <span aria-label={TARGET_TEXT} className="inline-block min-w-[78px] text-left">
          {text}
        </span>
      </span>
    </button>
  );
};

export default AnimatedEnquireButton;
