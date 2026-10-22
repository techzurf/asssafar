import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client configuration for As-Safar Admin Authentication (Phase 2).
 * Reads public credentials from Vite environment variables.
 * Statically references import.meta.env.VITE_* so Vite build/dev AST replacement works cleanly.
 */

// Direct static property access for Vite build and dev replacement
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  hasUrl: boolean;
  hasAnonKey: boolean;
  url: string | null;
}

export const getSupabaseConfigStatus = (): SupabaseConfigStatus => {
  const hasUrl = Boolean(
    supabaseUrl &&
    supabaseUrl !== 'https://your-project-id.supabase.co' &&
    supabaseUrl.startsWith('https://')
  );

  const hasAnonKey = Boolean(
    supabaseAnonKey &&
    supabaseAnonKey !== 'your-supabase-anon-key' &&
    supabaseAnonKey.length >= 10
  );

  return {
    isConfigured: hasUrl && hasAnonKey,
    hasUrl,
    hasAnonKey,
    url: hasUrl ? supabaseUrl : null,
  };
};

/**
 * Singleton Supabase client instance.
 * Initialized only when valid environment credentials are provided.
 */
let clientInstance: SupabaseClient | null = null;

if (getSupabaseConfigStatus().isConfigured) {
  try {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'as-safar-admin-auth-token',
      },
    });
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    clientInstance = null;
  }
}

export const supabase = clientInstance;
