
-- Add domain column to organizations if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'organizations'
    AND column_name = 'domain'
  ) THEN
    ALTER TABLE organizations ADD COLUMN domain text;
  END IF;
END $$;
