-- ==============================================================================
-- As-Safar Umrah Travel - Supabase Migration for Announcement Bar Settings
-- Table: public.announcement_settings
-- ==============================================================================

-- 1. Create the announcement_settings table
CREATE TABLE IF NOT EXISTS public.announcement_settings (
  id TEXT PRIMARY KEY DEFAULT 'current',
  is_active BOOLEAN NOT NULL DEFAULT true,
  prefix_badge TEXT NOT NULL DEFAULT 'NEXT UMRAH GROUP DEPARTURE',
  announcement_text TEXT NOT NULL DEFAULT 'Direct Flight Trichy to Jeddah · 15 Days Guided Pilgrimage with South Indian Catering',
  departure_date TEXT NOT NULL DEFAULT '12 November 2026',
  departure_time TEXT NOT NULL DEFAULT '04:30 AM IST',
  contact_number TEXT NOT NULL DEFAULT '+91 95663 69654',
  contact_tel TEXT NOT NULL DEFAULT '+919566369654',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_by TEXT
);

-- 2. Seed initial default row if none exists
INSERT INTO public.announcement_settings (
  id,
  is_active,
  prefix_badge,
  announcement_text,
  departure_date,
  departure_time,
  contact_number,
  contact_tel,
  updated_at,
  updated_by
)
VALUES (
  'current',
  true,
  'NEXT UMRAH GROUP DEPARTURE',
  'Direct Flight Trichy to Jeddah · 15 Days Guided Pilgrimage with South Indian Catering',
  '12 November 2026',
  '04:30 AM IST',
  '+91 95663 69654',
  '+919566369654',
  timezone('utc'::text, now()),
  'system_initialization'
)
ON CONFLICT (id) DO NOTHING;

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.announcement_settings ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Public Read Access
-- Allows all users (both anonymous public visitors and authenticated users) to read announcement settings
DROP POLICY IF EXISTS "Allow public read of announcement settings" ON public.announcement_settings;
CREATE POLICY "Allow public read of announcement settings"
  ON public.announcement_settings
  FOR SELECT
  TO public
  USING (true);

-- 5. Policy: Administrator Write Access
-- Restricts INSERT, UPDATE, and DELETE operations to authenticated users whose server-signed JWT
-- contains an admin role in app_metadata (e.g. app_metadata.role = 'admin' or app_metadata.is_admin = true).
DROP POLICY IF EXISTS "Allow admin write of announcement settings" ON public.announcement_settings;
CREATE POLICY "Allow admin write of announcement settings"
  ON public.announcement_settings
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    OR (auth.jwt() -> 'app_metadata' ->> 'is_admin') = 'true'
  )
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    OR (auth.jwt() -> 'app_metadata' ->> 'is_admin') = 'true'
  );
