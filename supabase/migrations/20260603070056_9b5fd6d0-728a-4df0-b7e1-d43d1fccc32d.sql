CREATE TABLE public.course_waitlist (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  course_title text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (email, course_title)
);

GRANT INSERT ON public.course_waitlist TO anon, authenticated;
GRANT ALL ON public.course_waitlist TO service_role;

ALTER TABLE public.course_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_public_insert"
ON public.course_waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (true);