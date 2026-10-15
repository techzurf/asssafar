import React from 'react';
import { Clock, ArrowRight, MapPin, Sparkles, Building2, Bed, Bus, Utensils } from 'lucide-react';
import { UMRAH_PACKAGES } from '../data/packages';
import { PackageItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PackagesSectionProps {
  onSelectPackage: (pkg: PackageItem) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  const { t } = useLanguage();
  const economyPkg = UMRAH_PACKAGES.find((p) => p.id === 'economy') || UMRAH_PACKAGES[0];
  const standardPkg = UMRAH_PACKAGES.find((p) => p.id === 'standard') || UMRAH_PACKAGES[1];
  const premiumPkg = UMRAH_PACKAGES.find((p) => p.id === 'premium') || UMRAH_PACKAGES[2];

  const packageCards = [
    {
      pkg: economyPkg,
      image: 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791961028/Gemini_Generated_Image_satx8zsatx8zsatx_l0jfm3.png',
      imageAlt: 'Economy Umrah package pilgrimage view',
      badge: 'ECONOMY',
      badgeClass: 'bg-white/95 text-[#073E32] shadow-sm',
      title: 'Economy Umrah',
      description: 'An affordable and comfortable pilgrimage with essential travel assistance.',
      highlight: '14 Days',
      supportingLabel: 'Makkah & Madinah',
      isPopular: false,
      facilities: [
        {
          icon: Building2,
          label: 'Makkah Stay',
          detail: '3★ Hotel (550m to Haram)',
          iconColor: 'text-[#2563EB]',
          bgColor: 'bg-[#EFF6FF]',
        },
        {
          icon: Bed,
          label: 'Madina Stay',
          detail: '3★ Hotel (350m to Gates)',
          iconColor: 'text-[#7C3AED]',
          bgColor: 'bg-[#F5F3FF]',
        },
        {
          icon: Bus,
          label: 'Ground Transport',
          detail: 'AC Luxury Group Bus',
          iconColor: 'text-[#EA580C]',
          bgColor: 'bg-[#FFF7ED]',
        },
        {
          icon: Utensils,
          label: 'Meals & Dining',
          detail: 'Daily South Indian Meals',
          iconColor: 'text-[#E11D48]',
          bgColor: 'bg-[#FFF1F2]',
        },
      ],
    },
    {
      pkg: standardPkg,
      image: 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791961421/Gemini_Generated_Image_immrh3immrh3immr_mrhvc2.png',
      imageAlt: 'Standard Umrah package pilgrimage view',
      badge: 'POPULAR',
      badgeClass: 'bg-[#C9A24D] text-[#073E32] shadow-md font-extrabold',
      title: 'Standard Umrah',
      description: 'Enjoy convenient hotel stays, guided support, and a carefully planned Umrah experience.',
      highlight: '15 Days',
      supportingLabel: 'Makkah & Madinah',
      isPopular: true,
      facilities: [
        {
          icon: Building2,
          label: 'Makkah Stay',
          detail: '4★ Hotel (Within 300m)',
          iconColor: 'text-[#2563EB]',
          bgColor: 'bg-[#EFF6FF]',
        },
        {
          icon: Bed,
          label: 'Madina Stay',
          detail: '4★ Hotel (~200m to Gates)',
          iconColor: 'text-[#7C3AED]',
          bgColor: 'bg-[#F5F3FF]',
        },
        {
          icon: Bus,
          label: 'Ground Transport',
          detail: 'Executive AC Coach',
          iconColor: 'text-[#EA580C]',
          bgColor: 'bg-[#FFF7ED]',
        },
        {
          icon: Utensils,
          label: 'Meals & Dining',
          detail: 'Full-Board Buffet',
          iconColor: 'text-[#E11D48]',
          bgColor: 'bg-[#FFF1F2]',
        },
      ],
    },
    {
      pkg: premiumPkg,
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'The Holy Kaaba at Masjid al-Haram at golden hour',
      badge: 'PREMIUM',
      badgeClass: 'bg-[#0B5D4B] text-white border border-[#C9A24D]/50 shadow-sm',
      title: 'Premium Umrah Experience',
      description: 'Experience an elevated pilgrimage with premium accommodation and personalized assistance.',
      highlight: '15 Days',
      supportingLabel: 'Premium Travel Experience',
      isPopular: false,
      facilities: [
        {
          icon: Building2,
          label: 'Makkah Stay',
          detail: '5★ Clock Tower (Direct Access)',
          iconColor: 'text-[#2563EB]',
          bgColor: 'bg-[#EFF6FF]',
        },
        {
          icon: Bed,
          label: 'Madina Stay',
          detail: '5★ Front Row (<100m)',
          iconColor: 'text-[#7C3AED]',
          bgColor: 'bg-[#F5F3FF]',
        },
        {
          icon: Bus,
          label: 'Ground Transport',
          detail: 'Bullet Train & VIP Coach',
          iconColor: 'text-[#EA580C]',
          bgColor: 'bg-[#FFF7ED]',
        },
        {
          icon: Utensils,
          label: 'Meals & Dining',
          detail: '5★ Gourmet Buffet',
          iconColor: 'text-[#E11D48]',
          bgColor: 'bg-[#FFF1F2]',
        },
      ],
    },
  ];

  return (
    <section id="packages" className="py-16 sm:py-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F3EE] text-[#0B5D4B] border border-[#E5E5E0] text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24D]" />
            <span>{t('pkg.badge')}</span>
          </div>

          {/* Animated Multicolor Heading */}
          <div className="journey-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <h2 className="journey-heading-base text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {t('pkg.heading')}
            </h2>
            <svg
              className="journey-heading-outline"
              aria-hidden="true"
            >
              <text textAnchor="middle" x="50%" y="50%" dominantBaseline="central">
                {t('pkg.heading')}
              </text>
              <text textAnchor="middle" x="50%" y="50%" dominantBaseline="central">
                {t('pkg.heading')}
              </text>
              <text textAnchor="middle" x="50%" y="50%" dominantBaseline="central">
                {t('pkg.heading')}
              </text>
              <text textAnchor="middle" x="50%" y="50%" dominantBaseline="central">
                {t('pkg.heading')}
              </text>
              <text textAnchor="middle" x="50%" y="50%" dominantBaseline="central">
                {t('pkg.heading')}
              </text>
            </svg>
          </div>

          <p className="text-[#333333] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {t('pkg.sub')}
          </p>

          {/* Subtle gold decorative divider */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C9A24D]" />
            <div className="w-2 h-2 rotate-45 bg-[#C9A24D]" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C9A24D]" />
          </div>
        </div>

        {/* Exactly 3 Large Image Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {packageCards.map((card, idx) => {
            return (
              <div
                key={card.pkg.id || idx}
                className={`umrah-package-card group flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  card.isPopular
                    ? 'shadow-md md:last:col-span-1'
                    : 'shadow-xs md:last:col-span-2 lg:last:col-span-1 md:last:max-w-md md:last:mx-auto lg:last:max-w-none'
                }`}
              >
                {/* Large Photographic Image (Top ~55-60% visual presence) */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#0A0D0C] rounded-t-[20px] z-[1]">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient Overlay at bottom for image-to-content transition */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Package Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md ${card.badgeClass}`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  {/* Highlight Duration & Label Overlaid on Image Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-[#C9A24D]" />
                      <span>{card.highlight}</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-white/90 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A24D]" />
                      <span>{card.supportingLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-6 rounded-b-[20px] bg-white z-[1]">
                  <div className="space-y-2.5">
                    <h3 className="text-2xl font-semibold text-[#202522] tracking-tight group-hover:text-[#0B5D4B] transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-sm text-[#333333] leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Four Facilities (2-Column Grid: Makkah Stay, Madina Stay, Ground Transport, Meals & Dining) */}
                  <div className="pt-2 border-t border-[#F0EFEA]">
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                      {card.facilities.map((fac, fIdx) => {
                        const Icon = fac.icon;
                        return (
                          <div
                            key={fIdx}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FAFAF8] border border-[#F0EFEA] hover:border-[#0B5D4B]/25 transition-colors"
                          >
                            <div className={`w-7 h-7 rounded-lg ${fac.bgColor} ${fac.iconColor} flex items-center justify-center shrink-0 mt-0.5 shadow-2xs`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-[#202522] leading-tight truncate">
                                {fac.label}
                              </p>
                              <p className="text-[11px] text-[#666666] leading-tight mt-0.5 truncate tabular-nums" title={fac.detail}>
                                {fac.detail}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price & CTA Action */}
                  <div className="pt-4 border-t border-[#E5E5E0] space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-medium text-[#555555]">{t('pkg.starting')}</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-[#0B5D4B] tabular-nums tracking-tight">
                          {card.pkg.startingPrice}
                        </span>
                        <span className="text-[11px] text-[#555555] block">
                          {t('pkg.perperson')}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectPackage(card.pkg)}
                      className="w-full py-3.5 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] min-h-[48px] cursor-pointer bg-[#0B5D4B] hover:bg-[#084538] text-white shadow-xs hover:shadow-md"
                    >
                      <span>{t('pkg.details')}</span>
                      <ArrowRight className="w-4 h-4 text-[#C9A24D]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

