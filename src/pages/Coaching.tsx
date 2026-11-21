import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GoldButton, OutlineButton, Section, Title, Lead, Card, Note, SHOW_NOTES } from "@/components/site/ui";
import { StickyTestBar } from "@/components/site/fx";
import LeadForm from "@/components/site/LeadForm";
import SiteFooter from "@/components/site/SiteFooter";
import { cn } from "@/lib/utils";

const HERO_IMAGE = "/lovable-uploads/opt/5e8aba04-f6cc-44a2-9bcc-eaf2424e3976.webp";

// Prices and formats are Ben's working drafts. Edit here.
interface Offer { name: string; price: string; meta: string; text: string; cta: string; flagship?: boolean; bullets?: string[]; after?: string }

const CLARITY: Offer[] = [
  { name: "Free Discovery Call", price: "Free", meta: "20 minutes, online", text: "We talk through what you'd like to change and whether Daily Wins coaching is the right fit. There's no obligation.", cta: "Request a call" },
  { name: "Individual Coaching Session", price: "£150", meta: "60 minutes, online or in person", text: "One challenge and one focused conversation. You leave with practical next steps.", cta: "Enquire" },
  { name: "Daily Wins Deep Dive", price: "£195", meta: "90 minutes, online or in person", text: "A closer look at your life and your biggest opportunities. Includes a personalised 30-day Daily Wins Starter Blueprint.", cta: "Enquire" },
];

const LASTING: Offer[] = [
  { name: "Four-Session Daily Wins Journey", price: "£525", meta: "4 × 60-minute sessions", flagship: true, text: "Understand your habits and the behaviours holding you back. Includes a personalised 90-day Daily Wins Blueprint.", cta: "Enquire" },
  { name: "Eight-Session Transformation Journey", price: "£995", meta: "8 × 60-minute sessions", text: "Work across several connected areas of your life. Includes a comprehensive six-month Blueprint.", cta: "Enquire" },
];

const INTENSIVES: Offer[] = [
  { name: "Half-Day Life Review", price: "£495", meta: "3.5 hours", text: "A focused review of your circumstances and priorities, with a personalised 30-day plan.", cta: "Enquire" },
  { name: "Full-Day Life Reset", price: "£895", meta: "7 hours", text: "Your habits, goals, Daily Drifts and Comfort Trades in one day. Ends with a personalised 90-day Transformation Blueprint.", cta: "Enquire" },
  { name: "Three-Day Daily Wins Experience", price: "£2,495", meta: "Three full days", text: "Three days on three connected parts of your life.", bullets: ["The Vessel: understanding and looking after yourself", "The Ripples: the influence your decisions have on others", "The Journey: where you're heading and the life you want to create"], after: "Includes a long-term personal Blueprint and a follow-up coaching call.", cta: "Enquire" },
];

const FOR_YOU = [
  "You're doing well at work but neglecting your health.",
  "You're financially comfortable but constantly stressed.",
  "You look after everyone else and have forgotten yourself.",
  "You're tired of repeating habits you know aren't helping.",
  "Life is good, and you know it could be better.",
];

const FREE = [
  { title: "The Free Daily Wins Test", text: "28 questions across your life. You get your strengths and a recommended starting point.", cta: "Take the test", to: "/test" },
  { title: "Free Daily Wins Events", text: "Online or in person. You leave with practical ideas you can use straight away.", cta: "See free events", to: "/#events" },
  { title: "Free videos & library", text: "Practical Daily Wins for health, money, relationships and time.", cta: "Explore the library", to: "/tips" },
];

const MEMBERSHIP = [
  ["Live Q&As with Ben", "Ask questions and get practical guidance."],
  ["Members-only content", "Go deeper than my public videos."],
  ["Monthly Daily Wins challenges", "Simple challenges that turn common sense into common action."],
  ["A community that understands the long game", "Share progress with people working towards the same thing."],
];

