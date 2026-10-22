import React from 'react';
import { 
  X, 
  Hotel, 
  Bus, 
  Utensils, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar,
  IndianRupee 
} from 'lucide-react';
import { AdminPackageItem } from '../types/adminTypes';

interface PackagePreviewModalProps {
  isOpen: boolean;
  packageItem: AdminPackageItem | null;
  onClose: () => void;
  onEdit: (pkg: AdminPackageItem) => void;
}

export const PackagePreviewModal: React.FC<PackagePreviewModalProps> = ({
  isOpen,
  packageItem,
  onClose,
  onEdit,
}) => {
  if (!isOpen || !packageItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="package-preview-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
    >
      <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Image / Header Banner */}
        <div className="relative h-48 bg-slate-900 overflow-hidden">
          {packageItem.imageUrl ? (
            <img
              src={packageItem.imageUrl}
              alt={packageItem.name}
              className="w-full h-full object-cover opacity-85"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0B5D4B] to-[#083E32] flex items-center justify-center text-white/50">
              <span>As-Safar Pilgrimage Experience</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
            aria-label="Close preview"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Status & Category Tag */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs border border-white/30">
                {packageItem.category} Umrah
              </span>
              <h3 id="package-preview-title" className="text-lg font-bold text-white mt-1 leading-tight">
                {packageItem.name}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-white/80">Starting from</span>
              <p className="text-lg font-extrabold text-[#F5D58A] font-mono tabular-nums leading-tight">
                {packageItem.price}
              </p>
            </div>
          </div>
        </div>

        {/* Details Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Status Bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="text-slate-500">Current Visibility:</span>
            <span
              className={`font-semibold inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${
                packageItem.status === 'active'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${packageItem.status === 'active' ? 'bg-emerald-600' : 'bg-slate-500'}`} />
              {packageItem.status === 'active' ? 'Active on Public Site' : 'Inactive / Draft'}
            </span>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Description
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {packageItem.shortDescription}
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Duration</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">{packageItem.duration}</p>
            </div>

            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                <Bus className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Transport</span>
              </div>
              <p className="text-xs text-slate-600 truncate">{packageItem.transport}</p>
            </div>
          </div>

          {/* Accommodations */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Hotel Accommodations
            </h4>
            <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Hotel className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">Makkah: </span>
                  <span className="text-slate-600">{packageItem.makkahHotel}</span>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-slate-100">
                <Hotel className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">Madinah: </span>
                  <span className="text-slate-600">{packageItem.madinahHotel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Meals */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Food & Catering
            </h4>
            <div className="flex items-start gap-2 p-3 rounded-xl border border-slate-200 bg-white text-xs">
              <Utensils className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-slate-600 leading-relaxed">{packageItem.meals}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Updated: {packageItem.updatedAt}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(packageItem);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              Edit Package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
