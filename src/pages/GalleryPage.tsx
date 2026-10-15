import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Eye, X, MapPin, ChevronLeft, ChevronRight, Sparkles, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { GALLERY_ITEMS, BRAND_INFO } from '../data/content';
import { OFFICIAL_REELS_DATA } from '../components/InstagramReelsSection';
import { GalleryItem } from '../types';
import { PageRoute } from '../routes';

interface GalleryPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenEnquiry: () => void;
}

// Map Cloudinary images to gallery items
const GALLERY_PHOTO_MAP: Record<string, string> = {
  'as-safar-training-seminar': 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890288/7100a12e-c436-4d36-aeef-1f8a897a5ff4_mqvftr.jpg',
  'as-safar-coaches-group': 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890288/ac2439e2-06e6-4b89-ae6d-36b2842b4a99_wlsqo7.jpg',
  'as-safar-haram-group': 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890285/a68a756c-837e-452e-8d4a-f23b8905acc0_gsurq2.jpg',
  'as-safar-quba-group': 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890286/WhatsApp_Image_2026-10-11_at_10.49.16_j3kl8g.jpg',
  'as-safar-orientation-2025': 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890284/ae8d541e-c268-4adc-b50b-dfd10a20646d_vlgs4q.jpg',
  'as-safar-airport-departure': 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890284/ff1d2ed2-4de6-4830-a2c2-b8cab80b59ee_logs6g.jpg',
};

