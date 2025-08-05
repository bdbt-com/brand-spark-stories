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
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Truncate text functions
  const truncateText = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };
  
  const truncateTitle = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };
  
  // Only truncate when NOT expanded
  const displayTitle = isExpanded ? tip.title : truncateTitle(tip.title);
  const displayDescription = isExpanded ? tip.description : truncateText(tip.description);
  
  const titleNeedsTruncation = tip.title.length > 60;
  const descriptionNeedsTruncation = tip.description.length > 80;
  const anyContentNeedsTruncation = titleNeedsTruncation || descriptionNeedsTruncation || tip.items.length > 2;

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
    <Card className={`group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden bg-card border-2 hover:border-primary/20 flex flex-col ${isExpanded ? 'h-auto min-h-[520px]' : 'h-[520px]'}`}>
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
          {/* Header Section - Responsive Height */}
          <CardHeader className={`pb-4 flex-shrink-0 p-6 ${isExpanded ? 'h-auto' : 'h-[140px]'}`}>
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
            <div className={`flex flex-col items-center ${isExpanded ? 'h-auto min-h-[60px]' : 'h-[60px]'} overflow-hidden`}>
              <CardTitle className={`text-lg leading-tight group-hover:text-primary transition-colors text-center ${isExpanded ? 'line-clamp-none' : 'line-clamp-2'}`}>
                {displayTitle}
              </CardTitle>
            </div>
          </CardHeader>
          
          {/* Content Section */}
          <CardContent className="flex-1 flex flex-col p-6 pt-0">
            {/* Description Section */}
            <div className={`mb-4 ${isExpanded ? 'h-auto' : 'h-[60px]'} overflow-hidden`}>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {displayDescription}
              </p>
            </div>
            
            {/* Bullet Points Section */}
            <div className={`mb-4 ${isExpanded ? 'h-auto' : 'h-[60px]'} overflow-hidden`}>
              <ul className="space-y-1">
                {(isExpanded ? tip.items : tip.items.slice(0, 2)).map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-muted-foreground flex items-start">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="leading-tight">{isExpanded ? item : truncateText(item, 35)}</span>
                  </li>
                ))}
              </ul>
              {!isExpanded && tip.items.length > 2 && (
                <p className="text-xs text-muted-foreground/70 italic mt-2">
                  +{tip.items.length - 2} more insights included...
                </p>
              )}
            </div>
            
            {/* Read More Button */}
            {anyContentNeedsTruncation && (
              <div className="mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                  className="text-primary hover:text-primary/80 p-0 h-auto font-normal"
                >
                  {isExpanded ? (
                    <>
                      Read less <ChevronUp className="w-3 h-3 ml-1" />
                    </>
                  ) : (
                    <>
                      Read more <ChevronDown className="w-3 h-3 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            )}
            
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