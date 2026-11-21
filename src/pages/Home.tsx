import { useState } from "react";
import { HeartPulse, Apple, PiggyBank, Users, Briefcase, Sun, Play } from "lucide-react";
import { GoldButton, OutlineButton, Section, Title, Lead, Card, Note } from "@/components/site/ui";
import { ScrollAtmosphere, LongGameLine, CountUp, LightUp, CompoundCurve, StickyTestBar } from "@/components/site/fx";
import LeadForm from "@/components/site/LeadForm";
import SiteFooter from "@/components/site/SiteFooter";
import { startTrackedRedirect } from "@/lib/youtube-redirect";

const HERO_IMAGE = "/lovable-uploads/opt/recording-setup-new.webp";

const LINE_SECTIONS = [
  { id: "why", label: "Why we repeat" },
  { id: "gap", label: "Sense vs action" },
  { id: "comfort-trade", label: "The Comfort Trade" },
  { id: "goals", label: "Big and small goals" },
  { id: "test", label: "Daily Wins Test" },
  { id: "long-game", label: "The long game" },
  { id: "events", label: "Free events" },
  { id: "resources", label: "Free resources" },
];

const EPISODES = [
  { videoId: "z8NqukMz2Q8", title: "Give me 0.1% And I'll Change Your Direction", views: "564K views" },
  { videoId: "zUGM3gZbNY8", title: "Most People Stop Here. Are You Most People?", views: "521K views" },
  { videoId: "ZK4wdEe_b-s", title: "You Need To Understand This Cycle", views: "446K views" },
];

const SENSE_ACTION = [
  ["Get more sleep", "Stay up scrolling"],
  ["Move your body", "Sit for hours"],
  ["Eat nutritious food", "Reach for convenience"],
  ["Save for the future", "Spend without thinking"],
  ["Invest in relationships", "Get distracted by screens"],
  ["Make time for yourself", "Put yourself last"],
];

const LONG_GAME = [
  { Icon: HeartPulse, title: "Health & Longevity", text: "Train for the life you want at 80, as well as the body you want next summer." },
  { Icon: Apple, title: "Nutrition & Energy", text: "Eat for how you want to live, with the energy to enjoy your days." },
  { Icon: PiggyBank, title: "Money & Financial Freedom", text: "Make your money work for your future, so your bank balance stops deciding how you spend your time." },
  { Icon: Users, title: "Relationships & Family", text: "Build the relationships you'll treasure for a lifetime. Don't wait until you have more time." },
  { Icon: Briefcase, title: "Career & Personal Growth", text: "Build a career that opens doors for decades, beyond the next promotion." },
  { Icon: Sun, title: "Time & Fulfilment", text: "Build a life you enjoy living on ordinary Tuesdays." },
];

const PREVIEW_BARS = [
  ["Body & Movement", 6.2], ["Energy & Recovery", 4.1], ["Money & Time", 5.4],
  ["Relationships", 7.8], ["Habits & Self-Control", 4.6], ["Purpose & Growth", 6.9],
] as const;

const EVENTS = [
  { title: "In person", facts: [["Length", "120 minutes"], ["Where", "London"], ["Places", "Limited"]], tag: "Event interest: In-person introduction (London)" },
  { title: "Online", facts: [["Length", "60 minutes"], ["Where", "Join from anywhere"]], tag: "Event interest: Online introduction" },
] as const;

const RESOURCES = [
  { title: "Podcast & videos", text: "The science and psychology behind everyday behaviour.", cta: "Watch and listen", to: "/podcast" as string | undefined, href: undefined as string | undefined },
  { title: "The Daily Wins Library", text: "Practical Daily Wins for health, money, relationships and time.", cta: "Explore the library", to: "/tips", href: undefined },
  { title: "Courses", text: "A step between free content and personal coaching.", cta: "Start The Invisible Workout", to: undefined, href: "https://bigdaddysbigtips.xperiencify.io/" },
];

