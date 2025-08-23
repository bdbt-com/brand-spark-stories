import React, { useState, useEffect } from 'react';

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
    }
  ];

  const currentTemplate = templates[currentTemplateIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      {/* Thumbnail Container - Fixed 16:9 aspect ratio */}
      <div className="flex items-center justify-center min-h-screen p-8">
        
        {/* Template 1 - Parking Benefits */}
        {currentTemplateIndex === 0 && (
          <div key="template-0" className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in">
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
              
              <div className="absolute left-8 top-8 bottom-1/4 right-2/5 pr-8 z-10 flex flex-col justify-center">
                <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mb-6">
                  <span className="text-white block mb-2">
                    The Benefits of Parking Further Away
                  </span>
                  <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                    from your Destination
                  </span>
                </h1>
                <p className="text-white/80 text-2xl font-medium">
                  Daily Wins Podcast
                </p>
              </div>
            </div>
            
          </div>
        )}

        {/* Template 2 - Dead Time */}
        {currentTemplateIndex === 1 && (
          <div key="template-1" className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in">
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
              
              <div className="absolute left-8 top-8 bottom-1/4 right-2/5 pr-8 z-10 flex flex-col justify-center">
                <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mb-6">
                  <span className="text-white block mb-2">
                    The Benefits of making use
                  </span>
                  <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                    of your Dead Time
                  </span>
                </h1>
                <p className="text-white/80 text-2xl font-medium">
                  Daily Wins Podcast
                </p>
              </div>
            </div>
            
          </div>
        )}

        {/* Template 3 - Financial Health */}
        {currentTemplateIndex === 2 && (
          <div key="template-2" className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in">
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
              
              <div className="absolute left-8 top-8 bottom-1/4 right-2/5 pr-8 z-10 flex flex-col justify-center">
                <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mb-6">
                  <span className="text-white block mb-2">
                    Your Quarterly Financial
                  </span>
                  <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                    Health Check
                  </span>
                </h1>
                <p className="text-white/80 text-2xl font-medium">
                  Daily Wins Podcast
                </p>
              </div>
            </div>
            
          </div>
        )}

        {/* Template 4 - Hydration */}
        {currentTemplateIndex === 3 && (
          <div key="template-3" className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in">
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
              
              <div className="absolute left-8 top-8 bottom-1/4 right-2/5 pr-8 z-10 flex flex-col justify-center">
                <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mb-6 text-center">
                  <span className="text-white block mb-2">
                    The Necessity
                  </span>
                  <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                    of Staying Hydrated
                  </span>
                </h1>
                <p className="text-white/80 text-2xl font-medium">
                  Daily Wins Podcast
                </p>
              </div>
            </div>
            
          </div>
        )}

        {/* Template 5 - Healthy Snacks */}
        {currentTemplateIndex === 4 && (
          <div key="template-4" className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in">
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
              
              <div className="absolute left-8 top-8 bottom-1/4 right-2/5 pr-8 z-10 flex flex-col justify-center">
                <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mb-6">
                  <span className="text-white block mb-2">
                    The Benefits of Buying Healthy
                  </span>
                  <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                    Snacks in Bulk
                  </span>
                </h1>
                <p className="text-white/80 text-2xl font-medium">
                  Daily Wins Podcast
                </p>
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
    </div>
  );
};

export default ThumbnailTemplate;