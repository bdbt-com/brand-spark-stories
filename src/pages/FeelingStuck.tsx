import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Heart, Brain, DollarSign, Smile, ArrowRight, CheckCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

// Data for the stuck areas
const healthData = [{
  area: "Sleep",
  falsebelief: "I'll catch up at the weekend.",
  proof: "About 29% of UK adults report insomnia symptoms.",
  url: "https://bmjopen.bmj.com/content/14/5/e080479"
}, {
  area: "Physical Appearance",
  falsebelief: "It's just how I look.",
  proof: "20% feel shame, 34% feel low, 19% feel disgusted about their body.",
  url: "https://www.mentalhealth.org.uk/explore-mental-health/articles/body-image-report-executive-summary"
}, {
  area: "Flexibility & Mobility",
  falsebelief: "I'm too old to improve.",
  proof: "28% feel too fatigued for physical activity; 17% say stress restricts movement.",
  url: "https://www.mentalhealth.org.uk/sites/default/files/2024-05/MHF%20-%20MHAW%20Movement%20-%20Report%202024.pdf"
}, {
  area: "Hydration",
  falsebelief: "Coffee counts as water.",
  proof: "53% of UK adults don't drink enough water daily.",
  url: "https://www.kinetico.co.uk/blog/post/how-much-water-should-you-drink-a-day-in-the-uk"
}, {
  area: "Stress & Anxiety",
  falsebelief: "That's just life.",
  proof: "91% of UK adults experienced high or extreme stress last year.",
  url: "https://mentalhealth-uk.org/burnout/"
}, {
  area: "Energy Levels",
  falsebelief: "I'm just not a morning person.",
  proof: "Up to half of UK adults report chronic low energy.",
  url: "https://wecovr.com/guides/uks-chronic-energy-drain-half-of-britons-affected/"
}, {
  area: "Diet",
  falsebelief: "Healthy eating is too expensive.",
  proof: "Only 32.5% meet the \"5 A Day\" guideline.",
  url: "https://digital.nhs.uk/data-and-information/publications/statistical/statistics-on-obesity-physical-activity-and-diet/statistics-on-obesity-physical-activity-and-diet-england-2019/part-6-diet"
}, {
  area: "Addictions",
  falsebelief: "I can stop whenever I want.",
  proof: "Globally, 10.6% experience internet addiction, 30.7% smartphone addiction, 21% food addiction, 7.2% gambling addiction, among others.",
  url: "https://neurotorium.org/substance-use-disorders-and-behavioral-addictions/"
}, {
  area: "Aches & Pains",
  falsebelief: "It's just part of getting older.",
  proof: "Approximately 20% of adults globally suffer from chronic pain—about 1.5 billion people worldwide.",
  url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3201926/"
}];
const wealthData = [{
  area: "Living Paycheck to Paycheck",
  falsebelief: "This is just how life is.",
  proof: "49% of UK employees live paycheck-to-paycheck.",
  url: "https://commonslibrary.parliament.uk/research-briefings/cbp-7584/"
}, {
  area: "Maximising Earning Potential",
  falsebelief: "I'm stuck in this career.",
  proof: "77% of UK workers only focus on their main income stream",
  url: "https://commonslibrary.parliament.uk/research-briefings/cbp-7584/"
}, {
  area: "Impulse Spending",
  falsebelief: "I deserve a treat.",
  proof: "Brits make ~42 impulse purchases per year, spending ≈£944.",
  url: "https://www.vanquis.com/take-control/impulse-spending-uk/"
}, {
  area: "Debt",
  falsebelief: "I'll never get out of this hole.",
  proof: "48% of UK adults had credit/loan debt in May 2024.",
  url: "https://commonslibrary.parliament.uk/research-briefings/cbp-7584/"
}, {
  area: "Budgeting",
  falsebelief: "I'm just bad with money.",
  proof: "1 in 5 Brits don't keep track of monthly expenses.",
  url: "https://uk.finance.yahoo.com/news/one-in-five-brits-dont-keep-track-of-monthly-expenses-111629380.html"
}, {
  area: "Creating Additional Income",
  falsebelief: "Side hustles are only for entrepreneurs.",
  proof: "77% of UK workers only focus on their main income stream",
  url: "https://commonslibrary.parliament.uk/research-briefings/cbp-7584/"
}, {
  area: "Saving",
  falsebelief: "I don't earn enough to save.",
  proof: "34% of UK adults have less than £1,000 saved.",
  url: "https://www.money.co.uk/savings-accounts/savings-statistics"
}, {
  area: "Investing",
  falsebelief: "Investing is too risky for me.",
  proof: "Only 39% of UK adults actively invest.",
  url: "https://www.theia.org/sites/default/files/2024-10/Investment%20Management%20in%20the%20UK%202023-2024%20Chapter%205.pdf"
}, {
  area: "Retirement Planning",
  falsebelief: "The state pension will cover me.",
  proof: "Only 34% of UK adults confident they'll have enough to live comfortably; 1 in 5 haven't saved for retirement.",
  url: "https://nucleusfinancial.com/about-nucleus/our-company/retirement-confidence-index"
}];
const happinessData = [{
  area: "Purpose",
  falsebelief: "It's too late to change direction.",
  proof: "91% report high stress—an indicator of lack of purpose.",
  url: "https://mentalhealth-uk.org/burnout/"
}, {
  area: "Fulfilment",
  falsebelief: "I'll be happy once I achieve XYZ.",
  proof: "Only 23% of workers worldwide are engaged in their work, many feel unfulfilled.",
  url: "https://www.gallup.com/workplace/349484/state-of-the-global-workplace.aspx"
}, {
  area: "Being Present",
  falsebelief: "I'm just too busy.",
  proof: "On average, people spend 46.9% of waking hours mind-wandering, which correlates with unhappiness.",
  url: "https://news.harvard.edu/gazette/story/2010/11/wandering-mind-not-a-happy-mind/"
}, {
  area: "Contentment / Gratitude",
  falsebelief: "I'll be content when I have more.",
  proof: "Only 47% of Americans are very satisfied with their lives—implying over half don't feel fully content.",
  url: "https://news.gallup.com/poll/610133/less-half-americans-satisfied-own-lives.aspx"
}, {
  area: "Self-Worth / Esteem",
  falsebelief: "I'm just not good enough.",
  proof: "20% of UK adults report low self-esteem.",
  url: "https://www.ctpa.org.uk/blog/blog-ctpa-survey-reveals-uk-in-self-esteem-slump-top-eight-self-care-boosters-that-could-support-mental-health-6226"
}, {
  area: "Sense of Achievement",
  falsebelief: "Nothing I do really matters.",
  proof: "Globally, just 23% of employees are engaged, many feel their work doesn't matter.",
  url: "https://www.gallup.com/workplace/349484/state-of-the-global-workplace.aspx"
}, {
  area: "Contribution to Others",
  falsebelief: "I don't have time to help.",
  proof: "Only 16% of adults volunteer monthly.",
  url: "https://www.gov.uk/government/statistics/community-life-survey-202324-annual-publication/community-life-survey-202324-volunteering-and-charitable-giving"
}, {
  area: "Reflection",
  falsebelief: "Looking back just makes me sad.",
  proof: "Only 8% of people regularly keep a journal (U.S. data).",
  url: "https://habitbetter.com/top-ranked-benefits-of-journaling/"
}, {
  area: "Relationships",
  falsebelief: "That's just how we are now.",
  proof: "Approximately 33% of adults globally report regular feelings of loneliness (i.e. lacking meaningful connections with friends or family).",
  url: "https://www.aprilaba.com/resources/loneliness-statistics"
}];

// Component for collapsible table rows
const CollapsibleRow = ({
  item,
  icon: Icon,
  iconColor
}: {
  item: any;
  icon: any;
  iconColor: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border border-border/50 rounded-lg overflow-hidden bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
        <div className="p-4">
          {/* Always visible content */}
          <div className="flex items-center gap-3 mb-3">
            <Icon className={`w-5 h-5 ${iconColor}`} />
            <h4 className="font-semibold text-primary">{item.area}</h4>
          </div>
          
          <div className="mb-3">
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">{item.proof}</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors">
              View Source <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Collapsible trigger */}
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 w-full justify-center border-t border-border/30 pt-3">
              <span className="text-xs text-muted-foreground">
                {isOpen ? 'Hide' : 'Show'} False Belief
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          
          {/* Collapsible content */}
          <CollapsibleContent>
            <div className="mt-3 pt-3">
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                <h5 className="font-medium text-destructive mb-2 text-sm">The False Belief:</h5>
                <p className="text-sm text-destructive/80 italic">"{item.falsebelief}"</p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </div>
    </Collapsible>;
};
const FeelingStuck = () => {
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-8 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-white leading-tight">
              Where People Feel Stuck And Why
            </h1>
            <p className="text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">
              Below are the most common areas people get stuck, the false beliefs that keep them there, and the proof you're not alone.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Health Section */}
          <div className="mb-16">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Heart className="w-8 h-8 text-red-500" />
                  Health
                </CardTitle>
              </CardHeader>
            </Card>
            <div className="grid gap-4 md:gap-6">
              {healthData.map((item, index) => <CollapsibleRow key={index} item={item} icon={Heart} iconColor="text-red-500" />)}
            </div>
          </div>

          {/* Wealth Section */}
          <div className="mb-16">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  Wealth
                </CardTitle>
              </CardHeader>
            </Card>
            <div className="grid gap-4 md:gap-6">
              {wealthData.map((item, index) => <CollapsibleRow key={index} item={item} icon={DollarSign} iconColor="text-green-600" />)}
            </div>
          </div>

          {/* Happiness Section */}
          <div className="mb-16">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Smile className="w-8 h-8 text-yellow-500" />
                  Happiness
                </CardTitle>
              </CardHeader>
            </Card>
            <div className="grid gap-4 md:gap-6">
              {happinessData.map((item, index) => <CollapsibleRow key={index} item={item} icon={Smile} iconColor="text-yellow-500" />)}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-lg leading-relaxed text-primary">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-primary">
                Feeling Stuck? You're Not Alone
              </h2>
            </div>
            
            <div className="grid gap-6">
              <p className="text-center">
                Every decision you make creates a ripple effect. That ripple will either take you forward into a life where you flourish, or hold you back in a cycle where you feel stuck.
              </p>
              
              <p>
                Stuck looks different for everyone. For some it's constant tiredness, aches and pains, or struggling with sleep. For others it's money stress, debt, or never quite getting ahead. And for many, it's internal; a lack of purpose, strained relationships, or the sense that you're just going through the motions.
              </p>
              
              <p>
                Whatever form "stuck" takes, it always feels heavy. It slows you down. It clouds your decisions. It convinces you that change is too big or too overwhelming.
              </p>
              
              <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg">
                <p className="text-xl font-semibold text-accent mb-3">
                  But here's the truth: you don't need a dramatic leap to escape feeling stuck.
                </p>
                <p className="text-xl font-semibold text-accent">
                  All you need is to start redirecting your ripple effects one small daily win at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Good News Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-primary">
              The Good News: Stuck is Not Permanent
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Every false belief you've just read is exactly that — a belief, not the truth. And every statistic proves you're not broken — you're human, living in a system designed to keep people stuck.
              </p>
              <p>
                With Big Daddy's Big Tips, we break down these overwhelming problems into small, daily wins that ripple out across your health, wealth, and happiness.
              </p>
              <p className="text-xl font-semibold text-primary">
                You don't need to overhaul your entire life at once. You just need to start stacking the right habits.
              </p>
            </div>
          </div>

          <Card className="bg-primary text-white shadow-strong">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
                Your Next Step
              </h3>
              <p className="text-lg mb-6">
                Start your first daily win today.
              </p>
              <p className="mb-8">
                Download your free copy of the Big Daddy Foundation Blueprint and begin building ripple effects that move your life in the right direction.
              </p>
              <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-gray-100 border-white font-semibold" asChild>
                <Link to="/blueprint" className="flex items-center gap-2">
                  Download Foundation Blueprint
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>;
};
export default FeelingStuck;