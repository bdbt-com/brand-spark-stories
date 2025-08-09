import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Search, Lightbulb, Target, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TipRecommendation {
  title: string;
  category: string;
  relevanceScore: number;
  reason: string;
}

interface AITipFinderProps {
  tips: Array<{
    title: string;
    description: string;
    category: string;
    items: string[];
  }>;
}

const AITipFinder = ({ tips }: AITipFinderProps) => {
  const [userInput, setUserInput] = useState("");
  const [recommendations, setRecommendations] = useState<TipRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeAndRecommend = async () => {
    if (!userInput.trim()) {
      toast({
        title: "Please describe your goal or problem",
        description: "Enter what you'd like help with to get personalized recommendations.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis with a more sophisticated matching algorithm
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const keywords = userInput.toLowerCase().split(/\s+/);
      const scored = tips.map(tip => {
        let score = 0;
        const searchText = `${tip.title} ${tip.description} ${tip.items.join(' ')}`.toLowerCase();
        
        // Keyword matching
        keywords.forEach(keyword => {
          if (searchText.includes(keyword)) score += 2;
          if (tip.title.toLowerCase().includes(keyword)) score += 3;
        });
        
        // Category-specific scoring
        if (userInput.toLowerCase().includes('money') || userInput.toLowerCase().includes('save') || userInput.toLowerCase().includes('budget')) {
          if (tip.category === 'wealth') score += 5;
        }
        if (userInput.toLowerCase().includes('exercise') || userInput.toLowerCase().includes('health') || userInput.toLowerCase().includes('fit')) {
          if (tip.category === 'health') score += 5;
        }
        if (userInput.toLowerCase().includes('happy') || userInput.toLowerCase().includes('stress') || userInput.toLowerCase().includes('mood')) {
          if (tip.category === 'happiness') score += 5;
        }
        
        return {
          title: tip.title,
          category: tip.category,
          relevanceScore: score,
          reason: score > 5 ? "Highly relevant to your goal" : score > 2 ? "Good match for your needs" : "May be helpful"
        };
      })
      .filter(tip => tip.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 6);

      setRecommendations(scored);
      
      if (scored.length === 0) {
        toast({
          title: "No specific matches found",
          description: "Try describing your goal differently, or browse all tips below.",
        });
      }
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      analyzeAndRecommend();
    }
  };

  return (
    <Card className="mb-12 border-primary/20 bg-gradient-to-br from-background to-muted/30 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-3 text-2xl">
          <Brain className="w-7 h-7 text-primary" />
          AI Tip Finder
        </CardTitle>
        <CardDescription className="text-base max-w-2xl mx-auto">
          Describe what you're trying to achieve or a challenge you're facing, and I'll recommend 
          the most relevant tips from our catalog just for you.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="e.g., 'I want to save more money but keep overspending' or 'I need motivation to exercise consistently'"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="min-h-[100px] text-base resize-none pr-12"
              maxLength={500}
            />
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
              {userInput.length}/500
            </div>
          </div>
          
          <Button 
            onClick={analyzeAndRecommend}
            disabled={isAnalyzing || !userInput.trim()}
            className="w-full h-12 text-base gap-3"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing your needs...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Find My Perfect Tips
              </>
            )}
          </Button>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Recommended for You</h3>
            </div>
            
            <div className="grid gap-3">
              {recommendations.map((rec, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    const element = document.querySelector(`[data-tip-title="${rec.title}"]`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{rec.reason}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {rec.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Lightbulb className="w-3 h-3 text-primary" />
                        <span className="text-xs font-medium">{rec.relevanceScore}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground text-center mt-4">
              Click any recommendation to jump to that tip below ↓
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AITipFinder;