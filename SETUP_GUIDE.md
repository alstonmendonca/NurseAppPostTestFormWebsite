# Post-Test Form Setup Guide

## Overview
A complete post-test form project has been created at `c:\Users\alsto\Desktop\posttest-form`. This is entirely separate from your pre-test form.

## What's Included

### Assessment Questions (Same as Pre-Test)
- WHO-5 Well-Being Index (5 questions, 0-5 scale)
- PSS-4 Perceived Stress Scale (4 questions, 0-4 scale)
- Brief COPE Assessment (8 subscales, 16 questions, 1-4 scale)
  - Active Coping
  - Planning
  - Positive Reframing
  - Acceptance
  - Emotional Support
  - Self-Distraction
  - Self-Blame
- Burnout Assessment (1 question, multiple choice)
- Additional Comments (optional text)

### New App Feedback Questions (Only for Intervention Group)
1. **What features did you find most helpful?**
2. **Were there any technical issues or difficulties?**
3. **What suggestions would you make for improvement?**

## Database Setup

### SQL Command to Create the Table

Run this command in your Supabase SQL Editor:

```sql
CREATE TABLE posttest_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  participant_number INT4 REFERENCES participants(participant_number) ON DELETE CASCADE,
  
  -- WHO-5 Well-Being Index (0-5 scale)
  who5_cheerful INT2 CHECK (who5_cheerful >= 0 AND who5_cheerful <= 5),
  who5_calm INT2 CHECK (who5_calm >= 0 AND who5_calm <= 5),
  who5_active INT2 CHECK (who5_active >= 0 AND who5_active <= 5),
  who5_rested INT2 CHECK (who5_rested >= 0 AND who5_rested <= 5),
  who5_interested INT2 CHECK (who5_interested >= 0 AND who5_interested <= 5),
  
  -- PSS-4 Perceived Stress (0-4 scale)
  pss4_unable_control INT2 CHECK (pss4_unable_control >= 0 AND pss4_unable_control <= 4),
  pss4_confident_handle INT2 CHECK (pss4_confident_handle >= 0 AND pss4_confident_handle <= 4),
  pss4_going_your_way INT2 CHECK (pss4_going_your_way >= 0 AND pss4_going_your_way <= 4),
  pss4_difficulties_piling INT2 CHECK (pss4_difficulties_piling >= 0 AND pss4_difficulties_piling <= 4),
  
  -- Brief COPE - Active Coping (1-4 scale)
  cope_concentrating_efforts INT2 CHECK (cope_concentrating_efforts >= 1 AND cope_concentrating_efforts <= 4),
  cope_taking_action INT2 CHECK (cope_taking_action >= 1 AND cope_taking_action <= 4),
  
  -- Brief COPE - Planning (1-4 scale)
  cope_strategy INT2 CHECK (cope_strategy >= 1 AND cope_strategy <= 4),
  cope_thinking_steps INT2 CHECK (cope_thinking_steps >= 1 AND cope_thinking_steps <= 4),
  
  -- Brief COPE - Positive Reframing (1-4 scale)
  cope_different_light INT2 CHECK (cope_different_light >= 1 AND cope_different_light <= 4),
  cope_looking_good INT2 CHECK (cope_looking_good >= 1 AND cope_looking_good <= 4),
  
  -- Brief COPE - Acceptance (1-4 scale)
  cope_accepting_reality INT2 CHECK (cope_accepting_reality >= 1 AND cope_accepting_reality <= 4),
  cope_learning_live INT2 CHECK (cope_learning_live >= 1 AND cope_learning_live <= 4),
  
  -- Brief COPE - Emotional Support (1-4 scale)
  cope_emotional_support INT2 CHECK (cope_emotional_support >= 1 AND cope_emotional_support <= 4),
  cope_comfort_understanding INT2 CHECK (cope_comfort_understanding >= 1 AND cope_comfort_understanding <= 4),
  
  -- Brief COPE - Self-Distraction (1-4 scale)
  cope_work_activities INT2 CHECK (cope_work_activities >= 1 AND cope_work_activities <= 4),
  cope_movies_tv_reading INT2 CHECK (cope_movies_tv_reading >= 1 AND cope_movies_tv_reading <= 4),
  
  -- Brief COPE - Self-Blame (1-4 scale)
  cope_criticizing_myself INT2 CHECK (cope_criticizing_myself >= 1 AND cope_criticizing_myself <= 4),
  cope_blaming_myself INT2 CHECK (cope_blaming_myself >= 1 AND cope_blaming_myself <= 4),
  
  -- Burnout Assessment
  burnout_level VARCHAR(50) NOT NULL,
  
  -- General feedback
  additional_comments TEXT,
  
  -- App Feedback (only for intervention group)
  app_helpful_features TEXT,
  app_technical_issues TEXT,
  app_suggestions TEXT,
  
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_posttest_responses_participant_number ON posttest_responses(participant_number);
CREATE INDEX idx_posttest_responses_submitted_at ON posttest_responses(submitted_at);
```

Or simply run the file: `posttest_responses_table.sql`

## Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd c:\Users\alsto\Desktop\posttest-form
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials (same as pre-test):
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## Key Features

### Participant Validation
- Users must enter their participant number from the pre-test
- System validates the participant number exists and was used
- Checks if participant already submitted a post-test (prevents duplicates)
- Automatically detects if participant is in Intervention or Control group

### Dynamic Form
- **Control Group:** Sees only the standard assessment questions
- **Intervention Group:** Sees all assessment questions PLUS 3 app feedback questions

### Security
- Anonymous data collection
- Validates participant numbers against existing records
- Prevents duplicate submissions
- Secure database connection via Supabase

## File Structure

```
posttest-form/
├── src/
│   ├── components/
│   │   ├── PosttestForm.jsx    # Main form with all questions
│   │   └── SuccessPage.jsx     # Success confirmation page
│   ├── lib/
│   │   └── supabase.js         # Database connection
│   ├── App.jsx                 # Main application logic
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── posttest_responses_table.sql # Database table creation
├── package.json
├── vite.config.js
├── index.html
├── .env.example
├── .gitignore
└── README.md
```

## Deployment

The project is ready to deploy on Vercel or any other hosting platform:

1. Push to GitHub repository
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Important Notes

- The app feedback questions only appear for participants in the **Intervention** group
- The system automatically checks group assignment from the database
- Each participant can only submit the post-test once
- All responses are stored in the `posttest_responses` table in Supabase
- The original pre-test form directory remains completely unchanged
