import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Loader2, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  AREAS, SCALES, START_OPTIONS, band, bandLabel, computeResult,
  type AreaId, type StartPreference, type TestResult,
} from "@/data/dailyWinsTest";
import { GoldButton, OutlineButton, Section, Title, Eyebrow, Card } from "@/components/site/ui";
import { saveLead } from "@/components/site/LeadForm";

const STORE = "dw-test-v1";
const PER_PAGE = 4;
const PAGES = Math.ceil(SCALES.length / PER_PAGE);

type Step = "intro" | "priority" | "scales" | "preference" | "email" | "results";

const load = () => {
  try { return JSON.parse(localStorage.getItem(STORE) || "null"); } catch { return null; }
};
const persist = (v: unknown) => {
  try { localStorage.setItem(STORE, JSON.stringify(v)); } catch { /* storage unavailable */ }
};

/* ---------- Scale row (10 on the left = positive, matching Ben's sheet) ---------- */
const ScaleRow = ({ index, positive, negative, value, onChange }: {
  index: number; positive: string; negative: string; value?: number; onChange: (v: number) => void;
}) => (
  <div className="rounded-2xl border border-primary/15 bg-[#141414] p-4 md:p-6">
    <div className="flex items-start justify-between gap-3 mb-4 text-sm md:text-base">
      <span className="font-bold text-primary uppercase tracking-wide">{positive}</span>
      <span className="text-[11px] text-white/40 pt-0.5">{index}/{SCALES.length}</span>
      <span className="font-bold text-white/70 uppercase tracking-wide text-right">{negative}</span>
    </div>
    <div className="grid grid-cols-10 gap-1 md:gap-2" role="radiogroup" aria-label={`${positive} to ${negative}`}>
      {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          onClick={() => onChange(n)}
          className={cn(
            "h-11 md:h-12 rounded-lg text-sm md:text-base font-bold border transition-all",
            value === n
              ? "bg-primary text-black border-primary scale-105 shadow-[0_0_20px_-4px_hsl(var(--primary)/0.7)]"
              : "border-white/15 text-white/70 hover:border-primary/60 hover:text-primary",
          )}
        >
          {n}
        </button>
      ))}
    </div>
  </div>
);

const Choice = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "w-full text-left flex items-center gap-3 rounded-xl border px-5 py-4 text-base md:text-lg transition-all",
      selected ? "border-primary bg-primary/10 text-white" : "border-white/15 text-white/80 hover:border-primary/50",
    )}
  >
    <span className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0", selected ? "border-primary" : "border-white/30")}>
      {selected && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
    </span>
    {children}
  </button>
);

const Progress = ({ value }: { value: number }) => (
  <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
    <div className="h-full bg-primary transition-all duration-500" style={{ width: `${value}%` }} />
  </div>
);

/* ---------- Results ---------- */
const nextStep = (r: TestResult) => {
  const area = AREAS.find((a) => a.id === r.startArea)!;
  const pref: StartPreference = r.preference === "unsure" ? (r.overall < 50 ? "coaching" : "event") : r.preference;
  switch (pref) {
    case "course":
      return area.course
        ? { label: area.course.title, detail: area.course.detail + (area.course.comingSoon ? " (Coming soon, join the waitlist.)" : ""), cta: area.course.comingSoon ? "Join the waitlist" : "Start the course", href: area.course.external ? area.course.href : undefined, to: area.course.external ? undefined : area.course.href }
        : { label: "Daily Wins Courses", detail: "Practical, affordable courses designed to make everyday improvements easier.", cta: "Explore courses", to: "/courses" };
    case "event":
      return { label: "Free Daily Wins Introductory Event", detail: "Explore why common sense doesn't always become common action, and how to start breaking the cycle. Online or in person.", cta: "View upcoming free events", to: "/#events" };
    case "coaching":
      return { label: "Free Discovery Call", detail: "A 20-minute conversation about what you'd like to change and whether Daily Wins coaching is the right fit. No pressure. No obligation.", cta: "Request a discovery call", to: "/coaching#clarity" };
    default:
      return { label: "Free Daily Wins Library & Podcast", detail: "Hundreds of practical Daily Wins across health, money, relationships and time, plus a new podcast episode every day.", cta: "Explore free Daily Wins", to: "/tips" };
  }
};

