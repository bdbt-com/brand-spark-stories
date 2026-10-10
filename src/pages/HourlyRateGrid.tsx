import { useState } from "react";
import EmailCaptureForm from "@/components/EmailCaptureForm";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import gridAsset from "@/assets/hourly-rate-grid.xlsx.asset.json";

// A small, non-interactive teaser of the real grid. The full grid
// (30 salaries × 13 hour columns) ships in the spreadsheet itself.
const PREVIEW_HOURS = [20, 30, 37.5, 40, 50, 60];
const PREVIEW_SALARIES = [30000, 60000, 90000, 120000, 150000, 180000];
const WEEKS_WORKED = 45; // 225 working days / 5
const DOWNLOAD_URL = `https://bigdaddysbigtips.com${gridAsset.url}`;

const gbp = (n: number, dp = 0) =>
  "£" + n.toLocaleString("en-GB", { minimumFractionDigits: dp, maximumFractionDigits: dp });

const HourlyRateGrid = () => {
  const [showForm, setShowForm] = useState(true);

  return (
    <main className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold">Illustrative Hourly Rate Grid</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what your salary really works out to per hour, based on how many hours you work each week.
          </p>
        </header>

        <section className="rounded-xl border border-border bg-card p-5 md:p-6 space-y-2">
          <h2 className="text-xl">Assumptions</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-foreground">
            <li>Work days are Monday to Friday. Weekends excluded: 5 × 52 = 260 days a year.</li>
            <li>35 non-working days a year (holidays, public holidays etc.), so days worked drops to 225.</li>
            <li>Hours worked a year = days worked per year × hours worked per day.</li>
            <li>Hourly rate = salary ÷ hours worked a year.</li>
          </ul>
        </section>

        <section className="relative mx-auto max-w-xl overflow-hidden rounded-xl border border-border bg-card p-4">
          <table
            aria-hidden="true"
            className="pointer-events-none w-full select-none text-[11px] leading-tight border-collapse opacity-90"
          >
            <thead>
              <tr>
                <th className="text-left px-2 py-1.5 whitespace-nowrap text-primary">Salary</th>
                {PREVIEW_HOURS.map((h) => (
                  <th key={h} className="px-2 py-1.5 text-center whitespace-nowrap text-primary tabular-nums">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PREVIEW_SALARIES.map((s, i) => (
                <tr key={s} className={i % 2 ? "bg-background/40" : ""}>
                  <td className="px-2 py-1.5 whitespace-nowrap font-semibold text-primary">
                    {gbp(s / 1000)}k
                  </td>
                  {PREVIEW_HOURS.map((h) => (
                    <td key={h} className="px-2 py-1.5 text-center whitespace-nowrap tabular-nums">
                      {gbp(s / (WEEKS_WORKED * h), 2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Fade the teaser out so it reads as a sample, not the full sheet. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card via-card/90 to-transparent" />
          <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-xs text-muted-foreground">
            Preview only — the full grid covers 30 salaries across 13 weekly-hour columns.
          </p>
        </section>

        <section className="max-w-lg mx-auto rounded-xl border border-primary/40 bg-card p-6 space-y-4">
          <h2 className="text-2xl text-center">Download The Spreadsheet</h2>
          {showForm ? (
            <EmailCaptureForm
              title="Illustrative Hourly Rate Grid"
              guideDownloadUrl={DOWNLOAD_URL}
              onClose={() => setShowForm(false)}
              compact={false}
              hideable={false}
              headingLabel={null}
              submitLabel="Send Me The Spreadsheet"
              successTitle="Spreadsheet Sent! 🎉"
            />
          ) : (
            <Button asChild variant="hero" size="lg" className="w-full">
              <a href={gridAsset.url} download="Illustrative_Hourly_Rate_Grid.xlsx">
                <Download className="w-4 h-4 mr-2" /> Download Now
              </a>
            </Button>
          )}
        </section>
      </div>
    </main>
  );
};

export default HourlyRateGrid;
