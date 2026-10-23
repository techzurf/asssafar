import { supabase, getSupabaseConfigStatus } from '../admin/auth/supabaseClient';
import { AdminPackageItem, PackageCategory, PackageStatus } from '../admin/types/adminTypes';
import { INITIAL_ADMIN_PACKAGES } from '../admin/data/mockAdminData';
import { UMRAH_PACKAGES } from '../data/packages';
import { PackageItem } from '../types';

export const UMRAH_PACKAGES_TABLE = 'umrah_packages';
export const PACKAGES_UPDATED_EVENT = 'as-safar-packages-updated';

/**
 * Shape of the database record in Supabase
 */
export interface UmrahPackageRow {
  id: string;
  name: string;
  category: PackageCategory;
  price: string;
  duration: string;
  short_description: string;
  makkah_hotel: string;
  madinah_hotel: string;
  transport: string;
  meals: string;
  status: PackageStatus;
  image_url: string | null;
  created_at?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Format timestamp helper
 */
function formatTimestamp(isoString?: string): string {
  if (!isoString) return 'Recently';
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
 * Maps a Supabase row to the frontend AdminPackageItem
 */
export function mapRowToAdminPackage(row: UmrahPackageRow): AdminPackageItem {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: row.price,
    duration: row.duration,
    shortDescription: row.short_description,
    makkahHotel: row.makkah_hotel,
    madinahHotel: row.madinah_hotel,
    transport: row.transport,
    meals: row.meals,
    status: row.status,
    imageUrl: row.image_url || undefined,
    updatedAt: row.updated_at ? formatTimestamp(row.updated_at) : 'Saved in Supabase',
  };
}

/**
 * Maps an AdminPackageItem to a database row for Supabase
 */
export function mapAdminPackageToRow(
  pkg: AdminPackageItem,
  userEmail?: string | null
): Omit<UmrahPackageRow, 'created_at'> & { created_at?: string } {
  return {
    id: pkg.id || `pkg-${Date.now()}`,
    name: pkg.name.trim(),
    category: pkg.category,
    price: pkg.price.trim(),
    duration: pkg.duration.trim(),
    short_description: pkg.shortDescription.trim(),
    makkah_hotel: pkg.makkahHotel.trim(),
    madinah_hotel: pkg.madinahHotel.trim(),
    transport: pkg.transport.trim(),
    meals: pkg.meals.trim(),
    status: pkg.status,
    image_url: pkg.imageUrl?.trim() || null,
    updated_at: new Date().toISOString(),
    updated_by: userEmail || null,
  };
}

/**
 * Maps an AdminPackageItem to the public website's PackageItem format
 */
export function mapAdminPackageToPublicItem(pkg: AdminPackageItem): PackageItem {
  // Determine badge label
  let badge = 'POPULAR';
  if (pkg.category === 'premium') badge = '5-STAR VIP';
  if (pkg.category === 'economy') badge = 'BEST VALUE';

  // Extract hotel distance or approximate
  const makkahDistMatch = pkg.makkahHotel.match(/\((.*?)\)/);
  const madinahDistMatch = pkg.madinahHotel.match(/\((.*?)\)/);

  return {
    id: pkg.id,
    name: pkg.name,
    badge,
    duration: pkg.duration,
    tagline: pkg.shortDescription,
    makkahHotel: pkg.makkahHotel.split('(')[0].trim(),
    makkahDistance: makkahDistMatch ? makkahDistMatch[1] : 'Near Holy Haram courtyard',
    madinahHotel: pkg.madinahHotel.split('(')[0].trim(),
    madinahDistance: madinahDistMatch ? madinahDistMatch[1] : 'Near Masjid an-Nabawi gates',
    transport: pkg.transport,
    food: pkg.meals,
    visa: 'Saudi Umrah / Tourist Visa with medical coverage included',
    startingPrice: pkg.price,
    priceNote: 'Per pilgrim (Quad sharing). Flights & Visa included.',
    category: pkg.category,
    idealFor: pkg.shortDescription,
    featured: pkg.category === 'standard',
    inclusions: [
      pkg.duration,
      pkg.makkahHotel,
      pkg.madinahHotel,
      pkg.transport,
      pkg.meals,
      'Saudi Umrah / Tourist Visa + Medical Insurance',
      'Historical Ziyarat in Makkah & Madinah',
      '5 Litres Zamzam water provided',
    ],
    exclusions: [
      'Personal laundry & room service expenses',
      'Individual wheelchair porter charges',
    ],
  };
}

export interface FetchAdminPackagesResult {
  data: AdminPackageItem[];
  isFromDatabase: boolean;
  isTableMissing?: boolean;
  error?: string | null;
}

/**
 * Fetches all Umrah packages (active and inactive) for admin management.
 * Includes timeout protection and fallback.
 */
export async function fetchAdminPackages(timeoutMs = 6000): Promise<FetchAdminPackagesResult> {
  const configStatus = getSupabaseConfigStatus();

  if (!configStatus.isConfigured || !supabase) {
    return {
      data: [...INITIAL_ADMIN_PACKAGES],
      isFromDatabase: false,
      error: 'Supabase credentials not configured in environment',
    };
  }

  let timer: any = null;
  const timeoutPromise = new Promise<FetchAdminPackagesResult>((resolve) => {
    timer = setTimeout(() => {
      resolve({
        data: [...INITIAL_ADMIN_PACKAGES],
        isFromDatabase: false,
        error: `Database request timed out after ${Math.round(timeoutMs / 1000)} seconds.`,
      });
    }, timeoutMs);
  });

  const queryPromise = (async (): Promise<FetchAdminPackagesResult> => {
    try {
      const { data, error } = await supabase
        .from(UMRAH_PACKAGES_TABLE)
        .select('*')
        .order('created_at', { ascending: true });

      clearTimeout(timer);

      if (error) {
        const isMissing =
          error.code === '42P01' ||
          error.message?.toLowerCase().includes('could not find the table') ||
          error.message?.toLowerCase().includes('schema cache');

        return {
          data: [...INITIAL_ADMIN_PACKAGES],
          isFromDatabase: false,
          isTableMissing: isMissing,
          error: isMissing
            ? `Table '${UMRAH_PACKAGES_TABLE}' does not exist in Supabase yet. Please execute the provided SQL migration.`
            : error.message,
        };
      }

      if (!data || data.length === 0) {
        return {
          data: [],
          isFromDatabase: true,
        };
      }

      return {
        data: data.map(mapRowToAdminPackage),
        isFromDatabase: true,
      };
    } catch (err: any) {
      clearTimeout(timer);
      return {
        data: [...INITIAL_ADMIN_PACKAGES],
        isFromDatabase: false,
        error: err?.message || 'Failed to fetch packages from Supabase',
      };
    }
  })();

  return Promise.race([queryPromise, timeoutPromise]);
}

export interface FetchPublicPackagesResult {
  data: PackageItem[];
  adminPackages: AdminPackageItem[];
  isFromDatabase: boolean;
  error?: string | null;
}

/**
 * Fetches only active packages for the public website.
 * Enforces RLS (public visitors can only read active packages).
 */
export async function fetchPublicActivePackages(timeoutMs = 5000): Promise<FetchPublicPackagesResult> {
  const configStatus = getSupabaseConfigStatus();

  if (!configStatus.isConfigured || !supabase) {
    return {
      data: [...UMRAH_PACKAGES],
      adminPackages: INITIAL_ADMIN_PACKAGES.filter((p) => p.status === 'active'),
      isFromDatabase: false,
    };
  }

  let timer: any = null;
  const timeoutPromise = new Promise<FetchPublicPackagesResult>((resolve) => {
    timer = setTimeout(() => {
      resolve({
        data: [...UMRAH_PACKAGES],
        adminPackages: INITIAL_ADMIN_PACKAGES.filter((p) => p.status === 'active'),
        isFromDatabase: false,
        error: 'Public packages fetch timed out; using defaults.',
      });
    }, timeoutMs);
  });

  const queryPromise = (async (): Promise<FetchPublicPackagesResult> => {
    try {
      const { data, error } = await supabase
        .from(UMRAH_PACKAGES_TABLE)
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: true });

      clearTimeout(timer);

      if (error || !data || data.length === 0) {
        return {
          data: [...UMRAH_PACKAGES],
          adminPackages: INITIAL_ADMIN_PACKAGES.filter((p) => p.status === 'active'),
          isFromDatabase: false,
          error: error?.message,
        };
      }

      const adminItems = data.map(mapRowToAdminPackage);
      const publicItems = adminItems.map(mapAdminPackageToPublicItem);

      return {
        data: publicItems,
        adminPackages: adminItems,
        isFromDatabase: true,
      };
    } catch (err: any) {
      clearTimeout(timer);
      return {
        data: [...UMRAH_PACKAGES],
        adminPackages: INITIAL_ADMIN_PACKAGES.filter((p) => p.status === 'active'),
        isFromDatabase: false,
        error: err?.message,
      };
    }
  })();

  return Promise.race([queryPromise, timeoutPromise]);
}