const Results = ({ result, name, onRetake }: { result: TestResult; name: string; onRetake: () => void }) => {
  const start = AREAS.find((a) => a.id === result.startArea)!;
  const sorted = [...AREAS].sort((a, b) => result.areaScores[b.id] - result.areaScores[a.id]);
  const strengths = sorted.slice(0, 2);
  const [tab, setTab] = useState<AreaId>(result.startArea);
  const tabArea = AREAS.find((a) => a.id === tab)!;
  const step = nextStep(result);
  const startScore = result.areaScores[start.id];

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="text-center">
        <Eyebrow>Your Daily Wins Snapshot</Eyebrow>
        <Title as="h1">{name ? `${name}, here's` : "Here's"} where you are today</Title>
        <p className="text-white/70 mt-4 max-w-xl mx-auto">No judgement. No pass or fail. Just a clearer picture of where you are and where a few small changes could make the biggest difference.</p>
      </div>

      <div className="grid md:grid-cols-[260px_1fr] gap-6">
        <Card className="flex flex-col items-center justify-center text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-2">Long Game Score</p>
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--primary))" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${(result.overall / 100) * 326.7} 326.7`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold italic text-white">{result.overall}</span>
              <span className="text-xs text-white/50">out of 100</span>
            </div>
          </div>
          <p className="mt-3 font-bold italic text-primary text-xl">{bandLabel(result.overall / 10)}</p>
        </Card>

        <Card>
          <p className="font-bold text-lg mb-5">Your life areas</p>
          <div className="space-y-4">
            {AREAS.map((a) => {
              const s = result.areaScores[a.id];
              return (
                <div key={a.id}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className={cn("font-semibold", a.id === start.id && "text-primary")}>
                      {a.name}{a.id === start.id && " · Start here"}
                    </span>
                    <span className="text-white/70">{s.toFixed(1)}/10</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div className={cn("h-full rounded-full", a.id === start.id ? "bg-primary" : "bg-primary/55")} style={{ width: `${s * 10}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-white/60 mt-5">
            <Trophy className="inline w-4 h-4 text-primary mr-1 -mt-0.5" />
            Your strongest areas: <span className="text-white">{strengths.map((s) => s.name).join(" and ")}</span>
          </p>
        </Card>
      </div>

      {/* Recommended starting point */}
      <Card className="border-primary/50 bg-gradient-to-b from-primary/[0.08] to-[#141414]">
        <Eyebrow>Your recommended starting point</Eyebrow>
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <h2 className="text-2xl md:text-3xl font-bold italic text-white">{start.name}</h2>
          <span className="text-primary font-bold text-2xl">{startScore.toFixed(1)}/10</span>
        </div>
        <p className="text-white/80 mt-3 leading-relaxed">{start[band(startScore)]}</p>
        {result.priority !== "unsure" && result.priority !== start.id && (
          <p className="text-sm text-white/55 mt-3">You told us {AREAS.find((a) => a.id === result.priority)!.name.toLowerCase()} was your priority, and you're already doing well there, so we've pointed you at the area with the most room to grow.</p>
        )}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="rounded-xl border border-primary/25 p-5">
            <p className="text-primary font-semibold text-sm flex items-center gap-1.5"><Sparkles className="w-4 h-4" />Your first Daily Win</p>
            <p className="font-bold text-lg mt-2">{start.dailyWin.title}</p>
            <p className="text-white/70 mt-1.5 text-sm leading-relaxed">{start.dailyWin.detail}</p>
          </div>
          <div className="rounded-xl border border-primary/25 p-5 flex flex-col">
            <p className="text-primary font-semibold text-sm">Recommended next step</p>
            <p className="font-bold text-lg mt-2">{step.label}</p>
            <p className="text-white/70 mt-1.5 text-sm leading-relaxed flex-1">{step.detail}</p>
            <GoldButton to={step.to} href={step.href} arrow className="mt-4 min-h-12 text-base w-full">{step.cta}</GoldButton>
          </div>
        </div>
      </Card>

      {/* Explore all areas */}
      <div>
        <p className="font-bold text-lg mb-3">Explore every area</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {AREAS.map((a) => (
            <button key={a.id} onClick={() => setTab(a.id)}
              className={cn("px-4 py-2 rounded-full text-sm border transition-colors",
                tab === a.id ? "bg-primary text-black border-primary font-semibold" : "border-white/20 text-white/75 hover:border-primary/60")}>
              {a.short}
            </button>
          ))}
        </div>
        <Card>
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-xl">{tabArea.name}</h3>
            <span className="text-primary font-bold">{result.areaScores[tab].toFixed(1)}/10</span>
          </div>
          <p className="text-white/75 mt-2 leading-relaxed">{tabArea[band(result.areaScores[tab])]}</p>
          <p className="mt-4 text-sm"><span className="text-primary font-semibold">Daily Win: </span><span className="font-semibold">{tabArea.dailyWin.title}.</span> <span className="text-white/70">{tabArea.dailyWin.detail}</span></p>
        </Card>
      </div>

      <div className="text-center space-y-4 pt-4">
        <p className="text-lg text-white/80 max-w-xl mx-auto">You won't change everything tomorrow. But you can make sure tomorrow contributes towards it.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <GoldButton to="/coaching" arrow>Explore Coaching & Mentoring</GoldButton>
          <OutlineButton onClick={onRetake}><RotateCcw className="w-4 h-4" />Retake the test</OutlineButton>
        </div>
      </div>
    </div>
  );
};

/* ---------- Page ---------- */
const DailyWinsTest = () => {
  const saved = useMemo(load, []);
  const [step, setStep] = useState<Step>(saved?.result ? "results" : "intro");
  const [priority, setPriority] = useState<AreaId | "unsure" | null>(saved?.priority ?? null);
  const [answers, setAnswers] = useState<Record<string, number>>(saved?.answers ?? {});
  const [page, setPage] = useState(0);
  const [preference, setPreference] = useState<StartPreference | null>(saved?.preference ?? null);
  const [name, setName] = useState<string>(saved?.name ?? "");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [result, setResult] = useState<TestResult | null>(saved?.result ?? null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [step, page]);
  useEffect(() => { persist({ priority, answers, preference, name, result }); }, [priority, answers, preference, name, result]);

  const pageScales = SCALES.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const pageDone = pageScales.every((s) => answers[s.id]);
  const answered = Object.keys(answers).length;
  const progress = step === "priority" ? 3 : step === "scales" ? 5 + (answered / SCALES.length) * 85 : step === "preference" ? 92 : step === "email" ? 97 : 0;

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setEmailError("Please enter a valid email address.");
    setEmailError("");
    setSending(true);
    const r = computeResult(answers, priority ?? "unsure", preference ?? "unsure");
    const area = AREAS.find((a) => a.id === r.startArea)!;
    const scores = AREAS.map((a) => `${a.short} ${r.areaScores[a.id]}`).join(", ");
    try {
      await saveLead(email, `Daily Wins Test | Score ${r.overall}/100 | Start: ${area.name} | Priority: ${r.priority} | Prefers: ${r.preference} | Name: ${name.trim() || "-"} | ${scores}`);
    } catch { /* never block results on a save failure */ }
    setResult(r);
    setSending(false);
    setStep("results");
  };

  const retake = () => {
    setAnswers({}); setPriority(null); setPreference(null); setResult(null); setPage(0); setStep("intro");
  };

  return (
    <div className="min-h-screen">
      {step !== "intro" && step !== "results" && (
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-white/5">
          <div className="max-w-3xl mx-auto px-5 py-3"><Progress value={progress} /></div>
        </div>
      )}

      <Section narrow className="pt-10 md:pt-16">
        {step === "intro" && (
          <div className="text-center animate-fade-in">
            <Eyebrow>The Free Daily Wins Test</Eyebrow>
            <Title as="h1" className="md:text-5xl">How well are you playing the long game?</Title>
            <p className="text-xl text-white mt-6 font-semibold">You can't improve what you haven't taken the time to understand.</p>
            <div className="text-white/75 mt-5 space-y-4 text-lg leading-relaxed max-w-2xl mx-auto">
              <p>How happy are you with your health, finances, relationships, habits and the direction your life is heading? And where could a few small changes make the biggest difference?</p>
              <p>Answer 28 simple questions, receive a personalised snapshot of your life and discover a recommended starting point based on your answers.</p>
            </div>
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto my-10 text-center">
              {[["28", "questions"], ["5 min", "to complete"], ["Free", "personal results"]].map(([a, b]) => (
                <div key={b} className="rounded-xl border border-primary/20 py-4"><p className="text-2xl font-bold italic text-primary">{a}</p><p className="text-xs text-white/60 mt-1">{b}</p></div>
              ))}
            </div>
            <GoldButton onClick={() => setStep("priority")} arrow className="w-full sm:w-auto">Start My Free Daily Wins Test</GoldButton>
            <p className="text-sm text-white/50 mt-5">No judgement. No pass or fail.</p>
          </div>
        )}

        {step === "priority" && (
          <div className="animate-fade-in">
            <Eyebrow>Before we begin</Eyebrow>
            <Title className="md:text-4xl">Which area of your life would you most like to improve first?</Title>
            <div className="space-y-3 mt-8">
              {AREAS.map((a) => (
                <Choice key={a.id} selected={priority === a.id} onClick={() => setPriority(a.id)}>{a.priorityLabel}</Choice>
              ))}
              <Choice selected={priority === "unsure"} onClick={() => setPriority("unsure")}>I'm not sure yet</Choice>
            </div>
            <div className="flex justify-between mt-8">
              <OutlineButton onClick={() => setStep("intro")}><ArrowLeft className="w-4 h-4" />Back</OutlineButton>
              <GoldButton disabled={!priority} onClick={() => { setPage(0); setStep("scales"); }} arrow>Next</GoldButton>
            </div>
          </div>
        )}

        {step === "scales" && (
          <div className="animate-fade-in" key={page}>
            <Eyebrow>Part {page + 1} of {PAGES}</Eyebrow>
            <h1 className="text-2xl md:text-3xl font-bold italic text-white mb-2">Where are you right now?</h1>
            <p className="text-white/65 mb-6">10 means the left-hand statement describes you perfectly. 1 means the right-hand one does. Go with your gut.</p>
            <div className="space-y-4">
              {pageScales.map((s) => (
                <ScaleRow key={s.id} index={SCALES.indexOf(s) + 1} positive={s.positive} negative={s.negative}
                  value={answers[s.id]} onChange={(v) => setAnswers((p) => ({ ...p, [s.id]: v }))} />
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <OutlineButton onClick={() => (page === 0 ? setStep("priority") : setPage(page - 1))}><ArrowLeft className="w-4 h-4" />Back</OutlineButton>
              <GoldButton disabled={!pageDone} onClick={() => (page < PAGES - 1 ? setPage(page + 1) : setStep("preference"))} arrow>
                {page < PAGES - 1 ? "Next" : "Almost done"}
              </GoldButton>
            </div>
          </div>
        )}

        {step === "preference" && (
          <div className="animate-fade-in">
            <Eyebrow>Last question</Eyebrow>
            <Title className="md:text-4xl">How would you prefer to begin?</Title>
            <div className="space-y-3 mt-8">
              {START_OPTIONS.map((o) => (
                <Choice key={o.id} selected={preference === o.id} onClick={() => setPreference(o.id)}>{o.label}</Choice>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <OutlineButton onClick={() => { setPage(PAGES - 1); setStep("scales"); }}><ArrowLeft className="w-4 h-4" />Back</OutlineButton>
              <GoldButton disabled={!preference} onClick={() => setStep("email")} arrow>See my results</GoldButton>
            </div>
          </div>
        )}

        {step === "email" && (
          <div className="animate-fade-in text-center">
            <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center mx-auto mb-5"><Check className="w-7 h-7 text-primary" /></div>
            <Title className="md:text-4xl">Your results are ready</Title>
            <p className="text-white/75 mt-4 text-lg max-w-lg mx-auto">Enter your details to see your personalised Daily Wins snapshot, your recommended starting point and your first Daily Win.</p>
            <form onSubmit={submitEmail} className="max-w-sm mx-auto mt-8 space-y-4 text-left">
              <div className="space-y-1.5"><Label htmlFor="t-name">First name</Label><Input id="t-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" className="h-12" /></div>
              <div className="space-y-1.5"><Label htmlFor="t-email">Email</Label><Input id="t-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="h-12" /></div>
              {emailError && <p className="text-sm text-destructive">{emailError}</p>}
              <GoldButton type="submit" disabled={sending} className="w-full">{sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Show My Results <ArrowRight className="w-5 h-5" /></>}</GoldButton>
              <p className="text-xs text-white/45 text-center">I'll occasionally send you Daily Wins I think you'll find useful. Unsubscribe any time.</p>
            </form>
            <button onClick={() => setStep("preference")} className="text-sm text-white/50 hover:text-primary mt-6">← Back</button>
          </div>
        )}

        {step === "results" && result && <Results result={result} name={name.trim()} onRetake={retake} />}
      </Section>

      {step === "intro" && (
        <div className="text-center pb-16 -mt-6 text-sm text-white/50">
          Prefer to talk it through? <Link to="/coaching" className="text-primary hover:underline">Explore coaching & mentoring</Link>
        </div>
      )}
    </div>
  );
};

export default DailyWinsTest;
