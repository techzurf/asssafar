import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Phone, 
  MessageCircle, 
  ChevronDown, 
  Calendar, 
  Moon, 
  Compass, 
  Menu, 
  X, 
  Sparkles, 
  ChevronRight,
  Video
} from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { Logo } from './Logo';
import { PageRoute } from '../routes';
import { TopAnnouncementBar } from './TopAnnouncementBar';
import { AnimatedEnquireButton } from './AnimatedEnquireButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LicenseBadge } from './LicenseBadge';
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
  const [isPackagesDropdownOpen, setIsPackagesDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobilePackagesOpen, setIsMobilePackagesOpen] = useState(true);
  const { t } = useLanguage();

  const navRef = useRef<HTMLElement>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const activeElementRef = useRef<HTMLElement | null>(null);
  const dashCountRef = useRef<number>(0);

  const [outlineStyle, setOutlineStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    opacity: number;
    isHovered: boolean;
    dashOffset: number;
  }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
    isHovered: false,
    dashOffset: 5,
  });

  const updateOutline = useCallback((target: HTMLElement) => {
    if (!navRef.current || !target) return;

    const navRect = navRef.current.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    dashCountRef.current += 1;
    const newDashOffset = 45 + (dashCountRef.current % 4) * 20;

    activeElementRef.current = target;
    setOutlineStyle({
      left: targetRect.left - navRect.left,
      top: targetRect.top - navRect.top,
      width: targetRect.width,
      height: targetRect.height,
      opacity: 1,
      isHovered: true,
      dashOffset: newDashOffset,
    });
  }, []);

  const handleNavLeave = useCallback(() => {
    activeElementRef.current = null;
    setOutlineStyle((prev) => ({
      ...prev,
      opacity: 0,
      isHovered: false,
      dashOffset: 5,
    }));
  }, []);

  const handleNavBlur = useCallback((e: React.FocusEvent) => {
    if (!navRef.current?.contains(e.relatedTarget as Node)) {
      handleNavLeave();
    }
  }, [handleNavLeave]);

  // Handle click outside to close dropdown menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setIsPackagesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle header background shadow on scroll & lock body scroll when mobile menu is open
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Umrah Sub-Packages Dropdown List Items
  const dropdownOptions: {
    route: PageRoute;
    label: string;
    desc: string;
    icon: React.ElementType;
    badge?: string;
    badgeStyle?: string;
  }[] = [
    {
      route: '/monthly-umrah',
      label: 'Monthly Umrah Packages',
      desc: 'Regular scheduled departures (Economy, Standard, Premium)',
      icon: Calendar,
      badge: 'Monthly',
      badgeStyle: 'bg-[#F5F3EE] text-[#0B5D4B] border-[#0B5D4B]/20',
    },
    {
      route: '/ramadan-umrah',
      label: 'Ramadan Umrah 2026',
      desc: 'Sacred season in Makkah • Taraweeh, Suhoor & Iftar care',
      icon: Moon,
      badge: '1447 / 2026',
      badgeStyle: 'bg-[#C9A24D]/10 text-[#C9A24D] border-[#C9A24D]/30',
    },
    {
      route: '/ziyarah',
      label: 'Historical Ziyarah Tours',
      desc: 'Guided historical visits in Makkah, Madinah, Badr, Taif',
      icon: Compass,
      badge: 'Guided',
      badgeStyle: 'bg-[#F5F3EE] text-[#0B5D4B] border-[#0B5D4B]/20',
    },
  ];

  const isPackagesActive = [
    '/monthly-umrah',
    '/umrah-packages',
    '/ramadan-umrah',
    '/ziyarah',
  ].includes(currentPage);

  const simpleNavItems: { route: PageRoute; label: string; badge?: string }[] = [
    { route: '/hajj-2027', label: t('nav.hajj'), badge: 'Pre-Reg' },
    { route: '/about-us', label: t('nav.about') },
    { route: '/gallery', label: t('nav.gallery') },
    { route: '/contact', label: t('nav.contact') },
  ];

  const handleSelectDropdownItem = (route: PageRoute) => {
    setIsPackagesDropdownOpen(false);
    setIsMobileMenuOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Dark Green Scrolling Announcement Bar */}
      <TopAnnouncementBar />

      {/* Main Navigation Menu */}
      <div
        className={`w-full transition-all duration-300 relative z-40 ${
          isScrolled
            ? 'bg-[#FFFFFF]/98 backdrop-blur-md shadow-xs border-b border-[#E5E5E0] py-3'
            : 'bg-[#FFFFFF] border-b border-[#E5E5E0] py-4'
        }`}
      >
        {/* Hanging License Tag suspended from top edge below announcement bar */}
        <div className="absolute right-3 sm:right-8 lg:right-16 top-0 z-30 pointer-events-none">
          <LicenseBadge variant="hanging" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Brand Logo */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                setIsPackagesDropdownOpen(false);
                onNavigate('/');
              }}
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5D4B] rounded-xl shrink-0"
              aria-label="As-Safar Home"
            >
              <div className="as-safar-logo-frame">
                <Logo className="h-10 sm:h-12 md:h-14 w-auto object-contain" loading="eager" />
              </div>
            </a>

            {/* Zone 2: Navigation Links (Desktop 1024px+) */}
            <nav
              ref={navRef}
              onMouseLeave={handleNavLeave}
              onBlur={handleNavBlur}
              className="relative hidden lg:flex items-center gap-2 xl:gap-3 text-[15px] font-medium text-[#202522]"
              aria-label="Main Navigation"
            >
              {/* Single tracking SVG outline */}
              <svg
                className={`nav-outline ${outlineStyle.isHovered ? 'active' : ''}`}
                style={{
                  transform: `translate3d(${outlineStyle.left}px, ${outlineStyle.top}px, 0)`,
                  width: `${outlineStyle.width}px`,
                  height: `${outlineStyle.height}px`,
                  opacity: outlineStyle.opacity,
                  ['--dash-offset' as string]: `${outlineStyle.dashOffset}`,
                }}
                aria-hidden="true"
              >
                <rect
                  x="1"
                  y="1"
                  width={Math.max(0, outlineStyle.width - 2)}
                  height={Math.max(0, outlineStyle.height - 2)}
                  rx="6"
                  ry="6"
                />
              </svg>

              {/* 1. Home Link */}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPackagesDropdownOpen(false);
                  onNavigate('/');
                }}
                onMouseEnter={(e) => updateOutline(e.currentTarget)}
                onFocus={(e) => updateOutline(e.currentTarget)}
                className={`relative px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 select-none ${
                  currentPage === '/'
                    ? 'text-[#0B5D4B] font-semibold border-b-2 border-[#0B5D4B]'
                    : 'text-[#202522] hover:text-[#0B5D4B] border-b-2 border-transparent'
                }`}
              >
                <span>{t('nav.home')}</span>
              </a>

              {/* 2. Umrah Packages Dropdown Menu Trigger & Popup */}
              <div ref={dropdownContainerRef} className="relative">
                <button
                  type="button"
                  aria-expanded={isPackagesDropdownOpen}
                  aria-haspopup="true"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsPackagesDropdownOpen((prev) => !prev);
                  }}
                  onMouseEnter={(e) => updateOutline(e.currentTarget)}
                  onFocus={(e) => updateOutline(e.currentTarget)}
                  className={`relative px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 select-none ${
                    isPackagesActive
                      ? 'text-[#0B5D4B] font-semibold border-b-2 border-[#0B5D4B]'
                      : 'text-[#202522] hover:text-[#0B5D4B] border-b-2 border-transparent'
                  }`}
                >
                  <span>{t('nav.packages')}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isPackagesDropdownOpen
                        ? 'rotate-180 text-[#C9A24D]'
                        : 'text-current'
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {/* Dropdown Menu Box */}
                {isPackagesDropdownOpen && (
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    className="absolute left-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-[#E5E5E0] p-2.5 z-50 text-left umrah-dropdown-menu"
                    style={{
                      boxShadow: '0 20px 45px -12px rgba(11, 93, 75, 0.2), 0 10px 25px -10px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#777777] border-b border-[#F0EFEA] mb-1.5 flex items-center justify-between">
                      <span>Umrah & Tour Packages</span>
                      <span className="text-[#0B5D4B] font-semibold text-[10px]">Trichy & Chennai</span>
                    </div>

                    <div className="space-y-1">
                      {dropdownOptions.map((opt) => {
                        const isOptActive =
                          currentPage === opt.route ||
                          (opt.route === '/monthly-umrah' &&
                            currentPage === '/umrah-packages');
                        const Icon = opt.icon;

                        return (
                          <button
                            key={opt.route}
                            type="button"
                            role="menuitem"
                            onClick={() => handleSelectDropdownItem(opt.route)}
                            className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                              isOptActive
                                ? 'bg-[#F5F3EE] text-[#0B5D4B]'
                                : 'hover:bg-[#FAF9F5] text-[#202522] hover:text-[#0B5D4B]'
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                                isOptActive
                                  ? 'bg-[#0B5D4B] text-white border-[#0B5D4B]'
                                  : 'bg-[#F8F7F3] text-[#0B5D4B] border-[#E5E5E0]'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span
                                  className={`text-sm font-bold block truncate ${
                                    isOptActive ? 'text-[#0B5D4B]' : 'text-[#202522]'
                                  }`}
                                >
                                  {opt.label}
                                </span>
                                {opt.badge && (
                                  <span
                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${opt.badgeStyle}`}
                                  >
                                    {opt.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-[#666666] leading-tight line-clamp-1 mt-0.5">
                                {opt.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Simple Nav Items (Hajj 2027, About Us, Gallery, Contact) */}
              {simpleNavItems.map((item) => {
                const isActive = currentPage === item.route;
                return (
                  <a
                    key={item.route}
                    href={item.route}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsPackagesDropdownOpen(false);
                      onNavigate(item.route);
                    }}
                    onMouseEnter={(e) => updateOutline(e.currentTarget)}
                    onFocus={(e) => updateOutline(e.currentTarget)}
                    className={`relative px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 select-none ${
                      isActive
                        ? 'text-[#0B5D4B] font-semibold border-b-2 border-[#0B5D4B]'
                        : 'text-[#202522] hover:text-[#0B5D4B] border-b-2 border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] bg-[#F5F3EE] text-[#0B5D4B] font-bold px-1.5 py-0.5 rounded border border-[#E5E5E0]">
                        {item.badge}
                      </span>
                    )}
                  </a>
                );
              })}
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

              {/* Primary Action Button (Custom Package with scramble & shimmer animation) */}
              <div className="hidden sm:block">
                <AnimatedEnquireButton onClick={() => onOpenEnquiry()} />
              </div>

              {/* Mobile Hamburger Menu Toggle Button (< 1024px) */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[#F8F7F3] text-[#202522] border border-[#E5E5E0] active:bg-[#0B5D4B] active:text-white transition-colors cursor-pointer"
                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#0B5D4B]" />
                ) : (
                  <Menu className="w-5 h-5 text-[#0B5D4B]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (< 1024px) */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="lg:hidden fixed inset-x-0 top-[calc(100%)] bg-white border-b border-[#E5E5E0] shadow-2xl z-40 max-h-[calc(100vh-100px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
              {/* 1. Home */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('/');
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl font-medium text-left ${
                  currentPage === '/' ? 'bg-[#F5F3EE] text-[#0B5D4B] font-bold' : 'text-[#202522] hover:bg-[#FAF9F5]'
                }`}
              >
                <span>{t('nav.home')}</span>
                <ChevronRight className="w-4 h-4 text-[#C9A24D]" />
              </button>

              {/* 2. Umrah Packages Collapsible Dropdown */}
              <div className="border border-[#E5E5E0] rounded-2xl overflow-hidden bg-[#FAF9F5]">
                <button
                  type="button"
                  onClick={() => setIsMobilePackagesOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between p-3.5 text-left font-bold text-sm text-[#0B5D4B] cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C9A24D]" />
                    <span>{t('nav.packages')}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#0B5D4B] transition-transform duration-200 ${
                      isMobilePackagesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isMobilePackagesOpen && (
                  <div className="p-2 pt-0 space-y-1 bg-white border-t border-[#E5E5E0]">
                    {dropdownOptions.map((opt) => {
                      const isOptActive =
                        currentPage === opt.route ||
                        (opt.route === '/monthly-umrah' && currentPage === '/umrah-packages');
                      const Icon = opt.icon;

                      return (
                        <button
                          key={opt.route}
                          type="button"
                          onClick={() => handleSelectDropdownItem(opt.route)}
                          className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                            isOptActive
                              ? 'bg-[#F5F3EE] text-[#0B5D4B] font-bold'
                              : 'hover:bg-[#FAF9F5] text-[#333333]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#F8F7F3] border border-[#E5E5E0] flex items-center justify-center shrink-0 text-[#0B5D4B]">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold">{opt.label}</span>
                              {opt.badge && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#F5F3EE] text-[#0B5D4B] border border-[#E5E5E0]">
                                  {opt.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#777777] truncate mt-0.5">{opt.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 3. Other Pages (Hajj, About, Gallery, Contact) */}
              {simpleNavItems.map((item) => {
                const isActive = currentPage === item.route;
                return (
                  <button
                    key={item.route}
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate(item.route);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl font-medium text-left ${
                      isActive ? 'bg-[#F5F3EE] text-[#0B5D4B] font-bold' : 'text-[#202522] hover:bg-[#FAF9F5]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] bg-[#F5F3EE] text-[#0B5D4B] font-bold px-1.5 py-0.5 rounded border border-[#E5E5E0]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C9A24D]" />
                  </button>
                );
              })}

              {/* Mobile Makkah Live Action */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent('open-makkah-live'));
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#075C4B]/10 to-[#C9973D]/15 border border-[#C9973D]/40 font-semibold text-[#0B5D4B] hover:bg-[#FAF9F5] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                    </span>
                    <Video className="w-4 h-4 text-[#C9973D]" />
                    <span className="text-sm font-bold text-[#0B5D4B]">Makkah Live (Masjid al-Haram)</span>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-600 text-white uppercase tracking-wider shadow-xs">
                    LIVE
                  </span>
                </button>
              </div>

              {/* Mobile Custom Package Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenEnquiry();
                  }}
                  className="w-full bg-[#C2185B] hover:bg-[#AD1457] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-[0_4px_12px_rgba(194,24,91,0.22)] hover:shadow-[0_6px_16px_rgba(194,24,91,0.3)] transition-all duration-[250ms] ease-out hover:-translate-y-[2px] active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>{t('nav.enquire')}</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
