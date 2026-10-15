import React from 'react';
import { Compass, Moon, Phone, Star } from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { useLanguage } from '../context/LanguageContext';

interface QuickActionsProps {
  onScrollToPackages: () => void;
  onOpenHajj: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onScrollToPackages, onOpenHajj }) => {
  const { t } = useLanguage();

  return (
    <section className="relative z-10 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#FFFFFF] rounded-2xl sm:rounded-3xl shadow-sm border border-[#E5E5E0] p-2.5 sm:p-4">
        {/* Mobile: 2x2 grid / Desktop: 4 equal cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {/* Card 1 — Explore Umrah Packages: Royal blue gradient (#2563EB to #60A5FA) */}
          <button
            onClick={onScrollToPackages}
            className="flex items-center gap-2 sm:gap-3.5 p-2.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#60A5FA] text-white shadow-md shadow-blue-500/20 border border-white/20 transition-all duration-300 ease-out text-left cursor-pointer active:scale-[0.98] hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/35 group min-h-[68px] sm:min-h-[78px] overflow-hidden relative"
            aria-label="Explore Umrah Packages"
          >
            {/* White compass/explore icon inside translucent light-blue container */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 group-hover:bg-white/25 transition-all duration-300">
              <Compass className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] sm:text-xs text-white/85 font-medium leading-none mb-1 truncate">
                {t('quick.explore') || 'Explore'}
              </p>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                {t('quick.umrah') || 'Umrah Packages'}
              </p>
            </div>
          </button>

          {/* Card 2 — Hajj 2027: Purple gradient (#7C3AED to #A78BFA) */}
          <button
            onClick={onOpenHajj}
            className="flex items-center gap-2 sm:gap-3.5 p-2.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] text-white shadow-md shadow-purple-500/20 border border-white/20 transition-all duration-300 ease-out text-left cursor-pointer active:scale-[0.98] hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/35 group min-h-[68px] sm:min-h-[78px] overflow-hidden relative"
            aria-label="Pre-Register Hajj 2027"
          >
            {/* White crescent moon icon inside translucent lavender container */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 group-hover:bg-white/25 transition-all duration-300">
              <Moon className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] sm:text-xs text-white/85 font-medium leading-none mb-1 truncate">
                {t('quick.preregi') || 'Pre-Register'}
              </p>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                {t('quick.hajj2027') || 'Hajj 2027'}
              </p>
            </div>
          </button>

          {/* Card 3 — Call Us: Coral/orange gradient (#EA580C to #FB923C) */}
          <a
            href={`tel:${BRAND_INFO.phoneTel}`}
            className="flex items-center gap-2 sm:gap-3.5 p-2.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#EA580C] to-[#FB923C] text-white shadow-md shadow-orange-500/20 border border-white/20 transition-all duration-300 ease-out text-left cursor-pointer active:scale-[0.98] hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/35 group min-h-[68px] sm:min-h-[78px] overflow-hidden relative"
            aria-label="Direct Dial Call Us"
          >
            {/* White telephone icon inside translucent peach container */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 group-hover:bg-white/25 transition-all duration-300">
              <Phone className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] sm:text-xs text-white/85 font-medium leading-none mb-1 truncate">
                {t('quick.direct') || 'Direct Dial'}
              </p>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                {t('quick.callus') || 'Call Us'}
              </p>
            </div>
          </a>

          {/* Card 4 — Google Reviews: Teal-blue gradient (#0F766E to #2DD4BF) */}
          <a
            href="https://www.google.com/maps/place/AS+SAFAR+HAJJ+%26+UMRAH+SERVICE+(TOURS+%26+TRAVELS)/@10.8044885,78.686336,17z/data=!3m1!5s0x3baaf511e627e161:0x90fc153495ecdc68!4m8!3m7!1s0x3baaf5b2b88c0751:0xbec94c48e0fc0622!8m2!3d10.8044885!4d78.686336!9m1!1b1!16s%2Fg%2F11sv_3mvzt?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            title="Read 92 Google Reviews for As-Safar Hajj & Umrah Service"
            className="google-reviews-card flex items-center gap-2 sm:gap-3.5 p-2.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#2DD4BF] text-white shadow-md shadow-teal-500/20 border border-white/20 transition-all duration-300 ease-out text-left cursor-pointer active:scale-[0.98] hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/35 group min-h-[68px] sm:min-h-[78px] overflow-hidden relative"
            aria-label="Google Reviews 4.9 rating 92 reviews"
          >
            {/* Subtle soft white ripple effect */}
            <span className="google-reviews-ripple" aria-hidden="true" />

            {/* Google logo inside white rounded container */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 shadow-xs border border-white/30 group-hover:scale-105 transition-all duration-300">
              <svg className="w-full h-full" viewBox="0 0 24 24" aria-label="Google logo">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 mb-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-white/90 font-medium leading-none truncate">
                  {t('quick.reviews') || 'Google Reviews'}
                </p>
                <div className="flex items-center shrink-0" aria-label="5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-2.5 h-2.5 fill-[#FFD700] text-[#FFD700] drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                4.9 ★ <span className="text-[10px] sm:text-xs font-medium text-white/90">· 92 Reviews</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
