import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  MessageCircle, 
  Phone, 
  Compass, 
  Sparkles, 
  Moon, 
  FileCheck, 
  Plane, 
  CreditCard,
  Building,
  ArrowRight
} from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { PageRoute } from '../routes';

interface FaqPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenEnquiry: () => void;
}

interface FaqCategoryItem {
  id: string;
  name: string;
  icon: any;
  questions: {
    q: string;
    a: string;
  }[];
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onOpenEnquiry }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'umrah-0': true,
  });

  const categories: FaqCategoryItem[] = [
    {
      id: 'umrah',
      name: '1. Umrah Packages',
      icon: Compass,
      questions: [
        {
          q: 'What is the difference between Economy, Standard, and Premium Umrah packages?',
          a: 'The primary differences lie in hotel proximity to the holy sanctuaries, hotel star rating, room configurations, and transit options. Economy uses 3-star accommodations within walking distance (approx. 500m), Standard provides 4-star hotels within 200–300m, while Premium offers 5-star luxury directly adjacent to the Kaaba courtyard (such as the Clock Tower / Swissôtel) and includes the high-speed Haramain Bullet Train.',
        },
        {
          q: 'How many days are spent in Makkah and Madinah?',
          a: 'Our standard 14 to 15-day packages typically allocate 7 to 8 nights in Makkah Al-Mukarramah and 7 nights in Madinah Al-Munawwarah. Extended 21-day packages with additional days for spiritual contemplation and Ramadan packages are also available.',
        },
        {
          q: 'Are guided historical Ziyarat tours included in the package?',
          a: 'Yes, all packages include guided visits in both cities. In Makkah: Jabal al-Noor (Cave of Hira), Cave of Thawr, Mina, Arafat, and Muzdalifah. In Madinah: Mount Uhud, Masjid Quba, Masjid Qiblatain, and the Date Market.',
        },
        {
          q: 'Can family groups request private rooms?',
          a: 'Yes. Packages offer Quad (4 sharing), Triple (3 sharing), and Double/Twin (2 sharing) options. Private suites for families with infants or elderly parents can also be customized.',
        },
      ],
    },
    {
      id: 'hajj',
      name: '2. Hajj 2027',
      icon: Moon,
      questions: [
        {
          q: 'How do I advance register for Hajj 2027 with As-Safar?',
          a: 'You can submit your pilgrim details via our Hajj 2027 page, call our Trichy office (+91 95663 69654), or visit our Tabs Complex office in person. Early advance registration ensures you receive direct notification when official Nusuk registration windows open.',
        },
        {
          q: 'What role does the Nusuk platform play for Hajj pilgrims?',
          a: 'The Nusuk platform is the official digital portal managed by the Saudi Ministry of Hajj & Umrah for international pilgrim quota allocation and package selection. As-Safar provides technical facilitation in Trichy to register your family, upload biometric documents, and select preferred Mina camp zones.',
        },
        {
          q: 'What training is offered prior to Hajj departure?',
          a: 'As-Safar hosts a 4-day intensive pre-Hajj seminar in Trichy for all registered pilgrims. Tamil Islamic scholars demonstrate the practical rituals (Manasik), Ihram wearing, physical stamina prep, and health precautions.',
        },
        {
          q: 'Are Mina and Arafat tent arrangements coordinated?',
          a: 'Yes, during the 5 sacred days of Hajj, As-Safar coordinates upgraded air-conditioned tents in Mina with mattresses, regular hot meals, 24/7 doctor assistance, and scholar accompaniment for the Jamarat walks.',
        },
      ],
    },
    {
      id: 'docs',
      name: '3. Registration & Documentation',
      icon: FileCheck,
      questions: [
        {
          q: 'What documents are required to book an Umrah package?',
          a: 'You will need an original passport valid for at least 6 months from your travel date, 2 passport-size photographs with a clean white background, and a copy of your Aadhaar card. For children, a valid birth certificate copy is required.',
        },
        {
          q: 'Do you process Saudi visas and mandatory health insurance?',
          a: 'Yes, As-Safar handles the complete electronic visa submission (Saudi Tourist / Umrah eVisa) and mandatory comprehensive medical insurance approved by the Council of Health Insurance (CHI) of Saudi Arabia.',
        },
        {
          q: 'How many days does visa processing take?',
          a: 'Electronic visas are typically processed within 2 to 4 business days once documents are submitted. We recommend applying at least 4 weeks prior to your intended departure date.',
        },
        {
          q: 'Are biometric appointments required for Umrah?',
          a: 'Currently, the Saudi Visa Bio app allows pilgrims to complete fingerprint and facial biometrics from their smartphones. Our Trichy team guides you step-by-step through the verification process.',
        },
      ],
    },
    {
      id: 'travel',
      name: '4. Flights & Accommodation',
      icon: Plane,
      questions: [
        {
          q: 'From which airports do your group flights depart?',
          a: 'Our primary group departures operate from Tiruchirappalli International Airport (TRZ) and Chennai International Airport (MAA). Connecting flights from Madurai, Coimbatore, and Bangalore can be coordinated upon request.',
        },
        {
          q: 'How far are the hotels from Masjid al-Haram and Masjid an-Nabawi?',
          a: 'We maintain strict honesty on hotel locations. In our Economy package, hotels are within 550m of the courtyard. In Standard, within 200–300m. In Premium, hotels are in the front row or Clock Tower complex with zero metres and direct lift access.',
        },
        {
          q: 'What ground transportation is used between Makkah and Madinah?',
          a: 'We provide modern air-conditioned luxury high-deck coaches for airport and intercity travel. In our Premium package, pilgrims travel on the high-speed Haramain Bullet Train, reducing transit between Makkah and Madinah to approximately 2 hours.',
        },
        {
          q: 'What kind of meals are served during the trip?',
          a: 'Full-board packages include 3 meals daily (Breakfast, Lunch, Dinner) prepared by authentic South Indian/Tamil chefs, providing home-style dishes, rice, curries, and tea/coffee throughout your stay.',
        },
      ],
    },
    {
      id: 'payments',
      name: '5. Payments & Enquiries',
      icon: CreditCard,
      questions: [
        {
          q: 'What is the payment schedule for booking an Umrah package?',
          a: 'An initial advance token deposit is required to block flight seats and hotel rooms. The remaining balance can be settled in flexible installments, with full payment completed 15 to 20 days prior to departure.',
        },
        {
          q: 'What payment modes are accepted at your Trichy office?',
          a: 'We accept RTGS, NEFT, IMPS bank transfers, official UPI payments, and cheque payments at our Cantonment, Trichy office. Official GST stamped payment receipts are issued for every transaction.',
        },
        {
          q: 'What is the cancellation and refund policy?',
          a: 'Cancellation terms depend on the airline fare rules and Saudi hotel reservation policies at the time of cancellation. Unused visa fees and confirmed non-refundable flight seats are governed by airline guidelines, while eligible land-package amounts are refunded promptly.',
        },
        {
          q: 'How can I receive a customized group quotation for my extended family?',
          a: 'You can submit an enquiry via our Contact page, message us on WhatsApp (+91 95663 69654), or call our office directly. We provide tailored cost estimates within 2 hours based on your family count and dates.',
        },
      ],
    },
  ];

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Filter questions based on category and search query
  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return categories
      .filter((cat) => activeCategory === 'all' || cat.id === activeCategory)
      .map((cat) => {
        const filteredQ = cat.questions.filter((item) => {
          if (!query) return true;
          return item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query);
        });
        return {
          ...cat,
          questions: filteredQ,
        };
      })
      .filter((cat) => cat.questions.length > 0);
  }, [searchQuery, activeCategory]);

  return (
    <div className="bg-[#FFFFFF] text-[#202522]">
      {/* 1. Hero Banner */}
      <section className="relative bg-[#07382E] text-white py-16 sm:py-24 overflow-hidden border-b border-[#0B5D4B]/30">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=2000&q=80"
            alt="Pilgrims at Makkah"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07382E] via-[#07382E]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-[#C9A24D]/40 text-xs font-bold tracking-wider uppercase text-[#C9A24D]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Clear Guidance • Transparent Information</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Frequently Asked <span className="text-[#FFCE1B]">Questions</span>
            </h1>

            <p className="text-base sm:text-lg text-[#EAF3EF]/90 leading-relaxed max-w-2xl">
              Everything you need to know about planning your Umrah pilgrimage, Hajj 2027 preparation, visa documentation, hotel distances, and payments with As-Safar.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Category Filter */}
      <section className="py-8 bg-[#F8F7F3] border-b border-[#E5E5E0] sticky top-16 z-20 backdrop-blur-md bg-[#F8F7F3]/95 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Search Field */}
          <div className="relative">
            <Search className="w-5 h-5 text-[#777777] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. visa, hotel distance, senior citizen, food, Hajj 2027)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-[#E5E5E0] focus:border-[#0B5D4B] focus:ring-2 focus:ring-[#0B5D4B]/20 outline-none text-sm text-[#202522] shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#777777] hover:text-[#202522] font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer border ${
                activeCategory === 'all'
                  ? 'bg-[#0B5D4B] text-white border-[#0B5D4B] shadow-xs'
                  : 'bg-white text-[#202522] border-[#E5E5E0] hover:bg-[#F5F3EE]'
              }`}
            >
              All Categories
            </button>
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                    activeCategory === c.id
                      ? 'bg-[#0B5D4B] text-white border-[#0B5D4B] shadow-xs'
                      : 'bg-white text-[#202522] border-[#E5E5E0] hover:bg-[#F5F3EE]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Expandable Accordion Grouped by Category */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16 space-y-3 bg-[#F8F7F3] rounded-3xl p-8 border border-[#E5E5E0]">
              <HelpCircle className="w-12 h-12 text-[#C9A24D] mx-auto" />
              <h3 className="text-xl font-semibold text-[#202522]">
                No matching questions found
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] max-w-md mx-auto">
                We couldn't find any questions matching "{searchQuery}". Our Trichy team is ready to answer any custom inquiry.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-[#0B5D4B] text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                >
                  Clear Search Filter
                </button>
              </div>
            </div>
          ) : (
            filteredCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.id} className="space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-[#E5E5E0]">
                    <div className="w-8 h-8 rounded-lg bg-[#F5F3EE] text-[#0B5D4B] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#0B5D4B]" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#202522]">
                      {cat.name}
                    </h2>
                    <span className="text-xs text-[#777777] ml-auto tabular-nums">
                      {cat.questions.length} questions
                    </span>
                  </div>

                  <div className="space-y-3">
                    {cat.questions.map((faq, idx) => {
                      const itemKey = `${cat.id}-${idx}`;
                      const isOpen = !!openItems[itemKey];

                      return (
                        <div
                          key={idx}
                          className="border border-[#E5E5E0] rounded-2xl overflow-hidden bg-[#F8F7F3] transition-all"
                        >
                          <button
                            onClick={() => toggleItem(itemKey)}
                            className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-base text-[#202522] cursor-pointer"
                            aria-expanded={isOpen}
                          >
                            <span className="leading-snug">{faq.q}</span>
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                                isOpen ? 'bg-[#0B5D4B] text-white rotate-180' : 'bg-white text-[#202522] border border-[#E5E5E0]'
                              }`}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </button>

                          {isOpen && (
                            <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 text-xs sm:text-sm text-[#555555] leading-relaxed bg-white border-t border-[#E5E5E0] animate-fade-in">
                              <p>{faq.a}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 4. Bottom Contact CTA for Uncovered Questions */}
      <section className="py-14 bg-[#F8F7F3] border-t border-[#E5E5E0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#EAF3EF] text-[#0B5D4B] flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6 text-[#0B5D4B]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202522]">
            Have a Question Not Listed Here?
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] max-w-xl mx-auto">
            Our pilgrimage counselors at Tabs Complex, Cantonment, Trichy are available to clarify any personal requirement or policy questions.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('/contact')}
              className="bg-[#0B5D4B] hover:bg-[#084538] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Visit Contact Page & Map</span>
              <ArrowRight className="w-4 h-4 text-[#C9A24D]" />
            </button>

            <a
              href={`https://wa.me/919566369654?text=${encodeURIComponent('Assalamu Alaikum, I have a specific question not covered on your website FAQ.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Ask on WhatsApp</span>
            </a>

            <a
              href={`tel:${BRAND_INFO.phoneTel}`}
              className="bg-white hover:bg-[#F5F3EE] text-[#202522] border border-[#E5E5E0] font-bold text-sm px-5 py-3.5 rounded-xl transition-all flex items-center gap-2"
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
