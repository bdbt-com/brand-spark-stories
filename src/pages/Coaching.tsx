import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ClipboardCheck, CalendarDays, PlayCircle, Users, MessageCircle, Sparkles, Trophy, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GoldButton, OutlineButton, Section, Title, Eyebrow, Prose, Card } from "@/components/site/ui";
import LeadForm from "@/components/site/LeadForm";
import SiteFooter from "@/components/site/SiteFooter";
import { cn } from "@/lib/utils";

const HERO_IMAGE = "/lovable-uploads/5e8aba04-f6cc-44a2-9bcc-eaf2424e3976.png";

// Prices and formats are Ben's working drafts. Edit here.
interface Offer { name: string; price: string; meta: string; text: string[]; cta: string; flagship?: boolean; bullets?: string[] }

const CLARITY: Offer[] = [
  { name: "Free Discovery Call", price: "Free", meta: "20 minutes · Online", text: ["Let's explore what you'd like to change, what you're hoping to achieve and whether Daily Wins coaching is the right fit.", "No pressure. No obligation."], cta: "Request a discovery call" },
  { name: "Individual Coaching Session", price: "£150", meta: "60 minutes · Online or in person", text: ["One challenge. One focused conversation. A clearer way forward.", "Explore a specific habit, frustration or decision and leave with practical next steps."], cta: "Enquire about a session" },
  { name: "Daily Wins Deep Dive", price: "£195", meta: "90 minutes · Online or in person", text: ["Take a closer look at your life, identify your biggest opportunities for improvement and leave with a personalised 30-day Daily Wins Starter Blueprint."], cta: "Ask about a Deep Dive" },
];

const LASTING: Offer[] = [
  { name: "Four-Session Daily Wins Journey", price: "£525", meta: "4 × 60-minute sessions", flagship: true, text: ["Understand your habits, recognise the behaviours holding you back and begin building a more sustainable approach to everyday life.", "Includes a personalised 90-day Daily Wins Blueprint."], cta: "Enquire about the four sessions" },
  { name: "Eight-Session Transformation Journey", price: "£995", meta: "8 × 60-minute sessions", text: ["Explore several interconnected areas of your life and develop the habits, systems and self-understanding needed for broader change.", "Includes a comprehensive six-month Blueprint."], cta: "Enquire about the eight sessions" },
];

const INTENSIVES: Offer[] = [
  { name: "Half-Day Life Review", price: "£495", meta: "3.5 hours", text: ["A focused review of your current circumstances, priorities and behaviours.", "We'll identify your biggest opportunities for improvement and develop a personalised 30-day plan."], cta: "Enquire about the Half-Day Review" },
  { name: "Full-Day Life Reset", price: "£895", meta: "7 hours", text: ["A comprehensive exploration of your life, habits, goals and long-term priorities.", "We'll examine your Daily Drifts, Comfort Trades and opportunities for meaningful change, culminating in a personalised 90-day Transformation Blueprint."], cta: "Enquire about the Full-Day Reset" },
  { name: "Three-Day Daily Wins Experience", price: "£2,495", meta: "Three full days", text: ["An immersive personal development experience exploring three interconnected dimensions of your life:"], bullets: ["The Vessel: understanding and looking after yourself", "The Ripples: understanding the influence your decisions have on others", "The Journey: understanding where you're heading and the life you want to create"], cta: "Enquire about the Three-Day Experience" },
];

const FAQ = [
  ["How do I know which option is right for me?", "Start with the free Daily Wins Test or book a discovery call. We can explore your goals and whether personal coaching, community membership, a course or a free resource would be the most useful starting point."],
  ["Do I need to have a specific problem to work with you?", "Not at all. Some people want help with a particular challenge. Others want to improve several aspects of their lives or simply understand themselves better."],
  ["What's the difference between the Daily Wins Community and private coaching?", "The community offers group learning, exclusive educational content, challenges and Q&As. Private coaching is personalised to your circumstances, goals and behaviours, with dedicated one-to-one time."],
  ["Can I join the community without booking coaching?", "Absolutely. The community is a standalone membership. You don't need to purchase coaching or courses to participate."],
  ["Can I book a single coaching session?", "Yes. Individual sessions and Deep Dives are available subject to availability."],
  ["What if I've tried changing my habits before and failed?", "Then we have valuable experiences to learn from. Rather than relying on more motivation, we'll explore why previous attempts were difficult to sustain and how you might approach things differently."],
  ["Is Daily Wins coaching therapy or regulated financial advice?", "No. Daily Wins focuses on personal development, education, behaviour and practical life skills. It doesn't replace professional medical care, mental health treatment or regulated financial advice."],
];

