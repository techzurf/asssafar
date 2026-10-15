import React from 'react';
import { NEXT_GROUP_DEPARTURE_CONFIG } from '../data/announcementData';
import { Phone } from 'lucide-react';

export const TopAnnouncementBar: React.FC = () => {
  if (!NEXT_GROUP_DEPARTURE_CONFIG.isActive) {
    return null;
  }

  const {
    prefixBadge,
    departureDate,
    departureTime,
    contactNumber,
    contactTel,
  } = NEXT_GROUP_DEPARTURE_CONFIG;

  // Single unit of the announcement text
  const AnnouncementItem = () => (
    <div className="inline-flex items-center text-xs sm:text-[13px] text-white tracking-wide whitespace-nowrap px-4 select-none">
      {/* Kaaba Emoji & Badge */}
      <span className="mr-1.5 text-sm sm:text-base leading-none" aria-hidden="true">
        🕋
      </span>
      <span className="font-bold text-[#FFCE1B] tracking-wider uppercase text-[11px] sm:text-xs">
        {prefixBadge}
      </span>

      {/* Gold Separator */}
      <span className="text-[#C9A24D] mx-2.5 sm:mx-3 font-light" aria-hidden="true">
        |
      </span>

      {/* Departure Date */}
      <span className="inline-flex items-center gap-1">
        <span className="text-[#EAF3EF]/90 font-medium">Departure Date:</span>{' '}
        <strong className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded text-[11px] sm:text-xs border border-white/20 tabular-nums">
          {departureDate}
        </strong>
      </span>

      {/* Gold Separator */}
      <span className="text-[#C9A24D] mx-2.5 sm:mx-3 font-light" aria-hidden="true">
        |
      </span>

      {/* Departure Time */}
      <span className="inline-flex items-center gap-1">
        <span className="text-[#EAF3EF]/90 font-medium">Departure Time:</span>{' '}
        <strong className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded text-[11px] sm:text-xs border border-white/20 tabular-nums">
          {departureTime}
        </strong>
      </span>

      {/* Gold Separator */}
      <span className="text-[#C9A24D] mx-2.5 sm:mx-3 font-light" aria-hidden="true">
        |
      </span>

      {/* Contact */}
      <a
        href={`tel:${contactTel}`}
        className="inline-flex items-center gap-1.5 hover:text-[#FFCE1B] text-white transition-colors cursor-pointer"
        title="Call As-Safar for Group Booking"
      >
        <Phone className="w-3 h-3 text-[#C9A24D]" />
        <span className="text-[#EAF3EF]/90 font-medium">Contact Us:</span>{' '}
        <span className="font-bold text-[#FFCE1B] underline decoration-[#C9A24D]/60 decoration-1 underline-offset-2 tabular-nums">
          {contactNumber}
        </span>
      </a>

      {/* Repeating Star Separator */}
      <span className="text-[#C9A24D] mx-5 sm:mx-8 text-xs font-bold" aria-hidden="true">
        ✦
      </span>
    </div>
  );

  return (
    <aside
      role="region"
      aria-label="Upcoming Umrah Group Departure Announcement"
      className="group relative w-full overflow-hidden bg-[#073E32] border-b border-[#0B5D4B]/50 h-[36px] sm:h-[40px] flex items-center z-50 shadow-2xs"
    >
      {/* Edge gradient scrims for clean continuous fade in/out */}
      <div 
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#073E32] to-transparent z-10" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#073E32] to-transparent z-10" 
        aria-hidden="true" 
      />

      {/* Continuous seamless horizontally scrolling track */}
      <div className="animate-announcement-marquee flex items-center">
        {/* Set 1 */}
        <div className="flex items-center">
          <AnnouncementItem />
          <AnnouncementItem />
        </div>
        {/* Set 2 (Identical for continuous infinite loop without jumping) */}
        <div className="flex items-center" aria-hidden="true">
          <AnnouncementItem />
          <AnnouncementItem />
        </div>
      </div>
    </aside>
  );
};