export interface PackageMutationResult {
  success: boolean;
  data?: AdminPackageItem;
  isTableMissing?: boolean;
  error?: string;
}

/**
 * Create a new Umrah package in Supabase
 */
export async function createPackage(
  pkg: AdminPackageItem,
  userEmail?: string | null
): Promise<PackageMutationResult> {
  const configStatus = getSupabaseConfigStatus();
  if (!configStatus.isConfigured || !supabase) {
    return { success: false, error: 'Supabase credentials are not configured.' };
  }

  const row = mapAdminPackageToRow(pkg, userEmail);

  try {
    const { data, error } = await supabase
      .from(UMRAH_PACKAGES_TABLE)
      .insert(row)
      .select()
      .single();

    if (error) {
      const isMissing =
        error.code === '42P01' ||
        error.message?.toLowerCase().includes('could not find the table') ||
        error.message?.toLowerCase().includes('schema cache');

      let userError = error.message;
      if (isMissing) {
        userError = `Table '${UMRAH_PACKAGES_TABLE}' does not exist. Please run the SQL migration in Supabase SQL Editor.`;
      } else if (error.code === '42501' || error.message?.toLowerCase().includes('row-level security')) {
        userError = 'Permission Denied: Your account does not have admin write privileges in app_metadata.role.';
      }

      return { success: false, isTableMissing: isMissing, error: userError };
    }

    const createdPkg = mapRowToAdminPackage(data);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(PACKAGES_UPDATED_EVENT, { detail: { action: 'create', package: createdPkg } }));
    }

    return { success: true, data: createdPkg };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to create package in Supabase.' };
  }
}

