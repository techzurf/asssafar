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
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface ReelItem {
  id: string;
  themeNumber: number;
  title: string;
  category: string;
  views: string;
  videoUrl: string;
  posterUrl: string;
  description: string;
}

const REELS_DATA: ReelItem[] = [
  {
    id: 'kaaba-reels',
    themeNumber: 1,
    title: 'The Holy Kaaba',
    category: 'Makkah al-Mukarramah',
    views: '142K',
    videoUrl: 'https://res.cloudinary.com/ddeivqykl/video/upload/v1791466114/vidssave.com_Tawaf_around_the_Kaaba_1080P_bnqve4.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&h=1067&q=80',
    description: 'Breathtaking footage of pilgrims circling the Holy Kaaba in continuous heartfelt Tawaf at Masjid al-Haram.',
  },
  {
    id: 'madinah-reels',
    themeNumber: 2,
    title: 'Madinah Moments',
    category: 'Al-Masjid an-Nabawi',
    views: '118K',
    videoUrl: 'https://res.cloudinary.com/ddeivqykl/video/upload/v1791522161/vidssave.com_What_is_Hajj_and_how_do_Muslims_perform_it__720P_zcj3hi.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=600&h=1067&q=80',
    description: 'Serene moments of tranquility under the grand shading canopies of the Prophet’s Mosque in Madinah al-Munawwarah.',
  },
  {
    id: 'journey-reels',
    themeNumber: 3,
    title: 'Our Umrah Journey',
    category: 'Pilgrim Diaries',
    views: '95K',
    videoUrl: 'https://res.cloudinary.com/ddeivqykl/video/upload/v1791522161/vidssave.com_What_is_Hajj_and_how_do_Muslims_perform_it__720P_zcj3hi.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=600&h=1067&q=80',
    description: 'Follow our pilgrim families travelling with As-Safar scholars, experiencing comfort and deep spiritual connection.',
  },
  {
    id: 'behind-reels',
    themeNumber: 4,
    title: 'Behind the Journey',
    category: 'Trichy & Chennai Groups',
    views: '128K',
    videoUrl: 'https://res.cloudinary.com/ddeivqykl/video/upload/v1791466114/vidssave.com_Tawaf_around_the_Kaaba_1080P_bnqve4.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&h=1067&q=80',
    description: 'Pre-departure training seminars, airport departures, luggage handling, and 24/7 dedicated ground assistance in Saudi Arabia.',
  },
  {
    id: 'hajj-reels',
    themeNumber: 5,
    title: 'Hajj & Spiritual Reflections',
    category: 'Sacred Plains',
    views: '164K',
    videoUrl: 'https://res.cloudinary.com/ddeivqykl/video/upload/v1791522161/vidssave.com_What_is_Hajj_and_how_do_Muslims_perform_it__720P_zcj3hi.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=600&h=1067&q=80',
    description: 'Reflections from the sacred plains of Arafat, Muzdalifah, and the tents of Mina guided by experienced Tamil Aalims.',
  },
];

const OFFICIAL_INSTAGRAM_URL = 'https://www.instagram.com/assafartravels/';

