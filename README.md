# GPT — Ganpati Pule Trip Website

A responsive travel website for the upcoming **GPT — Ganpati Pule Trip** (27–29 November 2026), created to find out how many people are interested in joining our Konkan coastal bike adventure.

![Konkan Coastal Aesthetic](https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

1. **Free Expression of Interest Only**:
   - Zero booking fees, zero payment gateways, zero tickets.
   - Transparent disclaimers explaining that registering interest is non-binding and helps assess group numbers.

2. **Accurate Trip Information**:
   - **Dates**: 27 November 2026 – 29 November 2026
   - **Departure**: Friday, 27 November 2026 at 3:00 AM IST
   - **Departure from destination**: Sunday, 29 November 2026 at 3:00 PM IST
   - **Location**: Ganpatipule, Ratnagiri District, Maharashtra, India
   - **Travel Style**: Motorcycle / Bike Trip (2 main riders + open community)
   - **Accommodation Plan**: Bhakt Niwas (Planned / Tentative)
   - **Confirmed Attractions**: Swayambhu Ganpatipule Ganpati Temple, Ganpatipule Beach
   - **Tentative Suggestions**: Aare Ware Coastal Road & Viewpoint, Jaigad Fort & Lighthouse, Malgund Beach & Prachin Konkan

3. **Coastal Adventure Visual Design**:
   - Palette: Deep ocean blue (`#07274a`, `#0b3c6f`), clean white, subtle saffron accents (`#f97e0c`, `#ea6104`).
   - Live Countdown clock synced to Indian Standard Time (Asia/Kolkata, UTC+5:30) with non-negative guard.
   - Confetti celebratory feedback upon successful registration.
   - Interactive 3-day itinerary with Day 1, 2, and 3 schedule tabs.
   - Category filtering for verified stops vs. tentative suggestions.

4. **Security, Privacy & Dual-Mode Database**:
   - **Dual Mode**: Runs with **Supabase (PostgreSQL with RLS)** or **Zero-Config Local Storage Fallback** if keys are not yet configured.
   - **Public Privacy**: Public interest counters only display aggregate counts (total registrations, total participants). Individual names, phone numbers, and cities are never exposed via public APIs or HTML.
   - **Indian Phone Validation**: Strict validation for 10-digit Indian mobile numbers (starting with 6–9), supporting `+91` prefix and trunk `0`.
   - **Anti-Spam & Rate Limiting**: Cooldown timer per phone number and duplicate submission detection.
   - **Organizer Admin Portal**: Secured behind passcode authentication (Default: `GPT2026`). Organizers can view, search, filter, delete entries, and export all data to CSV.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v22.22.2)
- **npm**: v9+ (tested on npm 10.9.7)

### 2. Installation
```bash
# Clone or navigate into the project directory
cd "c:\Users\dines\Desktop\Project\Trip Registration"

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run Test Suite
```bash
npm test
```
Runs 10 automated unit tests testing phone normalization, form validation, Indian Standard Time countdown calculation, and access control.

### 5. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

---

## 🗄️ Supabase Database Setup (Optional)

The application works immediately out-of-the-box using the built-in local engine. To connect to a live cloud Supabase database:

### Step 1: Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and create a free account.
2. Click **New Project** and name it (e.g. `ganpati-pule-trip`).

### Step 2: Run the SQL Schema
1. In your Supabase project dashboard, click on **SQL Editor** in the left sidebar.
2. Click **New query**.
3. Copy the entire contents of [`supabase/schema.sql`](supabase/schema.sql) and paste it into the editor.
4. Click **Run**.
5. This creates:
   - `registrations` table with constraints and unique mobile index.
   - Row-Level Security (RLS) policies allowing anonymous `INSERT`.
   - Restricted public `SELECT` (anon users cannot read personal rows).
   - `get_registration_stats()` Security Definer function for public aggregate counts.

### Step 3: Configure Environment Variables
1. In your Supabase dashboard, go to **Project Settings** > **API**.
2. Copy your **Project URL** and **anon public key**.
3. Open or create `.env` in the root folder:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_ORGANIZER_PIN=GPT2026
   VITE_ORGANIZER_PHONE=
   VITE_ORGANIZER_EMAIL=
   ```
4. Restart your Vite development server (`npm run dev`).

---

## 🔐 Organizer Portal Instructions

1. Click the shield icon in the top navigation bar or the **"Organizer Portal"** button in the footer.
2. Enter the organizer passcode (Default: `GPT2026`, configurable via `VITE_ORGANIZER_PIN`).
3. Inside the dashboard:
   - Search participants by name, phone number, city, or notes.
   - View total registrations and total interested traveler headcount.
   - Click **Export CSV** to download a spreadsheet with all registration details.
   - Delete/manage records if required.

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Set Build Command: `npm run build` and Output Directory: `dist`.
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ORGANIZER_PIN`
6. Click **Deploy**.

### Deploy to Netlify
1. Connect your repository on [Netlify](https://netlify.com).
2. Set Build Command: `npm run build` and Publish Directory: `dist`.
3. Add the environment variables under **Site Settings > Environment Variables**.
4. Deploy!

---

## 📁 Project Structure

```
├── .env                  # Local environment configuration
├── .env.example          # Template for environment variables
├── index.html            # Main HTML with SEO & Open Graph meta tags
├── package.json          # Dependencies & scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Custom Konkan ocean & saffron styling
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build tool configuration
├── src/
│   ├── App.tsx           # Main application shell & state orchestration
│   ├── main.tsx          # React DOM entry point
│   ├── index.css         # Tailwind & smooth typography
│   ├── vite-env.d.ts     # TypeScript environment declarations
│   ├── components/
│   │   ├── Navbar.tsx             # Responsive header with mobile drawer
│   │   ├── Hero.tsx               # Hero section, countdown, live counter & CTAs
│   │   ├── TripOverview.tsx       # 3 days, bike mode, stay, transparent disclaimer
│   │   ├── Destinations.tsx       # Verified stops & tentative suggestions
│   │   ├── Itinerary.tsx          # 3-day schedule with interactive tabs
│   │   ├── InterestCounter.tsx    # Live public counter (privacy protected)
│   │   ├── RegistrationForm.tsx   # Free registration form with validation & confetti
│   │   ├── AboutSection.tsx       # Trip origins, rider ethos, and FAQ accordion
│   │   ├── OrganizerModal.tsx     # Passcode-gated organizer dashboard & CSV export
│   │   └── Footer.tsx             # Legal, contact info, and disclaimers
│   ├── data/
│   │   └── tripData.ts            # Centralized trip constants, stops, and FAQs
│   ├── services/
│   │   ├── supabase.ts            # Supabase client initialization
│   │   ├── storageFallback.ts     # Offline/local storage engine fallback
│   │   └── registrationService.ts # Unified registration API & rate limiter
│   ├── types/
│   │   └── trip.ts                # TypeScript interfaces and models
│   └── utils/
│       ├── date.ts                # IST timezone countdown and date formatting
│       └── validation.ts          # Indian mobile & form validation rules
├── supabase/
│   └── schema.sql        # Production PostgreSQL schema, RLS policies & RPC
└── tests/
    └── trip.test.mjs     # 10 unit tests for validation, phone formatting & IST countdown
```