const Home = () => {
  const [form, setForm] = useState<null | { title: string; tag: string; description: string }>(null);

  return (
    <div className="min-h-screen relative">
      <ScrollAtmosphere />
      <LongGameLine sections={LINE_SECTIONS} />
      <StickyTestBar />
      <div className="relative z-[1]">
      {/* Hero: full-width image of Ben. Swap HERO_IMAGE for a b-roll <video> when supplied. */}
      <section className="relative overflow-hidden min-h-[86vh] flex items-end">
        <img src={HERO_IMAGE} alt="Ben Raven recording a Daily Wins episode" width={1920} height={1280} fetchPriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover object-[60%_35%] animate-kenburns" />
        <Note kind="needed" className="absolute top-3 right-3 z-10 my-0">Placeholder photo. Ben's b-roll video goes here.</Note>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-32 pb-14 md:pb-20 w-full">
          <h1 className="font-display uppercase font-extrabold leading-[0.9] tracking-[-0.01em] text-[3.1rem] sm:text-7xl lg:text-[6.5rem]">
            <span className="block text-white">Helping you play the long game.</span>
            <span className="block text-gold">One Daily Win at a time.</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-white max-w-[36ch] leading-snug">Change your life by changing almost nothing about your day.</p>
          <p className="mt-3 text-base md:text-lg text-white/75 max-w-[52ch] leading-relaxed">I'm Ben Raven. I coach and mentor people to understand their habits and make small changes that add up.</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <GoldButton to="/coaching">Explore Coaching & Mentoring</GoldButton>
            <OutlineButton to="/test" className="bg-black/40 backdrop-blur">Take the Free Daily Wins Test</OutlineButton>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <Note className="mx-auto">Figures below need confirming by Ben before launch.</Note>
      <div className="border-y border-white/10 bg-black/60">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-7 grid grid-cols-3 gap-4">
          {([[30, "K+", "YouTube subscribers"], [300, "+", "Daily Wins episodes"], [8, "PM", "New episode, every day"]] as const).map(([v, suf, l]) => (
            <div key={l}>
              <p className="font-display font-extrabold text-gold text-4xl md:text-6xl leading-none">{l.startsWith("New") ? `${v}${suf}` : <CountUp value={v} suffix={suf} />}</p>
              <p className="text-xs md:text-sm text-ash mt-2">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Same resolutions */}
      <Section id="why">
        <Title className="max-w-[20ch]">There's a reason you keep making the same New Year's resolutions.</Title>
        <Lead>You already want to change. What nobody taught you is why you keep repeating your Daily Drifts.</Lead>
      </Section>

      {/* Common sense vs common action */}
      <Section id="gap" className="bg-black/45 border-y border-white/5">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <Title>Common sense isn't always common action.</Title>
            <Lead>If knowing what to do was enough, we'd all be living very different lives. Daily Wins closes that gap by making the better decision easier.</Lead>
          </div>
          <div className="rounded-lg border border-white/10 overflow-hidden">
            <div className="grid grid-cols-2">
              <div className="p-4 md:p-5 bg-gold text-black"><p className="font-display uppercase font-extrabold text-xl leading-none">Common sense</p><p className="text-sm mt-1 opacity-80">What we know</p></div>
              <div className="p-4 md:p-5 bg-coal text-ash border-l border-white/10"><p className="font-display uppercase font-extrabold text-xl leading-none">Common action</p><p className="text-sm mt-1 opacity-80">What we do</p></div>
            </div>
            {SENSE_ACTION.map(([a, b]) => (
              <div key={a} className="grid grid-cols-2 border-t border-white/10">
                <p className="p-4 md:p-5 text-white font-medium">{a}</p>
                <p className="p-4 md:p-5 text-ash border-l border-white/10">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Comfort trade */}
      <Section id="comfort-trade">
        <Title className="max-w-[22ch]">We can't choose between comfort and discomfort. Only which one comes first.</Title>
        <Lead>Every small decision trades comfort now against comfort later. I call it The Comfort Trade.</Lead>

        <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-6 max-w-4xl">
          <div>
            <p className="font-display uppercase font-extrabold text-xl text-ash mb-3">The Daily Drift</p>
            <LightUp className="rounded-lg border border-white/10 bg-coal p-5 md:p-6">
              <p className="text-sm text-ash">Now: comfort</p>
              <p className="text-xl md:text-2xl font-semibold mt-1">Stay up scrolling</p>
            </LightUp>
            <div className="h-6 w-px bg-white/20 mx-8" />
            <LightUp delay={450} className="rounded-lg border border-white/10 bg-coal p-5 md:p-6">
              <p className="text-sm text-ash">Later: discomfort</p>
              <p className="text-lg md:text-xl font-semibold mt-1 text-white/80">Fatigue, anxiety, brain fog and frustration</p>
            </LightUp>
          </div>
          <div>
            <p className="font-display uppercase font-extrabold text-xl text-gold mb-3">The Daily Win</p>
            <LightUp delay={900} className="rounded-lg border border-gold/50 p-5 md:p-6">
              <p className="text-sm text-gold">Now: discomfort</p>
              <p className="text-xl md:text-2xl font-semibold mt-1">Put the phone down and go to bed</p>
            </LightUp>
            <div className="h-6 w-px bg-gold mx-8" />
            <LightUp delay={1350} className="rounded-lg bg-gold text-black p-5 md:p-6">
              <p className="text-sm text-black/70">Later: comfort</p>
              <p className="text-lg md:text-xl font-semibold mt-1">Recovery, confidence, clarity and energy</p>
            </LightUp>
          </div>
        </div>
        <p className="mt-8 text-lg text-white/75 max-w-[58ch]">Coaching helps you spot these trades and choose on purpose.</p>
      </Section>

      {/* Big goals / small goals */}
      <Section id="goals" className="bg-black/45 border-y border-white/5">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <Title>Big goals feel overwhelming. Small goals feel pointless.</Title>
            <Lead>So we do neither, and the time passes anyway. The changes that matter most to our future are often the ones that feel least rewarding today.</Lead>
          </div>
          <div>
            <CompoundCurve />
            <p className="mt-5 text-lg text-white font-semibold">Neither feels significant today. Both compound into something significant tomorrow.</p>
          </div>
        </div>
      </Section>

      {/* Test teaser */}
      <Section id="test">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <Title>How well are you playing the long game?</Title>
            <Lead>Answer 28 questions and get a snapshot of your life, with a recommended place to start. There's no pass or fail.</Lead>
            <GoldButton to="/test" className="mt-8">Take the Free Daily Wins Test</GoldButton>
          </div>
          <Card>
            <Note className="my-0 mb-4">Made-up scores, only to show what the results look like.</Note>
            <div className="flex items-end justify-between gap-4">
              <p className="text-sm text-ash">Example results<br /><span className="text-white font-semibold text-base">Long Game Score</span></p>
              <p className="font-display font-extrabold text-gold text-6xl leading-none"><CountUp value={58} /><span className="text-2xl text-ash">/100</span></p>
            </div>
            <div className="space-y-3.5 mt-6">
              {PREVIEW_BARS.map(([n, s]) => (
                <div key={n}>
                  <div className="flex justify-between text-sm mb-1"><span>{n}</span><span className="text-ash tabular-nums">{s}/10</span></div>
                  <div className="h-1.5 rounded-full bg-white/10"><div className={`h-full rounded-full ${s < 5 ? "bg-ash" : "bg-gold"}`} style={{ width: `${s * 10}%` }} /></div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-sm text-gold">Recommended starting point</p>
              <p className="font-semibold mt-1">Energy & Recovery</p>
              <p className="text-sm text-white/65 mt-1">First Daily Win: go to bed 15 minutes earlier.</p>
            </div>
          </Card>
        </div>
      </Section>

      {/* The long game */}
      <Section id="long-game" className="bg-black/45 border-y border-white/5">
        <Title className="max-w-[24ch]">The life you'll be living in 20 years is being shaped by the tiny decisions you're making today.</Title>
        <Lead>The long game means small decisions that improve your life now and build a better one for later.</Lead>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 mt-12">
          {LONG_GAME.map(({ Icon, title, text }) => (
            <div key={title} className="border-t border-white/15 py-6">
              <Icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
              <h3 className="font-display uppercase font-extrabold text-2xl text-white mt-4 leading-none">{title}</h3>
              <p className="text-white/70 mt-3 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <ol className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {["Achievable", "Repeatable", "Consistency", "Momentum"].map((w, i) => (
            <li key={w} className="border-l-2 border-gold pl-4">
              <span className="font-display font-extrabold text-ash text-lg">{i + 1}</span>
              <p className="font-display uppercase font-extrabold text-2xl md:text-3xl leading-none mt-1">{w}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-lg text-white/75 max-w-[58ch]">One Daily Win is achievable. What's achievable gets repeated, and repetition builds momentum. Start small and give it time.</p>
      </Section>

      {/* Free events */}
      <Section id="events">
        <Title>Experience Daily Wins for yourself. On me.</Title>
        <Lead>Free introductory events on the ideas behind Daily Wins and how to use them in everyday life. There's no obligation.</Lead>
        <div className="grid md:grid-cols-2 gap-5 mt-10">
          {EVENTS.map((e) => (
            <Card key={e.title} className="flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display uppercase font-extrabold text-4xl leading-none text-white">{e.title}</h3>
                <span className="font-display uppercase font-extrabold text-black bg-gold rounded px-2.5 py-1 leading-none">Free</span>
              </div>
              <dl className="mt-6 flex-1">
                {e.facts.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-t border-white/10 py-3"><dt className="text-ash">{k}</dt><dd className="text-white font-medium text-right">{v}</dd></div>
                ))}
                <div className="flex justify-between gap-4 border-t border-white/10 py-3"><dt className="text-ash">Next date</dt><dd className="text-white font-medium text-right">To be confirmed</dd></div>
              </dl>
              <Note kind="needed">Event dates, venue and booking link from Ben.</Note>
              <GoldButton className="mt-3 w-full" onClick={() => setForm({ title: `Free ${e.title.toLowerCase()} introduction`, tag: e.tag, description: "Dates are being finalised. Leave your details and you'll be first to hear when registration opens." })}>
                Register my interest
              </GoldButton>
            </Card>
          ))}
        </div>
      </Section>

      {/* Free resources */}
      <Section id="resources" className="bg-black/45 border-y border-white/5">
        <Title>Start your first Daily Win today. For free.</Title>
        <Lead>You shouldn't have to pay to begin improving your life.</Lead>
        <div className="grid md:grid-cols-3 gap-x-10 mt-10">
          {RESOURCES.map((r) => (
            <div key={r.title} className="border-t border-white/15 py-6 flex flex-col">
              <h3 className="font-display uppercase font-extrabold text-2xl leading-none text-white">{r.title}</h3>
              <p className="text-white/70 mt-3 flex-1 leading-relaxed">{r.text}</p>
              <OutlineButton to={r.to} href={r.href} className="mt-5 self-start">{r.cta}</OutlineButton>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {EPISODES.map((e) => (
            <button key={e.videoId} onClick={() => startTrackedRedirect(e.videoId)} className="group text-left rounded-lg overflow-hidden border border-white/10 bg-coal hover:border-gold/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <div className="relative aspect-video">
                <img src={`https://img.youtube.com/vi/${e.videoId}/hqdefault.jpg`} alt="" width={480} height={360} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors">
                  <span className="w-12 h-12 rounded-full bg-gold text-black flex items-center justify-center"><Play className="w-5 h-5 ml-0.5" fill="currentColor" /></span>
                </span>
              </div>
              <div className="p-4"><p className="text-sm font-semibold line-clamp-2">{e.title}</p><p className="text-xs text-ash mt-1">{e.views}</p></div>
            </button>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <Title className="max-w-[20ch] md:text-7xl">A year from now, will you still be making the same promises to yourself?</Title>
        <Lead>Start making more of your days count. You don't need to win every one.</Lead>
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <GoldButton to="/test">Take the Free Daily Wins Test</GoldButton>
          <OutlineButton to="/coaching">Explore Coaching & Mentoring</OutlineButton>
        </div>
      </Section>

      <SiteFooter />
      </div>

      {form && (
        <LeadForm open={!!form} onOpenChange={(o) => !o && setForm(null)} title={form.title} description={form.description}
          tag={form.tag} submitLabel="Register my interest" successText="You're on the list. I'll email you as soon as dates are confirmed." />
      )}
    </div>
  );
};

export default Home;