/**
 * Update an existing Umrah package in Supabase
 */
export async function updatePackage(
  pkg: AdminPackageItem,
  userEmail?: string | null
): Promise<PackageMutationResult> {
  const configStatus = getSupabaseConfigStatus();
  if (!configStatus.isConfigured || !supabase) {
    return { success: false, error: 'Supabase credentials are not configured.' };
  }

  const row = mapAdminPackageToRow(pkg, userEmail);

  try {
    const { data, error } = await supabase
      .from(UMRAH_PACKAGES_TABLE)
      .update(row)
      .eq('id', pkg.id)
      .select()
      .single();

    if (error) {
      let userError = error.message;
      if (error.code === '42501' || error.message?.toLowerCase().includes('row-level security')) {
        userError = 'Permission Denied: Your account does not have admin write privileges in app_metadata.role.';
      }
      return { success: false, error: userError };
    }

    const updated = mapRowToAdminPackage(data);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(PACKAGES_UPDATED_EVENT, { detail: { action: 'update', package: updated } }));
    }

    return { success: true, data: updated };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update package in Supabase.' };
  }
}

/**
 * Toggle package active/inactive status in Supabase
 */
export async function togglePackageStatus(
  id: string,
  newStatus: PackageStatus,
  userEmail?: string | null
): Promise<PackageMutationResult> {
  const configStatus = getSupabaseConfigStatus();
  if (!configStatus.isConfigured || !supabase) {
    return { success: false, error: 'Supabase credentials are not configured.' };
  }

  try {
    const { data, error } = await supabase
      .from(UMRAH_PACKAGES_TABLE)
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
        updated_by: userEmail || null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      let userError = error.message;
      if (error.code === '42501' || error.message?.toLowerCase().includes('row-level security')) {
        userError = 'Permission Denied: Your account does not have admin write privileges in app_metadata.role.';
      }
      return { success: false, error: userError };
    }

    const updated = mapRowToAdminPackage(data);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(PACKAGES_UPDATED_EVENT, { detail: { action: 'status_toggle', package: updated } }));
    }

    return { success: true, data: updated };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update package status in Supabase.' };
  }
}

/**
 * Delete a package from Supabase
 */
export async function deletePackage(id: string): Promise<{ success: boolean; error?: string }> {
  const configStatus = getSupabaseConfigStatus();
  if (!configStatus.isConfigured || !supabase) {
    return { success: false, error: 'Supabase credentials are not configured.' };
  }

  try {
    const { error } = await supabase
      .from(UMRAH_PACKAGES_TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      let userError = error.message;
      if (error.code === '42501' || error.message?.toLowerCase().includes('row-level security')) {
        userError = 'Permission Denied: Your account does not have admin write privileges in app_metadata.role.';
      }
      return { success: false, error: userError };
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(PACKAGES_UPDATED_EVENT, { detail: { action: 'delete', packageId: id } }));
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to delete package from Supabase.' };
  }
}
