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
import { fetchAnnouncementSettings } from '../services/announcementService';
import { 
  fetchAdminPackages, 
  createPackage, 
  updatePackage, 
  togglePackageStatus, 
  deletePackage 
} from '../services/packageService';

interface AdminAppProps {
  onNavigate?: (route: PageRoute) => void;
}

export const AdminApp: React.FC<AdminAppProps> = ({ onNavigate }) => {
  const { session, user, isLoading, isAuthorized, signOut } = useAdminAuth();

  // Navigation Tab State initialized from URL subpath
  const [currentTab, setCurrentTab] = useState<AdminTab>(() => {
    const path = typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : '';
    if (path.includes('announcement')) return 'announcement';
    if (path.includes('package')) return 'packages';
    return 'dashboard';
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sync tab navigation with browser history
  const handleSelectTab = useCallback((tab: AdminTab) => {
    setCurrentTab(tab);
    if (typeof window !== 'undefined') {
      const targetPath = tab === 'dashboard' ? '/admin' : `/admin/${tab}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath);
      }
    }
  }, []);

  // Announcement State (Connected to Supabase with fallback)
  const [announcementState, setAnnouncementState] = useState<AnnouncementConfigState>(INITIAL_ANNOUNCEMENT_STATE);

  // Fetch initial announcement state from Supabase
  useEffect(() => {
    let isMounted = true;
    fetchAnnouncementSettings()
      .then((result) => {
        if (isMounted && result.data && result.isFromDatabase) {
          setAnnouncementState(result.data);
        }
      })
      .catch((err) => {
        console.warn('AdminApp: could not fetch announcement settings:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Packages State (Connected to Supabase with fallback)
  const [packagesState, setPackagesState] = useState<AdminPackageItem[]>(INITIAL_ADMIN_PACKAGES);
  const [isPackagesLoading, setIsPackagesLoading] = useState(true);
  const [isPackagesDbConnected, setIsPackagesDbConnected] = useState(false);
  const [isPackagesTableMissing, setIsPackagesTableMissing] = useState(false);

  // Load packages from Supabase
  const loadPackages = useCallback(async () => {
    setIsPackagesLoading(true);
    try {
      const result = await fetchAdminPackages();
      if (result.isTableMissing) {
        setIsPackagesTableMissing(true);
        setIsPackagesDbConnected(false);
      } else if (result.error) {
        setIsPackagesDbConnected(false);
      } else {
        setIsPackagesDbConnected(result.isFromDatabase);
        setIsPackagesTableMissing(false);
      }
      setPackagesState(result.data);
    } catch (err) {
      console.warn('AdminApp: could not fetch packages:', err);
    } finally {
      setIsPackagesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPackages();
  }, [loadPackages]);

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
  const handleSaveAnnouncement = useCallback((newConfig: AnnouncementConfigState) => {
    setAnnouncementState(newConfig);

    const newLog: AdminActivityLog = {
      id: `act-${Date.now()}`,
      action: newConfig.isActive ? 'Announcement Bar Updated' : 'Announcement Bar Disabled',
      target: `Departure: ${newConfig.departureDate}`,
      timestamp: 'Just now',
      type: 'announcement',
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 9)]);
  }, []);

  // Add Package (Supabase)
  const handleAddPackage = useCallback(async (newPkg: AdminPackageItem): Promise<boolean> => {
    const result = await createPackage(newPkg, user?.email);
    if (result.success && result.data) {
      setPackagesState((prev) => [result.data!, ...prev.filter((p) => p.id !== result.data!.id)]);
      const newLog: AdminActivityLog = {
        id: `act-${Date.now()}`,
        action: 'Package Created',
        target: result.data.name,
        timestamp: 'Just now',
        type: 'package',
      };
      setActivityLogs((prev) => [newLog, ...prev.slice(0, 9)]);
      setIsPackagesDbConnected(true);
      addToast('Package Created', `"${result.data.name}" has been saved to Supabase.`, 'success');
      return true;
    } else {
      if (result.isTableMissing) {
        setIsPackagesTableMissing(true);
      }
      addToast('Failed to Save', result.error || 'Could not save package to database.', 'warning');
      return false;
    }
  }, [user?.email, addToast]);

  // Update Package (Supabase)
  const handleUpdatePackage = useCallback(async (updatedPkg: AdminPackageItem): Promise<boolean> => {
    const result = await updatePackage(updatedPkg, user?.email);
    if (result.success && result.data) {
      setPackagesState((prev) => prev.map((p) => (p.id === result.data!.id ? result.data! : p)));
      const newLog: AdminActivityLog = {
        id: `act-${Date.now()}`,
        action: 'Package Modified',
        target: result.data.name,
        timestamp: 'Just now',
        type: 'package',
      };
      setActivityLogs((prev) => [newLog, ...prev.slice(0, 9)]);
      setIsPackagesDbConnected(true);
      addToast('Package Updated', `"${result.data.name}" has been updated in Supabase.`, 'success');
      return true;
    } else {
      addToast('Failed to Update', result.error || 'Could not update package in database.', 'warning');
      return false;
    }
  }, [user?.email, addToast]);

  // Delete Package (Supabase)
  const handleDeletePackage = useCallback(async (id: string): Promise<boolean> => {
    const target = packagesState.find((p) => p.id === id);
    const result = await deletePackage(id);
    if (result.success) {
      setPackagesState((prev) => prev.filter((p) => p.id !== id));
      const newLog: AdminActivityLog = {
        id: `act-${Date.now()}`,
        action: 'Package Removed',
        target: target ? target.name : id,
        timestamp: 'Just now',
        type: 'package',
      };
      setActivityLogs((prev) => [newLog, ...prev.slice(0, 9)]);
      addToast('Package Deleted', `"${target ? target.name : id}" has been removed from Supabase.`, 'info');
      return true;
    } else {
      addToast('Failed to Delete', result.error || 'Could not delete package.', 'warning');
      return false;
    }
  }, [packagesState, addToast]);

  // Toggle Package Active Status (Supabase)
  const handleTogglePackageStatus = useCallback(async (id: string): Promise<boolean> => {
    const target = packagesState.find((p) => p.id === id);
    if (!target) return false;
    const nextStatus = target.status === 'active' ? 'inactive' : 'active';
    const result = await togglePackageStatus(id, nextStatus, user?.email);
    if (result.success && result.data) {
      setPackagesState((prev) => prev.map((p) => (p.id === id ? result.data! : p)));
      const newLog: AdminActivityLog = {
        id: `act-${Date.now()}`,
        action: nextStatus === 'active' ? 'Package Activated' : 'Package Deactivated',
        target: target.name,
        timestamp: 'Just now',
        type: 'package',
      };
      setActivityLogs((prev) => [newLog, ...prev.slice(0, 9)]);
      addToast(
        nextStatus === 'active' ? 'Package Activated' : 'Package Deactivated',
        `"${target.name}" is now ${nextStatus} in Supabase.`,
        'success'
      );
      return true;
    } else {
      addToast('Failed to Update Status', result.error || 'Could not toggle package status.', 'warning');
      return false;
    }
  }, [packagesState, user?.email, addToast]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col antialiased selection:bg-[#2563EB] selection:text-white">
      {/* Sidebar Navigation */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
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
              onNavigateTab={handleSelectTab}
              onOpenAddPackage={() => {
                handleSelectTab('packages');
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
              isLoading={isPackagesLoading}
              isTableMissing={isPackagesTableMissing}
              isDbConnected={isPackagesDbConnected}
              onRefresh={loadPackages}
            />
          )}
        </main>
      </div>

      {/* Floating Toast Notification Stack */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};
