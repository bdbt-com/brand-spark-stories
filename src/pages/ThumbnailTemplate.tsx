import React, { useState, useEffect } from 'react';
import { Instagram, Youtube, Facebook, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

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

  const exportAsJPEG = async (elementId: string, filename: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Element not found:', elementId);
      return;
    }
    
    console.log('Starting export for element:', elementId);
    
    try {
      // Wait for images to load
      const images = element.querySelectorAll('img');
      await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = () => resolve(void 0);
          img.onerror = () => resolve(void 0);
        });
      }));

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        width: 1280,
        height: 720,
        logging: true
      });
      
      console.log('Canvas created successfully:', canvas.width, 'x', canvas.height);
      
      const dataURL = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.download = `${filename}.jpg`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Download triggered successfully');
    } catch (error) {
      console.error('Export failed:', error);
      alert(`Export failed: ${error.message}`);
    }
  };

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
            <button
              onClick={() => exportAsJPEG('thumbnail-0', 'parking-benefits-thumbnail')}
              className="absolute -bottom-12 right-0 px-4 py-2 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Export Thumbnail
            </button>
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
            <button
              onClick={() => exportAsJPEG('thumbnail-1', 'dead-time-thumbnail')}
              className="absolute -bottom-12 right-0 px-4 py-2 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Export Thumbnail
            </button>
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
            <button
              onClick={() => exportAsJPEG('thumbnail-2', 'financial-health-thumbnail')}
              className="absolute -bottom-12 right-0 px-4 py-2 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Export Thumbnail
            </button>
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
            <button
              onClick={() => exportAsJPEG('thumbnail-3', 'hydration-thumbnail')}
              className="absolute -bottom-12 right-0 px-4 py-2 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Export Thumbnail
            </button>
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
            <button
              onClick={() => exportAsJPEG('thumbnail-4', 'healthy-snacks-thumbnail')}
              className="absolute -bottom-12 right-0 px-4 py-2 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Export Thumbnail
            </button>
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
              {/* YouTube Banner Template - Optimized 2560x1440 dimensions */}
              <div id="youtube-banner" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary/80 shadow-2xl mx-auto">
                <div className="h-full flex flex-col p-16 relative">
                  
                  {/* Daily Wins Podcast - Top Center above brand name */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 text-center">
                    <h1 className="text-4xl font-bold leading-tight mb-2">
                      <span className="text-white block">
                        Daily Wins
                      </span>
                      <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                        Podcast
                      </span>
                    </h1>
                    <p className="text-white/90 text-lg font-medium mb-4">
                      <span className="block">Your daily dose of</span>
                      <span className="block">motivation and success tips</span>
                    </p>
                    <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-1 border border-white/20 inline-block">
                      <span className="text-white font-medium text-xs">New Episodes Daily</span>
                    </div>
                  </div>

                  {/* Ripple effect from Daily Wins text */}
                  <div className="absolute left-32 top-20 z-5">
                    <div className="w-32 h-32 border border-white/10 rounded-full"></div>
                  </div>
                  <div className="absolute left-24 top-12 z-5">
                    <div className="w-48 h-48 border border-white/8 rounded-full"></div>
                  </div>
                  <div className="absolute left-16 top-4 z-5">
                    <div className="w-64 h-64 border border-white/6 rounded-full"></div>
                  </div>

                  {/* Raindrop effect circles across top - varied sizes and ring patterns */}
                  {/* Large raindrop with multiple rings */}
                  <div className="absolute top-8 left-1/4 z-5">
                    <div className="w-3 h-3 border border-white/30 rounded-full"></div>
                    <div className="w-6 h-6 border border-white/20 rounded-full absolute -top-1.5 -left-1.5"></div>
                    <div className="w-9 h-9 border border-white/10 rounded-full absolute -top-3 -left-3"></div>
                  </div>
                  
                  {/* Medium raindrop with two rings */}
                  <div className="absolute top-12 left-1/3 z-5">
                    <div className="w-4 h-4 border border-white/25 rounded-full"></div>
                    <div className="w-7 h-7 border border-white/15 rounded-full absolute -top-1.5 -left-1.5"></div>
                  </div>
                  
                  {/* Small single raindrop */}
                  <div className="absolute top-6 right-1/4 w-3 h-3 border border-white/35 rounded-full z-5"></div>
                  
                  {/* Tiny raindrop with one ring */}
                  <div className="absolute top-14 right-1/3 z-5">
                    <div className="w-2 h-2 border border-white/40 rounded-full"></div>
                    <div className="w-4 h-4 border border-white/20 rounded-full absolute -top-1 -left-1"></div>
                  </div>
                  
                  {/* Medium raindrop with three rings */}
                  <div className="absolute top-10 left-3/4 z-5">
                    <div className="w-3 h-3 border border-white/35 rounded-full"></div>
                    <div className="w-6 h-6 border border-white/22 rounded-full absolute -top-1.5 -left-1.5"></div>
                    <div className="w-9 h-9 border border-white/12 rounded-full absolute -top-3 -left-3"></div>
                  </div>
                  
                  {/* Large single raindrop */}
                  <div className="absolute top-16 right-1/5 w-5 h-5 border border-white/25 rounded-full z-5"></div>
                  
                  {/* Small raindrop with two rings */}
                  <div className="absolute top-4 left-1/5 z-5">
                    <div className="w-2 h-2 border border-white/30 rounded-full"></div>
                    <div className="w-5 h-5 border border-white/16 rounded-full absolute -top-1.5 -left-1.5"></div>
                  </div>
                  
                  {/* Medium single raindrop */}
                  <div className="absolute top-18 left-2/3 w-4 h-4 border border-white/28 rounded-full z-5"></div>
                  
                  {/* Large raindrop with four rings */}
                  <div className="absolute top-7 right-2/3 z-5">
                    <div className="w-2 h-2 border border-white/40 rounded-full"></div>
                    <div className="w-4 h-4 border border-white/25 rounded-full absolute -top-1 -left-1"></div>
                    <div className="w-7 h-7 border border-white/15 rounded-full absolute -top-2.5 -left-2.5"></div>
                    <div className="w-10 h-10 border border-white/8 rounded-full absolute -top-4 -left-4"></div>
                  </div>
                  
                  {/* Additional scattered raindrops */}
                  <div className="absolute top-5 left-1/6 w-2 h-2 border border-white/35 rounded-full z-5"></div>
                  <div className="absolute top-15 right-1/6 w-3 h-3 border border-white/30 rounded-full z-5"></div>
                  <div className="absolute top-9 left-1/2 w-2 h-2 border border-white/40 rounded-full z-5"></div>
                  <div className="absolute top-17 right-2/5 w-3 h-3 border border-white/25 rounded-full z-5"></div>
                  <div className="absolute top-3 left-3/5 w-2 h-2 border border-white/32 rounded-full z-5"></div>

                  {/* More raindrops around "Daily Wins Podcast" text area */}
                  {/* Left side of text */}
                  <div className="absolute top-24 left-16 z-5">
                    <div className="w-2 h-2 border border-white/35 rounded-full"></div>
                    <div className="w-5 h-5 border border-white/20 rounded-full absolute -top-1.5 -left-1.5"></div>
                  </div>
                  <div className="absolute top-36 left-12 w-3 h-3 border border-white/30 rounded-full z-5"></div>
                  <div className="absolute top-30 left-20 z-5">
                    <div className="w-2 h-2 border border-white/40 rounded-full"></div>
                    <div className="w-4 h-4 border border-white/25 rounded-full absolute -top-1 -left-1"></div>
                    <div className="w-6 h-6 border border-white/15 rounded-full absolute -top-2 -left-2"></div>
                  </div>
                  <div className="absolute top-42 left-8 w-2 h-2 border border-white/35 rounded-full z-5"></div>
                  
                  {/* Right side of text */}
                  <div className="absolute top-26 right-16 z-5">
                    <div className="w-3 h-3 border border-white/35 rounded-full"></div>
                    <div className="w-6 h-6 border border-white/22 rounded-full absolute -top-1.5 -left-1.5"></div>
                  </div>
                  <div className="absolute top-38 right-12 w-2 h-2 border border-white/40 rounded-full z-5"></div>
                  <div className="absolute top-32 right-20 z-5">
                    <div className="w-2 h-2 border border-white/30 rounded-full"></div>
                    <div className="w-5 h-5 border border-white/18 rounded-full absolute -top-1.5 -left-1.5"></div>
                  </div>
                  <div className="absolute top-44 right-8 w-3 h-3 border border-white/28 rounded-full z-5"></div>
                  
                  {/* Below text area */}
                  <div className="absolute top-52 left-24 z-5">
                    <div className="w-2 h-2 border border-white/35 rounded-full"></div>
                    <div className="w-4 h-4 border border-white/22 rounded-full absolute -top-1 -left-1"></div>
                  </div>
                  <div className="absolute top-48 left-32 w-3 h-3 border border-white/25 rounded-full z-5"></div>
                  <div className="absolute top-56 left-16 w-2 h-2 border border-white/40 rounded-full z-5"></div>
                  <div className="absolute top-50 right-24 z-5">
                    <div className="w-3 h-3 border border-white/30 rounded-full"></div>
                    <div className="w-6 h-6 border border-white/20 rounded-full absolute -top-1.5 -left-1.5"></div>
                    <div className="w-9 h-9 border border-white/12 rounded-full absolute -top-3 -left-3"></div>
                  </div>
                  <div className="absolute top-54 right-32 w-2 h-2 border border-white/35 rounded-full z-5"></div>
                  <div className="absolute top-46 right-16 w-3 h-3 border border-white/28 rounded-full z-5"></div>

                  {/* Decorative smaller images - spread across right side (35% larger, no adjacent duplicates) */}
                   <div className="absolute right-12 top-20 w-16 h-11 rounded opacity-60 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/2678016c-a3fa-4e29-bf3d-3ebe92201186.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute right-32 top-32 w-14 h-9 rounded opacity-50 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/4fd0818e-20c3-4941-9c54-6915db50a7c0.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute right-20 top-50 w-15 h-11 rounded opacity-70 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/639b2e42-bb5e-4e0f-a150-3c447b0ca4d2.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute right-40 top-64 w-18 h-12 rounded opacity-55 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/711d369c-9d1d-4efb-9800-98349c1c7a48.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute right-8 top-72 w-14 h-9 rounded opacity-65 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/7208834d-dbba-4fc6-8da5-2f81f4e3796f.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute right-24 top-84 w-16 h-11 rounded opacity-60 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/8c209669-d4f3-4beb-9184-98693514ffca.png" alt="" className="w-full h-full object-cover" />
                   </div>

                  {/* Center Top Brand Name - Moved to center middle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                    {/* Social Media Icons */}
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
                     <h1 className="text-7xl xl:text-8xl font-black text-center leading-tight whitespace-nowrap">
                       <span className="text-white font-black">@BigDaddy's</span><span className="font-black" style={{ color: 'hsl(35, 45%, 75%)' }}>BigTips</span>
                     </h1>
                  </div>

                  {/* Additional decorative images - spread across left side (35% larger, no adjacent duplicates) */}
                   <div className="absolute left-12 top-84 w-16 h-11 rounded opacity-60 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/a886c4a9-0d09-442e-8348-25bd795ad7d0.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute left-32 top-20 w-14 h-9 rounded opacity-50 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/b362cf10-f3b4-4ab1-aeb3-30ab18058ace.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute left-20 top-36 w-15 h-11 rounded opacity-70 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/bb15285e-dc4c-46ae-93a2-3c27d8cad778.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute left-8 top-52 w-18 h-12 rounded opacity-55 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/dd8771a0-3f95-4ef7-838b-c6e40d9f78c4.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute left-40 top-28 w-14 h-9 rounded opacity-65 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/fa5ff878-34d6-44b6-a517-f055a1627aab.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute left-24 top-72 w-16 h-11 rounded opacity-60 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/091ea38c-18d1-4a6c-b3d0-b2e9e92d382d.png" alt="" className="w-full h-full object-cover" />
                   </div>

                  {/* Image Carousel underneath text */}
                  <div className="absolute bottom-12 left-8 right-8 z-10">
                    <div className="flex gap-6 justify-between">
                      <div className="w-96 h-64 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg">
                        <img 
                          src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
                          alt="Sunset landscape"
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

                  {/* BDBT Logo bottom center */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
                    <img 
                      src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                      alt="BDBT Logo"
                      className="h-14"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => exportAsJPEG('youtube-banner', 'youtube-banner')}
                className="absolute -bottom-12 right-0 px-4 py-2 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Export Banner
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ThumbnailTemplate;