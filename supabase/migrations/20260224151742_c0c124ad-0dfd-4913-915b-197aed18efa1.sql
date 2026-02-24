-- Make the 'list' storage bucket private to prevent direct public downloads
UPDATE storage.buckets SET public = false WHERE id = 'list';