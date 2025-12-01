import React, { useState, useEffect } from 'react';
import { Instagram, Youtube, Facebook } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { TikTokTemplate } from '@/components/TikTokTemplate';
import spotifyLogo from "@/assets/spotify-logo.png";
import tikTokBg from "@/assets/tiktok-background.png";

const ThumbnailTemplate = () => {
  // Separate state management for YouTube and TikTok modes
  const [youTubeTemplateIndex, setYouTubeTemplateIndex] = useState(0);
  const [tikTokTemplateIndex, setTikTokTemplateIndex] = useState(0);
  const [youTubePhraseIndex, setYouTubePhraseIndex] = useState(0);
  const [tikTokPhraseIndex, setTikTokPhraseIndex] = useState(0);
  const [mode, setMode] = useState<'youtube' | 'instagram'>('youtube');

  const templates = [
    {
      id: 0,
      name: "Parking Benefits",
      title: "The Benefits of Parking Further Away from your Destination",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 1,
      name: "Dead Time",
      title: "The Benefits of making use of your Dead Time",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 2,
      name: "Wait 24 hours before clicking buy",
      title: "Wait 24 hours before clicking buy",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 3,
      name: "Hydration",
      title: "The Necessity of Staying Hydrated",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 4,
      name: "Healthy Snacks",
      title: "The Benefits of Buying Healthy Snacks in Bulk",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 5,
      name: "Morning Self-Care",
      title: "The Power of Smiling at Yourself",
      subtitle: "in The Mirror Every Morning",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 6,
      name: "Daily Movement",
      title: "The Benefits of Stretching",
      subtitle: "Daily for Your Body",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 7,
      name: "Mindfulness",
      title: "The Power of Meditating",
      subtitle: "for 2 Minutes Daily",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 8,
      name: "Fitness Micro-Habits",
      title: "The Benefits of 1 Minute",
      subtitle: "of Squats a Day",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 9,
      name: "Walking Phone Calls",
      title: "The Power of Walking",
      subtitle: "During Phone Calls",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 10,
      name: "Eating More Greens",
      title: "The Secret to Eating More Greens",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 11,
      name: "Swap Netflix for Podcasts",
      title: "Swap Netflix for Podcasts",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 12,
      name: "Always use a Shopping List",
      title: "Always use a Shopping List",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 13,
      name: "The Importance of Movement after Meals",
      title: "The Importance of Movement after Meals",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 14,
      name: "The Power of nature in your Daily Life",
      title: "The Power of nature in your Daily Life",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 15,
      name: "The Benefits of Protein in Every Meal",
      title: "The Benefits of Protein in Every Meal",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 16,
      name: "The Power of Only Taking the Stairs",
      title: "The Power of Only Taking the Stairs",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 17,
      name: "Healthy Savings from Store Brand Medicine",
      title: "Healthy Savings from Store Brand Medicine",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 18,
      name: "The Importance of Replacing your daily sugar intake",
      title: "The Importance of Replacing your daily sugar intake",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 19,
      name: "The Power of Amazon Subscribe & Save",
      title: "The Power of Amazon Subscribe & Save",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 20,
      name: "Control your posture, Control your day",
      title: "Control your posture, Control your day",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    }
  ];

  const tikTokTemplates = [
    {
      id: 0,
      name: "The Modern World is Designed to Keep You Stuck",
      title: "The Modern World is Designed to Keep You Stuck",
      subtitle: "",
      image: ""
    },
    {
      id: 1,
      name: "Every Choice is a Daily Win or a Daily Drift", 
      title: "Every Choice is a Daily Win or a Daily Drift",
      subtitle: "",
      image: ""
    },
    {
      id: 2,
      name: "BDBT Explained",
      title: "BDBT Explained",
      subtitle: "",
      image: ""
    }
  ];

  const phrases = [
    {
      id: 1,
      name: "What is BDBT?",
      whiteText: "What is",
      goldText: "BDBT",
      questionMark: "?",
      design: "large",
      textSize: "text-6xl lg:text-8xl",
      layout: "centered"
    },
    {
      id: 2,
      name: "How does it work?",
      whiteText: "How does it",
      goldText: "work",
      questionMark: "?",
      design: "large",
      textSize: "text-6xl lg:text-8xl",
      layout: "centered"
    },
    {
      id: 3,
      name: "Why does it work?",
      whiteText: "Why does it",
      goldText: "work",
      questionMark: "?",
      design: "large",
      textSize: "text-6xl lg:text-8xl",
      layout: "centered"
    },
    {
      id: 4,
      name: "Where?",
      whiteText: "Where",
      goldText: "",
      questionMark: "?",
      design: "large",
      textSize: "text-6xl lg:text-8xl",
      layout: "centered"
    },
    {
      id: 5,
      name: "When?",
      whiteText: "When",
      goldText: "",
      questionMark: "?",
      design: "large",
      textSize: "text-6xl lg:text-8xl",
      layout: "centered"
    }
  ];

  const tikTokPhrases = [
    {
      id: 1,
      name: "Stop Limiting Yourself",
      whiteText: "STOP",
      goldText: "LIMITING YOURSELF",
      questionMark: "",
      design: "large",
      textSize: "text-4xl lg:text-6xl",
      layout: "centered"
    },
    {
      id: 2,
      name: "This is Your Sign",
      whiteText: "THIS IS",
      goldText: "YOUR SIGN",
      questionMark: "",
      design: "large",
      textSize: "text-4xl lg:text-6xl",
      layout: "centered"
    },
    {
      id: 3,
      name: "Normalize Self Love",
      whiteText: "NORMALIZE",
      goldText: "SELF LOVE",
      questionMark: "",
      design: "large",
      textSize: "text-4xl lg:text-6xl",
      layout: "centered"
    },
    {
      id: 4,
      name: "Plot Twist",
      whiteText: "PLOT TWIST",
      goldText: "YOU WIN",
      questionMark: "",
      design: "large",
      textSize: "text-4xl lg:text-6xl",
      layout: "centered"
    },
    {
      id: 5,
      name: "Level Up",
      whiteText: "LEVEL UP",
      goldText: "YOUR LIFE",
      questionMark: "",
      design: "large",
      textSize: "text-4xl lg:text-6xl",
      layout: "centered"
    }
  ];

  // Helper functions to get current indices and arrays based on mode
  const currentTemplateIndex = mode === 'youtube' ? youTubeTemplateIndex : tikTokTemplateIndex;
  const currentPhraseIndex = mode === 'youtube' ? youTubePhraseIndex : tikTokPhraseIndex;
  const currentTemplates = mode === 'youtube' ? templates : tikTokTemplates;
  const currentPhrases = mode === 'youtube' ? phrases : tikTokPhrases;
  
  // Handler functions for template and phrase selection
  const handleTemplateSelect = (index: number) => {
    if (mode === 'youtube') {
      setYouTubeTemplateIndex(index);
    } else {
      setTikTokTemplateIndex(index);
    }
  };
  
  const handlePhraseSelect = (index: number) => {
    if (mode === 'youtube') {
      setYouTubePhraseIndex(index);
    } else {
      setTikTokPhraseIndex(index);
    }
  };

  


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      {/* Mode Selection Toggle */}
      <div className="flex justify-center pt-8 pb-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-1">
          <button
            onClick={() => setMode('youtube')}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              mode === 'youtube'
                ? 'bg-white text-primary shadow-md'
                : 'text-white hover:bg-white/20'
            }`}
          >
            YouTube (16:9)
          </button>
          <button
            onClick={() => setMode('instagram')}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              mode === 'instagram'
                ? 'bg-white text-primary shadow-md'
                : 'text-white hover:bg-white/20'
            }`}
          >
            Instagram/TikTok (9:16)
          </button>
        </div>
      </div>
      
      {/* Thumbnail Container */}
      <div className="flex items-center justify-center min-h-screen p-8">
        
        {/* Template 1 - Parking Benefits */}
        {currentTemplateIndex === 0 && (
          <div className="relative">
            {mode === 'youtube' ? (
              <div id="thumbnail-0" key="template-0-youtube" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
                <div className="h-full flex items-center p-16 relative">
                  <div className="absolute right-16 top-16 bottom-16 flex items-center">
                    <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                      <img 
                        src={templates[0].image} 
                        alt="Podcast thumbnail"
                        className="w-full h-full object-cover border-4 border-white/20"
                      />
                      <div className="absolute bottom-4 left-4">
                        <img 
                          src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                          alt="BDBT Logo"
                          className="h-16 opacity-90"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                    <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                      <span className="text-white block mb-2">
                        The Benefits of Parking Further Away
                      </span>
                      <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                        from your Destination
                      </span>
                    </h1>
                    <p className="text-white/80 text-3xl font-medium">
                      Daily Wins Podcast
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <TikTokTemplate templateIndex={currentTemplateIndex as 0 | 1 | 2} />
            )}
          </div>
        )}

        {/* Template 2 - Dead Time */}
        {currentTemplateIndex === 1 && (
          <div className="relative">
            {mode === 'youtube' ? (
              <div id="thumbnail-1" key="template-1-youtube" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
                <div className="h-full flex items-center p-16 relative">
                  <div className="absolute right-16 top-16 bottom-16 flex items-center">
                    <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                      <img 
                        src={templates[1].image} 
                        alt="Podcast thumbnail"
                        className="w-full h-full object-cover border-4 border-white/20"
                      />
                      <div className="absolute bottom-4 left-4">
                        <img 
                          src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                          alt="BDBT Logo"
                          className="h-16 opacity-90"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                    <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                      <span className="text-white block mb-2">
                        The Benefits of making use
                      </span>
                      <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                        of your Dead Time
                      </span>
                    </h1>
                    <p className="text-white/80 text-3xl font-medium">
                      Daily Wins Podcast
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <TikTokTemplate templateIndex={currentTemplateIndex as 0 | 1 | 2} />
            )}
          </div>
        )}

        {/* Template 3 - Wait 24 hours before clicking buy */}
        {currentTemplateIndex === 2 && (
          <div className="relative">
            {mode === 'youtube' ? (
              <div id="thumbnail-2" key="template-2-youtube" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
                <div className="h-full flex items-center p-16 relative">
                  <div className="absolute right-16 top-16 bottom-16 flex items-center">
                    <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                      <img 
                        src={templates[2].image} 
                        alt="Podcast thumbnail"
                        className="w-full h-full object-cover border-4 border-white/20"
                      />
                      <div className="absolute bottom-4 left-4">
                        <img 
                          src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                          alt="BDBT Logo"
                          className="h-16 opacity-90"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                    <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                      <span className="text-white block mb-2">
                        Wait 24 hours
                      </span>
                      <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                        before clicking buy
                      </span>
                    </h1>
                    <p className="text-white/80 text-3xl font-medium">
                      Daily Wins Podcast
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <TikTokTemplate templateIndex={currentTemplateIndex as 0 | 1 | 2} />
            )}
          </div>
        )}

        {/* Template 4 - Hydration */}
        {currentTemplateIndex === 3 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-3" key="template-3-youtube" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[3].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      The Necessity
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      of Staying Hydrated
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 5 - Healthy Snacks */}
        {currentTemplateIndex === 4 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-4" key="template-4" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[4].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      The Benefits of Buying Healthy
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Snacks in Bulk
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 6 - Morning Self-Care */}
        {currentTemplateIndex === 5 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-5" key="template-5" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[5].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      The Power of Smiling at Yourself
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      in The Mirror Every Morning
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 7 - Daily Movement */}
        {currentTemplateIndex === 6 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-6" key="template-6" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[6].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      The Benefits of Stretching
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Daily for Your Body
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 8 - Mindfulness */}
        {currentTemplateIndex === 7 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-7" key="template-7" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[7].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      The Power of Meditating
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      for 2 Minutes Daily
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 9 - Fitness Micro-Habits */}
        {currentTemplateIndex === 8 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-8" key="template-8" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[8].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      The Benefits of 1 Minute
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      of Squats a Day
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 10 - Walking Phone Calls */}
        {currentTemplateIndex === 9 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-9" key="template-9" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[9].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      The Power of Walking
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      During Phone Calls
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Template - The Secret to Eating More Greens */}
        {currentTemplateIndex === 10 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-10" key="template-10" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[10].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      The Secret to Eating
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      More Greens
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 12 - Swap Netflix for Podcasts */}
        {currentTemplateIndex === 11 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-11" key="template-11" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[11].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      Swap Netflix
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      for Podcasts
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 13 - Always use a Shopping List */}
        {currentTemplateIndex === 12 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-12" key="template-12" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[12].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      Always use a
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Shopping List
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 14 - The Importance of Movement after Meals */}
        {currentTemplateIndex === 13 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-13" key="template-13" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[13].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      The Importance of Movement
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      after Meals
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 15 - The Power of nature in your Daily Life */}
        {currentTemplateIndex === 14 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-14" key="template-14" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[14].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      The Power of nature in
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      your Daily Life
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 16 - The Benefits of Protein in Every Meal */}
        {currentTemplateIndex === 15 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-15" key="template-15" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[15].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      The Benefits of Protein in
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Every Meal
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 17 - The Power of Only Taking the Stairs */}
        {currentTemplateIndex === 16 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-16" key="template-16" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[16].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      The Power of Only Taking
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      the Stairs
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 18 - Healthy Savings from Store Brand Medicine */}
        {currentTemplateIndex === 17 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-17" key="template-17" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[17].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      Healthy Savings from Store
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Brand Medicine
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 19 - The Importance of Replacing your daily sugar intake */}
        {currentTemplateIndex === 18 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-18" key="template-18" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[18].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      The Importance of Replacing
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      your daily sugar intake
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 20 - The Power of Amazon Subscribe & Save */}
        {currentTemplateIndex === 19 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-19" key="template-19" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[19].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      The Power of Amazon
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Subscribe & Save
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 21 - Control your posture, Control your day */}
        {currentTemplateIndex === 20 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-20" key="template-20" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[20].image} 
                      alt="Podcast thumbnail"
                      className="w-full h-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-16 opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">
                      Control your posture,
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Control your day
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Template Selection Carousel */}
      <div className="pb-16 px-8">
        <h3 className="text-white text-xl font-semibold text-center mb-6">
          Choose a Template ({mode === 'youtube' ? 'YouTube 16:9' : 'Instagram/TikTok 9:16'})
        </h3>
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {currentTemplates.map((template, index) => (
              <CarouselItem key={template.id} className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5">
                <button
                  onClick={() => handleTemplateSelect(index)}
                  className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    currentTemplateIndex === index
                      ? 'bg-white text-primary shadow-lg scale-105'
                      : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
                  }`}
                >
                  {index + 1}. {template.name}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white border-white/30 hover:bg-white/20" />
          <CarouselNext className="text-white border-white/30 hover:bg-white/20" />
        </Carousel>
      </div>


      {/* Chroma Key Green Section for Video Subtitles/Headings */}
      <div className="w-full py-20 px-8 flex justify-center">
        <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl border-4 border-white/20 p-16 bg-gradient-to-br from-primary via-primary/90 to-primary/80">
          {/* Dynamic Phrase Content */}
          <div className={`flex items-center justify-center min-h-[200px] ${
            currentPhrases[currentPhraseIndex].layout === 'left' ? 'justify-start' : 
            currentPhrases[currentPhraseIndex].layout === 'right' ? 'justify-end' : 'justify-center'
          }`}>
            <div className={`${currentPhrases[currentPhraseIndex].layout === 'centered' ? 'text-center' : 
              currentPhrases[currentPhraseIndex].layout === 'left' ? 'text-left' : 'text-right'
            }`}>
               <h1 className={`${currentPhrases[currentPhraseIndex].textSize} font-black leading-tight font-black`}>
                <span className="text-white">{currentPhrases[currentPhraseIndex].whiteText}</span>
                {currentPhrases[currentPhraseIndex].goldText && (
                  <span className="ml-3" style={{ color: 'hsl(35, 45%, 75%)' }}>
                    {currentPhrases[currentPhraseIndex].goldText}
                  </span>
                )}
                <span className="text-white">{currentPhrases[currentPhraseIndex].questionMark}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Phrase Selection Carousel */}
      <div className="w-full bg-gray-50 py-8">
        <div className="container mx-auto px-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Choose Your Phrase</h3>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {currentPhrases.map((phrase, index) => (
                <CarouselItem key={index} className="pl-4 basis-1/1 md:basis-1/2 lg:basis-1/3">
                  <Card 
                    className={`cursor-pointer transition-all duration-200 ${
                      index === currentPhraseIndex 
                        ? 'ring-2 ring-primary shadow-lg' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handlePhraseSelect(index)}
                  >
                    <CardContent className="p-6">
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-600 mb-2">Preview:</div>
                          <div className={`${phrase.textSize === 'text-6xl' ? 'text-lg' : 'text-base'} font-black leading-tight`}>
                            <span className="text-gray-800">{phrase.whiteText}</span>
                            {phrase.goldText && (
                              <span className="ml-1 text-yellow-600">{phrase.goldText}</span>
                            )}
                            <span className="text-gray-800">{phrase.questionMark}</span>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-800 text-center">
                        {phrase.whiteText}{phrase.goldText && ` ${phrase.goldText}`}{phrase.questionMark}
                      </h4>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>

      {/* New Banner Art Template */}
      <div className="border-t border-white/20 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85">
        <div className="container mx-auto px-8 py-16">
          {/* Banner Preview Container */}
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-none relative">
              {/* New Banner Template - Optimized 2560x1440 dimensions */}
              <div id="new-banner" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary/80 shadow-2xl mx-auto">
                <div className="h-full flex flex-col p-16 relative">
                  
                  {/* Social Media Icons at very top */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
                    <div className="flex justify-center items-center gap-8 mb-6">
                      <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <Instagram className="w-6 h-6 text-white" />
                      </div>
                      <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <Youtube className="w-6 h-6 text-white" />
                      </div>
                      <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <Facebook className="w-6 h-6 text-white" />
                      </div>
                      <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Daily Wins Podcast - Below icons */}
                  <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-30 text-center">
                    <h1 className="text-4xl font-bold leading-tight mb-4">
                      <span className="text-white block">
                        Daily Wins
                      </span>
                      <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                        Podcast
                      </span>
                    </h1>
                  </div>

                  {/* BDBT Logo - Centered above the text */}
                  <div className="absolute top-77 left-1/2 transform -translate-x-1/2 z-30">
                  <img 
                    src="/lovable-uploads/bdbt-logo-transparent.png" 
                    alt="BDBT Logo" 
                    className="h-8 object-contain opacity-80"
                  />
                  </div>

                  {/* Social Media Icons - Left Side (Instagram and YouTube) */}
                  <div className="absolute top-78 left-1/2 -translate-x-20 z-30 flex gap-3 items-center">
                    <Instagram className="w-6 h-6 text-white" />
                    <Youtube className="w-6 h-6 text-white" />
                  </div>

                  {/* Social Media Icons - Right Side (Facebook and Spotify) */}
                  <div className="absolute top-78 left-1/2 translate-x-14 z-30 flex gap-3 items-center">
                    <Facebook className="w-6 h-6 text-white" />
                    <img src={spotifyLogo} alt="Spotify" className="w-6 h-6" />
                  </div>

                  {/* @BigDaddysBigTips - Centered between podcast title and images */}
                  <div className="absolute top-80 left-1/2 transform -translate-x-1/2 z-30">
                    <h1 className="text-5xl xl:text-6xl font-black text-center leading-tight whitespace-nowrap">
                      <span className="text-white font-black">@BigDaddys</span><span className="font-black" style={{ color: 'hsl(35, 45%, 75%)' }}>BigTips</span>
                    </h1>
                  </div>

                  {/* 3 Images at bottom */}
                  <div className="absolute bottom-12 left-8 right-8 z-10">
                    <div className="flex gap-6 justify-between">
                      <div className="w-96 h-64 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg">
                        <img 
                          src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
                          alt="Featured Image 1"
                          className="w-full h-full object-cover opacity-80"
                        />
                      </div>
                      <div className="w-96 h-64 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg">
                        <img 
                          src="/lovable-uploads/8d06c526-bd08-42b7-9a4e-09be508119c7.png"
                          alt="Featured Image 2"
                          className="w-full h-full object-cover opacity-80"
                        />
                      </div>
                      <div className="w-96 h-64 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg">
                        <img 
                          src="/lovable-uploads/75853635-930c-4fa5-9403-d0b58c6db83b.png"
                          alt="Featured Image 3"
                          className="w-full h-full object-cover opacity-80"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ThumbnailTemplate;