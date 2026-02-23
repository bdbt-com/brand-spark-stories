
## Remove adminstats feature and show email list in chat

### Step 1: Clean up the app (remove adminstats feature entirely)

**Delete file:**
- `src/components/AdminEmailStats.tsx`
- `supabase/functions/admin-email-stats/index.ts`

**Edit `src/components/AITipFinder.tsx`:**
- Remove the `import AdminEmailStats` line
- Remove the `showAdminStats` state
- Remove the `if (searchLower === 'adminstats')` block in `analyzeAndRecommend()`
- Remove the `{showAdminStats && <AdminEmailStats ... />}` render block

This fully reverts your app to how it was before the adminstats feature was added.

### Step 2: Show your email list directly in chat

After cleanup, I'll query the `email_subscriptions` table via the edge function and display the results (subscriber list + unique signup count) right here in the conversation for you to review.
