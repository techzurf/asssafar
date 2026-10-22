import { AnnouncementConfigState, AdminPackageItem, AdminActivityLog } from '../types/adminTypes';
import { NEXT_GROUP_DEPARTURE_CONFIG } from '../../data/announcementData';

/**
 * Initial Announcement Bar State (Mock Data - Phase 1)
 * Synced with public announcement defaults.
 */
export const INITIAL_ANNOUNCEMENT_STATE: AnnouncementConfigState = {
  isActive: NEXT_GROUP_DEPARTURE_CONFIG.isActive,
  prefixBadge: NEXT_GROUP_DEPARTURE_CONFIG.prefixBadge || 'NEXT UMRAH GROUP DEPARTURE',
  announcementText: 'Direct Flight Trichy to Jeddah · 15 Days Guided Pilgrimage with South Indian Catering',
  departureDate: '12 November 2026',
  departureTime: '04:30 AM IST',
  contactNumber: NEXT_GROUP_DEPARTURE_CONFIG.contactNumber || '+91 95663 69654',
  contactTel: NEXT_GROUP_DEPARTURE_CONFIG.contactTel || '+919566369654',
  lastUpdated: 'Today at 09:15 AM',
};

/**
 * Initial Umrah Packages (Mock Data - Phase 1)
 * Covers the 3 required categories: Economy, Standard, Premium.
 */
export const INITIAL_ADMIN_PACKAGES: AdminPackageItem[] = [
  {
    id: 'pkg-economy-01',
    name: 'Economy Umrah Package',
    category: 'economy',
    price: '₹84,500',
    duration: '14 Days (7 Makkah + 7 Madinah)',
    shortDescription: 'Affordable comfort with verified 3-star hotels within walking distance and full scholar ritual guidance.',
    makkahHotel: 'Dar Al Eiman Al Khalil / Equivalent (3★, ~550m to Haram courtyard)',
    madinahHotel: 'Al Eiman Taibah / Equivalent (3★, ~350m to Prophet Mosque courtyard)',
    transport: 'Air-conditioned luxury group coach with experienced bilingual drivers',
    meals: '3 South Indian buffet meals daily prepared fresh by Tamil culinary chefs',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80',
    updatedAt: 'Yesterday at 04:30 PM',
  },
  {
    id: 'pkg-standard-02',
    name: 'Standard Umrah Package',
    category: 'standard',
    price: '₹1,08,000',
    duration: '15 Days (8 Makkah + 7 Madinah)',
    shortDescription: 'Closer hotel perimeter, superior 4-star comfort, 24/7 shuttle service, and dedicated scholar accompaniment.',
    makkahHotel: 'Al Kiswah Towers / Elaf Bakkah (4★, ~300m / 24-7 private shuttle)',
    madinahHotel: 'Saja Al Madinah / Golden Tulip (4★, ~200m from Ladies & Gents gates)',
    transport: 'Modern Mercedes / Yutong high-deck executive AC coaches',
    meals: 'Full-board multi-cuisine buffet (South Indian, North Indian, Arabic, Tea/Coffee)',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80',
    updatedAt: '2 days ago at 11:15 AM',
  },
  {
    id: 'pkg-premium-03',
    name: 'Premium Umrah Experience',
    category: 'premium',
    price: '₹1,48,500',
    duration: '15 Days (8 Makkah + 7 Madinah)',
    shortDescription: '5-Star luxury steps away from the Kaaba, Haramain high-speed bullet train, and VIP ground assistance.',
    makkahHotel: 'Makkah Clock Royal Tower (Fairmont) / Swissôtel (5★, Zero metres / Direct Haram lift)',
    madinahHotel: 'Dar Al Taqwa / Pullman Zamzam Madinah (5★, Front row facing main gates)',
    transport: 'Haramain High-Speed Bullet Train (Business Class) + Private VIP Coach',
    meals: 'Lavish international 5-star hotel buffet with live cooking stations & Tamil cuisine',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80',
    updatedAt: '3 days ago at 02:20 PM',
  },
  {
    id: 'pkg-economy-draft',
    name: 'Early Bird Ramadan Economy Preview',
    category: 'economy',
    price: '₹95,000',
    duration: '15 Days (First Half Ramadan)',
    shortDescription: 'Preliminary Ramadan itinerary draft with quad-sharing and pre-arranged Suhoor & Iftar arrangements.',
    makkahHotel: 'Al Hijra Towers / Equivalent (3★, Shuttled)',
    madinahHotel: 'Elaf Taiba / Equivalent (3★, ~400m)',
    transport: 'Scheduled AC coach group transfers',
    meals: 'Complete Suhoor & Iftar dining packages with South Indian dishes',
    status: 'inactive',
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80',
    updatedAt: '1 week ago',
  },
];

/**
 * Initial activity log for Dashboard
 */
export const INITIAL_ACTIVITY_LOGS: AdminActivityLog[] = [
  {
    id: 'act-1',
    action: 'Announcement Schedule Updated',
    target: 'Departure set for 12 Nov 2026',
    timestamp: 'Today, 09:15 AM',
    type: 'announcement',
  },
  {
    id: 'act-2',
    action: 'Package Activated',
    target: 'Premium Umrah Experience',
    timestamp: 'Yesterday, 04:30 PM',
    type: 'package',
  },
  {
    id: 'act-3',
    action: 'Hotel Details Revised',
    target: 'Standard Umrah Package',
    timestamp: '2 days ago',
    type: 'package',
  },
  {
    id: 'act-4',
    action: 'New Draft Created',
    target: 'Early Bird Ramadan Economy Preview',
    timestamp: '1 week ago',
    type: 'package',
  },
];
