import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Clock, Heart, Award, Users2, Quote, BookOpen, Target, Star, TrendingUp, Zap, AlertTriangle, CheckCircle, ArrowRight, ArrowDown, BarChart3, Brain, Lightbulb, ChevronDown, User } from "lucide-react";
import { Link } from "react-router-dom";
import ChevronRipple from "@/components/ChevronRipple";
import { useState } from "react";
const smoothScrollToNext = (currentElement: HTMLElement, nextId: string) => {
  // First, scroll current element to center
  const viewportHeight = window.innerHeight;
  const elementRect = currentElement.getBoundingClientRect();
  const elementCenter = elementRect.top + elementRect.height / 2;
  const targetScroll = window.scrollY + elementCenter - viewportHeight / 2;

  // Smooth scroll to center current element
  window.scrollTo({
    top: targetScroll,
    behavior: 'smooth'
  });

  // After a brief pause, scroll to next element
  setTimeout(() => {
    const nextElement = document.getElementById(nextId);
    if (nextElement) {
      const nextRect = nextElement.getBoundingClientRect();
      const nextCenter = nextRect.top + nextRect.height / 2;
      const nextTargetScroll = window.scrollY + nextCenter - viewportHeight / 2;
      window.scrollTo({
        top: nextTargetScroll,
        behavior: 'smooth'
      });
    }
  }, 800);
};

