import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Users, 
  MapPin, 
  CheckCircle, 
  Phone, 
  MessageCircle, 
  Building, 
  Compass, 
  Award,
  BookOpen,
  Calendar
} from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { PageRoute } from '../routes';

interface AboutUsPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenEnquiry: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate, onOpenEnquiry }) => {
  return (
    <div className="bg-[#FFFFFF] text-[#202522]">
      {/* 1. Hero Banner */}
      <section className="relative bg-[#07382E] text-white py-16 sm:py-24 overflow-hidden border-b border-[#0B5D4B]/30">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=2000&q=80"
            alt="The Holy Kaaba in Makkah"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07382E] via-[#07382E]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-[#C9A24D]/40 text-xs font-bold tracking-wider uppercase text-[#C9A24D]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rooted in Cantonment, Trichy • Dedicated to Pilgrims</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              About <span className="text-[#FFCE1B]">As-Safar</span>
            </h1>

            <p className="text-base sm:text-lg text-[#EAF3EF]/90 leading-relaxed max-w-2xl">
              Rooted in the historic city of Tiruchirappalli (Trichy), As-Safar is dedicated to removing every logistical stress from your sacred pilgrimage so you can focus whole-heartedly on your spiritual connection with Allah ﷻ.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenEnquiry}
                className="bg-[#C9A24D] hover:bg-[#B38D3B] text-[#07382E] font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Plan Your Pilgrimage
              </button>

