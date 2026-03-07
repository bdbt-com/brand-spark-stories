

## Change Auto-Redirect Reset Window to 7 Days

### Change
In `src/pages/LinkInBio.tsx` (~line 354-355):
- Rename `THREE_HOURS` to `SEVEN_DAYS` with value `7 * 24 * 60 * 60 * 1000`
- Update the storage key to `bdbt-auto-redirects-v7` to reset all existing users' counters
- Update the comment on line 352

Single file, ~3 lines changed.

