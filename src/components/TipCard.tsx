import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, TrendingUp, Download, ChevronDown, ChevronUp } from "lucide-react";
import EmailCaptureForm from "./EmailCaptureForm";

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
}

const TipCard = ({ tip, index }: TipCardProps) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isTitleExpanded, setIsTitleExpanded] = useState(false);
  
  // Truncate text functions
  const truncateText = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };
  
  const truncateTitle = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };
  
  const displayDescription = isDescriptionExpanded 
    ? tip.description 
    : truncateText(tip.description);
  
  const displayTitle = isTitleExpanded 
    ? tip.title 
    : truncateTitle(tip.title);
  
  const titleNeedsTruncation = tip.title.length > 60;
  const needsTruncation = tip.description.length > 80;

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
    <Card className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden bg-card border-2 hover:border-primary/20 h-[520px] flex flex-col">
      {showEmailForm ? (
        <CardContent className="p-6 flex-1 flex items-center">
          <EmailCaptureForm
            title={tip.title}
            onClose={() => setShowEmailForm(false)}
            compact={true}
          />
        </CardContent>
      ) : (
        <>
          {/* Fixed Header Section - 140px */}
          <CardHeader className="pb-4 flex-shrink-0 h-[140px] p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <tip.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Badge className={`${getCategoryColor(tip.category)} text-xs font-medium`} variant="outline">
                  {tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}
                </Badge>
                <Badge className={`${getLevelColor(tip.level)} text-xs font-medium`} variant="outline">
                  {tip.level}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors text-center">
                {displayTitle}
              </CardTitle>
              {titleNeedsTruncation && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsTitleExpanded(!isTitleExpanded);
                  }}
                  className="mt-1 text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  {isTitleExpanded ? (
                    <>
                      Show less <ChevronUp className="w-3 h-3" />
                    </>
                  ) : (
                    <>
                      Show more <ChevronDown className="w-3 h-3" />
                    </>
                  )}
                </button>
              )}
            </div>
          </CardHeader>
          
          {/* Flexible Content Section */}
          <CardContent className="flex-1 flex flex-col p-6 pt-0">
            {/* Description Section - Fixed height */}
            <div className="mb-4 h-[80px] overflow-hidden">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {truncateText(tip.description, 120)}
              </p>
            </div>
            
            {/* Bullet Points Section - Fixed height */}
            <div className="mb-4 h-[80px] overflow-hidden">
              <ul className="space-y-2">
                {tip.items.slice(0, 2).map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-muted-foreground flex items-start">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="leading-tight">{truncateText(item, 50)}</span>
                  </li>
                ))}
                {tip.items.length > 2 && (
                  <li className="text-xs text-muted-foreground/70 italic">
                    +{tip.items.length - 2} more insights included...
                  </li>
                )}
              </ul>
            </div>
            
            {/* Stats and Button Section - Fixed to bottom */}
            <div className="mt-auto space-y-4">
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {tip.duration}
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {tip.views}
                  </span>
                  <span className="flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {tip.popularity}%
                  </span>
                </div>
              </div>

              <Button 
                size="sm" 
                variant="hero" 
                className="w-full h-10 group-hover:shadow-medium transition-all duration-200 hover:scale-[1.02]"
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