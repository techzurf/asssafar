import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  MapPin, 
  Building, 
  Train, 
  Check, 
  Utensils, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Users, 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight,
  Plane,
  HeartHandshake
} from 'lucide-react';
import { UMRAH_PACKAGES } from '../data/packages';
import { BRAND_INFO } from '../data/content';
import { PackageItem } from '../types';
import { PageRoute } from '../routes';
import { fetchPublicActivePackages, PACKAGES_UPDATED_EVENT } from '../services/packageService';

interface UmrahPackagesPageProps {
  onSelectPackage: (pkg: PackageItem) => void;
  onNavigate: (route: PageRoute) => void;
}

export const UmrahPackagesPage: React.FC<UmrahPackagesPageProps> = ({
  onSelectPackage,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'economy' | 'standard' | 'premium'>('all');
  const [expandedInclusions, setExpandedInclusions] = useState<string | null>('premium');
  const [packages, setPackages] = useState<PackageItem[]>(UMRAH_PACKAGES);

  // Fetch active packages from Supabase on mount and listen to updates
  React.useEffect(() => {
    let isMounted = true;
    fetchPublicActivePackages().then((res) => {
      if (isMounted && res.data && res.data.length > 0) {
        setPackages(res.data);
      }
    });

    const handleUpdate = () => {
      fetchPublicActivePackages().then((res) => {
        if (isMounted && res.data && res.data.length > 0) {
          setPackages(res.data);
        }
      });
    };

    window.addEventListener(PACKAGES_UPDATED_EVENT, handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener(PACKAGES_UPDATED_EVENT, handleUpdate);
    };
  }, []);

  const filteredPackages = selectedCategory === 'all'
    ? packages
    : packages.filter((p) => p.category === selectedCategory);

  const packageImages: Record<string, { url: string; alt: string }> = {
    economy: {
      url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80',
      alt: 'Pilgrims gathered at Masjid al-Haram in Makkah',
    },
    standard: {
      url: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1200&q=80',
      alt: 'Pilgrims circumambulating the Kaaba during Umrah',
    },
    premium: {
      url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80',
      alt: 'The Holy Kaaba at Masjid al-Haram in Makkah at sunset',
    },
  };

  const umrahFaqs = [
    {
      q: 'Can package dates or durations be customized for private families?',
      a: 'Yes, alongside our scheduled monthly group departures from Trichy and Chennai, we provide bespoke private Umrah itineraries for couples and families with tailored hotel options and private vehicle transfers.',
    },
    {
      q: 'What is included in the pre-departure training in Trichy?',
      a: 'Every registered pilgrim is invited to a comprehensive 3-hour orientation session at our Tabs Complex office. Our scholars explain Ihram rules, Tawaf/Sa’ee methods, health precautions, and baggage guidelines.',
    },
    {
      q: 'Do you provide wheelchair assistance for senior citizens in the Haram?',
      a: 'Yes. Our on-ground tour team in Makkah and Madinah assists with hiring authorized electric wheelchairs or licensed porters for Tawaf and Sa’ee so elders can perform their rituals peacefully.',
    },
    {
      q: 'Are food and Indian meals provided during the trip?',
      a: 'All our standard and premium packages include 3 daily meals prepared by experienced South Indian/Tamil chefs, featuring familiar, wholesome vegetarian and non-vegetarian choices alongside tea and coffee.',
    },
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="bg-[#FFFFFF] text-[#202522]">
      {/* 1. Hero Banner */}
      <section className="relative bg-[#07382E] text-white py-16 sm:py-24 overflow-hidden border-b border-[#0B5D4B]/30">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=2000&q=80"
            alt="Makkah Holy Sanctuary"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07382E] via-[#07382E]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-[#C9A24D]/40 text-xs font-bold tracking-wider uppercase text-[#C9A24D]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scheduled Monthly Departures • Trichy & Chennai</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Monthly Umrah Packages <span className="text-[#FFCE1B]">Curated for Devotion</span>
            </h1>

            <p className="text-base sm:text-lg text-[#EAF3EF]/90 leading-relaxed max-w-2xl">
              Experience the tranquility of Makkah and Madinah with As-Safar’s regular monthly group departures. We provide verified hotel proximities, Tamil-speaking scholars, wholesome South Indian dining, and caring on-ground tour managers.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/919566369654?text=${encodeURIComponent('Assalamu Alaikum, I would like to enquire about As-Safar Umrah packages.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Enquiry</span>
              </a>

              <a
                href={`tel:${BRAND_INFO.phoneTel}`}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3 rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C9A24D]" />
                <span className="tabular-nums">Call +91 95663 69654</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Introduction to As-Safar Umrah Services */}
      <section className="py-12 sm:py-16 bg-[#F8F7F3] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-[#C9A24D] uppercase tracking-wider">
                Transparent Pilgrimage Planning
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#202522]">
                Every Package Designed with Pilgrim Well-Being at Heart
              </h2>
              <p className="text-[#555555] text-sm sm:text-base leading-relaxed">
                Whether you select our budget-friendly Economy package or the ultra-convenient Premium experience steps away from the Kaaba courtyard, our foundational promises remain unwavering: complete transparency on hotel distances, delicious hot meals, and scholar-led rituals in your native language.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { label: 'Hotel Proximity', sub: 'Zero Hidden Distances' },
                  { label: 'Tamil Scholars', sub: 'Step-by-Step Guidance' },
                  { label: 'South Indian Food', sub: 'Home-Style Taste' },
                  { label: 'Luggage & Zamzam', sub: 'End-to-End Care' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-[#E5E5E0] shadow-2xs">
                    <p className="font-bold text-xs sm:text-sm text-[#0B5D4B]">{item.label}</p>
                    <p className="text-[11px] text-[#777777] mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter Pills */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E5E5E0] shadow-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-[#202522] mb-3">
                Filter Packages by Tier:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'all', label: 'All Packages (3)' },
                  { id: 'economy', label: 'Economy (14 Days)' },
                  { id: 'standard', label: 'Standard (15 Days)' },
                  { id: 'premium', label: 'Premium (15 Days)' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedCategory(tier.id as any)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
                      selectedCategory === tier.id
                        ? 'bg-[#0B5D4B] text-white border-[#0B5D4B] shadow-xs'
                        : 'bg-[#F8F7F3] text-[#202522] border-[#E5E5E0] hover:bg-[#F0EEE6]'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#777777] mt-3">
                * Package prices are published as verified base quad-sharing rates. Triple & double occupancy options available upon request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Detailed Package Cards */}
      <section className="py-16 sm:py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#202522]">
              Explore Our Umrah Packages
            </h2>
            <p className="text-sm sm:text-base text-[#555555]">
              Select a package to view complete hotel details, transit specifications, and daily inclusions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {filteredPackages.map((pkg) => {
              const imgData = packageImages[pkg.id] || packageImages.economy;
              const isPopular = pkg.id === 'standard' || pkg.id === 'premium';

              return (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 border ${
                    pkg.id === 'premium'
                      ? 'border-2 border-[#C9A24D] shadow-lg ring-1 ring-[#C9A24D]/30'
                      : 'border-[#E5E5E0] shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Card Header & Photo */}
                  <div>
                    <div className="relative h-56 w-full overflow-hidden bg-black/10">
                      <img
                        src={imgData.url}
                        alt={imgData.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#0B5D4B] text-white text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
                          {pkg.badge || pkg.name}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-xs font-semibold text-[#FFCE1B] flex items-center gap-1 tabular-nums">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{pkg.duration}</span>
                        </p>
                        <h3 className="text-xl sm:text-2xl font-semibold leading-tight">
                          {pkg.name}
                        </h3>
                      </div>
                    </div>

                    {/* Pricing Block */}
                    <div className="p-6 bg-[#F8F7F3] border-b border-[#E5E5E0] flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] text-[#777777] uppercase font-bold tracking-wider block">
                          Starting From
                        </span>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-2xl sm:text-3xl font-bold text-[#0B5D4B] tabular-nums tracking-tight">
                            {pkg.startingPrice}
                          </span>
                          <span className="text-xs text-[#555555]">/ pilgrim</span>
                        </div>
                      </div>
                      <span className="text-[11px] bg-white border border-[#E5E5E0] text-[#0B5D4B] font-semibold px-2.5 py-1 rounded-md">
                        Quad Sharing
                      </span>
                    </div>

                    {/* Accommodation & Transit Spec */}
                    <div className="p-6 space-y-4 text-xs sm:text-sm">
                      <p className="text-[#555555] italic leading-relaxed">
                        "{pkg.tagline}"
                      </p>

                      <div className="space-y-3 pt-2">
                        {/* Makkah Hotel */}
                        <div className="flex items-start gap-2.5">
                          <Building className="w-4 h-4 text-[#C9A24D] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[#202522] block">Makkah Stay:</span>
                            <span className="text-[#555555]">{pkg.makkahHotel}</span>
                            <span className="text-[11px] text-[#0B5D4B] font-medium block mt-0.5">
                              {pkg.makkahDistance}
                            </span>
                          </div>
                        </div>

                        {/* Madinah Hotel */}
                        <div className="flex items-start gap-2.5">
                          <Building className="w-4 h-4 text-[#C9A24D] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[#202522] block">Madinah Stay:</span>
                            <span className="text-[#555555]">{pkg.madinahHotel}</span>
                            <span className="text-[11px] text-[#0B5D4B] font-medium block mt-0.5">
                              {pkg.madinahDistance}
                            </span>
                          </div>
                        </div>

                        {/* Transport */}
                        <div className="flex items-start gap-2.5">
                          <Train className="w-4 h-4 text-[#C9A24D] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[#202522] block">Ground Transport:</span>
                            <span className="text-[#555555]">{pkg.transport}</span>
                          </div>
                        </div>

                        {/* Dining */}
                        <div className="flex items-start gap-2.5">
                          <Utensils className="w-4 h-4 text-[#C9A24D] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[#202522] block">Meals & Dining:</span>
                            <span className="text-[#555555]">{pkg.food}</span>
                          </div>
                        </div>
                      </div>

                      {/* Inclusions Accordion */}
                      <div className="pt-2">
                        <button
                          onClick={() => setExpandedInclusions(expandedInclusions === pkg.id ? null : pkg.id)}
                          className="w-full flex items-center justify-between py-2 text-xs font-bold text-[#0B5D4B] border-t border-[#E5E5E0] cursor-pointer"
                        >
                          <span>{expandedInclusions === pkg.id ? 'Hide Included Features' : 'View All Inclusions (' + pkg.inclusions.length + ')'}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${expandedInclusions === pkg.id ? 'rotate-180' : ''}`} />
                        </button>

                        {expandedInclusions === pkg.id && (
                          <ul className="space-y-1.5 pt-2 text-[11px] text-[#333333] border-t border-dashed border-[#E5E5E0] animate-fade-in">
                            {pkg.inclusions.map((inc, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <Check className="w-3.5 h-3.5 text-[#0B5D4B] shrink-0 mt-0.5" />
                                <span>{inc}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-6 pt-0 space-y-2">
                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="w-full bg-[#0B5D4B] hover:bg-[#084538] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>Enquire About This Package</span>
                      <ArrowRight className="w-4 h-4 text-[#C9A24D]" />
                    </button>

                    <a
                      href={`https://wa.me/919566369654?text=${encodeURIComponent(`Assalamu Alaikum, I would like more details and departure dates for the ${pkg.name} (${pkg.startingPrice}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#F8F7F3] hover:bg-[#EAF3EF] text-[#202522] font-semibold text-xs py-2 px-3 rounded-lg border border-[#E5E5E0] flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Umrah Services and Support Section */}
      <section className="py-14 sm:py-20 bg-[#F8F7F3] border-t border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B5D4B]">
              Comprehensive Care
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#202522]">
              Complete Umrah Services Included
            </h2>
            <p className="text-sm text-[#555555]">
              Every detail is meticulously coordinated from our Trichy office before you even step onto the aircraft.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: 'Saudi Electronic Visa & Health Insurance',
                desc: 'Full assistance with tourist/Umrah e-visas, verified medical coverage, and biometrics processing.',
              },
              {
                icon: Plane,
                title: 'Flight Bookings from Trichy & Chennai',
                desc: 'Group allocations on reputable scheduled airlines with proper baggage allowances and transit support.',
              },
              {
                icon: Building,
                title: 'Direct Hotel Allotments in Makkah & Madinah',
                desc: 'Confirmed bookings in clean, air-conditioned hotels with guaranteed lift capacity and walking proximity.',
              },
              {
                icon: Users,
                title: 'Scholarly Ritual Guidance (Tamil & Urdu)',
                desc: 'Step-by-step guidance for Ihram, Tawaf, and Sa’ee led by certified Aalims who accompany every group.',
              },
              {
                icon: HeartHandshake,
                title: 'Senior Citizen & Wheelchair Coordination',
                desc: 'Arrangement of wheelchairs, ground floor rooms, and dedicated volunteers to look after elderly pilgrims.',
              },
              {
                icon: MapPin,
                title: 'Full Historical Ziyarat Tours',
                desc: 'Guided visits to Jabal al-Noor, Cave of Hira, Mount Uhud, Masjid Quba, and historical landmarks.',
              },
            ].map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E5E5E0] shadow-2xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F3EE] text-[#0B5D4B] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#0B5D4B]" />
                  </div>
                  <h3 className="font-semibold text-base text-[#202522]">{srv.title}</h3>
                  <p className="text-xs text-[#555555] leading-relaxed">{srv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Package-Specific FAQs */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202522]">
              Monthly Umrah Questions
            </h2>
            <p className="text-sm text-[#555555]">
              Common queries from pilgrims planning a scheduled monthly Umrah journey with As-Safar.
            </p>
          </div>

          <div className="space-y-3">
            {umrahFaqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={i} className="border border-[#E5E5E0] rounded-2xl overflow-hidden bg-[#F8F7F3]">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-base text-[#202522] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#0B5D4B] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-[#555555] leading-relaxed bg-white border-t border-[#E5E5E0]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Prominent WhatsApp / Call Enquiry Banner */}
      <section className="py-12 bg-[#07382E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Need a Customized Date or Private Room for Your Family?
          </h2>
          <p className="text-sm sm:text-base text-[#EAF3EF]/90 max-w-2xl mx-auto">
            Contact our Cantonment Trichy office directly. We are happy to tailor custom dates, flight sectors, and hotel categories for private groups.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/919566369654?text=${encodeURIComponent('Assalamu Alaikum, I would like to speak with a counselor about a custom Umrah package.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>WhatsApp Our Trichy Office</span>
            </a>

            <button
              onClick={() => onNavigate('/contact')}
              className="bg-[#C9A24D] hover:bg-[#B38D3B] text-[#07382E] font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Visit Our Office / Contact Details
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export const MonthlyUmrahPage = UmrahPackagesPage;
