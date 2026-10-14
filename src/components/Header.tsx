import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { Logo } from './Logo';
import { PageRoute } from '../routes';
import { TopAnnouncementBar } from './TopAnnouncementBar';
import { AnimatedEnquireButton } from './AnimatedEnquireButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenEnquiry: (defaultPackage?: string) => void;
  onOpenHajj: () => void;
  currentPage: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenEnquiry, 
  onOpenHajj, 
  currentPage, 
  onNavigate 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Dark Green Scrolling Announcement Bar */}
      <TopAnnouncementBar />

      {/* Main Navigation Menu */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFFFF]/95 backdrop-blur-md shadow-xs border-b border-[#E5E5E0] py-3'
            : 'bg-[#FFFFFF] border-b border-[#E5E5E0] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Brand Logo */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5D4B] rounded shrink-0"
            aria-label="As-Safar Home"
          >
            <Logo
              className="h-10 sm:h-12 w-auto object-contain"
              loading="eager"
            />
          </a>

          {/* Zone 2: Navigation Links (Desktop 1024px+) */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#202522]">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className={`hover:text-[#0B5D4B] transition-colors py-1 cursor-pointer ${
                currentPage === '/' ? 'text-[#0B5D4B] font-semibold border-b-2 border-[#0B5D4B]' : ''
              }`}
            >
              {t('nav.home')}
            </a>
            <a
              href="/umrah-packages"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/umrah-packages');
              }}
              className={`hover:text-[#0B5D4B] transition-colors py-1 cursor-pointer ${
                currentPage === '/umrah-packages' ? 'text-[#0B5D4B] font-semibold border-b-2 border-[#0B5D4B]' : ''
              }`}
            >
              {t('nav.packages')}
            </a>
            <a
              href="/hajj-2027"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/hajj-2027');
              }}
              className={`hover:text-[#0B5D4B] transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
                currentPage === '/hajj-2027' ? 'text-[#0B5D4B] font-semibold border-b-2 border-[#0B5D4B]' : ''
              }`}
            >
              <span>{t('nav.hajj')}</span>
              <span className="text-[10px] bg-[#F5F3EE] text-[#0B5D4B] font-bold px-1.5 py-0.5 rounded border border-[#E5E5E0]">Pre-Reg</span>
            </a>
            <a
              href="/about-us"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/about-us');
              }}
              className={`hover:text-[#0B5D4B] transition-colors py-1 cursor-pointer ${
                currentPage === '/about-us' ? 'text-[#0B5D4B] font-semibold border-b-2 border-[#0B5D4B]' : ''
              }`}
            >
              {t('nav.about')}
            </a>
            <a
              href="/faq"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/faq');
              }}
              className={`hover:text-[#0B5D4B] transition-colors py-1 cursor-pointer ${
                currentPage === '/faq' ? 'text-[#0B5D4B] font-semibold border-b-2 border-[#0B5D4B]' : ''
              }`}
            >
              {t('nav.faq')}
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact');
              }}
              className={`hover:text-[#0B5D4B] transition-colors py-1 cursor-pointer ${
                currentPage === '/contact' ? 'text-[#0B5D4B] font-semibold border-b-2 border-[#0B5D4B]' : ''
              }`}
            >
              {t('nav.contact')}
            </a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Component */}
            <LanguageSwitcher />

            {/* Mobile quick action icons (< 1024px) */}
            <a
              href={`tel:${BRAND_INFO.phoneTel}`}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#F8F7F3] text-[#202522] border border-[#E5E5E0] active:bg-[#0B5D4B] active:text-white transition-colors"
              aria-label="Call As-Safar"
            >
              <Phone className="w-4 h-4 text-[#C9A24D]" />
            </a>

            <a
              href={`https://wa.me/919566369654?text=${encodeURIComponent(BRAND_INFO.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#F8F7F3] text-[#202522] border border-[#E5E5E0] active:bg-[#0B5D4B] active:text-white transition-colors"
              aria-label="WhatsApp As-Safar"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
            </a>

            {/* Primary Action Button (Enquire Now with scramble & shimmer animation) */}
            <AnimatedEnquireButton onClick={() => onOpenEnquiry()} />
          </div>
        </div>
      </div>
      </div>
    </header>
  );
};
