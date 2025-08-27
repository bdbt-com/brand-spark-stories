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

  // Handle scroll when story opens
  const handleStoryToggle = (open: boolean) => {
    setIsStoryOpen(open);
    if (open) {
      // Wait for content to expand, then scroll to show the story content
      setTimeout(() => {
        const storySection = document.getElementById('story-content');
        if (storySection) {
          storySection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
    }
  };
  return <div className="min-h-screen">
      {/* The Problem Section */}
      <section id="problem" className="py-32 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-32">
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-primary tracking-tight">
              The Problem
            </h2>
            <p className="text-xl text-primary font-light max-w-2xl mx-auto">
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
              <p className="text-xl text-primary font-light">
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
              <p className="text-xl text-primary font-light">
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
              <p className="text-xl text-primary font-light mb-4">
                Not because people are lazy. Not because they're broken.
              </p>
              <p className="text-xl text-primary font-semibold">
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
              <p className="text-xl text-primary font-light">
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
      <section id="story" className="py-20 lg:py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="animate-fade-in space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-white">The Story Behind</span>
                  <span className="block text-[hsl(35_45%_75%)]">The System</span>
                </h1>
              </div>
              <div className="space-y-6">
                <p className="text-xl text-white leading-relaxed">
                  How one dad turned daily overwhelm into a life-changing ripple effect.
                </p>
                <p className="text-xl text-white leading-relaxed">
                  From financial services to single parenting, discover the real story behind 
                  Big Daddy's Big Tips and why I'm sharing it with you.
                </p>
              </div>
              <div className="flex justify-center mt-12">
                <Collapsible open={isStoryOpen} onOpenChange={handleStoryToggle}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="lg" className="relative hover:scale-105 transition-transform text-lg h-16 px-12 py-6 bg-background/95 backdrop-blur-sm border-primary/30 rounded-xl">
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
        </div>
      </section>

      {/* Expandable Story Content Section */}
      <Collapsible open={isStoryOpen} onOpenChange={setIsStoryOpen}>
        <CollapsibleContent id="story-content">
          <section className="py-20 bg-primary relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              
               {/* Pinned Photos - Left Side - ODD POSITIONS (1,3,5,7,9) */}
               <div className="hidden lg:block absolute left-0 top-0 w-[400px] space-y-8 z-10" style={{
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
                   marginTop: "200px"
                 }}>
                   <img src="/lovable-uploads/4fd0818e-20c3-4941-9c54-6915db50a7c0.png" alt="BDBT journey image 4 - Meditation with mirror" className="w-full h-full object-cover rounded-xl" />
                 </div>
                 
                 {/* Photo 5 - Position 5/10 - Success & Wealth */}
                 <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform rotate-1" style={{
                   animationDelay: "1900ms",
                   marginTop: "200px"
                 }}>
                   <img src="/lovable-uploads/33ba01bc-045c-4c44-ac70-c61c05093bdc.png" alt="BDBT journey image 6 - Silhouette by pool" className="w-full h-full object-cover rounded-xl" />
                 </div>
                 
                 {/* Photo 7 - Position 7/10 - Coastal Business Life */}
                 <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform -rotate-1" style={{
                   animationDelay: "2600ms",
                   marginTop: "200px"
                 }}>
                   <img src="/lovable-uploads/2f4d6184-a8de-43f0-a345-4ed910c90522.png" alt="BDBT journey image 8 - Man on phone in modern setting" className="w-full h-full object-cover rounded-xl" />
                 </div>
                 
                 {/* Photo 9 - Position 9/10 - Man in shoe store */}
                 <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform rotate-2" style={{
                   animationDelay: "3200ms",
                   marginTop: "200px"
                 }}>
                   <img src="/lovable-uploads/8db636d1-94ff-432a-a4b1-6ca278173f2f.png" alt="BDBT journey image 10 - Man in shoe store" className="w-full h-full object-cover rounded-xl" />
                 </div>
               </div>

               {/* Pinned Photos - Right Side - EVEN POSITIONS (2,4,6,8,10) */}
               <div className="hidden lg:block absolute right-0 top-0 w-[400px] space-y-8 z-10" style={{
                 right: '-120px'
               }}>
                 {/* Photo 2 - Position 2/10 - The Journey Upward */}
                 <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform -rotate-1" style={{
                   animationDelay: "800ms",
                   marginTop: "100px"
                 }}>
                   <img src="/lovable-uploads/b362cf10-f3b4-4ab1-aeb3-30ab18058ace.png" alt="BDBT journey image 3 - Man with dog outdoors" className="w-full h-full object-cover rounded-xl" />
                 </div>
                 
                 {/* Photo 4 - Position 4/10 - Freedom & Success */}
                 <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform rotate-2" style={{
                   animationDelay: "1500ms",
                   marginTop: "200px"
                 }}>
                   <img src="/lovable-uploads/661d98ce-15f1-4542-b8c0-bab549b78a55.png" alt="BDBT journey image 5 - Man in bathroom mirror" className="w-full h-full object-cover rounded-xl" />
                 </div>
                 
                 {/* Photo 6 - Position 6/10 - Lifestyle Achievement */}
                 <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform -rotate-2" style={{
                   animationDelay: "2200ms",
                   marginTop: "200px"
                 }}>
                   <img src="/lovable-uploads/2678016c-a3fa-4e29-bf3d-3ebe92201186.png" alt="BDBT journey image 7 - Person exercising outdoors" className="w-full h-full object-cover rounded-xl" />
                 </div>
                 
                 {/* Photo 8 - Position 8/10 - Original Sunset Transformation */}
                 <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform rotate-1" style={{
                   animationDelay: "2900ms",
                   marginTop: "200px"
                 }}>
                   <img src="/lovable-uploads/7db6bd1f-c12f-45f2-a1d1-505f38c743a1.png" alt="BDBT journey image 9 - Man outdoors smiling" className="w-full h-full object-cover rounded-xl" />
                 </div>
                 
                 {/* Photo 10 - Position 10/10 - Man in home theater */}
                 <div className="w-[400px] h-[400px] bg-gradient-primary/10 border-4 border-primary/30 rounded-2xl shadow-2xl animate-fade-in overflow-hidden transform -rotate-1" style={{
                   animationDelay: "3500ms",
                   marginTop: "200px"
                 }}>
                   <img src="/lovable-uploads/a886c4a9-0d09-442e-8348-25bd795ad7d0.png" alt="BDBT journey image 11 - Man in home theater" className="w-full h-full object-cover rounded-xl" />
                 </div>
               </div>

              {/* Main Story Content */}
              <div className="max-w-4xl mx-auto lg:px-32">
                <Card className="bg-background/95 backdrop-blur-sm border-primary/20 shadow-strong">
                  <CardContent className="p-8 lg:p-12">
                    <div className="prose prose-lg max-w-none text-primary">
                      
                      {/* The Backstory */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Backstory</h2>
                        <p className="leading-relaxed mb-4">
                          I've spent the best part of two decades working in financial services, helping people with mortgages, pensions, and investments. From the outside, it looked like I had things sorted. But behind the scenes, I was starting to see a pattern, not just in our clients' lives, but in my own.
                        </p>
                        <p className="leading-relaxed mb-4">
                          People were chasing success in one area. Their money, their health, their relationships, their career - while letting everything else slide. And I was doing the same thing. I was working in finance, but I wasn't financially free. I was helping others plan their futures, while quietly losing grip on my own.
                        </p>
                        <p className="leading-relaxed mb-4">
                          The wake-up call came when my marriage ended. Suddenly, I was a single dad with two young kids, trying to figure out how to rebuild my life from scratch.
                        </p>
                        <p className="leading-relaxed">
                          That's when I realised the problem: we've been taught to fix our lives one isolated area at a time. But life doesn't work that way. Everything is connected.
                        </p>
                      </div>

                      {/* The Discovery */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Discovery</h2>
                        <p className="leading-relaxed mb-4">
                          As I started rebuilding, I noticed something interesting. When I took care of my physical health, I had more energy for work. When I got my finances sorted, I felt less stressed with the kids. When I prioritised my relationships, everything else seemed to flow better.
                        </p>
                        <p className="leading-relaxed mb-4">
                          Instead of trying to fix everything separately, I started looking for daily habits that would improve multiple areas at once. Small actions that would create ripple effects across my entire life.
                        </p>
                        <p className="leading-relaxed mb-4">
                          I called it "habit stacking" - building daily wins that compound over time.
                        </p>
                        <p className="leading-relaxed">
                          The results were remarkable. Not just for me, but for everyone I started sharing this approach with.
                        </p>
                      </div>

                      {/* The System */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The System</h2>
                        <p className="leading-relaxed mb-4">
                          What started as personal survival became a tested system. I began documenting everything, refining the approach, and sharing it with other parents, professionals, and anyone who felt like they were falling behind.
                        </p>
                        <p className="leading-relaxed mb-4">
                          The feedback was overwhelming. People weren't just improving their health OR their wealth OR their relationships. They were improving all three, simultaneously, with less effort than they'd been putting into trying to fix just one area.
                        </p>
                        <p className="leading-relaxed mb-4">
                          That's when Big Daddy's Big Tips was born. Not as a business plan, but as a mission to share what I'd learned with as many people as possible.
                        </p>
                        <p className="leading-relaxed">
                          Because if a financially-broke single dad could turn his life around using this system, then anyone could.
                        </p>
                      </div>

                      {/* The Mission */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Mission</h2>
                        <p className="leading-relaxed mb-4">
                          Today, I'm living proof that this system works. I'm financially free, physically strong, and deeply connected to my family. But more importantly, I'm helping thousands of people create the same transformation in their own lives.
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
          </section>
        </CollapsibleContent>
      </Collapsible>


      {/* The New Opportunity */}
      <section id="welcome-to-habit-driven-lifestyle-design" className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary">
              Welcome to Habit-Driven Lifestyle Design
            </h2>
            <p className="text-xl text-primary max-w-4xl mx-auto leading-relaxed">
              A system that's simple enough to start today, smart enough to compound over time 
              and strong enough to rebuild your identity from the inside out.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="prose prose-lg text-primary">
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
                      <span className="text-primary">{benefit}</span>
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
            <p className="text-xl text-primary max-w-3xl mx-auto">
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
                      <span className="text-primary">{item}</span>
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
                      <span className="text-primary">{item}</span>
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
            <p className="text-xl text-primary max-w-3xl mx-auto leading-relaxed">
              Your health affects your wealth. Your wealth affects your happiness. Your happiness affects your health.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="prose prose-lg text-primary">
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
                        <span className="text-primary">{benefit}</span>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </div>
};
export default About;