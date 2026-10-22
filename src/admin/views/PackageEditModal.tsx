import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  AlertCircle, 
  Package, 
  Hotel, 
  Bus, 
  Utensils, 
  Clock, 
  IndianRupee, 
  Image as ImageIcon 
} from 'lucide-react';
import { AdminPackageItem, PackageCategory, PackageStatus } from '../types/adminTypes';

interface PackageEditModalProps {
  isOpen: boolean;
  packageToEdit: AdminPackageItem | null; // null means Add Package
  onClose: () => void;
  onSave: (pkg: AdminPackageItem) => void;
}

interface PackageErrors {
  name?: string;
  price?: string;
  duration?: string;
  shortDescription?: string;
  makkahHotel?: string;
  madinahHotel?: string;
  transport?: string;
  meals?: string;
}

export const PackageEditModal: React.FC<PackageEditModalProps> = ({
  isOpen,
  packageToEdit,
  onClose,
  onSave,
}) => {
  const isEditing = !!packageToEdit;

  const defaultValues: AdminPackageItem = {
    id: `pkg-${Date.now()}`,
    name: '',
    category: 'standard',
    price: '',
    duration: '',
    shortDescription: '',
    makkahHotel: '',
    madinahHotel: '',
    transport: 'Air-conditioned luxury group coach with experienced drivers',
    meals: '3 South Indian buffet meals daily (Breakfast, Lunch, Dinner)',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80',
    updatedAt: 'Just now',
  };

  const [formData, setFormData] = useState<AdminPackageItem>(defaultValues);
  const [errors, setErrors] = useState<PackageErrors>({});

  useEffect(() => {
    if (packageToEdit) {
      setFormData({ ...packageToEdit });
    } else {
      setFormData({ ...defaultValues, id: `pkg-${Date.now()}` });
    }
    setErrors({});
  }, [packageToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: PackageErrors = {};
    if (!formData.name.trim()) errs.name = 'Package name is required.';
    if (!formData.price.trim()) errs.price = 'Price per person is required.';
    if (!formData.duration.trim()) errs.duration = 'Package duration is required.';
    if (!formData.shortDescription.trim()) errs.shortDescription = 'Short description is required.';
    if (!formData.makkahHotel.trim()) errs.makkahHotel = 'Makkah hotel details are required.';
    if (!formData.madinahHotel.trim()) errs.madinahHotel = 'Madinah hotel details are required.';
    if (!formData.transport.trim()) errs.transport = 'Transport details are required.';
    if (!formData.meals.trim()) errs.meals = 'Meals information is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...formData,
      updatedAt: 'Just now (Mock Session)',
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="package-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-[#2563EB] rounded-xl">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 id="package-modal-title" className="text-base font-bold text-slate-900">
                {isEditing ? 'Edit Umrah Package' : 'Add New Umrah Package'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEditing ? 'Modify existing package inclusions and pricing' : 'Configure a new travel offering'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Row 1: Name and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Package Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Economy Umrah Package"
                className={`w-full px-3.5 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.name ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-[#2563EB]'
                }`}
              />
              {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as PackageCategory })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option value="economy">Economy</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          {/* Row 2: Price, Duration, Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Price Per Person <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g., ₹84,500"
                  className={`w-full pl-8 pr-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.price ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-[#2563EB]'
                  }`}
                />
                <IndianRupee className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
              {errors.price && <p className="text-[11px] text-red-600 mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Duration <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 14 Days (7 M + 7 M)"
                  className={`w-full pl-8 pr-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.duration ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-[#2563EB]'
                  }`}
                />
                <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
              {errors.duration && <p className="text-[11px] text-red-600 mt-1">{errors.duration}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as PackageStatus })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option value="active">Active (Visible)</option>
                <option value="inactive">Inactive (Hidden)</option>
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Short Description / Tagline <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Brief overview of package benefits, audience and key highlights..."
              className={`w-full px-3.5 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.shortDescription ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-[#2563EB]'
              }`}
            />
            {errors.shortDescription && <p className="text-[11px] text-red-600 mt-1">{errors.shortDescription}</p>}
          </div>

          {/* Hotels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Makkah Hotel & Proximity <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.makkahHotel}
                  onChange={(e) => setFormData({ ...formData, makkahHotel: e.target.value })}
                  placeholder="e.g., Dar Al Eiman Al Khalil (3★, 550m)"
                  className={`w-full pl-8 pr-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.makkahHotel ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-[#2563EB]'
                  }`}
                />
                <Hotel className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
              {errors.makkahHotel && <p className="text-[11px] text-red-600 mt-1">{errors.makkahHotel}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Madinah Hotel & Proximity <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.madinahHotel}
                  onChange={(e) => setFormData({ ...formData, madinahHotel: e.target.value })}
                  placeholder="e.g., Al Eiman Taibah (3★, 350m)"
                  className={`w-full pl-8 pr-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.madinahHotel ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-[#2563EB]'
                  }`}
                />
                <Hotel className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
              {errors.madinahHotel && <p className="text-[11px] text-red-600 mt-1">{errors.madinahHotel}</p>}
            </div>
          </div>

          {/* Transport & Meals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Transport Details <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.transport}
                  onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
                  placeholder="e.g., Air-conditioned luxury coach"
                  className={`w-full pl-8 pr-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.transport ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-[#2563EB]'
                  }`}
                />
                <Bus className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
              {errors.transport && <p className="text-[11px] text-red-600 mt-1">{errors.transport}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Meals Information <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.meals}
                  onChange={(e) => setFormData({ ...formData, meals: e.target.value })}
                  placeholder="e.g., 3 South Indian buffet meals daily"
                  className={`w-full pl-8 pr-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.meals ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-[#2563EB]'
                  }`}
                />
                <Utensils className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
              {errors.meals && <p className="text-[11px] text-red-600 mt-1">{errors.meals}</p>}
            </div>
          </div>

          {/* Image URL with Preview */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Package Image Preview URL
            </label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
                <ImageIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
              {formData.imageUrl && (
                <div className="w-12 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                  <img
                    src={formData.imageUrl}
                    alt="Preview thumbnail"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Save Package' : 'Create Package'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
