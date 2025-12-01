import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Target } from "lucide-react";
import { Link } from "react-router-dom";
import EmailCaptureForm from "@/components/EmailCaptureForm";
import { getGuideUrl } from "@/data/guideMapping";
import { useDownloadCounts } from "@/hooks/useDownloadCounts";
const Blueprint = () => {
  const [showEmailForm, setShowEmailForm] = useState(true);
  const guideUrl = getGuideUrl("BDBT Foundation Blueprint");
  const { data: downloadCounts } = useDownloadCounts();
  const blueprintCount = downloadCounts?.["BDBT Foundation Blueprint"] || 0;
  return <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            
            <h1 className="text-3xl font-bold text-primary">Get your Free Copy of the Foundation Blueprint here:

          </h1>
          </div>

          {/* Email capture form - visible above document */}
          {showEmailForm && guideUrl && (
            <Card className="mb-16 border-2 border-primary/20 bg-background shadow-strong">
              <CardContent className="pt-6">
                <EmailCaptureForm
                  title="BDBT Foundation Blueprint"
                  guideDownloadUrl={guideUrl}
                  onClose={() => setShowEmailForm(false)}
                  compact={false}
                />
              </CardContent>
            </Card>
          )}
          
          <Card className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 relative overflow-hidden bg-gradient-subtle border-2 border-primary/20 hover:border-warning/30">
            {/* Download counter in top-left */}
            {blueprintCount > 0 && (
              <span className="hidden absolute top-2 left-2 text-xs text-muted-foreground/40 font-mono z-10">
                {blueprintCount}
              </span>
            )}
            
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl leading-snug group-hover:text-primary transition-colors text-center text-primary">
                Big Daddy's Foundation Blueprint
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 text-center">
                <ul className="space-y-2 max-w-md mx-auto text-left">
                  <li className="text-sm text-primary flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    Spot your Daily Drifts
                  </li>
                  <li className="text-sm text-primary flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    Find suggestions for Daily Wins
                  </li>
                  <li className="text-sm text-primary flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    Track your new habits
                  </li>
                  <li className="text-sm text-primary flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    Document your progress
                  </li>
                  <li className="text-sm text-primary flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    Your ultimate reference point for your BDBT journey
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-primary text-center">Key Takeaways:</p>
                <ul className="space-y-2 max-w-md mx-auto">
                  <li className="text-sm text-primary flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    Momentum is greater than motivation
                  </li>
                  <li className="text-sm text-primary flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    A system that works even when your motivation doesn't
                  </li>
                  <li className="text-sm text-primary flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    Apply to your unique life
                  </li>
                  <li className="text-sm text-primary flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    Benefit from the positive ripple effects
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* CTA Section */}
          <div className="mt-20 text-center bg-warning text-white rounded-2xl p-6 sm:p-12 border-4 border-warning/40">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              Start Building Your Foundation Today
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto px-4">
              With your blueprint in hand, explore our complete tip library to maximize your transformation.
            </p>
            <div className="flex justify-center">
              <Button variant="colored-bg" size="lg" asChild className="w-full sm:w-auto max-w-sm">
                <Link to="/tips">Explore All Tips</Link>
              </Button>
            </div>
          </div>
          
        </div>
      </div>
    </div>;
};
export default Blueprint;