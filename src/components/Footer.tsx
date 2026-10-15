import React from 'react';
import { Phone, MapPin, MessageCircle, Heart } from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { PageRoute } from '../routes';

interface FooterProps {
  onOpenHajj: () => void;
  onOpenEnquiry: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHajj, onOpenEnquiry, onNavigate }) => {
  return (
    <footer className="bg-[#07382E] text-white pt-14 pb-20 sm:pb-14 border-t border-[#0B5D4B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24D] rounded"
              aria-label="As-Safar Home"
            >
              <img
                src={BRAND_INFO.footerLogoUrl}
                alt="As-Safar Hajj & Umrah"
                className="h-10 sm:h-12 w-auto object-contain"
                width={140}
                height={50}
                loading="lazy"
                decoding="async"
              />
            </a>

            <p className="text-[#EAF3EF]/80 text-sm leading-relaxed max-w-sm">
              Your trusted partner for a comfortable, guided and spiritually meaningful Umrah journey.
            </p>

            <div className="pt-2 text-xs text-[#EAF3EF]/70 space-y-1">
              <p>Government Approved Travel Services</p>
              <p>Specialized Makkah & Madinah Pilgrimage Operations</p>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-base font-semibold text-[#C9A24D]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#EAF3EF]/80">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/monthly-umrah"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/monthly-umrah');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Monthly Umrah
                </a>
              </li>
              <li>
                <a
                  href="/ramadan-umrah"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/ramadan-umrah');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Ramadan Umrah
                </a>
              </li>
              <li>
                <a
                  href="/ziyarah"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/ziyarah');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Ziyarah Tours
                </a>
              </li>
              <li>
                <a
                  href="/hajj-2027"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/hajj-2027');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Hajj 2027 Advance Registration
                </a>
              </li>

              <li>
                <a
                  href="/faq"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/faq');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Contact & Location
                </a>
              </li>
            </ul>
          </div>

          {/* Office Contact Info (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-base font-semibold text-[#C9A24D]">
              Trichy Office
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm text-[#EAF3EF]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A24D] shrink-0 mt-0.5" />
                <p className="leading-snug">
                  {BRAND_INFO.addressLine1},<br />
                  {BRAND_INFO.addressLine2},<br />
                  {BRAND_INFO.area}, {BRAND_INFO.city} – <span className="tabular-nums">{BRAND_INFO.pincode}</span>,<br />
                  {BRAND_INFO.state}, India
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A24D] shrink-0" />
                <a
                  href={`tel:${BRAND_INFO.phoneTel}`}
                  className="hover:text-white font-bold transition-colors tabular-nums"
                >
                  {BRAND_INFO.phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/919566369654?text=${encodeURIComponent(BRAND_INFO.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors tabular-nums"
                >
                  WhatsApp: +91 95663 69654
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenEnquiry}
                className="bg-[#C9A24D] hover:bg-[#B38D3B] text-[#07382E] font-bold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Request Custom Group Quote
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EAF3EF]/60 gap-3">
          <p>© 2026 As-Safar. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with devotion for the pilgrims of Tamil Nadu</span>
            <Heart className="w-3 h-3 text-[#C9A24D] fill-[#C9A24D]" />
          </p>
        </div>
      </div>
    </footer>
  );
};
