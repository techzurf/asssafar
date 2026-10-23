import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { NEXT_GROUP_DEPARTURE_CONFIG } from '../data/announcementData';
import { AnnouncementConfigState } from '../admin/types/adminTypes';
import { 
  fetchAnnouncementSettings, 
  ANNOUNCEMENT_UPDATED_EVENT, 
  ANNOUNCEMENT_SETTINGS_TABLE,
  mapRowToAnnouncementConfig
} from '../services/announcementService';
import { supabase } from '../admin/auth/supabaseClient';

export const TopAnnouncementBar: React.FC = () => {
  // Initialize state with default configuration to avoid layout shift on first render
  const [config, setConfig] = useState<AnnouncementConfigState>({
    isActive: NEXT_GROUP_DEPARTURE_CONFIG.isActive,
    prefixBadge: NEXT_GROUP_DEPARTURE_CONFIG.prefixBadge,
    announcementText: '',
    departureDate: NEXT_GROUP_DEPARTURE_CONFIG.departureDate,
    departureTime: NEXT_GROUP_DEPARTURE_CONFIG.departureTime,
    contactNumber: NEXT_GROUP_DEPARTURE_CONFIG.contactNumber,
    contactTel: NEXT_GROUP_DEPARTURE_CONFIG.contactTel,
    lastUpdated: '',
  });

  // Fetch saved settings from Supabase and listen for live updates
  useEffect(() => {
    let isMounted = true;

    // 1. Initial fetch from Supabase
    fetchAnnouncementSettings()
      .then((result) => {
        if (isMounted && result.data) {
          setConfig(result.data);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch announcement settings from Supabase:', err);
      });

    // 2. Custom window event listener for immediate updates saved within the same session/tab
    const handleLocalUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<AnnouncementConfigState>;
      if (customEvent.detail && isMounted) {
        setConfig(customEvent.detail);
      }
    };
    window.addEventListener(ANNOUNCEMENT_UPDATED_EVENT, handleLocalUpdate);

    // 3. Supabase Realtime channel subscription for updates saved across different tabs or browsers
    let subscription: any = null;
    if (supabase) {
      try {
        const channel = supabase
          .channel(`public:${ANNOUNCEMENT_SETTINGS_TABLE}`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: ANNOUNCEMENT_SETTINGS_TABLE,
            },
            (payload) => {
              if (payload.new && isMounted) {
                setConfig(mapRowToAnnouncementConfig(payload.new));
              }
            }
          )
          .subscribe();

        subscription = channel;
      } catch (subErr) {
        console.warn('Realtime subscription not established:', subErr);
      }
    }

    return () => {
      isMounted = false;
      window.removeEventListener(ANNOUNCEMENT_UPDATED_EVENT, handleLocalUpdate);
      if (subscription && supabase) {
        supabase.removeChannel(subscription);
      }
    };
  }, []);

  // When disabled by the administrator, hide the bar completely
  if (!config.isActive) {
    return null;
  }

  const {
    prefixBadge,
    departureDate,
    departureTime,
    contactNumber,
    contactTel,
    announcementText,
  } = config;

  // Single unit of the announcement text
  const AnnouncementItem = () => (
    <div className="inline-flex items-center text-[11px] sm:text-xs text-white tracking-wide whitespace-nowrap px-3 sm:px-4 select-none">
      {/* Kaaba Emoji & Badge */}
      <span className="mr-1.5 text-xs sm:text-sm leading-none" aria-hidden="true">
        🕋
      </span>
      <span className="font-bold text-[#FFCE1B] tracking-wider uppercase text-[10px] sm:text-xs">
        {prefixBadge || 'NEXT UMRAH GROUP DEPARTURE'}
      </span>

      {/* Gold Separator */}
      <span className="text-[#C9A24D] mx-2 sm:mx-3 font-light" aria-hidden="true">
        |
      </span>

      {/* Departure Date */}
      <span className="inline-flex items-center gap-1">
        <span className="text-[#EAF3EF]/90 font-medium">Departure Date:</span>{' '}
        <strong className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded text-[10px] sm:text-xs border border-white/20 tabular-nums">
          {departureDate || 'Announcing Soon'}
        </strong>
      </span>

      {/* Gold Separator */}
      <span className="text-[#C9A24D] mx-2 sm:mx-3 font-light" aria-hidden="true">
        |
      </span>

      {/* Departure Time */}
      <span className="inline-flex items-center gap-1">
        <span className="text-[#EAF3EF]/90 font-medium">Departure Time:</span>{' '}
        <strong className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded text-[10px] sm:text-xs border border-white/20 tabular-nums">
          {departureTime || 'TBA'}
        </strong>
      </span>

      {/* Optional Extended Description */}
      {announcementText && announcementText.trim() !== '' && (
        <>
          <span className="text-[#C9A24D] mx-2 sm:mx-3 font-light" aria-hidden="true">
            |
          </span>
          <span className="text-[#EAF3EF]/95 font-medium text-[10px] sm:text-xs hidden md:inline">
            {announcementText}
          </span>
        </>
      )}

      {/* Gold Separator */}
      <span className="text-[#C9A24D] mx-2 sm:mx-3 font-light" aria-hidden="true">
        |
      </span>

      {/* Contact */}
      <a
        href={`tel:${contactTel || contactNumber.replace(/[^\d+]/g, '')}`}
        className="inline-flex items-center gap-1.5 hover:text-[#FFCE1B] text-white transition-colors cursor-pointer"
        title="Call As-Safar for Group Booking"
      >
        <Phone className="w-3 h-3 text-[#C9A24D]" />
        <span className="text-[#EAF3EF]/90 font-medium">Contact Us:</span>{' '}
        <span className="font-bold text-[#FFCE1B] underline decoration-[#C9A24D]/60 decoration-1 underline-offset-2 tabular-nums">
          {contactNumber || '+91 95663 69654'}
        </span>
      </a>

      {/* Repeating Star Separator */}
      <span className="text-[#C9A24D] mx-4 sm:mx-8 text-xs font-bold" aria-hidden="true">
        ✦
      </span>
    </div>
  );

  return (
    <aside
      role="region"
      aria-label="Upcoming Umrah Group Departure Announcement"
      className="group relative w-full overflow-hidden bg-[#073E32] border-b border-[#0B5D4B]/50 h-[32px] sm:h-[38px] flex items-center z-50 shadow-2xs"
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
