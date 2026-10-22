/**
 * Type definitions for As-Safar Admin Panel (Phase 1)
 * Cleanly separated for future Supabase DB schema integration (Phase 2).
 */

export type AdminTab = 'dashboard' | 'announcement' | 'packages';

export interface AnnouncementConfigState {
  isActive: boolean;
  prefixBadge: string;
  announcementText: string;
  departureDate: string;
  departureTime: string;
  contactNumber: string;
  contactTel: string;
  lastUpdated: string;
}

export type PackageCategory = 'economy' | 'standard' | 'premium';
export type PackageStatus = 'active' | 'inactive';

export interface AdminPackageItem {
  id: string;
  name: string;
  category: PackageCategory;
  price: string;
  duration: string;
  shortDescription: string;
  makkahHotel: string;
  madinahHotel: string;
  transport: string;
  meals: string;
  status: PackageStatus;
  imageUrl?: string;
  updatedAt: string;
}

export interface AdminActivityLog {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'announcement' | 'package' | 'system';
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}