const OfferCard = ({ o, onClick }: { o: Offer; onClick: () => void }) => (
  <div className={cn("relative rounded-2xl border p-6 md:p-7 flex flex-col bg-[#121212]", o.flagship ? "border-primary shadow-[0_20px_60px_-30px_hsl(var(--primary)/0.6)]" : "border-white/10")}>
    {o.flagship && <span className="absolute -top-3 left-6 bg-primary text-black text-[11px] font-bold tracking-[0.16em] px-3 py-1 rounded-full">RECOMMENDED</span>}
    <div className="flex items-start justify-between gap-4">
      <h4 className="font-display font-bold text-xl text-white tracking-tight leading-snug">{o.name}</h4>
      <span className="font-display text-primary font-extrabold text-2xl italic whitespace-nowrap">{o.price}</span>
    </div>
    <p className="text-sm text-white/50 mt-1">{o.meta}</p>
    <div className="mt-4 space-y-3 text-white/75 leading-relaxed flex-1">
      {o.text.map((t) => <p key={t}>{t}</p>)}
      {o.bullets && (
        <ul className="space-y-2 pt-1">
          {o.bullets.map((b) => { const [h, r] = b.split(": "); return (
            <li key={b} className="flex gap-2"><Check className="w-4 h-4 text-primary mt-1 shrink-0" /><span><span className="text-white font-semibold">{h}</span>: {r}</span></li>
          ); })}
        </ul>
      )}
    </div>
    {o.price === "Free" || o.flagship ? (
      <GoldButton onClick={onClick} className="mt-6 min-h-12 text-base w-full">{o.cta}</GoldButton>
    ) : (
      <OutlineButton onClick={onClick} className="mt-6 min-h-12 text-base w-full">{o.cta}</OutlineButton>
    )}
  </div>
);

