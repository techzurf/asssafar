import React from 'react';
import { ShieldCheck, Award, FileCheck } from 'lucide-react';

interface LicenseBadgeProps {
  className?: string;
  variant?: 'card' | 'compact' | 'footer' | 'hanging';
}

export const LicenseBadge: React.FC<LicenseBadgeProps> = ({
  className = '',
  variant = 'card',
}) => {
  if (variant === 'hanging') {
    return (
      <div className={`hanging-license-wrapper flex flex-col items-center pointer-events-none ${className}`}>
        {/* One Single Thin Chain extended vertically downward to overlap top of hero slider */}
        <div className="w-[1.5px] h-[38px] sm:h-[52px] md:h-[66px] lg:h-[70px] bg-gradient-to-b from-[#64748B] via-[#94A3B8] to-[#CBD5E1] shadow-2xs" />

        {/* Small, Minimal, Elegant Tag hanging across white header and top of hero slider */}
        <div className="hanging-license-tag pointer-events-auto bg-white/95 backdrop-blur-xs border border-[#E2E8F0] shadow-xs rounded-md px-1.5 sm:px-2.5 py-0.5 sm:py-1 flex items-center gap-1 sm:gap-1.5 transition-transform duration-200 hover:scale-102">
          <ShieldCheck className="w-3 h-3 text-[#475569] shrink-0" />
          <div className="flex items-center gap-1">
            <span className="text-[9px] sm:text-[10px] text-[#64748B] font-medium hidden sm:inline">
              Reg:
            </span>
            <code className="text-[9px] sm:text-[11px] font-bold font-mono text-[#1F2937] tracking-tight whitespace-nowrap select-all">
              TN03786327/Cat-II/29848/2027
            </code>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact' || variant === 'footer') {
    return (
      <div
        className={`inline-flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-[#C9A24D]/40 text-white shadow-xs max-w-full overflow-hidden ${className}`}
      >
        <div className="w-9 h-9 rounded-lg bg-[#C9A24D] text-[#07382E] flex items-center justify-center shrink-0 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-[#07382E]" />
        </div>
        <div className="min-w-0 flex-1 text-left">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FFCE1B] block leading-tight truncate">
            REGISTERED TRAVEL AGENCY
          </span>
          <p className="text-[11px] text-[#EAF3EF]/90 mt-0.5 truncate">
            <span className="text-[#EAF3EF]/70 font-medium">Reg. No. </span>
            <span className="font-mono font-bold text-white select-all">
              TN03786327/Cat-II/29848/2027
            </span>
          </p>
        </div>
      </div>
    );
  }

  // Full Prominent Badge Card (for Homepage About / Company Intro)
  return (
    <div
      className={`bg-[#FFFFFF] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 border-[#0B5D4B] shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl ${className}`}
    >
      {/* Decorative Gold Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0B5D4B] via-[#C9A24D] to-[#0B5D4B]" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
        {/* Shield / Award Icon */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#F5F3EE] border border-[#C9A24D]/50 flex items-center justify-center shrink-0 shadow-xs text-[#0B5D4B]">
          <div className="relative">
            <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#0B5D4B]" />
            <Award className="w-3.5 h-3.5 text-[#C9A24D] absolute -bottom-1 -right-1" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1 text-left w-full">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0B5D4B]/10 text-[#0B5D4B] font-extrabold text-[11px] sm:text-xs uppercase tracking-wider border border-[#0B5D4B]/20">
              REGISTERED TRAVEL AGENCY
            </span>
            <span className="text-[10px] text-[#777777] font-semibold flex items-center gap-1">
              <FileCheck className="w-3 h-3 text-[#C9A24D]" />
              <span>Official License</span>
            </span>
          </div>

          <p className="text-xs text-[#555555] font-semibold mt-1">
            Registration Number
          </p>

          <div className="mt-1">
            <div className="inline-block w-full sm:w-auto bg-[#F8F7F3] border border-[#0B5D4B]/30 rounded-xl px-3.5 py-2 shadow-2xs">
              <code className="text-sm sm:text-base font-bold font-mono text-[#0B5D4B] tracking-tight break-all select-all">
                TN03786327/Cat-II/29848/2027
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
