import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/919566369654?text=${encodeURIComponent(BRAND_INFO.whatsappMessage)}`;

  return (
    <div className="fixed z-40 bottom-[76px] right-3 sm:right-4 md:bottom-8 md:right-8 transition-all duration-300">
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
