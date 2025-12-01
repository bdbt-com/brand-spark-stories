import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, TrendingUp, Download, ChevronDown, ChevronUp } from "lucide-react";
import EmailCaptureForm from "./EmailCaptureForm";
import { getGuideUrl } from "@/data/guideMapping";

interface TipCardProps {
  tip: {
    icon: React.ElementType;
    title: string;
    description: string;
    items: string[];
    level: string;
    duration: string;
    category: string;
    popularity: number;
    views: number;
  };
  index: number;
  downloadCount?: number;
}

const TipCard = ({ tip, index, downloadCount }: TipCardProps) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const guideUrl = getGuideUrl(tip.title);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "health": return "bg-success/10 text-success border-success/20";
      case "wealth": return "bg-warning/10 text-warning border-warning/20";
      case "happiness": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Essential": return "bg-gradient-primary text-primary-foreground";
      case "Beginner": return "bg-success/20 text-success dark:bg-success/10";
      case "Easy": return "bg-success/20 text-success dark:bg-success/10";
      case "Intermediate": return "bg-warning/20 text-warning dark:bg-warning/10";
      case "Moderate": return "bg-warning/20 text-warning dark:bg-warning/10";
      case "Advanced": return "bg-destructive/20 text-destructive dark:bg-destructive/10";
      default: return "bg-muted/20 text-muted-foreground dark:bg-muted/10";
    }
  };

  return (
    <Card className="group hover-lift-strong interactive cursor-pointer relative overflow-hidden border-2 hover:border-primary/30 flex flex-col h-full min-h-[520px] md:min-h-[560px] shadow-soft">
      {/* Download counter in top-left */}
      {downloadCount !== undefined && (
        <span className="absolute top-2 left-2 text-xs text-muted-foreground/40 font-mono z-10">
          {downloadCount}
        </span>
      )}
      
      {showEmailForm && guideUrl ? (
        <CardContent className="p-6 flex-1 flex items-center justify-center">
          <div className="w-full max-w-md mx-auto">
            <EmailCaptureForm
              title={tip.title}
              guideDownloadUrl={guideUrl}
              onClose={() => setShowEmailForm(false)}
              compact={false}
            />
          </div>
        </CardContent>
      ) : (
        <>
          {/* Header Section */}
          <CardHeader className="pb-4 flex-shrink-0 p-6 h-auto">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft group-hover:shadow-medium">
                <tip.icon className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="flex flex-col items-center h-auto min-h-[60px]">
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors text-center break-words font-semibold">
                {tip.title}
              </CardTitle>
            </div>
          </CardHeader>
          
          {/* Content Section */}
          <CardContent className="flex-1 flex flex-col p-6 pt-0">
            {/* Description Section */}
            <div className="mb-6 h-auto">
              <p className="text-primary text-sm leading-relaxed">
                {tip.description}
              </p>
            </div>
            
            {/* Bullet Points Section */}
            <div className="mb-6 h-auto">
              <ul className="space-y-2">
                {tip.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-primary flex items-start">
                    <span className="w-2 h-2 bg-gradient-primary rounded-full mt-1.5 mr-3 flex-shrink-0 shadow-xs"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Button Section - Fixed to bottom */}
            <div className="mt-auto space-y-4">
              <Button 
                size="default" 
                variant="accent" 
                className="w-full h-11 hover-scale-sm shadow-soft group-hover:shadow-medium"
                onClick={() => setShowEmailForm(true)}
              >
                Download Guide 
                <Download className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default TipCard;