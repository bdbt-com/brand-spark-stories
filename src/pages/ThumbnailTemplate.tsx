import React, { useState, useEffect } from 'react';
import { Instagram, Youtube, Facebook } from 'lucide-react';

const ThumbnailTemplate = () => {
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);

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
      name: "Financial Health",
      title: "Your Quarterly Financial Health Check",
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
    }
  ];

  


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      {/* Thumbnail Container - Fixed 16:9 aspect ratio */}
      <div className="flex items-center justify-center min-h-screen p-8">
        
        {/* Template 1 - Parking Benefits */}
        {currentTemplateIndex === 0 && (
          <div className="relative">
            <div id="thumbnail-0" key="template-0" className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in">
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
          </div>
        )}

        {/* Template 2 - Dead Time */}
        {currentTemplateIndex === 1 && (
          <div className="relative">
            <div id="thumbnail-1" key="template-1" className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in">
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
          </div>
        )}

        {/* Template 3 - Financial Health */}
        {currentTemplateIndex === 2 && (
          <div className="relative">
            <div id="thumbnail-2" key="template-2" className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in">
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
                      Your Quarterly Financial
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Health Check
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

        {/* Template 4 - Hydration */}
        {currentTemplateIndex === 3 && (
          <div className="relative">
            <div id="thumbnail-3" key="template-3" className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in">
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
        {currentTemplateIndex === 4 && (
          <div className="relative">
            <div id="thumbnail-4" key="template-4" className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in">
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
        {currentTemplateIndex === 5 && (
          <div className="relative">
            <div id="thumbnail-5" key="template-5" className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in">
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
        {currentTemplateIndex === 6 && (
          <div className="relative">
            <div id="thumbnail-6" key="template-6" className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in">
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
        {currentTemplateIndex === 7 && (
          <div className="relative">
            <div id="thumbnail-7" key="template-7" className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in">
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
        {currentTemplateIndex === 8 && (
          <div className="relative">
            <div id="thumbnail-8" key="template-8" className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in">
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
        {currentTemplateIndex === 9 && (
          <div className="relative">
            <div id="thumbnail-9" key="template-9" className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in">
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

      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4 pb-16">
        {templates.map((template, index) => (
          <button
            key={template.id}
            onClick={() => setCurrentTemplateIndex(index)}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              currentTemplateIndex === index
                ? 'bg-white text-primary shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
            }`}
          >
            {template.name}
          </button>
        ))}
      </div>

      {/* YouTube Banner Art Section */}
      <div className="border-t border-white/20 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85">
        <div className="container mx-auto px-8 py-16">
          {/* Banner Preview Container */}
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-none relative">
              {/* YouTube Banner Template - Professional & YouTube-Ready */}
              <div id="youtube-banner" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-gradient-primary via-gradient-secondary to-gradient-accent shadow-elegant mx-auto">
                
                {/* Professional Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 z-0"></div>
                
                {/* Geometric Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full z-1">
                  {/* Clean geometric shapes for visual interest */}
                  <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
                  <div className="absolute top-40 right-32 w-48 h-48 bg-secondary/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-32 left-32 w-40 h-40 bg-accent/8 rounded-full blur-lg"></div>
                  <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/8 rounded-full blur-md"></div>
                  
                  {/* Subtle line elements */}
                  <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/15 to-transparent"></div>
                </div>

                <div className="h-full flex flex-col relative z-10">
                  
                  {/* Daily Wins Podcast - Top Section with Enhanced Typography */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-30 text-center">
                    <div className="glass-strong rounded-2xl px-8 py-6 border border-white/20 backdrop-blur-lg">
                      <h1 className="text-5xl font-black leading-none mb-3">
                        <span className="text-white block tracking-tight">
                          Daily Wins
                        </span>
                        <span className="block text-secondary font-black tracking-wide">
                          Podcast
                        </span>
                      </h1>
                      <div className="w-16 h-1 bg-gradient-to-r from-secondary to-accent mx-auto mb-3 rounded-full"></div>
                      <p className="text-white/90 text-lg font-medium leading-relaxed max-w-sm">
                        <span className="block">Transform Your Life</span>
                        <span className="block text-secondary/80">One Day at a Time</span>
                      </p>
                      <div className="mt-4 flex justify-center">
                        <div className="bg-gradient-to-r from-secondary to-accent text-white px-4 py-2 rounded-full text-sm font-bold tracking-wide shadow-glow">
                          NEW EPISODES DAILY
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Brand Section - Professional Layout */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-center">
                    
                    {/* Social Media Icons - Refined Design */}
                    <div className="flex justify-center items-center gap-6 mb-8">
                      <div className="group p-4 rounded-2xl glass border border-white/30 hover:border-secondary/50 transition-all duration-300 hover:shadow-glow cursor-pointer">
                        <Instagram className="w-7 h-7 text-white group-hover:text-secondary transition-colors duration-300" />
                      </div>
                      <div className="group p-4 rounded-2xl glass border border-white/30 hover:border-secondary/50 transition-all duration-300 hover:shadow-glow cursor-pointer">
                        <Youtube className="w-7 h-7 text-white group-hover:text-secondary transition-colors duration-300" />
                      </div>
                      <div className="group p-4 rounded-2xl glass border border-white/30 hover:border-secondary/50 transition-all duration-300 hover:shadow-glow cursor-pointer">
                        <Facebook className="w-7 h-7 text-white group-hover:text-secondary transition-colors duration-300" />
                      </div>
                      <div className="group p-4 rounded-2xl glass border border-white/30 hover:border-secondary/50 transition-all duration-300 hover:shadow-glow cursor-pointer">
                        <svg className="w-7 h-7 text-white group-hover:text-secondary transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Main Brand Name - Enhanced Typography */}
                    <div className="relative">
                      <h1 className="text-8xl font-black text-center leading-none tracking-tight">
                        <span className="text-white font-black">@BigDaddy's</span>
                        <span className="text-secondary font-black">BigTips</span>
                      </h1>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-secondary via-accent to-secondary rounded-full opacity-80"></div>
                    </div>

                    {/* Professional Tagline */}
                    <div className="mt-6 glass-strong rounded-xl px-6 py-3 border border-white/20 backdrop-blur-md">
                      <p className="text-white/90 text-xl font-semibold tracking-wide">
                        Success Strategies • Life Optimization • Daily Growth
                      </p>
                    </div>
                  </div>

                  {/* Bottom Content Grid - Professional Layout */}
                  <div className="absolute bottom-16 left-8 right-8 z-20">
                    <div className="grid grid-cols-3 gap-8">
                      <div className="glass rounded-2xl p-6 border border-white/20 backdrop-blur-lg hover:shadow-glow transition-all duration-300">
                        <img 
                          src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
                          alt="Success Stories"
                          className="w-full h-32 object-cover rounded-xl mb-4 opacity-90"
                        />
                        <h3 className="text-white font-bold text-lg mb-2">Success Stories</h3>
                        <p className="text-white/70 text-sm">Real transformations from our community</p>
                      </div>
                      <div className="glass rounded-2xl p-6 border border-white/20 backdrop-blur-lg hover:shadow-glow transition-all duration-300">
                        <img 
                          src="/lovable-uploads/8d06c526-bd08-42b7-9a4e-09be508119c7.png"
                          alt="Daily Tips"
                          className="w-full h-32 object-cover rounded-xl mb-4 opacity-90"
                        />
                        <h3 className="text-white font-bold text-lg mb-2">Daily Strategies</h3>
                        <p className="text-white/70 text-sm">Actionable tips for immediate results</p>
                      </div>
                      <div className="glass rounded-2xl p-6 border border-white/20 backdrop-blur-lg hover:shadow-glow transition-all duration-300">
                        <img 
                          src="/lovable-uploads/75853635-930c-4fa5-9403-d0b58c6db83b.png"
                          alt="Community"
                          className="w-full h-32 object-cover rounded-xl mb-4 opacity-90"
                        />
                        <h3 className="text-white font-bold text-lg mb-2">Join the Movement</h3>
                        <p className="text-white/70 text-sm">Connect with like-minded achievers</p>
                      </div>
                    </div>
                  </div>

                  {/* BDBT Logo - Enhanced Positioning */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40">
                    <div className="glass rounded-2xl p-4 border border-white/30 backdrop-blur-md">
                      <img 
                        src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                        alt="BDBT Logo"
                        className="h-12 opacity-95"
                      />
                    </div>
                  </div>

                  {/* Corner Accent Elements */}
                  <div className="absolute top-6 right-6 w-3 h-3 bg-secondary rounded-full animate-pulse z-20"></div>
                  <div className="absolute bottom-6 left-6 w-2 h-2 bg-accent rounded-full animate-pulse z-20 animation-delay-500"></div>
                  <div className="absolute top-6 left-6 w-2 h-2 bg-white/60 rounded-full animate-pulse z-20 animation-delay-1000"></div>
                  <div className="absolute bottom-6 right-6 w-3 h-3 bg-gradient-to-br from-secondary to-accent rounded-full animate-pulse z-20 animation-delay-1500"></div>
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