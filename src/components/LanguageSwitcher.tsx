import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex items-center p-0.5 rounded-lg bg-[#F5F3EE] border border-[#E5E5E0] text-xs font-semibold shadow-2xs">
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-2.5 py-1.5 rounded-md transition-all cursor-pointer ${
          lang === 'en'
            ? 'bg-[#075E4E] text-white shadow-2xs'
            : 'text-[#4A5568] hover:text-[#075E4E]'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('ta')}
        className={`px-2.5 py-1.5 rounded-md transition-all cursor-pointer ${
          lang === 'ta'
            ? 'bg-[#075E4E] text-white shadow-2xs'
            : 'text-[#4A5568] hover:text-[#075E4E]'
        }`}
        aria-label="தமிழ் மொழிக்கு மாற்றுக"
      >
        தமிழ்
      </button>
    </div>
  );
};
