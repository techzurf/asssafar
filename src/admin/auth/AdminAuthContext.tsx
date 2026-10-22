import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, getSupabaseConfigStatus, SupabaseConfigStatus } from './supabaseClient';

export interface AuthorizationDetails {
  isAuthorized: boolean;
  hasServerRole: boolean;
  isEmailAllowed: boolean;
  reason?: string;
}

export interface AdminAuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isConfigured: boolean;
  configStatus: SupabaseConfigStatus;
  isAuthorized: boolean;
  authDetails: AuthorizationDetails;
  authError: string | null;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

/**
 * Validates whether the authenticated user holds genuine administrator privileges.
 * 
 * Strict Security Audit Enforcements:
 * 1. Trusted Authorization Mechanism: Requires server-authoritative app_metadata (cryptographically signed in Supabase JWT).
 *    Client-writable user_metadata (raw_user_meta_data) is STRICTLY REJECTED to prevent client-side privilege escalation.
 * 2. Allowlist Defense-in-Depth: If VITE_ADMIN_EMAILS is configured, the user's email must also be present in this list.
 * 3. Frontend-Only Variable Prohibition: VITE_ADMIN_EMAILS alone is NEVER sufficient to grant admin privileges.
 */
export const checkAdminAuthorizationDetails = (user: User | null): AuthorizationDetails => {
  if (!user) {
    return {
      isAuthorized: false,
      hasServerRole: false,
      isEmailAllowed: false,
      reason: 'No authenticated user session.',
    };
  }

  // 1. Inspect server-authoritative app_metadata (signed in Supabase JWT, read-only for clients)
  const appMetadata = user.app_metadata || {};
  const appRole = appMetadata.role || appMetadata.user_role;
  const isClaimsAdmin = appMetadata.claims_admin === true || appMetadata.is_admin === true;
  const hasServerRole = appRole === 'admin' || isClaimsAdmin;

  // 2. Inspect configured administrator email allowlist (defense-in-depth)
  const envAdminEmailsRaw = (
    (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_ADMIN_EMAILS : '') ||
    (typeof process !== 'undefined' ? process.env.VITE_ADMIN_EMAILS : '') ||
    ''
  ).trim();
  let isEmailAllowed = true;
  if (envAdminEmailsRaw && user.email) {
    const configuredAdmins = envAdminEmailsRaw
      .split(',')
      .map((e: string) => e.trim().toLowerCase())
      .filter(Boolean);
    isEmailAllowed = configuredAdmins.includes(user.email.toLowerCase());
  }

  // Trusted server check: User MUST have the server-signed admin claim
  if (!hasServerRole) {
    return {
      isAuthorized: false,
      hasServerRole: false,
      isEmailAllowed,
      reason: 'Your account is authenticated with Supabase, but is missing the server-side "role": "admin" in app_metadata.',
    };
  }

  // Allowlist check: If allowlist is active, email must match
  if (!isEmailAllowed) {
    return {
      isAuthorized: false,
      hasServerRole: true,
      isEmailAllowed: false,
      reason: 'Your account email is not in the configured administrator allowlist (VITE_ADMIN_EMAILS).',
    };
  }

  return {
    isAuthorized: true,
    hasServerRole: true,
    isEmailAllowed: true,
  };
};

export const verifyAdminAuthorization = (user: User | null): boolean => {
  return checkAdminAuthorizationDetails(user).isAuthorized;
};

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const configStatus = getSupabaseConfigStatus();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authDetails, setAuthDetails] = useState<AuthorizationDetails>({
    isAuthorized: false,
    hasServerRole: false,
    isEmailAllowed: false,
  });
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
            setAuthDetails({
              isAuthorized: false,
              hasServerRole: false,
              isEmailAllowed: false,
              reason: error.message,
            });
          }
        } else if (data.session) {
          if (isMounted) {
            setSession(data.session);
            setUser(data.session.user);
            const details = checkAdminAuthorizationDetails(data.session.user);
            setAuthDetails(details);
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

    // Subscribe to ongoing auth state changes (sign in, sign out, token refresh, user updated)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (!isMounted) return;

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          const details = checkAdminAuthorizationDetails(currentSession.user);
          setAuthDetails(details);
        } else {
          setAuthDetails({
            isAuthorized: false,
            hasServerRole: false,
            isEmailAllowed: false,
          });
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

        // Verify trusted admin authorization
        const details = checkAdminAuthorizationDetails(data.user);
        setAuthDetails(details);

        if (!details.isAuthorized) {
          // If authenticated but not authorized, keep user informed on unauthorized view
          setSession(data.session);
          setUser(data.user);
          return { 
            success: false, 
            error: details.reason || 'Access Denied: Administrator role is required in Supabase app_metadata.' 
          };
        }

        setSession(data.session);
        setUser(data.user);
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
      setAuthDetails({
        isAuthorized: false,
        hasServerRole: false,
        isEmailAllowed: false,
      });
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
        isAuthorized: authDetails.isAuthorized,
        authDetails,
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
