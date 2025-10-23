-- Add initial_weight column to user_profiles table
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS initial_weight REAL;

-- Populate initial_weight with current weight for existing users
-- This assumes that existing users' current weight is their initial weight
UPDATE user_profiles
SET initial_weight = weight
WHERE initial_weight IS NULL;
