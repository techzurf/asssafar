import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowLeft, 
  ShieldCheck, 
  Loader2, 
  KeyRound,
  ExternalLink,
  Info
} from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import { Logo } from '../../components/Logo';
import { PageRoute } from '../../routes';

interface AdminLoginPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate }) => {
  const { signIn, isLoading, isConfigured, configStatus, authError, clearError } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localValidationError, setLocalValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalValidationError(null);

    if (!email.trim()) {
      setLocalValidationError('Please enter your administrator email address.');
      return;
    }
    if (!password) {
      setLocalValidationError('Please enter your administrator password.');
      return;
    }

    const res = await signIn(email, password);
    if (res.success) {
      onNavigate('/admin');
    }
  };

  const activeError = localValidationError || authError;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#2563EB] selection:text-white font-sans antialiased">
      {/* Top Bar with Return link */}
      <div className="w-full max-w-md mx-auto flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Website</span>
        </button>

        <span className="text-slate-400 font-medium">As-Safar Portal</span>
      </div>

      {/* Main Login Card Container */}
      <div className="w-full max-w-md mx-auto my-auto">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
          {/* Brand Header */}
          <div className="text-center mb-6">
            <div className="inline-block p-1 bg-white rounded-xl shadow-xs border border-slate-100 mb-3">
              <Logo className="h-10 w-auto object-contain mx-auto" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Administrator Sign In
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Authorized personnel only · Cantonment, Trichy
            </p>
          </div>

          {/* Configuration Alert if Supabase Environment is not set */}
          {!isConfigured && (
            <div className="mb-5 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Supabase Configuration Required</span>
              </div>
              <p className="text-amber-800 leading-relaxed">
                Supabase credentials are not yet configured in this deployment environment. To enable live authentication, provide the following environment variables:
              </p>
              <ul className="space-y-1 font-mono text-[11px] bg-amber-100/60 p-2 rounded-lg text-amber-950">
                <li>• VITE_SUPABASE_URL</li>
                <li>• VITE_SUPABASE_ANON_KEY</li>
                <li>• VITE_ADMIN_EMAILS (optional override list)</li>
              </ul>
              <p className="text-[11px] text-amber-700">
                Reference template available in <code className="font-mono font-bold">.env.example</code>.
              </p>
            </div>
          )}

          {/* Active Error Alert */}
          {activeError && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0 leading-relaxed font-medium">
                {activeError}
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="admin-email">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={isLoading || !isConfigured}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (localValidationError) setLocalValidationError(null);
                  }}
                  placeholder="admin@as-safar.com"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] disabled:bg-slate-100 disabled:text-slate-400 transition-all"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Password Field with Show/Hide toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700" htmlFor="admin-password">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  disabled={isLoading || !isConfigured}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (localValidationError) setLocalValidationError(null);
                  }}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] disabled:bg-slate-100 disabled:text-slate-400 transition-all font-mono"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading || !isConfigured}
                  className="absolute right-3 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || !isConfigured}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Sign In to Admin Portal</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Notice (No public sign-up allowed per requirements) */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Protected by Supabase Auth with Server-Side RBAC</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Public self-registration is permanently disabled. Accounts are provisioned exclusively by As-Safar administration.
            </p>
          </div>
        </div>

        {/* Cantonment Trust Footer */}
        <p className="text-center text-[11px] text-slate-400 mt-6">
          © {new Date().getFullYear()} As-Safar Hajj & Umrah Services · Trichy, Tamil Nadu
        </p>
      </div>

      <div className="w-full max-w-md mx-auto" />
    </div>
  );
};
