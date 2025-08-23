import React, { useState, useEffect } from 'react';

const ThumbnailTemplate = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  const carouselTemplates = [
    {
      id: 0,
      name: "Parking Benefits",
      layout: "single",
      title: "The Benefits of Parking Further Away from your Destination",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 1,
      name: "Dead Time",
      layout: "single",
      title: "The Benefits of making use of your Dead Time",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 2,
      name: "Financial Health",
      layout: "single",
      title: "Your Quarterly Financial Health Check",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 3,
      name: "Hydration",
      layout: "single",
      title: "The Necessity of Staying Hydrated",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 4,
      name: "Healthy Snacks",
      layout: "single",
      title: "The Benefits of Buying Healthy Snacks in Bulk",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    }
  ];

  // Auto-rotate carousel templates every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % carouselTemplates.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [carouselTemplates.length]);

  const currentTemplate = carouselTemplates[currentTitleIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      {/* Thumbnail Container - Fixed 16:9 aspect ratio */}
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl">
          
          {/* Single Focus Layout */}
          <div className="h-full flex items-center p-16 relative">
            {/* Image Section - Right Side with Equal Spacing */}
            <div className="absolute right-16 top-16 bottom-16 flex items-center">
              <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden">
                <img 
                  src={currentTemplate.image} 
                  alt="Podcast thumbnail"
                  className="w-full h-full object-cover border-4 border-white/20"
                />
              </div>
            </div>
            
            {/* Text Section - Overlaid in Upper Third */}
            <div className="absolute left-16 top-24 max-w-md z-10">
              <h1 className="text-6xl xl:text-7xl font-bold leading-tight mb-6">
                <span className="text-white block mb-2">
                  {currentTemplate.title.split(' ').slice(0, -2).join(' ')}
                </span>
                <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  {currentTemplate.title.split(' ').slice(-2).join(' ')}
                </span>
              </h1>
              <p className="text-white/80 text-2xl font-medium">
                {currentTemplate.subtitle}
              </p>
            </div>
          </div>

          {/* BDBT Logo */}
          <div className="absolute bottom-8 right-8">
            <img 
              src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
              alt="BDBT Logo"
              className="h-16 opacity-90"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ThumbnailTemplate;