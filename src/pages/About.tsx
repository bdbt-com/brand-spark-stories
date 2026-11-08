import { GoldButton, OutlineButton, Section, Eyebrow, Prose } from "@/components/site/ui";
import SiteFooter from "@/components/site/SiteFooter";

const PORTRAIT = "/lovable-uploads/2f4d6184-a8de-43f0-a345-4ed910c90522.png";
const STRIP = [
  "/lovable-uploads/recording-setup-new.jpg",
  "/lovable-uploads/b362cf10-f3b4-4ab1-aeb3-30ab18058ace.png",
  "/lovable-uploads/7db6bd1f-c12f-45f2-a1d1-505f38c743a1.png",
  "/lovable-uploads/7208834d-dbba-4fc6-8da5-2f81f4e3796f.png",
];

const LESSONS = [
  "How to understand ourselves.",
  "How to manage our habits and emotions.",
  "How to make better financial decisions.",
  "How to look after our bodies.",
  "How to develop meaningful relationships.",
  "How to make everyday decisions that serve our future selves.",
];

const About = () => (
  <div className="min-h-screen">
    <Section className="pt-12 md:pt-20" id="story">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-24">
          <img src={PORTRAIT} alt="Ben Raven, founder of Daily Wins" className="w-full aspect-[4/5] object-cover object-top rounded-3xl border border-primary/25 shadow-strong" />
          <div className="mt-5 text-center lg:text-left">
            <p className="font-bold italic text-primary text-2xl">Ben Raven</p>
            <p className="text-white/60 text-sm">Founder of Daily Wins | Coach & Mentor</p>
          </div>
        </div>

        <div>
          <Eyebrow>About me</Eyebrow>
          <h1 className="italic font-bold text-primary text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight">These are the lessons nobody teaches us growing up.</h1>
          <Prose className="mt-8">
            <p className="text-white text-xl font-semibold">I'm Ben Raven, founder of Daily Wins.</p>
            <p>After more than 20 years working in financial services, business management and leadership, I've learned a great deal about decisions, behaviour and the importance of thinking long term.</p>
            <p>But some of my most valuable lessons have come from my own mistakes. From letting my weight climb to 115kg. From struggling financially despite a successful career. From repeatedly knowing what I should be doing, but finding reasons not to do it.</p>
            <p>Those experiences led me to question why so many of us struggle with behaviours we know aren't helping us, and I began to recognise that so many of the challenges we face in adulthood come down to life skills we were never properly taught.</p>
          </Prose>

          <ul className="mt-8 grid sm:grid-cols-2 gap-3">
            {LESSONS.map((l) => (
              <li key={l} className="rounded-xl border border-primary/20 bg-[#141414] px-4 py-3 text-white/85">{l}</li>
            ))}
          </ul>

          <Prose className="mt-8">
            <p className="text-white text-xl font-semibold">That's why I created Daily Wins.</p>
            <p>To share what I've learned, help people understand their own behaviours and make practical, sustainable improvements to their lives. I combine my professional experience, personal lessons and an ongoing interest in the science of human behaviour to help people understand themselves and make practical improvements to their lives.</p>
            <p>I don't promise to have all the answers. But I can help you ask better questions, understand your behaviours and find a more effective way forward.</p>
          </Prose>
          <p className="text-2xl md:text-3xl italic font-bold text-white mt-10 leading-snug border-l-2 border-primary pl-6">
            Because the long game isn't about becoming someone else. <span className="text-primary">It's about giving your future self a better life to live.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <GoldButton to="/coaching" arrow>Explore Coaching & Mentoring</GoldButton>
            <OutlineButton to="/test">Take the Free Daily Wins Test</OutlineButton>
          </div>
        </div>
      </div>
    </Section>

    <div className="grid grid-cols-2 md:grid-cols-4">
      {STRIP.map((src) => (
        <img key={src} src={src} alt="" loading="lazy" className="w-full aspect-square object-cover opacity-80 hover:opacity-100 transition-opacity" />
      ))}
    </div>

    <SiteFooter />
  </div>
);

export default About;