              <button
                onClick={() => onNavigate('/contact')}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#C9A24D]" />
                <span>Visit Trichy Office</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission & Pilgrimage Approach */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B5D4B]">
                Our Philosophy & Calling
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
                Guiding the Guests of Ar-Rahman with Utmost Sincerity
              </h2>
              
              <p className="text-[#555555] text-sm sm:text-base leading-relaxed">
                Performing Umrah or Hajj is one of the most sacred commitments a Muslim undertakes. Too often, pilgrims face undisclosed hotel distances, miscommunications in unfamiliar languages, and uncoordinated ground transit that detract from their worship.
              </p>

              <p className="text-[#555555] text-sm sm:text-base leading-relaxed">
                At As-Safar, we approach pilgrimage travel not merely as a commercial booking service, but as an Amanah (a sacred trust). We tailor every journey to the unique needs of families from Tamil Nadu—arranging authentic South Indian home-style dining, patient Tamil-speaking Aalims, wheelchair assistance for parents, and zero-slope hotel entries in Makkah.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F8F7F3] p-4 rounded-2xl border border-[#E5E5E0]">
                  <p className="font-bold text-sm text-[#0B5D4B]">Clear Communication</p>
                  <p className="text-xs text-[#777777] mt-1">
                    Every hotel distance, room configuration, and departure schedule is explained candidly prior to booking.
                  </p>
                </div>
                <div className="bg-[#F8F7F3] p-4 rounded-2xl border border-[#E5E5E0]">
                  <p className="font-bold text-sm text-[#0B5D4B]">End-to-End Accompaniment</p>
                  <p className="text-xs text-[#777777] mt-1">
                    From pre-departure workshops in Trichy to flight gate arrivals in Saudi Arabia and return Zamzam delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-lg border border-[#E5E5E0] bg-[#0A0D0C]">
                <img
                  src="https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80"
                  alt="Pilgrims at Masjid an-Nabawi in Madinah"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-[#E5E5E0] max-w-xs hidden sm:block">
                <p className="text-xs font-bold text-[#C9A24D] uppercase">Trichy Head Office</p>
                <p className="text-xs text-[#202522] font-semibold mt-1">
                  Tabs Complex, Bharathidasan Salai, Cantonment
                </p>
                <p className="text-[11px] text-[#777777] mt-0.5">
                  Walk-in consultations available Monday to Saturday
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values: Trust, Transparency, Care & Service */}
      <section className="py-16 sm:py-20 bg-[#F8F7F3] border-t border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B5D4B]">
              What Defines Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
              Our Guiding Principles & Values
            </h2>
            <p className="text-sm text-[#555555]">
              Four pillars that guide every decision, booking, and interaction at As-Safar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Trust (Amanah)',
                desc: 'We treat every pilgrim’s journey as an Amanah. We fulfill what we promise and never compromise on safety, dignity, and ritual propriety.',
              },
              {
                icon: CheckCircle,
                title: 'Transparency (Sidq)',
                desc: 'Complete honesty in pricing, hotel star ratings, walking distance, flight sectors, and visa conditions with zero hidden surcharges.',
              },
              {
                icon: Heart,
                title: 'Caring Service (Khidmah)',
                desc: 'Compassionate assistance especially for elderly parents, women traveling with children, and first-time pilgrims performing their first Tawaf.',
              },
              {
                icon: BookOpen,
                title: 'Authentic Guidance (Sunnah)',
                desc: 'Rituals performed strictly according to Quran & Sunnah with patient, qualified Islamic scholars providing clarity in Tamil.',
              },
            ].map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-[#E5E5E0] shadow-xs space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F5F3EE] text-[#0B5D4B] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#0B5D4B]" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#202522]">{val.title}</h3>
                  <p className="text-xs text-[#555555] leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Customer Service & Guidance Infrastructure */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B5D4B]">
              Dedicated Pilgrim Support
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#202522]">
              Customer Service Across Every Phase
            </h2>
            <p className="text-sm text-[#555555]">
              How we support pilgrims before, during, and after their sacred journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8F7F3] p-6 rounded-2xl border border-[#E5E5E0] space-y-3">
              <span className="text-xs font-bold text-[#C9A24D] uppercase">Phase 1</span>
              <h3 className="font-serif font-bold text-lg text-[#202522]">Pre-Departure Preparation</h3>
              <ul className="space-y-2 text-xs text-[#555555]">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0B5D4B] shrink-0 mt-0.5" />
                  <span>Interactive training workshops at Tabs Complex Trichy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0B5D4B] shrink-0 mt-0.5" />
                  <span>Passport, visa, and Nusuk clearance assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0B5D4B] shrink-0 mt-0.5" />
                  <span>Complimentary pilgrim kit: bag, Tawaf counter & handbook</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#F8F7F3] p-6 rounded-2xl border border-[#E5E5E0] space-y-3">
              <span className="text-xs font-bold text-[#C9A24D] uppercase">Phase 2</span>
              <h3 className="font-serif font-bold text-lg text-[#202522]">During the Pilgrimage in KSA</h3>
              <ul className="space-y-2 text-xs text-[#555555]">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0B5D4B] shrink-0 mt-0.5" />
                  <span>Stationed tour directors in Makkah and Madinah hotel lobbies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0B5D4B] shrink-0 mt-0.5" />
                  <span>Tamil Aalims leading Tawaf, Sa'ee, and daily religious halaqas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0B5D4B] shrink-0 mt-0.5" />
                  <span>Guided AC buses for comprehensive historical Ziyarat tours</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#F8F7F3] p-6 rounded-2xl border border-[#E5E5E0] space-y-3">
              <span className="text-xs font-bold text-[#C9A24D] uppercase">Phase 3</span>
              <h3 className="font-serif font-bold text-lg text-[#202522]">Return & Post-Journey Care</h3>
              <ul className="space-y-2 text-xs text-[#555555]">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0B5D4B] shrink-0 mt-0.5" />
                  <span>Organized airport transfers and check-in baggage management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0B5D4B] shrink-0 mt-0.5" />
                  <span>5-Litre packed Zamzam water distribution upon return</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0B5D4B] shrink-0 mt-0.5" />
                  <span>Post-pilgrimage alumni network and guidance continuity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Prominent Contact / Enquiry Call to Action */}
      <section className="py-12 bg-[#07382E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
            Have Questions About Planning with As-Safar?
          </h2>
          <p className="text-sm sm:text-base text-[#EAF3EF]/90 max-w-2xl mx-auto">
            Our counselors in Trichy are ready to assist you and your family. Reach out today for a consultation or quote.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('/contact')}
              className="bg-[#C9A24D] hover:bg-[#B38D3B] text-[#07382E] font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Contact Our Office
            </button>

            <a
              href={`https://wa.me/919566369654?text=${encodeURIComponent('Assalamu Alaikum, I would like to know more about As-Safar services and packages.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Us Directly</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
