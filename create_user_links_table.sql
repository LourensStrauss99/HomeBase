-- Fix user_links table - add missing columns
ALTER TABLE public.user_links
ADD COLUMN IF NOT EXISTS icon character varying(50) NULL,
ADD COLUMN IF NOT EXISTS click_count integer NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone NULL DEFAULT now();

-- Enable RLS if not already enabled
ALTER TABLE public.user_links ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view their own links" ON public.user_links;
DROP POLICY IF EXISTS "Users can insert their own links" ON public.user_links;
DROP POLICY IF EXISTS "Users can update their own links" ON public.user_links;
DROP POLICY IF EXISTS "Users can delete their own links" ON public.user_links;

-- Recreate RLS Policies
CREATE POLICY "Users can view their own links" ON public.user_links
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own links" ON public.user_links
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own links" ON public.user_links
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own links" ON public.user_links
  FOR DELETE USING (auth.uid() = user_id);