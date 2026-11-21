import { GoldButton, OutlineButton, Section, Note } from "@/components/site/ui";
import SiteFooter from "@/components/site/SiteFooter";
import { StickyTestBar } from "@/components/site/fx";

const PORTRAIT = "/lovable-uploads/opt/2f4d6184-a8de-43f0-a345-4ed910c90522.webp";
const STRIP = [
  "/lovable-uploads/opt/recording-setup-new.webp",
  "/lovable-uploads/opt/b362cf10-f3b4-4ab1-aeb3-30ab18058ace.webp",
  "/lovable-uploads/opt/7db6bd1f-c12f-45f2-a1d1-505f38c743a1.webp",
  "/lovable-uploads/opt/7208834d-dbba-4fc6-8da5-2f81f4e3796f.webp",
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
    <StickyTestBar />
    <Section className="pt-12 md:pt-20" id="story">
      <Note kind="needed">Ben's revised About Me text replaces the copy on this page.</Note>
      <h1 className="font-display uppercase font-extrabold text-white leading-[0.9] tracking-[-0.01em] text-[3.1rem] sm:text-7xl lg:text-[6.5rem] max-w-[14ch]">These are the lessons nobody teaches us growing up.</h1>

      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start mt-12">
        <div className="lg:sticky lg:top-24">
          <img src={PORTRAIT} alt="Ben Raven, founder of Daily Wins" width={1100} height={1375} decoding="async" className="w-full aspect-[4/5] object-cover object-top rounded-lg" />
          <p className="font-display uppercase font-extrabold text-2xl leading-none mt-4">Ben Raven</p>
          <p className="text-ash text-sm mt-1">Founder of Daily Wins. Coach and mentor.</p>
        </div>

        <div>
          <div className="space-y-5 text-lg md:text-xl text-white/80 leading-relaxed max-w-[56ch]">
            <p className="text-white">I've spent more than 20 years in financial services, business management and leadership.</p>
            <p>My most valuable lessons came from my own mistakes. I let my weight climb to 115kg. I struggled financially despite a successful career. I kept knowing what I should do and finding reasons not to do it.</p>
            <p>Most of the challenges we face as adults come down to life skills we were never properly taught.</p>
          </div>

          <ul className="mt-10">
            {LESSONS.map((l) => (
              <li key={l} className="border-t border-white/15 py-4 font-display uppercase font-extrabold text-2xl md:text-3xl leading-none text-white">{l}</li>
            ))}
          </ul>

          <div className="mt-10 space-y-5 text-lg md:text-xl text-white/80 leading-relaxed max-w-[56ch]">
            <p className="text-white">That's why I created Daily Wins.</p>
            <p>I don't promise to have all the answers. I can help you ask better questions and find a more effective way forward.</p>
            <p className="text-gold font-semibold">The long game is about giving your future self a better life to live.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <GoldButton to="/coaching">Explore Coaching & Mentoring</GoldButton>
            <OutlineButton to="/test">Take the Free Daily Wins Test</OutlineButton>
          </div>
        </div>
      </div>
    </Section>

    <div className="grid grid-cols-2 md:grid-cols-4">
      {STRIP.map((src) => (
        <img key={src} src={src} alt="" width={900} height={900} loading="lazy" decoding="async" className="w-full aspect-square object-cover" />
      ))}
    </div>

    <SiteFooter />
  </div>
);

export default About;
