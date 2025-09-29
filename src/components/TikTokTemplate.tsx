import tikTokBackground from "@/assets/tiktok-background.png";
import bdbtLogoTransparent from "@/assets/bdbt-logo-transparent.png";

interface TikTokTemplateProps {
  templateIndex: 0 | 1 | 2;
  className?: string;
}

export function TikTokTemplate({ templateIndex, className = "" }: TikTokTemplateProps) {
  const renderTitle = () => {
    switch (templateIndex) {
      case 0:
        return (
          <>
            <span style={{ color: 'white' }} className="block">
              The Modern World is
            </span>
            <span style={{ color: 'hsl(35, 45%, 75%)' }} className="block mt-1">
              Designed to Keep You Stuck
            </span>
          </>
        );
      case 1:
        return (
          <>
            <span style={{ color: 'white' }}>
              Every Choice is a <span style={{ color: 'hsl(35, 45%, 75%)' }}>Daily</span> <span style={{ color: 'hsl(35, 45%, 75%)' }}>Win</span>
            </span>
            <span style={{ color: 'white' }} className="block mt-1">
              <span style={{ color: 'white' }}>or</span> <span style={{ color: 'white' }}>a</span> <span style={{ color: 'hsl(35, 45%, 75%)' }}>Daily</span> <span style={{ color: 'hsl(35, 45%, 75%)' }}>Drift</span>
            </span>
          </>
        );
      case 2:
        return (
          <span style={{ color: 'white' }}>
            BDBT <span style={{ color: 'hsl(35, 45%, 75%)' }}>Explained</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden ${className}`}>
      {/* Background Image */}
      <img
        src={tikTokBackground}
        alt="TikTok Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Title text positioned above the logo */}
      <div className="absolute top-[30%] left-8 right-8 transform -translate-y-1/2 text-center z-10">
        <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-4" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}>
          {renderTitle()}
        </h1>
      </div>

      {/* BDBT Logo */}
      <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 z-10">
        <img
          src={bdbtLogoTransparent}
          alt="BDBT Logo"
          className="w-24 h-24 object-contain"
        />
      </div>

      {/* Social Media Icons */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-10">
        <img
          src="/social-icons-right.png"
          alt="Social Media Icons"
          className="w-12 h-auto object-contain"
        />
      </div>

      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-10">
        <img
          src="/social-icons-left.png"
          alt="Social Media Icons"
          className="w-12 h-auto object-contain"
        />
      </div>
    </div>
  );
}