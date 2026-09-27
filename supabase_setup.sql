-- ============================================================================
-- DIMAAG KA FALOODA: BEAT RUN 2.0 - SUPABASE SECURITY LOCKDOWN SCRIPT
-- Project ID: dfixypyqewrdofaufehg
-- SQL Editor URL: https://supabase.com/dashboard/project/dfixypyqewrdofaufehg/sql/new
-- ============================================================================

-- STEP 1: Delete all unauthorized or hacked records
DELETE FROM public.blind_matrix_leaderboard 
WHERE username IN ('HACKUR', 'HACK_TEST', '__test_probe__')
   OR username ILIKE '%hack%';

-- STEP 2: Create the leaderboard table if not already present
CREATE TABLE IF NOT EXISTS public.blind_matrix_leaderboard (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    avatar TEXT NOT NULL DEFAULT 'cutting_chai',
    high_score BIGINT NOT NULL DEFAULT 0,
    max_level INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- STEP 3: Create index on high_score for instant leaderboard queries
CREATE INDEX IF NOT EXISTS idx_leaderboard_high_score 
ON public.blind_matrix_leaderboard (high_score DESC);

-- STEP 4: Force Row Level Security (RLS)
ALTER TABLE public.blind_matrix_leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blind_matrix_leaderboard FORCE ROW LEVEL SECURITY;

-- STEP 5: Drop ALL existing policies to eliminate permissive write holes
DO $$ 
DECLARE 
    pol record;
BEGIN 
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'blind_matrix_leaderboard' AND schemaname = 'public'
    LOOP 
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.blind_matrix_leaderboard', pol.policyname);
    END LOOP; 
END $$;

-- STEP 6: Create strictly READ-ONLY policy for the public / anon key
CREATE POLICY "Public leaderboard view"
ON public.blind_matrix_leaderboard
FOR SELECT
TO anon, authenticated
USING (true);

-- STEP 7: Revoke write permissions at the PostgreSQL role level
-- Completely blocks any client-side INSERT, UPDATE, DELETE from PostgREST / anon key
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.blind_matrix_leaderboard FROM anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.blind_matrix_leaderboard FROM authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.blind_matrix_leaderboard FROM public;

-- Grant SELECT only to public and anon
GRANT SELECT ON TABLE public.blind_matrix_leaderboard TO anon;
GRANT SELECT ON TABLE public.blind_matrix_leaderboard TO authenticated;

-- Grant full administrative access to service_role (used by /api/submit-score on Vercel)
GRANT ALL ON TABLE public.blind_matrix_leaderboard TO service_role;

-- STEP 8: Add table to Supabase Realtime Publication for live WebSocket score push
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'blind_matrix_leaderboard'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.blind_matrix_leaderboard;
    END IF;
END $$;
