

## Add 17 Missing Email Addresses from Resend Export

### What I found

I cross-referenced every unique email in the CSV against what's already in the database. There are **35 unique emails** in the CSV. **18 already exist** in the database. That leaves **17 new unique emails** to add.

### Emails to insert (earliest delivery date from CSV, one per email)

| Email | First Signup Date |
|---|---|
| mailtogomesv@gmail.com | Jan 6, 2026 |
| amychidgey@hotmail.co.uk | Jan 7, 2026 |
| clairesjones@outlook.com | Jan 7, 2026 |
| princeaedan15@gmail.com | Jan 8, 2026 |
| emily_fitch@hotmail.co.uk | Jan 8, 2026 |
| erikatourellyoga@gmail.com | Jan 9, 2026 |
| bluban08@gmail.com | Jan 9, 2026 |
| fiona.burks@btinternet.com | Jan 10, 2026 |
| bandjackie@gmail.com | Jan 10, 2026 |
| thomas.aschbeck@gmail.com | Jan 11, 2026 |
| robynseatonsheen@gmail.com | Jan 11, 2026 |
| joslynyale6@purpleheartsolutions.org | Jan 12, 2026 |
| sonyksr@yahoo.com | Jan 14, 2026 |
| nandjtheobald@btinternet.com | Jan 14, 2026 |
| nj_holman@yahoo.com | Jan 14, 2026 |
| katymendesday@outlook.com | Feb 4, 2026 |
| sallyv1989@gmail.com | Feb 8, 2026 |

### Important note

The CSV is a Resend delivery log -- it only has email addresses and delivery timestamps, no first names. So these 17 entries will show "—" in the Name column on the admin list until you provide names. The existing 18 emails already in the database will not be touched.

### Technical step

Single SQL INSERT of 17 rows into `email_subscriptions` with the correct `created_at` dates and `email_sent = true`. No code changes needed -- the edge function already deduplicates on read.

