import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.packages': 'Umrah Packages',
    'nav.monthlyUmrah': 'Monthly Umrah',
    'nav.ramadanUmrah': 'Ramadan Umrah',
    'nav.ziyarah': 'Ziyarah',
    'nav.hajj': 'Hajj 2027',
    'nav.about': 'About Us',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.enquire': 'Custom Package',

    // Hero
    'hero.trustBadge': 'Trusted Umrah Travel Assistance from Trichy',
    'hero.office': 'Cantonment Office',
    'hero.title1': 'Your Journey to the House of Allah Begins Here',
    'hero.desc1': 'Experience a comfortable, guided and spiritually enriching Umrah journey with As-Safar.',
    'hero.hotel': '100% Verified Hotels',
    'hero.dep': 'Trichy & Chennai Departures',
    'hero.aalim': 'Tamil-Speaking Aalims',
    'hero.explorePkg': 'Explore Umrah Packages',
    'hero.talkTeam': 'Talk to Our Team',

    // Quick Actions
    'quick.explore': 'Explore',
    'quick.umrah': 'Umrah Packages',
    'quick.preregi': 'Pre-Register',
    'quick.hajj2027': 'Hajj 2027',
    'quick.direct': 'Direct Dial',
    'quick.callus': 'Call Us',
    'quick.chat': 'Instant Chat',
    'quick.whatsapp': 'WhatsApp',
    'quick.reviews': 'Google Reviews',

    // Packages Section
    'pkg.badge': 'OUR UMRAH PACKAGES',
    'pkg.heading': 'Choose Your Sacred Journey',
    'pkg.sub': 'Discover thoughtfully planned Umrah experiences designed to make your pilgrimage comfortable, peaceful, and spiritually fulfilling.',
    'pkg.starting': 'Starting From',
    'pkg.perperson': '*per person',
    'pkg.details': 'View Package Details',

    // Reviews Section
    'reviews.badge': 'VERIFIED GOOGLE REVIEWS',
    'reviews.heading': 'What Our Pilgrims Say',
    'reviews.sub': 'Your trust means everything to us. Read genuine reviews and experiences shared by our pilgrims on Google.',
    'reviews.readall': 'Read All Google Reviews',
    'reviews.write': 'Write a Review',
  },
  ta: {
    // Nav
    'nav.home': 'முகப்பு',
    'nav.packages': 'உம்ரா பேக்கேஜ்கள்',
    'nav.monthlyUmrah': 'மாதாந்திர உம்ரா',
    'nav.ramadanUmrah': 'ரமலான் உம்ரா',
    'nav.ziyarah': 'ஜியாரத்',
    'nav.hajj': 'ஹஜ் 2027',
    'nav.about': 'எங்களைப் பற்றி',
    'nav.faq': 'கேள்வி-பதில்',
    'nav.contact': 'தொடர்புக்கு',
    'nav.enquire': 'தனிப்பயன் பேக்கேஜ்',

    // Hero
    'hero.trustBadge': 'திருச்சியிலிருந்து நம்பகமான உம்ரா பயண உதவி',
    'hero.office': 'கண்டோன்மென்ட் அலுவலகம்',
    'hero.title1': 'அல்லாஹ்வின் இல்லத்திற்கான உங்களது புனிதப் பயணம் இங்கே தொடங்குகிறது',
    'hero.desc1': 'அஸ்-சஃபருடன் வசதியான, வழிகாட்டப்பட்ட மற்றும் ஆன்மீக ரீதியில் நிறைந்த உம்ரா பயணத்தை அனுபவிக்கவும்.',
    'hero.hotel': '100% சரிபார்க்கப்பட்ட ஹோட்டல்கள்',
    'hero.dep': 'திருச்சி & சென்னை புறப்பாடுகள்',
    'hero.aalim': 'தமிழ் பேசும் ஆலிம்கள்',
    'hero.explorePkg': 'உம்ரா பேக்கேஜ்களைப் காண்க',
    'hero.talkTeam': 'எங்கள் குழுவிடம் பேசுக',

    // Quick Actions
    'quick.explore': 'பார்க்க',
    'quick.umrah': 'உம்ரா பேக்கேஜ்கள்',
    'quick.preregi': 'முன்பதிவு',
    'quick.hajj2027': 'ஹஜ் 2027',
    'quick.direct': 'நேரடி அழைப்பு',
    'quick.callus': 'எங்களை அழைக்கவும்',
    'quick.chat': 'உடனடி அரட்டை',
    'quick.whatsapp': 'வாட்ஸ்அப்',
    'quick.reviews': 'கூகுள் விமர்சனங்கள்',

    // Packages Section
    'pkg.badge': 'எங்கள் உம்ரா பேக்கேஜ்கள்',
    'pkg.heading': 'உங்களது புனிதப் பயணத்தைத் தேர்ந்தெடுக்கவும்',
    'pkg.sub': 'உங்களது புனிதப் பயணம் வசதியாகவும், அமைதியாகவும், ஆன்மீக திருப்தியுடனும் அமைய கவனமாக திட்டமிடப்பட்ட உம்ரா அனுபவங்கள்.',
    'pkg.starting': 'விலை ஆரம்பம்',
    'pkg.perperson': '*நபர் ஒருவருக்கு',
    'pkg.details': 'பேக்கேஜ் விவரங்களைக் காண்க',

    // Reviews Section
    'reviews.badge': 'சரிபார்க்கப்பட்ட கூகுள் விமர்சனங்கள்',
    'reviews.heading': 'எங்கள் ஹாஜிகள் என்ன சொல்கிறார்கள்',
    'reviews.sub': 'உங்களது நம்பிக்கைதான் எங்களுக்கு எல்லாம். கூகுளில் நம் ஹாஜிகள் பகிர்ந்த உண்மையான விமர்சனங்களைப் படியுங்கள்.',
    'reviews.readall': 'அனைத்து கூகுள் விமர்சனங்களையும் காண்க',
    'reviews.write': 'விமர்சனம் எழுதுங்கள்',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('as_safar_lang');
    return (saved === 'ta' || saved === 'en') ? saved : 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('as_safar_lang', newLang);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
