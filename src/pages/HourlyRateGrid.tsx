import { useState } from "react";
import EmailCaptureForm from "@/components/EmailCaptureForm";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import gridAsset from "@/assets/hourly-rate-grid.xlsx.asset.json";

const HOURS = [10, 15, 20, 25, 30, 35, 37.5, 40, 45, 50, 60, 70, 80];
const SALARIES = Array.from({ length: 30 }, (_, i) => (i + 1) * 10000);
const WEEKS_WORKED = 45; // 225 working days / 5
const DOWNLOAD_URL = `https://bigdaddysbigtips.com${gridAsset.url}`;

const gbp = (n: number, dp = 0) =>
  "£" + n.toLocaleString("en-GB", { minimumFractionDigits: dp, maximumFractionDigits: dp });

const EXAMPLES = [
  { salary: 250000, hoursPerDay: 7 },
  { salary: 160000, hoursPerDay: 10 },
];

const HourlyRateGrid = () => {
  const [showForm, setShowForm] = useState(true);

  return (
    <main className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
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

        <section className="rounded-xl border border-border bg-card overflow-auto max-h-[70vh]">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="sticky top-0 left-0 z-20 bg-secondary text-primary text-left px-3 py-2 whitespace-nowrap">
                  Annual Salary
                </th>
                {HOURS.map((h) => (
                  <th key={h} className="sticky top-0 z-10 bg-secondary text-primary px-3 py-2 whitespace-nowrap">
                    {h} hrs/wk
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SALARIES.map((s, i) => (
                <tr key={s} className={i % 2 ? "bg-background/40" : ""}>
                  <td className="sticky left-0 z-10 bg-card font-semibold text-primary px-3 py-2 whitespace-nowrap border-r border-border">
                    {gbp(s)}
                  </td>
                  {HOURS.map((h) => (
                    <td key={h} className="px-3 py-2 text-center whitespace-nowrap tabular-nums">
                      {gbp(s / (WEEKS_WORKED * h), 2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          {EXAMPLES.map(({ salary, hoursPerDay }) => {
            const hrs = 225 * hoursPerDay;
            return (
              <div key={salary} className="rounded-xl border border-border bg-card p-5 space-y-1 text-sm">
                <h3 className="text-lg mb-2">Example</h3>
                <p>Days worked: 225</p>
                <p>Hours worked per day: {hoursPerDay}</p>
                <p>Hours worked per year: {hrs.toLocaleString("en-GB")}</p>
                <p>Amount earned in year: {gbp(salary)}</p>
                <p className="font-semibold text-primary">Hourly rate: {gbp(salary / hrs, 2)}</p>
              </div>
            );
          })}
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
