import React from 'react';
import { Check, Clock, Hotel, Train, Sparkles, ShieldCheck, ChevronRight, Phone } from 'lucide-react';
import { UMRAH_PACKAGES } from '../data/packages';
import { BRAND_INFO } from '../data/content';
import { MadinahGraphic } from './IslamicMotifs';

interface FeaturedPackageProps {
  onGetDetails: () => void;
}

export const FeaturedPackage: React.FC<FeaturedPackageProps> = ({ onGetDetails }) => {
  const premiumPkg = UMRAH_PACKAGES.find((p) => p.id === 'premium') || UMRAH_PACKAGES[2];

  return (
    <section className="py-14 sm:py-20 bg-[#F5F3EE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] rounded-3xl border-2 border-[#C9A24D]/60 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Visual Column: Authentic Photography */}
            <div className="lg:col-span-5 relative bg-[#0A0D0C] min-h-[300px] lg:min-h-[520px] flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=85"
                alt="Makkah Clock Tower and Holy Haram Plaza"
                className="w-full h-full object-cover min-h-[320px] absolute inset-0"
                loading="lazy"
              />
              
              {/* Neutral cinematic scrim overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
              
              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#C9A24D] text-[#202522] font-black text-xs uppercase px-3.5 py-1.5 rounded-full shadow-md tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 fill-[#202522]" />
                  MOST POPULAR
                </span>
              </div>

              {/* Bottom Quote Banner */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-white z-10">
                <p className="text-xs font-semibold text-[#F3DC9B]">
                  Clock Tower & Front Row Madinah
                </p>
                <p className="text-[11px] text-white/90 mt-0.5">
                  Steps away from the holy sanctuaries with zero walking stress.
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#0B5D4B]">
                  <span className="bg-[#F8F7F3] border border-[#E5E5E0] px-3 py-1 rounded-full flex items-center gap-1 text-[#202522]">
                    <Clock className="w-3.5 h-3.5 text-[#C9A24D]" />
                    {premiumPkg.duration}
                  </span>
                  <span className="bg-[#F8F7F3] border border-[#E5E5E0] px-3 py-1 rounded-full flex items-center gap-1 text-[#202522]">
                    <Train className="w-3.5 h-3.5 text-[#C9A24D]" />
                    Haramain Bullet Train Included
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
                  Premium Umrah Experience
                </h3>

                <p className="text-[#333333] text-sm sm:text-base leading-relaxed">
                  Tailored for families and elders seeking maximum proximity, superior 5-star comfort, and authentic scholar guidance from Trichy.
                </p>
              </div>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-3.5 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#202522] mb-1">
                    <Hotel className="w-4 h-4 text-[#C9A24D]" />
                    <span>Makkah: Fairmont Clock Tower (5★)</span>
                  </div>
                  <p className="text-[11px] text-[#555555]">
                    Direct private elevator access straight onto the Haram courtyard plaza.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#202522] mb-1">
                    <Hotel className="w-4 h-4 text-[#C9A24D]" />
                    <span>Madinah: Dar Al Taqwa / Pullman (5★)</span>
                  </div>
                  <p className="text-[11px] text-[#555555]">
                    Under 100 meters facing Prophet’s Mosque courtyard and Rawdah entrance.
                  </p>
                </div>
              </div>

              {/* Inclusions List with Clean Check Icons */}
              <div className="space-y-2.5 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[#202522]">
                  Signature Inclusions
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#333333]">
                  {[
                    '5-Star hotels directly connected to Haram',
                    'Business Class Haramain Bullet Train',
                    'Guided Tawaf & Sa’ee by senior Aalims',
                    'Guaranteed Rawdah permit assistance',
                    '3 Gourmet multi-cuisine buffet meals daily',
                    'Dedicated Trichy tour director 24/7 on ground',
                    'Complete VIP luggage and Ihram kit',
                    '5 Litres Zamzam water delivered to airport',
                  ].map((inc, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#0B5D4B] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="leading-snug">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E5E5E0]">
                <div>
                  <span className="text-xs text-[#555555] block">Starting from</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-[#0B5D4B] tabular-nums">
                      {premiumPkg.startingPrice}
                    </span>
                    <span className="text-xs text-[#555555]">/ pilgrim (All-inclusive)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${BRAND_INFO.phoneTel}`}
                    className="p-3 rounded-xl border border-[#E5E5E0] text-[#202522] hover:bg-[#F8F7F3] hover:text-[#0B5D4B] transition-colors"
                    title="Direct Phone Inquiry"
                  >
                    <Phone className="w-5 h-5 text-[#C9A24D]" />
                  </a>

                  <button
                    onClick={onGetDetails}
                    className="flex-1 sm:flex-none bg-[#0B5D4B] hover:bg-[#084538] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] min-h-[48px]"
                  >
                    <span>Get Package Details</span>
                    <ChevronRight className="w-4 h-4 text-[#C9A24D]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
