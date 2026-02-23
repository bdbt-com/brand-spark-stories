
-- Fix search_path on custom functions

CREATE OR REPLACE FUNCTION public.handle_new_email_subscription()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO email_jobs (email, guide_id, processed)
  VALUES (NEW.email, NEW.guide_id, false);
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.queue_email_job()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.email_jobs (email, guide_id)
  VALUES (NEW.email, NEW.guide_id);
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.process_email_queue()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  total_processed INTEGER := 0;
BEGIN
  UPDATE email_jobs 
  SET processed = true
  WHERE processed = false;
  GET DIAGNOSTICS total_processed = ROW_COUNT;
  RETURN json_build_object('processed', total_processed);
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_signed_urls()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  job RECORD;
  guide RECORD;
  filename TEXT;
  url_to_store TEXT;
BEGIN
  FOR job IN SELECT * FROM email_jobs WHERE processed = true AND signed_url IS NULL
  LOOP
    SELECT * INTO guide FROM guides WHERE id = job.guide_id;
    IF guide IS NOT NULL THEN
      IF position('/' in guide.storage_path) > 0 THEN
        filename := split_part(guide.storage_path, '/', -1);
      ELSE
        filename := guide.storage_path;
      END IF;
      url_to_store := 'https://xvqhkjgowlwfdosxmvba.supabase.co/storage/v1/object/public/list/' || filename;
      UPDATE email_jobs SET signed_url = url_to_store WHERE id = job.id;
      RAISE NOTICE 'Generated URL for job %: %', job.id, url_to_store;
    END IF;
  END LOOP;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_guide_signed_url(guide_id bigint, valid_seconds integer DEFAULT 3600)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    guide_storage_path text;
    signed_url text;
BEGIN
    SELECT storage_path INTO guide_storage_path
    FROM public.guides WHERE id = guide_id;
    IF guide_storage_path IS NULL THEN
        RAISE EXCEPTION 'Guide with id % not found', guide_id;
    END IF;
    signed_url := storage.create_signed_url('list', guide_storage_path, valid_seconds);
    IF signed_url IS NULL THEN
        RAISE EXCEPTION 'Failed to generate signed URL for file %', guide_storage_path;
    END IF;
    RETURN signed_url;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_guide_signed_url(p_guide_id uuid, p_valid_seconds integer DEFAULT 3600)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  guide_storage_path text;
  signed_url text;
BEGIN
  SELECT storage_path INTO guide_storage_path
  FROM guides WHERE id = p_guide_id;
  IF guide_storage_path IS NULL THEN
    RAISE EXCEPTION 'Guide not found with id: %', p_guide_id;
  END IF;
  SELECT storage.generate_presigned_url('list', guide_storage_path, p_valid_seconds) INTO signed_url;
  RETURN signed_url;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_guide_signed_url_int(guide_id integer, valid_seconds integer DEFAULT 3600)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    RETURN public.get_guide_signed_url(guide_id::bigint, valid_seconds);
END;
$function$;

CREATE OR REPLACE FUNCTION public.send_assessment_email(p_email_job_id bigint)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    v_job RECORD;
    v_gmail_user TEXT;
    v_gmail_password TEXT;
    v_result JSONB;
BEGIN
    SELECT * INTO v_job FROM public.email_jobs WHERE id = p_email_job_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Email job not found');
    END IF;
    IF v_job.signed_url IS NULL THEN
        v_result := generate_and_store_signed_url(p_email_job_id);
        IF NOT (v_result->>'success')::boolean THEN RETURN v_result; END IF;
        SELECT * INTO v_job FROM public.email_jobs WHERE id = p_email_job_id;
    END IF;
    SELECT decrypted_secret INTO v_gmail_user FROM vault.decrypted_secrets WHERE name = 'GMAIL_USER';
    SELECT decrypted_secret INTO v_gmail_password FROM vault.decrypted_secrets WHERE name = 'GMAIL_APP_PASSWORD';
    UPDATE public.email_jobs SET processed = false WHERE id = p_email_job_id;
    RETURN jsonb_build_object('success', true, 'message', 'Email prepared for sending', 'email_job_id', p_email_job_id, 'recipient', v_job.email, 'signed_url', v_job.signed_url);
END;
$function$;

-- Fix the duplicate restrictive INSERT policies on email_subscriptions
-- Drop both restrictive ones and create a single permissive one
DROP POLICY IF EXISTS "anyone can insert" ON public.email_subscriptions;
DROP POLICY IF EXISTS "anyone_can_insert" ON public.email_subscriptions;

CREATE POLICY "allow_public_insert"
  ON public.email_subscriptions FOR INSERT
  WITH CHECK (true);
