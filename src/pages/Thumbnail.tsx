import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const Thumbnail = () => {
  const images = ["/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png",
  // Sunset silhouette on rocks
  "/lovable-uploads/8d06c526-bd08-42b7-9a4e-09be508119c7.png",
  // Podcast recording setup
  "/lovable-uploads/b362cf10-f3b4-4ab1-aeb3-30ab18058ace.png",
  // Man with dog outdoors
  "/lovable-uploads/4fd0818e-20c3-4941-9c54-6915db50a7c0.png",
  // Meditation with mirror
  "/lovable-uploads/661d98ce-15f1-4542-b8c0-bab549b78a55.png",
  // Man in bathroom mirror
  "/lovable-uploads/33ba01bc-045c-4c44-ac70-c61c05093bdc.png",
  // Silhouette by pool
  "/lovable-uploads/2678016c-a3fa-4e29-bf3d-3ebe92201186.png",
  // Person exercising outdoors
  "/lovable-uploads/2f4d6184-a8de-43f0-a345-4ed910c90522.png",
  // Man on phone in modern setting
  "/lovable-uploads/7db6bd1f-c12f-45f2-a1d1-505f38c743a1.png",
  // Man outdoors smiling
  "/lovable-uploads/8db636d1-94ff-432a-a4b1-6ca278173f2f.png",
  // Man in shoe store
  "/lovable-uploads/a886c4a9-0d09-442e-8348-25bd795ad7d0.png",
  // Man in home theater
  "/lovable-uploads/347bc4c8-a5fc-40c4-a30c-1d91b5bd5761.png",
  // Man on beach at sunset
  "/lovable-uploads/fa5ff878-34d6-44b6-a517-f055a1627aab.png",
  // Man smiling in car
  "/lovable-uploads/75853635-930c-4fa5-9403-d0b58c6db83b.png" // Person meditating in gazebo
  ];
  const [embla, setEmbla] = useState<CarouselApi | null>(null);
  const [filteredImages, setFilteredImages] = useState<string[]>([]);

  const isPhotoLike = (src: string): Promise<boolean> => new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const size = 32;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(true);
      ctx.drawImage(img, 0, 0, size, size);
      const {
        data
      } = ctx.getImageData(0, 0, size, size);
      let whiteish = 0;
      const total = size * size;
      for (let i = 0; i < total; i++) {
        const r = data[i * 4];
        const g = data[i * 4 + 1];
        const b = data[i * 4 + 2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max === 0 ? 0 : (1 - min / max) * 100;
        const bright = (r + g + b) / 3;
        if (bright > 245 && sat < 10) whiteish++;
      }
      const ratio = whiteish / total;
      resolve(ratio < 0.6);
    };
    img.onerror = () => resolve(true);
    img.src = src;
  });

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const keep = await Promise.all(images.map(s => isPhotoLike(s)));
      const next = images.filter((_, i) => keep[i]);
      if (!cancelled) setFilteredImages(next);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!embla) return;
    const id = setInterval(() => {
      if (embla.canScrollNext()) {
        embla.scrollNext();
      } else {
        embla.scrollTo(0);
      }
    }, 5500);
    return () => clearInterval(id);
  }, [embla]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="block text-white">Small Daily Steps.</span>
                <span className="block text-[hsl(35_45%_75%)]">Big Life Change.</span>
              </h1>
            </div>
            <div className="animate-float">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-strong">
                <Carousel setApi={setEmbla} opts={{
                loop: true
              }} className="w-full" aria-label="Daily success journey image carousel">
                  <CarouselContent>
                    {(filteredImages.length ? filteredImages : images).map((src, idx) => <CarouselItem key={src}>
                         <img src={src} alt={`Big Life Change inspiration image ${idx + 1}`} className="w-full aspect-square object-cover rounded-xl" loading={idx === 0 ? "eager" : "lazy"} />
                      </CarouselItem>)}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Thumbnail;