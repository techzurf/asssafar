import React, { useState, useEffect, useCallback } from 'react';
import { 
  Megaphone, 
  Save, 
  RotateCcw, 
  Phone, 
  Calendar, 
  Clock, 
  AlertCircle, 
  Check, 
  Eye, 
  Info, 
  Loader2, 
  Database,
  CheckCircle2,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { AnnouncementConfigState } from '../types/adminTypes';
import { useAdminAuth } from '../auth/AdminAuthContext';
import { 
  fetchAnnouncementSettings, 
  saveAnnouncementSettings,
  ANNOUNCEMENT_SETTINGS_TABLE,
  ANNOUNCEMENT_SETTINGS_ID 
} from '../../services/announcementService';

interface AnnouncementViewProps {
  initialConfig: AnnouncementConfigState;
  onSave: (newConfig: AnnouncementConfigState) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

interface ValidationErrors {
  prefixBadge?: string;
  announcementText?: string;
  departureDate?: string;
  departureTime?: string;
  contactNumber?: string;
}

export const AnnouncementView: React.FC<AnnouncementViewProps> = ({
  initialConfig,
  onSave,
  onShowToast,
}) => {
  const { user } = useAdminAuth();

  // The last persisted configuration from Supabase
  const [savedConfig, setSavedConfig] = useState<AnnouncementConfigState>({ ...initialConfig });

  // Local form state for draft edits
  const [formData, setFormData] = useState<AnnouncementConfigState>({ ...initialConfig });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Async States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isTableMissing, setIsTableMissing] = useState<boolean>(false);
  const [isRowMissing, setIsRowMissing] = useState<boolean>(false);
  const [isDbConnected, setIsDbConnected] = useState<boolean>(false);

  // Load saved settings from Supabase on mount or retry
  const loadSavedSettings = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const result = await fetchAnnouncementSettings();
      
      setIsTableMissing(Boolean(result.isTableMissing));
      setIsRowMissing(Boolean(result.isRowMissing));
      setIsDbConnected(Boolean(result.isFromDatabase));

      if (result.error && !result.isTableMissing && !result.isRowMissing) {
        setFetchError(result.error);
      } else {
        setFetchError(null);
      }

      setSavedConfig(result.data);
      setFormData(result.data);
      setHasUnsavedChanges(false);
      // NOTE: Do not invoke onSave here! Calling parent state update during initial load
      // creates re-render cascades. onSave is strictly invoked upon successful manual save.
    } catch (err: any) {
      console.error('Failed to load announcement settings:', err);
      setFetchError(err?.message || 'An unexpected error occurred while loading settings.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Run on mount
  useEffect(() => {
    loadSavedSettings();
  }, [loadSavedSettings]);

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.prefixBadge.trim()) {
      newErrors.prefixBadge = 'Highlighted title / badge text is required.';
    }
    if (!formData.announcementText.trim()) {
      newErrors.announcementText = 'Announcement text description is required.';
    }
    if (!formData.departureDate.trim()) {
      newErrors.departureDate = 'Departure date is required.';
    }
    if (!formData.departureTime.trim()) {
      newErrors.departureTime = 'Departure time is required.';
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact phone number is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof AnnouncementConfigState, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'contactNumber' ? { contactTel: value.replace(/[^\d+]/g, '') } : {}),
    }));
    setHasUnsavedChanges(true);

    // Clear specific error if fixed
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleToggleActive = () => {
    const nextState = !formData.isActive;
    handleChange('isActive', nextState);
  };

  // Reset button restores the LAST SAVED settings without modifying database content
  const handleReset = () => {
    setFormData({ ...savedConfig });
    setErrors({});
    setHasUnsavedChanges(false);
    onShowToast('Draft Reset', 'Form restored to previously saved database configuration.', 'info');
  };

  // Save changes to Supabase
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      onShowToast('Validation Failed', 'Please fix the highlighted required fields.', 'warning');
      return;
    }

    setIsSaving(true);
    try {
      const result = await saveAnnouncementSettings(formData, user?.email);

      if (result.success && result.data) {
        setSavedConfig(result.data);
        setFormData(result.data);
        setHasUnsavedChanges(false);
        setIsDbConnected(true);
        setIsRowMissing(false);
        setIsTableMissing(false);
        setFetchError(null);
        onSave(result.data);
        onShowToast(
          'Changes Saved',
          'Announcement bar settings successfully updated in Supabase and live on the public website.',
          'success'
        );
      } else {
        if (result.isTableMissing) {
          setIsTableMissing(true);
        }
        onShowToast(
          'Failed to Save',
          result.error || 'Could not save to Supabase. Check database permissions.',
          'warning'
        );
      }
    } catch (err: any) {
      onShowToast('Error', err?.message || 'An error occurred while saving.', 'warning');
    } finally {
      setIsSaving(false);
    }
  };

  // Loading Screen: shown ONLY during initial fetch
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs space-y-3">
        <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin mx-auto" />
        <h3 className="text-sm font-bold text-slate-800">Fetching Announcement Settings</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Connecting to Supabase table <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">{ANNOUNCEMENT_SETTINGS_TABLE}</code>...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Network / Query Error Callout with Retry */}
      {fetchError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-xs text-red-900 leading-relaxed flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="font-bold">Database Connection Notice</p>
              <button
                type="button"
                onClick={loadSavedSettings}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white border border-red-300 text-red-800 hover:bg-red-100 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
            <p className="text-red-700 mt-1">{fetchError}</p>
            <p className="text-red-600/80 mt-1">
              Safe default values are loaded below so you can still review and edit. Click <strong>Retry</strong> once connectivity is restored.
            </p>
          </div>
        </div>
      )}

      {/* 2. Table Missing Callout */}
      {isTableMissing && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <Database className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed flex-1">
            <div className="flex items-center justify-between">
              <p className="font-bold">Database Migration Required: Table &apos;{ANNOUNCEMENT_SETTINGS_TABLE}&apos;</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-800">
                Action Needed
              </span>
            </div>
            <p className="text-amber-800 mt-1">
              The Supabase database has not had the <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-semibold">{ANNOUNCEMENT_SETTINGS_TABLE}</code> table created yet.
              Please run the provided SQL migration in your <strong>Supabase Dashboard &gt; SQL Editor</strong> to enable database persistence.
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <button
                type="button"
                onClick={loadSavedSettings}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-check Database</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Row Missing Callout (Table exists, but 'current' row has not yet been initialized) */}
      {isRowMissing && !isTableMissing && !fetchError && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed flex-1">
            <div className="flex items-center justify-between">
              <p className="font-bold">Unsaved Default Settings Loaded</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-800">
                Not Saved in Database
              </span>
            </div>
            <p className="text-amber-800 mt-1">
              The table exists, but no record with <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-semibold">id = &apos;{ANNOUNCEMENT_SETTINGS_ID}&apos;</code> was found. Default values are loaded below.
              Click <strong>Save Changes</strong> to initialize and save this announcement configuration to Supabase.
            </p>
          </div>
        </div>
      )}

      {/* 4. Connected State Callout */}
      {isDbConnected && !fetchError && !isTableMissing && !isRowMissing && (
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 flex items-start gap-3">
          <Database className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
          <div className="text-xs text-blue-900 leading-relaxed flex-1">
            <div className="flex items-center justify-between">
              <p className="font-bold flex items-center gap-1.5">
                <span>Supabase Live Announcement Integration</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  RLS Protected
                </span>
              </p>
              <button
                type="button"
                onClick={loadSavedSettings}
                title="Refresh from Supabase"
                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100/60 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-blue-800/90 mt-0.5">
              Updates saved here persist in the Supabase <code className="bg-blue-100/80 px-1 py-0.5 rounded font-mono font-bold">{ANNOUNCEMENT_SETTINGS_TABLE}</code> table and immediately update the public website announcement bar.
            </p>
          </div>
        </div>
      )}

      {/* Live Preview Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:px-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#2563EB]" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Live Announcement Bar Preview
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 hidden sm:inline">Status:</span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                formData.isActive
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-200 text-slate-700 border border-slate-300'
              }`}
            >
              {formData.isActive ? 'Active (Visible)' : 'Disabled (Hidden)'}
            </span>
          </div>
        </div>

        {/* The Live Rendered Bar */}
        <div className="p-4 bg-slate-100/80">
          <p className="text-[11px] text-slate-500 mb-2 font-medium">
            Simulated website header marquee:
          </p>

          {formData.isActive ? (
            <div className="relative w-full overflow-hidden bg-[#073E32] border border-[#0B5D4B] rounded-lg h-10 flex items-center shadow-inner">
              {/* Fade Edges */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#073E32] to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#073E32] to-transparent z-10" />

              {/* Scrolling Track */}
              <div className="animate-announcement-marquee flex items-center whitespace-nowrap text-xs text-white">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-flex items-center px-4">
                    <span className="mr-1.5 text-sm" aria-hidden="true">🕋</span>
                    <span className="font-bold text-[#FFCE1B] uppercase text-[11px]">
                      {formData.prefixBadge || 'NEXT UMRAH GROUP DEPARTURE'}
                    </span>
                    <span className="text-[#C9A24D] mx-2.5 font-light">|</span>
                    <span className="text-[#EAF3EF]/90 text-[11px]">
                      Departure Date: <strong className="text-white font-bold bg-white/10 px-1 py-0.5 rounded text-[11px] border border-white/20 tabular-nums">{formData.departureDate || 'Pending'}</strong>
                    </span>
                    <span className="text-[#C9A24D] mx-2.5 font-light">|</span>
                    <span className="text-[#EAF3EF]/90 text-[11px]">
                      Time: <strong className="text-white font-bold bg-white/10 px-1 py-0.5 rounded text-[11px] border border-white/20 tabular-nums">{formData.departureTime || 'Pending'}</strong>
                    </span>
                    <span className="text-[#C9A24D] mx-2.5 font-light">|</span>
                    <span className="text-[#EAF3EF]/90 text-[11px] inline-flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#C9A24D]" />
                      <span>Contact:</span>
                      <strong className="text-[#FFCE1B] font-bold underline decoration-[#C9A24D]/60 tabular-nums">
                        {formData.contactNumber || '+91 95663 69654'}
                      </strong>
                    </span>
                    <span className="text-[#C9A24D] mx-6 text-xs font-bold">✦</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full bg-slate-200/90 border border-slate-300 rounded-lg p-3 text-center text-xs text-slate-600 font-medium">
              Announcement bar is currently toggled <strong className="text-slate-800">OFF</strong>. It will be hidden on the public website.
            </div>
          )}
        </div>
      </div>

      {/* Main Edit Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Announcement Content Settings
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure the exact departure details and promotional text shown in the top header.
            </p>
          </div>

          {/* Master Enable/Disable Toggle */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2 rounded-xl">
            <span className="text-xs font-bold text-slate-700">Display Bar:</span>
            <button
              type="button"
              role="switch"
              aria-checked={formData.isActive}
              onClick={handleToggleActive}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 ${
                formData.isActive ? 'bg-[#16A34A]' : 'bg-slate-300'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  formData.isActive ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-semibold ${formData.isActive ? 'text-emerald-700' : 'text-slate-500'}`}>
              {formData.isActive ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Highlighted Announcement Text (Prefix Badge) */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Highlighted Title / Tagline Badge <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.prefixBadge}
              onChange={(e) => handleChange('prefixBadge', e.target.value)}
              placeholder="e.g., NEXT UMRAH GROUP DEPARTURE"
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.prefixBadge
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-slate-300 focus:ring-[#2563EB] focus:border-[#2563EB]'
              }`}
            />
            {errors.prefixBadge ? (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.prefixBadge}</span>
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1">
                Appears in gold next to the Kaaba icon in the marquee.
              </p>
            )}
          </div>

          {/* Editable Announcement Text */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Extended Announcement Message / Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.announcementText}
              onChange={(e) => handleChange('announcementText', e.target.value)}
              placeholder="e.g., Direct Flight Trichy to Jeddah · 15 Days Guided Pilgrimage with South Indian Catering"
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.announcementText
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-slate-300 focus:ring-[#2563EB] focus:border-[#2563EB]'
              }`}
            />
            {errors.announcementText ? (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.announcementText}</span>
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1">
                Full description of the group departure, airline route, or pilgrimage details.
              </p>
            )}
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Departure Date Text <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.departureDate}
                onChange={(e) => handleChange('departureDate', e.target.value)}
                placeholder="e.g., 12 November 2026"
                className={`w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.departureDate
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-slate-300 focus:ring-[#2563EB] focus:border-[#2563EB]'
                }`}
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            </div>
            {errors.departureDate && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.departureDate}</span>
              </p>
            )}
          </div>

          {/* Departure Time */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Departure Time Text <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.departureTime}
                onChange={(e) => handleChange('departureTime', e.target.value)}
                placeholder="e.g., 04:30 AM IST"
                className={`w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.departureTime
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-slate-300 focus:ring-[#2563EB] focus:border-[#2563EB]'
                }`}
              />
              <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            </div>
            {errors.departureTime && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.departureTime}</span>
              </p>
            )}
          </div>

          {/* Contact Number */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Contact Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.contactNumber}
                onChange={(e) => handleChange('contactNumber', e.target.value)}
                placeholder="e.g., +91 95663 69654"
                className={`w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.contactNumber
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-slate-300 focus:ring-[#2563EB] focus:border-[#2563EB]'
                }`}
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            </div>
            {errors.contactNumber && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.contactNumber}</span>
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            {hasUnsavedChanges && (
              <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                <AlertCircle className="w-3.5 h-3.5" />
                Unsaved modifications in draft
              </span>
            )}
            {!hasUnsavedChanges && (
              <span className="text-[11px] text-slate-400">
                Database state: <strong className="text-slate-600">{savedConfig.lastUpdated || 'Not saved'}</strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReset}
              disabled={isSaving}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset</span>
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#2563EB] hover:bg-blue-700 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving to Supabase...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