const autoProgressThroughSentences = () => {
  const sentences = ['problem-1', 'problem-2', 'problem-3', 'problem-4'];
  let currentIndex = 0;

  const scrollToSentence = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const viewportHeight = window.innerHeight;
      const elementRect = element.getBoundingClientRect();
      const elementCenter = elementRect.top + elementRect.height / 2;
      const targetScroll = window.scrollY + elementCenter - viewportHeight / 2;
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const progressNext = () => {
    if (currentIndex < sentences.length) {
      scrollToSentence(sentences[currentIndex]);
      currentIndex++;
      
      if (currentIndex < sentences.length) {
        setTimeout(progressNext, 3500);
      } else {
        // After all sentences, scroll to story section
        setTimeout(() => {
          document.getElementById('story')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 3500);
      }
    }
  };

  progressNext();
};
const About = () => {
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  return <div className="min-h-screen">
      {/* The Problem Section */}
      <section id="problem" className="py-32 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-32">
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-primary tracking-tight">
              The Problem
            </h2>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              We live in a world obsessed with doing more
            </p>
          </div>
          <div className="my-64 flex justify-center" id="arrow-1">
            <ChevronRipple to="/about#problem-1" label="Why change fails?" size="sm" showLabel={false} variant="minimal" onClick={() => {
              autoProgressThroughSentences();
            }} />
          </div>
          
          <div className="">
            {/* First statement - Center aligned */}
            <div id="problem-1" className="text-center max-w-4xl mx-auto mt-32">
              <h3 className="text-4xl lg:text-5xl font-bold leading-tight text-primary mb-8">
                Why do traditional approaches fail to create lasting change?
              </h3>
              <p className="text-xl text-muted-foreground font-light">
                More workouts. More goals. More hustle. Yet most people feel stuck, drained, and uncertain.
              </p>
            </div>
            <div className="my-64 flex justify-center" id="arrow-2">
              <ChevronRipple to="/about#problem-2" label="One tip at a time?" size="sm" showLabel={false} variant="minimal" onClick={() => {
              const currentArrow = document.getElementById('arrow-2');
              if (currentArrow) smoothScrollToNext(currentArrow, 'problem-2');
            }} />
            </div>

            {/* Second statement - Center aligned */}
            <div id="problem-2" className="text-center max-w-4xl mx-auto mt-32">
              <h3 className="text-4xl lg:text-5xl font-bold leading-tight text-primary mb-8">
                We're told to fix our lives one isolated tip at a time.
              </h3>
              <p className="text-xl text-muted-foreground font-light">
                A budgeting app here. A gym membership there. A meditation streak that lasts three days.
              </p>
            </div>
            <div className="my-64 flex justify-center" id="arrow-3">
              <ChevronRipple to="/about#problem-3" label="Why tips fail" size="sm" showLabel={false} variant="minimal" onClick={() => {
              const currentArrow = document.getElementById('arrow-3');
              if (currentArrow) smoothScrollToNext(currentArrow, 'problem-3');
            }} />
            </div>

            {/* Third statement - Center aligned with emphasis */}
            <div id="problem-3" className="text-center max-w-4xl mx-auto">
              <h3 className="text-4xl lg:text-5xl font-bold leading-tight text-primary mb-8">
                But nothing sticks.
              </h3>
              <p className="text-xl text-muted-foreground font-light mb-4">
                Not because people are lazy. Not because they're broken.
              </p>
              <p className="text-xl text-foreground font-semibold">
                But because the old model is broken.
              </p>
            </div>
            <div className="my-64 flex justify-center" id="arrow-4">
              <ChevronRipple to="/about#problem-4" label="Modern life pressures" size="sm" showLabel={false} variant="minimal" onClick={() => {
              const currentArrow = document.getElementById('arrow-4');
              if (currentArrow) smoothScrollToNext(currentArrow, 'problem-4');
            }} />
            </div>

            {/* Fourth statement - Center aligned */}
            <div id="problem-4" className="text-center max-w-4xl mx-auto mt-32">
              <h3 className="text-4xl lg:text-5xl font-bold leading-tight text-primary mb-8">
                Meanwhile, modern life pushes us further behind.
              </h3>
              <p className="text-xl text-muted-foreground font-light">
                Sit more. Scroll more. Consume more. With every new demand, we feel more overwhelmed.
              </p>
            </div>
            {/* Down Arrow to next section */}
            <div className="my-64 flex justify-center">
              <Button variant="ghost" size="icon" className="rounded-full w-12 h-12 bg-primary/10 hover:bg-primary/20 text-primary shadow-soft" onClick={() => document.getElementById('story')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })} aria-label="Scroll to Read My Story">
                <ArrowDown className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section - Owner Story */}
      <section id="story" className="py-20 lg:py-32 bg-gradient-to-br from-background via-muted/30 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-primary">The Story Behind</span>
                  <span className="block text-[hsl(35_45%_75%)]">The System</span>
                </h1>
              </div>
              <div className="space-y-6">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  How one dad turned daily overwhelm into a life-changing ripple effect.
                </p>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  From financial services to single parenting, discover the real story behind 
                  Big Daddy's Big Tips and why I'm sharing it with you.
                </p>
              </div>
              <div className="flex justify-center mt-12">
                <Collapsible open={isStoryOpen} onOpenChange={setIsStoryOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="lg" className="relative hover:scale-105 transition-transform text-lg h-16 px-12 py-6 bg-background/95 backdrop-blur-sm border-primary/30 rounded-xl" onClick={() => {
                      setIsStoryOpen(!isStoryOpen);
                      if (!isStoryOpen) {
                        // Wait for content to expand, then scroll to show the top of the story content
                        setTimeout(() => {
                          const storyContent = document.querySelector('[data-state="open"] .max-w-7xl');
                          if (storyContent) {
                            storyContent.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start'
                            });
                          }
                        }, 200);
                      }
                    }}>
                      <BookOpen className="w-6 h-6 mr-3" />
                      Read My Story
                      <ChevronDown className={`w-5 h-5 ml-3 transition-transform ${isStoryOpen ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                </Collapsible>
              </div>
            </div>
            <div className="relative animate-fade-in" style={{
            animationDelay: "200ms"
          }}>
              <div className="relative">
                <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Big Daddy - BDBT Founder" className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-strong border-4 border-white/20" />
              </div>
            </div>
          </div>
          
          {/* Collapsible Story Content */}
          <Collapsible open={isStoryOpen} onOpenChange={setIsStoryOpen}>
            <CollapsibleContent className="mt-16">
              <div className="max-w-7xl mx-auto relative">
                
                 {/* Pinned Photos - Left Side - ODD POSITIONS (1,3,5,7,9) */}
                 <div className="hidden lg:block absolute left-0 top-0 w-[400px] space-y-4 z-10" style={{
                left: '-120px'
              }}>
                   {/* Photo 1 - Position 1/10 - Office/Workspace */}
                   <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform rotate-3" style={{
                  animationDelay: "500ms",
                  marginTop: "0px"
                }}>
                     <img src="/lovable-uploads/8d06c526-bd08-42b7-9a4e-09be508119c7.png" alt="BDBT journey image 2 - Podcast recording setup" className="w-full h-full object-cover rounded-xl" />
                   </div>
                   
                   {/* Photo 3 - Position 3/10 - Dog & Family Life */}
                   <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform -rotate-2" style={{
                  animationDelay: "1200ms",
                  marginTop: "1350px"
                }}>
                     <img src="/lovable-uploads/4fd0818e-20c3-4941-9c54-6915db50a7c0.png" alt="BDBT journey image 4 - Meditation with mirror" className="w-full h-full object-cover rounded-xl" />
                   </div>
                   
                   {/* Photo 5 - Position 5/10 - Success & Wealth */}
                   <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform rotate-1" style={{
                  animationDelay: "1900ms",
                  marginTop: "1350px"
                }}>
                     <img src="/lovable-uploads/33ba01bc-045c-4c44-ac70-c61c05093bdc.png" alt="BDBT journey image 6 - Silhouette by pool" className="w-full h-full object-cover rounded-xl" />
                   </div>
                   
                   {/* Photo 7 - Position 7/10 - Coastal Business Life */}
                   <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform -rotate-1" style={{
                  animationDelay: "2600ms",
                  marginTop: "1350px"
                }}>
                     <img src="/lovable-uploads/2f4d6184-a8de-43f0-a345-4ed910c90522.png" alt="BDBT journey image 8 - Man on phone in modern setting" className="w-full h-full object-cover rounded-xl" />
                   </div>
                   
                    {/* Photo 9 - Position 9/10 - Man in shoe store */}
                    <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform rotate-2" style={{
                   animationDelay: "3200ms",
                   marginTop: "1350px"
                 }}>
                     <img src="/lovable-uploads/8db636d1-94ff-432a-a4b1-6ca278173f2f.png" alt="BDBT journey image 10 - Man in shoe store" className="w-full h-full object-cover rounded-xl" />
                   </div>
                   
                  </div>

                 {/* Pinned Photos - Right Side - EVEN POSITIONS (2,4,6,8,10) */}
                 <div className="hidden lg:block absolute right-0 top-0 w-[400px] space-y-4 z-10" style={{
                right: '-120px'
              }}>
                   {/* Photo 2 - Position 2/10 - The Journey Upward */}
                   <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform -rotate-1" style={{
                  animationDelay: "800ms",
                  marginTop: "675px"
                }}>
                     <img src="/lovable-uploads/b362cf10-f3b4-4ab1-aeb3-30ab18058ace.png" alt="BDBT journey image 3 - Man with dog outdoors" className="w-full h-full object-cover rounded-xl" />
                   </div>
                   
                   {/* Photo 4 - Position 4/10 - Freedom & Success */}
                   <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform rotate-2" style={{
                  animationDelay: "1500ms",
                  marginTop: "1350px"
                }}>
                     <img src="/lovable-uploads/661d98ce-15f1-4542-b8c0-bab549b78a55.png" alt="BDBT journey image 5 - Man in bathroom mirror" className="w-full h-full object-cover rounded-xl" />
                   </div>
                   
                   {/* Photo 6 - Position 6/10 - Lifestyle Achievement */}
                   <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform -rotate-2" style={{
                  animationDelay: "2200ms",
                  marginTop: "1350px"
                }}>
                     <img src="/lovable-uploads/2678016c-a3fa-4e29-bf3d-3ebe92201186.png" alt="BDBT journey image 7 - Person exercising outdoors" className="w-full h-full object-cover rounded-xl" />
                   </div>
                   
                   {/* Photo 8 - Position 8/10 - Original Sunset Transformation */}
                   <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform rotate-1" style={{
                  animationDelay: "2900ms",
                  marginTop: "1350px"
                }}>
                     <img src="/lovable-uploads/7db6bd1f-c12f-45f2-a1d1-505f38c743a1.png" alt="BDBT journey image 9 - Man outdoors smiling" className="w-full h-full object-cover rounded-xl" />
                   </div>
                   
                    {/* Photo 10 - Position 10/10 - Man in home theater */}
                    <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform -rotate-1" style={{
                   animationDelay: "3500ms",
                   marginTop: "1350px"
                 }}>
                     <img src="/lovable-uploads/a886c4a9-0d09-442e-8348-25bd795ad7d0.png" alt="BDBT journey image 11 - Man in home theater" className="w-full h-full object-cover rounded-xl" />
                   </div>
                   
                  </div>

                {/* Main Story Content */}
                <div className="max-w-4xl mx-auto lg:px-32">
                <Card className="bg-background/95 backdrop-blur-sm border-primary/20 shadow-strong">
                  <CardContent className="p-8 lg:p-12">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                      
                      {/* The Backstory */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Backstory</h2>
                        <p className="leading-relaxed mb-4">
                          I've spent the best part of two decades working in financial services, helping people with mortgages, pensions, and investments. From the outside, it looked like I had things sorted. But behind the scenes, I was starting to see a pattern, not just in our clients' lives, but in my own.
                        </p>
                        <p className="leading-relaxed mb-4">
                          People were chasing success in one area. Their money, their health, their career, while letting everything else slide. And I was doing the same. I was working in finance, but I wasn't financially free. I was helping others plan their futures, while quietly losing grip on my own. I wasn't living badly but I wasn't living well.
                        </p>
                        <p className="leading-relaxed mb-4">
                          Then came the separation. My partner and I separated, and I became a co-parent to our two incredible children who we look after 50:50. That was the moment everything changed.
                        </p>
                        <p className="leading-relaxed mb-4">
                          Now I had two jobs: raising two young kids half the week as a single dad, and running a company the other half as a managing director. And through all of it, I was trying to stay true to the kind of life I said I believed in. A life built on health, wealth, and happiness. The pressure was real and I knew if I didn't find a better system, one that worked with real life, not just in theory, then I would burn out.
                        </p>
                        <p className="leading-relaxed mb-4">
                          That's when Big Daddy's Big Tips was born. It's what my children call me. They look up to me. And I realised I didn't just want to survive this phase of life. I wanted to build something that would inspire them. Something they could be proud of. A life they could look at and say, "my dad did it differently."
                        </p>
                        <p className="leading-relaxed">
                          And truthfully, part of what drives me is seeing what happens when people don't do things differently. I've seen members of my own family drift further from their best lives, not from laziness or lack of love, but from tiny daily habits and choices. And despite my best efforts to help, sometimes family dynamics mean they just don't hear it from me (the youngest member of the family). But they do listen to people they see as trusted experts. So I made it my mission to become one, not just for my family, but for yours too. Because if I can be the voice that helps your loved ones change, in the way I wish mine could, then all of this matters even more.
                        </p>
                      </div>

                      {/* The Desire */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Desire</h2>
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-foreground mb-3">External desire:</h3>
                          <p className="leading-relaxed">
                            I wanted to create more freedom and more energy. Not just for myself, but for people like me. Single parents. Tired professionals. Anyone juggling multiple roles and trying to keep it together without burning out. I didn't want sympathy. I just knew there were millions of people in the same boat and I believed I could build something that would actually help. A system rooted in daily action, real-life demands, and practical wins. Something that didn't just motivate, but mattered.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-3">Internal desire:</h3>
                          <p className="leading-relaxed">
                            I wanted to be the kind of man my kids could look up to, not just Big Daddy in name, but in presence, in patience, in purpose. A role model not because I had all the answers, but because I built a better system and stuck with it. I wanted to live a life I could be proud of. One that reflected my values and made a real difference, both at home and in the world. And turn my own transformation into a path others could walk too.
                          </p>
                        </div>
                      </div>

                      {/* What I had tried in the past */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">What I Had Tried in The Past</h2>
                        <p className="leading-relaxed mb-4">
                          I tried a lot of different things including fitness routines, budgeting apps, morning routines, self-help books, mindfulness challenges. And while each one had value, they all focused on solving one part of the problem.
                        </p>
                        <p className="leading-relaxed mb-4">
                          When I focused on money, I let my health slide. When I focused on exercise, my sleep suffered. When I tried to do it all, it became overwhelming. Every improvement in one area created a new imbalance somewhere else.
                        </p>
                        <p className="leading-relaxed">
                          And the frustrating part? All the information was already out there. In books, podcasts, TED talks and YouTube videos. But no one was showing how to actually use it all in a way that worked across your whole life. The knowledge existed. The method didn't.
                        </p>
                      </div>

                      {/* The Calling */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Calling</h2>
                        <p className="leading-relaxed mb-4">
                          That gap between all the information and real-life integration became the thing I couldn't ignore.
                        </p>
                        <p className="leading-relaxed mb-4">
                          I didn't want to add more noise. I wanted to create a system that helped people apply what they already knew, in a way that created sustainable, stacked wins across health, wealth, and happiness, without overhauling or overwhelming their life.
                        </p>
                        <p className="leading-relaxed">
                          I started building what I couldn't find; a way to link everyday habits together so that doing one thing better improved everything else too. That's what became my Habit-Driven Lifestyle Design. A way of changing very little, but multiplying the positive impact of your daily decisions.
                        </p>
                      </div>

                      {/* The villain keeping people from success */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Villain Keeping People From Success</h2>
                        <p className="leading-relaxed mb-4">
                          The villain isn't just one thing. It's two forces working against you every single day.
                        </p>
                        <p className="leading-relaxed mb-4">
                          First, there's the fragmented advice culture. You're told to tackle one crisis at a time. To fix your money, fix your fitness, fix your mindset, as if those parts aren't connected. But they are. And when you focus too much on one, you often make things worse in the others. It keeps you stuck in a loop of isolated fixes that never fix the whole.
                        </p>
                        <p className="leading-relaxed mb-4">
                          Then there's modern life itself. You're being targeted and pressured every day to make decisions that pull you away from the life you want:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                          <li>Retailers push quick dopamine hits and poor purchases.</li>
                          <li>Friends unknowingly peer-pressure you into drinking, overspending, or wasting time.</li>
                          <li>Your phone, your sofa, and your surroundings make it easier to drift than to grow.</li>
                        </ul>
                        <p className="leading-relaxed">
                          These forces combine to keep you tired, distracted, and off course, and worst of all, they make it feel normal.
                        </p>
                      </div>

                      {/* What happens if you don't succeed */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">What Happens if You Don't Succeed on This Journey</h2>
                        <p className="leading-relaxed mb-4">
                          You stay in survival mode. You keep trying to "balance" everything. Your work, kids, money, health, happiness, and you burn out in the process.
                        </p>
                        <p className="leading-relaxed mb-4">
                          You waste years stuck in the same loops, constantly reacting, constantly tired, constantly feeling like life is slipping through your fingers.
                        </p>
                        <p className="leading-relaxed mb-4">
                          You end up surviving life rather than living it.
                        </p>
                        <p className="leading-relaxed mb-4">
                          The combination of fragmented advice and daily societal pressure makes you believe that joy, rest, connection, and purpose are luxuries. Things you have to "earn" once everything else is done. But the truth is, that "everything else" never ends.
                        </p>
                        <p className="leading-relaxed">
                          And if you never break that cycle? One day, you'll regret it. Your future self is screaming at you to not waste this one and only life you get.
                        </p>
                      </div>

                      {/* The Guide */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Guide</h2>
                        <p className="leading-relaxed mb-4">
                          The guide wasn't one person. It was a mix of mentors I never met and moments I couldn't ignore.
                        </p>
                        <p className="leading-relaxed mb-4">
                          I learned from authors, podcasters, neuroscientists and coaches. I soaked up ideas from every corner of the self-improvement world. Habits, behaviour change, mindset, productivity, finance, fitness, psychology. The information was out there, and I became obsessed with figuring out how to actually apply it in real life.
                        </p>
                        <p className="leading-relaxed">
                          But the real education came from living it. As a dad, a single parent, a business owner, a friend, a man trying to do better. I started spotting patterns between the different domains. I could see that most people weren't missing knowledge, they were just missing a system.
                        </p>
                      </div>

                      {/* The Epiphany */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Epiphany</h2>
                        <p className="leading-relaxed mb-4">
                          I'd started small. Five minutes of movement in the morning to shake off the fog. Five minutes at night to reflect, reset, and prepare for the next day.
                        </p>
                        <p className="leading-relaxed mb-4">
                          And one evening, after a full day of work, parenting, and life I noticed the house was calm. The kids were settled. I wasn't overwhelmed. I wasn't rushing. I felt good.
                        </p>
                        <p className="leading-relaxed mb-4">
                          That moment hit me; this system actually works.
                        </p>
                        <p className="leading-relaxed mb-4">
                          It didn't just help me get more done. It helped me be more present. A better dad. A better human. I realised I didn't need more advice, I just needed a system that turned small habits into real-life results.
                        </p>
                        <p className="leading-relaxed">
                          That's what this became:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                          <li>A system simple enough to start today.</li>
                          <li>Smart enough to ripple across your health, wealth, and happiness.</li>
                          <li>And powerful enough to take you from stuck to free, one habit at a time.</li>
                        </ul>
                      </div>

                      {/* The New Opportunity */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The New Opportunity</h2>
                        <p className="leading-relaxed mb-4">
                          I created Big Daddy's Big Tips; a complete system built around habit-driven lifestyle design.
                        </p>
                        <p className="leading-relaxed mb-4">
                          It helps people go from stuck to free. From surviving to thriving. From standing still, or sliding backwards, to building real, forward momentum.
                        </p>
                        <p className="leading-relaxed mb-4">
                          It bridges the gap between knowledge and action. It replaces daily drifts with daily wins.
                        </p>
                        <p className="leading-relaxed">
                          It's a new way to live in the same world. With the energy, clarity, and confidence to make it work.
                        </p>
                      </div>

                      {/* The Strategy */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Strategy</h2>
                        <p className="leading-relaxed mb-4">
                          The BDBT system is built around Habit-Driven Lifestyle Design. A method of applying small, simple habits that ripple across your entire life.
                        </p>
                        <p className="leading-relaxed mb-4">It combines:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                          <li>Strategic habit placement</li>
                          <li>Environment design</li>
                          <li>Daily tracking</li>
                          <li>Identity-based behaviour shifts</li>
                        </ul>
                        <p className="leading-relaxed">
                          It's not about motivation or discipline. It's about designing a system that works even when life is messy, so you win by default, one ripple at a time.
                        </p>
                      </div>

                      {/* My Results */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">My Results</h2>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Saved thousands a year without feeling deprived</li>
                          <li>Improved health and energy with minimal effort and minimal maintenance</li>
                          <li>Built deeper connections with my kids, family, friends, and self</li>
                          <li>Replaced overwhelm with momentum, daily</li>
                          <li>Defined my values and now live in full alignment with them</li>
                        </ul>
                        <p className="leading-relaxed mt-4">
                          I say no to things more. I protect my time. I keep promises to myself, even when no one's watching. And I've built a standard that reflects the man I want to be, every single day.
                        </p>
                      </div>

                      {/* The Results of Others */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Results of Others</h2>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Parents have gone from surviving to thriving, and found deeper connection with their children</li>
                          <li>Professionals are losing weight and regaining confidence, without gym memberships or extreme overhauls</li>
                          <li>Followers are reporting wins from a single free tip</li>
                          <li>Stressed individuals are saving thousands, while getting healthier and happier in the process</li>
                        </ul>
                        <p className="leading-relaxed mt-4">
                          The common thread? They're all experiencing ripple effects; small habits that change everything.
                        </p>
                      </div>

                      {/* My End Result */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">My End Result</h2>
                        <p className="leading-relaxed mb-4">
                          I've designed a life that supports my values, that feels free, fulfilling, and future-focused. I wake up every day knowing I'm building something real and helping others do the same.
                        </p>
                        <p className="leading-relaxed">
                          It's a life that compounds in the right direction. Where my increasingly primed vessel is creating increasingly powerful ripples, leading to an increasingly meaningful journey.
                        </p>
                      </div>

                      {/* My Transformation */}
                      <div className="mb-8">
                        <h2 className="text-3xl font-bold text-primary mb-6">My Transformation</h2>
                        <p className="leading-relaxed mb-4">
                          I stopped chasing other people's ideas of success and started building a life that fit me.
                        </p>
                        <p className="leading-relaxed mb-4">
                          I uncovered the two biggest problems keeping people stuck. Fragmented advice and societal pressure, and built a system to solve both. A system that helps others apply what they already know, stay true to their values, and reclaim their direction.
                        </p>
                        <p className="leading-relaxed mb-4">
                          I live in alignment now. I honour my time. I serve others.
                        </p>
                        <p className="leading-relaxed">
                          And part of my deepest transformation has been accepting that some people closest to me may never hear it from me. But if I can become the expert that your loved ones listen to, and help you help them, then maybe I'm exactly where I need to be.
                        </p>
                        <p className="leading-relaxed mt-4 font-semibold text-primary">
                          That's what drives me. That's what Big Daddy's Big Tips is here to do.
                        </p>
                      </div>

                      <div className="text-center pt-8 border-t border-muted space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                          <Button variant="hero" size="lg" asChild className="hover:scale-105 transition-transform w-full sm:w-auto">
                            <Link to="/blueprint">
                              Get Started Now
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="lg" asChild className="hover:scale-105 transition-transform w-full sm:w-auto">
                            <Link to="/blueprint">
                              Start Your Journey Now
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                          </Button>
                        </div>
                        <div className="flex justify-center mt-8">
                          <ChevronRipple to="/blueprint" label="Download and Read the Blueprint" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>


      {/* The New Opportunity */}
      <section id="welcome-to-habit-driven-lifestyle-design" className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary">
              Welcome to Habit-Driven Lifestyle Design
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              A system that's simple enough to start today, smart enough to compound over time 
              and strong enough to rebuild your identity from the inside out.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="prose prose-lg text-muted-foreground">
                <p className="leading-relaxed text-lg">
                  You don't need another goal. You need an achievable daily win that creates a ripple effect across your entire life.
                </p>
                <p className="leading-relaxed text-lg font-semibold text-primary">
                  If you feel stuck, scattered, or just know you're capable of more, this is your next step.
                </p>
                <p className="leading-relaxed text-lg">
                  One habit today. A different life tomorrow. Let's build it together - one tip at a time.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg" asChild className="hover:scale-105 transition-transform">
                  <Link to="/blueprint">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="hover:scale-105 transition-transform">
                  <Link to="/daily-wins">Get Daily Wins Tracker</Link>
                </Button>
              </div>
            </div>
            
            <Card className="bg-gradient-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">What You'll Get:</h3>
                <div className="space-y-4">
                  {["A system that works even when you don't feel motivated", "Daily habits that create ripple effects across all areas", "Clear, achievable steps instead of overwhelming goals", "A community of people on the same journey", "Tools to track and stack your wins"].map((benefit, index) => <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-warning text-white rounded-2xl p-12 border-4 border-warning/40">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands who've discovered the power of the BDBT system and transformed their lives.
          </p>
          <div className="flex justify-center">
            <Button variant="colored-bg" size="lg" asChild className="w-full sm:w-auto max-w-sm">
              <Link to="/blueprint">Get Your Blueprint Now</Link>
            </Button>
          </div>
        </div>
        </div>
      </section>

      {/* Old Way vs BDBT Way */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary">
              Why Habit-Driven Lifestyle Design™ Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compare the old approach with the BDBT system that creates lasting change
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Old Way Column */}
            <Card className="bg-destructive/5 border-destructive/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-destructive mt-4">What Doesn't Work</h3>
                </div>
                <div className="space-y-4">
                  {["Separate goals for health, wealth, and happiness", "Relying on motivation or willpower", "Isolated tips from different experts", "Overhauling everything on January 1st", "All or nothing thinking", "Quick hacks with no staying power", "One-size-fits-all plans", "Starting strong, burning out fast"].map((item, index) => <div key={index} className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* BDBT Way Column */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-primary mt-4">What Actually Works</h3>
                </div>
                <div className="space-y-4">
                  {["One stacked system that improves all three together", "A structure that works even when motivation doesn't", "Simplified information and achievable progress", "Tiny daily shifts that build a life you love", "1% daily improvement mindset", "Long-term identity change through ripple habits", "A flexible framework that fits around your life", "Small daily steps. Big life changes"].map((item, index) => <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* BDBT Philosophy */}
      <section className="py-20 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <Quote className="w-16 h-16 mx-auto mb-8 opacity-50" />
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">The BDBT Philosophy</h2>
            <blockquote className="text-2xl lg:text-3xl font-bold leading-relaxed mb-8 text-white">
              "We believe in habits that create ripple effects. Small daily actions that spark powerful momentum across your entire life."
            </blockquote>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
            icon: Target,
            belief: "In stacking micro-wins, not chasing macro-perfection."
          }, {
            icon: Clock,
            belief: "That 10 minutes can change your entire day. The ripple can then change your entire life."
          }, {
            icon: Brain,
            belief: "That your environment beats your willpower."
          }, {
            icon: Zap,
            belief: "That you don't need more motivation, you need a system that works even when you don't."
          }, {
            icon: Heart,
            belief: "That real change happens when your habits serve your values."
          }, {
            icon: Star,
            belief: "That you don't need another goal. You need an achievable daily win that creates ripple effects."
          }].map((item, index) => <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <item.icon className="w-12 h-12 mx-auto mb-4 text-white" />
                  <p className="text-white/90 leading-relaxed">{item.belief}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* The Truth Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary">
              Life Isn't Lived in Silos
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your health affects your wealth. Your wealth affects your happiness. Your happiness affects your health.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="prose prose-lg text-muted-foreground">
                <p className="leading-relaxed text-lg">
                  Trying to fix one without the others creates imbalance. Trying to fix everything at once creates overwhelm.
                </p>
                <p className="leading-relaxed text-lg font-semibold text-primary">
                  That's where BDBT comes in.
                </p>
                <p className="leading-relaxed text-lg">
                  BDBT is the first and only system that helps you build health, wealth, and happiness simultaneously, 
                  through daily habits that create ripple effects across your entire life.
                </p>
              </div>
              
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-4">The BDBT Difference:</h3>
                  <div className="space-y-3">
                    {["One stacked system that improves all three together", "Works even when your motivation doesn't", "Clear steps that turn overwhelm into action", "1% daily improvement mindset"].map((benefit, index) => <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </div>;
};
export default About;