import React from 'react';
import { ShieldAlert, LogOut, ArrowLeft, KeyRound, ExternalLink } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import { PageRoute } from '../../routes';

interface UnauthorizedViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const UnauthorizedView: React.FC<UnauthorizedViewProps> = ({ onNavigate }) => {
  const { user, authDetails, signOut } = useAdminAuth();

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
            <span>Server Role Check:</span>
            <span className={`font-bold ${authDetails.hasServerRole ? 'text-emerald-600' : 'text-red-600'}`}>
              {authDetails.hasServerRole ? 'role: admin verified' : 'Missing role: admin'}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Email Allowlist:</span>
            <span className={`font-bold ${authDetails.isEmailAllowed ? 'text-emerald-600' : 'text-amber-600'}`}>
              {authDetails.isEmailAllowed ? 'Allowed' : 'Not in VITE_ADMIN_EMAILS'}
            </span>
          </div>
        </div>

        <div className="p-3 bg-red-50/70 border border-red-200/80 rounded-xl text-left text-xs text-red-800 mb-5 leading-relaxed">
          <p className="font-semibold mb-1">Authorization Details:</p>
          <p className="text-[11px] text-red-700">
            {authDetails.reason || 'Your account is authenticated via Supabase, but does not possess the server-side "role": "admin" claim in app_metadata.'}
          </p>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs text-slate-600 mb-6 space-y-1.5">
          <p className="font-bold text-slate-800 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-blue-600" />
            <span>How to Grant Admin Access in Supabase:</span>
          </p>
          <ol className="list-decimal list-inside text-[11px] text-slate-600 space-y-1 pl-1">
            <li>Go to your <strong>Supabase Dashboard</strong> → <strong>Authentication</strong> → <strong>Users</strong>.</li>
            <li>Click <strong>{user?.email || 'user'}</strong> → <strong>Edit User</strong>.</li>
            <li>Under <strong>App Metadata</strong>, add: <code className="bg-slate-200/80 text-slate-800 px-1 rounded font-mono text-[10px]">{`{"role": "admin"}`}</code>.</li>
            <li>Save, sign out below, and sign in again.</li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out & Try Again</span>
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
