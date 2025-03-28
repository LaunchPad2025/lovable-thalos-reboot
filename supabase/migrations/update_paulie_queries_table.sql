
-- Add review status and label columns to track feedback status
ALTER TABLE public.paulie_queries
ADD COLUMN IF NOT EXISTS review_status TEXT NULL,
ADD COLUMN IF NOT EXISTS review_label TEXT NULL;

-- Create indexes to improve query performance
CREATE INDEX IF NOT EXISTS idx_paulie_queries_helpful ON public.paulie_queries(helpful);
CREATE INDEX IF NOT EXISTS idx_paulie_queries_review_status ON public.paulie_queries(review_status);
