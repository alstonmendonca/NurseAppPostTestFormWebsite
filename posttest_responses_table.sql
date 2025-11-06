-- SQL CREATE statement for posttest_responses table
-- This table stores the responses from the post-test form including app feedback

CREATE TABLE posttest_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  participant_number INT4 REFERENCES participants(participant_number) ON DELETE CASCADE,
  -- If participant number is not provided, participants can self-report whether they were in the Intervention group
  self_reported_intervention BOOLEAN NOT NULL DEFAULT FALSE,
  
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
CREATE INDEX idx_posttest_responses_self_reported_intervention ON posttest_responses(self_reported_intervention);

-- Add comments to document the table
COMMENT ON TABLE posttest_responses IS 'Stores post-test form responses including app feedback from participants';
COMMENT ON COLUMN posttest_responses.participant_number IS 'References the participant number who submitted the response';
COMMENT ON COLUMN posttest_responses.who5_cheerful IS 'WHO-5: Felt cheerful and in good spirits (0-5)';
COMMENT ON COLUMN posttest_responses.who5_calm IS 'WHO-5: Felt calm and relaxed (0-5)';
COMMENT ON COLUMN posttest_responses.who5_active IS 'WHO-5: Felt active and vigorous (0-5)';
COMMENT ON COLUMN posttest_responses.who5_rested IS 'WHO-5: Woke up feeling fresh and rested (0-5)';
COMMENT ON COLUMN posttest_responses.who5_interested IS 'WHO-5: Daily life filled with interesting things (0-5)';
COMMENT ON COLUMN posttest_responses.pss4_unable_control IS 'PSS-4: Unable to control important things (0-4)';
COMMENT ON COLUMN posttest_responses.pss4_confident_handle IS 'PSS-4: Confident about handling problems (0-4)';
COMMENT ON COLUMN posttest_responses.pss4_going_your_way IS 'PSS-4: Things going your way (0-4)';
COMMENT ON COLUMN posttest_responses.pss4_difficulties_piling IS 'PSS-4: Difficulties piling up (0-4)';
COMMENT ON COLUMN posttest_responses.burnout_level IS 'Self-reported burnout level';
COMMENT ON COLUMN posttest_responses.additional_comments IS 'Optional additional comments from the participant';
COMMENT ON COLUMN posttest_responses.app_helpful_features IS 'Feedback: What features of the app were most helpful';
COMMENT ON COLUMN posttest_responses.app_technical_issues IS 'Feedback: Technical issues or difficulties encountered';
COMMENT ON COLUMN posttest_responses.app_suggestions IS 'Feedback: Suggestions for app improvement';
COMMENT ON COLUMN posttest_responses.self_reported_intervention IS 'When participant did not provide a participant number, they may self-report that they were in the intervention group';
COMMENT ON COLUMN posttest_responses.submitted_at IS 'When the post-test form was submitted';