const BLUEPRINT = [
  "A clearer understanding of your habits, behaviours and motivations",
  "Greater awareness of your Daily Drifts and Comfort Trades",
  "A personalised selection of Daily Wins that fit your circumstances",
  "Practical ways to make better decisions easier",
];

const FAQ = [
  ["How do I know which option is right for me?", "Start with the free Daily Wins Test or book a discovery call. We'll work out whether coaching, the community, a course or a free resource is the best place to begin."],
  ["Do I need to have a specific problem to work with you?", "No. Some people bring one challenge. Others want to improve several parts of their lives or understand themselves better."],
  ["What's the difference between the Daily Wins Community and private coaching?", "The community is group learning, with members-only content, challenges and Q&As. Private coaching is one-to-one time built around your circumstances and goals."],
  ["Can I join the community without booking coaching?", "Yes. The community is a standalone membership."],
  ["Can I book a single coaching session?", "Yes. Individual sessions and Deep Dives are available subject to availability."],
  ["What if I've tried changing my habits before and failed?", "Then we have useful experience to learn from. We'll look at why earlier attempts were hard to sustain and what to do differently."],
  ["Is Daily Wins coaching therapy or regulated financial advice?", "No. Daily Wins covers personal development, education, behaviour and practical life skills. It doesn't replace professional medical care, mental health treatment or regulated financial advice."],
];

const START = [
  ["Take the Free Daily Wins Test", "/test"],
  ["Attend a Free Daily Wins Event", "/#events"],
  ["Explore Daily Wins Courses", "https://bigdaddysbigtips.xperiencify.io/"],
  ["Join the Daily Wins Community", "#community"],
  ["Explore Personal Coaching & Mentoring", "#private"],
] as const;

/** One offer as a price-list row: name and details on the left, price and action on the right. */
const OfferRow = ({ o, onClick }: { o: Offer; onClick: () => void }) => (
  <li className={cn("grid md:grid-cols-[1fr_auto] gap-x-10 gap-y-4 border-t py-7", o.flagship ? "border-gold" : "border-white/15")}>
    <div>
      {o.flagship && <p className="text-sm font-semibold text-gold mb-2">Flagship programme</p>}
      <h4 className="font-display uppercase font-extrabold text-3xl md:text-4xl leading-none text-white">{o.name}</h4>
      <p className="text-sm text-ash mt-2">{o.meta}</p>
      <p className="text-white/75 mt-3 leading-relaxed max-w-[58ch]">{o.text}</p>
      {o.bullets && (
        <ul className="mt-3 space-y-1.5">
          {o.bullets.map((b) => { const [h, r] = b.split(": "); return (
            <li key={b} className="flex gap-2 text-white/75"><Check className="w-4 h-4 text-gold mt-1 shrink-0" /><span><span className="text-white font-semibold">{h}</span>: {r}</span></li>
          ); })}
        </ul>
      )}
      {o.after && <p className="text-white/75 mt-3 leading-relaxed max-w-[58ch]">{o.after}</p>}
    </div>
    <div className="flex md:flex-col items-center md:items-end justify-between gap-4">
      <p className="font-display font-extrabold text-gold text-5xl leading-none tabular-nums">{o.price}</p>
      {o.price === "Free" || o.flagship
        ? <GoldButton onClick={onClick} aria-label={`${o.cta}: ${o.name}`}>{o.cta}</GoldButton>
        : <OutlineButton onClick={onClick} aria-label={`${o.cta}: ${o.name}`}>{o.cta}</OutlineButton>}
    </div>
  </li>
);

