import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Eye, X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/content';
import { GalleryItem } from '../types';

const GALLERY_PHOTO_MAP: Record<string, string> = {
  'as-safar-training-seminar': 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890288/7100a12e-c436-4d36-aeef-1f8a897a5ff4_mqvftr.jpg',
  'as-safar-coaches-group': 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890288/ac2439e2-06e6-4b89-ae6d-36b2842b4a99_wlsqo7.jpg',
  'as-safar-haram-group': 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890285/a68a756c-837e-452e-8d4a-f23b8905acc0_gsurq2.jpg',
  'as-safar-quba-group': 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890286/WhatsApp_Image_2026-10-11_at_10.49.16_j3kl8g.jpg',
  'as-safar-orientation-2025': 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890284/ae8d541e-c268-4adc-b50b-dfd10a20646d_vlgs4q.jpg',
  'as-safar-airport-departure': 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890284/ff1d2ed2-4de6-4830-a2c2-b8cab80b59ee_logs6g.jpg',
};

export const GallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'makkah' | 'madinah' | 'journey'>('all');

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter || (filter === 'journey' && item.category === 'hotels'));

  const currentIndex = selectedItem ? filteredItems.findIndex(i => i.id === selectedItem.id) : -1;

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

  return (
    <section id="gallery" className="py-14 sm:py-20 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5E5E0] text-xs font-bold uppercase tracking-wider text-[#0B5D4B]">
            <Camera className="w-3.5 h-3.5 text-[#C9A24D]" />
            <span>Sacred Landmarks & Pilgrims</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#202522] tracking-tight">
            Pilgrimage Moments
          </h2>
          <p className="text-[#333333] text-base leading-relaxed">
            Witness authentic moments from As-Safar pilgrimage groups alongside the majesty of Makkah al-Mukarramah and Madinah al-Munawwarah.
          </p>

          {/* Interactive filter buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All Sights', count: GALLERY_ITEMS.length },
              { id: 'makkah', label: 'Makkah', count: GALLERY_ITEMS.filter(i => i.category === 'makkah').length },
              { id: 'madinah', label: 'Madinah', count: GALLERY_ITEMS.filter(i => i.category === 'madinah').length },
              { id: 'journey', label: 'Ziyarat & Stays', count: GALLERY_ITEMS.filter(i => i.category === 'journey' || i.category === 'hotels').length },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id as any)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  filter === t.id
                    ? 'bg-[#0B5D4B] text-white shadow-xs'
                    : 'bg-[#FFFFFF] text-[#202522] border border-[#E5E5E0] hover:bg-[#F8F7F3]'
                }`}
              >
                <span>{t.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  filter === t.id ? 'bg-white/20 text-white' : 'bg-stone-100 text-[#555555]'
                }`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const photoUrl = item.imageUrl || GALLERY_PHOTO_MAP[item.id] || 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890285/a68a756c-837e-452e-8d4a-f23b8905acc0_gsurq2.jpg';

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative rounded-2xl overflow-hidden bg-[#0A0D0C] border border-[#E5E5E0] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3]"
              >
                {/* Photographic Asset */}
                <img
                  src={photoUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Quick inspect eye button */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/25 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold text-[#C9A24D] uppercase tracking-wider block">
                    {item.accentText}
                  </span>
                  <h3 className="font-serif text-lg font-bold leading-tight mt-0.5 text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/90 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-[#C9A24D] shrink-0" />
                    <span className="truncate">{item.caption}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedItem(null)}
          >
            <div 
              className="bg-[#FFFFFF] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E5E5E0] relative flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                aria-label="Close image lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Preview with Next / Prev buttons */}
              <div className="relative aspect-[4/3] bg-[#0A0D0C] overflow-hidden flex items-center justify-center">
                <img
                  src={selectedItem.imageUrl || GALLERY_PHOTO_MAP[selectedItem.id] || 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890285/a68a756c-837e-452e-8d4a-f23b8905acc0_gsurq2.jpg'}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />

                {/* Prev Navigation */}
                {filteredItems.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-xs"
                    aria-label="Previous photograph"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {/* Next Navigation */}
                {filteredItems.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-xs"
                    aria-label="Next photograph"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}

                {/* Counter indicator */}
                {currentIndex >= 0 && (
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-xs font-mono">
                    {currentIndex + 1} / {filteredItems.length}
                  </div>
                )}
              </div>

              {/* Caption & Description Footer */}
              <div className="p-5 sm:p-6 space-y-2 bg-[#FFFFFF] overflow-y-auto">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#C9A24D] uppercase tracking-wider block">
                    {selectedItem.accentText}
                  </span>
                  <span className="text-[11px] font-semibold text-[#0B5D4B] bg-[#0B5D4B]/10 px-2 py-0.5 rounded-full capitalize">
                    {selectedItem.category === 'hotels' ? 'Accommodation' : selectedItem.category}
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#202522]">
                  {selectedItem.title}
                </h3>
                <p className="text-xs text-[#666666] flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A24D] shrink-0" />
                  <span>{selectedItem.caption}</span>
                </p>
                {selectedItem.description && (
                  <p className="text-sm text-[#444444] leading-relaxed pt-1 border-t border-[#E5E5E0] mt-3">
                    {selectedItem.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
