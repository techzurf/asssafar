import { supabase, getSupabaseConfigStatus } from '../admin/auth/supabaseClient';
import { AnnouncementConfigState } from '../admin/types/adminTypes';
import { INITIAL_ANNOUNCEMENT_STATE } from '../admin/data/mockAdminData';

export const ANNOUNCEMENT_SETTINGS_TABLE = 'announcement_settings';
export const ANNOUNCEMENT_SETTINGS_ID = 'current';
export const ANNOUNCEMENT_UPDATED_EVENT = 'as-safar-announcement-updated';

/**
 * Shape of the database record in Supabase
 */
export interface AnnouncementSettingsRow {
  id: string;
  is_active: boolean;
  prefix_badge: string;
  announcement_text: string;
  departure_date: string;
  departure_time: string;
  contact_number: string;
  contact_tel: string;
  updated_at: string;
  updated_by?: string | null;
}

/**
 * Maps a Supabase database row to the frontend AnnouncementConfigState.
 */
export function mapRowToAnnouncementConfig(row: Partial<AnnouncementSettingsRow>): AnnouncementConfigState {
  return {
    isActive: row.is_active ?? true,
    prefixBadge: row.prefix_badge ?? INITIAL_ANNOUNCEMENT_STATE.prefixBadge,
    announcementText: row.announcement_text ?? INITIAL_ANNOUNCEMENT_STATE.announcementText,
    departureDate: row.departure_date ?? INITIAL_ANNOUNCEMENT_STATE.departureDate,
    departureTime: row.departure_time ?? INITIAL_ANNOUNCEMENT_STATE.departureTime,
    contactNumber: row.contact_number ?? INITIAL_ANNOUNCEMENT_STATE.contactNumber,
    contactTel: row.contact_tel ?? INITIAL_ANNOUNCEMENT_STATE.contactTel,
    lastUpdated: row.updated_at ? formatTimestamp(row.updated_at) : 'Saved in Supabase',
  };
}

/**
 * Formats ISO timestamp to human readable format
 */
function formatTimestamp(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return 'Recently';
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'Recently';
  }
}

/**
 * Maps the frontend AnnouncementConfigState to the Supabase database row.
 */
export function mapConfigToAnnouncementRow(
  config: AnnouncementConfigState,
  userEmail?: string | null
): AnnouncementSettingsRow {
  const contactTel = config.contactTel || config.contactNumber.replace(/[^\d+]/g, '');
  return {
    id: ANNOUNCEMENT_SETTINGS_ID,
    is_active: Boolean(config.isActive),
    prefix_badge: config.prefixBadge.trim(),
    announcement_text: config.announcementText.trim(),
    departure_date: config.departureDate.trim(),
    departure_time: config.departureTime.trim(),
    contact_number: config.contactNumber.trim(),
    contact_tel: contactTel,
    updated_at: new Date().toISOString(),
    updated_by: userEmail || null,
  };
}

export interface FetchAnnouncementResult {
  data: AnnouncementConfigState;
  isFromDatabase: boolean;
  isTableMissing?: boolean;
  isRowMissing?: boolean;
  error?: string | null;
}

/**
 * Fetches the saved announcement bar configuration from Supabase with timeout protection.
 * Falls back to safe default values if Supabase is unavailable, offline, or table is pending migration.
 * Never leaves the caller waiting indefinitely.
 */
