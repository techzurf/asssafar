/**
 * Centralized Client-Side Routing for As-Safar Multi-Page Website
 * Supports browser history (pushState / popstate), bookmarking, refresh, and internal links.
 */

export type PageRoute = 
  | '/'
  | '/monthly-umrah'
  | '/umrah-packages'
  | '/ramadan-umrah'
  | '/ziyarah'
  | '/hajj-2027'
  | '/about-us'
  | '/gallery'
  | '/faq'
  | '/contact'
  | '/admin'
  | '/admin/login';

export interface RouteInfo {
  path: PageRoute;
  title: string;
  metaDescription: string;
  label: string;
}

export const ROUTES: Record<string, RouteInfo> = {
  home: {
    path: '/',
    label: 'Home',
    title: 'As-Safar | Premium Umrah & Hajj Travel Agency Trichy',
    metaDescription: 'Experience a comfortable, guided, and spiritually enriching Umrah and Hajj journey with As-Safar. Located in Cantonment, Trichy, Tamil Nadu. Call +91 95663 69654.',
  },
  admin: {
    path: '/admin',
    label: 'Admin Dashboard',
    title: 'As-Safar Admin Dashboard | Management Portal',
    metaDescription: 'As-Safar internal administration portal for announcement bar and Umrah package management.',
  },
  adminLogin: {
    path: '/admin/login',
    label: 'Admin Sign In',
    title: 'As-Safar Admin Sign In | Management Portal',
    metaDescription: 'Sign in to As-Safar administrator management portal.',
  },
  monthlyUmrah: {
    path: '/monthly-umrah',
    label: 'Monthly Umrah',
    title: 'Monthly Umrah Packages 2026/2027 | Economy, Standard & Premium | As-Safar Trichy',
    metaDescription: 'Explore authentic monthly Umrah packages with verified hotel proximity, Tamil scholars, South Indian dining, and seamless Makkah & Madinah travel from Trichy & Chennai.',
  },
  packages: {
    path: '/umrah-packages',
    label: 'Monthly Umrah',
    title: 'Monthly Umrah Packages 2026/2027 | Economy, Standard & Premium | As-Safar Trichy',
    metaDescription: 'Explore authentic monthly Umrah packages with verified hotel proximity, Tamil scholars, South Indian dining, and seamless Makkah & Madinah travel from Trichy & Chennai.',
  },
  ramadanUmrah: {
    path: '/ramadan-umrah',
    label: 'Ramadan Umrah',
    title: 'Ramadan Umrah Packages 2026 | Sacred Season in Makkah & Madinah | As-Safar Trichy',
    metaDescription: 'Experience the blessed month of Ramadan in Makkah and Madinah with As-Safar. Taraweeh, Suhoor, Iftar, verified hotels, and dedicated scholar guidance from Trichy.',
  },
  ziyarah: {
    path: '/ziyarah',
    label: 'Ziyarah Tours',
    title: 'Ziyarah Tours | Guided Islamic Historical Visits in Makkah & Madinah | As-Safar',
    metaDescription: 'Guided visits to sacred Islamic historical sites in Makkah, Madinah, Badr, and Taif with knowledgeable Tamil-speaking scholars. Comfortable AC coach travel.',
  },
  hajj: {
    path: '/hajj-2027',
    label: 'Hajj 2027',
    title: 'Prepare for Hajj 2027 | Advance Registration & Guidance | As-Safar',
    metaDescription: 'Advance registration and complete guidance for Hajj 2027 with As-Safar. Nusuk platform assistance, documentation, pre-Hajj seminars in Trichy, and Mina-Arafat ground support.',
  },
  about: {
    path: '/about-us',
    label: 'About Us',
    title: 'About As-Safar | Trusted Umrah & Hajj Services & FAQ | Trichy, Tamil Nadu',
    metaDescription: 'Learn about As-Safar Hajj & Umrah Tours & Travels and find answers to frequently asked questions on packages, visas, hotels, and senior citizen guidance.',
  },
  gallery: {
    path: '/gallery',
    label: 'Gallery',
    title: 'As-Safar Gallery | Umrah & Hajj Pilgrimage Photos & Moments | Trichy',
    metaDescription: 'Explore authentic photos from As-Safar Umrah and Hajj journeys. View pilgrim group gatherings, Makkah al-Mukarramah, Madinah al-Munawwarah, and Ziyarah landmarks.',
  },
  faq: {
    path: '/faq',
    label: 'FAQ',
    title: 'Frequently Asked Questions (FAQ) | As-Safar Umrah & Hajj Guidance',
    metaDescription: 'Find clear answers to questions on Umrah packages, Hajj 2027, Saudi visas, documentation, flights, hotels, senior citizen care, and booking procedures.',
  },
  contact: {
    path: '/contact',
    label: 'Contact',
    title: 'Contact As-Safar | Cantonment Office Trichy | Phone, WhatsApp & Directions',
    metaDescription: 'Visit As-Safar at Tabs Complex, Cantonment, Trichy or call +91 95663 69654. View Google Maps directions, consultation hours, and send your pilgrimage enquiry.',
  },
};

/**
 * Normalizes pathname from window.location.pathname
 */
export function normalizePathname(pathname: string): PageRoute {
  // Strip trailing slashes except for root
  const cleaned = pathname.replace(/\/+$/, '') || '/';
  
  if (cleaned === '/monthly-umrah' || cleaned === '/umrah-packages' || cleaned === '/packages' || cleaned === '/monthly') {
    return '/monthly-umrah';
  }
  if (cleaned === '/ramadan-umrah' || cleaned === '/ramadan' || cleaned === '/ramzan') {
    return '/ramadan-umrah';
  }
  if (cleaned === '/ziyarah' || cleaned === '/ziyarat' || cleaned === '/ziyara') {
    return '/ziyarah';
  }
  if (cleaned === '/hajj-2027' || cleaned === '/hajj') {
    return '/hajj-2027';
  }
  if (cleaned === '/about-us' || cleaned === '/about') {
    return '/about-us';
  }
  if (cleaned === '/gallery' || cleaned === '/photos' || cleaned === '/photo-gallery') {
    return '/gallery';
  }
  if (cleaned === '/faq' || cleaned === '/faqs') {
    return '/faq';
  }
  if (cleaned === '/admin/login' || cleaned === '/admin/signin') {
    return '/admin/login';
  }
  if (cleaned === '/admin' || cleaned.startsWith('/admin')) {
    return '/admin';
  }
  if (cleaned === '/contact' || cleaned === '/contact-us') {
    return '/contact';
  }
  return '/';
}

/**
 * Updates document title and meta description tag
 */
export function updatePageMetadata(route: PageRoute) {
  let matched: RouteInfo = ROUTES.home;
  for (const key of Object.keys(ROUTES)) {
    if (ROUTES[key].path === route) {
      matched = ROUTES[key];
      break;
    }
  }

  document.title = matched.title;
  
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', matched.metaDescription);
  }
  
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', matched.title);
  }
  
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', matched.metaDescription);
  }
}