const Coaching = () => {
  const [form, setForm] = useState<null | { title: string; tag: string; description?: string; message?: boolean; submit?: string; success?: string }>(null);
  const enquire = (o: Offer) =>
    setForm({
      title: o.name,
      tag: `Coaching enquiry: ${o.name}`,
      description: o.price === "Free" ? "Leave your details and I'll get in touch to arrange a time that suits you." : "Leave your details and I'll be in touch to talk it through and check availability.",
      message: true,
      submit: o.price === "Free" ? "Request my call" : "Send enquiry",
    });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={HERO_IMAGE} alt="Ben Raven at home" className="absolute inset-0 w-full h-full object-cover object-[70%_30%] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/50" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl animate-fade-in">
            <Eyebrow>Daily Wins Coaching & Mentoring</Eyebrow>
            <h1 className="font-display text-[2.6rem] sm:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-[-0.03em] text-white [text-wrap:balance]">
              Understand yourself. Change your behaviours. <span className="italic text-primary">Win the long game.</span>
            </h1>
            <div className="mt-6 space-y-4 text-lg text-white/80 leading-relaxed">
              <p>There's a reason you keep making the same promises to yourself. You know what you'd like to change. You've probably tried changing it before.</p>
              <p>But knowing what to do, understanding why you don't do it and learning how to make it happen are three very different things.</p>
              <p>Through Daily Wins coaching, I'll help you understand your behaviours, break the cycles holding you back and develop small, achievable changes that fit your life. Whether it's your health, finances, relationships, career, confidence or overall wellbeing, the same habit principles apply. We'll focus on what matters most to you.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <GoldButton onClick={() => enquire(CLARITY[0])} arrow>Request a Free Discovery Call</GoldButton>
              <OutlineButton to="/test" className="bg-black/40">Take the Free Daily Wins Test</OutlineButton>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <Section narrow>
        <div className="space-y-3">
          {[
            "Perhaps you're doing well professionally, but neglecting your health.",
            "Perhaps you're financially comfortable, but constantly stressed.",
            "Perhaps you're spending so much time looking after everyone else that you've forgotten to look after yourself.",
            "Perhaps you're tired of repeating habits you know aren't helping you.",
            "Or perhaps life is already good, but you know deep down it could be better.",
          ].map((t) => (
            <p key={t} className="text-lg md:text-xl text-white/85 border-l-2 border-primary/50 pl-5 py-1">{t}</p>
          ))}
        </div>
        <p className="text-xl md:text-2xl italic font-bold text-white mt-10 leading-snug">Daily Wins coaching is for people who want to understand themselves better, make more deliberate choices and build a future that <span className="text-primary">reflects what matters to them.</span></p>
      </Section>

      {/* Free */}
      <Section className="bg-[#0b0b0b] border-y border-white/5">
        <div className="max-w-3xl">
          <Eyebrow>Start for free</Eyebrow>
          <Title>Your first Daily Win doesn't have to cost you anything.</Title>
          <Prose className="mt-5"><p>I believe the life skills that can make the biggest difference to our futures should be accessible to everyone. That's why I've created free resources and experiences to help you understand your habits, explore the Daily Wins philosophy and discover where to begin.</p></Prose>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {[
            { Icon: ClipboardCheck, title: "The Free Daily Wins Test", text: "Answer 28 questions across different areas of your life. Discover your strengths, identify opportunities for improvement and receive personalised Daily Wins and a recommended starting point.", cta: "Take My Free Daily Wins Test", to: "/test", gold: true },
            { Icon: CalendarDays, title: "Free Daily Wins Events", text: "Join me online or in person to explore the Comfort Trade, Common Sense vs Common Action, Daily Drifts and the power of compounding. Leave with a better understanding of your own behaviours and practical ideas you can use immediately.", cta: "View Upcoming Free Events", to: "/#events" },
            { Icon: PlayCircle, title: "Free Daily Wins Videos & Library", text: "Explore practical Daily Wins across health, money, relationships, time, productivity and wellbeing.", cta: "Explore Free Daily Wins", to: "/tips" },
          ].map((r) => (
            <Card key={r.title} className="flex flex-col">
              <r.Icon className="w-6 h-6 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="font-display font-bold text-xl text-white tracking-tight">{r.title}</h3>
              <p className="text-white/70 mt-3 flex-1 leading-relaxed">{r.text}</p>
              {r.gold ? <GoldButton to={r.to} className="mt-6 min-h-12 text-base">{r.cta}</GoldButton> : <OutlineButton to={r.to} className="mt-6 min-h-12 text-base">{r.cta}</OutlineButton>}
            </Card>
          ))}
        </div>
      </Section>

      {/* Community */}
      <Section id="community">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          <div>
            <Eyebrow>The Daily Wins Community</Eyebrow>
            <Title>You don't have to play the long game alone.</Title>
            <Prose className="mt-6">
              <p>Changing your life is easier when you have somewhere to keep showing up for it. We all start with good intentions, but motivation comes and goes.</p>
              <p>Sometimes, all we need is a little encouragement, a fresh perspective or a reminder of why we started. That's why I've built the Daily Wins Community: a place for people who want to understand themselves better, challenge their Daily Drifts, celebrate their Daily Wins and support one another in playing the long game.</p>
              <p className="text-white font-semibold">Not a community obsessed with overnight transformations. A community committed to lasting improvements.</p>
            </Prose>
          </div>
          <div className="rounded-2xl border border-primary bg-gradient-to-b from-primary/[0.1] to-[#141414] p-7 md:p-8">
            <div className="flex items-baseline gap-2"><span className="font-display text-5xl font-extrabold italic text-primary tracking-tight">£9.99</span><span className="text-white/60">per month</span></div>
            <p className="font-semibold text-white mt-1">What your membership includes</p>
            <ul className="mt-6 space-y-5">
              {[
                [MessageCircle, "Live Q&As With Ben", "Ask questions, explore everyday challenges and get practical guidance on the habits, behaviours and decisions shaping your life."],
                [Sparkles, "Exclusive Members-Only Content", "Go deeper into the Daily Wins philosophy, explore practical tools and discover ideas that go beyond my public videos."],
                [Trophy, "Monthly Daily Wins Challenges", "Take part in simple, achievable challenges designed to help you turn common sense into common action."],
                [Users, "A Community That Understands the Long Game", "Share experiences, celebrate progress and connect with others working towards a better future."],
              ].map(([I, h, t]) => { const Ic = I as typeof Users; return (
                <li key={h as string} className="flex gap-3"><Ic className="w-5 h-5 text-primary mt-0.5 shrink-0" /><div><p className="font-semibold text-white">{h as string}</p><p className="text-sm text-white/65 mt-1 leading-relaxed">{t as string}</p></div></li>
              ); })}
            </ul>
            <p className="text-sm text-white/60 mt-6">No impossible promises. No pressure to be perfect. Just more opportunities to learn, connect and keep moving forward.</p>
            <GoldButton className="mt-6 w-full" onClick={() => setForm({ title: "Join the Daily Wins Community", tag: "Community waitlist", description: "The Daily Wins Community is opening soon. Join the waitlist and you'll be first in when the doors open.", submit: "Join the waitlist", success: "You're on the waitlist. I'll email you as soon as the community opens." })}>
              Join the Daily Wins Community
            </GoldButton>
            <p className="text-xs text-center text-primary/80 mt-3">Opening soon · Join the waitlist</p>
          </div>
        </div>
      </Section>

      {/* Private coaching */}
      <Section className="bg-[#0b0b0b] border-y border-white/5" id="private">
        <div className="max-w-3xl">
          <Eyebrow>Private Coaching</Eyebrow>
          <Title>Your life. Your priorities. Your Daily Wins.</Title>
          <Prose className="mt-6">
            <p>Sometimes, the most valuable investment you can make is in understanding yourself. We spend money improving our homes, our cars, our holidays and our careers. But how often do we invest meaningful time in understanding the person making all those decisions?</p>
            <p>Private coaching gives us the opportunity to do exactly that. A dedicated space to explore your life, your behaviours, your frustrations, your ambitions and the things you'd most like to change.</p>
            <p className="text-white font-semibold">Not generic advice. Not another list of things you should be doing. Personal guidance built around who you are, how you live and the future you want to create.</p>
          </Prose>
        </div>

        <div id="clarity" className="scroll-mt-24 mt-14">
          <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4 mb-7"><h3 className="font-display text-2xl md:text-3xl font-extrabold italic text-white tracking-tight">Start with clarity</h3></div>
          <div className="grid md:grid-cols-3 gap-5">{CLARITY.map((o) => <OfferCard key={o.name} o={o} onClick={() => enquire(o)} />)}</div>
        </div>

        <div className="mt-16">
          <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4 mb-7"><h3 className="font-display text-2xl md:text-3xl font-extrabold italic text-white tracking-tight">Build lasting change</h3></div>
          <div className="grid md:grid-cols-2 gap-5 pt-3">{LASTING.map((o) => <OfferCard key={o.name} o={o} onClick={() => enquire(o)} />)}</div>
        </div>

        <div className="mt-16">
          <div className="border-b border-white/10 pb-4"><h3 className="font-display text-2xl md:text-3xl font-extrabold italic text-white tracking-tight">Private coaching intensives</h3></div>
          <div className="max-w-3xl mt-5">
            <p className="text-xl font-semibold text-white">When was the last time you gave your own life your undivided attention?</p>
            <Prose className="mt-4">
              <p>We spend so much time responding to the demands of everyday life that we rarely create space to think properly about where we're heading.</p>
              <p>What do you really want? What's holding you back? Which habits are helping you? Which decisions are quietly working against you? And what would you change if you gave yourself the time to understand the answers?</p>
              <p>My private coaching intensives create that space. Dedicated time to reflect, challenge assumptions, explore opportunities and develop a practical plan for the future.</p>
            </Prose>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mt-8">{INTENSIVES.map((o) => <OfferCard key={o.name} o={o} onClick={() => enquire(o)} />)}</div>
          <p className="text-sm text-white/50 mt-5">In-person availability, venue, travel arrangements and any additional expenses are agreed before booking.</p>
        </div>
      </Section>

      {/* Practical plan */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Title>Not just a good conversation. A practical plan you can use.</Title>
            <Prose className="mt-6">
              <p>The value of Daily Wins coaching isn't measured by how inspired you feel when a session ends. It's measured by what you're able to take into your everyday life.</p>
              <p>Depending on the programme, we'll develop a personalised Daily Wins Blueprint that will provide:</p>
            </Prose>
          </div>
          <Card>
            <ul className="space-y-4">
              {[
                "A clearer understanding of your habits, behaviours and motivations",
                "Greater awareness of your Daily Drifts and Comfort Trades",
                "A personalised selection of Daily Wins that fit your circumstances",
                "Practical ways to make better decisions easier",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-lg"><span className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center shrink-0"><Check className="w-4 h-4" /></span><span className="text-white/85">{t}</span></li>
              ))}
            </ul>
            <p className="text-white/70 mt-6 leading-relaxed">You'll also learn how to review your progress, adapt when circumstances change and recover from setbacks without falling back into the cycle of starting over. The aim isn't to change who you are. It's to help you make more of your everyday decisions work in favour of the person you want to become.</p>
          </Card>
        </div>
      </Section>

      {/* Limited */}
      <Section narrow className="bg-[#0b0b0b] border-y border-white/5 text-center">
        <Title>A limited number of people. A meaningful amount of attention.</Title>
        <Prose className="mt-6">
          <p>Alongside private coaching, I dedicate considerable time to creating free educational content, developing courses, hosting events and supporting the Daily Wins community.</p>
          <p>To give every client the preparation, attention and commitment they deserve, I deliberately limit the number of people I work with privately. Before working together, we'll explore your goals, expectations and whether my approach is right for you.</p>
          <p className="text-white text-xl italic font-semibold">I'd rather help the right number of people properly than promise more than I can deliver.</p>
        </Prose>
        <GoldButton className="mt-8" onClick={() => enquire(CLARITY[0])} arrow>Request a Free Discovery Call</GoldButton>
      </Section>

      {/* FAQ */}
      <Section narrow>
        <Title>Frequently asked questions</Title>
        <Accordion type="single" collapsible className="mt-8">
          {FAQ.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="border-white/10">
              <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline hover:text-primary">{q}</AccordionTrigger>
              <AccordionContent className="text-white/75 text-base leading-relaxed">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* Where to start */}
      <Section className="bg-[#0b0b0b] border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto">
          <Title>Where would you like to start?</Title>
          <p className="text-white/70 mt-4 text-lg">Five ways in. Pick the one that suits you today.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
          {[
            ["Take the Free Daily Wins Test", "Discover your strengths, identify opportunities for improvement and find your recommended starting point.", "/test"],
            ["Attend a Free Daily Wins Event", "Experience the philosophy first-hand and discover small changes you can start making immediately.", "/#events"],
            ["Explore Daily Wins Courses", "Learn at your own pace with practical, affordable courses designed to make everyday improvements easier.", "https://bigdaddysbigtips.xperiencify.io/"],
            ["Join the Daily Wins Community", "£9.99/month. Exclusive content, live Q&As, monthly challenges and encouragement from people playing the same long game.", "#community"],
            ["Explore Personal Coaching & Mentoring", "Work with me to understand your behaviours, break unhelpful cycles and develop a personalised plan for your future.", "#private"],
          ].map(([h, t, to]) => {
            const cls = "group rounded-2xl border border-white/10 bg-[#121212] p-5 hover:border-primary/60 transition-colors flex flex-col";
            const body = (
              <>
                <p className="font-display font-bold text-white leading-snug tracking-tight">{h}</p>
                <p className="text-sm text-white/60 mt-2 flex-1 leading-relaxed">{t}</p>
                <ArrowRight className="w-5 h-5 text-primary mt-4 transition-transform group-hover:translate-x-1" />
              </>
            );
            return to.startsWith("http")
              ? <a key={h} href={to} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>
              : <Link key={h} to={to.startsWith("#") ? `/coaching${to}` : to} className={cls}>{body}</Link>;
          })}
        </div>
      </Section>

      <SiteFooter />

      {form && (
        <LeadForm open={!!form} onOpenChange={(o) => !o && setForm(null)} title={form.title} description={form.description}
          tag={form.tag} showMessage={form.message} submitLabel={form.submit} successText={form.success} />
      )}
    </div>
  );
};

export default Coaching;
