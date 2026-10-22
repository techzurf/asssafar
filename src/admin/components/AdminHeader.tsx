import React from 'react';
import { Menu, ExternalLink, User, LogOut } from 'lucide-react';
import { AdminTab } from '../types/adminTypes';

interface AdminHeaderProps {
  currentTab: AdminTab;
  onOpenMobileSidebar: () => void;
  lastUpdated: string;
  userEmail?: string | null;
  onLogout?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentTab,
  onOpenMobileSidebar,
  lastUpdated,
  userEmail,
  onLogout,
}) => {
  const titles: Record<AdminTab, { title: string; subtitle: string }> = {
    dashboard: {
      title: 'Dashboard Overview',
      subtitle: 'System statistics, quick actions, and recent activities',
    },
    announcement: {
      title: 'Announcement Bar',
      subtitle: 'Edit scrolling header departure announcement and preview changes',
    },
    packages: {
      title: 'Umrah Packages',
      subtitle: 'Manage package details, inclusions, pricing, and active statuses',
    },
  };

  const handleOpenWebsite = () => {
    window.open('/', '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
      {/* Left zone: Mobile hamburger + Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Open sidebar navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>Admin</span>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate capitalize">
              {currentTab}
            </span>
          </div>
          <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate">
            {titles[currentTab].title}
          </h1>
        </div>
      </div>

      {/* Right zone: Actions, Status & User */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Sync indicator */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-600">
          <span className="text-slate-600">Sync:</span>
          <span className="font-semibold text-slate-900 tabular-nums">{lastUpdated}</span>
        </div>

        {/* View Website Button */}
        <button
          type="button"
          onClick={handleOpenWebsite}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
          title="Open live public website in new tab"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">View Website</span>
        </button>

        {/* User profile & Logout */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-xs border border-blue-200">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden xl:block text-left max-w-[140px]">
            <p className="text-xs font-bold text-slate-900 leading-tight truncate">
              {userEmail || 'Administrator'}
            </p>
            <p className="text-[10px] text-slate-500 leading-tight">Cantonment Office</p>
          </div>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Sign Out of Admin Portal"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
