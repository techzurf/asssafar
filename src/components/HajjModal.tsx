import React from 'react';
import { X, Moon, ShieldCheck, CheckCircle2, Phone, MessageCircle, AlertCircle } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

interface HajjModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquiry: () => void;
}

export const HajjModal: React.FC<HajjModalProps> = ({ isOpen, onClose, onOpenEnquiry }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#FFFFFF] w-full max-w-xl rounded-3xl shadow-2xl border border-[#0B5D4B]/20 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0B5D4B] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Hajj dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A24D] text-[#073E32] text-xs font-bold mb-2">
            <Moon className="w-3.5 h-3.5 fill-[#073E32]" />
            <span>Hajj 2026 / 1447H Pre-Registration</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Sacred Hajj Pilgrimage with As-Safar
          </h3>
          <p className="text-xs sm:text-sm text-[#EAF3EF]/90 mt-1">
            Complete advisory & official Nusuk platform support from our Trichy office.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 bg-[#F5F3EE] text-sm text-[#202522]">
          <div className="p-4 rounded-2xl bg-white border border-[#E5E5E0] space-y-2">
            <h4 className="font-bold text-base text-[#202522] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C9A24D]" />
              <span>Official Government & Nusuk Guidance</span>
            </h4>
            <p className="text-xs text-[#555555] leading-relaxed">
              Hajj registration is governed by the Ministry of Hajj & Umrah (KSA) and the Haj Committee of India / Nusuk platform. As-Safar provides full technical support in Trichy to register your family, upload biometric documents, and select verified luxury Mina & Arafat camps.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#202522]">
              What As-Safar Provides For Hajj Pilgrims:
            </p>
            <div className="space-y-2 text-xs">
              {[
                'Nusuk Hajj portal profiling and biometric document review',
                'Comprehensive 4-day intensive Hajj training workshop in Trichy',
                'Air-conditioned VIP upgraded tents in Mina (Zone 1/2 close to Jamarat)',
                'Dedicated Tamil-speaking Muftis for all Manasik-e-Hajj rituals',
                'Direct flights from Trichy / Chennai with personalized luggage tagging',
                'Continuous doctor & medical care accompaniment',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-[#E5E5E0]">
                  <CheckCircle2 className="w-4 h-4 text-[#0B5D4B] shrink-0 mt-0.5" />
                  <span className="leading-snug text-[#202522]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-[#E5E5E0] text-xs text-[#0B5D4B] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#C9A24D] shrink-0" />
            <span className="text-[#202522] font-medium">Pre-registration for upcoming slots is currently open for Trichy families.</span>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenEnquiry();
              }}
              className="w-full sm:flex-1 bg-[#0B5D4B] hover:bg-[#084538] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Submit Hajj Pre-Registration</span>
            </button>

            <a
              href={`tel:${BRAND_INFO.phoneTel}`}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-[#E5E5E0] text-[#202522] hover:bg-white hover:text-[#0B5D4B] font-bold text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C9A24D]" />
              <span>Call Counselor</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
