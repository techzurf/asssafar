import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Compass, 
  Clock, 
  Users, 
  Check, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  ChevronDown, 
  Building, 
  Calendar,
  AlertCircle,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { PageRoute } from '../routes';

interface ZiyarahPageProps {
  onOpenEnquiry: (packageId?: string) => void;
  onNavigate: (route: PageRoute) => void;
}

interface ZiyarahTour {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  subtitle: string;
  duration: string;
  destinations: string[];
  inclusions: string[];
  guidanceDetails: string;
  transportType: string;
  pricing: string;
  priceNote: string;
  availability: string;
}

const ZIYARAH_TOURS: ZiyarahTour[] = [
  {
    id: 'ziyarah-makkah',
    name: 'Sacred Makkah Al-Mukarramah Ziyarat',
    badge: 'Included in Umrah Packages',
    badgeColor: 'bg-[#0B5D4B] text-white',
    subtitle: 'Comprehensive historical journey across the foundational landmarks of Islamic revelation.',
    duration: 'Approx. 4 to 5 Hours (Morning session)',
    destinations: [
      'Jabal al-Noor & Cave of Hira (Ghar Hira) — Site of the first Quranic revelation (Surah Al-Alaq)',
      'Mount Thawr (Ghar Thawr) — Sanctuary of the Prophet ﷺ and Abu Bakr (RA) during the Hijrah',
      'Plain of Arafat & Jabal ar-Rahmah (Mount of Mercy) — Key station of Hajj and Farewell Sermon',
      'Muzdalifah & Mash’ar al-Haram — Night rest stop of Hajj pilgrims',
      'Mina (Tent City, Jamarat pillars, & Masjid al-Khayf)',
      'Jannat al-Mu’alla — Historic cemetery where Sayyidah Khadijah (RA) is laid to rest',
      'Masjid al-Jinn & Masjid ash-Shajarah',
    ],
    inclusions: [
      'Air-conditioned executive luxury coach transfer with panoramic windows',
      'Experienced Tamil-speaking Islamic Scholar narrating authentic historical context',
      'Dedicated stops with adequate time for photographs, reflection, and quiet supplication',
      'Complimentary chilled bottled water and wet wipes for pilgrims',
    ],
    guidanceDetails: 'Led by certified Tamil Aalims who narrate the Seerah events according to authentic Hadith, avoiding unverified superstitions.',
    transportType: 'Modern executive high-deck AC Coach',
    pricing: 'Included with all As-Safar Umrah packages [Private family car quote available on request]',
    priceNote: '*Pilgrims booking customized private packages can opt for private GMC Yukon / Camry.',
    availability: 'Conducted weekly during every scheduled As-Safar group departure',
  },
  {
    id: 'ziyarah-madinah',
    name: 'Madinah Al-Munawwarah Prophetic Heritage Tour',
    badge: 'Prophetic Landmarks',
    badgeColor: 'bg-[#C9A24D] text-[#07382E]',
    subtitle: 'Walk through the illuminated city of the Prophet ﷺ and trace the earliest Islamic state.',
    duration: 'Approx. 4 to 5 Hours (Post-Fajr or Afternoon)',
    destinations: [
      'Masjid Quba — The first mosque built in Islam (Performing 2 rak’ahs carries the reward of Umrah)',
      'Mount Uhud & Shuhada Uhud Cemetery — Resting place of Sayyiduna Hamza (RA) and the 70 martyrs',
      'Archers’ Hill (Jabal al-Rumat) overlooking the Battlefield of Uhud',
      'Masjid al-Qiblatain — Where the direction of prayer was turned towards the Kaaba',
      'The Seven Mosques (Sab’ah Masajid) & Battle of the Trench (Khandaq) perimeter',
      'Authentic High-Grade Madinah Date Palm Garden & Market (Ajwa, Safawi, Sukari)',
      'Historical Wells of Madinah [Subject to municipal preservation access]',
    ],
    inclusions: [
      'Round-trip hotel pickup and return in Madinah',
      'Detailed spiritual discourse in Tamil explaining the trials of the Sahabah',
      'Coordinated group entry to Masjid Quba with ample time for Sunnah prayers',
      'Direct farm-gate access to purchase 100% authentic Madinah Ajwa dates at fair prices',
    ],
    guidanceDetails: 'Includes step-by-step guidance on etiquette (Adab) when visiting the cemetery of Uhud martyrs and sending Salam on the Prophet ﷺ.',
    transportType: 'Mercedes / Yutong Executive AC Coach',
    pricing: 'Included with all As-Safar Umrah packages [Private booking: ₹ [TBA upon vehicle choice]]',
    priceNote: '*Included as standard in Economy, Standard, and Premium packages.',
    availability: 'Scheduled during every As-Safar Madinah stay (Year-round)',
  },
  {
    id: 'ziyarah-badr',
    name: 'Battlefield of Badr Historic Day Expedition',
    badge: 'Special Excursion',
    badgeColor: 'bg-[#07382E] text-white',
    subtitle: 'A profound full-day journey to the site of the decisive confrontation between truth and falsehood.',
    duration: 'Full-Day Excursion (Approx. 8 to 9 Hours total)',
    destinations: [
      'Battlefield of Badr (Ghazwat Badr) — Approx. 150 km southwest of Madinah',
      'Memorial of the 14 Blessed Shuhada (Martyrs) of Badr',
      'Al-Arish Mosque (Site where the Prophet’s ﷺ command tent was erected for heartfelt dua)',
      'Al-Udwah al-Dunya and Al-Udwah al-Quswa geographical battle formations',
      'Historic Wells of Badr & desert oasis landscape',
    ],
    inclusions: [
      'Comfortable highway AC coach travel from Madinah and return',
      'In-depth 2-hour battlefield narration in Tamil with visual maps & diagrams',
      'Wholesome breakfast / lunch refreshment pack with bottled refreshments',
      'Rest stop and prayer breaks at verified clean highway facilities',
    ],
    guidanceDetails: 'Curated by senior Islamic historians who vividly recount the events of the 17th of Ramadan and the divine assistance described in Surah Al-Anfal.',
    transportType: 'Executive Long-Distance Highway Coach',
    pricing: '₹ [Special Excursion Tariff TBA based on group headcount]',
    priceNote: '*Advance reservation required. Subject to minimum passenger confirmation.',
    availability: '[Subject to seasonal scheduling & pre-registration quota]',
  },
  {
    id: 'ziyarah-taif',
    name: 'Taif City of Roses & Prophetic Haven Day Tour',
    badge: 'Mountain Day Trip',
    badgeColor: 'bg-[#8B5A2B] text-white',
    subtitle: 'Ascend the Sarawat Mountains to the city of perseverance, patience, and historic rose gardens.',
    duration: 'Full-Day Trip from Makkah (Approx. 7 to 8 Hours)',
    destinations: [
      'Masjid Abdullah Ibn Abbas (RA) & Islamic library complex',
      'Historical sites where the Prophet ﷺ was granted refuge in the orchard of Addas',
      'Miqat Qarn al-Manazil (As-Sayl al-Kabeer) — Opportunity for pilgrims to don Ihram for a fresh Umrah',
      'Traditional Taif Rose Water, Attar, and Essential Oil distillation factories',
      'Panoramic viewpoints along the scenic Al-Hada mountain road and fruit stalls',
    ],
    inclusions: [
      'Pick-up from your Makkah hotel and return via the scenic mountain highway',
      'Assistance at the Miqat for performing Niyyah and Ihram for pilgrims wishing to perform extra Umrah',
      'Visit to traditional artisan rose distillation facilities with sample tastings',
      'Experienced mountain driver with high safety credentials',
    ],
    guidanceDetails: 'Deeply moving reflection on the patience of Rasulullah ﷺ during the visit to Taif and the lesson of mercy for mankind.',
    transportType: 'Private Coach / Executive Sprinter Van',
    pricing: '₹ [Special Optional Excursion — Tariff TBA on request]',
    priceNote: '*Available as an add-on during your Makkah stay.',
    availability: '[Weekly slots available upon advance request at our Trichy or Makkah office]',
  }
];

