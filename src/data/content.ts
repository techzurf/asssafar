import { JourneyStep, ServiceItem, TestimonialItem, FaqItem, GalleryItem } from '../types';

export const BRAND_INFO = {
  name: 'As-Safar',
  logoUrl: 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791871239/As_Safar_Hajj_Umrah_Logo_o40jeg.png',
  footerLogoUrl: 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791872342/As_Safar_Hajj_Umrah_Emblem_uvc2xh.png',
  tagline: 'Your Sacred Journey to the House of Allah Begins Here',
  description: 'Experience a comfortable, guided and spiritually enriching Umrah journey with As-Safar.',
  phone: '+91 95663 69654',
  phoneFormatted: '+91 95663 69654',
  phoneTel: '+919566369654',
  whatsappMessage: 'Assalamu Alaikum, I would like to know more about As-Safar Umrah packages.',
  addressLine1: 'No.41, First Floor, Tabs Complex',
  addressLine2: 'Opposite Child Jesus Hospital, Bharathidasan Salai',
  area: 'Cantonment',
  city: 'Trichy',
  pincode: '620001',
  state: 'Tamil Nadu',
  country: 'India',
  fullAddress: 'No.41, First Floor, Tabs Complex, Opposite Child Jesus Hospital, Bharathidasan Salai, Cantonment, Trichy – 620001, Tamil Nadu, India',
  mapsUrl: 'https://maps.google.com/?q=Tabs+Complex+Bharathidasan+Salai+Cantonment+Trichy+620001',
  workingHours: 'Monday – Saturday: 9:30 AM – 8:30 PM (Sunday by appointment)',
  trustBadge: 'Trusted Umrah Travel Assistance from Trichy',
  yearsExperience: '15+ Years',
  pilgrimsServed: '12,500+',
  satisfactionRate: '99.4%',
};

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: '01',
    title: 'Consultation',
    subtitle: 'Discuss your requirements',
    description: 'Visit our Cantonment office in Trichy or speak with our pilgrimage counselors. We understand your family composition, elderly care needs, travel schedule, and budget preferences.',
    highlights: ['One-on-one session', 'Family & elderly needs assessment', 'Transparent breakdown']
  },
  {
    step: '02',
    title: 'Package Selection',
    subtitle: 'Choose the right package',
    description: 'Select between Economy, Standard, Premium, or Royal VIP tiers with transparent details on hotel proximity, flight schedules, and meals so there are never any unpleasant surprises.',
    highlights: ['Distance-to-Haram transparency', 'Fixed vs customized dates', 'Clear pricing with zero hidden costs']
  },
  {
    step: '03',
    title: 'Documentation',
    subtitle: 'Complete visa & travel documentation',
    description: 'We handle your entire electronic Umrah / tourist visa processing, Saudi approved medical insurance, airline ticketing, Nusuk app registration, and biometric compliance effortlessly.',
    highlights: ['Express e-Visa issuance', 'Mandatory health cover included', 'Passport safe custody & tracking']
  },
  {
    step: '04',
    title: 'Pre-Departure Guidance',
    subtitle: 'Receive important travel & Umrah guidance',
    description: 'Attend our comprehensive practical seminar in Trichy. Our Islamic scholars explain Ihram rules, Tawaf methods, Duas, and logistical tips with live practical demonstrations.',
    highlights: ['Live Ihram demonstration', 'Step-by-step guidebook in Tamil & English', 'Complimentary luggage & travel kit']
  },
  {
    step: '05',
    title: 'Journey to Makkah',
    subtitle: 'Begin your sacred journey',
    description: 'Fly with leading airlines from Trichy or Chennai. Our dedicated airport team assists with departure, and our Saudi team warmly welcomes you at Jeddah/Madinah airport with executive AC transport.',
    highlights: ['Trichy airport ground assistance', 'Warm meet & greet in Saudi Arabia', 'Comfortable AC transit to hotel']
  },
  {
    step: '06',
    title: 'Umrah Experience',
    subtitle: 'Perform Umrah with confidence & support',
    description: 'Perform your first Umrah under the direct, reassuring guidance of our experienced scholar. With audio receivers and hands-on assistance for elders, focus purely on your spiritual devotion.',
    highlights: ['Scholar-guided first Umrah', 'Elderly & wheelchair support', 'Scheduled historical Ziyarat tours']
  },
  {
    step: '07',
    title: 'Return',
    subtitle: 'Complete your journey & return home safely',
    description: 'After peaceful visits to Rawdah ash-Sharifah in Madinah and farewell Tawaf, we ensure smooth airport transit, 5 Litres packed Zamzam cans for each pilgrim, and safe return to Trichy.',
    highlights: ['5 Litres certified Zamzam water', 'Hassle-free baggage assistance', 'Cherished memories of a lifetime']
  }
];

