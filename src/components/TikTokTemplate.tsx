import tikTokBg from "@/assets/tiktok-background.png";
import tikTokBg1 from "@/assets/tiktok-bg-template-2.png";
import tikTokBg2 from "@/assets/tiktok-bg-template-3.png";
import { Instagram, Youtube } from "lucide-react";

interface TikTokTemplateProps {
  templateIndex: 0 | 1 | 2;
  className?: string;
}

export function TikTokTemplate({ templateIndex, className = "" }: TikTokTemplateProps) {
  const backgroundImage = templateIndex === 0 ? tikTokBg : templateIndex === 1 ? tikTokBg1 : tikTokBg2;
  
  return (
    <div className={`w-[540px] h-[960px] relative overflow-hidden rounded-3xl shadow-2xl animate-fade-in border-2 border-white ${className}`}>
      {/* Background Image - Full Background */}
      <img 
        src={backgroundImage} 
        alt="TikTok Background" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 rounded-3xl"></div>
      
      <div className="h-full flex flex-col p-8 relative">
        {/* Title text positioned above the logo */}
        <div className="absolute top-[30%] left-8 right-8 transform -translate-y-1/2 text-center z-10">
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
                <span style={{ color: 'white' }}>
                  Every Choice is a <span style={{ color: 'hsl(35, 45%, 75%)' }}>Daily</span> <span style={{ color: 'hsl(35, 45%, 75%)' }}>Win</span>
                </span>
                <span style={{ color: 'white' }} className="block mt-1">
                  <span style={{ color: 'white' }}>or</span> <span style={{ color: 'white' }}>a</span> <span style={{ color: 'hsl(35, 45%, 75%)' }}>Daily</span> <span style={{ color: 'hsl(35, 45%, 75%)' }}>Drift</span>
                </span>
              </>
            ) : templateIndex === 2 ? (
              <span style={{ color: 'white' }}>
                BDBT <span style={{ color: 'hsl(35, 45%, 75%)' }}>Explained</span>
              </span>
            ) : null}
          </h1>
        </div>

        {/* Bottom BDBT Logo with strong outline - kept visible */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30">
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