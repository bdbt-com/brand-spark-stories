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
            <div className="w-full max-w-none">
              {/* YouTube Banner Template - Optimized 2560x1440 dimensions */}
              <div className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary/80 shadow-2xl mx-auto">
                <div className="h-full flex flex-col p-16 relative">
                  
                  {/* Left Side Content - Moved to left corner */}
                  <div className="absolute left-8 top-8 z-20">
                    <h1 className="text-3xl font-bold leading-tight mb-2">
                      <span className="text-white block">
                        Daily Wins
                      </span>
                      <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                        Podcast
                      </span>
                    </h1>
                    <p className="text-white/90 text-lg font-medium mb-6">
                      <span className="block">Your daily dose of</span>
                      <span className="block">motivation and success tips</span>
                    </p>
                    <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-1 border border-white/20 inline-block">
                      <span className="text-white font-medium text-xs">New Episodes Daily</span>
                    </div>
                  </div>

                  {/* Ripple effect from Daily Wins text */}
                  <div className="absolute left-32 top-20 z-5">
                    <div className="w-32 h-32 border border-white/10 rounded-full animate-pulse"></div>
                  </div>
                  <div className="absolute left-24 top-12 z-5">
                    <div className="w-48 h-48 border border-white/8 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  <div className="absolute left-16 top-4 z-5">
                    <div className="w-64 h-64 border border-white/6 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>

                  {/* Decorative smaller images - spread across right side */}
                   <div className="absolute right-8 top-8 w-36 h-24 rounded opacity-60 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/2678016c-a3fa-4e29-bf3d-3ebe92201186.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute right-48 top-12 w-30 h-20 rounded opacity-50 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/4fd0818e-20c3-4941-9c54-6915db50a7c0.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute right-96 top-20 w-28 h-18 rounded opacity-70 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/639b2e42-bb5e-4e0f-a150-3c447b0ca4d2.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute right-32 top-40 w-32 h-22 rounded opacity-55 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/711d369c-9d1d-4efb-9800-98349c1c7a48.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute right-72 top-4 w-26 h-18 rounded opacity-65 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/7208834d-dbba-4fc6-8da5-2f81f4e3796f.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute right-4 top-32 w-34 h-20 rounded opacity-60 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/8c209669-d4f3-4beb-9184-98693514ffca.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute right-20 top-52 w-30 h-20 rounded opacity-65 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/106caa66-a28a-4871-b4da-391b59d6c6ee.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute right-60 top-60 w-28 h-18 rounded opacity-55 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/11966bbc-71f9-40df-ac7d-d99bead4b5d3.png" alt="" className="w-full h-full object-cover" />
                   </div>

                  {/* Center Top Brand Name - Moved to center middle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                     <h1 className="text-7xl xl:text-8xl font-black text-center leading-tight whitespace-nowrap mb-6">
                       <span className="text-white font-black">@BigDaddy's</span><span className="font-black" style={{ color: 'hsl(35, 45%, 75%)' }}>BigTips</span>
                     </h1>
                    {/* Social Media Icons */}
                    <div className="flex justify-center items-center gap-8 mt-4">
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

                  {/* Additional decorative images - spread across left side */}
                   <div className="absolute left-8 top-48 w-36 h-24 rounded opacity-60 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/a886c4a9-0d09-442e-8348-25bd795ad7d0.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute left-48 top-20 w-30 h-20 rounded opacity-50 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/b362cf10-f3b4-4ab1-aeb3-30ab18058ace.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute left-96 top-12 w-28 h-18 rounded opacity-70 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/bb15285e-dc4c-46ae-93a2-3c27d8cad778.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute left-32 top-52 w-32 h-22 rounded opacity-55 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/dd8771a0-3f95-4ef7-838b-c6e40d9f78c4.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute left-72 top-8 w-26 h-18 rounded opacity-65 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/fa5ff878-34d6-44b6-a517-f055a1627aab.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute left-4 top-32 w-34 h-20 rounded opacity-60 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/091ea38c-18d1-4a6c-b3d0-b2e9e92d382d.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute left-20 top-60 w-30 h-20 rounded opacity-65 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/2e4d322c-a647-4622-b44d-912958bfa401.png" alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute left-60 top-60 w-28 h-18 rounded opacity-55 overflow-hidden border border-white/20 z-10">
                     <img src="/lovable-uploads/2f4d6184-a8de-43f0-a345-4ed910c90522.png" alt="" className="w-full h-full object-cover" />
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
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ThumbnailTemplate;