# Post-Test Form

Post-test assessment form for the SHANTHI App study. This form includes the same psychological assessments as the pre-test plus additional feedback questions about the app experience.

## Features

- Same assessments as pre-test (WHO-5, PSS-4, Brief COPE, Burnout)
- App feedback questions for intervention group participants
- Participant number validation
- Mobile-responsive design
- Supabase database integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the development server:
```bash
npm run dev
```

## Database

Run the `posttest_responses_table.sql` file in your Supabase SQL editor to create the necessary table.

## Build

```bash
npm run build
```
