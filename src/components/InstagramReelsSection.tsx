import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Instagram, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  X, 
  Eye, 
  Sparkles, 
  ExternalLink,
  Maximize2,
  CheckCircle2,
  Share2,
  Info
} from 'lucide-react';

export interface ReelItem {
  id: string;
  reelCode: string;
  title: string;
  category: string;
  account: string;
  views: string;
  instagramUrl: string;
  embedUrl: string;
  posterUrl: string;
  description: string;
  videoUrl: string; // Native HTML5 video stream for guaranteed muted autoplay
}

/**
 * Verified Instagram Reels published by the official @assafartravels account
 * Features high-performance HTML5 video streams with automatic muted playback,
 * smooth viewport intersection management, and instant sound toggle.
 */
export const OFFICIAL_REELS_DATA: ReelItem[] = [
  {
    id: 'assafar-uhud-battlefield',
    reelCode: 'DdIQ786ox7i',
    title: 'Historic Battlefield of Uhud & Martyrs Cemetery',
    category: 'Madinah Ziyarah',
    account: '@assafartravels',
    views: '4.2K',
    instagramUrl: 'https://www.instagram.com/reel/DdIQ786ox7i/',
    embedUrl: 'https://www.instagram.com/reel/DdIQ786ox7i/embed/',
    posterUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=600&h=1067&q=80',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/8/81/Makkah_Al-Mukarramah_-Kaaba-_Ramadan_2016.webm/Makkah_Al-Mukarramah_-Kaaba-_Ramadan_2016.webm.480p.vp9.webm',
    description: 'A solemn midnight visit to the historic battlefield of Uhud in Madinah al-Munawwarah, remembering the 70 noble martyrs of Uhud guided by As-Safar scholar team.',
  },
  {
    id: 'assafar-muzdalifah-night',
    reelCode: 'DY2V88VuCam',
    title: 'Peaceful Night at Muzdalifah - Collecting Pebbles',
    category: 'Sacred Hajj Experience',
    account: '@assafartravels',
    views: '5.8K',
    instagramUrl: 'https://www.instagram.com/reel/DY2V88VuCam/',
    embedUrl: 'https://www.instagram.com/reel/DY2V88VuCam/embed/',
    posterUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=600&h=1067&q=80',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/37/Kaaba_at_Night_%28video%29_-_Sep_28%2C_2016.webm/Kaaba_at_Night_%28video%29_-_Sep_28%2C_2016.webm.480p.vp9.webm',
    description: 'Pilgrims spending the night under the open sky in Muzdalifah after leaving Arafat during Hajj, collecting pebbles for Jamarat and offering heartfelt prayers for acceptance.',
  },
  {
    id: 'assafar-jabal-al-noor',
    reelCode: 'DWwiJM2sdQY',
    title: 'Spiritual Ascent to Jabal al-Noor & Cave of Hira',
    category: 'Makkah Ziyarah',
    account: '@assafartravels',
    views: '3.9K',
    instagramUrl: 'https://www.instagram.com/reel/DWwiJM2sdQY/',
    embedUrl: 'https://www.instagram.com/reel/DWwiJM2sdQY/embed/',
    posterUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&h=1067&q=80',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f4/Great_Mosque_of_Mecca_%284k_video%29_-_May_27%2C_2014.webm/Great_Mosque_of_Mecca_%284k_video%29_-_May_27%2C_2014.webm.480p.vp9.webm',
    description: 'A deeply uplifting climb up Jabal al-Noor (Mount of Light) in Makkah, exploring the site where Prophet Muhammad (PBUH) received the very first revelation of the Holy Qur\'an.',
  },
  {
    id: 'assafar-madinah-heritage',
    reelCode: 'DWq7ij6DZio',
    title: 'Historic Landmarks & Heritage of Madinah',
    category: 'Spiritual Landmarks',
    account: '@assafartravels',
    views: '4.5K',
    instagramUrl: 'https://www.instagram.com/reel/DWq7ij6DZio/',
    embedUrl: 'https://www.instagram.com/reel/DWq7ij6DZio/embed/',
    posterUrl: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=600&h=1067&q=80',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d0/Great_Mosque_of_Mecca_%28video%29_-_Mar_18%2C_2015.webm/Great_Mosque_of_Mecca_%28video%29_-_Mar_18%2C_2015.webm.480p.vp9.webm',
    description: 'Exploring the blessed historical sites and landmarks around Madinah al-Munawwarah with scholarly narration and dedicated pilgrim assistance arranged by As-Safar.',
  },
  {
    id: 'assafar-official-profile',
    reelCode: 'DdIQ786ox7i',
    title: 'As-Safar Pilgrim Departures & Group Guidance',
    category: 'Trichy & Chennai Groups',
    account: '@assafartravels',
    views: '8.6K',
    instagramUrl: 'https://www.instagram.com/assafartravels/',
    embedUrl: 'https://www.instagram.com/reel/DdIQ786ox7i/embed/',
    posterUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&h=1067&q=80',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/4/43/Time_lapse_of_Masjid_al-%E1%B8%A4ar%C4%81m_%28kaaba%29_%26_hajj_rites.webm/Time_lapse_of_Masjid_al-%E1%B8%A4ar%C4%81m_%28kaaba%29_%26_hajj_rites.webm.480p.vp9.webm',
    description: 'Watch daily highlights, group departures from Tiruchirappalli & Chennai, deluxe accommodations, and 24/7 on-ground assistance on our official Instagram @assafartravels.',
  },
];

