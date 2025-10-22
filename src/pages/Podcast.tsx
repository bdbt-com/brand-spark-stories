import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Play, 
  Clock, 
  Calendar, 
  Users, 
  ArrowLeft, 
  ArrowRight,
  ExternalLink,
  Download,
  Heart,
  Share2,
  Instagram,
  Youtube,
  Facebook,
  Loader2,
  AlertCircle
} from "lucide-react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useYouTubeVideos } from "@/hooks/useYouTubeVideos";
import { YouTubeApiKeyInput } from "@/components/YouTubeApiKeyInput";

const Podcast = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [apiKey, setApiKey] = useState<string | null>(() => {
    return sessionStorage.getItem('youtube_api_key') || import.meta.env.VITE_YOUTUBE_API_KEY || null;
  });

  const { videos, loading, error, refreshVideos } = useYouTubeVideos(50);

  // Use real YouTube videos or show API key input
  const featuredVideos = videos.slice(0, 6);
  const allVideos = videos;

  const nextSlide = () => {
    if (featuredVideos.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % featuredVideos.length);
    }
  };

  const prevSlide = () => {
    if (featuredVideos.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + featuredVideos.length) % featuredVideos.length);
    }
  };

  const handleApiKeySet = (newApiKey: string) => {
    setApiKey(newApiKey);
    // Refresh the page to re-initialize the hook with the new API key
    window.location.reload();
  };

  const openVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };


  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Smaller Hero Section */}
      <section className="py-12 bg-gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              <span className="block text-white">Podcasts &</span>
              <span className="block text-[hsl(35_45%_75%)]">Videos</span>
            </h1>
            <p className="text-lg lg:text-xl mb-6 text-white/90 leading-relaxed max-w-3xl mx-auto">
              Latest videos from Big Daddy's Big Tips.
            </p>
            
            {/* Status indicator */}
            {videos.length > 0 && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="text-white/80 text-sm">
                  {videos.length} videos • Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            )}
          </div>
          
          {/* Social Media Icons */}
          <div className="flex justify-center items-center gap-4 sm:gap-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="text-xs sm:text-sm text-white/80 font-medium">Follow @BigDaddysBigTips</span>
              <div className="flex gap-2 sm:gap-3">
                  <a 
                  href="https://instagram.com/BigDaddysBigTips" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:scale-110 touch-target"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="https://tiktok.com/@BigDaddysBigTips" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com/@BigDaddysBigTips" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:scale-110"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a 
                  href="https://facebook.com/BigDaddysBigTips" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Error State */}
          {error && videos.length === 0 && (
            <Alert className="mb-8 border-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Unable to load videos at this time.
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={refreshVideos}
                  className="ml-2"
                >
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-primary">Loading your latest videos...</p>
            </div>
          )}

          {/* Featured Carousel */}
          {!loading && featuredVideos.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-primary">Latest Videos</h2>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={prevSlide}
                    className="hover:bg-primary hover:text-primary-foreground"
                    disabled={featuredVideos.length === 0}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={nextSlide}
                    className="hover:bg-primary hover:text-primary-foreground"
                    disabled={featuredVideos.length === 0}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl shadow-strong">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {featuredVideos.map((video) => (
                    <div key={video.id} className="w-full flex-shrink-0">
                      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 bg-card">
                        <div className="relative group">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button 
                              variant="accent" 
                              size="lg" 
                              className="animate-bounce"
                              onClick={() => openVideo(video.videoId)}
                            >
                              <Play className="w-6 h-6 mr-2" />
                              Watch Now
                            </Button>
                          </div>
                        </div>
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                          <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-primary line-clamp-2">
                            {video.title}
                          </h3>
                          <p className="text-primary mb-6 leading-relaxed line-clamp-3">
                            {video.description}
                          </p>
                          <div className="flex items-center gap-6 text-sm text-primary mb-6">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(video.publishedAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {video.duration}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {video.viewCount} views
                            </span>
                          </div>
                          <div className="flex gap-3">
                            <Button 
                              variant="hero"
                              onClick={() => openVideo(video.videoId)}
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Watch on YouTube
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Open
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Indicators */}
              {featuredVideos.length > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  {featuredVideos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? "bg-primary scale-110" 
                          : "bg-muted hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* All Videos Grid */}
          {!loading && allVideos.length > 0 && (
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-primary">All Videos ({allVideos.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {allVideos.map((video) => (
                  <Card 
                    key={video.id}
                    className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
                    onClick={() => openVideo(video.videoId)}
                  >
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button variant="accent" size="sm">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-sm sm:text-base font-semibold mb-2 text-primary group-hover:text-primary transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-primary mb-4 line-clamp-2">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-primary mb-4">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(video.publishedAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {video.viewCount}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary hover:text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            openVideo(video.videoId);
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Watch
                        </Button>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-8 h-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.share?.({
                                title: video.title,
                                url: `https://www.youtube.com/watch?v=${video.videoId}`
                              });
                            }}
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && allVideos.length === 0 && (
            <div className="text-center py-20">
              <Youtube className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2 text-primary">No videos found</h3>
              <p className="text-muted-foreground mb-4">
                Make sure your YouTube channel has public videos and the API key is correct.
              </p>
              <Button variant="outline" onClick={refreshVideos}>
                <ArrowRight className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-20 text-center bg-warning text-white rounded-2xl p-6 sm:p-8 lg:p-12 border-4 border-warning/40">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              Never Miss an Episode
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Subscribe to our channels and get notified when we release new content 
              packed with actionable insights and success strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link to="/partnership">Subscribe on YouTube</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                <Link to="/partnership">Follow Podcast</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Video Menu Carousel */}
      {!loading && allVideos.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border shadow-strong z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {allVideos.map((video, index) => (
                  <CarouselItem key={video.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <div 
                      className="text-center group cursor-pointer"
                      onClick={() => openVideo(video.videoId)}
                    >
                      <div className="relative mb-2">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-16 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded text-[10px]">
                          {video.duration}
                        </div>
                      </div>
                      <h4 className="text-xs font-medium text-primary line-clamp-2 mb-1 group-hover:text-accent transition-colors">
                        {video.title}
                      </h4>
                      <div className="flex items-center justify-center">
                        <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-1 min-w-6 h-6 flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default Podcast;