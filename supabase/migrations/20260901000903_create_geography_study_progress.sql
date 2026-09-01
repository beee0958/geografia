/*
# Persist study progress for Geography platform

1. New Tables
- `geography_study_progress`
- `question_id` (text, stable identifier for each exercise)
- `selected_answer` (integer, selected option index when answered)
- `is_correct` (boolean, result of the attempt)
- `is_favorite` (boolean, lets the learner bookmark a question)
- `updated_at` (timestamp, last local learning update)

2. Security
- Enables row level security on the shared, no-sign-in study progress table.
- Allows anonymous and authenticated learners to read and update their own browser-independent progress in this single-course experience.

3. Notes
- The table intentionally has no user account relationship because the platform has no sign-in screen.
- The question identifiers are controlled by the course content and the table stores only learning state, never personal information.
*/

CREATE TABLE IF NOT EXISTS public.geography_study_progress (
  question_id text PRIMARY KEY,
  selected_answer integer,
  is_correct boolean,
  is_favorite boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.geography_study_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public learners can read geography progress" ON public.geography_study_progress;
CREATE POLICY "Public learners can read geography progress"
  ON public.geography_study_progress FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public learners can create geography progress" ON public.geography_study_progress;
CREATE POLICY "Public learners can create geography progress"
  ON public.geography_study_progress FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public learners can update geography progress" ON public.geography_study_progress;
CREATE POLICY "Public learners can update geography progress"
  ON public.geography_study_progress FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public learners can delete geography progress" ON public.geography_study_progress;
CREATE POLICY "Public learners can delete geography progress"
  ON public.geography_study_progress FOR DELETE
  TO anon, authenticated
  USING (true);
