import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, MapPin, Sparkles, Building2, Bed, Bus, Utensils } from 'lucide-react';
import { UMRAH_PACKAGES } from '../data/packages';
import { PackageItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { fetchPublicActivePackages, PACKAGES_UPDATED_EVENT } from '../services/packageService';

interface PackagesSectionProps {
  onSelectPackage: (pkg: PackageItem) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  const { t } = useLanguage();
  const [packages, setPackages] = useState<PackageItem[]>(UMRAH_PACKAGES);

  // Fetch active packages from Supabase on mount and listen to updates
  useEffect(() => {
    let isMounted = true;
    fetchPublicActivePackages().then((res) => {
      if (isMounted && res.data && res.data.length > 0) {
        setPackages(res.data);
      }
    });

    const handleUpdate = () => {
      fetchPublicActivePackages().then((res) => {
        if (isMounted && res.data && res.data.length > 0) {
          setPackages(res.data);
        }
      });
    };

    window.addEventListener(PACKAGES_UPDATED_EVENT, handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener(PACKAGES_UPDATED_EVENT, handleUpdate);
    };
  }, []);

  const defaultCategoryImages: Record<string, { image: string; alt: string }> = {
    economy: {
      image: 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791961028/Gemini_Generated_Image_satx8zsatx8zsatx_l0jfm3.png',
      alt: 'Economy Umrah package pilgrimage view',
    },
    standard: {
      image: 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791961421/Gemini_Generated_Image_immrh3immrh3immr_mrhvc2.png',
      alt: 'Standard Umrah package pilgrimage view',
    },
    premium: {
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80',
      alt: 'The Holy Kaaba at Masjid al-Haram at golden hour',
    },
  };

  const packageCards = packages.map((pkg) => {
    const isPopular = pkg.featured || pkg.category === 'standard';
    const catImages = defaultCategoryImages[pkg.category] || defaultCategoryImages.standard;

    let badgeClass = 'bg-white/95 text-[#073E32] shadow-sm';
    if (isPopular) {
      badgeClass = 'bg-[#C9A24D] text-[#073E32] shadow-md font-extrabold';
    } else if (pkg.category === 'premium') {
      badgeClass = 'bg-[#0B5D4B] text-white border border-[#C9A24D]/50 shadow-sm';
    }

    const badgeLabel = pkg.badge || (pkg.category === 'economy' ? 'ECONOMY' : pkg.category === 'standard' ? 'POPULAR' : 'PREMIUM');

    return {
      pkg,
      image: catImages.image,
      imageAlt: `${pkg.name} pilgrimage view`,
      badge: badgeLabel,
      badgeClass,
      title: pkg.name,
      description: pkg.tagline || pkg.idealFor,
      highlight: pkg.duration.split('(')[0].trim() || pkg.duration,
      supportingLabel: 'Makkah & Madinah',
      isPopular,
      facilities: [
        {
          icon: Building2,
          label: 'Makkah Stay',
          detail: pkg.makkahHotel,
          iconColor: 'text-[#2563EB]',
          bgColor: 'bg-[#EFF6FF]',
        },
        {
          icon: Bed,
          label: 'Madina Stay',
          detail: pkg.madinahHotel,
          iconColor: 'text-[#7C3AED]',
          bgColor: 'bg-[#F5F3FF]',
        },
        {
          icon: Bus,
          label: 'Ground Transport',
          detail: pkg.transport,
          iconColor: 'text-[#EA580C]',
          bgColor: 'bg-[#FFF7ED]',
        },
        {
          icon: Utensils,
          label: 'Meals & Dining',
          detail: pkg.food,
          iconColor: 'text-[#E11D48]',
          bgColor: 'bg-[#FFF1F2]',
        },
      ],
    };
  });

  return (
    <section id="packages" className="py-12 sm:py-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F3EE] text-[#0B5D4B] border border-[#E5E5E0] text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24D]" />
            <span>{t('pkg.badge')}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#202522] tracking-tight">
            {t('pkg.heading')}
          </h2>

          <p className="text-[#333333] text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
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
                <div className="relative h-52 sm:h-72 w-full overflow-hidden bg-[#0A0D0C] rounded-t-[20px] z-[1]">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient Overlay at bottom for image-to-content transition */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Package Badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                    <span
                      className={`text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md ${card.badgeClass}`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  {/* Highlight Duration & Label Overlaid on Image Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-[#C9A24D]" />
                      <span>{card.highlight}</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-lg text-xs text-white/90 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A24D]" />
                      <span>{card.supportingLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 sm:p-7 flex flex-col justify-between flex-1 space-y-5 sm:space-y-6 rounded-b-[20px] bg-white z-[1]">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#202522] tracking-tight group-hover:text-[#0B5D4B] transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Four Facilities (2-Column Grid: Makkah Stay, Madina Stay, Ground Transport, Meals & Dining) */}
                  <div className="pt-2 border-t border-[#F0EFEA]">
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {card.facilities.map((fac, fIdx) => {
                        const Icon = fac.icon;
                        return (
                          <div
                            key={fIdx}
                            className="flex items-start gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-xl bg-[#FAFAF8] border border-[#F0EFEA] hover:border-[#0B5D4B]/25 transition-colors"
                          >
                            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg ${fac.bgColor} ${fac.iconColor} flex items-center justify-center shrink-0 mt-0.5 shadow-2xs`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] sm:text-xs font-bold text-[#202522] leading-tight truncate">
                                {fac.label}
                              </p>
                              <p className="text-[10px] sm:text-[11px] text-[#666666] leading-tight mt-0.5 truncate tabular-nums" title={fac.detail}>
                                {fac.detail}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price & CTA Action */}
                  <div className="pt-3 sm:pt-4 border-t border-[#E5E5E0] space-y-3 sm:space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-medium text-[#555555]">{t('pkg.starting')}</span>
                      <div className="text-right">
                        <span className="text-xl sm:text-2xl font-bold text-[#0B5D4B] tabular-nums tracking-tight">
                          {card.pkg.startingPrice}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-[#555555] block">
                          {t('pkg.perperson')}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectPackage(card.pkg)}
                      className="w-full py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] min-h-[48px] cursor-pointer bg-[#0B5D4B] hover:bg-[#084538] text-white shadow-xs hover:shadow-md"
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
