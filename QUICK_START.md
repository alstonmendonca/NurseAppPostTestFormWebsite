# Quick Start - Post-Test Form

## 1. Database Setup (Run in Supabase SQL Editor)

Copy and paste the entire contents of `posttest_responses_table.sql` into your Supabase SQL Editor and run it.

## 2. Application Setup

```bash
# Navigate to the project directory
cd c:\Users\alsto\Desktop\posttest-form

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Edit .env file and add your Supabase credentials
# VITE_SUPABASE_URL=your_url
# VITE_SUPABASE_ANON_KEY=your_key

# Run development server
npm run dev
```

## 3. Test the Form

1. Open the URL shown in terminal (usually http://localhost:5173)
2. Enter a valid participant number (one that was assigned during pre-test)
3. Fill out the form
4. If the participant is in the Intervention group, they'll see 3 additional app feedback questions
5. Submit and verify in Supabase that the data was saved

## 4. Build for Production

```bash
npm run build
```

## That's it! 🎉

Your post-test form is ready to use. The key differences from pre-test:
- Requires participant number input (validates against existing participants)
- Shows app feedback questions ONLY to Intervention group participants
- Prevents duplicate submissions
- Stores responses in separate `posttest_responses` table