const Group = ({ id, title, lead, offers, onEnquire }: { id?: string; title: string; lead?: string; offers: Offer[]; onEnquire: (o: Offer) => void }) => (
  <div id={id} className="scroll-mt-24 mt-16">
    <h3 className="font-display uppercase font-extrabold text-2xl text-ash leading-none">{title}</h3>
    {lead && <p className="text-lg text-white mt-3 max-w-[52ch]">{lead}</p>}
    <ul className="mt-5">{offers.map((o) => <OfferRow key={o.name} o={o} onClick={() => onEnquire(o)} />)}</ul>
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
      <StickyTestBar />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={HERO_IMAGE} alt="Ben Raven at home" width={1600} height={1067} fetchPriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover object-[70%_30%] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-20 md:py-28">
          <h1 className="font-display uppercase font-extrabold leading-[0.9] tracking-[-0.01em] text-[3.1rem] sm:text-7xl lg:text-[6.5rem] max-w-[20ch]">
            <span className="block text-white">Understand yourself. Change your behaviours.</span>
            <span className="block text-gold">Win the long game.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-[54ch] leading-relaxed">Knowing what to do, understanding why you don't do it and learning how to make it happen are different things. Coaching works on all of them, starting with what matters most to you.</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <GoldButton onClick={() => enquire(CLARITY[0])}>Request a Free Discovery Call</GoldButton>
            <OutlineButton to="/test" className="bg-black/40">Take the Free Daily Wins Test</OutlineButton>
          </div>
          <Note kind="needed">A 30 to 60 second intro video of Ben would go in this hero.</Note>
          <Note kind="needed">Booking calendar: with a Calendly (or similar) account, this button can open a calendar to pick a slot instead of a form.</Note>
        </div>
      </section>

      {/* Who it's for */}
      <Section>
        <Title>Does one of these sound like you?</Title>
        <ul className="mt-10 grid md:grid-cols-2 gap-x-10">
          {FOR_YOU.map((t) => (
            <li key={t} className="border-t border-white/15 py-5 text-lg md:text-xl text-white/85">{t}</li>
          ))}
        </ul>
        <p className="mt-6 text-lg text-white/75 max-w-[58ch]">Coaching is for people who want to understand themselves better and make more deliberate choices.</p>
      </Section>

      {/* Free */}
      <Section className="bg-white/[0.03] border-y border-white/5">
        <Title className="max-w-[20ch]">Your first Daily Win doesn't have to cost you anything.</Title>
        <Lead>The life skills that make the biggest difference should be open to everyone.</Lead>
        <div className="grid md:grid-cols-3 gap-x-10 mt-10">
          {FREE.map((r, i) => (
            <div key={r.title} className="border-t border-white/15 py-6 flex flex-col">
              <h3 className="font-display uppercase font-extrabold text-2xl leading-none text-white">{r.title}</h3>
              <p className="text-white/70 mt-3 flex-1 leading-relaxed">{r.text}</p>
              {i === 0 ? <GoldButton to={r.to} className="mt-5 self-start">{r.cta}</GoldButton> : <OutlineButton to={r.to} className="mt-5 self-start">{r.cta}</OutlineButton>}
            </div>
          ))}
        </div>
      </Section>

      {/* Community */}
      <Section id="community">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <Title>You don't have to play the long game alone.</Title>
            <Lead>Motivation comes and goes. The Daily Wins Community is somewhere to keep showing up, with people working on lasting improvements.</Lead>
          </div>
          <Card>
            <div className="flex items-baseline gap-2"><span className="font-display font-extrabold text-gold text-7xl leading-none">£9.99</span><span className="text-ash">per month</span></div>
            <Note>Draft price and feature list. Not final.</Note>
            <ul className="mt-6">
              {MEMBERSHIP.map(([h, t]) => (
                <li key={h} className="border-t border-white/10 py-4"><p className="font-semibold text-white">{h}</p><p className="text-sm text-white/65 mt-1 leading-relaxed">{t}</p></li>
              ))}
            </ul>
            <GoldButton className="mt-4 w-full" onClick={() => setForm({ title: "Join the Daily Wins Community", tag: "Community waitlist", description: "The Daily Wins Community is opening soon. Join the waitlist and you'll be first in when the doors open.", submit: "Join the waitlist", success: "You're on the waitlist. I'll email you as soon as the community opens." })}>
              Join the Daily Wins Community
            </GoldButton>
            <p className="text-sm text-ash mt-3">Opening soon. Join the waitlist.</p>
            <Note kind="needed">Members area and payments are not built yet. This button joins a waiting list.</Note>
          </Card>
        </div>
      </Section>

      {/* Private coaching */}
      <Section className="bg-white/[0.03] border-y border-white/5" id="private">
        <Title>Your life. Your priorities. Your Daily Wins.</Title>
        <Lead>We invest in our homes and our careers. Private coaching is time invested in understanding the person making all those decisions.</Lead>
        <Note>Every price in this section is Ben's draft figure. Not final.</Note>

        <Group id="clarity" title="Start with clarity" offers={CLARITY} onEnquire={enquire} />
        <Group title="Build lasting change" offers={LASTING} onEnquire={enquire} />
        <Group title="Private coaching intensives" lead="When was the last time you gave your own life your undivided attention?" offers={INTENSIVES} onEnquire={enquire} />
        <p className="text-sm text-ash mt-2 border-t border-white/15 pt-5">In-person availability, venue, travel arrangements and any additional expenses are agreed before booking.</p>
      </Section>

      {/* Practical plan */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <Title>A practical plan you can use.</Title>
            <Lead>Coaching is measured by what you take into your everyday life. Depending on the programme, you get a personalised Daily Wins Blueprint.</Lead>
          </div>
          <ul>
            {BLUEPRINT.map((t) => (
              <li key={t} className="flex gap-4 border-t border-white/15 py-5 text-lg"><Check className="w-5 h-5 text-gold mt-1 shrink-0" /><span className="text-white/85">{t}</span></li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Limited */}
      <Section className="bg-white/[0.03] border-y border-white/5">
        <Title className="max-w-[20ch]">A limited number of people. A meaningful amount of attention.</Title>
        <Lead>I limit how many people I work with privately, so every client gets proper preparation and attention. We check the fit before we start.</Lead>
        <GoldButton className="mt-8" onClick={() => enquire(CLARITY[0])}>Request a Free Discovery Call</GoldButton>
      </Section>

      {/* Client proof: preview-only placeholder until Ben supplies real quotes */}
      {SHOW_NOTES && (
        <Section>
          <Note kind="needed">Real client quotes or YouTube comments from Ben. This section stays hidden on the live site until they are added.</Note>
          <div className="grid md:grid-cols-3 gap-5 mt-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-lg border-2 border-dashed border-white/20 p-6 min-h-40 flex flex-col justify-between">
                <p className="text-white/45">Client quote {n} goes here.</p>
                <p className="text-sm text-white/35 mt-6">Name, and what they worked on</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section>
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
          <Title>Frequently asked questions</Title>
          <Accordion type="single" collapsible>
            {FAQ.map(([q, a]) => (
              <AccordionItem key={q} value={q} className="border-white/15">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:no-underline hover:text-gold">{q}</AccordionTrigger>
                <AccordionContent className="text-white/75 text-base leading-relaxed">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Where to start */}
      <Section className="bg-white/[0.03] border-t border-white/5">
        <Title>Where would you like to start?</Title>
        <ul className="mt-10">
          {START.map(([h, to]) => {
            const cls = "group flex items-center justify-between gap-6 border-t border-white/15 py-5 font-display uppercase font-extrabold text-2xl md:text-4xl leading-none text-white hover:text-gold transition-colors focus-visible:outline-none focus-visible:text-gold";
            const mark = <span aria-hidden className="h-px w-10 md:w-20 bg-white/30 group-hover:bg-gold group-hover:w-16 md:group-hover:w-32 transition-all" />;
            return (
              <li key={h}>
                {to.startsWith("http")
                  ? <a href={to} target="_blank" rel="noopener noreferrer" className={cls}><span>{h}</span>{mark}</a>
                  : <Link to={to.startsWith("#") ? `/coaching${to}` : to} className={cls}><span>{h}</span>{mark}</Link>}
              </li>
            );
          })}
        </ul>
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