export const WHY_AS_SAFAR = [
  {
    title: 'Experienced Guidance',
    shortTitle: 'Guidance',
    description: 'Professional assistance throughout your journey led by experienced scholars and multilingual coordinators who ensure every ritual conforms to the Sunnah.',
    icon: 'Compass',
  },
  {
    title: 'Complete Travel Support',
    shortTitle: 'Full Support',
    description: 'Support from preparation to return. We guide you from document submission in Trichy to hotel check-in in Makkah and your safe arrival back home.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Comfortable Accommodation',
    shortTitle: 'Prime Hotels',
    description: 'Carefully selected accommodation options within direct walking distance of Masjid al-Haram and Masjid an-Nabawi, preventing fatigue for elders and children.',
    icon: 'Building2',
  },
  {
    title: 'Reliable Transportation',
    shortTitle: 'Clean Transit',
    description: 'Comfortable transportation arrangements including modern air-conditioned luxury buses and high-speed Haramain Bullet Train options for swift intercity travel.',
    icon: 'Bus',
  },
  {
    title: 'Dedicated Assistance',
    shortTitle: '24/7 Care',
    description: 'Personal support whenever you need it. Our local tour managers are stationed in your hotel lobby to assist with meals, health needs, and questions anytime.',
    icon: 'HeartHandshake',
  },
  {
    title: 'Spiritual Experience',
    shortTitle: 'Peace of Mind',
    description: 'Focus on making your pilgrimage peaceful and meaningful. We manage the logistics so your heart and mind remain devoted exclusively to Ibadah.',
    icon: 'Sparkles',
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'visa',
    title: 'Umrah Visa Assistance',
    description: 'Fast, reliable electronic visa processing with verified Saudi health insurance and quick approvals for families and individuals.',
    badge: 'Official Handling',
    iconName: 'FileCheck'
  },
  {
    id: 'flights',
    title: 'Flight Assistance',
    description: 'Convenient connections from Tiruchirappalli International Airport (TRZ), Chennai, and Bangalore with top-rated international airlines.',
    badge: 'Direct & Transit Options',
    iconName: 'Plane'
  },
  {
    id: 'hotels',
    title: 'Hotel Booking',
    description: 'Curated 3-star, 4-star, and 5-star properties situated within steps of the Kaaba and Prophet’s Mosque courtyard gates.',
    badge: 'Walking Distance',
    iconName: 'Building'
  },
  {
    id: 'transport',
    title: 'Transportation',
    description: 'Executive air-conditioned coaches, high-speed Haramain train tickets, and private VIP GMC luxury vehicles for seamless travel.',
    badge: 'Air-Conditioned Comfort',
    iconName: 'Car'
  },
  {
    id: 'ziyarat',
    title: 'Historical Ziyarat',
    description: 'Guided educational visits to Cave of Hira, Ghar Thawr, Jabal al-Noor, Mount Uhud, Masjid Quba, Masjid Qiblatain, and the Date Market.',
    badge: 'Guided Tours',
    iconName: 'MapPin'
  },
  {
    id: 'guidance',
    title: 'Travel Guidance',
    description: 'Experienced Tamil, English, and Urdu speaking religious scholars guiding every step of Ihram, Tawaf, Sa’ee, and Duas.',
    badge: 'Authentic Sunnah',
    iconName: 'BookOpen'
  },
  {
    id: 'documentation',
    title: 'Documentation Support',
    description: 'Hassle-free passport clearance, Nusuk app slot appointments, biometrics guidance, and currency exchange advisory.',
    badge: 'End-to-End Paperwork',
    iconName: 'ClipboardList'
  },
  {
    id: 'group',
    title: 'Group Umrah',
    description: 'Well-organized monthly group departures accompanied by senior As-Safar tour directors from Trichy for maximum camaraderie.',
    badge: 'Monthly Departures',
    iconName: 'Users'
  },
  {
    id: 'family',
    title: 'Family Umrah',
    description: 'Tailored private rooms, child-friendly dining, customized itineraries, and stress-free pacing for multi-generational families.',
    badge: 'Private Rooms',
    iconName: 'Home'
  },
  {
    id: 'seniors',
    title: 'Senior Citizen Assistance',
    description: 'Wheelchair porters, priority hotel elevators, ground floor room requests, and dedicated volunteers to care for elderly pilgrims.',
    badge: 'Gentle Care',
    iconName: 'HeartHandshake'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Janab A. Mohamed Farook',
    location: 'Cantonment, Trichy',
    packageTaken: 'Premium Umrah Experience',
    rating: 5,
    date: 'February 2026',
    quote: 'Alhamdulillah, traveling with As-Safar was an unforgettable blessing for our family. The hotel in Makkah was right in front of the Haram courtyard—my elderly mother could walk to every prayer without any difficulty. The scholar guided our Tawaf so gently and patiently. Highly recommend As-Safar for all Trichy residents!'
  },
  {
    id: '2',
    name: 'Dr. S. Kalandar Naina',
    location: 'KK Nagar, Trichy',
    packageTaken: 'Standard Umrah Package',
    rating: 5,
    date: 'January 2026',
    quote: 'The pre-departure training held in their Tabs Complex office prepared us thoroughly. Once we landed in Jeddah, everything ran like clockwork. The South Indian meals tasted like home, the hotels were spotless, and our 2-hour Haramain train trip to Madinah was exceptionally comfortable.'
  },
  {
    id: '3',
    name: 'Haji R. Syed Ibrahim',
    location: 'Thanjavur, Tamil Nadu',
    packageTaken: 'Exclusive VIP Royal Umrah',
    rating: 5,
    date: 'December 2025',
    quote: 'As-Safar took care of every minute detail with utmost sincerity and professionalism. Private GMC transfers, personalized scholar guidance for our family, and immediate Rawdah permits in Madinah. Their honesty and commitment to pilgrim welfare is truly commendable.'
  },
  {
    id: '4',
    name: 'Mrs. Rahila Begum & Family',
    location: 'Pudukkottai',
    packageTaken: 'Economy Umrah Package',
    rating: 5,
    date: 'November 2025',
    quote: 'Even under the Economy package, As-Safar never compromised on quality or care. The hotel was genuinely walking distance, the bus was clean and cool, and their tour leaders were always smiling and ready to help. May Allah reward the As-Safar team in Trichy.'
  }
];

