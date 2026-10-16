import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  FileText, 
  Plus, 
  Trash2, 
  Printer, 
  RotateCcw, 
  User, 
  CreditCard, 
  Users, 
  CheckSquare, 
  AlertCircle,
  MessageCircle,
  Calendar,
  MapPin,
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { UMRAH_PACKAGES } from '../data/packages';

interface AccompanyingTraveller {
  id: string;
  fullName: string;
  relationship: string;
  gender: string;
  ageOrDob: string;
  passportNumber: string;
  passportExpiry: string;
}

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [sameAsContact, setSameAsContact] = useState<boolean>(true);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showPrintPreview, setShowPrintPreview] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Primary Applicant Form State
  const [primaryApplicant, setPrimaryApplicant] = useState({
    fullName: '',
    surname: '',
    fatherHusbandName: '',
    gender: 'Male',
    presentAddress: '',
    contactNumber: '',
    whatsappNumber: '',
    email: '',
    passportNumber: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    passportPlaceOfIssue: '',
    dateOfBirth: '',
    placeOfBirth: '',
    journeyType: 'Umrah Pilgrimage',
    packageTier: 'Premium Umrah Package',
    departureMonthYear: 'Immediate / Next Group Departure',
    specialNotes: '',
  });

  // Accompanying Travellers State
  const [travellers, setTravellers] = useState<AccompanyingTraveller[]>([]);

  // Auto sync WhatsApp number if checkbox is enabled
  useEffect(() => {
    if (sameAsContact) {
      setPrimaryApplicant((prev) => ({ ...prev, whatsappNumber: prev.contactNumber }));
    }
  }, [primaryApplicant.contactNumber, sameAsContact]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddTraveller = () => {
    const newTraveller: AccompanyingTraveller = {
      id: Date.now().toString(),
      fullName: '',
      relationship: 'Wife',
      gender: 'Female',
      ageOrDob: '',
      passportNumber: '',
      passportExpiry: '',
    };
    setTravellers((prev) => [...prev, newTraveller]);
  };

  const handleRemoveTraveller = (id: string) => {
    setTravellers((prev) => prev.filter((t) => t.id !== id));
  };

  const handleTravellerChange = (id: string, field: keyof AccompanyingTraveller, value: string) => {
    setTravellers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!primaryApplicant.fullName.trim()) errors.fullName = 'Full Name is required';
      if (!primaryApplicant.fatherHusbandName.trim()) errors.fatherHusbandName = "Father's / Husband's name is required";
      if (!primaryApplicant.contactNumber.trim()) errors.contactNumber = 'Contact Phone Number is required';
      if (!primaryApplicant.presentAddress.trim()) errors.presentAddress = 'Present Address is required';
    }

    if (step === 2) {
      if (!primaryApplicant.passportNumber.trim()) errors.passportNumber = 'Passport Number is required';
      if (!primaryApplicant.passportExpiryDate.trim()) errors.passportExpiryDate = 'Passport Expiry Date is required';
      if (!primaryApplicant.dateOfBirth.trim()) errors.dateOfBirth = 'Date of Birth is required';
    }

    if (step === 4) {
      if (!agreedToTerms) errors.terms = 'You must agree to the declaration before submitting';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const handleResetForm = () => {
    if (window.confirm('Are you sure you want to clear all fields in the application form?')) {
      setPrimaryApplicant({
        fullName: '',
        surname: '',
        fatherHusbandName: '',
        gender: 'Male',
        presentAddress: '',
        contactNumber: '',
        whatsappNumber: '',
        email: '',
        passportNumber: '',
        passportIssueDate: '',
        passportExpiryDate: '',
        passportPlaceOfIssue: '',
        dateOfBirth: '',
        placeOfBirth: '',
        journeyType: 'Umrah Pilgrimage',
        packageTier: 'Premium Umrah Package',
        departureMonthYear: 'Immediate / Next Group Departure',
        specialNotes: '',
      });
      setTravellers([]);
      setAgreedToTerms(false);
      setValidationErrors({});
      setActiveStep(1);
      setSubmitted(false);
    }
  };

  // Generate structured message text for WhatsApp submission
  const generateWhatsAppMessage = (): string => {
    let msg = `*AS-SAFAR HAJJ & UMRAH APPLICATION FORM*\n`;
    msg += `-------------------------------------------\n`;
    msg += `*JOURNEY:* ${primaryApplicant.journeyType}\n`;
    msg += `*PACKAGE:* ${primaryApplicant.packageTier}\n`;
    msg += `*DEPARTURE:* ${primaryApplicant.departureMonthYear}\n\n`;

    msg += `*PRIMARY APPLICANT DETAILS*\n`;
    msg += `• *Name (as in Passport):* ${primaryApplicant.fullName} ${primaryApplicant.surname}\n`;
    msg += `• *Father/Husband Name:* ${primaryApplicant.fatherHusbandName}\n`;
    msg += `• *Gender:* ${primaryApplicant.gender}\n`;
    msg += `• *Date of Birth:* ${primaryApplicant.dateOfBirth}\n`;
    msg += `• *Place of Birth:* ${primaryApplicant.placeOfBirth || 'N/A'}\n`;
    msg += `• *Phone Number:* ${primaryApplicant.contactNumber}\n`;
    msg += `• *WhatsApp Number:* ${primaryApplicant.whatsappNumber}\n`;
    if (primaryApplicant.email) msg += `• *Email:* ${primaryApplicant.email}\n`;
    msg += `• *Address:* ${primaryApplicant.presentAddress}\n\n`;

    msg += `*PASSPORT DETAILS*\n`;
    msg += `• *Passport Number:* ${primaryApplicant.passportNumber}\n`;
    msg += `• *Date of Issue:* ${primaryApplicant.passportIssueDate || 'N/A'}\n`;
    msg += `• *Date of Expiry:* ${primaryApplicant.passportExpiryDate}\n`;
    msg += `• *Place of Issue:* ${primaryApplicant.passportPlaceOfIssue || 'N/A'}\n\n`;

    if (travellers.length > 0) {
      msg += `*ACCOMPANYING TRAVELLERS (${travellers.length})*\n`;
      travellers.forEach((t, index) => {
        msg += `${index + 1}. *${t.fullName || 'Traveller'}* | Rel: ${t.relationship} | Gender: ${t.gender} | Age/DOB: ${t.ageOrDob || 'N/A'} | Passport: ${t.passportNumber || 'N/A'} (Exp: ${t.passportExpiry || 'N/A'})\n`;
      });
      msg += `\n`;
    } else {
      msg += `*ACCOMPANYING TRAVELLERS:* None (Single Applicant)\n\n`;
    }

    if (primaryApplicant.specialNotes) {
      msg += `*SPECIAL NOTES / REQUESTS:* ${primaryApplicant.specialNotes}\n\n`;
    }

    msg += `*DECLARATION:* Verified true and correct per official passports.\n`;
    msg += `-------------------------------------------`;

    return msg;
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(4)) {
      return;
    }

    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/919566369654?text=${encodeURIComponent(message)}`;

    setSubmitted(true);
    window.open(whatsappUrl, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-2 sm:p-4 animate-fade-in overflow-y-auto">
      {/* Modal Card Container */}
      <div className="bg-[#FFFFFF] w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#075C4B]/20 my-auto flex flex-col max-h-[95vh] overflow-hidden">
        
        {/* ================= HEADER ================= */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-[#E5E5E0] bg-[#075C4B] text-white flex items-center justify-between shrink-0 relative overflow-hidden">
          {/* Subtle gold gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9973D]/15 to-transparent pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#C9973D]/50 flex items-center justify-center text-[#F5D58A] shadow-inner shrink-0">
              <FileText className="w-5 h-5 text-[#F5D58A]" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-2xl font-bold font-serif text-white tracking-tight leading-tight">
                  Hajj & Umrah Application Form
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C9973D] text-[#075C4B] uppercase tracking-wider hidden sm:inline-block">
                  Official Registration
                </span>
              </div>
              <p className="text-xs text-[#E2E8F0] mt-0.5 flex items-center gap-2">
                <span>As-Safar Hajj & Umrah Services · Trichy</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline text-[#F5D58A] font-mono text-[11px]">TN03786327/Cat-II/29848/2027</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <button
              onClick={handleResetForm}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#E2E8F0] hover:text-white transition-colors text-xs font-medium flex items-center gap-1 cursor-pointer"
              title="Reset Form"
            >
              <RotateCcw className="w-4 h-4 text-[#F5D58A]" />
              <span className="hidden md:inline">Reset</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
              aria-label="Close application modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= STEP INDICATOR BAR ================= */}
        <div className="bg-[#F8F7F3] border-b border-[#E5E5E0] px-3 py-2.5 sm:px-6 shrink-0">
          <div className="grid grid-cols-4 gap-1 sm:gap-2 max-w-3xl mx-auto">
            {[
              { step: 1, label: 'Primary Applicant', icon: User },
              { step: 2, label: 'Passport & Package', icon: CreditCard },
              { step: 3, label: 'Accompanying', icon: Users },
              { step: 4, label: 'Review & Submit', icon: CheckSquare },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeStep === item.step;
              const isPassed = activeStep > item.step;

              return (
                <button
                  key={item.step}
                  onClick={() => {
                    if (isPassed || activeStep === item.step) {
                      setActiveStep(item.step);
                    } else if (validateStep(activeStep)) {
                      setActiveStep(item.step);
                    }
                  }}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 p-1.5 sm:py-2 px-2 rounded-xl border text-center sm:text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#075C4B] text-white border-[#075C4B] shadow-sm font-bold'
                      : isPassed
                      ? 'bg-[#075C4B]/10 text-[#075C4B] border-[#075C4B]/30 font-semibold'
                      : 'bg-white text-gray-400 border-[#E5E5E0]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                      isActive
                        ? 'bg-[#C9973D] text-[#075C4B] font-bold'
                        : isPassed
                        ? 'bg-[#075C4B] text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isPassed ? '✓' : item.step}
                  </div>
                  <span className="text-[10px] sm:text-xs leading-tight truncate">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= SCROLLABLE FORM BODY ================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">

          {/* SUCCESS CONFIRMATION VIEW */}
          {submitted ? (
            <div className="text-center py-8 px-4 max-w-xl mx-auto space-y-5 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-[#075C4B]/10 border-2 border-[#075C4B] text-[#075C4B] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-12 h-12 text-[#075C4B]" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#202522]">
                  Alhamdulillah! Application Prepared
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  Thank you, <span className="font-bold text-[#075C4B]">{primaryApplicant.fullName}</span>. Your application details have been compiled and forwarded via WhatsApp to our official coordinator.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F7F3] border border-[#E5E5E0] text-left text-xs space-y-1.5 font-sans">
                <p className="font-bold text-[#075C4B] uppercase tracking-wider text-[11px]">
                  Registration Summary:
                </p>
                <p>• <strong>Primary Applicant:</strong> {primaryApplicant.fullName} {primaryApplicant.surname}</p>
                <p>• <strong>Contact:</strong> {primaryApplicant.contactNumber}</p>
                <p>• <strong>Journey:</strong> {primaryApplicant.journeyType} ({primaryApplicant.packageTier})</p>
                <p>• <strong>Passport No:</strong> {primaryApplicant.passportNumber}</p>
                <p>• <strong>Accompanying Travellers:</strong> {travellers.length} Family Member(s)</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handlePrint}
                  className="px-5 py-3 rounded-xl bg-[#075C4B] hover:bg-[#084538] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#F5D58A]" />
                  <span>Print / Save Application PDF</span>
                </button>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setActiveStep(1);
                  }}
                  className="px-5 py-3 rounded-xl border border-[#E5E5E0] text-[#202522] hover:bg-[#F8F7F3] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Edit / Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">

              {/* STEP 1: PRIMARY APPLICANT DETAILS */}
              {activeStep === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-[#E5E5E0] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold font-serif text-[#075C4B] flex items-center gap-2">
                        <User className="w-5 h-5 text-[#C9973D]" />
                        <span>Section 1: Primary Applicant Information</span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Please enter personal details exactly as printed on your official Passport.
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#075C4B]/10 text-[#075C4B]">
                      Step 1 of 4
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                        Full Name (as per Passport) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={primaryApplicant.fullName}
                        onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, fullName: e.target.value })}
                        placeholder="e.g. MOHAMED FAROOK"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#202522] outline-none bg-[#F8F7F3] uppercase tracking-wider transition-all ${
                          validationErrors.fullName ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-[#E5E5E0] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20'
                        }`}
                      />
                      {validationErrors.fullName && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {validationErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                        Surname / Family Name
                      </label>
                      <input
                        type="text"
                        value={primaryApplicant.surname}
                        onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, surname: e.target.value })}
                        placeholder="e.g. SYED"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E0] text-sm text-[#202522] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20 outline-none bg-[#F8F7F3] uppercase tracking-wider"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                        Father's / Husband's Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={primaryApplicant.fatherHusbandName}
                        onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, fatherHusbandName: e.target.value })}
                        placeholder="e.g. ABDUL RAHMAN"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#202522] outline-none bg-[#F8F7F3] uppercase tracking-wider transition-all ${
                          validationErrors.fatherHusbandName ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-[#E5E5E0] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20'
                        }`}
                      />
                      {validationErrors.fatherHusbandName && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {validationErrors.fatherHusbandName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-3 pt-1">
                        {['Male', 'Female'].map((g) => (
                          <label key={g} className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              checked={primaryApplicant.gender === g}
                              onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, gender: e.target.value })}
                              className="w-4 h-4 text-[#075C4B] focus:ring-[#075C4B]"
                            />
                            <span>{g}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                        Contact Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={primaryApplicant.contactNumber}
                        onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, contactNumber: e.target.value })}
                        placeholder="e.g. +91 94441 62963"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#202522] outline-none bg-[#F8F7F3] transition-all ${
                          validationErrors.contactNumber ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-[#E5E5E0] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20'
                        }`}
                      />
                      {validationErrors.contactNumber && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {validationErrors.contactNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block">
                          WhatsApp Number <span className="text-red-500">*</span>
                        </label>
                        <label className="flex items-center gap-1.5 text-[11px] text-[#075C4B] font-semibold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={sameAsContact}
                            onChange={(e) => setSameAsContact(e.target.checked)}
                            className="rounded text-[#075C4B] focus:ring-[#075C4B]"
                          />
                          <span>Same as Phone</span>
                        </label>
                      </div>
                      <input
                        type="tel"
                        required
                        disabled={sameAsContact}
                        value={primaryApplicant.whatsappNumber}
                        onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, whatsappNumber: e.target.value })}
                        placeholder="e.g. +91 94441 62963"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E0] text-sm text-[#202522] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20 outline-none bg-[#F8F7F3] disabled:opacity-75"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                      Present Residential Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={primaryApplicant.presentAddress}
                      onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, presentAddress: e.target.value })}
                      placeholder="e.g. No.41, Bharathidasan Salai, Cantonment, Trichy - 620001, Tamil Nadu"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#202522] outline-none bg-[#F8F7F3] transition-all ${
                        validationErrors.presentAddress ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-[#E5E5E0] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20'
                      }`}
                    />
                    {validationErrors.presentAddress && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {validationErrors.presentAddress}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={primaryApplicant.email}
                      onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, email: e.target.value })}
                      placeholder="e.g. pilgrim@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E0] text-sm text-[#202522] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20 outline-none bg-[#F8F7F3]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: PASSPORT & JOURNEY SELECTION */}
              {activeStep === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-[#E5E5E0] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold font-serif text-[#075C4B] flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-[#C9973D]" />
                        <span>Section 2: Passport & Journey Details</span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Provide official passport validity dates and select your target pilgrimage package.
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#075C4B]/10 text-[#075C4B]">
                      Step 2 of 4
                    </span>
                  </div>

                  {/* Passport Block */}
                  <div className="bg-[#F8F7F3] p-4 rounded-2xl border border-[#E5E5E0] space-y-4">
                    <h4 className="text-xs font-bold text-[#075C4B] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C9973D]" />
                      <span>Passport Information</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                          Passport Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={primaryApplicant.passportNumber}
                          onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, passportNumber: e.target.value })}
                          placeholder="e.g. Z1234567"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#202522] outline-none bg-white uppercase tracking-wider transition-all ${
                            validationErrors.passportNumber ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-[#E5E5E0] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20'
                          }`}
                        />
                        {validationErrors.passportNumber && (
                          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {validationErrors.passportNumber}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                          Date of Expiry <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={primaryApplicant.passportExpiryDate}
                          onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, passportExpiryDate: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#202522] outline-none bg-white transition-all ${
                            validationErrors.passportExpiryDate ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-[#E5E5E0] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20'
                          }`}
                        />
                        {validationErrors.passportExpiryDate && (
                          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {validationErrors.passportExpiryDate}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                          Date of Issue
                        </label>
                        <input
                          type="date"
                          value={primaryApplicant.passportIssueDate}
                          onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, passportIssueDate: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E0] text-sm text-[#202522] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20 outline-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                          Place of Issue
                        </label>
                        <input
                          type="text"
                          value={primaryApplicant.passportPlaceOfIssue}
                          onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, passportPlaceOfIssue: e.target.value })}
                          placeholder="e.g. TRICHY / CHENNAI"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E0] text-sm text-[#202522] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20 outline-none bg-white uppercase tracking-wider"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#E5E5E0] pt-3">
                      <div>
                        <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={primaryApplicant.dateOfBirth}
                          onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, dateOfBirth: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#202522] outline-none bg-white transition-all ${
                            validationErrors.dateOfBirth ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-[#E5E5E0] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20'
                          }`}
                        />
                        {validationErrors.dateOfBirth && (
                          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {validationErrors.dateOfBirth}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                          Place of Birth
                        </label>
                        <input
                          type="text"
                          value={primaryApplicant.placeOfBirth}
                          onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, placeOfBirth: e.target.value })}
                          placeholder="e.g. TRICHY"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E0] text-sm text-[#202522] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20 outline-none bg-white uppercase tracking-wider"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Journey & Package Selection Block */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-[#075C4B] uppercase tracking-wider">
                      Pilgrimage Journey & Package Preferences
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                          Application Type
                        </label>
                        <select
                          value={primaryApplicant.journeyType}
                          onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, journeyType: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E0] text-sm text-[#202522] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20 outline-none bg-[#F8F7F3]"
                        >
                          <option value="Umrah Pilgrimage">Umrah Pilgrimage</option>
                          <option value="Hajj 2027 Registration">Hajj 2027 Registration</option>
                          <option value="Ramadan Special Umrah">Ramadan Special Umrah</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                          Package Preference
                        </label>
                        <select
                          value={primaryApplicant.packageTier}
                          onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, packageTier: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E0] text-sm text-[#202522] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20 outline-none bg-[#F8F7F3]"
                        >
                          <option value="Premium Umrah Package">Premium Umrah Package (5★ Near Haram)</option>
                          <option value="Standard Umrah Package">Standard Umrah Package (4★ Hotel)</option>
                          <option value="Economy Umrah Package">Economy Umrah Package (Budget Friendly)</option>
                          <option value="Royal VIP Package">Royal VIP Package (Luxury GMC Transfers)</option>
                          <option value="Ramadan Full Month">Ramadan Full Month (30 Days)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                          Target Departure
                        </label>
                        <select
                          value={primaryApplicant.departureMonthYear}
                          onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, departureMonthYear: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E0] text-sm text-[#202522] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20 outline-none bg-[#F8F7F3]"
                        >
                          <option value="Immediate / Next Group Departure">Immediate / Next Group Departure</option>
                          <option value="Ramadan 2026">Ramadan 2026</option>
                          <option value="Shawwal 2026">Shawwal 2026</option>
                          <option value="Hajj Season 2027">Hajj Season 2027</option>
                          <option value="Custom Group Date">Custom Family Group Date</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: ACCOMPANYING TRAVELLERS */}
              {activeStep === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-[#E5E5E0] pb-3 flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-lg font-bold font-serif text-[#075C4B] flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#C9973D]" />
                        <span>Section 3: Accompanying Family / Group Travellers</span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Add family members or fellow pilgrims travelling together with you.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddTraveller}
                      className="px-3.5 py-2 rounded-xl bg-[#075C4B] hover:bg-[#084538] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#F5D58A]" />
                      <span>Add Traveller</span>
                    </button>
                  </div>

                  {travellers.length === 0 ? (
                    <div className="text-center py-10 px-4 rounded-2xl bg-[#F8F7F3] border-2 border-dashed border-[#E5E5E0] space-y-3">
                      <div className="w-12 h-12 rounded-full bg-white text-[#075C4B] border border-[#E5E5E0] flex items-center justify-center mx-auto shadow-xs">
                        <Users className="w-6 h-6 text-[#C9973D]" />
                      </div>
                      <h4 className="text-sm font-bold text-[#202522]">
                        No Accompanying Travellers Added Yet
                      </h4>
                      <p className="text-xs text-gray-500 max-w-md mx-auto">
                        If you are travelling with family members or friends, click below to add their names and passport details to this application.
                      </p>
                      <button
                        type="button"
                        onClick={handleAddTraveller}
                        className="px-4 py-2 rounded-xl bg-[#075C4B] text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm hover:bg-[#084538] cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-[#F5D58A]" />
                        <span>Add First Accompanying Traveller</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {travellers.map((traveller, index) => (
                        <div key={traveller.id} className="p-4 rounded-2xl bg-[#F8F7F3] border border-[#E5E5E0] relative space-y-3 animate-fade-in">
                          <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-2">
                            <span className="text-xs font-bold text-[#075C4B] uppercase tracking-wider flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-[#075C4B] text-white text-[10px] flex items-center justify-center font-bold">
                                {index + 1}
                              </span>
                              <span>Accompanying Traveller #{index + 1}</span>
                            </span>

                            <button
                              type="button"
                              onClick={() => handleRemoveTraveller(traveller.id)}
                              className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors text-xs font-medium flex items-center gap-1 cursor-pointer"
                              title="Remove Traveller"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="hidden sm:inline">Remove</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-bold text-[#202522] uppercase tracking-wide block mb-1">
                                Full Name (as per Passport)
                              </label>
                              <input
                                type="text"
                                value={traveller.fullName}
                                onChange={(e) => handleTravellerChange(traveller.id, 'fullName', e.target.value)}
                                placeholder="e.g. FATHIMA SYED"
                                className="w-full px-3 py-2 rounded-xl border border-[#E5E5E0] text-xs text-[#202522] focus:border-[#075C4B] outline-none bg-white uppercase tracking-wider"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-[#202522] uppercase tracking-wide block mb-1">
                                Relationship with Primary Applicant
                              </label>
                              <select
                                value={traveller.relationship}
                                onChange={(e) => handleTravellerChange(traveller.id, 'relationship', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-[#E5E5E0] text-xs text-[#202522] focus:border-[#075C4B] outline-none bg-white"
                              >
                                <option value="Wife">Wife</option>
                                <option value="Husband">Husband</option>
                                <option value="Son">Son</option>
                                <option value="Daughter">Daughter</option>
                                <option value="Father">Father</option>
                                <option value="Mother">Mother</option>
                                <option value="Brother">Brother</option>
                                <option value="Sister">Sister</option>
                                <option value="Relative">Relative</option>
                                <option value="Friend">Friend / Fellow Pilgrim</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="text-[11px] font-bold text-[#202522] uppercase tracking-wide block mb-1">
                                Gender
                              </label>
                              <select
                                value={traveller.gender}
                                onChange={(e) => handleTravellerChange(traveller.id, 'gender', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-[#E5E5E0] text-xs text-[#202522] focus:border-[#075C4B] outline-none bg-white"
                              >
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-[#202522] uppercase tracking-wide block mb-1">
                                Age / Date of Birth
                              </label>
                              <input
                                type="text"
                                value={traveller.ageOrDob}
                                onChange={(e) => handleTravellerChange(traveller.id, 'ageOrDob', e.target.value)}
                                placeholder="e.g. 42 Yrs or 15/08/1984"
                                className="w-full px-3 py-2 rounded-xl border border-[#E5E5E0] text-xs text-[#202522] focus:border-[#075C4B] outline-none bg-white"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-[#202522] uppercase tracking-wide block mb-1">
                                Passport Number
                              </label>
                              <input
                                type="text"
                                value={traveller.passportNumber}
                                onChange={(e) => handleTravellerChange(traveller.id, 'passportNumber', e.target.value)}
                                placeholder="e.g. Z9876543"
                                className="w-full px-3 py-2 rounded-xl border border-[#E5E5E0] text-xs text-[#202522] focus:border-[#075C4B] outline-none bg-white uppercase tracking-wider"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: REVIEW & DECLARATION */}
              {activeStep === 4 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-[#E5E5E0] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold font-serif text-[#075C4B] flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-[#C9973D]" />
                        <span>Section 4: Application Review & Consent Declaration</span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Verify all submitted details before sending your official application to As-Safar.
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#075C4B]/10 text-[#075C4B]">
                      Final Step
                    </span>
                  </div>

                  {/* Summary Review Card */}
                  <div className="bg-[#F8F7F3] p-5 rounded-2xl border border-[#E5E5E0] space-y-4 text-xs font-sans">
                    <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-3">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#075C4B] block">
                          Pilgrimage & Package:
                        </span>
                        <span className="text-sm font-bold text-[#202522]">
                          {primaryApplicant.journeyType} — {primaryApplicant.packageTier}
                        </span>
                        <span className="text-xs text-gray-500 block">
                          Target Departure: {primaryApplicant.departureMonthYear}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="font-bold text-[#075C4B] uppercase text-[11px]">Primary Applicant:</p>
                        <p><strong>Name:</strong> {primaryApplicant.fullName || 'N/A'} {primaryApplicant.surname}</p>
                        <p><strong>Father/Husband:</strong> {primaryApplicant.fatherHusbandName || 'N/A'}</p>
                        <p><strong>Gender:</strong> {primaryApplicant.gender} | <strong>DOB:</strong> {primaryApplicant.dateOfBirth || 'N/A'}</p>
                        <p><strong>Phone:</strong> {primaryApplicant.contactNumber || 'N/A'}</p>
                        <p><strong>Address:</strong> {primaryApplicant.presentAddress || 'N/A'}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="font-bold text-[#075C4B] uppercase text-[11px]">Passport Credentials:</p>
                        <p><strong>Passport No:</strong> {primaryApplicant.passportNumber || 'N/A'}</p>
                        <p><strong>Date of Expiry:</strong> {primaryApplicant.passportExpiryDate || 'N/A'}</p>
                        <p><strong>Place of Issue:</strong> {primaryApplicant.passportPlaceOfIssue || 'N/A'}</p>
                        <p><strong>Accompanying Travellers:</strong> {travellers.length} Member(s)</p>
                      </div>
                    </div>

                    {travellers.length > 0 && (
                      <div className="border-t border-[#E5E5E0] pt-3">
                        <p className="font-bold text-[#075C4B] uppercase text-[11px] mb-1">Accompanying Travellers List:</p>
                        <div className="space-y-1">
                          {travellers.map((t, idx) => (
                            <p key={t.id} className="text-gray-700">
                              {idx + 1}. <strong>{t.fullName || 'Unnamed'}</strong> ({t.relationship}, {t.gender}) — Passport: {t.passportNumber || 'Pending'}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Special Notes */}
                  <div>
                    <label className="text-xs font-bold text-[#202522] uppercase tracking-wide block mb-1">
                      Special Requests / Dietary / Elder Care Requirements
                    </label>
                    <textarea
                      rows={2}
                      value={primaryApplicant.specialNotes}
                      onChange={(e) => setPrimaryApplicant({ ...primaryApplicant, specialNotes: e.target.value })}
                      placeholder="e.g. Wheelchair assistance required in Makkah, Ground floor room preference, Child cot..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E0] text-sm text-[#202522] focus:border-[#075C4B] focus:ring-2 focus:ring-[#075C4B]/20 outline-none bg-[#F8F7F3]"
                    />
                  </div>

                  {/* Declaration & Consent Checkbox */}
                  <div className="p-4 rounded-2xl bg-[#075C4B]/5 border border-[#075C4B]/20 space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 text-[#075C4B] rounded focus:ring-[#075C4B]"
                      />
                      <span className="text-xs text-[#202522] leading-relaxed">
                        <strong>Declaration & Agreement:</strong> I hereby declare that all information supplied in this Hajj & Umrah application form is true, accurate, and matches our official Passports. I authorize As-Safar Hajj & Umrah Services to initiate visa processing, travel booking, and advisory contact.
                      </span>
                    </label>

                    {validationErrors.terms && (
                      <p className="text-[11px] text-red-500 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {validationErrors.terms}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ================= CONTROLS & SUBMIT BUTTON BAR ================= */}
              <div className="pt-4 border-t border-[#E5E5E0] flex items-center justify-between gap-3">
                {activeStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-2.5 rounded-xl border border-[#E5E5E0] text-[#202522] hover:bg-[#F8F7F3] font-bold text-xs uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl text-gray-500 hover:text-gray-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                )}

                <div className="flex items-center gap-2">
                  {activeStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-2.5 rounded-xl bg-[#075C4B] hover:bg-[#084538] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-md transition-all cursor-pointer"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4 text-[#F5D58A]" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!agreedToTerms}
                      className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Submit Application via WhatsApp</span>
                    </button>
                  )}
                </div>
              </div>

            </form>
          )}

        </div>

        {/* ================= PRINT PREVIEW STYLES (HIDDEN UNLESS PRINTING) ================= */}
        <div className="hidden print:block print:fixed print:inset-0 print:bg-white print:p-8 print:z-[9999] text-black">
          <div className="border-2 border-[#075C4B] p-6 space-y-4">
            <div className="text-center border-b pb-4">
              <h1 className="text-2xl font-bold uppercase text-[#075C4B]">AS-SAFAR HAJJ & UMRAH SERVICES</h1>
              <p className="text-xs">Trichy, Tamil Nadu · Reg No: TN03786327/Cat-II/29848/2027</p>
              <h2 className="text-lg font-bold mt-2 underline">HAJJ & UMRAH APPLICATION FORM</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p><strong>Primary Applicant:</strong> {primaryApplicant.fullName} {primaryApplicant.surname}</p>
                <p><strong>Father/Husband Name:</strong> {primaryApplicant.fatherHusbandName}</p>
                <p><strong>Gender:</strong> {primaryApplicant.gender} | <strong>DOB:</strong> {primaryApplicant.dateOfBirth}</p>
                <p><strong>Phone:</strong> {primaryApplicant.contactNumber}</p>
                <p><strong>Address:</strong> {primaryApplicant.presentAddress}</p>
              </div>

              <div>
                <p><strong>Passport Number:</strong> {primaryApplicant.passportNumber}</p>
                <p><strong>Expiry Date:</strong> {primaryApplicant.passportExpiryDate}</p>
                <p><strong>Journey Selection:</strong> {primaryApplicant.journeyType}</p>
                <p><strong>Package Tier:</strong> {primaryApplicant.packageTier}</p>
              </div>
            </div>

            {travellers.length > 0 && (
              <div className="border-t pt-2 text-xs">
                <p className="font-bold mb-1">Accompanying Travellers ({travellers.length}):</p>
                <table className="w-full border-collapse border border-gray-300 text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-1">#</th>
                      <th className="border border-gray-300 p-1">Name</th>
                      <th className="border border-gray-300 p-1">Relation</th>
                      <th className="border border-gray-300 p-1">Gender</th>
                      <th className="border border-gray-300 p-1">Passport No</th>
                    </tr>
                  </thead>
                  <tbody>
                    {travellers.map((t, idx) => (
                      <tr key={t.id}>
                        <td className="border border-gray-300 p-1">{idx + 1}</td>
                        <td className="border border-gray-300 p-1">{t.fullName}</td>
                        <td className="border border-gray-300 p-1">{t.relationship}</td>
                        <td className="border border-gray-300 p-1">{t.gender}</td>
                        <td className="border border-gray-300 p-1">{t.passportNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="border-t pt-8 mt-12 flex justify-between text-xs font-bold">
              <div>Applicant Signature: _______________________</div>
              <div>Authorized As-Safar Seal & Signature</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
