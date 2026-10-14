import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Compass, 
  PhoneCall, 
  ShieldCheck, 
  MapPin, 
  Building, 
  Plane, 
  FileCheck, 
  Users, 
  Sparkles, 
  Calendar, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { IslamicStarIcon } from './IslamicMotifs';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onExplorePackages: () => void;
  onTalkToTeam: () => void;
  onOpenHajj?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplorePackages, onTalkToTeam, onOpenHajj }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const { t } = useLanguage();

  // 3 Full-width photographic slides memoized
  const slides = useMemo(() => [
    // Slide 1 – Umrah Journey
    {
      id: 'umrah-journey',
      bgImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=2070&q=85',
      bgAlt: 'Masjid al-Haram in Makkah with the Holy Kaaba',
      badge: (
        <>
          <IslamicStarIcon className="w-3.5 h-3.5 text-[#C9A24D]" />
          <span>{t('hero.trustBadge')}</span>
          <span className="text-[#C9A24D] hidden sm:inline">·</span>
          <span className="text-[#EAF3EF]/80 hidden sm:inline">{t('hero.office')}</span>
        </>
      ),
      headline: (
        <>
          {t('lang') === 'ta' ? (
            <span>அல்லாஹ்வின் இல்லத்திற்கான உங்களது <span className="text-[#FFCE1B]">புனிதப் பயணம்</span> இங்கே தொடங்குகிறது</span>
          ) : (
            <>Your Journey to the <span className="text-[#FFCE1B]">House of Allah</span> Begins Here</>
          )}
        </>
      ),
      description: t('hero.desc1'),
      trustSignals: [
        { icon: <ShieldCheck className="w-4 h-4 text-[#C9A24D]" />, text: t('hero.hotel') },
        { icon: <MapPin className="w-4 h-4 text-[#C9A24D]" />, text: t('hero.dep') },
        { icon: <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]" />, text: t('hero.aalim') },
      ],
      primaryBtn: {
        text: t('hero.explorePkg'),
        icon: <Compass className="w-5 h-5 text-[#C9A24D]" />,
        action: onExplorePackages,
      },
      secondaryBtn: {
        text: t('hero.talkTeam'),
        icon: <PhoneCall className="w-4 h-4 text-[#C9A24D]" />,
        action: onTalkToTeam,
      },
    },

    // Slide 2 – Premium Umrah Packages
    {
      id: 'premium-umrah',
      bgImage: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=2070&q=85',
      bgAlt: 'Pilgrims performing Umrah around the Kaaba with illuminated sanctuary',
      badge: (
        <>
          <Sparkles className="w-3.5 h-3.5 text-[#C9A24D]" />
          <span>Curated 15 & 21 Day Pilgrimages</span>
          <span className="text-[#C9A24D] hidden sm:inline">·</span>
          <span className="text-[#EAF3EF]/80 hidden sm:inline">VIP Ground Care</span>
        </>
      ),
      headline: (
        <>
          Your Sacred Journey, <span className="text-[#FFCE1B]">Our Dedicated Care</span>
        </>
      ),
      description:
        'Discover thoughtfully planned Umrah packages with hotel assistance, travel support and guided pilgrimage services.',
      trustSignals: [
        { icon: <Building className="w-4 h-4 text-[#C9A24D]" />, text: 'Walking Distance to Haram' },
        { icon: <Plane className="w-4 h-4 text-[#C9A24D]" />, text: 'Direct Flights & Visa Included' },
        { icon: <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]" />, text: 'Authentic South Indian Food' },
      ],
      primaryBtn: {
        text: 'Explore Umrah Packages',
        icon: <Compass className="w-5 h-5 text-[#C9A24D]" />,
        action: onExplorePackages,
      },
      secondaryBtn: {
        text: 'Enquire Now',
        icon: <PhoneCall className="w-4 h-4 text-[#C9A24D]" />,
        action: onTalkToTeam,
      },
    },

    // Slide 3 – Hajj 2027
    {
      id: 'hajj-2027',
      bgImage: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=2070&q=85',
      bgAlt: 'Pilgrims gathering in Makkah for the sacred Hajj pilgrimage',
      badge: (
        <>
          <Calendar className="w-3.5 h-3.5 text-[#C9A24D]" />
          <span>Advance Registrations • Hajj 2027</span>
          <span className="text-[#C9A24D] hidden sm:inline">·</span>
          <span className="text-[#EAF3EF]/80 hidden sm:inline">Limited Seats</span>
        </>
      ),
      headline: (
        <>
          Prepare for <span className="text-[#FFCE1B]">Hajj 2027</span> with As-Safar
        </>
      ),
      description:
        'Plan your pilgrimage with dedicated travel assistance and support from our team.',
      trustSignals: [
        { icon: <FileCheck className="w-4 h-4 text-[#C9A24D]" />, text: 'Full Documentation Support' },
        { icon: <Users className="w-4 h-4 text-[#C9A24D]" />, text: 'Pre-Hajj Seminars in Trichy' },
        { icon: <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]" />, text: 'Mina & Arafat Ground Care' },
      ],
      primaryBtn: {
        text: 'Hajj 2027 Packages',
        icon: <Calendar className="w-5 h-5 text-[#C9A24D]" />,
        action: onOpenHajj ? onOpenHajj : onTalkToTeam,
      },
      secondaryBtn: {
        text: 'Enquire Now',
        icon: <PhoneCall className="w-4 h-4 text-[#C9A24D]" />,
        action: onTalkToTeam,
      },
    },
  ], [t, onExplorePackages, onTalkToTeam, onOpenHajj]);

  // Automatic change every 5 seconds (resets timer when currentSlide changes or paused)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, currentSlide, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };


  // Touch swipe support on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartX.current !== null) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (diff > 45) {
        nextSlide();
      } else if (diff < -45) {
        prevSlide();
      }
      touchStartX.current = null;
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full overflow-hidden bg-[#0A0D0C] text-white min-h-[560px] sm:min-h-[600px] lg:h-[640px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="As-Safar Hero Slider"
    >
      {/* Background Images Layer with Diagonal Mask Reveal & Layered Zoom */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
              }`}
              style={{
                clipPath: isActive 
                  ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
                  : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                transition: 'clip-path 1000ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms ease-in-out'
              }}
              aria-hidden={!isActive}
            >
              <img
                src={slide.bgImage}
                alt={slide.bgAlt}
                className="w-full h-full object-cover object-center transition-transform duration-[8000ms] ease-out"
                style={{
                  transform: isActive ? 'scale(1.06) translateX(0px)' : 'scale(1.15) translateX(-20px)',
                }}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              {/* Clean cinematic scrim overlay ensuring high contrast text readability without muddy tint */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 sm:to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            </div>
          );
        })}
      </div>

      {/* Main Content Area - Overlaid on the Background with Staggered Entrance Animation */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        <div className="max-w-2xl lg:max-w-3xl text-left">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            if (!isActive) return null;

            return (
              <div 
                key={slide.id} 
                className="space-y-5 sm:space-y-6 animate-hero-content"
              >
                {/* Small Trust Badge */}
                <div 
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-[#C9A24D]/50 text-xs sm:text-sm font-medium text-white shadow-xs"
                >
                  {slide.badge}
                </div>

                {/* Main Heading */}
                <h1 
                  className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] text-balance drop-shadow-md"
                >
                  {slide.headline}
                </h1>

                {/* Supporting Text */}
                <p 
                  className="text-white/90 text-base sm:text-lg md:text-xl font-normal max-w-2xl leading-relaxed drop-shadow-xs"
                >
                  {slide.description}
                </p>

                {/* Key Trust Signals Bar */}
                <div 
                  className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-xs sm:text-sm text-white/90"
                >
                  {slide.trustSignals.map((sig, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-1.5 bg-black/30 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-lg backdrop-blur-xs sm:backdrop-blur-none">
                      {sig.icon}
                      <span>{sig.text}</span>
                    </div>
                  ))}
                </div>

                {/* Primary & Secondary Action Buttons */}
                <div 
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3"
                >
                  <button
                    onClick={slide.primaryBtn.action}
                    className="bg-[#0B5D4B] hover:bg-[#084538] text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] min-h-[48px] cursor-pointer"
                  >
                    {slide.primaryBtn.icon}
                    <span>{slide.primaryBtn.text}</span>
                  </button>

                  <button
                    onClick={slide.secondaryBtn.action}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-xl backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] min-h-[48px] cursor-pointer"
                  >
                    {slide.secondaryBtn.icon}
                    <span>{slide.secondaryBtn.text}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Previous & Next Arrow Controls on Left and Right Edges */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-2.5 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/35 hover:bg-[#C9A24D] hover:text-[#073E32] text-white border border-white/25 backdrop-blur-md transition-all duration-200 cursor-pointer active:scale-95 shadow-md hidden sm:flex items-center justify-center"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-2.5 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/35 hover:bg-[#C9A24D] hover:text-[#073E32] text-white border border-white/25 backdrop-blur-md transition-all duration-200 cursor-pointer active:scale-95 shadow-md hidden sm:flex items-center justify-center"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>


    </section>
  );
};


