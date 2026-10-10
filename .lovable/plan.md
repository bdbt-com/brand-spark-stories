# Hidden Hourly Rate Grid download page

## What you get
- A new page at **bigdaddysbigtips.com/hourly-rate-grid**. You can only reach it through the link in the video description.
- It's hidden: no menu link, not in the sitemap, and Google is told not to list it.
- It uses the site's usual black and gold style.

## Page layout (top to bottom)
1. Title: "Illustrative Hourly Rate Grid" and a short intro line.
2. Assumptions box: the 4 assumption lines from the spreadsheet.
3. **The full grid**: annual salary from £10,000 to £300,000 down the side, and 10 to 80 hours a week across the top. Each box shows the hourly rate to 2 decimal places. The first column and the header row stay in place when you scroll, so it works on phones.
4. The two worked examples from the spreadsheet (£250,000 at 7 hrs/day and £160,000 at 10 hrs/day), with the results worked out.
5. **Email form** (first name, last name, email). It's the same form the Foundation Blueprint uses. After someone signs up, they get the spreadsheet by email and a download button appears on the page. They're also added to your email list.

## Technical details
- Upload the xlsx as a Lovable Asset. The send-guide edge function gets it via `guideDownloadUrl`.
- The grid data goes in a static TS array (values match the sheet).
- Add a route in App.tsx and add the path to NOINDEX_PATHS in RouteSeo. Leave it out of sitemap.xml and Navigation.
- Reuse EmailCaptureForm with `guideTitle` "Illustrative Hourly Rate Grid".
