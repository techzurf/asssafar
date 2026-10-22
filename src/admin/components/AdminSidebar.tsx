import React from 'react';
import { 
  LayoutDashboard, 
  Megaphone, 
  Package, 
  ExternalLink, 
  X,
  Database,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { AdminTab } from '../types/adminTypes';
import { Logo } from '../../components/Logo';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onLogout?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  onLogout,
}) => {
  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; count?: number }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'announcement',
      label: 'Announcement Bar',
      icon: <Megaphone className="w-4 h-4" />,
    },
    {
      id: 'packages',
      label: 'Umrah Packages',
      icon: <Package className="w-4 h-4" />,
    },
  ];

  const handleNavClick = (tab: AdminTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  const handleOpenWebsite = () => {
    window.open('/', '_blank', 'noopener,noreferrer');
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          role="presentation"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0F172A] text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-lg shadow-xs">
              <Logo className="h-7 w-auto object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white tracking-tight">As-Safar</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Management Portal</p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Admin Navigation">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Navigation
          </div>

          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}

          <div className="pt-4 px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            External Links
          </div>

          {/* View Website (opens public homepage in new tab) */}
          <button
            type="button"
            onClick={handleOpenWebsite}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800/80 hover:text-white transition-all cursor-pointer group"
            title="Open live public website in new tab"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
              <span>View Website</span>
            </div>
            <span className="text-[10px] text-slate-400 group-hover:text-slate-300 font-normal">
              New Tab ↗
            </span>
          </button>

          {/* Sign Out Button */}
          {onLogout && (
            <button
              type="button"
              onClick={() => {
                onCloseMobile();
                onLogout();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer group"
              title="Sign out of administration portal"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                <span>Sign Out</span>
              </div>
            </button>
          )}
        </nav>

        {/* Phase 1 Mock Notice / Future Supabase Card */}
        <div className="p-4 border-t border-slate-800/80 shrink-0">
          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs">
            <div className="flex items-center gap-2 text-slate-200 font-semibold mb-1">
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>Phase 1: Mock State</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              In-memory UI prototype. Supabase database, RLS & auth will connect in Phase 2.
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Frontend Only
              </span>
              <span>v1.0.0-mock</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
