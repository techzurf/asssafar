/**
 * Configuration for the Top Scrolling Announcement Bar.
 * 
 * To update the next group departure schedule:
 * 1. Modify `departureDate` (e.g., "15 November 2026")
 * 2. Modify `departureTime` (e.g., "04:30 AM IST")
 * 
 * Keep placeholder values until actual departure details are officially confirmed.
 */
export interface DepartureAnnouncementConfig {
  isActive: boolean;
  prefixBadge: string;
  departureDate: string;
  departureTime: string;
  contactNumber: string;
  contactTel: string;
}

export const NEXT_GROUP_DEPARTURE_CONFIG: DepartureAnnouncementConfig = {
  isActive: true,
  prefixBadge: 'NEXT UMRAH GROUP DEPARTURE',
  departureDate: '[Add Next Group Date]',
  departureTime: '[Add Departure Time]',
  contactNumber: '+91 95663 69654',
  contactTel: '+919566369654',
};
