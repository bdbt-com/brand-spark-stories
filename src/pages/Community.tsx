import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Shield, Target, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-primary">
            Become a Baddy
          </h1>
          <p className="text-xl lg:text-2xl text-primary/80 mb-8 leading-relaxed">
            The World Won't Always Clap For Your Wins
          </p>
        </div>
      </section>

      {/* Reality of Growth */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 text-lg text-primary/80 leading-relaxed">
            <p>When you choose health over hangovers, people may make a jibe.</p>
            <p>When you eat the food that nourishes you, people may call you boring.</p>
            <p>When you save money instead of spending it to keep up, people may say you're missing out.</p>
            <p>When you go for a run while others stay sedentary, people may tell you to just relax.</p>
            <p className="font-semibold text-primary">
              That's the reality of growth. The very people around you, friends, family, colleagues and acquaintances can become the biggest obstacles to your progress.
            </p>
            <p>Not because they're bad people, but because your choices remind them of their own.</p>
          </div>
        </div>
      </section>

      {/* Who is a Guide */}
      <section className="container mx-auto px-4 py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-primary text-center">
            Who is a Baddy?
          </h2>
          <div className="space-y-6 text-lg text-primary/80 leading-relaxed">
            <p>A Baddy is someone who dares to go against the grain. The one who says no when everyone else says yes.</p>
            <p>A Baddy is someone who chooses daily wins over daily drifts, even when it makes them the outsider.</p>
            <p>A Baddy is brave enough to be labelled the bad guy or the boring one, for making better choices. The one who chooses the "boring" healthy option, even when it's easier to give in.</p>
            <p>A Baddy is someone who rises above social pressure, peer pressure, and self-doubt because they know that every small win ripples into health, wealth, and happiness.</p>
            <p className="font-semibold text-primary">Being a Baddy is not about perfection.</p>
            <p>It's about being courageous enough to stand out today so you (and the people you love) can live better tomorrow.</p>
            <p>A Baddy stacks daily wins for their health, wealth, and happiness while the world around them keeps drifting.</p>
            <p>A Baddy is someone who finds the courage to stay true to themself and BDBT is here to help give you that courage.</p>
          </div>
        </div>
      </section>

      {/* Why Guide */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-primary text-center">
            Why "Baddy"?
          </h2>
          <div className="space-y-8">
            <p className="text-lg text-primary/80 leading-relaxed">
              Most people see discipline as dull. They call you the bad guy for:
            </p>
            
            <div className="grid gap-6">
              <Card className="p-6">
                <CardContent className="p-0">
                  <p className="text-lg">Saying no to another round of drinks.</p>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardContent className="p-0">
                  <p className="text-lg">Eating a healthy meal instead of the status quo.</p>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardContent className="p-0">
                  <p className="text-lg">Choosing movement over staying still.</p>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardContent className="p-0">
                  <p className="text-lg">Choosing to save and invest instead of spending just to keep up.</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-xl font-semibold text-primary mb-4">
                But here's the truth. Those "boring" choices are what create freedom, energy, wealth, and happiness.
              </p>
              <p className="text-lg text-primary/80">So we wear the label proudly.</p>
              <p className="text-lg text-primary/80 mt-4">
                If being disciplined makes you the bad guy, then you're exactly where you need to be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Guide Code */}
      <section className="container mx-auto px-4 py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-primary">
            The Baddy Code
          </h2>
          
          <div className="grid gap-8 max-w-2xl mx-auto">
            <Card className="p-8">
              <CardContent className="p-0">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-xl font-semibold">Choose wins over drifts.</p>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardContent className="p-0">
                <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-xl font-semibold">Stack daily wins. Health, wealth, and happiness always work together.</p>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardContent className="p-0">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-xl font-semibold">Courage beats comfort.</p>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardContent className="p-0">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-xl font-semibold">Ripples matter. Your small choices change more than just you.</p>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardContent className="p-0">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-xl font-semibold">Lead when you're ready and become the leader of your own group.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Guide Identity */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-primary text-center">
            The Baddy Identity
          </h2>
          
          <div className="space-y-12">
            <Card className="p-8">
              <CardContent className="p-0">
                <Badge className="mb-4 text-lg px-4 py-2">Phase 1</Badge>
                <p className="text-lg text-primary/80 leading-relaxed">
                  You choose differently. You break free from the drift and start stacking small wins. Identity shifts to "I'm not doing what everyone else is doing, and that's my strength."
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardContent className="p-0">
                <Badge className="mb-4 text-lg px-4 py-2">Phase 2</Badge>
                <p className="text-lg text-primary/80 leading-relaxed">
                  Your wins start to show. People notice the difference. Your choices influence your circle. Identity shifts to "I'm not just changing myself, I'm changing the people around me."
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardContent className="p-0">
                <Badge className="mb-4 text-lg px-4 py-2">Phase 3</Badge>
                <p className="text-lg text-primary/80 leading-relaxed">
                  You become the leader. The one others look up to. The proof that discipline beats drift. You build systems, mentor others, and show people how to design a lifestyle instead of chasing hacks. Identity shifts to "I create the environment where wins are the default, not the exception."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why You Need to Be a Guide */}
      <section className="container mx-auto px-4 py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-primary">
            Why You Need to Be a Baddy
          </h2>
          
          <div className="space-y-8 text-lg text-primary/80 leading-relaxed">
            <p>Every drift looks harmless in the moment; another drink, another scroll, another day wasted.</p>
            <p>But drifts compound. They steal your energy, your money, your time, your happiness.</p>
            <p>Daily wins compound too. They give you freedom, confidence, health, wealth, and joy.</p>
            <p className="text-xl font-semibold text-primary">
              The difference? Having the courage to be the Baddy when it matters most.
            </p>
          </div>
        </div>
      </section>

      {/* Personal Story */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-primary text-center">
            I've Been There
          </h2>
          
          <div className="space-y-6 text-lg text-primary/80 leading-relaxed">
            <p>I've been called the boring one.</p>
            <p>The one who "takes things too seriously."</p>
            <p>The one who doesn't drink, who exercises more, who eats differently, who saves instead of spends.</p>
            <p>I know what it feels like to be the odd one out and to be ridiculed for being true to yourself.</p>
            <p className="font-semibold text-primary">
              But I also know the payoff. The freedom, the resilience, the pride, and the life you get to design when you choose daily wins.
            </p>
            <p>That's why I created Big Daddy's Big Tips.</p>
            <p>Not to give you random hacks, but to help you build the courage, the systems, and the stacked habits that let you rise above all the noise and step into your full potential.</p>
          </div>
        </div>
      </section>

      {/* Your First Step */}
      <section className="container mx-auto px-4 py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-primary">
            Your First Step
          </h2>
          
          <div className="space-y-8">
            <p className="text-lg text-primary/80 mb-8">
              The community isn't live yet. The courses aren't open yet.
            </p>
            <p className="text-lg text-primary/80 mb-8">
              But that doesn't matter because your journey starts today.
            </p>
            
            <div className="text-left max-w-2xl mx-auto space-y-4">
              <p className="text-lg">Here's how:</p>
              <div className="space-y-4">
                <Card className="p-6">
                  <CardContent className="p-0">
                    <p className="text-lg">Download the free Big Daddy's Foundation Blueprint.</p>
                  </CardContent>
                </Card>
                
                <Card className="p-6">
                  <CardContent className="p-0">
                    <p className="text-lg">Claim your first Daily win.</p>
                  </CardContent>
                </Card>
                
                <Card className="p-6">
                  <CardContent className="p-0">
                    <p className="text-lg">When it becomes automatic, layer in the next.</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-xl font-semibold text-primary mb-8">
                Because the moment you decide to be a Baddy is the moment your life begins to shift.
              </p>
              
              <div className="space-y-4">
                <p className="text-2xl font-bold text-primary">Become a Baddy today.</p>
                <p className="text-2xl font-bold text-primary">Become the leader tomorrow.</p>
              </div>
              
              <div className="mt-12">
                <Link to="/blueprint">
                  <Button size="lg" className="text-lg px-8 py-6">
                    Get Your Foundation Blueprint
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;