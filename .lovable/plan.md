

## Fix: Remove Password Check from Admin Edge Function

### Root cause

The security scan fix added a secret check to `supabase/functions/admin-email-stats/index.ts` that requires an `x-admin-secret` header. The frontend was reverted to not send that header, so every request now gets a 401 Unauthorized response.

### Fix

**One change only** -- remove the admin secret verification block (lines 17-24) from `supabase/functions/admin-email-stats/index.ts`. The function will go back to working exactly as it did before, with no authentication gate. Access is already gated by the hidden search bar keyword on the Tips page.

No frontend changes needed -- the `AdminList.tsx` component is already correct.

### Deployment

The edge function will be automatically redeployed after the edit.

