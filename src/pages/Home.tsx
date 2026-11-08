import { useState } from "react";
import {
  ArrowRight, HeartPulse, Apple, PiggyBank, Users, Briefcase, Sun,
  Headphones, BookOpen, GraduationCap, MapPin, Globe, Clock, Play,
} from "lucide-react";
import { GoldButton, OutlineButton, Section, Title, Eyebrow, Prose, Card } from "@/components/site/ui";
import LeadForm from "@/components/site/LeadForm";
import SiteFooter from "@/components/site/SiteFooter";
import { startTrackedRedirect } from "@/lib/youtube-redirect";

const HERO_IMAGE = "/lovable-uploads/recording-setup-new.jpg";

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
  { Icon: HeartPulse, title: "Health & Longevity", text: "Don't just train for the body you want next summer. Train for the life you want at 80. The strength to lift your grandchildren. The fitness to explore new places. The independence to keep doing the things you love." },
  { Icon: Apple, title: "Nutrition & Energy", text: "Don't just eat for how you want to look. Eat for how you want to live. More energy to enjoy your days. Better health to enjoy your years. A body that supports your ambitions rather than limits them." },
  { Icon: PiggyBank, title: "Money & Financial Freedom", text: "Don't just work for your money. Make your money work for your future. Less financial stress. More freedom to make choices. The ability to spend your time doing what matters, rather than what your bank balance dictates." },
  { Icon: Users, title: "Relationships & Family", text: "Don't wait until you have more time for the people you love. Build the relationships you'll treasure for a lifetime. More moments that matter. Stronger connections. Fewer regrets about the time you wish you'd spent differently." },
  { Icon: Briefcase, title: "Career & Personal Growth", text: "Don't just chase your next promotion. Build a career that opens doors for decades. Develop the skills, confidence and relationships that create opportunities, independence and a sense of purpose." },
  { Icon: Sun, title: "Time & Fulfilment", text: "Don't spend five days waiting for the weekend, fifty weeks waiting for the summer holiday or forty years waiting for retirement. Build a life you enjoy living on ordinary Tuesdays." },
];

const PREVIEW_BARS = [
  ["Body & Movement", 6.2], ["Energy & Recovery", 4.1], ["Money & Time", 5.4],
  ["Relationships", 7.8], ["Habits & Self-Control", 4.6], ["Purpose & Growth", 6.9],
] as const;