export async function fetchAnnouncementSettings(timeoutMs = 6000): Promise<FetchAnnouncementResult> {
  const configStatus = getSupabaseConfigStatus();

  if (!configStatus.isConfigured || !supabase) {
    return {
      data: { ...INITIAL_ANNOUNCEMENT_STATE, lastUpdated: 'Not saved in database' },
      isFromDatabase: false,
      error: 'Supabase credentials not configured in environment',
    };
  }

  let timer: any = null;
  const timeoutPromise = new Promise<FetchAnnouncementResult>((resolve) => {
    timer = setTimeout(() => {
      resolve({
        data: { ...INITIAL_ANNOUNCEMENT_STATE, lastUpdated: 'Not saved in database' },
        isFromDatabase: false,
        error: `Database request timed out after ${Math.round(timeoutMs / 1000)} seconds. Please check your network connection and click Retry.`,
      });
    }, timeoutMs);
  });

  const queryPromise = (async (): Promise<FetchAnnouncementResult> => {
    try {
      const { data, error } = await supabase
        .from(ANNOUNCEMENT_SETTINGS_TABLE)
        .select('*')
        .eq('id', ANNOUNCEMENT_SETTINGS_ID)
        .maybeSingle();

      clearTimeout(timer);

      if (error) {
        // Check if table has not been created yet in Supabase
        const isMissing = 
          error.code === '42P01' || 
          error.message?.toLowerCase().includes('could not find the table') ||
          error.message?.toLowerCase().includes('schema cache');

        return {
          data: { ...INITIAL_ANNOUNCEMENT_STATE, lastUpdated: 'Table pending migration' },
          isFromDatabase: false,
          isTableMissing: isMissing,
          error: isMissing 
            ? `Table '${ANNOUNCEMENT_SETTINGS_TABLE}' does not exist in Supabase yet. Please execute the provided SQL migration.`
            : error.message,
        };
      }

      if (!data) {
        // Table exists but record 'current' doesn't exist yet -> show defaults but explicitly mark as NOT in DB
        return {
          data: { ...INITIAL_ANNOUNCEMENT_STATE, lastUpdated: 'Not saved in database yet' },
          isFromDatabase: false,
          isRowMissing: true,
        };
      }

      return {
        data: mapRowToAnnouncementConfig(data),
        isFromDatabase: true,
      };
    } catch (err: any) {
      clearTimeout(timer);
      return {
        data: { ...INITIAL_ANNOUNCEMENT_STATE, lastUpdated: 'Failed to load' },
        isFromDatabase: false,
        error: err?.message || 'Failed to fetch announcement settings',
      };
    }
  })();

  return Promise.race([queryPromise, timeoutPromise]);
}

export interface SaveAnnouncementResult {
  success: boolean;
  data?: AnnouncementConfigState;
  isTableMissing?: boolean;
  error?: string;
}

/**
 * Saves/upserts the announcement bar configuration to Supabase with timeout protection.
 * Enforces server authorization via RLS.
 */
export async function saveAnnouncementSettings(
  config: AnnouncementConfigState,
  userEmail?: string | null,
  timeoutMs = 10000
): Promise<SaveAnnouncementResult> {
  const configStatus = getSupabaseConfigStatus();

  if (!configStatus.isConfigured || !supabase) {
    return {
      success: false,
      error: 'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    };
  }

  const payload = mapConfigToAnnouncementRow(config, userEmail);

  let timer: any = null;
  const timeoutPromise = new Promise<SaveAnnouncementResult>((resolve) => {
    timer = setTimeout(() => {
      resolve({
        success: false,
        error: 'Save request timed out. Please check your connection and try again.',
      });
    }, timeoutMs);
  });

  const savePromise = (async (): Promise<SaveAnnouncementResult> => {
    try {
      const { data, error } = await supabase
        .from(ANNOUNCEMENT_SETTINGS_TABLE)
        .upsert(payload, { onConflict: 'id' })
        .select()
        .single();

      clearTimeout(timer);

      if (error) {
        const isMissing = 
          error.code === '42P01' || 
          error.message?.toLowerCase().includes('could not find the table') ||
          error.message?.toLowerCase().includes('schema cache');

        let userFriendlyError = error.message;
        if (isMissing) {
          userFriendlyError = `Table '${ANNOUNCEMENT_SETTINGS_TABLE}' does not exist yet. Please execute the SQL migration script in your Supabase SQL Editor.`;
        } else if (error.code === '42501' || error.message?.toLowerCase().includes('row-level security')) {
          userFriendlyError = 'Permission Denied: Your account does not have administrator privileges in app_metadata.role.';
        }

        return {
          success: false,
          isTableMissing: isMissing,
          error: userFriendlyError,
        };
      }

      const savedConfig = data ? mapRowToAnnouncementConfig(data) : { ...config, lastUpdated: 'Just now' };

      // Broadcast change to other mounted components (e.g. public header, admin previews)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent(ANNOUNCEMENT_UPDATED_EVENT, { detail: savedConfig })
        );
      }

      return {
        success: true,
        data: savedConfig,
      };
    } catch (err: any) {
      clearTimeout(timer);
      return {
        success: false,
        error: err?.message || 'An unexpected error occurred while saving to Supabase.',
      };
    }
  })();

  return Promise.race([savePromise, timeoutPromise]);
}
