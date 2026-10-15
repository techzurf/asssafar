/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MakkahLiveDrawer } from './components/MakkahLiveDrawer';
import { EnquiryModal } from './components/EnquiryModal';
import { HajjModal } from './components/HajjModal';
import { AirplaneCursor } from './components/AirplaneCursor';
import { PackageItem } from './types';
import { PageRoute, normalizePathname, updatePageMetadata } from './routes';
import { LanguageProvider } from './context/LanguageContext';

import { HomePage } from './pages/HomePage';
import { UmrahPackagesPage } from './pages/UmrahPackagesPage';
import { RamadanUmrahPage } from './pages/RamadanUmrahPage';
import { ZiyarahPage } from './pages/ZiyarahPage';
import { HajjPage } from './pages/HajjPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => {
    return normalizePathname(window.location.pathname);
  });

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('premium');
  const [isHajjOpen, setIsHajjOpen] = useState(false);

  // Sync route on popstate (browser Back/Forward)
  useEffect(() => {
    const handlePopState = () => {
      const normalized = normalizePathname(window.location.pathname);
      setCurrentPage(normalized);
      updatePageMetadata(normalized);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };

    window.addEventListener('popstate', handlePopState);
    // Initial metadata update
    updatePageMetadata(currentPage);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Programmatic client navigation with URL update
  const navigateTo = useCallback((route: PageRoute) => {
    if (window.location.pathname !== route) {
      window.history.pushState({}, '', route);
    }
    setCurrentPage(route);
    updatePageMetadata(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenEnquiry = (defaultPkgId?: string) => {
    if (defaultPkgId) {
      setSelectedPackageId(defaultPkgId);
    }
    setIsEnquiryOpen(true);
  };

  const handleSelectPackage = (pkg: PackageItem) => {
    setSelectedPackageId(pkg.id);
    setIsEnquiryOpen(true);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FFFFFF] text-[#333333] flex flex-col font-sans selection:bg-[#0B5D4B] selection:text-white">
        {/* Sticky Header with Multi-Page Navigation Menu */}
        <Header
          onOpenEnquiry={() => handleOpenEnquiry('premium')}
          onOpenHajj={() => navigateTo('/hajj-2027')}
          currentPage={currentPage}
          onNavigate={navigateTo}
        />

        {/* Page Body Routing */}
        <main className="flex-1 pb-24 lg:pb-0">
          {currentPage === '/' && (
            <HomePage
              onNavigate={navigateTo}
              onOpenEnquiry={handleOpenEnquiry}
              onOpenHajj={() => navigateTo('/hajj-2027')}
              onSelectPackage={handleSelectPackage}
            />
          )}

          {(currentPage === '/monthly-umrah' || currentPage === '/umrah-packages') && (
            <UmrahPackagesPage
              onSelectPackage={handleSelectPackage}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === '/ramadan-umrah' && (
            <RamadanUmrahPage
              onOpenEnquiry={handleOpenEnquiry}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === '/ziyarah' && (
            <ZiyarahPage
              onOpenEnquiry={handleOpenEnquiry}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === '/hajj-2027' && (
            <HajjPage onNavigate={navigateTo} />
          )}

          {currentPage === '/about-us' && (
            <AboutUsPage
              onNavigate={navigateTo}
              onOpenEnquiry={() => handleOpenEnquiry('premium')}
            />
          )}

          {currentPage === '/faq' && (
            <FaqPage
              onNavigate={navigateTo}
              onOpenEnquiry={() => handleOpenEnquiry('premium')}
            />
          )}

          {currentPage === '/contact' && (
            <ContactPage onNavigate={navigateTo} />
          )}
        </main>

        {/* Shared Footer across all pages */}
        <Footer
          onOpenHajj={() => navigateTo('/hajj-2027')}
          onOpenEnquiry={() => handleOpenEnquiry('premium')}
          onNavigate={navigateTo}
        />

        {/* Floating WhatsApp Action Button */}
        <FloatingWhatsApp />

        {/* Floating Makkah Live Video Button & Slide-in Drawer */}
        <MakkahLiveDrawer onOpenPackages={() => navigateTo('/monthly-umrah')} />

        {/* Mobile-Only Bottom Navigation Bar */}
        <MobileBottomNav
          currentPage={currentPage}
          onNavigate={navigateTo}
        />

        {/* Interactive Airplane Cursor (Desktop / Fine-Pointer Only) */}
        <AirplaneCursor />

        {/* Central Interactive Enquiry Modal */}
        <EnquiryModal
          isOpen={isEnquiryOpen}
          onClose={() => setIsEnquiryOpen(false)}
          defaultPackageId={selectedPackageId}
        />

        {/* Hajj Advisory Modal */}
        <HajjModal
          isOpen={isHajjOpen}
          onClose={() => setIsHajjOpen(false)}
          onOpenEnquiry={() => handleOpenEnquiry('hajj')}
        />
      </div>
    </LanguageProvider>
  );
}
