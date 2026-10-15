import React, { useState } from 'react';
import { Home, Compass, Moon, HelpCircle, PhoneCall, X, Calendar, Sparkles } from 'lucide-react';
import { PageRoute } from '../routes';

interface MobileBottomNavProps {
  currentPage: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentPage, onNavigate }) => {
  const [isPackagesSheetOpen, setIsPackagesSheetOpen] = useState(false);

  const isPackagesActive = [
    '/monthly-umrah',
    '/umrah-packages',
    '/ramadan-umrah',
    '/ziyarah',
  ].includes(currentPage);

  const packageOptions: {
    route: PageRoute;
    label: string;
    desc: string;
    icon: React.ElementType;
    badge?: string;
  }[] = [
    {
      route: '/monthly-umrah',
      label: 'Monthly Umrah',
      desc: 'Regular scheduled departures (Economy, Standard, Premium)',
      icon: Calendar,
      badge: 'Monthly',
    },
    {
      route: '/ramadan-umrah',
      label: 'Ramadan Umrah',
      desc: 'Sacred season in Makkah • Taraweeh & Laylat al-Qadr',
      icon: Moon,
      badge: '1447 / 2026',
    },
    {
      route: '/ziyarah',
      label: 'Ziyarah Tours',
      desc: 'Guided historical visits in Makkah, Madinah, Badr, Taif',
      icon: Compass,
      badge: 'Guided',
    },
  ];

  const handleSelectPackage = (route: PageRoute) => {
    setIsPackagesSheetOpen(false);
    onNavigate(route);
  };

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/98 backdrop-blur-md border-t border-[#E5E5E0] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[calc(env(safe-area-inset-bottom,8px)+6px)] pt-2"
        aria-label="Mobile Navigation"
      >
        <div className="grid grid-cols-5 items-center max-w-md mx-auto px-2">
          {/* 1. Home */}
          <button
            onClick={() => {
              setIsPackagesSheetOpen(false);
              onNavigate('/');
            }}
            className={`flex flex-col items-center justify-center py-1 transition-all duration-200 relative min-h-[44px] touch-manipulation focus:outline-none cursor-pointer ${
              currentPage === '/' ? 'text-[#0B5D4B]' : 'text-[#555555] hover:text-[#202522]'
            }`}
          >
            {currentPage === '/' && (
              <span className="absolute -top-1 w-6 h-0.5 bg-[#C9A24D] rounded-full animate-fade-in" />
            )}
            <div
              className={`w-9 h-7 flex items-center justify-center rounded-full transition-all ${
                currentPage === '/' ? 'bg-[#F5F3EE] text-[#0B5D4B]' : ''
              }`}
            >
              <Home className={`w-5 h-5 ${currentPage === '/' ? 'text-[#0B5D4B] stroke-[2.2]' : 'stroke-[1.8]'}`} />
            </div>
            <span
              className={`text-[11px] font-medium tracking-tight mt-0.5 leading-tight ${
                currentPage === '/' ? 'font-bold text-[#0B5D4B]' : 'text-[#555555]'
              }`}
            >
              Home
            </span>
          </button>

          {/* 2. Packages (Dropdown Sheet Trigger) */}
          <button
            onClick={() => setIsPackagesSheetOpen((prev) => !prev)}
            className={`flex flex-col items-center justify-center py-1 transition-all duration-200 relative min-h-[44px] touch-manipulation focus:outline-none cursor-pointer ${
              isPackagesActive ? 'text-[#0B5D4B]' : 'text-[#555555] hover:text-[#202522]'
            }`}
          >
            {isPackagesActive && (
              <span className="absolute -top-1 w-6 h-0.5 bg-[#C9A24D] rounded-full animate-fade-in" />
            )}
            <div
              className={`w-9 h-7 flex items-center justify-center rounded-full transition-all ${
                isPackagesActive ? 'bg-[#F5F3EE] text-[#0B5D4B]' : ''
              }`}
            >
              <Compass className={`w-5 h-5 ${isPackagesActive ? 'text-[#0B5D4B] stroke-[2.2]' : 'stroke-[1.8]'}`} />
            </div>
            <span
              className={`text-[11px] font-medium tracking-tight mt-0.5 leading-tight ${
                isPackagesActive ? 'font-bold text-[#0B5D4B]' : 'text-[#555555]'
              }`}
            >
              Packages
            </span>
          </button>

          {/* 3. Hajj 2027 */}
          <button
            onClick={() => {
              setIsPackagesSheetOpen(false);
              onNavigate('/hajj-2027');
            }}
            className={`flex flex-col items-center justify-center py-1 transition-all duration-200 relative min-h-[44px] touch-manipulation focus:outline-none cursor-pointer ${
              currentPage === '/hajj-2027' ? 'text-[#0B5D4B]' : 'text-[#555555] hover:text-[#202522]'
            }`}
          >
            {currentPage === '/hajj-2027' && (
              <span className="absolute -top-1 w-6 h-0.5 bg-[#C9A24D] rounded-full animate-fade-in" />
            )}
            <div
              className={`w-9 h-7 flex items-center justify-center rounded-full transition-all ${
                currentPage === '/hajj-2027' ? 'bg-[#F5F3EE] text-[#0B5D4B]' : ''
              }`}
            >
              <Moon className={`w-5 h-5 ${currentPage === '/hajj-2027' ? 'text-[#0B5D4B] stroke-[2.2]' : 'stroke-[1.8]'}`} />
            </div>
            <span
              className={`text-[11px] font-medium tracking-tight mt-0.5 leading-tight ${
                currentPage === '/hajj-2027' ? 'font-bold text-[#0B5D4B]' : 'text-[#555555]'
              }`}
            >
              Hajj 2027
            </span>
          </button>

          {/* 4. FAQ */}
          <button
            onClick={() => {
              setIsPackagesSheetOpen(false);
              onNavigate('/faq');
            }}
            className={`flex flex-col items-center justify-center py-1 transition-all duration-200 relative min-h-[44px] touch-manipulation focus:outline-none cursor-pointer ${
              currentPage === '/faq' ? 'text-[#0B5D4B]' : 'text-[#555555] hover:text-[#202522]'
            }`}
          >
            {currentPage === '/faq' && (
              <span className="absolute -top-1 w-6 h-0.5 bg-[#C9A24D] rounded-full animate-fade-in" />
            )}
            <div
              className={`w-9 h-7 flex items-center justify-center rounded-full transition-all ${
                currentPage === '/faq' ? 'bg-[#F5F3EE] text-[#0B5D4B]' : ''
              }`}
            >
              <HelpCircle className={`w-5 h-5 ${currentPage === '/faq' ? 'text-[#0B5D4B] stroke-[2.2]' : 'stroke-[1.8]'}`} />
            </div>
            <span
              className={`text-[11px] font-medium tracking-tight mt-0.5 leading-tight ${
                currentPage === '/faq' ? 'font-bold text-[#0B5D4B]' : 'text-[#555555]'
              }`}
            >
              FAQ
            </span>
          </button>

          {/* 5. Contact */}
          <button
            onClick={() => {
              setIsPackagesSheetOpen(false);
              onNavigate('/contact');
            }}
            className={`flex flex-col items-center justify-center py-1 transition-all duration-200 relative min-h-[44px] touch-manipulation focus:outline-none cursor-pointer ${
              currentPage === '/contact' ? 'text-[#0B5D4B]' : 'text-[#555555] hover:text-[#202522]'
            }`}
          >
            {currentPage === '/contact' && (
              <span className="absolute -top-1 w-6 h-0.5 bg-[#C9A24D] rounded-full animate-fade-in" />
            )}
            <div
              className={`w-9 h-7 flex items-center justify-center rounded-full transition-all ${
                currentPage === '/contact' ? 'bg-[#F5F3EE] text-[#0B5D4B]' : ''
              }`}
            >
              <PhoneCall className={`w-5 h-5 ${currentPage === '/contact' ? 'text-[#0B5D4B] stroke-[2.2]' : 'stroke-[1.8]'}`} />
            </div>
            <span
              className={`text-[11px] font-medium tracking-tight mt-0.5 leading-tight ${
                currentPage === '/contact' ? 'font-bold text-[#0B5D4B]' : 'text-[#555555]'
              }`}
            >
              Contact
            </span>
          </button>
        </div>
      </nav>

      {/* Packages Quick Select Bottom Sheet for Mobile */}
      {isPackagesSheetOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl border-t border-[#E5E5E0] p-4 pb-8 space-y-3 animate-slide-up"
            style={{
              paddingBottom: 'calc(env(safe-area-inset-bottom, 16px) + 20px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#F0EFEA]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C9A24D]" />
                <span className="font-bold text-sm text-[#202522]">Select Umrah Package</span>
              </div>
              <button
                type="button"
                onClick={() => setIsPackagesSheetOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F5F3EE] flex items-center justify-center text-[#555555] hover:text-black"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Package Options */}
            <div className="space-y-2">
              {packageOptions.map((opt) => {
                const isOptActive =
                  currentPage === opt.route ||
                  (opt.route === '/monthly-umrah' && currentPage === '/umrah-packages');
                const Icon = opt.icon;

                return (
                  <button
                    key={opt.route}
                    type="button"
                    onClick={() => handleSelectPackage(opt.route)}
                    className={`w-full flex items-start gap-3 p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      isOptActive
                        ? 'bg-[#F5F3EE] border-[#0B5D4B] text-[#0B5D4B]'
                        : 'bg-white hover:bg-[#FAF9F5] border-[#E5E5E0] text-[#202522]'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        isOptActive
                          ? 'bg-[#0B5D4B] text-white border-[#0B5D4B]'
                          : 'bg-[#F8F7F3] text-[#0B5D4B] border-[#E5E5E0]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold block">{opt.label}</span>
                        {opt.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5F3EE] text-[#0B5D4B] border border-[#E5E5E0]">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#666666] leading-snug mt-0.5">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
