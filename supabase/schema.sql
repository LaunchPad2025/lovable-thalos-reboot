-- ...existing code...

CREATE TABLE IF NOT EXISTS media_training_dataset (
    id SERIAL PRIMARY KEY,
    media_type TEXT NOT NULL, -- video, image, or audio
    cue_type TEXT NOT NULL, -- hazard type
    description TEXT,
    regulation_code TEXT,
    keywords TEXT[], -- Array of keywords
    industry TEXT,
    labels TEXT[], -- Array of labels
    status TEXT NOT NULL CHECK (status IN ('needs_review', 'approved', 'rejected')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Ensure updated_at is automatically updated
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON media_training_dataset
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ...existing code...