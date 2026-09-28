-- ============================================================================
-- DIMAAG KA FALOODA: BEAT RUN 3.0 "FORTRESS EDITION" - DATABASE SCHEMA & MIGRATION
-- Project ID: dfixypyqewrdofaufehg
-- SQL Editor URL: https://supabase.com/dashboard/project/dfixypyqewrdofaufehg/sql/new
-- ============================================================================

-- 1. Create or upgrade the leaderboard table
CREATE TABLE IF NOT EXISTS public.blind_matrix_leaderboard (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    avatar TEXT NOT NULL DEFAULT 'cutting_chai',
    high_score BIGINT NOT NULL DEFAULT 0,
    max_level INTEGER NOT NULL DEFAULT 1,
    mode TEXT NOT NULL DEFAULT 'solo',
    replay_hash TEXT,
    device_type TEXT DEFAULT 'unknown',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Migration safety for existing v2 tables
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='blind_matrix_leaderboard' AND column_name='mode') THEN
        ALTER TABLE public.blind_matrix_leaderboard ADD COLUMN mode TEXT NOT NULL DEFAULT 'solo';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='blind_matrix_leaderboard' AND column_name='replay_hash') THEN
        ALTER TABLE public.blind_matrix_leaderboard ADD COLUMN replay_hash TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='blind_matrix_leaderboard' AND column_name='device_type') THEN
        ALTER TABLE public.blind_matrix_leaderboard ADD COLUMN device_type TEXT DEFAULT 'unknown';
    END IF;
END $$;

-- 2. Index high_score for instant top-10 queries
CREATE INDEX IF NOT EXISTS idx_leaderboard_high_score 
ON public.blind_matrix_leaderboard (high_score DESC);

-- 3. Force Row Level Security (RLS)
ALTER TABLE public.blind_matrix_leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blind_matrix_leaderboard FORCE ROW LEVEL SECURITY;

-- 4. Purge all legacy or permissive policies
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

-- 5. Create strictly READ-ONLY policy for public and anonymous players
CREATE POLICY "Public leaderboard view"
ON public.blind_matrix_leaderboard
FOR SELECT
TO anon, authenticated
USING (true);

-- 6. Revoke write permissions at the database role level (Blocks unauthorized PostgREST writes)
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.blind_matrix_leaderboard FROM anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.blind_matrix_leaderboard FROM authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.blind_matrix_leaderboard FROM public;

-- Grant SELECT only to public and anon
GRANT SELECT ON TABLE public.blind_matrix_leaderboard TO anon;
GRANT SELECT ON TABLE public.blind_matrix_leaderboard TO authenticated;

-- Grant administrative full access to service_role (used by /api/submit-score on server)
GRANT ALL ON TABLE public.blind_matrix_leaderboard TO service_role;

-- 7. Realtime Publication attachment for live scoreboard sync
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'blind_matrix_leaderboard'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.blind_matrix_leaderboard;
    END IF;
END $$;
