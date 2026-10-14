import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/919566369654?text=${encodeURIComponent(BRAND_INFO.whatsappMessage)}`;

  return (
    <div className="fixed z-40 flex flex-col items-end gap-2.5 bottom-[76px] right-3 sm:right-4 md:bottom-8 md:right-8 transition-all duration-300">
      {/* Quick Mobile Call Pill (shown cleanly on small screens) */}
      <a
        href={`tel:${BRAND_INFO.phoneTel}`}
        className="sm:hidden flex items-center gap-1.5 bg-[#17332D] text-white px-3 py-2 rounded-full shadow-lg text-xs font-semibold hover:bg-[#0B5D4B] transition-transform active:scale-95"
        aria-label="Call As-Safar"
      >
        <Phone className="w-3.5 h-3.5 text-[#C9A24D]" />
        <span>Call</span>
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-[0_8px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_10px_24px_rgba(37,211,102,0.45)] transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Chat with As-Safar on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="hidden sm:inline font-medium text-sm whitespace-nowrap">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
};
