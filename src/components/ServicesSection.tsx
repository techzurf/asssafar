import React from 'react';
import { 
  FileCheck, 
  Plane, 
  Building, 
  Car, 
  MapPin, 
  BookOpen, 
  ClipboardList, 
  Users, 
  Home, 
  HeartHandshake 
} from 'lucide-react';
import { SERVICES_LIST } from '../data/content';

const serviceCardStyles: Record<
  string,
  { bg: string; hoverBg: string; border: string }
> = {
  visa: {
    bg: 'bg-[#DCE8D5]', // 1. Soft Sage Green
    hoverBg: 'hover:bg-[#D4E2CD]',
    border: 'border-[#2F6B58]/20 hover:border-[#2F6B58]/40',
  },
  flights: {
    bg: 'bg-[#DCEAF2]', // 2. Soft Sky Blue
    hoverBg: 'hover:bg-[#CFE2ED]',
    border: 'border-[#396F8E]/20 hover:border-[#396F8E]/40',
  },
  hotels: {
    bg: 'bg-[#F3E4C3]', // 3. Warm Champagne
    hoverBg: 'hover:bg-[#EEDBB5]',
    border: 'border-[#C9A24D]/30 hover:border-[#C9A24D]/50',
  },
  transport: {
    bg: 'bg-[#D5E9E4]', // 4. Soft Teal
    hoverBg: 'hover:bg-[#CAE2DC]',
    border: 'border-[#1F6E6C]/20 hover:border-[#1F6E6C]/40',
  },
  ziyarat: {
    bg: 'bg-[#E4E6C8]', // 5. Light Olive
    hoverBg: 'hover:bg-[#DADCB9]',
    border: 'border-[#5A6E46]/20 hover:border-[#5A6E46]/40',
  },
  guidance: {
    bg: 'bg-[#E5DDF0]', // 6. Soft Lavender
    hoverBg: 'hover:bg-[#DCD2E9]',
    border: 'border-[#6B528E]/20 hover:border-[#6B528E]/40',
  },
  documentation: {
    bg: 'bg-[#F3DDD2]', // 7. Pale Peach
    hoverBg: 'hover:bg-[#ECD1C4]',
    border: 'border-[#9E6551]/20 hover:border-[#9E6551]/40',
  },
  group: {
    bg: 'bg-[#D5E6D8]', // 8. Soft Emerald Tint
    hoverBg: 'hover:bg-[#C9DFCD]',
    border: 'border-[#0B5D4B]/25 hover:border-[#0B5D4B]/45',
  },
  family: {
    bg: 'bg-[#EBD9B7]', // 9. Warm Sand
    hoverBg: 'hover:bg-[#E3CFA9]',
    border: 'border-[#9E7D46]/25 hover:border-[#9E7D46]/45',
  },
  seniors: {
    bg: 'bg-[#D8E3EE]', // 10. Soft Powder Blue
    hoverBg: 'hover:bg-[#CCD9E6]',
    border: 'border-[#446788]/20 hover:border-[#446788]/40',
  },
};

export const ServicesSection: React.FC = () => {
  const iconLookup: Record<string, React.ReactNode> = {
    FileCheck: <FileCheck className="w-5 h-5 text-[#0B5D4B]" />,
    Plane: <Plane className="w-5 h-5 text-[#0B5D4B]" />,
    Building: <Building className="w-5 h-5 text-[#0B5D4B]" />,
    Car: <Car className="w-5 h-5 text-[#0B5D4B]" />,
    MapPin: <MapPin className="w-5 h-5 text-[#0B5D4B]" />,
    BookOpen: <BookOpen className="w-5 h-5 text-[#0B5D4B]" />,
    ClipboardList: <ClipboardList className="w-5 h-5 text-[#0B5D4B]" />,
    Users: <Users className="w-5 h-5 text-[#0B5D4B]" />,
    Home: <Home className="w-5 h-5 text-[#0B5D4B]" />,
    HeartHandshake: <HeartHandshake className="w-5 h-5 text-[#0B5D4B]" />,
  };

  return (
    <section className="py-14 sm:py-20 bg-[#F5F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5E5E0] text-xs font-bold uppercase tracking-wider text-[#0B5D4B]">
            <span className="w-2 h-2 rounded-full bg-[#C9A24D]" />
            <span>Comprehensive Pilgrimage Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#202522] tracking-tight">
            Our Umrah Services
          </h2>
          <p className="text-[#333333] text-base leading-relaxed">
            Every aspect of your pilgrimage is managed with meticulous attention to detail by As-Safar professionals.
          </p>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {SERVICES_LIST.map((srv) => {
            const style = serviceCardStyles[srv.id] || {
              bg: 'bg-[#F8F7F3]',
              hoverBg: 'hover:bg-[#F5F3EE]',
              border: 'border-[#E5E5E0] hover:border-[#0B5D4B]/30',
            };

            return (
              <div
                key={srv.id}
                className={`${style.bg} ${style.hoverBg} ${style.border} rounded-2xl p-5 border shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group`}
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {iconLookup[srv.iconName]}
                  </div>

                  <h3 className="text-lg font-semibold text-[#202522] leading-snug">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-[#333333] leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#E5E5E0]/60">
                  <span className="text-[10px] font-bold text-[#0B5D4B] uppercase tracking-wide block">
                    {srv.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
