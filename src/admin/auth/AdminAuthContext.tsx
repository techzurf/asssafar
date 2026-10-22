import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase, getSupabaseConfigStatus, SupabaseConfigStatus } from './supabaseClient';

export interface AdminAuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isConfigured: boolean;
  configStatus: SupabaseConfigStatus;
  isAuthorized: boolean;
  authError: string | null;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

/**
 * Validates whether the authenticated user holds genuine administrator privileges.
 * Security standards enforced:
 * 1. Checks Supabase app_metadata (raw_app_meta_data) which is server-authoritative and CANNOT be forged or edited by clients.
 * 2. Checks against explicitly configured environment administrator identities (VITE_ADMIN_EMAILS).
 * 3. Client-writable `user_metadata` is STRICTLY IGNORED to prevent client-side privilege escalation.
 */
export const verifyAdminAuthorization = (user: User | null): boolean => {
  if (!user) return false;

  // 1. Server-protected app_metadata (set only via Supabase Dashboard, Service Role API, or DB trigger)
  const appRole = user.app_metadata?.role;
  const isClaimsAdmin = user.app_metadata?.claims_admin === true || user.app_metadata?.is_admin === true;
  if (appRole === 'admin' || isClaimsAdmin) {
    return true;
  }

  // 2. Explicitly configured administrator emails from environment variables
  const envAdminEmailsRaw = (import.meta.env.VITE_ADMIN_EMAILS || '').trim();
  if (envAdminEmailsRaw && user.email) {
    const configuredAdmins = envAdminEmailsRaw
      .split(',')
      .map((e: string) => e.trim().toLowerCase())
      .filter(Boolean);
    if (configuredAdmins.includes(user.email.toLowerCase())) {
      return true;
    }
  }

  // Fallback: unauthorized regular user
  return false;
};

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const configStatus = getSupabaseConfigStatus();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Initialize and restore session from storage
  useEffect(() => {
    let isMounted = true;

    if (!configStatus.isConfigured || !supabase) {
      setIsLoading(false);
      return;
    }

    const initAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('Supabase getSession error:', error.message);
          if (isMounted) {
            setAuthError(error.message);
            setSession(null);
            setUser(null);
            setIsAuthorized(false);
          }
        } else if (data.session) {
          if (isMounted) {
            setSession(data.session);
            setUser(data.session.user);
            const authorized = verifyAdminAuthorization(data.session.user);
            setIsAuthorized(authorized);
          }
        }
      } catch (err) {
        console.error('Unexpected auth initialization error:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initAuth();

    // Subscribe to ongoing auth state changes (sign in, sign out, token refresh)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (!isMounted) return;

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          const authorized = verifyAdminAuthorization(currentSession.user);
          setIsAuthorized(authorized);
        } else {
          setIsAuthorized(false);
        }

        if (event === 'SIGNED_OUT') {
          setAuthError(null);
        } else if (event === 'TOKEN_REFRESHED' && !currentSession) {
          setAuthError('Your session has expired. Please sign in again.');
        }

        setIsLoading(false);
      }
    );

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [configStatus.isConfigured]);

  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  const signIn = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      setAuthError(null);

      if (!configStatus.isConfigured || !supabase) {
        const errMsg = 'Supabase credentials are not configured. Please define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.';
        setAuthError(errMsg);
        return { success: false, error: errMsg };
      }

      setIsLoading(true);

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          const formattedMessage = error.message.includes('Invalid login credentials')
            ? 'Invalid email or password. Please verify your administrator credentials.'
            : error.message;
          setAuthError(formattedMessage);
          return { success: false, error: formattedMessage };
        }

        if (!data.user) {
          const errMsg = 'Unable to retrieve user details from authentication response.';
          setAuthError(errMsg);
          return { success: false, error: errMsg };
        }

        // Verify admin authorization
        const authorized = verifyAdminAuthorization(data.user);
        if (!authorized) {
          // If authenticated but not authorized, sign out immediately to prevent unauthorized session
          await supabase.auth.signOut();
          const errMsg = 'Access Denied: Your account does not have administrator privileges. Please contact the As-Safar system administrator.';
          setAuthError(errMsg);
          setIsAuthorized(false);
          return { success: false, error: errMsg };
        }

        setSession(data.session);
        setUser(data.user);
        setIsAuthorized(true);
        return { success: true };
      } catch (err: any) {
        const errMsg = err?.message || 'An unexpected error occurred during authentication.';
        setAuthError(errMsg);
        return { success: false, error: errMsg };
      } finally {
        setIsLoading(false);
      }
    },
    [configStatus.isConfigured]
  );

  const signOut = useCallback(async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.warn('Sign out warning:', err);
    } finally {
      setSession(null);
      setUser(null);
      setIsAuthorized(false);
      setIsLoading(false);
    }
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        session,
        user,
        isLoading,
        isConfigured: configStatus.isConfigured,
        configStatus,
        isAuthorized,
        authError,
        signIn,
        signOut,
        clearError,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
