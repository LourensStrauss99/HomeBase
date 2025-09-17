-- Drop existing policies first (in case they exist)
DROP POLICY IF EXISTS "Users can insert their own data" ON users;
DROP POLICY IF EXISTS "Allow reading usernames" ON users;
DROP POLICY IF EXISTS "Allow reading usernames for signup" ON users;
DROP POLICY IF EXISTS "Allow authenticated users to upload profile photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update their profile photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to profile photos" ON storage.objects;

-- Add unique constraint to username column (if not already exists)
ALTER TABLE users ADD CONSTRAINT users_username_unique UNIQUE (username);

-- Enable RLS on users table (if not already enabled)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to insert their own data
CREATE POLICY "Users can insert their own data" ON users
FOR INSERT WITH CHECK (auth.uid() = id);

-- Policy: Allow authenticated users to read their own data
CREATE POLICY "Users can read their own data" ON users
FOR SELECT USING (auth.uid() = id);

-- For storage bucket policies:
-- Enable RLS on storage.objects (usually already enabled)
-- Policy: Allow authenticated users to upload to profile-photos bucket
CREATE POLICY "Allow authenticated users to upload profile photos" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'profile-photos' AND auth.role() = 'authenticated');

-- Also allow updating their own files
CREATE POLICY "Allow authenticated users to update their profile photos" ON storage.objects
FOR UPDATE USING (bucket_id = 'profile-photos' AND auth.role() = 'authenticated');

-- Allow reading profile photos (public access)
CREATE POLICY "Allow public access to profile photos" ON storage.objects
FOR SELECT USING (bucket_id = 'profile-photos');