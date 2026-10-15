import React, { useState } from 'react';
import { 
  Sparkles, 
  Moon, 
  Calendar, 
  MapPin, 
  Building, 
  Train, 
  Check, 
  Utensils, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Users, 
  ChevronDown, 
  Clock, 
  AlertCircle,
  HeartHandshake,
  Star
} from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { PageRoute } from '../routes';

interface RamadanUmrahPageProps {
  onOpenEnquiry: (packageId?: string) => void;
  onNavigate: (route: PageRoute) => void;
}

interface RamadanPackage {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  duration: string;
  tagline: string;
  departureDates: string;
  makkahHotel: string;
  makkahDistance: string;
  madinahHotel: string;
  madinahDistance: string;
  transport: string;
  meals: string;
  visa: string;
  pricing: string;
  priceNote: string;
  inclusions: string[];
  spiritualHighlights: string[];
}

const RAMADAN_PACKAGES: RamadanPackage[] = [
  {
    id: 'ramadan-first15',
    name: 'Ramadan Early Season (First 15 Days)',
    badge: 'Spiritual Serenity',
    badgeColor: 'bg-[#0B5D4B] text-white',
    duration: '15 Days (8 Nights Makkah + 7 Nights Madinah)',
    tagline: 'Experience the initial blessings of Ramadan with calm Haram courtyards and dedicated scholar guidance.',
    departureDates: '[Dates TBA — Scheduled upon Ramadan 1447 Moon Sighting & Visa Quota Release]',
    makkahHotel: '[Selected 4★ / 5★ Hotel in Walking Distance — Details TBA closer to season]',
    makkahDistance: 'Within walking perimeter to Masjid al-Haram courtyards [Under 450m]',
    madinahHotel: '[Central Northern Area Hotel — Details TBA]',
    madinahDistance: 'Short walk to Masjid an-Nabawi ladies & gents entrances [Under 250m]',
    transport: 'Air-conditioned luxury coach / High-speed train option [Included]',
    meals: 'Wholesome Suhoor (Sehri) and daily communal Iftar [Included]',
    visa: 'Saudi Electronic Tourist / Umrah Visa with mandatory Ramadan health insurance [Included]',
    pricing: '₹ [Tariff TBA — Pre-Register for Priority Estimate]',
    priceNote: '*Per pilgrim sharing. Final pricing announced upon airline seat and Ramadan quota confirmation.',
    inclusions: [
      'Return flights from Trichy / Chennai [Sectors TBA]',
      'Saudi Umrah / Tourist Visa with medical coverage [Included]',
      'Hotel accommodation in Makkah & Madinah [Hotels TBA]',
      'Daily Suhoor and Iftar buffet arrangements [Included]',
      'Historical Ziyarat in Makkah and Madinah with Tamil scholars [Included]',
      'Tamil-speaking scholars leading daily halaqahs & prayer coordination',
      '5 Litres Zamzam water provided at departure airport [Included]',
      'Pre-departure orientation and briefing session in Trichy',
    ],
    spiritualHighlights: [
      'Experience Taraweeh prayers behind world-renowned Haramain Imams',
      'Peaceful atmosphere of the initial days of Ramadan',
      'Scholarly explanation of Ramadan Sunnahs and Dua etiquettes',
    ]
  },
  {
    id: 'ramadan-last10',
    name: 'Ramadan Last 10 Days & Laylat al-Qadr',
    badge: 'MOST SOUGHT AFTER',
    badgeColor: 'bg-[#C9A24D] text-[#07382E]',
    duration: '12 to 14 Days (Covering 20th Ramadan to Eid al-Fitr)',
    tagline: 'Witness the peak spiritual grandeur of Laylat al-Qadr and Qiyam al-Layl at the Holy Kaaba.',
    departureDates: '[Targeted 20th / 21st Ramadan to 2nd Shawwal — Exact flight schedule TBA]',
    makkahHotel: '[Prime 5★ / 4★ Hotel with Immediate Haram Courtyard Access — Details TBA]',
    makkahDistance: 'Direct front-row or short stroll access to Kaaba courtyards [Zero to 250m]',
    madinahHotel: '[Premium Central Madinah Hotel — Details TBA]',
    madinahDistance: 'Steps from Prophet’s Mosque gate [Zero to 150m]',
    transport: 'Haramain High-Speed Rail & VIP Airport Transfers [Included]',
    meals: 'Full Suhoor & festive Iftar arrangements with South Indian & Arabian choices [Included]',
    visa: 'Priority Ramadan visa clearance and insurance [Included]',
    pricing: '₹ [Tariff TBA — Limited Quota Pre-Registration Open]',
    priceNote: '*Per pilgrim. Early advance registration strictly recommended due to high demand.',
    inclusions: [
      'Direct / convenient flight connections from Trichy (TRZ) / Chennai (MAA)',
      'Front-row hotel locations to avoid transit during peak prayer crowds',
      'Assistance with Tahajjud (Qiyam al-Layl) and Khatam al-Qur’an coordination',
      'Assistance for pilgrims desiring Itikaf in Haramain [Subject to Saudi portal rules]',
      'Senior Tamil Muftis and scholars accompanying the delegation',
      'Eid al-Fitr prayer celebrated inside Masjid al-Haram or Masjid an-Nabawi',
      '5L Zamzam container + executive travel duffle kit [Included]',
    ],
    spiritualHighlights: [
      'Seek Laylat al-Qadr (The Night of Decree) in the holiest sanctuary on earth',
      'Emotion-filled Khatam al-Qur’an dua with millions of believers',
      'Celebrate Eid al-Fitr morning in the blessed Haramain',
    ]
  },
  {
    id: 'ramadan-fullmonth',
    name: 'Complete Full Month Ramadan Umrah',
    badge: 'Total Immersion',
    badgeColor: 'bg-[#07382E] text-white',
    duration: '30 Days (1st Ramadan to 2nd Shawwal)',
    tagline: 'Spend the entire holy month fasting, praying, and seeking forgiveness in the blessed cities.',
    departureDates: '[Departure 1-2 days before 1st Ramadan — Returning post-Eid — Dates TBA]',
    makkahHotel: '[Long-stay Hospitality Suites / 4★ Hotel Partner — Details TBA]',
    makkahDistance: 'Walking distance or 24/7 dedicated shuttle to Haram [TBA]',
    madinahHotel: '[Comfortable Long-Stay Central Hotel in Madinah — Details TBA]',
    madinahDistance: 'Convenient proximity to Prophet’s Mosque [TBA]',
    transport: 'Complete airport reception, intercity bullet train, and Ziyarat [Included]',
    meals: 'Full 30-day Suhoor and Iftar support with familiar Tamil flavors [Included]',
    visa: 'Full-duration Saudi Tourist / Umrah Visa with 30-day medical insurance [Included]',
    pricing: '₹ [Custom Quote — Inquire with As-Safar Cantonment Trichy Office]',
    priceNote: '*Special pricing options based on quad, triple, or double occupancy preferences.',
    inclusions: [
      'Full month accommodation in both Makkah al-Mukarramah & Madinah al-Munawwarah',
      'Return flights from Trichy / Chennai [Sectors TBA]',
      'Comprehensive 30-day logistics, meal services, and scholar accompaniment',
      'Complete historical Ziyarat program across sacred sites in both holy cities',
      'Dedicated on-ground As-Safar tour supervisors stationed in hotel lobby',
      'Laundry coordination support for long-stay convenience',
      '5L packed Zamzam box at airport checkout [Included]',
    ],
    spiritualHighlights: [
      'Fast every day of Ramadan within view of the Kaaba and Prophet’s dome',
      'Complete multiple recitations of the Holy Quran in the Haram',
      'Unmatched peace and spiritual rejuvenation without worldly rush',
    ]
  }
];

