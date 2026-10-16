-- =========================================================================
-- DATABASE SCHEMA: GPT — Ganpati Pule Trip Registration System
-- Target: Supabase (PostgreSQL) - 100% Cloud Architecture
-- =========================================================================

-- STEP 1: Create the registrations table first
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    number_of_people INTEGER NOT NULL DEFAULT 1 CHECK (number_of_people >= 1 AND number_of_people <= 10),
    city TEXT,
    preferred_contact_method TEXT DEFAULT 'whatsapp',
    short_note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- STEP 2: Create unique index to prevent duplicate mobile registrations
CREATE UNIQUE INDEX IF NOT EXISTS idx_registrations_mobile_unique 
ON public.registrations(mobile_number);

-- STEP 3: Enable Row Level Security (RLS)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- STEP 4: Policy - Allow public visitors to submit expressions of interest
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'registrations' 
        AND policyname = 'Allow anonymous registrations'
    ) THEN
        CREATE POLICY "Allow anonymous registrations" 
        ON public.registrations
        FOR INSERT 
        TO anon, authenticated
        WITH CHECK (true);
    END IF;
END $$;

-- STEP 5: Public Aggregate Counter Function (SECURITY DEFINER)
-- Allows public visitors to view ONLY total registrations & headcount without exposing personal details.
CREATE OR REPLACE FUNCTION public.get_registration_stats()
RETURNS JSONB
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT json_build_object(
        'totalRegistrations', COUNT(*),
        'totalPeople', COALESCE(SUM(number_of_people), 0)
    )
    FROM public.registrations;
$$;

GRANT EXECUTE ON FUNCTION public.get_registration_stats() TO anon, authenticated;

-- STEP 6: Secure Organizer Function to fetch all registrations with Passcode
CREATE OR REPLACE FUNCTION public.get_organizer_registrations(organizer_pin TEXT)
RETURNS SETOF public.registrations
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
BEGIN
    IF organizer_pin IS NULL OR organizer_pin <> 'GPT2026' THEN
        RAISE EXCEPTION 'Invalid organizer passcode';
    END IF;
    RETURN QUERY 
    SELECT * FROM public.registrations 
    ORDER BY created_at DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_organizer_registrations(TEXT) TO anon, authenticated;

-- STEP 7: Secure Organizer Function to delete a registration with Passcode
CREATE OR REPLACE FUNCTION public.delete_registration_by_id(record_id UUID, organizer_pin TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF organizer_pin IS NULL OR organizer_pin <> 'GPT2026' THEN
        RAISE EXCEPTION 'Invalid organizer passcode';
    END IF;
    DELETE FROM public.registrations WHERE id = record_id;
    RETURN TRUE;
END;
$$;

GRANT EXECUTE ON FUNCTION public.delete_registration_by_id(UUID, TEXT) TO anon, authenticated;

-- STEP 8: Secure Organizer Function to clear all registrations with Passcode
CREATE OR REPLACE FUNCTION public.clear_all_registrations_admin(organizer_pin TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF organizer_pin IS NULL OR organizer_pin <> 'GPT2026' THEN
        RAISE EXCEPTION 'Invalid organizer passcode';
    END IF;
    TRUNCATE TABLE public.registrations;
    RETURN TRUE;
END;
$$;

GRANT EXECUTE ON FUNCTION public.clear_all_registrations_admin(TEXT) TO anon, authenticated;