// Additional authentic photos from project assets
const ADDITIONAL_GALLERY_PHOTOS: GalleryItem[] = [
  {
    id: 'makkah-haram-kaaba-dusk',
    title: 'Holy Kaaba & Mataf at Golden Hour',
    category: 'makkah',
    caption: 'Masjid al-Haram, Makkah Al-Mukarramah',
    accentText: 'Sacred Sanctuary',
    description: 'Pilgrims performing Tawaf around the blessed Kaaba at golden hour. As-Safar provides full guidance for performing rites according to the Sunnah.',
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'madinah-nabawi-courtyard',
    title: 'Umbrella Courtyard at Al-Masjid an-Nabawi',
    category: 'madinah',
    caption: 'Prophet’s Mosque, Madinah Al-Munawwarah',
    accentText: 'Prophetic Sanctuary',
    description: 'The iconic automated umbrellas of Masjid an-Nabawi opening before dawn prayers as pilgrims gather for Salawat and peaceful reflection.',
    imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'uhud-battlefield-ziyarat',
    title: 'Historic Battlefield of Uhud & Martyrs Cemetery',
    category: 'journey',
    caption: 'Mount Uhud Historic Site, Madinah',
    accentText: 'Guided Historical Ziyarat',
    description: 'As-Safar pilgrims visiting the historic battlefield of Uhud and paying respects at the cemetery of the noble 70 martyrs of Uhud with Tamil scholar narration.',
    imageUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'jabal-al-noor-hira',
    title: 'Jabal al-Noor & Mount of Light',
    category: 'journey',
    caption: 'Cave of Hira, Makkah',
    accentText: 'First Qur’anic Revelation Site',
    description: 'View of Jabal al-Noor (Mount of Light) where Prophet Muhammad ﷺ received the first divine revelation of Sura al-Alaq.',
    imageUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'hajj-mina-tents',
    title: 'Mina Sacred Valley Camp Arrangements',
    category: 'journey',
    caption: 'Mina Valley, Makkah',
    accentText: 'Hajj Ground Care',
    description: 'Air-conditioned VIP tents in Mina arranged for As-Safar Hajj pilgrims during the days of Tashrooq.',
    imageUrl: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1200&q=85',
  },
];

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate, onOpenEnquiry }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'groups' | 'makkah' | 'madinah' | 'ziyarat'>('all');

  const allPhotos: GalleryItem[] = [...GALLERY_ITEMS, ...ADDITIONAL_GALLERY_PHOTOS];

  const filteredItems = allPhotos.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'groups') return item.id.includes('as-safar') || item.category === 'journey';
    if (filter === 'makkah') return item.category === 'makkah';
    if (filter === 'madinah') return item.category === 'madinah';
    if (filter === 'ziyarat') return item.category === 'journey' || item.category === 'hotels';
    return true;
  });

  const currentIndex = selectedItem ? filteredItems.findIndex((i) => i.id === selectedItem.id) : -1;

  const handleNext = useCallback(() => {
    if (currentIndex >= 0 && filteredItems.length > 0) {
      const nextIdx = (currentIndex + 1) % filteredItems.length;
      setSelectedItem(filteredItems[nextIdx]);
    }
  }, [currentIndex, filteredItems]);

  const handlePrev = useCallback(() => {
    if (currentIndex >= 0 && filteredItems.length > 0) {
      const prevIdx = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
      setSelectedItem(filteredItems[prevIdx]);
    }
  }, [currentIndex, filteredItems]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, handleNext, handlePrev]);

  // Prevent background scrolling when lightbox is active
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  return (
    <div className="bg-[#FFFFFF] text-[#202522]">
      {/* 1. Hero Banner */}
      <section className="relative bg-[#07382E] text-white py-16 sm:py-24 overflow-hidden border-b border-[#0B5D4B]/30">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://res.cloudinary.com/ddeivqykl/image/upload/v1791890285/a68a756c-837e-452e-8d4a-f23b8905acc0_gsurq2.jpg"
            alt="As-Safar pilgrim group at Masjid al-Haram"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07382E] via-[#07382E]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-[#C9A24D]/40 text-xs font-bold tracking-wider uppercase text-[#C9A24D]">
              <Camera className="w-3.5 h-3.5" />
              <span>Authentic Pilgrimage Highlights</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              As-Safar <span className="text-[#FFCE1B]">Gallery</span>
            </h1>

            <p className="text-base sm:text-lg text-[#EAF3EF]/90 leading-relaxed max-w-2xl">
              Moments from our Umrah journeys, sacred destinations, and pilgrim experiences.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenEnquiry}
                className="bg-[#C9A24D] hover:bg-[#B38D3B] text-[#07382E] font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Join Our Next Group
              </button>

              <button
                onClick={() => onNavigate('/monthly-umrah')}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View Monthly Packages</span>
                <ArrowRight className="w-4 h-4 text-[#C9A24D]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Gallery Filter & Grid Section */}
      <section className="py-12 sm:py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Photographs', count: allPhotos.length },
              { id: 'groups', label: 'Trichy Pilgrim Groups & Departures', count: allPhotos.filter((i) => i.id.includes('as-safar') || i.category === 'journey').length },
              { id: 'makkah', label: 'Makkah al-Mukarramah', count: allPhotos.filter((i) => i.category === 'makkah').length },
              { id: 'madinah', label: 'Madinah al-Munawwarah', count: allPhotos.filter((i) => i.category === 'madinah').length },
              { id: 'ziyarat', label: 'Historical Ziyarat Sites', count: allPhotos.filter((i) => i.category === 'journey' || i.category === 'hotels').length },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id as any)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer flex items-center gap-2 ${
                  filter === t.id
                    ? 'bg-[#0B5D4B] text-white shadow-sm'
                    : 'bg-[#F8F7F3] text-[#202522] border border-[#E5E5E0] hover:bg-[#F5F3EE]'
                }`}
              >
                <span>{t.label}</span>
                <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold tabular-nums ${
                  filter === t.id ? 'bg-white/20 text-white' : 'bg-white text-[#0B5D4B] border border-[#E5E5E0]'
                }`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* Premium Responsive Photo Grid (4 cols desktop, 3 laptop, 2 tablet, 1-2 mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredItems.map((item) => {
              const photoUrl = item.imageUrl || GALLERY_PHOTO_MAP[item.id] || 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890285/a68a756c-837e-452e-8d4a-f23b8905acc0_gsurq2.jpg';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group relative rounded-2xl overflow-hidden bg-[#0A0D0C] border border-[#E5E5E0] shadow-xs hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer aspect-[4/3] flex flex-col justify-end"
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo: ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedItem(item);
                    }
                  }}
                >
                  {/* Photo Image */}
                  <img
                    src={photoUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out absolute inset-0"
                    loading="lazy"
                  />

                  {/* Scrim Overlay for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity pointer-events-none" />

                  {/* Top Eye Icon Indicator */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                    <Eye className="w-4 h-4 text-[#F3DC9B]" />
                  </div>

                  {/* Bottom Text Label */}
                  <div className="relative z-10 p-3.5 sm:p-4 text-white text-left">
                    <span className="text-[10px] font-bold text-[#C9A24D] uppercase tracking-wider block">
                      {item.accentText}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold leading-snug mt-0.5 text-white line-clamp-1 group-hover:text-[#F3DC9B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-white/85 flex items-center gap-1 mt-1 truncate">
                      <MapPin className="w-3 h-3 text-[#C9A24D] shrink-0" />
                      <span className="truncate">{item.caption}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Interactive Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
        >
          <div
            className="bg-[#FFFFFF] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/20 relative flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar Header */}
            <div className="px-4 py-3 bg-[#07382E] text-white border-b border-white/15 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#C9A24D] uppercase tracking-wider">
                  {selectedItem.accentText}
                </span>
                <span className="text-[10px] text-white/80 bg-white/10 px-2 py-0.5 rounded-full">
                  {selectedItem.category.toUpperCase()}
                </span>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Image Display Area with Navigation Arrows */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-[#0A0D0C] overflow-hidden flex items-center justify-center shrink-0">
              <img
                src={selectedItem.imageUrl || GALLERY_PHOTO_MAP[selectedItem.id] || 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890285/a68a756c-837e-452e-8d4a-f23b8905acc0_gsurq2.jpg'}
                alt={selectedItem.title}
                className="w-full h-full object-contain"
              />

              {/* Prev Arrow */}
              {filteredItems.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-lg backdrop-blur-xs active:scale-95"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
              )}

              {/* Next Arrow */}
              {filteredItems.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-lg backdrop-blur-xs active:scale-95"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              )}

              {/* Counter Badge */}
              {currentIndex >= 0 && (
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold">
                  {currentIndex + 1} / {filteredItems.length}
                </div>
              )}
            </div>

            {/* Bottom Caption & Description */}
            <div className="p-4 sm:p-6 space-y-2 bg-[#FFFFFF] overflow-y-auto">
              <h3 className="text-lg sm:text-2xl font-bold text-[#202522] tracking-tight">
                {selectedItem.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#0B5D4B] font-semibold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C9A24D] shrink-0" />
                <span>{selectedItem.caption}</span>
              </p>

              {selectedItem.description && (
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed pt-2 border-t border-[#E5E5E0] mt-2">
                  {selectedItem.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. Bottom Group Departure CTA */}
      <section className="py-12 bg-[#F8F7F3] border-t border-[#E5E5E0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#EAF3EF] text-[#0B5D4B] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 text-[#C9A24D]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#202522]">
            Ready to Embark on Your Sacred Journey?
          </h2>

          <p className="text-xs sm:text-sm text-[#555555] max-w-xl mx-auto leading-relaxed">
            Join our upcoming monthly group departures from Trichy & Chennai with experienced scholars, South Indian cuisine, and verified close-proximity hotels.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenEnquiry}
              className="bg-[#0B5D4B] hover:bg-[#084538] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95 min-h-[48px]"
            >
              <span>Submit Pilgrimage Enquiry</span>
              <ArrowRight className="w-4 h-4 text-[#C9A24D]" />
            </button>

            <a
              href={`https://wa.me/919566369654?text=${encodeURIComponent('Assalamu Alaikum As-Safar, I viewed your Gallery and would like to enquire about your upcoming Umrah group departures.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-2 min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href={`tel:${BRAND_INFO.phoneTel}`}
              className="bg-white hover:bg-[#F5F3EE] text-[#202522] border border-[#E5E5E0] font-bold text-sm px-5 py-3.5 rounded-xl transition-all flex items-center gap-2 min-h-[48px]"
            >
              <Phone className="w-4 h-4 text-[#C9A24D]" />
              <span>Call +91 95663 69654</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