const Home = () => {
  const [form, setForm] = useState<null | { title: string; tag: string; description: string }>(null);

  return (
    <div className="min-h-screen">
      {/* Hero: full-width image of Ben. Swap HERO_IMAGE for a b-roll <video> when supplied. */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        <img src={HERO_IMAGE} alt="Ben Raven recording a Daily Wins episode" className="absolute inset-0 w-full h-full object-cover object-[60%_35%] animate-kenburns" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl animate-fade-in">
            <Eyebrow>Ben Raven · Daily Wins</Eyebrow>
            <h1 className="font-display text-[2.6rem] sm:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-[-0.03em] [text-wrap:balance]">
              <span className="text-white">Helping you play the long game.</span>{" "}
              <span className="italic text-primary">One Daily Win at a time.</span>
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-white mt-7">Change your life by changing almost nothing about your day.</p>
            <div className="mt-5 space-y-4 text-base md:text-lg text-white/80 leading-relaxed">
              <p>We all know we should sleep better, move more, eat healthier and save money. But knowing what to do and actually doing it are two very different things.</p>
              <p>I'm Ben Raven, founder of Daily Wins. Through personal coaching, mentoring and practical life skills, I help people understand their behaviours, break unhelpful cycles and make tiny changes today compound into a better future.</p>
            </div>
            <p className="mt-6 italic text-primary/90 text-lg">You won't achieve your goal tomorrow. But you can make sure tomorrow contributes towards it.</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <GoldButton to="/coaching" arrow>Explore Coaching & Mentoring</GoldButton>
              <OutlineButton to="/test" className="bg-black/40 backdrop-blur">Take the Free Daily Wins Test</OutlineButton>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="border-y border-primary/15 bg-black/60">
        <div className="max-w-4xl mx-auto px-5 py-7 grid grid-cols-3 gap-4 text-center">
          {[["30K+", "YouTube subscribers"], ["300+", "Daily Wins episodes"], ["8PM", "New episode, every day"]].map(([s, l]) => (
            <div key={l}><p className="font-display font-extrabold italic text-primary text-3xl md:text-5xl leading-none tracking-tight">{s}</p><p className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-white/55 mt-3">{l}</p></div>
          ))}
        </div>
      </div>

      {/* Same resolutions */}
      <Section narrow>
        <Title>There's a reason you keep making the same New Year's resolutions.</Title>
        <Prose className="mt-8">
          <p>Every year, you tell yourself you'll get fitter. Eat better. Save more. Drink less. Spend less time on your phone. Be more present with the people you love.</p>
          <p>You start with the best intentions. But life gets busy. Motivation fades. Old habits return.</p>
          <p>And before you know it, you're making the same promises to yourself all over again. <span className="text-white font-semibold">Different year. Same resolutions. Same frustrations.</span></p>
          <p className="text-xl text-white font-semibold border-l-2 border-primary pl-5">The problem isn't your desire to change. It's that you've never been taught why you keep repeating your Daily Drifts.</p>
          <p>We spend so much time thinking about what we need to change that we rarely stop to understand why we haven't changed it already.</p>
        </Prose>
      </Section>

      {/* Common sense vs common action */}
      <Section className="bg-[#0b0b0b] border-y border-white/5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Title>Common sense isn't always common action.</Title>
            <Prose className="mt-6">
              <p>We live in a world overflowing with information about how to improve our lives. We know more about health, nutrition, sleep, exercise, money and wellbeing than ever before. Yet knowing better doesn't necessarily mean doing better.</p>
              <p className="text-white font-semibold">If knowing what to do was enough, we'd all be living very different lives.</p>
              <p><span className="text-primary font-semibold">Daily Wins is about closing that gap.</span> Understanding why we make the decisions we make, and learning how to turn what we already know into what we actually do.</p>
              <p>Not through guilt, pressure or endless willpower. Simply by making the better decision easier.</p>
            </Prose>
          </div>
          <div className="rounded-2xl border border-primary/25 overflow-hidden">
            <div className="grid grid-cols-2 bg-primary text-black">
              <div className="p-4 md:p-5"><p className="font-bold uppercase tracking-wide">Common Sense</p><p className="text-sm opacity-75">What we know</p></div>
              <div className="p-4 md:p-5 border-l border-black/15"><p className="font-bold uppercase tracking-wide">Common Action</p><p className="text-sm opacity-75">What we do</p></div>
            </div>
            {SENSE_ACTION.map(([a, b], i) => (
              <div key={a} className={`grid grid-cols-2 ${i % 2 ? "bg-[#141414]" : "bg-[#101010]"}`}>
                <p className="p-4 md:p-5 text-white font-medium">{a}</p>
                <p className="p-4 md:p-5 text-white/60 border-l border-white/10">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Comfort trade */}
      <Section>
        <div className="max-w-3xl">
          <Title>We can't choose between comfort and discomfort. Only which one comes first.</Title>
          <Prose className="mt-6">
            <p>Every day, we make small decisions that trade one kind of comfort for another.</p>
            <p>Staying in bed instead of exercising feels comfortable now, but being less physically capable can make life more uncomfortable later. Spending money on something we don't need feels good today, but financial stress can create discomfort tomorrow. The sugary snack at 3pm feels rewarding in the moment, but a body you're unhappy with can chip away at your confidence and self-esteem over time.</p>
            <p className="text-white text-xl font-semibold">This is The Comfort Trade.</p>
            <p>We repeatedly choose immediate comfort without fully considering the long-term price. And sometimes, the behaviours we use to feel better today are the very things making us feel worse tomorrow.</p>
          </Prose>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <p className="text-center text-xs md:text-sm uppercase tracking-[0.2em] text-white/50">The Daily Drift</p>
            <p className="text-center text-xs md:text-sm uppercase tracking-[0.2em] text-primary">The Daily Win</p>
            <div className="rounded-2xl border border-white/15 bg-[#151515] p-5 md:p-7">
              <p className="text-xs uppercase tracking-wider text-white/50">Short-term comfort</p>
              <p className="text-lg md:text-2xl font-bold mt-2">Stay up scrolling</p>
            </div>
            <div className="rounded-2xl border border-primary/40 bg-primary/[0.07] p-5 md:p-7">
              <p className="text-xs uppercase tracking-wider text-primary/80">Short-term discomfort</p>
              <p className="text-lg md:text-2xl font-bold mt-2">Put the phone down and go to bed</p>
            </div>
            <div className="flex justify-center"><ArrowRight className="w-6 h-6 text-white/30 rotate-90" /></div>
            <div className="flex justify-center"><ArrowRight className="w-6 h-6 text-primary rotate-90" /></div>
            <div className="rounded-2xl border border-white/15 bg-[#151515] p-5 md:p-7">
              <p className="text-xs uppercase tracking-wider text-white/50">Long-term discomfort</p>
              <p className="text-base md:text-xl font-bold mt-2 text-white/80">Fatigue, anxiety, brain fog & frustration</p>
            </div>
            <div className="rounded-2xl border border-primary bg-primary text-black p-5 md:p-7">
              <p className="text-xs uppercase tracking-wider text-black/70">Long-term comfort</p>
              <p className="text-base md:text-xl font-bold mt-2 text-black">Recovery, confidence, clarity & energy</p>
            </div>
          </div>
          <p className="text-center text-white/75 mt-8 text-lg max-w-2xl mx-auto">Daily Wins coaching helps you recognise these trades and make more deliberate choices. Because playing the long game means understanding when a little discomfort today can create a lot more comfort tomorrow.</p>
        </div>
      </Section>

      {/* Big goals / small goals */}
      <Section narrow className="bg-[#0b0b0b] border-y border-white/5 md:py-24">
        <Title>Big goals feel overwhelming. Small goals feel pointless.</Title>
        <Prose className="mt-6">
          <p>And that's precisely why so many of us struggle to change. We dismiss big goals because they feel too overwhelming. We dismiss small goals because they seem too insignificant. So we end up doing neither, and let the time pass anyway.</p>
          <p>But our brains aren't making these decisions without reason. We're naturally drawn towards immediate rewards and away from effort, uncertainty and discomfort. We find it easier to value what we can experience today than the benefits we might enjoy months or years from now. And that creates a problem.</p>
          <p className="text-white font-semibold">The changes that could make the biggest difference to our future are often the ones that feel least rewarding today.</p>
          <p>I help you understand why your brain makes these decisions, recognise the everyday behaviours influencing your future and learn how to make the better choice the easier choice.</p>
          <p>Because whether you realise it or not, you're already making small decisions every day that are shaping your life. The question is whether they're taking you towards the future you want <span className="text-primary font-semibold">(Daily Wins)</span>, or away from it <span className="text-white/60 font-semibold">(Daily Drifts)</span>.</p>
        </Prose>
        <p className="text-2xl md:text-3xl italic font-bold text-white mt-10 leading-snug">Neither feels significant today. <span className="text-primary">Both compound into something significant tomorrow.</span></p>
      </Section>

      {/* Test teaser */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>The Free Daily Wins Test</Eyebrow>
            <Title>How well are you playing the long game?</Title>
            <p className="text-xl text-white font-semibold mt-5">You can't improve what you haven't taken the time to understand.</p>
            <Prose className="mt-5">
              <p>How happy are you with your health, finances, relationships, habits and the direction your life is heading? And where could a few small changes make the biggest difference?</p>
              <p>Take my free Daily Wins Test and discover where you're thriving, where your Daily Drifts might be holding you back, and which Daily Wins could help you move forward.</p>
              <p>Answer 28 simple questions, receive a personalised snapshot of your life and discover a recommended starting point. No judgement. No pass or fail. Just a better understanding of where you are and where you'd like to go.</p>
            </Prose>
            <GoldButton to="/test" arrow className="mt-8">Take the Free Daily Wins Test</GoldButton>
          </div>
          <Card className="relative">
            <span className="absolute -top-3 right-6 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full">Example results</span>
            <p className="font-display font-bold text-xl tracking-tight">Your Daily Wins Snapshot</p>
            <p className="text-sm text-white/50 mb-5">Long Game Score: <span className="text-primary font-bold">58/100</span></p>
            <div className="space-y-3.5">
              {PREVIEW_BARS.map(([n, s]) => (
                <div key={n}>
                  <div className="flex justify-between text-sm mb-1"><span>{n}</span><span className="text-white/60">{s}/10</span></div>
                  <div className="h-2 rounded-full bg-white/10"><div className={`h-full rounded-full ${s < 5 ? "bg-primary" : "bg-primary/50"}`} style={{ width: `${s * 10}%` }} /></div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-primary/30 p-4">
              <p className="text-xs uppercase tracking-wider text-primary">Recommended starting point</p>
              <p className="font-bold mt-1">Energy & Recovery</p>
              <p className="text-sm text-white/65 mt-1">Your first Daily Win: go to bed 15 minutes earlier.</p>
            </div>
          </Card>
        </div>
      </Section>

      {/* The long game */}
      <Section className="bg-[#0b0b0b] border-y border-white/5">
        <div className="max-w-3xl">
          <Title>The life you'll be living in 20 years is being shaped by the tiny decisions you're making today.</Title>
          <Prose className="mt-6">
            <p>We focus on how we want to feel today. But what if the smallest decisions you make today could change what your life looks like in 10, 20 or even 30 years?</p>
            <p>Imagine being 75 and still having the strength to explore the world. Having the financial freedom to choose how you spend your time. Having relationships that have grown stronger with every passing year. Having a career that excites you rather than exhausts you. And waking up each morning to a life you actually look forward to living.</p>
            <p className="text-white text-xl font-semibold">That's the long game.</p>
            <p>Not sacrificing your happiness today for some distant reward. But making small decisions that can improve your life now, while building an even better one for the future. And it starts in the most ordinary moments of your day.</p>
          </Prose>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px mt-14 rounded-2xl overflow-hidden border border-white/10 bg-white/10">
          {LONG_GAME.map(({ Icon, title, text }) => (
            <div key={title} className="group bg-[#0b0b0b] p-7 md:p-9 transition-colors hover:bg-[#111]">
              <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              <h3 className="font-display font-bold text-xl text-white mt-5 tracking-tight">{title}</h3>
              <p className="text-white/65 mt-3 leading-relaxed text-[15px]">{text}</p>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto text-center mt-16">
          <h3 className="font-display italic font-extrabold text-primary text-3xl md:text-4xl tracking-tight">The Long Game</h3>
          <p className="text-lg text-white/80 mt-4 leading-relaxed">The long game isn't about adding more years to your life. It's about adding more life to your years. And you don't have to change your entire life to start changing your future. You just start with one Daily Win.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 mt-8 text-sm md:text-base font-semibold">
            {["Achievable", "Repeatable", "Consistency", "Momentum"].map((w, i) => (
              <span key={w} className="flex items-center gap-2">
                <span className="px-4 py-2 rounded-full border border-primary/40 text-white">{w}</span>
                {i < 3 && <ArrowRight className="w-4 h-4 text-primary" />}
              </span>
            ))}
          </div>
          <p className="text-white/70 mt-6">One Daily Win is achievable. The achievable things are the repeatable things. The repeatable things create consistency. Consistency builds momentum.</p>
          <p className="text-white font-semibold mt-3 text-lg">All you need to be willing to do is start small, and give it time.</p>
        </div>
      </Section>

      {/* Free events */}
      <Section id="events">
        <div className="max-w-3xl">
          <Eyebrow>Free Introductory Events</Eyebrow>
          <Title>Experience Daily Wins for yourself. On me.</Title>
          <Prose className="mt-6">
            <p>You don't have to commit to private coaching to start benefiting from Daily Wins. I host free introductory events, both online and in person, where we explore the ideas behind the Daily Wins philosophy and how they can be applied to everyday life.</p>
            <p>We'll look at why common sense doesn't always translate into common action, how the Comfort Trade influences our behaviours and why compounding makes small changes so powerful.</p>
            <p>You'll leave with a fresh perspective on your own habits, practical Daily Wins you can start using immediately and a better understanding of how to play the long game.</p>
            <p className="text-white font-semibold">No pressure. No obligation. Just an opportunity to learn something useful about yourself.</p>
          </Prose>
        </div>
        <div className="grid md:grid-cols-2 gap-5 mt-10">
          {[
            { Icon: MapPin, title: "Free In-Person Introduction", meta: [["120 minutes", Clock], ["London", MapPin]], text: "A personal, interactive experience. Limited spaces.", tag: "Event interest: In-person introduction (London)" },
            { Icon: Globe, title: "Free Online Introduction", meta: [["60 minutes", Clock], ["Join from anywhere", Globe]], text: "Discover how Daily Wins can help you, from wherever you are.", tag: "Event interest: Online introduction" },
          ].map((e) => (
            <Card key={e.title} className="flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-2xl italic text-white tracking-tight">{e.title}</h3>
                <span className="text-xs font-bold text-black bg-primary rounded-full px-3 py-1">FREE</span>
              </div>
              <div className="flex gap-5 mt-4 text-sm text-white/70">
                {e.meta.map(([label, I]) => { const Ic = I as typeof Clock; return <span key={label as string} className="flex items-center gap-1.5"><Ic className="w-4 h-4 text-primary" />{label as string}</span>; })}
              </div>
              <p className="text-white/75 mt-4 flex-1">{e.text}</p>
              <p className="text-sm text-primary/80 mt-4">Next dates coming soon</p>
              <GoldButton className="mt-4 w-full min-h-12 text-base" onClick={() => setForm({ title: e.title, tag: e.tag, description: "Dates are being finalised. Leave your details and you'll be first to hear when registration opens." })}>
                Register my interest
              </GoldButton>
            </Card>
          ))}
        </div>
      </Section>

      {/* Free resources */}
      <Section className="bg-[#0b0b0b] border-y border-white/5">
        <div className="max-w-3xl">
          <Title>Start your first Daily Win today. For free.</Title>
          <Prose className="mt-6">
            <p>Not everyone wants or needs personal coaching. And you shouldn't have to pay to begin improving your life.</p>
            <p>That's why Daily Wins offers a growing collection of free and affordable resources designed to help you understand yourself and make small changes that can create meaningful long-term benefits.</p>
          </Prose>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {[
            { Icon: Headphones, title: "The Daily Wins Podcast & Videos", text: "Explore the science, psychology and everyday behaviours behind living a better life.", cta: "Watch & Listen", to: "/podcast", href: undefined },
            { Icon: BookOpen, title: "The Daily Wins Library", text: "Discover practical Daily Wins across health, money, relationships, time and personal wellbeing.", cta: "Explore the Library", to: "/tips", href: undefined },
            { Icon: GraduationCap, title: "Daily Wins Courses", text: "Something in between free content and personalised coaching. Practical, affordable and designed to help you build useful life skills and better everyday habits.", cta: "Start The Invisible Workout", to: undefined, href: "https://bigdaddysbigtips.xperiencify.io/" },
          ].map((r) => (
            <Card key={r.title} className="flex flex-col">
              <r.Icon className="w-6 h-6 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="font-display font-bold text-xl text-white tracking-tight">{r.title}</h3>
              <p className="text-white/70 mt-3 flex-1 leading-relaxed">{r.text}</p>
              <OutlineButton to={r.to} href={r.href} arrow className="mt-6 min-h-12 text-base">{r.cta}</OutlineButton>
            </Card>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {EPISODES.map((e) => (
            <button key={e.videoId} onClick={() => startTrackedRedirect(e.videoId)} className="group text-left rounded-2xl overflow-hidden border border-white/10 bg-[#141414] hover:border-primary/40 transition-colors">
              <div className="relative aspect-video">
                <img src={`https://img.youtube.com/vi/${e.videoId}/hqdefault.jpg`} alt={e.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors">
                  <span className="w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center"><Play className="w-5 h-5 ml-0.5" fill="currentColor" /></span>
                </span>
              </div>
              <div className="p-4"><p className="text-sm font-semibold line-clamp-2">{e.title}</p><p className="text-xs text-white/50 mt-1">{e.views}</p></div>
            </button>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section narrow className="text-center md:py-28">
        <Title className="md:text-[3.25rem]">A year from now, will you still be making the same promises to yourself?</Title>
        <Prose className="mt-8 text-left md:text-center">
          <p>Another year will pass. Another 365 days of decisions. Another year of habits, routines, opportunities and experiences.</p>
          <p>And every day, those decisions will be helping to shape your future. You can keep waiting for the perfect moment to change. For Monday. For January. For life to become less busy.</p>
          <p>Or you can start making small changes now. Changes that don't require you to turn your life upside down. Changes that fit into the life you're already living. Changes that, given time and consistency, can help create a future you'll be grateful for.</p>
          <p className="text-white font-semibold">You don't have to win every single day. You just have to start making more of your days count.</p>
        </Prose>
        <p className="text-2xl md:text-3xl italic font-bold text-primary mt-10">Win the long game. One Daily Win at a time.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          <GoldButton to="/test" arrow>Take the Free Daily Wins Test</GoldButton>
          <OutlineButton to="/coaching">Explore Coaching & Mentoring</OutlineButton>
        </div>
      </Section>

      <SiteFooter />

      {form && (
        <LeadForm open={!!form} onOpenChange={(o) => !o && setForm(null)} title={form.title} description={form.description}
          tag={form.tag} submitLabel="Register my interest" successText="You're on the list. I'll email you as soon as dates are confirmed." />
      )}
    </div>
  );
};

export default Home;
