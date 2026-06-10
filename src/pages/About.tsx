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
      <section id="story" className="py-32 lg:py-40 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold italic leading-tight text-primary">
                  About Me
                </h1>
              </div>
              <div className="space-y-6">
                <p className="text-xl text-foreground leading-relaxed italic">
                  After years working in finance and studying habits, health and behaviour, I realised something surprising; most people do not fail because they are lazy or lack discipline. They are simply living in a world where comfort has evolved faster than our biology.
                </p>
                <p className="text-xl text-foreground leading-relaxed italic">
                  Modern life has made choosing comfort easier. It has made Daily Drifts easier. So I created Daily Wins to help people replace downward spirals with upward momentum through tiny daily actions that quietly compound.
                </p>
              </div>
              <div className="flex justify-center mt-12">
                <Collapsible open={isStoryOpen} onOpenChange={handleStoryToggle}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="lg" className="relative hover:scale-105 transition-transform text-lg h-16 px-12 py-6 bg-card backdrop-blur-sm border-primary/30 rounded-xl">
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
                <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Big Daddy - BDBT Founder" className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-strong border-4 border-primary/20" />
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
                          I spent years trying to "fix" myself. Read the books. Listened to the podcasts. Followed the gurus. And sure, I'd get a temporary boost. But nothing stuck. The harder I tried to overhaul my life, the more exhausted I became. I was caught in the cycle of big promises and bigger disappointments; constantly starting over, but never quite getting there. Sound familiar?
                        </p>
                      </div>

                      {/* The Breaking Point */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Breaking Point</h2>
                        <p className="text-lg leading-relaxed">
                          When my marriage ended, I found myself parenting solo on my days with the kids, managing a business, and trying to keep my own head above water. That's when I realised, I didn't have the luxury of waiting for the "perfect system." I needed something that worked now. Something simple. Something sustainable. So I stopped trying to do everything and started focusing on just one thing: showing up every day.
                        </p>
                      </div>

                      {/* The System Takes Shape */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The System Takes Shape</h2>
                        <p className="text-lg leading-relaxed">
                          I started small. Really small. A morning walk. A quick workout. Drinking more water. Writing down one thing I was grateful for. These weren't life-changing habits, they were simple, achievable Daily Wins, and something unexpected happened. Those small Daily Wins started to stack. Not overnight. Not in a week. But slowly, steadily, they built momentum. And the more I showed up, the more confidence I gained. The more energy I had. The better I felt.
                        </p>
                      </div>

                      {/* The Ripple Effect */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Ripple Effect</h2>
                        <p className="text-lg leading-relaxed">
                          Here's the thing, change doesn't happen in isolation. When you improve one area of your life, it ripples into everything else. Morning movement gave me more energy. More energy meant I showed up better for my kids. Showing up better for my kids made me feel like a better dad. Feeling like a better dad gave me more confidence in my work. Turning up better at work gave me financial stability. Financial stability gave me peace of mind. It all connected. Health. Wealth. Happiness. They weren't separate goals, they were part of the same system.
                        </p>
                      </div>

                      {/* The Secret Weapon */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Secret Weapon</h2>
                        <p className="text-lg leading-relaxed">
                          As I refined this approach, I realised something profound: most people don't fail because they lack willpower. They fail because they're trying to do too much, too fast, with no clear system to follow. People didn't need another guru telling them to wake up at 4am and run a marathon before breakfast. They needed a framework that met them where they were. A system that fit into their real lives, not an idealised version of what life "should" look like. That's when Big Daddy's Big Tips was born.
                        </p>
                      </div>

                      {/* The Mission */}
                      <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">The Mission</h2>
                        <p className="text-lg leading-relaxed">
                          My mission is simple: to help you build a life you don't need to escape from. Not through grand transformations or overnight success. But through small, intentional actions that compound over time. Because here's the truth: you don't need a dream. You need a system. And that's exactly what BDBT gives you.
                        </p>
                      </div>

                      {/* The Promise */}
                      <div className="text-center py-8 bg-primary/5 rounded-lg">
                        <p className="text-2xl font-bold text-foreground mb-4">
                          If you show up consistently you will see results. Not because I said so. But because the system works. It worked for me. It's worked for thousands of others. And it will work for you.
                        </p>
                        <p className="text-lg text-foreground">
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

    </div>;

};
export default About;