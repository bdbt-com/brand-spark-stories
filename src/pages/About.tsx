import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Clock, Heart, Award, Users2, Quote, BookOpen, Target, Star, TrendingUp, Zap, AlertTriangle, CheckCircle, ArrowRight, BarChart3, Brain, Lightbulb, ChevronDown, User } from "lucide-react";
import { Link } from "react-router-dom";
import ChevronRipple from "@/components/ChevronRipple";
import { useState } from "react";
const centerScrollToElement = (targetId: string) => {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const rect = targetElement.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);
    window.scrollTo({ top: scrollTop, behavior: 'smooth' });
  }
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
      {/* Hero Section - Owner Story */}
      <section id="story" className="py-32 lg:py-40 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                    <img src="/lovable-uploads/recording-setup-new.jpg" alt="BDBT journey image 2 - Podcast recording setup" className="w-full h-full object-cover rounded-xl" />
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
                        <p className="text-lg leading-relaxed">
                          I spent years trying to "fix" myself. Read the books. Listened to the podcasts. Followed the gurus. And sure, I'd get a temporary boost. But nothing stuck. The harder I tried to overhaul my life, the more exhausted I became. I was caught in the cycle of big promises and bigger disappointments—constantly starting over, never quite getting there.
                        </p>
                        <p className="text-lg leading-relaxed">
                          Sound familiar?
                        </p>
                      </div>

                      {/* The Breaking Point */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Breaking Point</h2>
                        <p className="text-lg leading-relaxed">
                          When my marriage ended, I found myself parenting solo on my days with the kids, managing a full-time business, and trying to keep my own head above water.
                        </p>
                        <p className="text-lg leading-relaxed">
                          That's when I realized: I didn't have the luxury of waiting for the "perfect system." I needed something that worked now. Something simple. Something sustainable.
                        </p>
                        <p className="text-lg leading-relaxed">
                          So I stopped trying to do everything and started focusing on just one thing: showing up every day.
                        </p>
                      </div>

                      {/* The System Takes Shape */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The System Takes Shape</h2>
                        <p className="text-lg leading-relaxed">
                          I started small. Really small. A morning walk. A quick workout. Drinking more water. Writing down one thing I was grateful for. These weren't life-changing habits—they were just… doable.
                        </p>
                        <p className="text-lg leading-relaxed">
                          And something unexpected happened.
                        </p>
                        <p className="text-lg leading-relaxed">
                          Those small wins started to stack. Not overnight. Not in a week. But slowly, steadily, they built momentum. And the more I showed up, the more confidence I gained. The more energy I had. The better I felt.
                        </p>
                      </div>

                      {/* The Ripple Effect */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Ripple Effect</h2>
                        <p className="text-lg leading-relaxed">
                          Here's the thing: change doesn't happen in isolation. When you improve one area of your life, it ripples into everything else.
                        </p>
                        <p className="text-lg leading-relaxed">
                          Morning movement gave me more energy. More energy meant I showed up better for my kids. Showing up better for my kids made me feel like a better dad. Feeling like a better dad gave me the confidence to grow my business. Growing my business gave me financial stability. Financial stability gave me peace of mind.
                        </p>
                        <p className="text-lg leading-relaxed">
                          It all connected. Health. Wealth. Happiness. They weren't separate goals—they were part of the same system.
                        </p>
                      </div>

                      {/* The Secret Weapon */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Secret Weapon</h2>
                        <p className="text-lg leading-relaxed">
                          As I refined this approach, I realized something profound: most people don't fail because they lack willpower. They fail because they're trying to do too much, too fast, with no clear system to follow.
                        </p>
                        <p className="text-lg leading-relaxed">
                          People didn't need another guru telling them to wake up at 4am and run a marathon before breakfast. They needed a framework that met them where they were. A system that fit into their real lives—not some idealized version of what life "should" look like.
                        </p>
                        <p className="text-lg leading-relaxed">
                          That's when Big Daddy's Big Tips was born.
                        </p>
                      </div>

                      {/* The Mission */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Mission</h2>
                        <p className="text-lg leading-relaxed">
                          My mission is simple: to help you build a life you don't need to escape from. Not through grand transformations or overnight success. But through small, intentional actions that compound over time.
                        </p>
                        <p className="text-lg leading-relaxed">
                          Because here's the truth: you don't need a dream. You need a system. And that's exactly what BDBT gives you.
                        </p>
                      </div>

                      {/* The Promise */}
                      <div className="text-center py-8 bg-primary/5 rounded-lg">
                        <p className="text-2xl font-bold text-primary mb-4">
                          If you show up consistently—even imperfectly—you will see results. Not because I said so. But because the system works. It worked for me. It's worked for thousands of others. And it will work for you.
                        </p>
                        <p className="text-lg text-primary">
                          Welcome to Big Daddy's Big Tips. Let's build something that lasts.
                        </p>
                      </div>

                      {/* CTA */}
                      <div className="mt-12 text-center">
                        <Button asChild size="lg" variant="hero" className="w-full sm:w-auto">
                          <Link to="/blueprint">
                            Get Your Foundation Blueprint <ArrowRight className="w-5 h-5 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </CollapsibleContent>
      </Collapsible>

      {/* The Problem Section */}
      <section id="problem" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-primary tracking-tight">
              The Problem
            </h2>
            <p className="text-xl text-primary font-light max-w-2xl mx-auto">
              We live in a world obsessed with doing more
            </p>
          </div>
          <div className="my-32 flex justify-center" id="arrow-1">
            <ChevronRipple to="/about#problem-1" label="Why change fails?" size="sm" showLabel={false} variant="minimal" onClick={() => centerScrollToElement('problem-1')} />
          </div>
          
          <div className="">
            {/* First statement - Center aligned */}
            <div id="problem-1" className="text-center max-w-4xl mx-auto mt-20">
              <h3 className="text-4xl lg:text-5xl font-bold leading-tight text-primary mb-8">
                Why do traditional approaches fail to create lasting change?
              </h3>
              <p className="text-xl text-primary font-light">
                More workouts. More goals. More hustle. Yet most people feel stuck, drained, and uncertain.
              </p>
            </div>
            <div className="my-32 flex justify-center" id="arrow-2">
              <ChevronRipple to="/about#problem-2" label="One tip at a time?" size="sm" showLabel={false} variant="minimal" onClick={() => centerScrollToElement('problem-2')} />
            </div>

            {/* Second statement - Center aligned */}
            <div id="problem-2" className="text-center max-w-4xl mx-auto mt-20">
              <h3 className="text-4xl lg:text-5xl font-bold leading-tight text-primary mb-8">
                We're told to fix our lives one isolated tip at a time.
              </h3>
              <p className="text-xl text-primary font-light">
                A budgeting app here. A gym membership there. A meditation streak that lasts three days.
              </p>
            </div>
            <div className="my-32 flex justify-center" id="arrow-3">
              <ChevronRipple to="/about#problem-3" label="Why tips fail" size="sm" showLabel={false} variant="minimal" onClick={() => centerScrollToElement('problem-3')} />
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
            <div className="my-32 flex justify-center" id="arrow-4">
              <ChevronRipple to="/about#problem-4" label="Modern life pressures" size="sm" showLabel={false} variant="minimal" onClick={() => centerScrollToElement('problem-4')} />
            </div>

            {/* Fourth statement - Center aligned */}
            <div id="problem-4" className="text-center max-w-4xl mx-auto mt-20">
              <h3 className="text-4xl lg:text-5xl font-bold leading-tight text-primary mb-8">
                Meanwhile, modern life pushes us further behind.
              </h3>
              <p className="text-xl text-primary font-light">
                Sit more. Scroll more. Consume more. With every new demand, we feel more overwhelmed.
              </p>
            </div>
            {/* Down Arrow to next section */}
            <div className="my-32 flex justify-center">
              <ChevronRipple to="/about#welcome-to-habit-driven-lifestyle-design" label="" size="sm" showLabel={false} variant="minimal" onClick={() => centerScrollToElement('welcome-to-habit-driven-lifestyle-design')} />
            </div>
          </div>
        </div>
      </section>

      {/* The New Opportunity */}
      <section id="welcome-to-habit-driven-lifestyle-design" className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary">
              Welcome to the World of Daily Wins
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
              </div>
            </div>
            
            <Card className="bg-gradient-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">What You'll Get:</h3>
                <div className="space-y-4">
                  {["A system that works even when you don't feel motivated", "Daily habits that create ripple effects across all areas", "Clear, achievable steps instead of overwhelming goals", "Tools to track and stack your wins"].map((benefit, index) => <div key={index} className="flex items-start gap-3">
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
              Why Daily Wins Work
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
      <section className="py-12 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <Quote className="w-16 h-16 mx-auto mb-8 opacity-50" />
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">The BDBT Philosophy</h2>
            <blockquote className="text-2xl lg:text-3xl font-bold leading-relaxed mb-8 text-white">
              "Daily Wins that create ripple effects. Small daily actions that spark powerful momentum across your entire life."
            </blockquote>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
            icon: Target,
            belief: "Stacking micro-wins, not chasing macro-perfection."
          }, {
            icon: Clock,
            belief: "10 minutes can change your entire day. The ripple can then change your entire life."
          }, {
            icon: Brain,
            belief: "Your environment beats your willpower."
          }, {
            icon: Zap,
            belief: "You don't need more motivation, you need a system that works even when you don't."
          }, {
            icon: Heart,
            belief: "Real change happens when your habits serve your values."
          }, {
            icon: Star,
            belief: "You don't need another goal. You need an achievable daily win that creates ripple effects."
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
      <section className="py-12 bg-muted/30">
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
            
            {/* CTA Section */}
            <div className="mt-12 text-center">
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 max-w-md mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-4">Get Your Free Foundation Blueprint</h3>
                  <p className="text-primary/80 mb-6">Start building your life-changing habits today</p>
                  <Button asChild size="lg" className="w-full">
                    <Link to="/blueprint">Get Foundation Blueprint <ArrowRight className="w-5 h-5 ml-2" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </div>
};
export default About;