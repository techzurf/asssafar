import React from 'react';
import { MapPin, Sparkles, Heart } from 'lucide-react';
import { KaabaGraphic, MadinahGraphic } from './IslamicMotifs';

export const MakkahMadinah: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0B5D4B]">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24D]" />
            <span>The Two Holy Sanctuaries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#202522] tracking-tight">
            Makkah Al-Mukarramah & Madinah Al-Munawwarah
          </h2>
          <p className="text-[#333333] text-base leading-relaxed">
            Two sacred sanctuaries where millions gather in devotion, repentance, and peace.
          </p>
        </div>

        {/* 2 Feature Cards Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Makkah Card */}
          <div className="bg-white rounded-3xl overflow-hidden border border-[#E5E5E0] shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-[16/10] bg-[#0A0D0C] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80"
                alt="Masjid al-Haram and the Kaaba in Makkah"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20" />
              
              <div className="absolute top-4 left-4">
                <span className="bg-[#0B5D4B] text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A24D]" />
                  Makkah Al-Mukarramah
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  Experience the spiritual heart of Islam.
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <p className="text-sm text-[#333333] leading-relaxed">
                Makkah is where the revelations began and where Muslims turn five times each day. Stand in awe before the Holy Kaaba, drink refreshing Zamzam water, and circumambulate under the guidance of As-Safar scholars.
              </p>

              <div className="pt-2 border-t border-[#E5E5E0]">
                <p className="text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
                  Featured Ziyarat & Landmarks
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Masjid al-Haram & Kaaba', 'Mataf & Safa-Marwah', 'Jabal al-Noor (Cave of Hira)', 'Ghar Thawr', 'Mina & Muzdalifah', 'Jabal ar-Rahmah (Arafat)'].map((site, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-[#F8F7F3] text-[#202522] border border-[#E5E5E0] font-medium">
                      {site}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Madinah Card */}
          <div className="bg-white rounded-3xl overflow-hidden border border-[#E5E5E0] shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-[16/10] bg-[#0A0D0C] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1200&q=80"
                alt="Al-Masjid an-Nabawi Courtyard in Madinah"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20" />
              
              <div className="absolute top-4 left-4">
                <span className="bg-[#C9A24D] text-[#202522] text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <Heart className="w-3.5 h-3.5 fill-[#202522]" />
                  Madinah Al-Munawwarah
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  Visit the beloved city of Prophet Muhammad ﷺ.
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <p className="text-sm text-[#333333] leading-relaxed">
                Experience unparalleled tranquility in the radiant city of the Prophet ﷺ. Offer greetings at the Rawdah ash-Sharifah, pray under the iconic open shading umbrellas of Masjid an-Nabawi, and walk the serene paths of early Islam.
              </p>

              <div className="pt-2 border-t border-[#E5E5E0]">
                <p className="text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
                  Featured Ziyarat & Landmarks
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Masjid an-Nabawi', 'Rawdah ash-Sharifah', 'Mount Uhud & Martyrs Cemetery', 'Masjid Quba (First Mosque)', 'Masjid al-Qiblatain', 'Madinah Dates Market'].map((site, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-[#F8F7F3] text-[#202522] border border-[#E5E5E0] font-medium">
                      {site}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
