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
      <div className="bg-[#FFFFFF] rounded-2xl shadow-sm border border-[#E5E5E0] p-3 sm:p-4">
        {/* Mobile: 2x2 grid / Desktop: 4 equal cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          {/* Action 1: Umrah Packages */}
          <button
            onClick={onScrollToPackages}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F7F3] hover:bg-[#F5F3EE] border border-[#E5E5E0] hover:border-[#0B5D4B]/30 transition-all text-left active:scale-[0.98] group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0B5D4B] text-[#C9A24D] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#555555] font-medium leading-none mb-1">{t('quick.explore')}</p>
              <p className="text-sm font-bold text-[#202522] leading-tight truncate">{t('quick.umrah')}</p>
            </div>
          </button>

          {/* Action 2: Hajj 2027 */}
          <button
            onClick={onOpenHajj}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F7F3] hover:bg-[#F5F3EE] border border-[#E5E5E0] hover:border-[#C9A24D]/50 transition-all text-left active:scale-[0.98] group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-[#C9A24D] text-[#073E32] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Moon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#555555] font-medium leading-none mb-1">{t('quick.preregi')}</p>
              <p className="text-sm font-bold text-[#202522] leading-tight truncate">{t('quick.hajj2027')}</p>
            </div>
          </button>

          {/* Action 3: Call Us */}
          <a
            href={`tel:${BRAND_INFO.phoneTel}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F7F3] hover:bg-[#F5F3EE] border border-[#E5E5E0] hover:border-[#0B5D4B]/30 transition-all text-left active:scale-[0.98] group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#202522] text-[#C9A24D] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#555555] font-medium leading-none mb-1">{t('quick.direct')}</p>
              <p className="text-sm font-bold text-[#202522] leading-tight truncate">{t('quick.callus')}</p>
            </div>
          </a>

          {/* Action 4: Google Reviews */}
          <a
            href="https://www.google.com/maps/place/AS+SAFAR+HAJJ+%26+UMRAH+SERVICE+(TOURS+%26+TRAVELS)/@10.8044885,78.686336,17z/data=!3m1!5s0x3baaf511e627e161:0x90fc153495ecdc68!4m8!3m7!1s0x3baaf5b2b88c0751:0xbec94c48e0fc0622!8m2!3d10.8044885!4d78.686336!9m1!1b1!16s%2Fg%2F11sv_3mvzt?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            title="Read 92 Google Reviews for As-Safar Hajj & Umrah Service"
            className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F7F3] hover:bg-[#F5F3EE] border border-[#E5E5E0] hover:border-[#0B5D4B]/30 transition-all text-left active:scale-[0.98] group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E5E0] p-2 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
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
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <p className="text-xs text-[#555555] font-medium leading-none truncate">{t('quick.reviews')}</p>
                <div className="flex items-center text-[#FFCE1B] shrink-0" aria-label="5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-[#FFCE1B] text-[#FFCE1B]" />
                  ))}
                </div>
              </div>
              <p className="text-sm font-bold text-[#0B5D4B] leading-tight truncate">
                4.9 Rating <span className="text-xs font-normal text-[#555555]">· 92 {t('quick.reviews')}</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
