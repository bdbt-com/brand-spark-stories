import React, { useState } from 'react';

const ThumbnailTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const templates = [
    {
      id: 0,
      name: "Single Focus",
      layout: "single",
      title: "Building Habits That Stick",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 1,
      name: "Dual Image",
      layout: "dual",
      title: "Mindset vs Action",
      subtitle: "Daily Wins Podcast", 
      image1: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png",
      image2: "/lovable-uploads/2678016c-a3fa-4e29-bf3d-3ebe92201186.png"
    },
    {
      id: 2,
      name: "Featured Guest",
      layout: "guest",
      title: "From Broke to Breakthrough",
      subtitle: "with Sarah Johnson",
      hostImage: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png",
      guestImage: "/lovable-uploads/2678016c-a3fa-4e29-bf3d-3ebe92201186.png"
    }
  ];

  const currentTemplate = templates[selectedTemplate];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      {/* Template Selector */}
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              selectedTemplate === template.id
                ? 'bg-white text-primary'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {template.name}
          </button>
        ))}
      </div>

      {/* Thumbnail Container - Fixed 16:9 aspect ratio */}
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-[1280px] h-[720px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl">
          
          {/* Single Focus Layout */}
          {currentTemplate.layout === 'single' && (
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
              
              {/* Text Section - Overlaid on Left */}
              <div className="absolute left-16 top-1/2 transform -translate-y-1/2 max-w-md z-10">
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
          )}

          {/* Dual Image Layout */}
          {currentTemplate.layout === 'dual' && (
            <div className="h-full flex items-center justify-between p-16">
              {/* Text Section */}
              <div className="flex-1 pr-12">
                <h1 className="text-6xl xl:text-7xl font-bold leading-tight mb-6">
                  <span className="text-white block mb-2">
                    {currentTemplate.title.split(' ')[0]}
                  </span>
                  <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                    vs {currentTemplate.title.split(' ').slice(-1)}
                  </span>
                </h1>
                <p className="text-white/80 text-2xl font-medium">
                  {currentTemplate.subtitle}
                </p>
              </div>
              
              {/* Images Section */}
              <div className="flex-1 flex justify-center gap-8">
                <div className="w-64 h-64 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                  <img 
                    src={currentTemplate.image1} 
                    alt="Podcast thumbnail 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-64 h-64 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                  <img 
                    src={currentTemplate.image2} 
                    alt="Podcast thumbnail 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Featured Guest Layout */}
          {currentTemplate.layout === 'guest' && (
            <div className="h-full flex items-center justify-between p-16">
              {/* Text Section */}
              <div className="flex-1 pr-12">
                <h1 className="text-5xl xl:text-6xl font-bold leading-tight mb-6">
                  <span className="text-white block mb-2">
                    {currentTemplate.title.split(' ').slice(0, -1).join(' ')}
                  </span>
                  <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                    {currentTemplate.title.split(' ').slice(-1)}
                  </span>
                </h1>
                <p className="text-white/80 text-2xl font-medium">
                  {currentTemplate.subtitle}
                </p>
              </div>
              
              {/* Guest Images Section */}
              <div className="flex-1 flex justify-center items-center gap-6">
                <div className="w-64 h-64 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                  <img 
                    src={currentTemplate.hostImage} 
                    alt="Host"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-white text-4xl font-bold">+</div>
                <div className="w-64 h-64 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                  <img 
                    src={currentTemplate.guestImage} 
                    alt="Guest"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* BDBT Logo */}
          <div className="absolute bottom-8 right-8">
            <img 
              src="/src/assets/bdbt-logo-transparent.png" 
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