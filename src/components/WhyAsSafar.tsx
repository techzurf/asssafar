import React from 'react';
import { Compass, ShieldCheck, Building2, Bus, HeartHandshake, Sparkles } from 'lucide-react';
import { WHY_AS_SAFAR, BRAND_INFO } from '../data/content';

export const WhyAsSafar: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Compass: <Compass className="w-6 h-6 text-[#C9A24D]" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#C9A24D]" />,
    Building2: <Building2 className="w-6 h-6 text-[#C9A24D]" />,
    Bus: <Bus className="w-6 h-6 text-[#C9A24D]" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-[#C9A24D]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#C9A24D]" />,
  };

  return (
    <section id="why-us" className="py-14 sm:py-20 bg-[#FFFFFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3EE] border border-[#E5E5E0] text-xs font-bold uppercase tracking-wider text-[#0B5D4B]">
            <span className="w-2 h-2 rounded-full bg-[#C9A24D]" />
            <span>Integrity · Reliability · Sunnah</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#202522] tracking-tight">
            Why Choose As-Safar?
          </h2>
          <p className="text-[#333333] text-base leading-relaxed">
            Built upon years of dedicated service to the pilgrims of Tamil Nadu, we prioritize your spiritual peace above everything else.
          </p>
        </div>

        {/* 6 Elegant Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_AS_SAFAR.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5E5E0] hover:border-[#0B5D4B]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0] group-hover:bg-[#0B5D4B] transition-colors flex items-center justify-center">
                    <div className="group-hover:text-white transition-colors">
                      {iconMap[item.icon] || <Sparkles className="w-6 h-6 text-[#C9A24D]" />}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-[#202522] tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#333333] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E5E5E0] flex items-center justify-between text-xs text-[#555555] font-semibold tabular-nums">
                  <span>Trichy Pilgrim Commitment</span>
                  <span className="text-[#C9A24D]">0{index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Adjacency Trust Numbers Banner (Light corporate surface) */}
        <div className="mt-12 bg-[#F8F7F3] text-[#202522] rounded-2xl p-6 sm:p-8 border border-[#E5E5E0] grid grid-cols-2 lg:grid-cols-4 gap-6 text-center shadow-xs">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#0B5D4B] tabular-nums tracking-tight">
              {BRAND_INFO.yearsExperience}
            </div>
            <div className="text-xs sm:text-sm text-[#555555] mt-1 font-medium">
              Pilgrimage Experience
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#0B5D4B] tabular-nums tracking-tight">
              {BRAND_INFO.pilgrimsServed}
            </div>
            <div className="text-xs sm:text-sm text-[#555555] mt-1 font-medium">
              Pilgrims Guided Safely
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#0B5D4B] tabular-nums tracking-tight">
              {BRAND_INFO.satisfactionRate}
            </div>
            <div className="text-xs sm:text-sm text-[#555555] mt-1 font-medium">
              Satisfaction Rating
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#0B5D4B] tracking-tight">
              Trichy
            </div>
            <div className="text-xs sm:text-sm text-[#555555] mt-1 font-medium">
              Direct Local Office Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
