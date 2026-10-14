export interface PackageItem {
  id: string;
  name: string;
  badge?: string;
  duration: string;
  tagline: string;
  makkahHotel: string;
  makkahDistance: string;
  madinahHotel: string;
  madinahDistance: string;
  transport: string;
  food: string;
  visa: string;
  startingPrice: string;
  priceNote: string;
  inclusions: string[];
  exclusions?: string[];
  category: 'economy' | 'standard' | 'premium' | 'vip';
  featured?: boolean;
  idealFor: string;
}

export interface JourneyStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  packageTaken: string;
  rating: number;
  date: string;
  quote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'makkah' | 'madinah' | 'journey' | 'hotels';
  description?: string;
  caption: string;
  accentText?: string;
  imageUrl?: string;
}

export interface EnquiryFormData {
  fullName: string;
  mobile: string;
  email?: string;
  travellersCount: string;
  preferredMonth: string;
  packagePreference: string;
  city: string;
  message: string;
}

export interface GoogleReview {
  id: string;
  authorName: string;
  authorPhotoUrl?: string;
  rating: number;
  relativeTimeDescription: string;
  text: string;
  locationLabel?: string;
  originalReviewUrl?: string;
}

export interface GoogleRatingSummaryData {
  businessName: string;
  location: string;
  rating: number;
  totalReviews: number;
  verificationBadge: string;
  lastVerifiedDate: string;
  googleMapsReviewsUrl: string;
  googleWriteReviewUrl: string;
  placeId?: string;
}

