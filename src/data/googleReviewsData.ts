import { GoogleRatingSummaryData } from '../types';

/**
 * Official Google Maps Listing URL for As-Safar Hajj & Umrah Service (Cantonment, Tiruchirappalli)
 */
export const OFFICIAL_GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/AS+SAFAR+HAJJ+%26+UMRAH+SERVICE/@10.7963234,78.6857187,17z/data=!4m8!3m7!1s0x3baaef5a3064d7df:0x870ee7b3c2bb6fce!8m2!3d10.7963234!4d78.6882936!9m1!1b1!16s%2Fg%2F11b8td1r3v?entry=ttu';

/**
 * Google Business Profile & Rating Configuration
 * Business: AS SAFAR HAJJ & UMRAH SERVICE (TOURS & TRAVELS)
 * Location: Tiruchirappalli (Trichy), Tamil Nadu, India
 * Official Verified Rating: 4.9 Stars from 92 Reviews
 */
export const GOOGLE_RATING_SUMMARY: GoogleRatingSummaryData = {
  businessName: 'AS SAFAR HAJJ & UMRAH SERVICE (TOURS & TRAVELS)',
  location: 'Tiruchirappalli, Tamil Nadu, India',
  rating: 4.9,
  totalReviews: 92,
  verificationBadge: 'Verified Google Business Rating',
  lastVerifiedDate: 'Verified October 2026',
  googleMapsReviewsUrl: OFFICIAL_GOOGLE_MAPS_URL,
  googleWriteReviewUrl: OFFICIAL_GOOGLE_MAPS_URL,
  placeId: '0x3baaef5a3064d7df:0x870ee7b3c2bb6fce',
};

/**
 * The four genuine Google reviews provided by the user from actual pilgrims.
 * Zero artificial or AI-generated testimonials.
 */
export interface GenuineGoogleReviewItem {
  id: string;
  reviewerName: string;
  initials: string;
  rating: number;
  date: string;
  reviewText: string;
  googleReviewUrl: string;
  isTruncated?: boolean;
}

export const OFFICIAL_GOOGLE_REVIEW_CARDS: GenuineGoogleReviewItem[] = [
  {
    id: 'review-jazzar-sharif',
    reviewerName: 'Jazzar Sharif',
    initials: 'JS',
    rating: 5,
    date: '8 months ago',
    reviewText:
      'I am very lucky to visit haram by as safar travels. I went December badge 23 to January 6 Alhamdulillah for everything and specifically Mr. Jaffer brother. In this delta region As safar travels given best price and services. If anyone have an idea to perform umrah or hajj You must contact MR.Jaffer siddiq brother. Mr.rifnas moulana have given bayans and ziyara th in the best way to understand all the members. Over all the service is 10/10',
    googleReviewUrl: 'https://share.google/Ly2GBdKtvhSQjVI06',
  },
  {
    id: 'review-mubeena-nasrin-salim',
    reviewerName: 'Mubeena Nasrin Salim',
    initials: 'MN',
    rating: 5,
    date: '1 year ago',
    reviewText:
      'We went to umrah with Al safar in July month 2025 batch, One of the best and comfortable people we\'ve come across Alhamdulillah. We were a little sceptical about the team lead as we didn\'t know them personally but they were soo ...',
    googleReviewUrl: 'https://share.google/Nop6RqUKxhFaTdMH6',
    isTruncated: true,
  },
  {
    id: 'review-sabah-farheen',
    reviewerName: 'sabah farheen',
    initials: 'SF',
    rating: 5,
    date: '1 year ago',
    reviewText:
      'We had a recent trip to umrah. AS SAFAR has provided the exceptional service from the beginning to the end seamlessly. Highly satisfied and recommended.',
    googleReviewUrl: 'https://share.google/PA8vRL24ZMX0ak0Wp',
  },
  {
    id: 'review-abdur-rahman',
    reviewerName: 'ABDUR RAHMAN',
    initials: 'AR',
    rating: 5,
    date: '1 year ago',
    reviewText:
      'Alhamdulillah, we recently had the pleasure of experiencing Umrah in AS SAFAR Tours and Travel Service, and I must say, it was an exceptional journey from start to finish. The level of customer interaction was outstanding.\n\nFrom the moment we departed to our return, everything was well-coordinated. The accommodations were comfortable and conveniently located very near to Masjid al Haram & Masjid al Nabawi, ensuring we had a pleasant stay throughout our pilgrimage.\n\nThe food provided was delicious offering a taste of south Indian cuisine while ensuring we were well-nourished for our spiritual journey.',
    googleReviewUrl: 'https://share.google/EnTVjdK1h8dlqYCB5',
  },
];
