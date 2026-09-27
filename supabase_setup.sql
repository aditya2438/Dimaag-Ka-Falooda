-- ============================================================================
-- DIMAAG KA FALOODA: BEAT RUN 2.0 - SUPABASE LEADERBOARD SCHEMA
-- Project ID: dfixypyqewrdofaufehg
-- SQL Editor: https://supabase.com/dashboard/project/dfixypyqewrdofaufehg/sql/new
-- ============================================================================

-- 1. Create the global leaderboard table
CREATE TABLE IF NOT EXISTS public.blind_matrix_leaderboard (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    avatar TEXT NOT NULL DEFAULT 'cutting_chai',
    high_score BIGINT NOT NULL DEFAULT 0,
    max_level INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create index on high_score for instant leaderboard queries
CREATE INDEX IF NOT EXISTS idx_leaderboard_high_score 
ON public.blind_matrix_leaderboard (high_score DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.blind_matrix_leaderboard ENABLE ROW LEVEL SECURITY;

-- 4. Create Public Read Policy (Allow all players to view leaderboard)
DROP POLICY IF EXISTS "Public leaderboard view" ON public.blind_matrix_leaderboard;
CREATE POLICY "Public leaderboard view"
ON public.blind_matrix_leaderboard
FOR SELECT
TO anon, authenticated
USING (true);

-- 5. Lock Down Write Access (Fix C1 / Root Cause Resolution)
-- Direct client writes from browser anon/authenticated keys are permanently revoked.
-- The trusted backend serverless endpoint (/api/submit-score) uses SUPABASE_SECRET_KEY,
-- which bypasses RLS securely on the server without exposing write capabilities to clients.
DROP POLICY IF EXISTS "Public leaderboard insert" ON public.blind_matrix_leaderboard;
DROP POLICY IF EXISTS "Public leaderboard update" ON public.blind_matrix_leaderboard;

-- 7. Add table to Supabase Realtime Publication for live WebSocket score push
ALTER PUBLICATION supabase_realtime ADD TABLE public.blind_matrix_leaderboard;

-- 8. Seed sample starter scores if table is empty
INSERT INTO public.blind_matrix_leaderboard (username, avatar, high_score, max_level)
VALUES 
    ('Chintu Pro', 'chintu_pro', 12450, 10),
    ('Cutting Chai Master', 'cutting_chai', 9800, 8),
    ('Sharma Ji Ka Beta', 'sharma_beta', 7600, 6)
ON CONFLICT (username) DO NOTHING;
