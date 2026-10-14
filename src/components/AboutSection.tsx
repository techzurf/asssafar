import React from 'react';
import { ShieldCheck, Heart, Users, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-20 bg-[#F5F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Story & Ethos */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5E5E0] text-xs font-bold uppercase tracking-wider text-[#0B5D4B]">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A24D]" />
                <span>Our Roots & Commitment</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#202522] tracking-tight">
                About As-Safar
              </h2>
              <p className="text-[#0B5D4B] font-semibold text-base sm:text-lg">
                Rooted in Trichy, Dedicated to the Guests of Ar-Rahman
              </p>
            </div>

            <p className="text-[#333333] text-base leading-relaxed">
              Founded in the historic city of Tiruchirappalli (Trichy), Tamil Nadu, As-Safar was established with a singular, noble mission: to remove every logistical anxiety from the sacred pilgrimage so you can focus entirely on your relationship with Allah ﷻ.
            </p>

            <p className="text-[#333333] text-base leading-relaxed">
              We understand the unique preferences of our Tamil Muslim community—from familiar authentic South Indian home-style dining and Tamil-speaking religious scholars, to handpicked hotels with zero slope and direct level access to the Haram courtyard for our elders.
            </p>

            {/* Core Values Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                'Honest Hotel Commitments (No Hidden Distances)',
                'Dedicated Tamil-Speaking Scholars (Aalims)',
                'Specialized Elderly & Wheelchair Assistance',
                'Comprehensive Pre-Departure Seminars in Trichy',
                'Round-the-Clock Ground Supervision in KSA',
                'Guaranteed Zamzam Supply on Return',
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-2.5 bg-[#FFFFFF] p-2.5 rounded-xl border border-[#E5E5E0]">
                  <div className="w-5 h-5 rounded-full bg-[#F5F3EE] text-[#0B5D4B] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0B5D4B]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-[#202522] leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Office & Trust Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[#E5E5E0] shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#C9A24D] uppercase tracking-wider block">
                  Trichy Headquarters
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#202522]">
                  Tabs Complex, Cantonment
                </h3>
                <p className="text-xs text-[#555555]">
                  Opposite Child Jesus Hospital, Bharathidasan Salai
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F7F3] border border-[#E5E5E0] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B5D4B] text-white flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-[#C9A24D]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#202522]">Face-to-Face Consultation</h4>
                    <p className="text-xs text-[#555555]">Meet our tour scholars before booking</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B5D4B] text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#C9A24D]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#202522]">Authorized & Verified</h4>
                    <p className="text-xs text-[#555555]">Direct tie-ups with Saudi hospitality chains</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B5D4B] text-white flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-[#C9A24D]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#202522]">Family-Centric Care</h4>
                    <p className="text-xs text-[#555555]">Special arrangements for mothers & children</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${BRAND_INFO.phoneTel}`}
                  className="w-full bg-[#0B5D4B] hover:bg-[#084538] text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md active:scale-95"
                >
                  <span>Connect With Our Trichy Team</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