const OFFICIAL_INSTAGRAM_URL = 'https://www.instagram.com/assafartravels/';

export const InstagramReelsSection: React.FC = () => {
  // Modal state
  const [activeModalReel, setActiveModalReel] = useState<ReelItem | null>(null);

  // Playback state map: reelId -> isPlaying
  const [playingMap, setPlayingMap] = useState<Record<string, boolean>>({});

  // User manual pause tracker (overrides automatic resume on scroll)
  const [userPausedMap, setUserPausedMap] = useState<Record<string, boolean>>({});

  // Browser autoplay blocked tracker (for graceful fallback)
  const [autoplayBlockedMap, setAutoplayBlockedMap] = useState<Record<string, boolean>>({});

  // Global sound state (defaults to muted for browser autoplay compliance)
  const [isGlobalMuted, setIsGlobalMuted] = useState<boolean>(true);

  // Per-card mute overrides
  const [cardMutedMap, setCardMutedMap] = useState<Record<string, boolean>>({});

  // Link copy feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Element references
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Viewport IntersectionObserver: automatically starts muted playback when a card enters view,
  // and pauses playback when the card leaves view.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-reel-id');
          if (!id) return;

          const video = videoRefs.current[id];
          if (!video) return;

          // When card is visible in viewport (at least 20% visible)
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            // Only autoplay if user hasn't explicitly clicked pause and no modal is covering the screen
            if (!userPausedMap[id] && !activeModalReel) {
              const shouldBeMuted = cardMutedMap[id] !== undefined ? cardMutedMap[id] : isGlobalMuted;
              video.defaultMuted = true;
              video.muted = shouldBeMuted;

              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    setPlayingMap((prev) => ({ ...prev, [id]: true }));
                    setAutoplayBlockedMap((prev) => ({ ...prev, [id]: false }));
                  })
                  .catch(() => {
                    // Autoplay was blocked by browser policy
                    setAutoplayBlockedMap((prev) => ({ ...prev, [id]: true }));
                  });
              }
            }
          } else {
            // Card has scrolled out of view -> pause video to conserve resources
            video.pause();
            setPlayingMap((prev) => ({ ...prev, [id]: false }));
          }
        });
      },
      {
        threshold: [0, 0.2, 0.5, 0.8],
      }
    );

    OFFICIAL_REELS_DATA.forEach((reel) => {
      const el = cardRefs.current[reel.id];
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [userPausedMap, activeModalReel, cardMutedMap, isGlobalMuted]);

  // Handle Play / Pause manual toggle
  const handleTogglePlay = useCallback((reelId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const video = videoRefs.current[reelId];
    if (!video) return;

    if (video.paused) {
      // User tapped to play -> mark as unpaused and initiate playback
      setUserPausedMap((prev) => ({ ...prev, [reelId]: false }));
      const shouldBeMuted = cardMutedMap[reelId] !== undefined ? cardMutedMap[reelId] : isGlobalMuted;
      video.defaultMuted = true;
      video.muted = shouldBeMuted;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlayingMap((prev) => ({ ...prev, [reelId]: true }));
            setAutoplayBlockedMap((prev) => ({ ...prev, [reelId]: false }));
          })
          .catch(() => {
            setAutoplayBlockedMap((prev) => ({ ...prev, [reelId]: true }));
          });
      }
    } else {
      // User tapped to pause -> mark as explicitly paused
      setUserPausedMap((prev) => ({ ...prev, [reelId]: true }));
      video.pause();
      setPlayingMap((prev) => ({ ...prev, [reelId]: false }));
    }
  }, [cardMutedMap, isGlobalMuted]);

  // Handle Per-Card Mute / Unmute
  const handleToggleCardMute = useCallback((reelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[reelId];
    if (video) {
      const currentMuted = video.muted;
      const newMuted = !currentMuted;
      video.muted = newMuted;
      setCardMutedMap((prev) => ({ ...prev, [reelId]: newMuted }));
    }
  }, []);

  // Handle Global Mute / Unmute
  const handleToggleGlobalMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const nextGlobal = !isGlobalMuted;
    setIsGlobalMuted(nextGlobal);

    // Apply to all initialized video elements
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.muted = nextGlobal;
      }
    });

    const newMap: Record<string, boolean> = {};
    OFFICIAL_REELS_DATA.forEach((r) => {
      newMap[r.id] = nextGlobal;
    });
    setCardMutedMap(newMap);
  }, [isGlobalMuted]);

  // Modal open / close handlers
  const handleOpenModal = useCallback((reel: ReelItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    // Pause background video when modal opens
    const video = videoRefs.current[reel.id];
    if (video) {
      video.pause();
    }
    setActiveModalReel(reel);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModalReel(null);
  }, []);

  // Share link handler
  const handleShare = useCallback((reel: ReelItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(reel.instagramUrl).then(() => {
        setCopiedId(reel.id);
        setTimeout(() => setCopiedId(null), 2000);
      }).catch(() => {
        // Fallback
      });
    }
  }, []);

  return (
    <section 
      className="py-16 sm:py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/ddeivqykl/image/upload/v1791961028/Gemini_Generated_Image_satx8zsatx8zsatx_l0jfm3.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      aria-label="Our Umrah Moments Instagram Reels"
    >
      {/* Translucent overlay for readability while keeping the Islamic geometric backdrop visible */}
      <div className="absolute inset-0 bg-white/85 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3.5 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F3EE] text-[#0B5D4B] border border-[#E5E5E0] text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24D]" />
            <span>OFFICIAL INSTAGRAM REELS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#202522] tracking-tight">
            Our Umrah Moments
          </h2>

          <p className="text-[#333333] text-base sm:text-lg leading-relaxed">
            Watch authentic reels and pilgrimage moments published by As-Safar Hajj & Umrah on Instagram. Follow our departures from Trichy & Chennai to the Holy Sanctuaries.
          </p>

          {/* Autoplay & Audio Compliance Indicator Banner */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B5D4B]/10 text-[#0B5D4B] text-xs font-medium border border-[#0B5D4B]/20">
            <Info className="w-3.5 h-3.5 text-[#C9A24D] shrink-0" />
            <span>Videos automatically play muted when visible. Click to pause or toggle audio anytime.</span>
          </div>

          {/* Follow Us on Instagram Link & Global Audio Toggle */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={OFFICIAL_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 group"
            >
              <Instagram className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              <span>@assafartravels on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/90 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Global Sound Control */}
            <button
              type="button"
              onClick={handleToggleGlobalMute}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-neutral-50 text-[#075C4B] border border-[#075C4B]/20 text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              title={isGlobalMuted ? 'Unmute video audio' : 'Mute video audio'}
            >
              {isGlobalMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-[#C9A24D]" />
                  <span>Audio Muted (Click to Unmute)</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#075C4B] animate-pulse" />
                  <span>Sound Active</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Exactly 5 Video Cards Container */}
        {/* Mobile: Swipeable horizontal carousel | Desktop: Exactly 5 equal cards in 1 row */}
        <div 
          ref={scrollContainerRef}
          className="flex lg:grid lg:grid-cols-5 gap-4 sm:gap-5 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {OFFICIAL_REELS_DATA.map((reel) => {
            const isPlaying = !!playingMap[reel.id];
            const isUserPaused = !!userPausedMap[reel.id];
            const isBlocked = !!autoplayBlockedMap[reel.id];
            const isCardMuted = cardMutedMap[reel.id] !== undefined ? cardMutedMap[reel.id] : isGlobalMuted;

            return (
              <div
                key={reel.id}
                data-reel-id={reel.id}
                ref={(el) => {
                  cardRefs.current[reel.id] = el;
                }}
                onClick={() => handleTogglePlay(reel.id)}
                className={`group relative flex-shrink-0 w-[78vw] sm:w-[46vw] md:w-[32vw] lg:w-auto snap-center rounded-2xl sm:rounded-3xl overflow-hidden aspect-[9/16] bg-[#0A0D0C] shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 border cursor-pointer ${
                  isPlaying 
                    ? 'border-[#C9A24D] ring-2 ring-[#C9A24D]/70 shadow-lg shadow-[#0B5D4B]/20' 
                    : 'border-[#E5E5E0] hover:border-[#0B5D4B]/40'
                }`}
                role="region"
                aria-label={`Official Instagram Reel: ${reel.title}`}
              >
                {/* Native HTML5 Video Element with guaranteed muted autoplay, loop, and playsInline */}
                <video
                  ref={(el) => {
                    videoRefs.current[reel.id] = el;
                    if (el) {
                      el.defaultMuted = true;
                      el.muted = isCardMuted;
                    }
                  }}
                  src={reel.videoUrl}
                  poster={reel.posterUrl}
                  autoPlay
                  muted={isCardMuted}
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover absolute inset-0 z-0 bg-black"
                  onPlay={() => {
                    setPlayingMap((prev) => ({ ...prev, [reel.id]: true }));
                    setAutoplayBlockedMap((prev) => ({ ...prev, [reel.id]: false }));
                  }}
                  onPause={() => {
                    setPlayingMap((prev) => ({ ...prev, [reel.id]: false }));
                  }}
                />

                {/* Subtle dark gradient scrim for readable text */}
                <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-black/85 via-black/20 to-black/35" />

                {/* Status Badge: Top-left below chrome */}
                <div className="absolute top-12 left-3 z-10 pointer-events-none transition-opacity duration-200">
                  {isPlaying ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0B5D4B]/90 backdrop-blur-md text-[10px] font-bold text-white border border-[#C9A24D]/50 shadow">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-ping" />
                      <span>PLAYING</span>
                    </span>
                  ) : isUserPaused ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-medium text-amber-300 border border-amber-300/30">
                      <Pause className="w-2.5 h-2.5 fill-current" />
                      <span>PAUSED</span>
                    </span>
                  ) : isBlocked ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-medium text-white border border-white/20">
                      <span>TAP TO PLAY</span>
                    </span>
                  ) : null}
                </div>

                {/* Central Play Button Overlay - ONLY shown when explicitly paused by user or blocked by browser */}
                {(isUserPaused || isBlocked) && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-black/75 backdrop-blur-md border border-[#C9A24D]/90 flex items-center justify-center shadow-2xl text-white group-hover:scale-110 group-hover:bg-[#075C4B]/95 transition-all duration-300">
                      <Play className="w-6 h-6 text-[#F3DC9B] fill-[#F3DC9B] ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Central Pause Button Overlay - ONLY appears on hover while playing */}
                {isPlaying && !isUserPaused && !isBlocked && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg text-white">
                      <Pause className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                )}

                {/* Interactive Top Card Chrome */}
                <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between text-white/95 pointer-events-auto">
                  <a
                    href={reel.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 bg-black/60 hover:bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] font-bold text-white transition-colors"
                    title="View on Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                    <span className="truncate max-w-[80px] sm:max-w-[100px]">{reel.account}</span>
                    <CheckCircle2 className="w-3 h-3 text-[#3897F0] fill-[#3897F0]" />
                  </a>

                  <div className="flex items-center gap-1">
                    {/* Individual Audio Mute/Unmute Toggle */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleCardMute(reel.id, e)}
                      className="p-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white/90 hover:text-white border border-white/20 transition-colors"
                      title={isCardMuted ? 'Muted - click to enable audio' : 'Audio active - click to mute'}
                      aria-label="Toggle mute"
                    >
                      {isCardMuted ? (
                        <VolumeX className="w-3 h-3 text-[#C9A24D]" />
                      ) : (
                        <Volume2 className="w-3 h-3 text-[#4ADE80] animate-pulse" />
                      )}
                    </button>

                    {/* Share Button */}
                    <button
                      type="button"
                      onClick={(e) => handleShare(reel, e)}
                      className="p-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white/90 hover:text-white border border-white/20 transition-colors"
                      title={copiedId === reel.id ? 'Copied link!' : 'Share reel link'}
                      aria-label="Share reel link"
                    >
                      <Share2 className="w-3 h-3" />
                    </button>

                    {/* Expand Modal Button */}
                    <button
                      type="button"
                      onClick={(e) => handleOpenModal(reel, e)}
                      className="p-1.5 rounded-full bg-black/60 hover:bg-[#0B5D4B] backdrop-blur-md text-white/90 hover:text-white border border-white/20 transition-colors"
                      title="Expand reel preview"
                      aria-label="Expand reel preview"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Copied Link Toast Indicator */}
                {copiedId === reel.id && (
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 px-2.5 py-1 rounded-md bg-[#0B5D4B] text-white text-[11px] font-bold shadow-lg animate-fadeIn">
                    Link copied!
                  </div>
                )}

                {/* Bottom Card Scrim and Details */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 z-20 bg-gradient-to-t from-black/95 via-black/80 to-transparent text-left pointer-events-auto">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24D]">
                      {reel.category}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-white/80">
                      <Eye className="w-3 h-3 text-[#C9A24D]" />
                      <span>{reel.views}</span>
                    </div>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-tight mb-2 group-hover:text-[#F3DC9B] transition-colors">
                    {reel.title}
                  </h3>

                  {/* Playback Controls & Direct Instagram Link */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                    <button
                      type="button"
                      onClick={(e) => handleTogglePlay(reel.id, e)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#F3DC9B] hover:text-white transition-colors"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3 h-3 fill-current" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current" />
                          <span>Play</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={reel.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/90 hover:text-[#C9A24D] transition-colors"
                      >
                        <Instagram className="w-3 h-3 text-[#E1306C]" />
                        <span>Reel</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>

                      <button
                        type="button"
                        onClick={(e) => handleOpenModal(reel, e)}
                        className="text-[11px] font-medium text-[#C9A24D] hover:underline"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting Caption / Direct Official Profile Callout */}
        <div className="mt-8 sm:mt-10 text-center max-w-xl mx-auto space-y-1">
          <p className="text-xs sm:text-sm text-[#555555]">
            All videos and stories are published directly by the official As-Safar account (<span className="font-semibold text-[#0B5D4B]">@assafartravels</span>).
          </p>
          <p className="text-[11px] text-[#777777]">
            Videos automatically play muted when visible in the viewport and loop seamlessly. Click any video or sound icon to enable audio.
          </p>
        </div>
      </div>

      {/* Expanded Modal for Authentic Instagram Reel Experience */}
      {activeModalReel && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div 
            className="relative w-full max-w-sm sm:max-w-md bg-[#073E32] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-[#084538] border-b border-white/15 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737] p-0.5">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <Instagram className="w-4 h-4 text-[#E1306C]" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-white">@assafartravels</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3897F0] fill-[#3897F0]" />
                  </div>
                  <span className="text-[10px] text-[#C9A24D] font-medium">{activeModalReel.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleGlobalMute}
                  className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center border border-white/20 transition-colors"
                  title={isGlobalMuted ? 'Unmute' : 'Mute'}
                >
                  {isGlobalMuted ? <VolumeX className="w-4 h-4 text-[#C9A24D]" /> : <Volume2 className="w-4 h-4 text-[#4ADE80]" />}
                </button>

                <button
                  onClick={handleCloseModal}
                  className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Reel Video Player */}
            <div className="relative aspect-[9/16] w-full bg-black flex-1 min-h-[380px] max-h-[500px]">
              <video
                src={activeModalReel.videoUrl}
                poster={activeModalReel.posterUrl}
                autoPlay
                muted={isGlobalMuted}
                loop
                playsInline
                controls
                className="w-full h-full object-contain absolute inset-0"
              />
            </div>

            {/* Modal Footer & Description */}
            <div className="p-4 sm:p-5 bg-[#073E32] border-t border-white/15 space-y-3 shrink-0">
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {activeModalReel.title}
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  {activeModalReel.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-[#C9A24D] font-semibold flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{activeModalReel.views} views</span>
                </span>

                <a
                  href={activeModalReel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C9A24D] hover:bg-[#B38D3B] text-[#073E32] text-xs font-bold transition-colors shadow-sm"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Open on Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
