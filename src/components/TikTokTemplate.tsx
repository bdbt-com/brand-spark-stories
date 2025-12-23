import tikTokBg from "@/assets/tiktok-bg-daily-wins.png";
import tikTokBg1 from "@/assets/tiktok-bg-modern-world.png";
import tikTokBg2 from "@/assets/tiktok-bg-bdbt-explained.png";
import tikTokBg3 from "@/assets/tiktok-bg-template-4.png";
import tikTokBg4 from "@/assets/tiktok-bg-template-5.png";
import tikTokBg5 from "@/assets/tiktok-bg-template-6.png";
import tikTokBg6 from "@/assets/tiktok-bg-template-7.png";
import tikTokBg7 from "@/assets/tiktok-bg-template-8.png";
import tikTokBg8 from "@/assets/tiktok-bg-template-9.png";
import tikTokBg9 from "@/assets/tiktok-bg-template-10.png";
import { Instagram, Youtube } from "lucide-react";

interface TikTokTemplateProps {
  templateIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  className?: string;
}

export function TikTokTemplate({ templateIndex, className = "" }: TikTokTemplateProps) {
  const backgrounds = [tikTokBg, tikTokBg2, tikTokBg1, tikTokBg3, tikTokBg4, tikTokBg5, tikTokBg6, tikTokBg7, tikTokBg8, tikTokBg9];
  const backgroundImage = backgrounds[templateIndex];
  const showOverlay = templateIndex <= 2; // Only overlay for templates 0, 1, 2
  
  return (
    <div className={`w-[540px] h-[960px] relative overflow-hidden shadow-2xl animate-fade-in border-2 border-white ${className}`}>
      {/* Background Image - Full Background */}
      <img 
        src={backgroundImage} 
        alt="TikTok Background" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay for text readability - hidden for template 4 */}
      {showOverlay && <div className="absolute inset-0 bg-black/30"></div>}
      
      <div className="h-full flex flex-col p-8 relative">
        {/* Title text positioned above the logo */}
        <div className={`absolute ${templateIndex >= 3 ? 'top-[55%]' : 'top-[30%]'} left-8 right-8 transform -translate-y-1/2 text-center z-10`}>
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-4" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}>
            {templateIndex === 0 ? (
              <>
                <span className="text-white block">
                  The Modern World is
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Designed to Keep You Stuck
                </span>
              </>
            ) : templateIndex === 1 ? (
              <>
                <span className="text-white block">
                  Every choice is
                </span>
                <span className="block mt-1">
                  <span className="text-white">a </span>
                  <span style={{ color: 'hsl(35, 45%, 75%)' }}>Daily Win</span>
                </span>
                <span className="block mt-1">
                  <span className="text-white">or a </span>
                  <span style={{ color: 'hsl(35, 45%, 75%)' }}>Daily Drift</span>
                </span>
              </>
            ) : templateIndex === 2 ? (
              <span style={{ color: 'white' }}>
                BDBT <span style={{ color: 'hsl(35, 45%, 75%)' }}>Explained</span>
              </span>
            ) : templateIndex === 3 ? (
              <>
                <span className="text-white block">
                  Why We
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Stay Stuck
                </span>
              </>
            ) : templateIndex === 4 ? (
              <>
                <span className="text-white block">
                  The Harsh
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Truth
                </span>
              </>
            ) : templateIndex === 5 ? (
              <>
                <span className="text-white block">
                  Wins vs
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Drifts
                </span>
              </>
            ) : templateIndex === 6 ? (
              <>
                <span className="text-white block">
                  My
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Story
                </span>
              </>
            ) : templateIndex === 7 ? (
              <>
                <span className="text-white block">
                  Why The Old
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Model Fails
                </span>
              </>
            ) : templateIndex === 8 ? (
              <>
                <span className="text-white block">
                  What Is
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  BDBT?
                </span>
              </>
            ) : templateIndex === 9 ? (
              <>
                <span className="text-white block">
                  The
                </span>
                <span className="block mt-1" style={{ color: '#212C37' }}>
                  Invitation
                </span>
              </>
            ) : null}
          </h1>
        </div>

        {/* Bottom BDBT Logo with strong outline - kept visible */}
        <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2 z-30">
          <img 
            src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
            alt="BDBT Logo"
            className="h-16 opacity-90"
            style={{ 
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,1)) drop-shadow(0 0 4px rgba(255,255,255,0.8)) drop-shadow(2px 2px 4px rgba(0,0,0,0.8))',
            }}
          />
        </div>
        
        {/* Social Media Icons - Bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex gap-4 items-center">
            <Instagram className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))' }} />
            <Youtube className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))' }} />
          </div>
        </div>
      </div>
    </div>
  );
}