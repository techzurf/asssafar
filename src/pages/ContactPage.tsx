import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Navigation, 
  Building, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { PageRoute } from '../routes';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Umrah Package Enquiry',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required.';
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) errors.message = 'Please write your message or enquiry details.';
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const mapsSearchUrl = 'https://www.google.com/maps/search/?api=1&query=No.41,+First+Floor,+Tabs+Complex,+Opposite+Child+Jesus+Hospital,+Bharathidasan+Salai,+Cantonment,+Tiruchirappalli+620001';
  const mapsDirectionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Tabs+Complex,+Bharathidasan+Salai,+Cantonment,+Tiruchirappalli+620001';

  return (
    <div className="bg-[#FFFFFF] text-[#202522]">
      {/* 1. Hero Banner */}
      <section className="relative bg-[#07382E] text-white py-16 sm:py-24 overflow-hidden border-b border-[#0B5D4B]/30">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=2000&q=80"
            alt="Makkah Holy Sanctuary"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07382E] via-[#07382E]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-[#C9A24D]/40 text-xs font-bold tracking-wider uppercase text-[#C9A24D]">
              <MapPin className="w-3.5 h-3.5" />
              <span>Cantonment, Tiruchirappalli • Tamil Nadu, India</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Contact <span className="text-[#FFCE1B]">As-Safar</span>
            </h1>

            <p className="text-base sm:text-lg text-[#EAF3EF]/90 leading-relaxed max-w-2xl">
              We welcome you to visit our office in Cantonment, Trichy, call our direct line, or send an enquiry. Our pilgrimage counselors are here to help you plan with clarity and peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Quick Contact Bar */}
      <section className="bg-[#F8F7F3] border-b border-[#E5E5E0] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Phone */}
            <a
              href={`tel:${BRAND_INFO.phoneTel}`}
              className="bg-white p-4 rounded-2xl border border-[#E5E5E0] flex items-center gap-4 hover:border-[#0B5D4B]/40 transition-all shadow-2xs group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F5F3EE] group-hover:bg-[#0B5D4B] group-hover:text-white transition-colors text-[#0B5D4B] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#C9A24D]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#777777] font-semibold">Direct Call (Trichy)</p>
                <p className="font-bold text-sm sm:text-base text-[#202522] truncate tabular-nums">{BRAND_INFO.phoneFormatted}</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/919566369654?text=${encodeURIComponent(BRAND_INFO.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-2xl border border-[#E5E5E0] flex items-center gap-4 hover:border-[#25D366]/40 transition-all shadow-2xs group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EAFBF1] group-hover:bg-[#25D366] text-[#25D366] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#777777] font-semibold">Instant WhatsApp</p>
                <p className="font-bold text-sm sm:text-base text-[#202522] truncate tabular-nums">+91 95663 69654</p>
              </div>
            </a>

            {/* Hours */}
            <div className="bg-white p-4 rounded-2xl border border-[#E5E5E0] flex items-center gap-4 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-[#F5F3EE] text-[#0B5D4B] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#C9A24D]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#777777] font-semibold">Consultation Hours</p>
                <p className="font-bold text-xs sm:text-sm text-[#202522] tabular-nums">Mon – Sat: 9:30 AM – 8:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Contact Content: Form & Office Info */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Form (7 Cols) */}
            <div className="lg:col-span-7 bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#E5E5E0] shadow-sm">
              <div className="space-y-2 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B5D4B]">
                  Send a Message
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#202522]">
                  Pilgrimage Inquiry Form
                </h2>
                <p className="text-xs sm:text-sm text-[#555555]">
                  Fill out your details below and our senior advisor will contact you within 2 working hours.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-10 space-y-4 bg-[#F8F7F3] rounded-2xl p-6 border border-[#E5E5E0]">
                  <div className="w-16 h-16 rounded-full bg-[#EAF3EF] text-[#0B5D4B] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-[#0B5D4B]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#202522] tracking-tight">
                    JazakAllah Khair! Message Recorded
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#202522]">{formData.name}</strong>. Your enquiry regarding <strong className="text-[#202522]">{formData.subject}</strong> has been logged. Our Trichy team will reach you at <strong className="text-[#202522]">{formData.phone}</strong>.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/919566369654?text=${encodeURIComponent(`Assalamu Alaikum, I just submitted an enquiry on the website: ${formData.subject} for ${formData.name}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Chat on WhatsApp Directly</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          subject: 'Umrah Package Enquiry',
                          message: '',
                        });
                      }}
                      className="text-xs text-[#0B5D4B] font-bold underline px-3 py-2 cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#202522] uppercase tracking-wide">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Mohamed Farook"
                        className={`w-full px-4 py-3 rounded-xl bg-[#F8F7F3] border outline-none text-sm text-[#202522] ${
                          formErrors.name ? 'border-red-500 bg-red-50/20' : 'border-[#E5E5E0] focus:border-[#0B5D4B]'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-red-600 font-medium">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#202522] uppercase tracking-wide">
                        Mobile / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 98420 12345"
                        className={`w-full px-4 py-3 rounded-xl bg-[#F8F7F3] border outline-none text-sm text-[#202522] ${
                          formErrors.phone ? 'border-red-500 bg-red-50/20' : 'border-[#E5E5E0] focus:border-[#0B5D4B]'
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-600 font-medium">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
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

                    {/* Subject */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#202522] uppercase tracking-wide">
                        Subject of Enquiry
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0] focus:border-[#0B5D4B] outline-none text-sm text-[#202522]"
                      >
                        <option value="Umrah Package Enquiry">Umrah Package Enquiry (General)</option>
                        <option value="Economy Umrah (14 Days)">Economy Umrah (14 Days)</option>
                        <option value="Standard Umrah (15 Days)">Standard Umrah (15 Days)</option>
                        <option value="Premium Umrah Experience">Premium Umrah Experience (5★)</option>
                        <option value="Hajj 2027 Advance Registration">Hajj 2027 Advance Registration</option>
                        <option value="Custom Family / Private Group">Custom Family / Private Group</option>
                        <option value="General Question / Feedback">General Question / Feedback</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#202522] uppercase tracking-wide">
                      Message / Requirement Details *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share number of travellers, tentative month of travel, room sharing preference, or any specific questions..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#F8F7F3] border outline-none text-sm text-[#202522] ${
                        formErrors.message ? 'border-red-500 bg-red-50/20' : 'border-[#E5E5E0] focus:border-[#0B5D4B]'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-[11px] text-red-600 font-medium">{formErrors.message}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#0B5D4B] hover:bg-[#084538] text-white font-bold text-base py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <Send className="w-4 h-4 text-[#C9A24D]" />
                      <span>{isSubmitting ? 'Sending Message...' : 'Send Pilgrimage Enquiry'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Office Address & Details (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#F8F7F3] rounded-3xl p-6 sm:p-8 border border-[#E5E5E0] shadow-xs space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#C9A24D] uppercase tracking-wider block">
                    Official Travel Agency
                  </span>
                  <h3 className="text-2xl font-semibold text-[#202522] mt-1 tracking-tight">
                    AS SAFAR HAJJ & UMRAH SERVICE
                  </h3>
                  <p className="text-xs text-[#0B5D4B] font-semibold">
                    (TOURS & TRAVELS)
                  </p>
                </div>

                {/* Address block */}
                <div className="space-y-4 text-xs sm:text-sm text-[#202522]">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#E5E5E0] text-[#0B5D4B] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#0B5D4B]" />
                    </div>
                    <div>
                      <span className="font-bold block text-sm text-[#202522]">Office Address:</span>
                      <p className="text-[#555555] leading-snug mt-1">
                        No. 41, First Floor, Tabs Complex,<br />
                        Opposite Child Jesus Hospital, Bharathidasan Salai,<br />
                        Cantonment, Tiruchirappalli – <span className="tabular-nums">620001</span>,<br />
                        Tamil Nadu, India.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#E5E5E0] text-[#0B5D4B] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#0B5D4B]" />
                    </div>
                    <div>
                      <span className="font-bold block text-sm text-[#202522]">Telephone / Mobile:</span>
                      <a
                        href={`tel:${BRAND_INFO.phoneTel}`}
                        className="text-[#0B5D4B] font-bold hover:underline block mt-0.5 tabular-nums"
                      >
                        +91 95663 69654
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#E5E5E0] text-[#0B5D4B] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#0B5D4B]" />
                    </div>
                    <div>
                      <span className="font-bold block text-sm text-[#202522]">Visiting Hours:</span>
                      <p className="text-[#555555] leading-snug mt-0.5 tabular-nums">
                        Monday to Saturday: 9:30 AM – 8:30 PM<br />
                        Sunday: Prior appointment
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#0B5D4B] hover:bg-[#084538] text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Navigation className="w-4 h-4 text-[#C9A24D]" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white hover:bg-[#F5F3EE] text-[#202522] border border-[#E5E5E0] font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>

              {/* Landmark details */}
              <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E5E5E0] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B5D4B]">
                  <Building className="w-4 h-4" />
                  <span>Cantonment Trichy Landmark:</span>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Located directly opposite Child Jesus Hospital on Bharathidasan Salai inside the Tabs Complex (1st Floor). Convenient bus connectivity from Central Bus Stand (approx. 1.2 km) and Trichy Junction Railway Station (approx. 1.5 km).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Google Maps Embedded Section */}
      <section className="py-12 sm:py-16 bg-[#F8F7F3] border-t border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D4B] uppercase tracking-wider">
                Find Us in Trichy
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#202522]">
                Our Cantonment Office Location
              </h2>
            </div>

            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0B5D4B] text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-xs hover:bg-[#084538]"
            >
              <Navigation className="w-4 h-4 text-[#C9A24D]" />
              <span>Get Live Directions</span>
            </a>
          </div>

          {/* Interactive Google Maps iframe */}
          <div className="rounded-3xl overflow-hidden border border-[#E5E5E0] shadow-sm bg-white h-[380px] sm:h-[450px] relative">
            <iframe
              title="As-Safar Office Location Map"
              src="https://maps.google.com/maps?q=Tabs+Complex+Bharathidasan+Salai+Cantonment+Tiruchirappalli+Tamil+Nadu+620001&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
