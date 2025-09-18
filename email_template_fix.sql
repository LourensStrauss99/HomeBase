-- Update the email template for signup confirmation
-- Run this in Supabase SQL Editor to fix the email template

-- First, let's see what the current template looks like
-- Go to Authentication > Email Templates in Supabase Dashboard
-- Update the "Confirm signup" template

-- The template should have this structure:
-- Subject: Confirm your signup
-- Body (HTML):
/*
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your user:</p>
<p><a href="{{ .SiteURL }}/HomeBase/confirm.html?token={{ .Token }}&type={{ .Type }}">Confirm your account</a></p>
*/

-- OR use the redirect_to parameter:
/*
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your user:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your account</a></p>
*/

-- Note: You need to update this in the Supabase Dashboard UI, not via SQL
-- Go to: Authentication > Email Templates > Confirm signup
-- Replace the template content with the above HTML