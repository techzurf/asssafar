import React from 'react';
import { ShieldAlert, LogOut, ArrowLeft } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import { PageRoute } from '../../routes';

interface UnauthorizedViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const UnauthorizedView: React.FC<UnauthorizedViewProps> = ({ onNavigate }) => {
  const { user, signOut } = useAdminAuth();

  const handleSignOut = async () => {
    await signOut();
    onNavigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-red-200 shadow-xl p-6 sm:p-8 text-center animate-in fade-in zoom-in-95 duration-150">
        <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-200">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Access Denied
        </h2>
        
        <p className="text-xs text-slate-500 mt-1">
          Administrator privileges are required to access this portal.
        </p>

        <div className="my-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
          <div className="flex items-center justify-between text-slate-600">
            <span>Signed in as:</span>
            <strong className="text-slate-900 font-mono text-[11px] truncate max-w-[200px]">
              {user?.email || 'Authenticated User'}
            </strong>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Admin Authorization:</span>
            <span className="text-red-600 font-bold">Failed / Denied</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-6">
          Your account is authenticated via Supabase, but does not possess the server-side <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded font-mono text-[11px]">admin</code> role in <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded font-mono text-[11px]">app_metadata</code>. Contact the As-Safar travel agency administrator to assign permissions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Public Site</span>
          </button>
        </div>
      </div>
    </div>
  );
};
