import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Brain, Search, Lightbulb, Target, Loader2, ChevronDown, ChevronUp } from "lucide-react";
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
  onTipHighlight: (tipTitle: string) => void;
}

const AITipFinder = ({ tips, onTipHighlight }: AITipFinderProps) => {
  const [userInput, setUserInput] = useState("");
  const [recommendations, setRecommendations] = useState<TipRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
      setIsOpen(true);
      
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
    if (e.key === 'Enter') {
      e.preventDefault();
      analyzeAndRecommend();
    }
  };

  return (
    <div className="mb-8 max-w-4xl mx-auto">
      {/* Compact Header and Input */}
      <div className="bg-background/95 backdrop-blur-sm border border-primary/20 rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-lg font-semibold shrink-0">
            <Brain className="w-5 h-5 text-primary" />
            Find your custom solution
          </div>
          
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="Describe your goal or challenge..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={analyzeAndRecommend}
              disabled={isAnalyzing || !userInput.trim()}
              size="sm"
              className="gap-2 shrink-0"
            >
              {isAnalyzing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              {isAnalyzing ? "Analyzing..." : "Find Tips"}
            </Button>
          </div>
        </div>
      </div>

      {/* Collapsible Results Dropdown */}
      {recommendations.length > 0 && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full mt-2 justify-between bg-background/95 backdrop-blur-sm border-primary/20 hover:bg-muted/50"
            >
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span>Found {recommendations.length} personalized recommendations</span>
              </div>
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-2">
            <div className="bg-background/95 backdrop-blur-sm border border-primary/20 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              <div className="p-4 space-y-3">
                {recommendations.map((rec, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-md border bg-card/50 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => {
                      const element = document.querySelector(`[data-tip-title="${rec.title}"]`);
                      if (element) {
                        onTipHighlight(rec.title);
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setIsOpen(false);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                        <p className="text-xs text-muted-foreground">{rec.reason}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Lightbulb className="w-3 h-3 text-primary" />
                        <span className="text-xs font-medium">{rec.relevanceScore}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <p className="text-xs text-muted-foreground text-center pt-2 border-t">
                  Click any recommendation to jump to that tip below ↓
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default AITipFinder;