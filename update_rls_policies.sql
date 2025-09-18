-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow reading usernames" ON users;
DROP POLICY IF EXISTS "Allow reading usernames for signup" ON users;

-- Create new policy for username checking
CREATE POLICY "Allow reading usernames for signup validation" ON users
FOR SELECT USING (true);

-- Also ensure we can read all columns for authenticated users
CREATE POLICY "Allow authenticated users to read all user data" ON users
FOR SELECT USING (auth.role() = 'authenticated');