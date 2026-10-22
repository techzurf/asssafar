import React, { useState, useCallback, useEffect } from 'react';
import { 
  AdminTab, 
  AnnouncementConfigState, 
  AdminPackageItem, 
  AdminActivityLog, 
  ToastMessage 
} from './types/adminTypes';
import { INITIAL_ANNOUNCEMENT_STATE, INITIAL_ADMIN_PACKAGES, INITIAL_ACTIVITY_LOGS } from './data/mockAdminData';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { ToastContainer } from './components/Toast';
import { DashboardView } from './views/DashboardView';
import { AnnouncementView } from './views/AnnouncementView';
import { PackagesView } from './views/PackagesView';
import { PageRoute } from '../routes';
import { useAdminAuth } from './auth/AdminAuthContext';
import { UnauthorizedView } from './auth/UnauthorizedView';
import { Loader2, ShieldCheck, Lock } from 'lucide-react';

interface AdminAppProps {
  onNavigate?: (route: PageRoute) => void;
}

export const AdminApp: React.FC<AdminAppProps> = ({ onNavigate }) => {
  const { session, user, isLoading, isAuthorized, signOut } = useAdminAuth();

  // Navigation Tab State
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Announcement State (In-Memory Mock Session)
  const [announcementState, setAnnouncementState] = useState<AnnouncementConfigState>(INITIAL_ANNOUNCEMENT_STATE);

  // Packages State (In-Memory Mock Session)
  const [packagesState, setPackagesState] = useState<AdminPackageItem[]>(INITIAL_ADMIN_PACKAGES);

  // Activity Log
  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>(INITIAL_ACTIVITY_LOGS);

  // Direct trigger for Add Package modal from Dashboard
  const [triggerAddPackageModal, setTriggerAddPackageModal] = useState(false);

  // Toast Notification State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    await signOut();
    if (onNavigate) {
      onNavigate('/admin/login');
    }
  };

  // Auto-redirect to /admin/login if signed out
  useEffect(() => {
    if (!isLoading && (!session || !user)) {
      if (onNavigate) {
        onNavigate('/admin/login');
      }
    }
  }, [isLoading, session, user, onNavigate]);

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 max-w-sm w-full text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto border border-blue-200">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Checking Administrator Privileges</h3>
            <p className="text-xs text-slate-500 mt-1">Verifying Supabase authentication session...</p>
          </div>
        </div>
      </div>
    );
  }

  // Not signed in -> Prompt redirection
  if (!session || !user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 max-w-sm w-full text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Authentication Required</h3>
            <p className="text-xs text-slate-500 mt-1">Redirecting to administrator sign in...</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate?.('/admin/login')}
            className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-white bg-[#2563EB] hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  // Signed in, but unauthorized -> Explicit Access Denied Screen
  if (!isAuthorized) {
    return <UnauthorizedView onNavigate={onNavigate || (() => {})} />;
  }

  // Save Announcement
  const handleSaveAnnouncement = (newConfig: AnnouncementConfigState) => {
    setAnnouncementState(newConfig);

    const newLog: AdminActivityLog = {
      id: `act-${Date.now()}`,
      action: newConfig.isActive ? 'Announcement Bar Updated' : 'Announcement Bar Disabled',
      target: `Departure: ${newConfig.departureDate}`,
      timestamp: 'Just now',
      type: 'announcement',
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 9)]);
  };

  // Add Package
  const handleAddPackage = (newPkg: AdminPackageItem) => {
    setPackagesState((prev) => [newPkg, ...prev]);

    const newLog: AdminActivityLog = {
      id: `act-${Date.now()}`,
      action: 'Package Created',
      target: newPkg.name,
      timestamp: 'Just now',
      type: 'package',
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 9)]);
  };

  // Update Package
  const handleUpdatePackage = (updatedPkg: AdminPackageItem) => {
    setPackagesState((prev) => prev.map((p) => (p.id === updatedPkg.id ? updatedPkg : p)));

    const newLog: AdminActivityLog = {
      id: `act-${Date.now()}`,
      action: 'Package Modified',
      target: updatedPkg.name,
      timestamp: 'Just now',
      type: 'package',
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 9)]);
  };

  // Delete Package
  const handleDeletePackage = (id: string) => {
    const target = packagesState.find((p) => p.id === id);
    setPackagesState((prev) => prev.filter((p) => p.id !== id));

    const newLog: AdminActivityLog = {
      id: `act-${Date.now()}`,
      action: 'Package Removed',
      target: target ? target.name : id,
      timestamp: 'Just now',
      type: 'package',
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 9)]);
  };

  // Toggle Package Active Status
  const handleTogglePackageStatus = (id: string) => {
    setPackagesState((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStatus = p.status === 'active' ? 'inactive' : 'active';
          return {
            ...p,
            status: nextStatus,
            updatedAt: 'Just now',
          };
        }
        return p;
      })
    );

    const target = packagesState.find((p) => p.id === id);
    if (target) {
      const isNowActive = target.status === 'inactive';
      const newLog: AdminActivityLog = {
        id: `act-${Date.now()}`,
        action: isNowActive ? 'Package Activated' : 'Package Deactivated',
        target: target.name,
        timestamp: 'Just now',
        type: 'package',
      };
      setActivityLogs((prev) => [newLog, ...prev.slice(0, 9)]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col antialiased selection:bg-[#2563EB] selection:text-white">
      {/* Sidebar Navigation */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onLogout={handleLogout}
      />

      {/* Main Content Area (offset by sidebar on desktop) */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        {/* Header */}
        <AdminHeader
          currentTab={currentTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          lastUpdated={announcementState.lastUpdated}
          userEmail={user.email}
          onLogout={handleLogout}
        />

        {/* Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <DashboardView
              announcement={announcementState}
              packages={packagesState}
              activities={activityLogs}
              onNavigateTab={setCurrentTab}
              onOpenAddPackage={() => {
                setCurrentTab('packages');
                setTriggerAddPackageModal(true);
              }}
            />
          )}

          {currentTab === 'announcement' && (
            <AnnouncementView
              initialConfig={announcementState}
              onSave={handleSaveAnnouncement}
              onShowToast={addToast}
            />
          )}

          {currentTab === 'packages' && (
            <PackagesView
              packages={packagesState}
              onAddPackage={handleAddPackage}
              onUpdatePackage={handleUpdatePackage}
              onDeletePackage={handleDeletePackage}
              onToggleStatus={handleTogglePackageStatus}
              onShowToast={addToast}
              isAddModalOpenInitially={triggerAddPackageModal}
              onCloseAddModalInitially={() => setTriggerAddPackageModal(false)}
            />
          )}
        </main>
      </div>

      {/* Floating Toast Notification Stack */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};
