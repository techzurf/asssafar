import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

interface FloatingApplyButtonProps {
  onOpen: () => void;
}

export const FloatingApplyButton: React.FC<FloatingApplyButtonProps> = ({ onOpen }) => {
  return (
    <aside
      aria-label="Hajj and Umrah Application Form floating trigger"
      className="fixed z-40 right-3 sm:right-4 md:right-8 bottom-[136px] md:bottom-[92px] transition-all duration-300 select-none print:hidden"
    >
      <button
        type="button"
        onClick={onOpen}
        className="group relative flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] hover:from-[#1D4ED8] hover:to-[#0284C7] text-white p-3 sm:px-4 sm:py-3 rounded-full border-2 border-[#C9973D] shadow-[0_8px_22px_rgba(37,99,235,0.45)] hover:shadow-[0_12px_28px_rgba(14,165,233,0.55)] transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C9973D] focus:ring-offset-2 cursor-pointer"
        aria-label="Open Hajj & Umrah Application Form"
        title="Apply Now - Hajj & Umrah Application Form"
      >
        {/* Gold shine background effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Document / Application Icon with badge indicator */}
        <div className="relative flex items-center justify-center">
          <FileText className="w-5 h-5 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform duration-200 drop-shadow-sm" />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9973D] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5D58A]" />
          </span>
        </div>

        {/* Label */}
        <span className="font-extrabold text-xs sm:text-sm tracking-wide text-white uppercase whitespace-nowrap flex items-center gap-1.5 font-serif drop-shadow-sm">
          <span>Apply Now</span>
          <Sparkles className="w-3.5 h-3.5 text-[#F5D58A] hidden sm:inline-block" />
        </span>
      </button>
    </aside>
  );
};
