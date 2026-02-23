

## Recover Lost Subscribers and Add Admin Email List Page

### What we're doing

1. **Recover the lost email list** by inserting the subscribers visible in your screenshots into the database (deduplicated, no copies)
2. **Create a hidden AdminList page** accessible by typing "AdminList" into the tips search bar, showing all email subscribers in a clean text list
3. **Keep it updated automatically** -- the page will always pull the latest data from the database, so every new signup appears

---

### Subscribers to recover from screenshots (deduplicated)

| Name | Email | Guide | Date |
|------|-------|-------|------|
| Harry | conningh@gmail.com | Wait 24 Hours before Clicking Buy | Sep 30 |
| James | jtconning@gmail.com | Top of the Stairs | Sep 30 |
| James | conningjt@gmail.com | Wait 30 Days Before Any Status Spend | Oct 22 |
| Ben | benraven@me.com | Park further away | Oct 29 |
| Jamie | email@jamieraven.co.uk | BDBT Foundation Blueprint | Dec 29 |
| Steven | steven.mcgregor@rocketmail.com | Smile at yourself in the mirror | Dec 29 |
| Katy | katywickings@hotmail.co.uk | BDBT Foundation Blueprint | Dec 29 |
| John Wickings | jwickings@gmail.com | BDBT Foundation Blueprint | Dec 30 |
| Scarlett | scarlettrj@hotmail.com | BDBT Foundation Blueprint | Dec 31 |
| Rich | isthisrichard@hotmail.com | BDBT Foundation Blueprint | Jan 2 |
| Zac | zhuddart@gmail.com | BDBT Foundation Blueprint | Jan 2 |
| Scott | scott28381@gmail.com | BDBT Foundation Blueprint | Jan 2 |
| Chloe | clamc@hotmail.co.uk | BDBT Foundation Blueprint | Jan 3 |
| Seth | seth-mayiza@hotmail.co.uk | BDBT Foundation Blueprint | Jan 3 |
| Alexander | zhomoky@gmail.com | BDBT Foundation Blueprint | Jan 4 |
| Micro Dawg | richienisbet80@gmail.com | BDBT Foundation Blueprint | Jan 6 |
| Steven McGregor | steven.mcgregor@rocketmail.com | Wait 24 Hours before Clicking Buy | Jan 6 |
| Steve McGregor | steven.mcgregor@rocketmail.com | Do calf raises while brushing your teeth | Jan 6 |
| anandgbrl@gmail.com | anandgbrl@gmail.com | (unknown - Foundation?) | unknown |
| krish8arora@gmail.com | krish8arora@gmail.com | (unknown - Foundation?) | unknown |
| prabhukalyan001@gmail.com | prabhukalyan001@gmail.com | (unknown - Foundation?) | unknown |
| joan.wilmot@sky.com | joan.wilmot@sky.com | (unknown - Foundation?) | unknown |

---

### Technical steps

#### Step 1: Database migration -- insert recovered subscribers
Create a SQL migration that inserts each unique subscriber row into `email_subscriptions` with `first_name`, `email`, `guide_title`, `email_sent = true`, and approximate `created_at` dates based on the screenshots. Duplicates of existing emails (conningh@gmail.com, bdbt533@gmail.com) will use different guide_title values so they won't conflict.

#### Step 2: Create AdminList page (`src/pages/AdminList.tsx`)
- A new page component that calls the `admin-email-stats` edge function on load
- Displays a simple, clean text list of all subscribers: Name, Email, Guide, Date
- Styled consistently with the rest of the site (dark theme)
- Shows total count and unique email count at the top

#### Step 3: Add route in `src/App.tsx`
- Add `/admin-list` route pointing to the new AdminList page

#### Step 4: Add keyword routing in `src/components/AITipFinder.tsx`
- Add a check: if search input matches "AdminList" (case-insensitive), navigate to `/admin-list`
- Placed alongside the existing hidden page checks (thumbnail, daily wins, partnership, etc.)

#### Step 5: Redeploy the `admin-email-stats` edge function
- The existing edge function already returns all subscribers -- just needs to be redeployed since the schema was updated

