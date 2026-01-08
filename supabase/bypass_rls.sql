-- BYPASS RLS FOR DEVELOPMENT
-- Run this to allow ANYONE to insert products (fixes "new row violates row-level security policy")
-- Only use this if you cannot configure the Service Role Key correctly.

CREATE POLICY "Allow Insert for All" ON "public"."products"
FOR INSERT
WITH CHECK (true);
