import React from 'react';
import { Hero } from '../components/Hero';
import { QuickActions } from '../components/QuickActions';
import { PackagesSection } from '../components/PackagesSection';
import { FeaturedPackage } from '../components/FeaturedPackage';
import { InstagramReelsSection } from '../components/InstagramReelsSection';
import { GoogleReviewsSection } from '../components/GoogleReviewsSection';
import { AboutSection } from '../components/AboutSection';
import { UmrahJourney } from '../components/UmrahJourney';
import { ServicesSection } from '../components/ServicesSection';
import { GallerySection } from '../components/GallerySection';
import { PackageItem } from '../types';
import { PageRoute } from '../routes';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenEnquiry: (pkgId?: string) => void;
  onOpenHajj: () => void;
  onSelectPackage: (pkg: PackageItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenEnquiry,
  onOpenHajj,
  onSelectPackage,
}) => {
  return (
    <div>
      {/* Hero Section with 3 slides */}
      <Hero
        onExplorePackages={() => onNavigate('/monthly-umrah')}
        onTalkToTeam={() => onNavigate('/contact')}
        onOpenHajj={() => onNavigate('/hajj-2027')}
      />

      {/* Quick Actions (Desktop 4-grid / Mobile cards) */}
      <QuickActions
        onScrollToPackages={() => onNavigate('/monthly-umrah')}
        onOpenHajj={() => onNavigate('/hajj-2027')}
      />

      {/* Umrah Packages (Filterable cards preview) */}
      <PackagesSection onSelectPackage={onSelectPackage} />

      {/* Featured Package Spotlight (Premium Umrah Experience) */}
      <FeaturedPackage onGetDetails={() => onOpenEnquiry('premium')} />

      {/* About As-Safar & Highlighted License Registration Badge */}
      <AboutSection />

      {/* Instagram Reels Section */}
      <InstagramReelsSection />

      {/* Google Reviews Section */}
      <GoogleReviewsSection />

      {/* Umrah Journey (7-step interactive visual roadmap) */}
      <UmrahJourney />

      {/* Comprehensive Services Grid */}
      <ServicesSection />

      {/* Sacred Moments Gallery */}
      <GallerySection />
    </div>
  );
};
