-- ==============================================================================
-- As-Safar Umrah Travel - Supabase Migration for Umrah Packages
-- Table: public.umrah_packages
-- ==============================================================================

-- 1. Create the umrah_packages table
CREATE TABLE IF NOT EXISTS public.umrah_packages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('economy', 'standard', 'premium')),
  price TEXT NOT NULL,
  duration TEXT NOT NULL,
  short_description TEXT NOT NULL,
  makkah_hotel TEXT NOT NULL,
  madinah_hotel TEXT NOT NULL,
  transport TEXT NOT NULL,
  meals TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_by TEXT
);

-- 2. Seed initial packages matching existing website offerings
INSERT INTO public.umrah_packages (
  id,
  name,
  category,
  price,
  duration,
  short_description,
  makkah_hotel,
  madinah_hotel,
  transport,
  meals,
  status,
  image_url,
  created_at,
  updated_at,
  updated_by
)
VALUES
  (
    'pkg-economy-01',
    'Economy Umrah Package',
    'economy',
    '₹84,500',
    '14 Days (7 Makkah + 7 Madinah)',
    'Affordable comfort with verified 3-star hotels within walking distance and full scholar ritual guidance.',
    'Dar Al Eiman Al Khalil / Equivalent (3★, ~550m to Haram courtyard)',
    'Al Eiman Taibah / Equivalent (3★, ~350m to Prophet Mosque courtyard)',
    'Air-conditioned luxury group coach with experienced bilingual drivers',
    '3 South Indian buffet meals daily prepared fresh by Tamil culinary chefs',
    'active',
    'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80',
    timezone('utc'::text, now()),
    timezone('utc'::text, now()),
    'system_initialization'
  ),
  (
    'pkg-standard-02',
    'Standard Umrah Package',
    'standard',
    '₹1,08,000',
    '15 Days (8 Makkah + 7 Madinah)',
    'Closer hotel perimeter, superior 4-star comfort, 24/7 shuttle service, and dedicated scholar accompaniment.',
    'Al Kiswah Towers / Elaf Bakkah (4★, ~300m / 24-7 private shuttle)',
    'Saja Al Madinah / Golden Tulip (4★, ~200m from Ladies & Gents gates)',
    'Modern Mercedes / Yutong high-deck executive AC coaches',
    'Full-board multi-cuisine buffet (South Indian, North Indian, Arabic, Tea/Coffee)',
    'active',
    'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80',
    timezone('utc'::text, now()),
    timezone('utc'::text, now()),
    'system_initialization'
  ),
  (
    'pkg-premium-03',
    'Premium Umrah Experience',
    'premium',
    '₹1,48,500',
    '15 Days (8 Makkah + 7 Madinah)',
    '5-Star luxury steps away from the Kaaba, Haramain high-speed bullet train, and VIP ground assistance.',
    'Makkah Clock Royal Tower (Fairmont) / Swissôtel (5★, Zero metres / Direct Haram lift)',
    'Dar Al Taqwa / Pullman Zamzam Madinah (5★, Front row facing main gates)',
    'Haramain High-Speed Bullet Train (Business Class) + Private VIP Coach',
    'Lavish international 5-star hotel buffet with live cooking stations & Tamil cuisine',
    'active',
    'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80',
    timezone('utc'::text, now()),
    timezone('utc'::text, now()),
    'system_initialization'
  ),
  (
    'pkg-economy-draft',
    'Early Bird Ramadan Economy Preview',
    'economy',
    '₹95,000',
    '15 Days (First Half Ramadan)',
    'Preliminary Ramadan itinerary draft with quad-sharing and pre-arranged Suhoor & Iftar arrangements.',
    'Al Hijra Towers / Equivalent (3★, Shuttled)',
    'Elaf Taiba / Equivalent (3★, ~400m)',
    'Scheduled AC coach group transfers',
    'Complete Suhoor & Iftar dining packages with South Indian dishes',
    'inactive',
    'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80',
    timezone('utc'::text, now()),
    timezone('utc'::text, now()),
    'system_initialization'
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  short_description = EXCLUDED.short_description,
  makkah_hotel = EXCLUDED.makkah_hotel,
  madinah_hotel = EXCLUDED.madinah_hotel,
  transport = EXCLUDED.transport,
  meals = EXCLUDED.meals,
  status = EXCLUDED.status,
  image_url = EXCLUDED.image_url,
  updated_at = timezone('utc'::text, now());

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.umrah_packages ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Public Read Access (Active packages ONLY)
-- Anonymous public visitors can only query and view packages where status = 'active'
DROP POLICY IF EXISTS "Allow public read of active packages" ON public.umrah_packages;
CREATE POLICY "Allow public read of active packages"
  ON public.umrah_packages
  FOR SELECT
  TO public
  USING (status = 'active');

-- 5. Policy: Administrator Read Access (All packages)
-- Authenticated users with admin role in app_metadata can view all packages, including inactive/drafts
DROP POLICY IF EXISTS "Allow admin read all packages" ON public.umrah_packages;
CREATE POLICY "Allow admin read all packages"
  ON public.umrah_packages
  FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    OR (auth.jwt() -> 'app_metadata' ->> 'is_admin') = 'true'
  );

-- 6. Policy: Administrator Write Access (INSERT, UPDATE, DELETE)
-- Restricts package creation, modifications, and deletions to authorized administrators
DROP POLICY IF EXISTS "Allow admin write packages" ON public.umrah_packages;
CREATE POLICY "Allow admin write packages"
  ON public.umrah_packages
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
