import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Send, CheckCircle2, Clock, Calendar, Users } from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { UMRAH_PACKAGES } from '../data/packages';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    travellersCount: '2',
    preferredMonth: 'Next Available Group',
    packagePreference: 'standard',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.mobile.trim()) {
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const whatsappInquiryUrl = `https://wa.me/919566369654?text=${encodeURIComponent(
    `Assalamu Alaikum As-Safar, My name is ${formData.fullName || 'Pilgrim'}. I would like to enquire about ${
      formData.packagePreference
    } package for ${formData.travellersCount} travellers around ${formData.preferredMonth}. ${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-14 sm:py-20 bg-[#F5F3EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5E5E0] text-xs font-bold uppercase tracking-wider text-[#0B5D4B]">
            <span className="w-2 h-2 rounded-full bg-[#C9A24D]" />
            <span>Personalized Trichy Guidance</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#202522] tracking-tight">
            Ready to Begin Your Umrah Journey?
          </h2>

          <p className="text-[#333333] text-base sm:text-lg leading-relaxed">
            Speak with the As-Safar team and let us help you plan your journey.
          </p>

          {/* Quick Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`tel:${BRAND_INFO.phoneTel}`}
              className="bg-[#0B5D4B] hover:bg-[#084538] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <Phone className="w-4 h-4 text-[#C9A24D]" />
              <span>Call +91 95663 69654</span>
            </a>

            <a
              href={`https://wa.me/919566369654?text=${encodeURIComponent(BRAND_INFO.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Contact Form + Office Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E5E5E0] shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#F5F3EE] text-[#0B5D4B] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-[#0B5D4B]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#202522]">
                  JazakAllah Khair! Enquiry Received
                </h3>
                <p className="text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
                  Our senior pilgrimage counselor from the Trichy office will call you at{' '}
                  <span className="font-bold text-[#202522]">{formData.mobile}</span> with detailed package itineraries and departures.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[#25D366] text-white font-bold text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp as well</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        mobile: '',
                        travellersCount: '2',
                        preferredMonth: 'Next Available Group',
                        packagePreference: 'standard',
                        message: '',
                      });
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#E5E5E0] text-[#202522] font-semibold text-sm hover:bg-[#F8F7F3]"
                  >
                    Submit Another Query
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#202522]">
                    Send Pilgrimage Enquiry
                  </h3>
                  <p className="text-xs text-[#555555]">
                    Fill in your details below and we will contact you within 2 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#202522] uppercase tracking-wide">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Mohamed Farook"
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0] focus:border-[#0B5D4B] focus:ring-2 focus:ring-[#0B5D4B]/20 outline-none text-sm text-[#202522]"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#202522] uppercase tracking-wide">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="e.g. 98420 12345"
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0] focus:border-[#0B5D4B] focus:ring-2 focus:ring-[#0B5D4B]/20 outline-none text-sm text-[#202522]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Travellers Count */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#202522] uppercase tracking-wide flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#0B5D4B]" />
                      <span>Number of Travellers</span>
                    </label>
                    <select
                      value={formData.travellersCount}
                      onChange={(e) => setFormData({ ...formData, travellersCount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0] focus:border-[#0B5D4B] focus:ring-2 focus:ring-[#0B5D4B]/20 outline-none text-sm text-[#202522]"
                    >
                      <option value="1">1 Pilgrim (Individual)</option>
                      <option value="2">2 Pilgrims (Couple / Pair)</option>
                      <option value="3">3 Pilgrims</option>
                      <option value="4">4 Pilgrims (Family)</option>
                      <option value="5-8">5 to 8 Pilgrims (Large Family)</option>
                      <option value="9+">9+ Pilgrims (Private Group)</option>
                    </select>
                  </div>

                  {/* Preferred Month */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#202522] uppercase tracking-wide flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#0B5D4B]" />
                      <span>Preferred Travel Month</span>
                    </label>
                    <select
                      value={formData.preferredMonth}
                      onChange={(e) => setFormData({ ...formData, preferredMonth: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0] focus:border-[#0B5D4B] focus:ring-2 focus:ring-[#0B5D4B]/20 outline-none text-sm text-[#202522]"
                    >
                      <option value="Next Available Group">Immediate / Next Available Group</option>
                      <option value="Ramadan 2026">Ramadan 2026 (1st / 2nd / Full Month)</option>
                      <option value="Shawwal / After Eid">Shawwal / Post Eid-ul-Fitr</option>
                      <option value="Summer Vacation">Summer Vacation Group</option>
                      <option value="Muharram 1448">Muharram 1448 Hijri Opening</option>
                      <option value="Winter / December">November - December Winter</option>
                    </select>
                  </div>
                </div>

                {/* Package Preference */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#202522] uppercase tracking-wide">
                    Package Preference
                  </label>
                  <select
                    value={formData.packagePreference}
                    onChange={(e) => setFormData({ ...formData, packagePreference: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0] focus:border-[#0B5D4B] focus:ring-2 focus:ring-[#0B5D4B]/20 outline-none text-sm text-[#202522]"
                  >
                    {UMRAH_PACKAGES.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} — {pkg.duration} ({pkg.startingPrice})
                      </option>
                    ))}
                    <option value="custom">Customized Private Family Itinerary</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#202522] uppercase tracking-wide">
                    Message / Special Requests
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="E.g. Traveling with elderly parents needing wheelchair, or private room preference..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0] focus:border-[#0B5D4B] focus:ring-2 focus:ring-[#0B5D4B]/20 outline-none text-sm text-[#202522]"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0B5D4B] hover:bg-[#084538] text-white font-bold text-base py-3.5 px-6 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] min-h-[48px]"
                >
                  <Send className="w-4 h-4 text-[#C9A24D]" />
                  <span>{submitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Info & Office Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[#E5E5E0] shadow-sm space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#202522]">
                  {BRAND_INFO.name}
                </h3>
                <p className="text-xs text-[#0B5D4B] font-semibold mt-0.5">
                  Authorized Umrah & Hajj Travel Agency
                </p>
              </div>

              {/* Office Address */}
              <div className="space-y-3 text-sm text-[#202522]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0] text-[#0B5D4B] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#0B5D4B]" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm text-[#202522]">Trichy Head Office:</span>
                    <p className="text-[#555555] leading-snug mt-0.5">
                      {BRAND_INFO.addressLine1},<br />
                      {BRAND_INFO.addressLine2},<br />
                      {BRAND_INFO.area}, {BRAND_INFO.city} – {BRAND_INFO.pincode},<br />
                      {BRAND_INFO.state}, {BRAND_INFO.country}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0] text-[#0B5D4B] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#0B5D4B]" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm text-[#202522]">Direct Contact:</span>
                    <a
                      href={`tel:${BRAND_INFO.phoneTel}`}
                      className="text-[#0B5D4B] font-bold text-base hover:underline block mt-0.5"
                    >
                      {BRAND_INFO.phoneFormatted}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F8F7F3] border border-[#E5E5E0] text-[#0B5D4B] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#0B5D4B]" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm text-[#202522]">Consultation Hours:</span>
                    <p className="text-[#555555] text-xs leading-relaxed mt-0.5">
                      {BRAND_INFO.workingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <a
                href={BRAND_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl border border-[#E5E5E0] text-[#202522] hover:bg-[#F8F7F3] hover:text-[#0B5D4B] font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#C9A24D]" />
                <span>Get Directions (Google Maps)</span>
              </a>
            </div>

            {/* Cantonment Trichy Landmark Card */}
            <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E5E5E0] shadow-2xs">
              <h4 className="font-serif text-base font-bold text-[#202522] mb-1">
                Landmark Guide:
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                Located in the heart of Cantonment on Bharathidasan Salai, directly opposite Child Jesus Hospital in Tabs Complex (1st Floor). Easy parking and accessibility for all families visiting from Trichy, Thanjavur, Pudukkottai, and Dindigul.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
