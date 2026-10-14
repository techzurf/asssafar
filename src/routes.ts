/**
 * Centralized Client-Side Routing for As-Safar Multi-Page Website
 * Supports browser history (pushState / popstate), bookmarking, refresh, and internal links.
 */

export type PageRoute = 
  | '/'
  | '/umrah-packages'
  | '/hajj-2027'
  | '/about-us'
  | '/faq'
  | '/contact';

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
  packages: {
    path: '/umrah-packages',
    label: 'Umrah Packages',
    title: 'Umrah Packages 2026/2027 | Economy, Standard & Premium | As-Safar Trichy',
    metaDescription: 'Explore authentic Umrah packages with verified hotel proximity, Tamil scholars, South Indian dining, and seamless Makkah & Madinah travel from Trichy & Chennai.',
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
    title: 'About As-Safar | Trusted Umrah & Hajj Services from Trichy, Tamil Nadu',
    metaDescription: 'Learn about As-Safar Hajj & Umrah Tours & Travels. Rooted in Cantonment Trichy, offering authentic pilgrim care, transparent pricing, and experienced scholar leadership.',
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
  
  if (cleaned === '/umrah-packages' || cleaned === '/packages') {
    return '/umrah-packages';
  }
  if (cleaned === '/hajj-2027' || cleaned === '/hajj') {
    return '/hajj-2027';
  }
  if (cleaned === '/about-us' || cleaned === '/about') {
    return '/about-us';
  }
  if (cleaned === '/faq' || cleaned === '/faqs') {
    return '/faq';
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
