/*
# Create contact enquiries table

1. New Tables
- `contact_enquiries`
- `id` (uuid, primary key): Unique enquiry identifier.
- `name` (text): Enquirer's name.
- `company` (text): Enquirer's company name.
- `email` (text): Enquirer's contact email.
- `area_of_interest` (text): Selected service or area of interest.
- `message` (text): Enquiry details.
- `created_at` (timestamptz): Submission timestamp.
2. Security
- Enable row level security.
- Allow anonymous visitors to submit enquiries with basic length checks.
- Deny reading, changing, or deleting enquiries from the public browser client.
3. Important Notes
- This is a single-tenant public website with no sign-in screen.
- Enquiries are intentionally write-only from the visitor-facing site.
*/

CREATE TABLE IF NOT EXISTS public.contact_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  company text NOT NULL CHECK (char_length(company) BETWEEN 2 AND 160),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 320),
  area_of_interest text NOT NULL CHECK (char_length(area_of_interest) BETWEEN 2 AND 120),
  message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 4000),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Visitors cannot read contact enquiries" ON public.contact_enquiries;
CREATE POLICY "Visitors cannot read contact enquiries"
  ON public.contact_enquiries FOR SELECT
  TO anon, authenticated
  USING (false);

DROP POLICY IF EXISTS "Visitors can submit contact enquiries" ON public.contact_enquiries;
CREATE POLICY "Visitors can submit contact enquiries"
  ON public.contact_enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 2 AND 120
    AND char_length(company) BETWEEN 2 AND 160
    AND char_length(email) BETWEEN 3 AND 320
    AND char_length(area_of_interest) BETWEEN 2 AND 120
    AND char_length(message) BETWEEN 10 AND 4000
  );

DROP POLICY IF EXISTS "Visitors cannot update contact enquiries" ON public.contact_enquiries;
CREATE POLICY "Visitors cannot update contact enquiries"
  ON public.contact_enquiries FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "Visitors cannot delete contact enquiries" ON public.contact_enquiries;
CREATE POLICY "Visitors cannot delete contact enquiries"
  ON public.contact_enquiries FOR DELETE
  TO anon, authenticated
  USING (false);
