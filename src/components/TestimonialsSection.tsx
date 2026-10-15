import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? TESTIMONIALS.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === TESTIMONIALS.length - 1 ? 0 : prevIdx + 1));
  };

  return (
    <section className="py-14 sm:py-20 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3EE] border border-[#E5E5E0] text-xs font-bold uppercase tracking-wider text-[#0B5D4B]">
            <span className="w-2 h-2 rounded-full bg-[#C9A24D]" />
            <span>Honest Pilgrim Reflections</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#202522] tracking-tight">
            What Our Pilgrims Say
          </h2>
          <p className="text-[#333333] text-base leading-relaxed">
            Real experiences from brothers and sisters who journeyed to Makkah and Madinah with As-Safar Trichy.
          </p>
        </div>

        {/* Desktop 2-Card Layout / Mobile Single Swipe Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Card Presentation */}
          <div className="bg-[#F8F7F3] rounded-3xl p-6 sm:p-10 border border-[#E5E5E0] shadow-sm relative">
            <Quote className="w-12 h-12 text-[#C9A24D]/25 absolute top-6 right-6 pointer-events-none" />

            <div className="space-y-4">
              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A24D] text-[#C9A24D]" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-base sm:text-lg text-[#202522] leading-relaxed italic">
                "{TESTIMONIALS[currentIndex].quote}"
              </p>

              {/* Pilgrim Details */}
              <div className="pt-4 border-t border-[#E5E5E0] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-base text-[#202522]">
                    {TESTIMONIALS[currentIndex].name}
                  </h4>
                  <p className="text-xs text-[#555555]">
                    {TESTIMONIALS[currentIndex].location} · {TESTIMONIALS[currentIndex].packageTaken}
                  </p>
                </div>
                <span className="text-xs text-[#202522] font-semibold tabular-nums bg-white border border-[#E5E5E0] px-3 py-1 rounded-full self-start sm:self-auto">
                  {TESTIMONIALS[currentIndex].date}
                </span>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center justify-between sm:justify-end gap-3 mt-6">
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    currentIndex === i ? 'w-6 bg-[#0B5D4B]' : 'w-2 bg-[#E5E5E0]'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-[#E5E5E0] bg-white hover:bg-[#F5F3EE] text-[#202522] hover:text-[#0B5D4B] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-[#E5E5E0] bg-white hover:bg-[#F5F3EE] text-[#202522] hover:text-[#0B5D4B] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