export const FAQS: FaqItem[] = [
  {
    category: 'Documentation',
    question: 'What documents are required for Umrah?',
    answer: 'You will need an original passport with at least 6 months validity from the travel date, 2 passport-size photographs with white background, and a copy of your Aadhaar card. For children, a birth certificate is required. Our Trichy team handles the electronic visa application and health insurance paperwork entirely.'
  },
  {
    category: 'Booking',
    question: 'How early should I book my Umrah package?',
    answer: 'We recommend booking 4 to 8 weeks in advance to secure preferred hotel rooms close to the Haram and the most convenient flight slots from Trichy or Chennai. For peak seasons such as Ramadan or school vacations, booking 2 to 3 months early is strongly advised.'
  },
  {
    category: 'Visas',
    question: 'Do you provide visa assistance?',
    answer: 'Yes, full visa assistance is included in every As-Safar package. We issue official Saudi Tourist or Umrah electronic visas along with approved comprehensive medical insurance. Our team guides you through the quick digital process with zero hassle.'
  },
  {
    category: 'Flights',
    question: 'Are flights included in the package?',
    answer: 'Yes, all our standard and premium all-inclusive packages include return flight tickets departing from Tiruchirappalli (TRZ) or Chennai (MAA). If you already hold airline miles or prefer to book your own tickets, we also offer land-only package options.'
  },
  {
    category: 'Transport',
    question: 'Do you provide transportation in Saudi Arabia?',
    answer: 'Yes, we provide luxury air-conditioned coaches for all airport transfers, city transits between Makkah and Madinah, and guided historical Ziyarat tours. In our premium packages, we also provide the high-speed Haramain Bullet Train which connects Makkah and Madinah in just over 2 hours.'
  },
  {
    category: 'Families',
    question: 'Can families travel together in private rooms?',
    answer: 'Absolutely. We provide flexible accommodation choices including Quad (4 sharing), Triple (3 sharing), Double/Twin (2 sharing), and single private family rooms. We ensure your family stays together on the same hotel floor wherever possible.'
  },
  {
    category: 'Seniors',
    question: 'Do you provide assistance for senior citizens?',
    answer: 'Senior citizen comfort is our utmost priority. We select hotels with minimal walking distance, assist with wheelchair rentals and porters in the Haram, provide ground-floor or elevator-accessible rooms, and our group leaders personally look after our elderly pilgrims during Tawaf and Sa’ee.'
  },
  {
    category: 'Language',
    question: 'What languages do your tour scholars speak?',
    answer: 'Our tour guides and Aalims (scholars) are fluent in Tamil, English, Urdu, and Arabic. All ritual guidance, Duas, and pre-departure orientations in Trichy are delivered clearly in Tamil so every pilgrim feels completely confident and understood.'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'as-safar-haram-group',
    title: 'As-Safar Pilgrim Group at Masjid al-Haram',
    category: 'makkah',
    caption: 'Grand Mosque Colonnades, Makkah',
    accentText: 'Sacred Umrah Milestone',
    description: 'Multi-generational As-Safar pilgrims and families gathered peacefully inside the magnificent colonnades of Masjid al-Haram after completing their Tawaf and Sa’ee under experienced scholar guidance.',
    imageUrl: 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890285/a68a756c-837e-452e-8d4a-f23b8905acc0_gsurq2.jpg',
  },
  {
    id: 'as-safar-quba-group',
    title: 'Pilgrim Gathering at Masjid Quba',
    category: 'madinah',
    caption: 'Masjid Quba Courtyard, Madinah',
    accentText: 'First Mosque in Islam',
    description: 'As-Safar pilgrims visiting the historic Masjid Quba in Madinah during scheduled Ziyarat, following the Sunnah of prayer in the very first mosque established by the Prophet ﷺ.',
    imageUrl: 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890286/WhatsApp_Image_2026-10-11_at_10.49.16_j3kl8g.jpg',
  },
  {
    id: 'as-safar-coaches-group',
    title: 'Pilgrim Group & Executive Coaches',
    category: 'journey',
    caption: 'Guided Group Transit & Historical Ziyarat',
    accentText: 'Executive AC Fleet',
    description: 'Our pilgrim contingent gathered alongside modern air-conditioned executive coaches, ensuring smooth, comfortable group transit and educational Ziyarat across holy sites.',
    imageUrl: 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890288/ac2439e2-06e6-4b89-ae6d-36b2842b4a99_wlsqo7.jpg',
  },
  {
    id: 'as-safar-orientation-2025',
    title: 'Official Umrah Orientation Program',
    category: 'journey',
    caption: 'AS SAFAR Pre-Departure Seminar, Trichy',
    accentText: 'Certified Scholar Guidance',
    description: 'Formal pre-departure ceremony and Umrah training program conducted by As-Safar scholars and directors to equip pilgrims with step-by-step guidance and travel materials.',
    imageUrl: 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890284/ae8d541e-c268-4adc-b50b-dfd10a20646d_vlgs4q.jpg',
  },
  {
    id: 'as-safar-training-seminar',
    title: 'Pre-Departure Pilgrimage Training Class',
    category: 'journey',
    caption: 'Interactive Ritual Coaching Session',
    accentText: 'Practical Demonstration',
    description: 'Pilgrims participating in interactive coaching sessions and Ihram demonstrations held at our Trichy center before embarking on their journey.',
    imageUrl: 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890288/7100a12e-c436-4d36-aeef-1f8a897a5ff4_mqvftr.jpg',
  },
  {
    id: 'as-safar-airport-departure',
    title: 'Pilgrim Departure & Collective Dua',
    category: 'journey',
    caption: 'Airport Departure Terminal, Trichy',
    accentText: 'Sacred Departure Talbiyah',
    description: 'As-Safar pilgrim group offering collective Dua and recitation of the Talbiyah at the airport terminal prior to departure for Jeddah.',
    imageUrl: 'https://res.cloudinary.com/ddeivqykl/image/upload/v1791890284/ff1d2ed2-4de6-4830-a2c2-b8cab80b59ee_logs6g.jpg',
  }
];
