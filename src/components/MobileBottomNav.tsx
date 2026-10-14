import React from 'react';
import { Home, Compass, Moon, HelpCircle, PhoneCall } from 'lucide-react';
import { PageRoute } from '../routes';

interface MobileBottomNavProps {
  currentPage: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentPage, onNavigate }) => {
  const tabs = [
    { route: '/' as PageRoute, label: 'Home', icon: Home },
    { route: '/umrah-packages' as PageRoute, label: 'Packages', icon: Compass },
    { route: '/hajj-2027' as PageRoute, label: 'Hajj 2027', icon: Moon },
    { route: '/faq' as PageRoute, label: 'FAQ', icon: HelpCircle },
    { route: '/contact' as PageRoute, label: 'Contact', icon: PhoneCall },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E5E5E0] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[calc(env(safe-area-inset-bottom,8px)+6px)] pt-2"
      aria-label="Mobile Navigation"
    >
      <div className="grid grid-cols-5 items-center max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentPage === tab.route;

          return (
            <button
              key={tab.route}
              onClick={() => onNavigate(tab.route)}
              className={`flex flex-col items-center justify-center py-1 transition-all duration-200 relative min-h-[44px] touch-manipulation focus:outline-none cursor-pointer ${
                isActive ? 'text-[#0B5D4B]' : 'text-[#555555] hover:text-[#202522]'
              }`}
            >
              {/* Active gold dot pill indicator */}
              {isActive && (
                <span className="absolute -top-1 w-6 h-0.5 bg-[#C9A24D] rounded-full animate-fade-in" />
              )}
              <div
                className={`w-9 h-7 flex items-center justify-center rounded-full transition-all ${
                  isActive ? 'bg-[#F5F3EE] text-[#0B5D4B]' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#0B5D4B] stroke-[2.2]' : 'stroke-[1.8]'}`} />
              </div>
              <span
                className={`text-[11px] font-medium tracking-tight mt-0.5 leading-tight ${
                  isActive ? 'font-bold text-[#0B5D4B]' : 'text-[#555555]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

