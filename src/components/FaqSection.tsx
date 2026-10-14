import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/content';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-14 sm:py-20 bg-[#FFFFFF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3EE] border border-[#E5E5E0] text-xs font-bold uppercase tracking-wider text-[#0B5D4B]">
            <HelpCircle className="w-3.5 h-3.5 text-[#C9A24D]" />
            <span>Clear & Honest Guidance</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#202522] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[#333333] text-base leading-relaxed">
            Everything you need to know about planning your Umrah pilgrimage with As-Safar Trichy.
          </p>
        </div>

        {/* Accordion Cards */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-[#F8F7F3] rounded-2xl border border-[#E5E5E0] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#202522] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? 'bg-[#0B5D4B] text-white rotate-180'
                        : 'bg-white text-[#202522] border border-[#E5E5E0]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-[#333333] leading-relaxed border-t border-[#E5E5E0] pt-3 animate-fade-in bg-white/70">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Trichy Office Help Banner */}
        <div className="mt-8 text-center bg-[#F8F7F3] p-5 rounded-2xl border border-[#E5E5E0]">
          <p className="text-xs sm:text-sm text-[#202522]">
            Have a question not listed here? Call our Cantonment Trichy team directly at{' '}
            <a
              href="tel:+919566369654"
              className="font-bold text-[#0B5D4B] underline decoration-[#C9A24D]"
            >
              +91 95663 69654
            </a>{' '}
            or visit us at Tabs Complex opposite Child Jesus Hospital.
          </p>
        </div>
      </div>
    </section>
  );
};
