import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  X, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  Radio, 
  Sparkles, 
  Compass, 
  RefreshCw,
  Volume2
} from 'lucide-react';

interface StreamOption {
  id: string;
  name: string;
  source: string;
  videoId: string;
  channelName: string;
}

const STREAMS: StreamOption[] = [
  {
    id: 'stream-1',
    name: 'Saudi Quran TV (Official)',
    source: 'Official 24/7 Broadcast',
    videoId: 'KVrY2HlR49k',
    channelName: 'Makkah Live 24/7',
  },
  {
    id: 'stream-2',
    name: 'Kaaba Live Mataf Feed',
    source: 'Masjid al-Haram HD',
    videoId: '_T_m0K6L25I',
    channelName: 'Quran Channel Live',
  },
  {
    id: 'stream-3',
    name: 'Haramain Live 24/7',
    source: 'Holy Kaaba Direct',
    videoId: '_A95z-X9M_8',
    channelName: 'Makkah Live HD',
  },
];

interface MakkahLiveDrawerProps {
  onOpenPackages?: () => void;
}

export const MakkahLiveDrawer: React.FC<MakkahLiveDrawerProps> = ({ onOpenPackages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStreamIndex, setActiveStreamIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [keyReload, setKeyReload] = useState(0);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const activeStream = STREAMS[activeStreamIndex];

  // Touch device detection to prevent sticky hover states on mobile/tablet
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
    }
  }, []);

  // Listen for global custom event so any link on the site can open Makkah Live
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-makkah-live', handleOpenEvent);
    return () => window.removeEventListener('open-makkah-live', handleOpenEvent);
  }, []);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
          setIsFullscreen(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen]);

  // Handle Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Prevent background scrolling when drawer is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {
        // Fallback or silently handle
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleReloadStream = () => {
    setKeyReload(prev => prev + 1);
  };

  return (
    <>
      {/* =========================================================================
          1. FLOATING SIDE BUTTON (COMPACT CIRCULAR + HOVER-TO-EXPAND)
          - Compact circular button (50px diameter) by default
          - Video-camera icon & small red LIVE indicator
          - Anchored to the right edge, vertically centered
          - On desktop hover: smoothly expands horizontally to ~168px wide towards the left
          - Reveals "MAKKAH LIVE" text and small red LIVE badge
          - Smooth 300ms CSS transition for width, opacity, and icon positioning
          - Touch devices remain compact to prevent intermediate hover stickiness
          - Avoids overlapping WhatsApp (bottom-8) and mobile bottom nav (bottom-0)
      ========================================================================= */}
      <aside 
        aria-label="Makkah Live floating trigger"
        className="fixed right-2.5 sm:right-3.5 top-[50%] -translate-y-1/2 z-40 select-none print:hidden pointer-events-auto flex items-center justify-end"
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`group relative h-[50px] w-[50px] ${
            !isTouchDevice ? 'sm:hover:w-[168px]' : ''
          } bg-[#075C4B] hover:bg-[#0A6D59] text-white border-2 border-[#C9973D] rounded-full shadow-[0_4px_20px_rgba(7,92,75,0.45)] hover:shadow-[0_8px_30px_rgba(201,151,61,0.55)] transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9973D] focus:ring-offset-2 cursor-pointer active:scale-95 overflow-hidden flex items-center`}
          aria-label="Watch Makkah Live - Live view of Masjid al-Haram"
          title="Watch Makkah Live (Masjid al-Haram 24/7)"
        >
          {/* Subtle gold gradient hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9973D]/10 to-[#C9973D]/25 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Compact State: Pulsing Red LIVE Indicator Dot (top-right of circle) */}
          <span 
            className={`absolute top-1.5 right-1.5 flex h-2.5 w-2.5 pointer-events-none transition-opacity duration-200 ${
              !isTouchDevice ? 'sm:group-hover:opacity-0' : ''
            }`}
            aria-hidden="true"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)] border border-[#075C4B]" />
          </span>

          {/* Video Camera Icon: Centered in compact circle, smoothly glides to left on hover */}
          <div 
            className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ${
              !isTouchDevice ? 'sm:group-hover:left-3 sm:group-hover:translate-x-0' : ''
            } w-7 h-7 rounded-full bg-[#11382E] flex items-center justify-center border border-[#C9973D]/70 sm:group-hover:border-[#C9973D] transition-all duration-300 ease-out shadow-inner shrink-0 pointer-events-none`}
          >
            <Video className="w-3.5 h-3.5 text-[#F5D58A]" />
          </div>

          {/* Expanded Content on Desktop Hover: MAKKAH LIVE label + Red LIVE Badge */}
          <div 
            className={`hidden sm:flex items-center gap-1.5 absolute left-[44px] top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 ${
              !isTouchDevice ? 'sm:group-hover:opacity-100' : ''
            } transition-opacity duration-300 delay-100 pr-2 pointer-events-none`}
          >
            <span className="text-[12px] font-extrabold tracking-wider text-white uppercase leading-none font-serif">
              MAKKAH LIVE
            </span>
            <span className="text-[9px] font-sans font-bold px-1.5 py-0.5 bg-red-600 text-white rounded shadow-sm tracking-wide">
              LIVE
            </span>
          </div>
        </button>
      </aside>

      {/* =========================================================================
          2. SLIDE-IN LIVE VIDEO DRAWER
      ========================================================================= */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Makkah Live Video Player"
        className={`fixed top-0 right-0 bottom-0 w-full max-w-xl md:max-w-2xl bg-[#0B1512] text-white z-50 shadow-[-10px_0_40px_rgba(0,0,0,0.8)] border-l border-[#C9973D]/40 flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top Gold Decorative Accent Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#075C4B] via-[#C9973D] to-[#F5D58A]" />

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#1E2E28] flex items-center justify-between bg-[#0F1E19]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {/* Live Indicator Icon */}
            <div className="w-10 h-10 rounded-xl bg-[#075C4B]/80 border border-[#C9973D]/40 flex items-center justify-center text-[#F5D58A] shadow-inner">
              <Radio className="w-5 h-5 text-[#C9973D] animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-white">
                  Makkah Live
                </h2>
                {/* Visible LIVE indicator badge */}
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-600/90 text-white uppercase tracking-wider shadow-sm animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  LIVE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#C9973D] font-medium mt-0.5 flex items-center gap-1.5">
                <span>Live view of Masjid al-Haram</span>
                <span className="text-[#556961]">•</span>
                <span className="text-[#9DB3AA] text-[11px]">Holy Kaaba 24/7</span>
              </p>
            </div>
          </div>

          {/* Close button in the top-right corner */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full bg-[#182B24] hover:bg-[#233C33] text-gray-300 hover:text-white flex items-center justify-center border border-[#2D453B] hover:border-[#C9973D] transition-all focus:outline-none focus:ring-2 focus:ring-[#C9973D] cursor-pointer"
            aria-label="Close Makkah Live drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
          {/* Main Video Player Container with 16:9 Aspect Ratio */}
          <div 
            ref={playerContainerRef}
            className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-[#C9973D]/50 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group"
          >
            {isOpen && (
              <iframe
                key={`${activeStream.videoId}-${keyReload}`}
                src={`https://www.youtube-nocookie.com/embed/${activeStream.videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={`${activeStream.name} - Live Stream`}
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}

            {/* Overlaid Live & Control Bar */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black bg-red-600/90 text-white uppercase tracking-wider backdrop-blur-md shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                MAKKAH LIVE
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 text-[#F5D58A] backdrop-blur-md border border-[#C9973D]/30">
                <Sparkles className="w-3 h-3 text-[#C9973D]" />
                {activeStream.source}
              </span>
            </div>

            {/* Top-Right Player Controls */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
              {/* Reload Stream Button */}
              <button
                onClick={handleReloadStream}
                className="p-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-gray-200 hover:text-[#C9973D] border border-white/10 backdrop-blur-md transition-all cursor-pointer"
                title="Reload stream"
                aria-label="Reload live video stream"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-gray-200 hover:text-[#C9973D] border border-white/10 backdrop-blur-md transition-all cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Audio Notice & Quick Instruction */}
          <div className="flex items-center justify-between text-[11px] text-[#A4B8B0] bg-[#12221C] px-3.5 py-2 rounded-xl border border-[#21382F]">
            <div className="flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5 text-[#C9973D]" />
              <span>Tap the video speaker icon to enable live Adhan & Quran recitation.</span>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${activeStream.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#F5D58A] hover:underline font-semibold ml-2 whitespace-nowrap"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Short Note: “Watch the live view of the Holy Kaaba.” */}
          <div className="bg-gradient-to-br from-[#122620] to-[#0D1A16] p-4 rounded-2xl border border-[#C9973D]/30 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-[#C9973D]/5 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-sm sm:text-base font-semibold text-[#F5D58A] flex items-center gap-2 font-serif">
              <span>Watch the live view of the Holy Kaaba.</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#CBD5E1] mt-1.5 leading-relaxed">
              Experience the spiritual tranquility of Masjid al-Haram in Makkah directly from your screen. Watch pilgrims performing Tawaf around the blessed Kaaba, observe prayer times live, and stay connected with the sacred sanctuary.
            </p>
          </div>

          {/* Stream Switcher Section */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#C9973D] uppercase tracking-wider">
                Select Camera Feed / Channel
              </span>
              <span className="text-[11px] text-gray-400">
                {STREAMS.length} Active Feeds
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {STREAMS.map((stream, idx) => {
                const isActive = idx === activeStreamIndex;
                return (
                  <button
                    key={stream.id}
                    onClick={() => setActiveStreamIndex(idx)}
                    className={`flex flex-col text-left p-2.5 rounded-xl border transition-all text-xs cursor-pointer ${
                      isActive
                        ? 'bg-[#075C4B] border-[#C9973D] text-white shadow-[0_4px_16px_rgba(7,92,75,0.4)] ring-1 ring-[#C9973D]'
                        : 'bg-[#12221C] border-[#223930] text-gray-300 hover:bg-[#182C24] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold truncate">{stream.name}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#F5D58A] shrink-0" />
                      )}
                    </div>
                    <span className="text-[10px] text-[#A2B5AD] truncate">
                      {stream.source}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* As-Safar Umrah Planning Callout */}
          <div className="p-4 rounded-xl bg-[#0F1E19] border border-[#23382F] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#075C4B] text-[#F5D58A] flex items-center justify-center shrink-0 border border-[#C9973D]/40">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  Yearning to visit the Holy Kaaba in person?
                </p>
                <p className="text-[11px] text-[#9EB3AA] mt-0.5">
                  As-Safar provides full guidance, direct flights, and 5-star hotels facing Haram.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                if (onOpenPackages) {
                  onOpenPackages();
                } else {
                  window.location.hash = '#monthly-umrah';
                }
              }}
              className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#C9973D] to-[#E5B558] hover:from-[#d8a446] hover:to-[#f0c266] text-[#0B1A15] font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Explore Packages
            </button>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="p-3 sm:px-6 bg-[#08110E] border-t border-[#1C2C26] flex items-center justify-between text-[11px] text-gray-400">
          <span className="text-[#C9973D] font-medium">
            As-Safar Hajj & Umrah Services
          </span>
          <span>Trichy, Tamil Nadu</span>
        </div>
      </section>
    </>
  );
};
