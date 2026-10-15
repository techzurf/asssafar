import React, { useState } from 'react';
import { 
  Calendar, 
  FileCheck, 
  Users, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Clock, 
  ChevronDown, 
  Building, 
  Sparkles,
  Info
} from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { PageRoute } from '../routes';

interface HajjPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const HajjPage: React.FC<HajjPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    pilgrimsCount: '2',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your full name.';
    }
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required.';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.mobile.trim())) {
      errors.mobile = 'Please enter a valid mobile phone number.';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    return errors;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setIsSubmitting(true);

    // Simulated local registration submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const hajjFaqs = [
    {
      q: 'When does the official registration for Hajj 2027 begin?',
      a: 'Official quotas and registration schedules are released by the Ministry of Hajj & Umrah (KSA) and the Haj Committee of India / Nusuk platform approximately 8 to 10 months prior to the season. As-Safar provides preliminary priority queue listing and document readiness now.',
    },
    {
      q: 'Does As-Safar assist with the Nusuk Hajj platform?',
      a: 'Yes. Our dedicated Trichy office assists registered families in creating their Nusuk accounts, uploading valid passport scans, verifying biometric standards, and selecting preferred camp zones.',
    },
    {
      q: 'What is the pre-Hajj seminar conducted by As-Safar in Trichy?',
      a: 'We organize a 4-day intensive educational workshop for all prospective Hajj pilgrims. Led by experienced Islamic scholars (Muftis and Aalims), the workshop covers the Manasik (rituals) of Hajj step-by-step in Tamil, physical fitness prep, health advisory, and mock Jamarat/Ihram demonstrations.',
    },
    {
      q: 'What kind of ground support is provided during the 5 days of Hajj (Mina, Arafat, Muzdalifah)?',
      a: 'During the sacred 5 days of Hajj, As-Safar coordinates upgraded AC tents in Mina with proper bedding, dedicated catering with familiar hot meals, constant doctor accompaniment, and volunteer assistance for elderly pilgrims during the walk to Jamarat.',
    },
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="bg-[#FFFFFF] text-[#202522]">
      {/* 1. Full-width Hajj Hero Banner */}
      <section className="relative bg-[#07382E] text-white py-20 sm:py-28 overflow-hidden border-b border-[#0B5D4B]/30">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=2070&q=85"
            alt="Makkah Holy Sanctuary during Hajj"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07382E]/95 via-[#07382E]/85 to-black/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-[#C9A24D]/40 text-xs font-bold tracking-wider uppercase text-[#C9A24D]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Advance Registration Open • Trichy & Tamil Nadu</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Prepare for <span className="text-[#FFCE1B]">Hajj 2027</span> with As-Safar
            </h1>

            <p className="text-base sm:text-lg text-[#EAF3EF]/90 leading-relaxed max-w-2xl">
              The journey of a lifetime requires meticulous spiritual and logistical preparation. Register your interest early to receive timely guidance, Nusuk documentation alerts, and pre-Hajj seminars in Trichy.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#register-form"
                className="bg-[#C9A24D] hover:bg-[#B38D3B] text-[#07382E] font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Advance Register for Hajj 2027</span>
              </a>

              <a
                href={`tel:${BRAND_INFO.phoneTel}`}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C9A24D]" />
                <span className="tabular-nums">Call +91 95663 69654</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Official Government Advisory Note */}
      <section className="bg-[#F8F7F3] border-b border-[#E5E5E0] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-xs text-[#555555]">
            <Info className="w-4 h-4 text-[#0B5D4B] shrink-0" />
            <p>
              <strong className="text-[#202522]">Important Notice:</strong> Official Hajj quotas, visa approvals, and pricing are strictly regulated by the Ministry of Hajj & Umrah (KSA) and the Haj Committee / Nusuk platform. As-Safar provides full registration facilitation, biometric preparation, and pre-departure training from our Trichy office.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Step-by-Step Registration & Support Process */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B5D4B]">
              Step-by-Step Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#202522]">
              How As-Safar Prepares You for Hajj 2027
            </h2>
            <p className="text-sm sm:text-base text-[#555555]">
              A structured roadmap ensuring you and your family are fully ready spiritually, physically, and administratively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Advance Registration',
                desc: 'Submit your preliminary pilgrim details to get priority notifications as soon as official quotas and Nusuk windows open.',
              },
              {
                step: '02',
                title: 'Documentation & Nusuk Support',
                desc: 'Our Trichy office handles biometric verification, passport validity checks, digital photo compliance, and Nusuk account setup.',
              },
              {
                step: '03',
                title: 'Pre-Hajj Intensive Seminar',
                desc: 'A comprehensive 4-day seminar held in Trichy with senior Muftis covering Hajj rituals, health guidelines, and luggage rules in Tamil.',
              },
              {
                step: '04',
                title: 'Mina & Arafat Ground Care',
                desc: 'Dedicated on-ground coordination in the holy sites: comfortable tents, authentic hot meals, and scholar accompaniment during Jamarat.',
              },
            ].map((st, i) => (
              <div key={i} className="bg-[#F8F7F3] rounded-2xl p-6 border border-[#E5E5E0] space-y-3 relative overflow-hidden">
                <span className="text-3xl font-bold text-[#C9A24D]/30 block tabular-nums">
                  {st.step}
                </span>
                <h3 className="font-semibold text-lg text-[#202522]">{st.title}</h3>
                <p className="text-xs text-[#555555] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Comprehensive Ground Support & Seminar Info Grid */}
      <section className="py-14 sm:py-20 bg-[#F8F7F3] border-t border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Box 1: Pre-Hajj Seminar */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E5E0] shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F3EE] text-[#0B5D4B] text-xs font-bold">
                  <Users className="w-4 h-4 text-[#C9A24D]" />
                  <span>Conducted in Trichy</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#202522] tracking-tight">
                  Pre-Hajj Intensive Seminars & Workshops
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  Before departure, mental and spiritual clarity is paramount. We conduct specialized training sessions right here in Cantonment, Trichy:
                </p>

                <div className="space-y-2 pt-2 text-xs">
                  {[
                    'Step-by-step Manasik-e-Hajj walkthrough by renowned Tamil Aalims',
                    'Demonstrations of proper Ihram wearing for men and modest dress for ladies',
                    'Tawaf al-Qudum, Sa’ee, and Rami al-Jamarat rules & permissible concessions',
                    'Health advisory: Heat hydration, essential medication, and walking readiness',
                    'Luggage packing lists and baggage clearance protocols',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-[#F8F7F3] p-2.5 rounded-xl border border-[#E5E5E0]">
                      <CheckCircle2 className="w-4 h-4 text-[#0B5D4B] shrink-0 mt-0.5" />
                      <span className="text-[#202522]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E5E0] flex items-center justify-between text-xs text-[#777777]">
                <span>Held at: Tabs Complex, Cantonment, Trichy</span>
                <span className="font-bold text-[#0B5D4B]">Complimentary for Registered Pilgrims</span>
              </div>
            </div>

            {/* Box 2: Mina, Arafat & Muzdalifah Ground Care */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E5E0] shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F3EE] text-[#0B5D4B] text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#C9A24D]" />
                  <span>The Sacred Days of Tashreeq</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#202522] tracking-tight">
                  Mina & Arafat Dedicated Ground Support
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  The physical demands of Hajj peak between 8th and 13th Dhul Hijjah. As-Safar coordinates close logistical monitoring:
                </p>

                <div className="space-y-2 pt-2 text-xs">
                  {[
                    'Upgraded air-conditioned tents in Mina with clean gypsum walls and foam mattresses',
                    'Strategic proximity to Jamarat to reduce prolonged walking distances under heat',
                    'Freshly prepared South Indian buffet meals and unlimited hot beverages in camp',
                    'Accompanying Tamil scholars offering continuous guidance and collective Duas',
                    'Emergency medical assistance and doctor access within our tent sector',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-[#F8F7F3] p-2.5 rounded-xl border border-[#E5E5E0]">
                      <CheckCircle2 className="w-4 h-4 text-[#0B5D4B] shrink-0 mt-0.5" />
                      <span className="text-[#202522]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E5E0] flex items-center justify-between text-xs text-[#777777]">
                <span>Senior Tour Directors on-site</span>
                <span className="font-bold text-[#0B5D4B]">24/7 Helpline in Makkah</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Advance Registration Form */}
      <section id="register-form" className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFFFFF] border-2 border-[#0B5D4B]/20 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24D]">
                Priority Registration
              </span>
              <h2 className="text-3xl font-bold text-[#202522]">
                Hajj 2027 Advance Registration Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-[#555555]">
                Please provide your contact details. Our pilgrimage counselor will verify your information and schedule your pre-registration consultation.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-10 space-y-4 bg-[#F8F7F3] rounded-2xl p-6 border border-[#E5E5E0]">
                <div className="w-16 h-16 rounded-full bg-[#EAF3EF] text-[#0B5D4B] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-[#0B5D4B]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#202522] tracking-tight">
                  Enquiry Successfully Recorded
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
                  JazakAllah Khair, <strong className="text-[#202522]">{formData.name}</strong>. Your advance registration interest for Hajj 2027 has been registered. Our Trichy Hajj advisory team will reach out at <strong className="text-[#202522]">{formData.mobile}</strong>.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/919566369654?text=${encodeURIComponent(`Assalamu Alaikum, I just submitted the Hajj 2027 advance registration for ${formData.name} (${formData.pilgrimsCount} pilgrims).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Follow Up on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        mobile: '',
                        email: '',
                        pilgrimsCount: '2',
                        message: '',
                      });
                    }}
                    className="text-xs text-[#0B5D4B] font-bold underline px-3 py-2 cursor-pointer"
                  >
                    Submit Another Pilgrim Detail
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#202522] uppercase tracking-wide">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Haji A. Mohamed Farook"
                      className={`w-full px-4 py-3 rounded-xl bg-[#F8F7F3] border outline-none text-sm text-[#202522] ${
                        formErrors.name ? 'border-red-500 bg-red-50/30' : 'border-[#E5E5E0] focus:border-[#0B5D4B]'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-red-600 font-medium">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#202522] uppercase tracking-wide">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="e.g. 98420 12345"
                      className={`w-full px-4 py-3 rounded-xl bg-[#F8F7F3] border outline-none text-sm text-[#202522] ${
                        formErrors.mobile ? 'border-red-500 bg-red-50/30' : 'border-[#E5E5E0] focus:border-[#0B5D4B]'
                      }`}
                    />
                    {formErrors.mobile && (
                      <p className="text-[11px] text-red-600 font-medium">{formErrors.mobile}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email (Optional) */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#202522] uppercase tracking-wide">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@gmail.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[#F8F7F3] border outline-none text-sm text-[#202522] ${
                        formErrors.email ? 'border-red-500' : 'border-[#E5E5E0] focus:border-[#0B5D4B]'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-600 font-medium">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Number of Pilgrims */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#202522] uppercase tracking-wide">
                      Number of Pilgrims
                    </label>
                    <select
                      value={formData.pilgrimsCount}
                      onChange={(e) => setFormData({ ...formData, pilgrimsCount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0] focus:border-[#0B5D4B] outline-none text-sm text-[#202522]"
                    >
                      <option value="1">1 Pilgrim (Individual)</option>
                      <option value="2">2 Pilgrims (Couple / Pair)</option>
                      <option value="3">3 Pilgrims</option>
                      <option value="4">4 Pilgrims (Family)</option>
                      <option value="5+">5+ Pilgrims (Extended Group)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#202522] uppercase tracking-wide">
                    Additional Notes / Passport Status
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="E.g. Valid passports available for all members, previous Umrah completed, traveling with elderly parents..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0] focus:border-[#0B5D4B] outline-none text-sm text-[#202522]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0B5D4B] hover:bg-[#084538] text-white font-bold text-base py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Send className="w-4 h-4 text-[#C9A24D]" />
                    <span>{isSubmitting ? 'Submitting Registration...' : 'Submit Advance Registration for Hajj 2027'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 5. Hajj FAQs Accordion */}
      <section className="py-14 sm:py-20 bg-[#F8F7F3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202522]">
              Hajj 2027 Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#555555]">
              Important clarifications regarding quotas, procedures, and As-Safar advisory.
            </p>
          </div>

          <div className="space-y-3">
            {hajjFaqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={i} className="border border-[#E5E5E0] rounded-2xl overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-base text-[#202522] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#0B5D4B] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-[#555555] leading-relaxed border-t border-[#E5E5E0]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Contact and WhatsApp Enquiry CTA */}
      <section className="py-12 bg-[#07382E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Speak Directly with our Trichy Hajj Counselors
          </h2>
          <p className="text-sm sm:text-base text-[#EAF3EF]/90 max-w-2xl mx-auto">
            Visit our office at Tabs Complex, Cantonment, Trichy for an in-person discussion regarding Hajj preparation.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${BRAND_INFO.phoneTel}`}
              className="bg-[#C9A24D] hover:bg-[#B38D3B] text-[#07382E] font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 fill-[#07382E]" />
              <span className="tabular-nums">Call +91 95663 69654</span>
            </a>

            <a
              href={`https://wa.me/919566369654?text=${encodeURIComponent('Assalamu Alaikum, I would like to enquire about Hajj 2027 preparation and guidance.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Counselor</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
