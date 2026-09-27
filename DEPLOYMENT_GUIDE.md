# BLIND MATRIX: MEMORY RUN 2.0 - DEPLOYMENT & DATABASE GUIDE

A complete, production-ready, step-by-step handbook to upload your game repository to GitHub, set up a 100% free Supabase PostgreSQL database for the live global leaderboard with real-time push synchronization, and host both the frontend and WebSocket 1v1 multiplayer backend for free.

---

## TABLE OF CONTENTS
1. [Prerequisites](#1-prerequisites)
2. [Step 1: Push Game Code to GitHub](#2-step-1-push-game-code-to-github)
3. [Step 2: Free Supabase Cloud Database Setup](#3-step-2-free-supabase-cloud-database-setup)
   - [A. Create Free Project](#a-create-free-project)
   - [B. Run Database Migration SQL](#b-run-database-migration-sql)
   - [C. Retrieve API Keys](#c-retrieve-api-keys)
   - [D. Connect Database to Game](#d-connect-database-to-game)
4. [Step 3: Free Cloud Hosting (Full Multiplayer Support)](#4-step-3-free-cloud-hosting-full-multiplayer-support)
   - [Option A (Recommended): Render.com Free Web Service (Frontend + WebSockets)](#option-a-recommended-rendercom-free-web-service)
   - [Option B: GitHub Pages / Vercel (Static Frontend)](#option-b-github-pages--vercel-static-frontend)
5. [Step 4: Live Verification & Testing](#5-step-4-live-verification--testing)
6. [Troubleshooting & FAQ](#6-troubleshooting--faq)

---

## 1. Prerequisites

Before beginning, ensure you have:
- A free **GitHub Account**: [https://github.com](https://github.com)
- A free **Supabase Account**: [https://supabase.com](https://supabase.com)
- A free **Render Account** (for 1v1 live WebSockets): [https://render.com](https://render.com)
- Git installed on your computer.

---

## 2. Step 1: Push Game Code to GitHub

Follow these steps in your terminal or PowerShell from the project root (`d:\Games`):

### 1. Initialize Git in the project directory
```bash
git init
```

### 2. Stage all project files
```bash
git add .
```

### 3. Make the initial commit
```bash
git commit -m "feat: Blind Matrix 2.0 with dynamic 60-block scaling, lofi radio, and round celebration wave"
```

### 4. Create a new repository on GitHub
1. Open [https://github.com/new](https://github.com/new).
2. Set **Repository name**: `blind-matrix-game` (or any preferred name).
3. Set Visibility: **Public**.
4. Leave "Add a README file" **unchecked** (we already have a complete README).
5. Click **Create repository**.

### 5. Link local repository and push to GitHub
Replace `<YOUR_GITHUB_USERNAME>` with your actual GitHub username:
```bash
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/blind-matrix-game.git
git branch -M main
git push -u origin main
```

Your code is now securely published on your GitHub profile.

---

## 3. Step 2: Free Supabase Cloud Database Setup

Supabase provides a free PostgreSQL database with instant REST APIs and WebSocket Realtime subscriptions.

### A. Create Free Project
1. Log into [https://supabase.com](https://supabase.com) and click **New project**.
2. Select your Organization.
3. Enter Project Name: `blind-matrix-db`.
4. Generate a secure Database Password (save it in a safe place).
5. Choose the region closest to you (e.g., `ap-south-1` Mumbai, `ap-southeast-1` Singapore, or `us-east-1`).
6. Select the **Free Tier** plan ($0/month) and click **Create new project**.
7. Wait 1 to 2 minutes for the database to provision.

---

### B. Run Database Migration SQL
1. In your Supabase Dashboard, click on **SQL Editor** in the left sidebar navigation.
2. Click **New query**.
3. Copy and paste the following SQL script into the query editor:

```sql
-- ============================================================================
-- BLIND MATRIX: GLOBAL LEADERBOARD SCHEMA & REALTIME CONFIGURATION
-- ============================================================================

-- 1. Create the leaderboard table
CREATE TABLE IF NOT EXISTS public.blind_matrix_leaderboard (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    avatar TEXT NOT NULL DEFAULT 'cutting_chai',
    high_score BIGINT NOT NULL DEFAULT 0,
    max_level INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create index on high_score for instant top 10 queries
CREATE INDEX IF NOT EXISTS idx_leaderboard_high_score 
ON public.blind_matrix_leaderboard (high_score DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.blind_matrix_leaderboard ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Allow anyone (anon) to read top scores
CREATE POLICY "Allow public read access"
ON public.blind_matrix_leaderboard
FOR SELECT
TO anon, authenticated
USING (true);

-- 5. Policy: Allow anyone (anon) to insert new high scores
CREATE POLICY "Allow public insert"
ON public.blind_matrix_leaderboard
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 6. Policy: Allow anyone (anon) to update their score
CREATE POLICY "Allow public update"
ON public.blind_matrix_leaderboard
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 7. Add leaderboard table to Supabase Realtime publication
-- This enables instant push updates to all active players when a score changes!
ALTER PUBLICATION supabase_realtime ADD TABLE public.blind_matrix_leaderboard;

-- 8. Seed initial fun bot scores
INSERT INTO public.blind_matrix_leaderboard (username, avatar, high_score, max_level)
VALUES 
    ('SHARMA_JI_KA_LADKA', 'sharma_beta', 4200, 14),
    ('CHINTU_CODER',       'chintu_pro',   3500, 11),
    ('BAAZIGAR_VIRAL',     'desi_alien',   2950, 9),
    ('GABBAR_SINGH',       'gabbar_mustache', 2600, 8),
    ('BABU_RAO',           'babu_rao',     2150, 7),
    ('SAMOSA_BOY',         'samosa_ninja', 1800, 6)
ON CONFLICT (username) DO NOTHING;
```

4. Click **Run** (or press Ctrl + Enter).
5. You should see `Success. No rows returned`. Your table, policies, and real-time streaming are now live!

---

### C. Retrieve API Keys
1. In the Supabase Dashboard, click on the **Settings** (gear icon) in the bottom-left sidebar.
2. Select **API** (or **Data API**).
3. Find:
   - **Project URL**: Format looks like `https://abcdefghijklm.supabase.co`
   - **Project API Keys** &rarr; `anon` `public` key: A long JWT token starting with `eyJhbGciOi...`

---

### D. Connect Database to Game

You have two convenient ways to connect your Supabase credentials:

#### Method 1: In-Game UI (No code edits needed)
1. Open the game in your browser.
2. Click the **SETTINGS** button in the top header.
3. Paste your **Supabase URL** and **Anon Key**.
4. Click **SAVE & CONNECT**.
5. The credentials are encrypted and stored in `localStorage`. The game immediately syncs with your live Supabase database!

#### Method 2: Pre-Configure Default Credentials in `game.js` (For all public visitors)
To make the live leaderboard work for everyone visiting your site without them needing to enter keys:
1. Open `game.js`.
2. Locate line 976 in `APP_STATE`:
```javascript
  supabaseUrl: localStorage.getItem('bm_supa_url') || 'YOUR_SUPABASE_PROJECT_URL_HERE',
  supabaseKey: localStorage.getItem('bm_supa_key') || 'YOUR_SUPABASE_ANON_KEY_HERE',
```
3. Replace `'YOUR_SUPABASE_PROJECT_URL_HERE'` and `'YOUR_SUPABASE_ANON_KEY_HERE'` with your actual Supabase credentials.
4. Commit and push the changes:
```bash
git commit -am "chore: set default public supabase credentials"
git push
```

---

## 4. Step 3: Free Cloud Hosting (Full Multiplayer Support)

Because Blind Matrix 2.0 includes a **native Node.js WebSocket engine** for 1v1 room duels, we recommend deploying on **Render.com** (100% Free).

### Option A (Recommended): Render.com Free Web Service
Render will run your Express static file server and native WebSocket server together on a free HTTPS/WSS URL.

1. Sign in to [https://dashboard.render.com](https://dashboard.render.com).
2. Click **New +** &rarr; **Web Service**.
3. Choose **Build and deploy from a Git repository**.
4. Connect your GitHub account and select your `blind-matrix-game` repository.
5. Configure the deployment settings:
   - **Name**: `blind-matrix` (or your choice)
   - **Region**: Closest to your users (e.g., Singapore or Frankfurt or Oregon)
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: **Free** ($0/month)
6. Click **Create Web Service**.
7. Render will build and deploy your app in about 1–2 minutes.
8. Once deployed, Render provides a public URL:  
   `https://blind-matrix-xyz.onrender.com`

**Everything works out of the box!**
- The game frontend loads smoothly over HTTPS.
- 1v1 Room Duels connect over secure WebSockets (`wss://`).
- Lo-Fi Hindi Radio streams via Web Audio API.
- Live global leaderboard synchronizes automatically with Supabase.

---

### Option B: GitHub Pages / Vercel (Static Frontend)
If you only want static hosting (Solo Mode + Bot Sparring + Live Supabase Leaderboard):

#### Deploying on GitHub Pages:
1. Go to your GitHub repository on [https://github.com](https://github.com).
2. Click **Settings** &rarr; **Pages** (in the left sidebar).
3. Under **Branch**, select `main` and `/ (root)`.
4. Click **Save**.
5. After 1 minute, your site will be live at:  
   `https://<YOUR_GITHUB_USERNAME>.github.io/blind-matrix-game/`

*Note: On GitHub Pages, 1v1 Bot Sparring works completely offline. For live player-vs-player room duels across different devices, host the `server.js` backend on Render.com.*

---

## 5. Step 4: Live Verification & Testing

Verify that all systems are running in peak condition:

1. **Escalating Block Scaling**:
   - Level 1–2: 9 blocks (3x3).
   - Level 3–4: 12 blocks (3x4).
   - Level 5–6: 15 blocks (3x5).
   - Level 7–8: 20 blocks (4x5).
   - Level 9–10: 30 blocks (5x6).
   - Level 11–13: 40 blocks (5x8).
   - Level 14+: 60 blocks (6x10 God Matrix Mode).

2. **Celebration Glow & Dynamic Round Palettes**:
   - Clear Round 1.
   - Observe the elastic ripple wave across all blind blocks.
   - Verify the theme colors smoothly transition to the next round's unique neon combination (e.g., Electric Cyberpunk, Toxic Matrix, Hyper Tangerine).
   - Verify the 1.25s celebration hold before the next round begins.

3. **Retro Radio Terminal**:
   - Click `[ RADIO ]` in the top header.
   - Verify the CRT scanline window opens.
   - Play *Tum Hi Ho*, *Kesariya*, or *Channa Mereya*.
   - Confirm spoken comedy voice lines mute automatically while music plays.

4. **Live Leaderboard**:
   - Finish a game or achieve a high score.
   - Check the **LEADERBOARD** tab in the game.
   - Check your Supabase Table Editor (`blind_matrix_leaderboard`) to verify the new score row is stored.

---

## 6. Troubleshooting & FAQ

### Q: Why is my Supabase leaderboard showing "CONNECTING TO CLOUD..."?
- Ensure you created the table `blind_matrix_leaderboard` with the exact schema in Step 2.
- Verify your Supabase URL has no trailing slash (e.g., `https://xyz.supabase.co`).
- Check that the `anon` public key is entered correctly.
- Ensure Row Level Security (RLS) policies were created using the provided SQL script.

### Q: How do 1v1 Room Codes work across different internet connections?
- When deployed on Render.com, both players enter the same 4-letter Room Code (e.g. `DESI`). The server connects them directly via native WebSockets with zero latency.

### Q: Is there any cost involved?
- **Zero cost ($0.00)**. GitHub, Supabase Free Tier, and Render Free Tier are 100% free with no credit card required.

---

**End of Deployment Guide**