export const ZiyarahPage: React.FC<ZiyarahPageProps> = ({
  onOpenEnquiry,
  onNavigate,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const ziyarahFaqs = [
    {
      q: 'Are Makkah and Madinah historical Ziyarat tours included in regular Umrah packages?',
      a: 'Yes! Both the Sacred Makkah Ziyarat and the Madinah Prophetic Heritage tours are fully included without any additional charge in all As-Safar Economy, Standard, and Premium Umrah packages.',
    },
    {
      q: 'Can we arrange private Ziyarah tours for elderly parents or small family groups?',
      a: 'Absolutely. Alongside our scheduled group tours, we arrange private cars (such as Toyota Camry, Innova, or GMC Yukon) with private Tamil-speaking scholar drivers so elderly family members can travel comfortably at their own pace.',
    },
    {
      q: 'How does the scholar guidance work during the Ziyarah trips?',
      a: 'Our scholars carry microphones on board the coaches and speak directly to pilgrims, explaining the Quranic and historical context behind each site in fluent Tamil and Urdu. We strictly follow authentic traditions, ensuring pilgrims gain genuine knowledge.',
    },
    {
      q: 'Can we perform a second Umrah after visiting Miqat during the Taif trip?',
      a: 'Yes. Our Taif day trip specifically includes a scheduled stop at Miqat Qarn al-Manazil (As-Sayl al-Kabeer), which has complete shower, ablution, and Ihram facilities. Pilgrims who wish to perform an additional Umrah for themselves or loved ones can make their intention and wear Ihram here.',
    },
    {
      q: 'Why are specific prices for Badr and Taif marked as [TBA]?',
      a: 'Excursion tariffs for Badr and Taif depend upon the specific vehicle type (private car vs. shared coach) and fuel/highway regulatory tariffs at the time of your travel. In keeping with our strict policy against hidden costs or estimated guesswork, we provide confirmed itemized quotes when you plan your trip dates.',
    },
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#202522]">
      {/* 1. Premium Ziyarah Hero Section */}
      <section className="relative bg-[#07382E] text-white py-16 sm:py-24 overflow-hidden border-b border-[#0B5D4B]/30">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=2000&q=80"
            alt="Historical Mount Uhud and Sacred Pilgrimage Sites"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07382E] via-[#07382E]/90 to-[#07382E]/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-[#C9A24D]/50 text-xs font-bold tracking-wider uppercase text-[#C9A24D]">
              <Compass className="w-3.5 h-3.5 text-[#FFCE1B]" />
              <span>GUIDED ISLAMIC HISTORICAL & SPIRITUAL EXPEDITIONS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Ziyarah Tours
            </h1>

            <p className="text-base sm:text-lg text-[#EAF3EF]/90 leading-relaxed max-w-2xl">
              Walk in the blessed footsteps of Rasulullah ﷺ and the Sahabah. Our guided Ziyarah tours bring Islamic history vividly to life through authentic scholarship, comfortable transport, and profound spiritual reflection.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenEnquiry('ziyarah-makkah')}
                className="bg-[#C9A24D] hover:bg-[#B38D3B] text-[#07382E] font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Enquire for Ziyarah Tours</span>
              </button>

              <a
                href={`https://wa.me/919566369654?text=${encodeURIComponent('Assalamu Alaikum As-Safar, I would like to inquire about guided Ziyarah tours in Makkah, Madinah, Badr, and Taif.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-5 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Our Historians</span>
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

      {/* 2. Transparency Disclaimer Banner */}
      <section className="bg-[#F8F7F3] border-b border-[#E5E5E0] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#C9A24D]/30 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F5F3EE] flex items-center justify-center shrink-0 text-[#0B5D4B]">
              <AlertCircle className="w-5 h-5 text-[#C9A24D]" />
            </div>
            <div className="text-xs sm:text-sm text-[#444444] leading-relaxed">
              <span className="font-bold text-[#202522]">Tour Customization & Integrity Notice:</span>{' '}
              Standard Makkah and Madinah historical visits are completely included in our monthly Umrah packages. Optional out-of-city excursions (Badr, Taif, and private customized car tours) marked{' '}
              <span className="inline-block bg-[#F5F3EE] px-1.5 py-0.5 rounded font-mono font-bold text-[#0B5D4B] text-[11px] border border-[#E5E5E0]">
                [TBA]
              </span>{' '}
              are priced transparently based on your family’s vehicle selection and seasonal fuel permits.
            </div>
          </div>
        </div>
      </section>

      {/* 3. Available Ziyarah Tours Section (Attractive cards with editable fields) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F3EE] border border-[#E5E5E0] text-[#0B5D4B] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24D]" />
              <span>Available Guided Itineraries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#202522]">
              Guided Ziyarah Tour Packages
            </h2>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
              Every tour is thoughtfully paced for the comfort of elderly parents and families, led by scholars who speak your mother tongue and treat sacred heritage with utmost respect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {ZIYARAH_TOURS.map((tour) => (
              <div
                key={tour.id}
                className="rounded-3xl border border-[#E5E5E0] bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Tour Card Header */}
                <div className="p-6 border-b border-[#F0EFEA] bg-[#FAF9F5]">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${tour.badgeColor}`}>
                      {tour.badge}
                    </span>
                    <span className="text-xs font-medium text-[#777777] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#C9A24D]" />
                      {tour.duration.split('(')[0]}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#202522] leading-snug">
                    {tour.name}
                  </h3>

                  <p className="text-xs text-[#666666] mt-2 leading-relaxed">
                    {tour.subtitle}
                  </p>
                </div>

                {/* Tour Key Attributes & Pricing */}
                <div className="p-6 py-4 bg-[#F5F3EE]/40 border-b border-[#F0EFEA] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] text-[#777777] font-bold uppercase tracking-wider block">
                      Tour Pricing
                    </span>
                    <span className="font-bold text-[#0B5D4B] text-sm mt-0.5 block">
                      {tour.pricing}
                    </span>
                    <span className="text-[10px] text-[#777777]">{tour.priceNote}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#777777] font-bold uppercase tracking-wider block">
                      Schedule & Availability
                    </span>
                    <span className="font-medium text-[#333333] text-xs mt-0.5 block">
                      {tour.availability}
                    </span>
                  </div>
                </div>

                {/* Tour Body: Destinations & Inclusions */}
                <div className="p-6 flex-1 space-y-5 text-xs sm:text-sm">
                  {/* Destinations Checklist */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#777777] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0B5D4B]" />
                      <span>Destinations Covered</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#333333]">
                      {tour.destinations.map((dest, i) => (
                        <li key={i} className="flex items-start gap-2 bg-[#F8F7F3] p-2 rounded-lg border border-[#EBE8DF]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D] mt-1.5 shrink-0" />
                          <span className="leading-snug">{dest}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Transport & Guidance */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#EBE8DF]">
                      <span className="font-bold text-[#202522] block mb-0.5 flex items-center gap-1">
                        <Building className="w-3 h-3 text-[#C9A24D]" />
                        <span>Transport Fleet</span>
                      </span>
                      <span className="text-[#555555] text-[11px] leading-tight block">
                        {tour.transportType}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#EBE8DF]">
                      <span className="font-bold text-[#202522] block mb-0.5 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-[#C9A24D]" />
                        <span>Scholar Guidance</span>
                      </span>
                      <span className="text-[#555555] text-[11px] leading-tight block">
                        Tamil-speaking scholar narration
                      </span>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="pt-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#777777] mb-2 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0B5D4B]" />
                      <span>Tour Inclusions</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#444444]">
                      {tour.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#0B5D4B] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-2 border-t border-[#F0EFEA] bg-[#FAF9F5] space-y-2">
                  <button
                    onClick={() => onOpenEnquiry(tour.id)}
                    className="w-full bg-[#0B5D4B] hover:bg-[#07382E] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-[#C9A24D]" />
                    <span>Enquire / Book This Ziyarah Tour</span>
                  </button>

                  <a
                    href={`https://wa.me/919566369654?text=${encodeURIComponent(`Assalamu Alaikum As-Safar, I would like to enquire about booking the ${tour.name}. Please provide details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white hover:bg-[#F5F3EE] text-[#0B5D4B] border border-[#0B5D4B]/30 font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp Inquiry for Tour</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Etiquette & Authentic Hadith Educational Section */}
      <section className="py-14 sm:py-20 bg-[#F8F7F3] border-y border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#C9A24D] uppercase tracking-wider">
              Authentic Sunnah Etiquette
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202522]">
              The Spirit of Islamic Ziyarat
            </h2>
            <p className="text-sm text-[#555555]">
              Visiting Islamic historical sites is an act of spiritual contemplation, learning lessons from history, and sending blessings upon the Prophet ﷺ and his companions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E5E5E0] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3EE] flex items-center justify-center text-[#0B5D4B]">
                <BookOpen className="w-5 h-5 text-[#C9A24D]" />
              </div>
              <h3 className="font-bold text-base text-[#202522]">Authentic Historical Accounts</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Our scholarly guides share historical narratives substantiated by the Qur'an and authentic Sunnah, ensuring your family gains reliable knowledge free of baseless myths.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E5E0] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3EE] flex items-center justify-center text-[#0B5D4B]">
                <Clock className="w-5 h-5 text-[#C9A24D]" />
              </div>
              <h3 className="font-bold text-base text-[#202522]">Comfortable & Relaxed Pacing</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                We avoid rushed schedules. Adequate time is allocated at Masjid Quba for two rak'ahs of prayer and at Mount Uhud for peaceful reflection and respectful greetings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E5E0] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3EE] flex items-center justify-center text-[#0B5D4B]">
                <Users className="w-5 h-5 text-[#C9A24D]" />
              </div>
              <h3 className="font-bold text-base text-[#202522]">Mother-Tongue Scholarly Care</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Clear explanations in Tamil and Urdu allow pilgrims of all age groups to connect emotionally with the struggle and sacrifice of the early Muslims.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Ziyarah FAQ Accordion */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202522]">
              Ziyarah Tours Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#555555]">
              Clear answers to help you prepare for historical excursions during your pilgrimage.
            </p>
          </div>

          <div className="space-y-3">
            {ziyarahFaqs.map((faq, i) => {
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

      {/* 6. As-Safar Contact & Consultation Banner */}
      <section className="py-12 bg-[#07382E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3 text-center lg:text-left">
              <span className="text-xs font-bold text-[#C9A24D] uppercase tracking-wider">
                Personalized Tour Planning
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Book a Tailored Ziyarah Itinerary for Your Group
              </h2>
              <p className="text-sm text-[#EAF3EF]/90 max-w-2xl leading-relaxed">
                Whether you are joining an existing Umrah group departure or seeking a private chauffeur-driven Ziyarah across Saudi Arabia, contact our Trichy office for tailored arrangements.
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
                href={`https://wa.me/919566369654?text=${encodeURIComponent('Assalamu Alaikum As-Safar, I would like to arrange a custom Ziyarah tour for my family.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>WhatsApp Our Office</span>
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
