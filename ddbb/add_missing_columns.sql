-- Migration: Add missing columns to users table

-- Add guardian_id column
ALTER TABLE users ADD COLUMN IF NOT EXISTS guardian_id TEXT;

-- Add emergency_contacts column as JSON to store multiple contacts
ALTER TABLE users ADD COLUMN IF NOT EXISTS emergency_contacts JSONB DEFAULT '[]'::jsonb;

-- Add scout_group column
ALTER TABLE users ADD COLUMN IF NOT EXISTS scout_group TEXT;

-- Add photo_authorization column
ALTER TABLE users ADD COLUMN IF NOT EXISTS photo_authorization TEXT;

-- Add public_faith_data column
ALTER TABLE users ADD COLUMN IF NOT EXISTS public_faith_data TEXT;

-- Add indexes for better query performance on new columns if needed
CREATE INDEX IF NOT EXISTS idx_users_guardian_id ON users (guardian_id);
CREATE INDEX IF NOT EXISTS idx_users_scout_group ON users (scout_group);

-- Update RLS policies so users can update their own profile
-- This assumes there's already an RLS policy checking user id
-- If you have existing policies, you might need to adjust them
-- For example, if you have a policy that looks like:
--   (auth.uid() = id) OR (SELECT is_admin() FROM users WHERE id = auth.uid())

-- You might need to make sure the new columns can be updated by the user themselves
-- You may need to add/update policies like:
/*
-- Update policy allowing users to update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);
*/