export const InstagramReelsSection: React.FC = () => {
  const [activeModalReel, setActiveModalReel] = useState<ReelItem | null>(null);
  const [isModalPlaying, setIsModalPlaying] = useState(true);
  const [isModalMuted, setIsModalMuted] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Card Autoplay and Interactivity State
  const [playingCardId, setPlayingCardId] = useState<string | null>(null);
  const [cardMuted, setCardMuted] = useState<{ [id: string]: boolean }>({
    'kaaba-reels': true,
    'madinah-reels': true,
    'journey-reels': true,
    'behind-reels': true,
    'hajj-reels': true,
  });

  const cardMutedRef = useRef<{ [id: string]: boolean }>({
    'kaaba-reels': true,
    'madinah-reels': true,
    'journey-reels': true,
    'behind-reels': true,
    'hajj-reels': true,
  });

  const cardRefs = useRef<{ [id: string]: HTMLDivElement | null }>({});
  const videoRefs = useRef<{ [id: string]: HTMLVideoElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const manualPausedCards = useRef<{ [id: string]: boolean }>({});

  const handleOpenModal = (reel: ReelItem) => {
    // Pause all playing card videos while modal is open
    REELS_DATA.forEach((r) => {
      const v = videoRefs.current[r.id];
      if (v && !v.paused) {
        v.pause();
      }
    });
    setActiveModalReel(reel);
    setIsModalPlaying(true);
    setIsModalMuted(false);
  };

  const handleCloseModal = () => {
    setActiveModalReel(null);
  };

  const toggleModalPlay = () => {
    if (modalVideoRef.current) {
      if (isModalPlaying) {
        modalVideoRef.current.pause();
        setIsModalPlaying(false);
      } else {
        modalVideoRef.current.play();
        setIsModalPlaying(true);
      }
    }
  };

  const toggleModalMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !isModalMuted;
      setIsModalMuted(!isModalMuted);
    }
  };

  // Toggle play/pause for a specific card video
  const handleTogglePlay = useCallback((reelId: string) => {
    const video = videoRefs.current[reelId];
    if (!video) return;

    if (!video.paused) {
      video.pause();
      manualPausedCards.current[reelId] = true;
      setPlayingCardId(null);
    } else {
      manualPausedCards.current[reelId] = false;

      // Pause any other playing video so only one plays at a time
      REELS_DATA.forEach((r) => {
        if (r.id !== reelId) {
          const other = videoRefs.current[r.id];
          if (other && !other.paused) {
            other.pause();
          }
        }
      });

      video.muted = cardMutedRef.current[reelId] ?? true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlayingCardId(reelId);
          })
          .catch(() => {
            // Browser restricted playback
          });
      }
    }
  }, []);

  // Toggle mute/unmute for a specific card
  const handleToggleMute = useCallback((reelId: string) => {
    const nextMuted = !(cardMutedRef.current[reelId] ?? true);
    cardMutedRef.current[reelId] = nextMuted;
    setCardMuted((prev) => ({ ...prev, [reelId]: nextMuted }));

    const video = videoRefs.current[reelId];
    if (video) {
      video.muted = nextMuted;
    }
  }, []);

  // Intersection Observer for single-active-video viewport autoplay
  useEffect(() => {
    // Check reduced motion & data saver preferences
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const saveData = (navigator as unknown as { connection?: { saveData?: boolean } })?.connection?.saveData;

    if (prefersReducedMotion || saveData) {
      // Respect user data/motion preference: keep videos paused for manual play
      return;
    }

    const ratiosMap = new Map<string, { ratio: number; rect: DOMRectReadOnly }>();

    const evaluateMostVisibleCard = () => {
      if (activeModalReel) return;

      let bestId: string | null = null;
      let minDistanceToCenter = Infinity;
      let highestRatio = 0;

      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;

      ratiosMap.forEach((info, id) => {
        if (info.ratio >= 0.25) {
          const cardCenterX = info.rect.left + info.rect.width / 2;
          const cardCenterY = info.rect.top + info.rect.height / 2;
          const dist = Math.hypot(cardCenterX - screenCenterX, cardCenterY - screenCenterY);

          // Find card with highest intersection or closest to screen center if comparable
          if (info.ratio > highestRatio + 0.1 || (Math.abs(info.ratio - highestRatio) <= 0.1 && dist < minDistanceToCenter)) {
            highestRatio = info.ratio;
            minDistanceToCenter = dist;
            bestId = id;
          }
        }
      });

      if (bestId) {
        // If this best card was not manually paused by the visitor, start playing it
        if (!manualPausedCards.current[bestId]) {
          REELS_DATA.forEach((reel) => {
            const video = videoRefs.current[reel.id];
            if (!video) return;

            if (reel.id === bestId) {
              video.muted = cardMutedRef.current[reel.id] ?? true;
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    setPlayingCardId(bestId);
                  })
                  .catch(() => {
                    // Autoplay blocked by policy fallback
                  });
              }
            } else {
              if (!video.paused) {
                video.pause();
              }
            }
          });
        } else {
          // It was manually paused, make sure other videos remain paused
          REELS_DATA.forEach((reel) => {
            if (reel.id !== bestId) {
              const video = videoRefs.current[reel.id];
              if (video && !video.paused) {
                video.pause();
              }
            }
          });
        }
      } else {
        // Section is not sufficiently in view: pause all videos
        REELS_DATA.forEach((reel) => {
          const video = videoRefs.current[reel.id];
          if (video && !video.paused) {
            video.pause();
          }
        });
        setPlayingCardId(null);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-reel-id');
          if (id) {
            ratiosMap.set(id, {
              ratio: entry.intersectionRatio,
              rect: entry.boundingClientRect,
            });
          }
        });
        evaluateMostVisibleCard();
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
      }
    );

    REELS_DATA.forEach((reel) => {
      const el = cardRefs.current[reel.id];
      if (el) observer.observe(el);
    });

    // Horizontal carousel scroll listener (for mobile and tablet)
    const handleScrollOrResize = () => {
      REELS_DATA.forEach((reel) => {
        const el = cardRefs.current[reel.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
          const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
          const totalArea = rect.width * rect.height;
          const ratio = totalArea > 0 ? (visibleWidth * visibleHeight) / totalArea : 0;
          ratiosMap.set(reel.id, { ratio, rect });
        }
      });
      evaluateMostVisibleCard();
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScrollOrResize, { passive: true });
    }
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    // Handle tab visibility changes to save battery and data
    const handleVisibilityChange = () => {
      if (document.hidden) {
        REELS_DATA.forEach((reel) => {
          const v = videoRefs.current[reel.id];
          if (v && !v.paused) v.pause();
        });
      } else {
        handleScrollOrResize();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScrollOrResize);
      }
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [activeModalReel]);

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-white">
      {/* Blurred Makkah Kaaba Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-[-30px] bg-cover bg-center filter blur-[6px] scale-105 opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=2070&q=85')`
          }}
        />
        <div className="absolute inset-0 bg-white/88" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3.5 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F3EE] text-[#0B5D4B] border border-[#E5E5E0] text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24D]" />
            <span>EXPERIENCE AS-SAFAR</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#202522] tracking-tight">
            Our Umrah Moments
          </h2>

          <p className="text-[#333333] text-base sm:text-lg leading-relaxed">
            Watch our journeys, explore the holy cities, and discover the As-Safar pilgrimage experience through our Instagram videos.
          </p>

          {/* Follow Us on Instagram Link */}
          <div className="pt-2">
            <a
              href={OFFICIAL_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F8F7F3] hover:bg-[#F5F3EE] text-[#202522] hover:text-[#0B5D4B] border border-[#E5E5E0] hover:border-[#0B5D4B]/30 text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 group shadow-xs hover:shadow-sm"
            >
              <Instagram className="w-4 h-4 text-[#C9A24D] group-hover:scale-110 transition-transform" />
              <span>Follow Us on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#0B5D4B] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Exactly 5 Video Cards Container */}
        {/* Mobile: Swipeable horizontal carousel | Desktop: Exactly 5 equal cards in 1 row */}
        <div 
          ref={scrollContainerRef}
          className="flex lg:grid lg:grid-cols-5 gap-4 sm:gap-5 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {REELS_DATA.map((reel) => {
            const isPlaying = playingCardId === reel.id;
            const isMuted = cardMuted[reel.id] ?? true;

            return (
              <div
                key={reel.id}
                data-reel-id={reel.id}
                ref={(el) => {
                  cardRefs.current[reel.id] = el;
                }}
                onClick={() => handleTogglePlay(reel.id)}
                className="group relative flex-shrink-0 w-[72vw] sm:w-[42vw] md:w-[30vw] lg:w-auto snap-center rounded-2xl sm:rounded-3xl overflow-hidden aspect-[9/16] bg-[#0A0D0C] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-[#E5E5E0]"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTogglePlay(reel.id);
                  }
                }}
                aria-label={`Video Reel: ${reel.title}`}
              >
                {/* Embedded HTML5 Video with Poster Fallback */}
                <video
                  ref={(el) => {
                    videoRefs.current[reel.id] = el;
                  }}
                  src={reel.videoUrl}
                  poster={reel.posterUrl}
                  muted={isMuted}
                  playsInline
                  loop
                  preload="metadata"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  onPlay={() => setPlayingCardId(reel.id)}
                  onPause={() => {
                    setPlayingCardId((prev) => (prev === reel.id ? null : prev));
                  }}
                />

                {/* Subtle dark gradient overlay for high contrast text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none" />

                {/* Top Badge: Instagram Reels & Views & Audio Control */}
                <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between text-white/90">
                  <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 shadow-xs">
                    <Instagram className="w-3.5 h-3.5 text-[#C9A24D]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Reels</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Quick Mute/Unmute Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleMute(reel.id);
                      }}
                      className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white/90 hover:text-white border border-white/15 transition-colors cursor-pointer"
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      title={isMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {isMuted ? <VolumeX className="w-3 h-3 text-white/80" /> : <Volume2 className="w-3 h-3 text-[#FFCE1B]" />}
                    </button>

                    <div className="flex items-center gap-1 bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white/90 border border-white/10">
                      <Eye className="w-3 h-3 text-[#C9A24D]" />
                      <span className="font-semibold">{reel.views}</span>
                    </div>
                  </div>
                </div>

                {/* Centered Play / Pause Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div 
                    className={`w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:bg-[#C9A24D] group-hover:text-[#073E32] group-hover:scale-110 transition-all duration-300 shadow-xl ${
                      isPlaying 
                        ? 'opacity-0 group-hover:opacity-100 group-focus:opacity-100' 
                        : 'opacity-100'
                    }`}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    )}
                  </div>
                </div>

                {/* Bottom Details, Title, & Expand Modal Button */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 text-left flex items-end justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24D] block mb-1">
                      {reel.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug drop-shadow-md line-clamp-2 group-hover:text-[#F3DC9B] transition-colors">
                      {reel.title}
                    </h3>
                  </div>

                  {/* Expand Modal Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(reel);
                    }}
                    className="shrink-0 p-2 rounded-full bg-black/50 hover:bg-[#0B5D4B] backdrop-blur-md text-white border border-white/20 transition-all duration-200 cursor-pointer shadow-sm group-hover:scale-105"
                    title="View full reflection"
                    aria-label={`View full details for ${reel.title}`}
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Video Modal Player */}
      {activeModalReel && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div 
            className="relative w-full max-w-sm sm:max-w-md bg-[#073E32] rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-[9/16] flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                <Instagram className="w-4 h-4 text-[#C9A24D]" />
                <span className="text-xs font-bold">{activeModalReel.title}</span>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Element */}
            <video
              ref={modalVideoRef}
              src={activeModalReel.videoUrl}
              poster={activeModalReel.posterUrl}
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover cursor-pointer"
              onClick={toggleModalPlay}
            />

            {/* Video Controls & Bottom Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 space-y-3">
              <p className="text-xs text-white/90 leading-relaxed">
                {activeModalReel.description}
              </p>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleModalPlay}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                    aria-label={isModalPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isModalPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={toggleModalMute}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                    aria-label={isModalMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isModalMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <a
                  href={OFFICIAL_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C9A24D] hover:bg-[#B38D3B] text-[#073E32] text-xs font-bold transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>View on Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
