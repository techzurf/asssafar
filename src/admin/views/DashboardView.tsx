import React from 'react';
import { 
  Megaphone, 
  Package, 
  Clock, 
  ArrowRight, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Building2,
  Phone,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { AnnouncementConfigState, AdminPackageItem, AdminActivityLog, AdminTab } from '../types/adminTypes';

interface DashboardViewProps {
  announcement: AnnouncementConfigState;
  packages: AdminPackageItem[];
  activities: AdminActivityLog[];
  onNavigateTab: (tab: AdminTab) => void;
  onOpenAddPackage: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  announcement,
  packages,
  activities,
  onNavigateTab,
  onOpenAddPackage,
}) => {
  const activePackagesCount = packages.filter((p) => p.status === 'active').length;
  const totalPackagesCount = packages.length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
              Travel Management Portal
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">Trichy Office</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            As-Safar Admin Dashboard
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Manage your public announcement schedules, departure notices, and Umrah travel packages from this central operations workspace.
          </p>
        </div>

        {/* Status Notice Capsule */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>System Operational</span>
            </div>
            <p className="text-[11px] text-emerald-700/90 mt-0.5">
              Live updates synced across website & portal
            </p>
          </div>
        </div>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Announcement Bar Status */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Announcement Bar
            </span>
            <div className={`p-2 rounded-xl ${announcement.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
              <Megaphone className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">
              {announcement.isActive ? 'Active' : 'Inactive'}
            </span>
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
              announcement.isActive 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}>
              {announcement.isActive ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Live on website
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 text-slate-500" />
                  Hidden
                </>
              )}
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-2 truncate">
            Departure: <strong className="text-slate-700 font-semibold">{announcement.departureDate}</strong> ({announcement.departureTime})
          </p>

          <button
            type="button"
            onClick={() => onNavigateTab('announcement')}
            className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-[#2563EB] bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <span>Edit Announcement Bar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: Umrah Packages */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Umrah Packages
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {totalPackagesCount}
            </span>
            <span className="text-xs text-slate-500">
              Total packages ({activePackagesCount} active)
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-2">
            Categories: Economy · Standard · Premium
          </p>

          <button
            type="button"
            onClick={() => onNavigateTab('packages')}
            className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-[#2563EB] bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <span>Manage Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Last Updated */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Last Updated
            </span>
            <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {announcement.lastUpdated}
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-2">
            Synchronized with announcement settings
          </p>

          <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="text-slate-600">Operator:</span>
            <span className="font-semibold text-slate-800">Authorized Administrator</span>
          </div>
        </div>
      </div>

      {/* Quick Operations & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quick Actions & Package Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions Panel */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Quick Actions
              </h3>
              <span className="text-xs text-slate-400">Management Shortcuts</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={onOpenAddPackage}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-200 transition-all text-left cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-blue-100 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Add Package</p>
                  <p className="text-[11px] text-slate-500">Create new package draft</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('announcement')}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all text-left cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Edit Announcement</p>
                  <p className="text-[11px] text-slate-500">Update scrolling dates</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => window.open('/', '_blank')}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50/50 hover:border-purple-200 transition-all text-left cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">View Public Site</p>
                  <p className="text-[11px] text-slate-500">Open live site in new tab</p>
                </div>
              </button>
            </div>
          </div>

          {/* Current Package Inventory Status */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Active Package Inventory
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Overview of current Umrah travel offerings
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('packages')}
                className="text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
              >
                View all ({totalPackagesCount})
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {packages.slice(0, 3).map((pkg) => (
                <div key={pkg.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-slate-900 truncate">{pkg.name}</p>
                      <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {pkg.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {pkg.duration} · {pkg.makkahHotel.split('/')[0]}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-slate-900 font-mono tabular-nums">
                      {pkg.price}
                    </span>
                    <p className="text-[10px] font-semibold text-emerald-600 capitalize">
                      {pkg.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity & Operations Details */}
        <div className="space-y-6">
          {/* Recent Operations Activity Log */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Recent Activity
              </h3>
              <span className="text-[11px] text-slate-400">System Audit</span>
            </div>

            <div className="space-y-4">
              {activities.map((act) => (
                <div key={act.id} className="flex items-start gap-3">
                  <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                    act.type === 'announcement'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-blue-50 text-blue-600'
                  }`}>
                    {act.type === 'announcement' ? (
                      <Megaphone className="w-3.5 h-3.5" />
                    ) : (
                      <Package className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-800 leading-snug">
                      {act.action}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {act.target}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block tabular-nums">
                      {act.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operations & Office Information Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs text-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-[#2563EB]" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Office & Operations Information
              </h4>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Trichy Operations Center</p>
                  <p className="text-slate-500 text-[11px]">Cantonment, Tiruchirappalli, Tamil Nadu</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Direct Helpline</p>
                  <p className="text-slate-500 font-mono text-[11px]">+91 95663 69654</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Pilgrimage Services</p>
                  <p className="text-slate-500 text-[11px]">Direct flights from Trichy to Saudi Arabia with scholar accompaniment and South Indian catering.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
