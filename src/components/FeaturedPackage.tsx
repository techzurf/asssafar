import React from 'react';
import { Check, Hotel, Building, Users, Moon, Calendar, ChevronRight, Phone, ShieldCheck, Bus, Utensils } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

interface FeaturedPackageProps {
  onGetDetails?: () => void;
}

export const FeaturedPackage: React.FC<FeaturedPackageProps> = ({ onGetDetails }) => {
  const handleBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onGetDetails) {
      onGetDetails();
    }
    // Client-side navigation to Hajj 2027 Registration flow
    window.history.pushState({}, '', '/hajj-2027');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section className="py-14 sm:py-20 bg-[#F5F3EE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hajj-2027-card bg-[#FFFFFF] rounded-3xl border-2 border-[#C9A24D]/60 shadow-lg overflow-hidden relative">
          {/* Uiverse Animated Premium Corner Ribbon */}
          <div className="hajj-premium-ribbon" aria-hidden="true" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Visual Column: Authentic Hajj Pilgrimage Photography */}
            <div className="lg:col-span-5 relative bg-[#0A0D0C] min-h-[300px] lg:min-h-[520px] flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=85"
                alt="Pilgrims gathering in Makkah for the sacred Hajj pilgrimage"
                className="w-full h-full object-cover min-h-[320px] absolute inset-0"
                loading="lazy"
              />
              
              {/* Neutral cinematic scrim overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
              
              {/* Overlay Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-[#C9A24D] text-[#202522] font-black text-xs uppercase px-3.5 py-1.5 rounded-full shadow-md tracking-wider flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 fill-[#202522]" />
                  HAJJ 2027
                </span>
              </div>

              {/* Bottom Quote Banner */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-white z-10">
                <p className="text-xs font-semibold text-[#F3DC9B]">
                  Hajj 2027 Registration Open
                </p>
                <p className="text-[11px] text-white/90 mt-0.5">
                  Dedicated pilgrim support & guidance from Trichy.
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#0B5D4B]">
                  <span className="bg-[#F8F7F3] border border-[#E5E5E0] px-3 py-1 rounded-full flex items-center gap-1.5 text-[#202522]">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A24D]" />
                    Hajj 2027 Registration Open
                  </span>
                  <span className="bg-[#F8F7F3] border border-[#E5E5E0] px-3 py-1 rounded-full flex items-center gap-1.5 text-[#202522]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C9A24D]" />
                    Verified Pilgrim Assistance
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-semibold text-[#202522] tracking-tight">
                  Hajj 2027 Premium Package
                </h3>

                <p className="text-[#333333] text-sm sm:text-base leading-relaxed">
                  Experience your sacred Hajj journey with carefully planned travel arrangements, comfortable accommodation, and dedicated pilgrim assistance.
                </p>
              </div>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-3.5 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#202522] mb-1">
                    <Hotel className="w-4 h-4 text-[#C9A24D]" />
                    <span>Accommodation in Makkah</span>
                  </div>
                  <p className="text-[11px] text-[#555555]">
                    Comfortable hotel accommodations with organized access to the holy Haram.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#202522] mb-1">
                    <Building className="w-4 h-4 text-[#C9A24D]" />
                    <span>Accommodation in Madinah</span>
                  </div>
                  <p className="text-[11px] text-[#555555]">
                    Convenient lodging close to Al-Masjid an-Nabawi for restful devotion.
                  </p>
                </div>
              </div>

              {/* Package Inclusions List */}
              <div className="space-y-2.5 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[#202522]">
                  Package Details & Inclusions
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#333333]">
                  {[
                    'Accommodation in Makkah',
                    'Accommodation in Madinah',
                    'Hajj transportation and group coordination',
                    'Pilgrim assistance and guidance',
                    'Meals and essential travel support',
                    'Experienced scholar coordination for Hajj rites',
                  ].map((inc, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#0B5D4B] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="leading-snug font-medium text-[#202522]">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E5E5E0]">
                <div>
                  <span className="text-xs text-[#555555] block">Package Price</span>
                  <div className="flex flex-col">
                    <span className="text-3xl sm:text-4xl font-bold text-[#0B5D4B] tabular-nums tracking-tight">
                      ₹7,50,000
                    </span>
                    <span className="text-xs font-medium text-[#555555]">per person</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${BRAND_INFO.phoneTel}`}
                    className="p-3.5 rounded-xl border border-[#E5E5E0] text-[#202522] hover:bg-[#F8F7F3] hover:text-[#0B5D4B] transition-colors shrink-0"
                    title="Call As-Safar for Hajj 2027 Inquiry"
                    aria-label="Call for Hajj 2027 Inquiry"
                  >
                    <Phone className="w-5 h-5 text-[#C9A24D]" />
                  </a>

                  <a
                    href="/hajj-2027"
                    onClick={handleBooking}
                    className="flex-1 sm:flex-none bg-[#0B5D4B] hover:bg-[#084538] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] min-h-[48px]"
                  >
                    <span>Book Hajj 2027</span>
                    <ChevronRight className="w-4 h-4 text-[#C9A24D]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
