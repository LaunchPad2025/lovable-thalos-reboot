
-- Add training columns to paulie_queries table
ALTER TABLE IF EXISTS public.paulie_queries 
ADD COLUMN IF NOT EXISTS training_status TEXT CHECK (training_status IN ('approved', 'rejected', 'rewritten')),
ADD COLUMN IF NOT EXISTS improved_response TEXT,
ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