export const RamadanUmrahPage: React.FC<RamadanUmrahPageProps> = ({
  onOpenEnquiry,
  onNavigate,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const ramadanFaqs = [
    {
      q: 'Why are Ramadan dates and hotel names currently marked as [TBA]?',
      a: 'In accordance with our strict policy of complete transparency and honesty, As-Safar never fabricates hotel contracts or flight schedules before the Saudi Ministry of Hajj & Umrah and international airlines officially release their seasonal Ramadan quotas. Marking them as [TBA] ensures you receive 100% verified information as soon as contracts are finalized.',
    },
    {
      q: 'How does pre-registration for Ramadan Umrah work?',
      a: 'Pre-registration allows you to reserve your priority token with our Trichy office before public bookings open. When the official quotas and room allocations are approved, pre-registered pilgrims are offered first choice of hotel categories and locked-in airline fares.',
    },
    {
      q: 'How are Suhoor (Sehri) and Iftar arranged during Ramadan?',
      a: 'As-Safar coordinates daily freshly prepared Suhoor buffets before Fajr and nutritious Iftar platters (dates, fresh fruits, Tamil kanji/porridge, snacks, and juices). Our tour managers also assist pilgrims with taking prayer mats and light snacks to the Haram plazas for communal Iftar.',
    },
    {
      q: 'Can pilgrims perform Itikaf (spiritual seclusion) in the Haram during the Last 10 Days?',
      a: 'The Saudi General Authority for the Care of the Two Holy Mosques requires advance electronic permits for Itikaf via the Nusuk portal. As-Safar’s documentation desk assists interested pilgrims with registration as soon as official registration windows open.',
    },
    {
      q: 'Are departures available directly from Trichy and Chennai?',
      a: 'Yes, we plan group departures from Tiruchirappalli International Airport (TRZ) and Chennai International Airport (MAA) to Jeddah (JED) or Madinah (MED), with connections designed for minimal layover times.',
    },
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#202522]">
      {/* 1. Premium Ramadan Umrah Hero Section */}
      <section className="relative bg-[#07382E] text-white py-16 sm:py-24 overflow-hidden border-b border-[#0B5D4B]/30">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=2000&q=80"
            alt="Makkah Masjid al-Haram at night during Ramadan"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07382E] via-[#07382E]/90 to-[#07382E]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-[#C9A24D]/50 text-xs font-bold tracking-wider uppercase text-[#C9A24D]">
              <Moon className="w-3.5 h-3.5 text-[#FFCE1B]" />
              <span>RAMADAN 1447 / 2026 • PRIORITY PRE-REGISTRATION OPEN</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Ramadan Umrah Packages
            </h1>

            <div className="p-3.5 sm:p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-[#EAF3EF] text-sm sm:text-base leading-relaxed">
              <p className="font-serif italic text-[#FFCE1B] mb-1">
                "An Umrah performed in Ramadan is equivalent to performing Hajj with me."
              </p>
              <p className="text-xs text-[#EAF3EF]/80 font-sans">
                — Prophet Muhammad ﷺ (Sahih al-Bukhari 1863, Sahih Muslim 1256)
              </p>
            </div>

            <p className="text-base sm:text-lg text-[#EAF3EF]/90 leading-relaxed max-w-2xl">
              Immerse yourself in the unmatched spiritual ecstasy of fasting, Taraweeh, and Laylat al-Qadr at the Holy Kaaba and the Prophet’s Mosque. As-Safar provides dedicated pilgrim care, verified proximities, wholesome meals, and scholar accompaniment.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenEnquiry('ramadan-last10')}
                className="bg-[#C9A24D] hover:bg-[#B38D3B] text-[#07382E] font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Pre-Register for Ramadan</span>
              </button>

              <a
                href={`https://wa.me/919566369654?text=${encodeURIComponent('Assalamu Alaikum As-Safar, I would like to inquire about your Ramadan Umrah packages and priority registration.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-5 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Trichy Office</span>
              </a>

              <a
                href={`tel:${BRAND_INFO.phoneTel}`}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C9A24D]" />
                <span className="tabular-nums">+91 95663 69654</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Transparency Disclaimer Banner (Prompt requirement: clear placeholders) */}
      <section className="bg-[#F8F7F3] border-b border-[#E5E5E0] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#C9A24D]/30 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F5F3EE] flex items-center justify-center shrink-0 text-[#0B5D4B]">
              <AlertCircle className="w-5 h-5 text-[#C9A24D]" />
            </div>
            <div className="text-xs sm:text-sm text-[#444444] leading-relaxed">
              <span className="font-bold text-[#202522]">As-Safar Transparency Commitment:</span>{' '}
              Official Ramadan 1447 hotel tariffs and airline flight slots are currently awaiting final seasonal approval by Saudi and civil aviation authorities. Items marked{' '}
              <span className="inline-block bg-[#F5F3EE] px-1.5 py-0.5 rounded font-mono font-bold text-[#0B5D4B] text-[11px] border border-[#E5E5E0]">
                [TBA]
              </span>{' '}
              will be updated with 100% verified specifics as contracts finalize. Pre-registering now secures priority booking privileges.
            </div>
          </div>
        </div>
      </section>

      {/* 3. Ramadan Packages Cards */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F3EE] border border-[#E5E5E0] text-[#0B5D4B] text-xs font-semibold">
              <Moon className="w-3.5 h-3.5 text-[#C9A24D]" />
              <span>Sacred Seasonal Itineraries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#202522]">
              Choose Your Ramadan Itinerary
            </h2>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
              Whether you wish to experience the serene initial fortnight, seek Laylat al-Qadr in the final ten nights, or spend the entire month, we have a curated itinerary for your family.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {RAMADAN_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-3xl border border-[#E5E5E0] bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative"
              >
                {/* Header ribbon / badge */}
                <div className="p-6 pb-4 border-b border-[#F0EFEA] bg-[#FAF9F5]">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${pkg.badgeColor}`}>
                      {pkg.badge}
                    </span>
                    <span className="text-xs font-medium text-[#777777] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#C9A24D]" />
                      {pkg.duration.split('(')[0]}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#202522] leading-snug">
                    {pkg.name}
                  </h3>

                  <p className="text-xs text-[#666666] mt-2 leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Price block */}
                <div className="p-6 py-4 bg-[#F5F3EE]/40 border-b border-[#F0EFEA]">
                  <div className="text-xs text-[#777777] uppercase font-bold tracking-wider">
                    Package Estimate
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-[#0B5D4B] mt-0.5">
                    {pkg.pricing}
                  </div>
                  <div className="text-[11px] text-[#777777] mt-1">
                    {pkg.priceNote}
                  </div>
                </div>

                {/* Key Package Details with Placeholders */}
                <div className="p-6 flex-1 space-y-4 text-xs sm:text-sm">
                  {/* Departure dates */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#777777] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0B5D4B]" />
                      <span>Target Departures</span>
                    </div>
                    <div className="text-[#333333] font-medium bg-[#F8F7F3] p-2.5 rounded-xl border border-[#E5E5E0]">
                      {pkg.departureDates}
                    </div>
                  </div>

                  {/* Accommodation */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#777777] flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-[#0B5D4B]" />
                      <span>Accommodation Details</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="p-2 rounded-lg bg-[#FAF9F5] border border-[#EBE8DF]">
                        <span className="font-bold text-[#202522]">Makkah: </span>
                        <span className="text-[#555555]">{pkg.makkahHotel}</span>
                        <div className="text-[11px] text-[#0B5D4B] font-medium mt-0.5">
                          Proximity: {pkg.makkahDistance}
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#FAF9F5] border border-[#EBE8DF]">
                        <span className="font-bold text-[#202522]">Madinah: </span>
                        <span className="text-[#555555]">{pkg.madinahHotel}</span>
                        <div className="text-[11px] text-[#0B5D4B] font-medium mt-0.5">
                          Proximity: {pkg.madinahDistance}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transport & Meals */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0]">
                      <div className="font-bold text-[#202522] flex items-center gap-1 mb-0.5">
                        <Train className="w-3 h-3 text-[#C9A24D]" />
                        <span>Transport</span>
                      </div>
                      <span className="text-[#555555] text-[11px] leading-tight block">
                        {pkg.transport}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0]">
                      <div className="font-bold text-[#202522] flex items-center gap-1 mb-0.5">
                        <Utensils className="w-3 h-3 text-[#C9A24D]" />
                        <span>Meals</span>
                      </div>
                      <span className="text-[#555555] text-[11px] leading-tight block">
                        {pkg.meals}
                      </span>
                    </div>
                  </div>

                  {/* Inclusions checklist */}
                  <div className="pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#777777] mb-2 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0B5D4B]" />
                      <span>Key Inclusions</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#444444]">
                      {pkg.inclusions.slice(0, 5).map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#0B5D4B] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="p-6 pt-2 border-t border-[#F0EFEA] bg-[#FAF9F5] space-y-2">
                  <button
                    onClick={() => onOpenEnquiry(pkg.id)}
                    className="w-full bg-[#0B5D4B] hover:bg-[#07382E] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#C9A24D]" />
                    <span>Enquire / Book Ramadan Package</span>
                  </button>

                  <a
                    href={`https://wa.me/919566369654?text=${encodeURIComponent(`Assalamu Alaikum As-Safar, I would like to enquire about the ${pkg.name}. Please share priority booking details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white hover:bg-[#F5F3EE] text-[#0B5D4B] border border-[#0B5D4B]/30 font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp Priority Query</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Ramadan Spiritual Experience Pillars */}
      <section className="py-14 sm:py-20 bg-[#F8F7F3] border-y border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#C9A24D] uppercase tracking-wider">
              Spiritual Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202522]">
              Why Perform Ramadan Umrah with As-Safar?
            </h2>
            <p className="text-sm text-[#555555]">
              Navigating the Ramadan crowds requires experienced leadership, reliable logistical support, and caring scholars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-[#E5E5E0] shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3EE] flex items-center justify-center text-[#0B5D4B]">
                <Moon className="w-5 h-5 text-[#C9A24D]" />
              </div>
              <h3 className="font-bold text-base text-[#202522]">Taraweeh & Tahajjud</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Experience Qiyam prayers led by renowned Imams with dedicated meeting points so your family stays connected in the crowds.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E5E5E0] shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3EE] flex items-center justify-center text-[#0B5D4B]">
                <Utensils className="w-5 h-5 text-[#C9A24D]" />
              </div>
              <h3 className="font-bold text-base text-[#202522]">Hygienic Suhoor & Iftar</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Wholesome meals prepared by experienced chefs, tailored for Tamil and Indian pilgrims to preserve energy and wellness throughout fasting.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E5E5E0] shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3EE] flex items-center justify-center text-[#0B5D4B]">
                <Users className="w-5 h-5 text-[#C9A24D]" />
              </div>
              <h3 className="font-bold text-base text-[#202522]">Tamil Scholars on Ground</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Daily interactive spiritual circles explaining Ramadan virtues, Quranic reflections, and personal guidance on Tawaf during peak hours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E5E5E0] shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3EE] flex items-center justify-center text-[#0B5D4B]">
                <HeartHandshake className="w-5 h-5 text-[#C9A24D]" />
              </div>
              <h3 className="font-bold text-base text-[#202522]">Senior Citizen Care</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Wheelchair hiring coordination, licensed porters, and ground managers stationed at the hotel to assist elderly parents with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Ramadan FAQ Accordion */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202522]">
              Ramadan Umrah Questions & Answers
            </h2>
            <p className="text-sm text-[#555555]">
              Essential questions to know before undertaking an Umrah journey during the blessed month.
            </p>
          </div>

          <div className="space-y-3">
            {ramadanFaqs.map((faq, i) => {
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

      {/* 6. As-Safar Contact & Office Details (Prompt requirement: Contact section with existing details) */}
      <section className="py-12 bg-[#07382E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3 text-center lg:text-left">
              <span className="text-xs font-bold text-[#C9A24D] uppercase tracking-wider">
                Direct Consultation in Trichy
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Reserve Your Priority Ramadan Umrah Slot Today
              </h2>
              <p className="text-sm text-[#EAF3EF]/90 max-w-2xl leading-relaxed">
                Visit our Cantonment Trichy office for one-on-one consultation with our pilgrimage counselors. We are located at Tabs Complex, Opposite to Central Bus Stand, Cantonment, Tiruchirappalli.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-[#EAF3EF]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#C9A24D]" />
                  <span>Tabs Complex, Cantonment, Trichy - 620001</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#C9A24D]" />
                  <span>+91 95663 69654 / +91 95663 69655</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href={`https://wa.me/919566369654?text=${encodeURIComponent('Assalamu Alaikum, I would like to visit your Trichy office to discuss Ramadan Umrah packages.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>WhatsApp Our Team</span>
              </a>

              <button
                onClick={() => onNavigate('/contact')}
                className="bg-[#C9A24D] hover:bg-[#B38D3B] text-[#07382E] font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer text-center"
              >
                View Full Office & Maps Details
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
