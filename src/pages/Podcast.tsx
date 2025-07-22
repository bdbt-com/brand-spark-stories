import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Share2
} from "lucide-react";

const Podcast = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const podcastEpisodes = [
    {
      id: 1,
      title: "The Mindset Shift That Changed Everything",
      description: "Discover the single most important mental shift that separates successful people from everyone else.",
      thumbnail: "/api/placeholder/400/250",
      duration: "42 min",
      date: "2024-01-15",
      views: "125K",
      type: "Podcast",
      featured: true
    },
    {
      id: 2,
      title: "Building Multiple Income Streams in 2024",
      description: "A step-by-step guide to creating diverse revenue sources and achieving financial freedom.",
      thumbnail: "/api/placeholder/400/250",
      duration: "35 min",
      date: "2024-01-12",
      views: "98K",
      type: "YouTube",
      featured: true
    },
    {
      id: 3,
      title: "Morning Routines of Highly Successful People",
      description: "Learn the morning habits that set the foundation for extraordinary days and long-term success.",
      thumbnail: "/api/placeholder/400/250",
      duration: "28 min",
      date: "2024-01-10",
      views: "156K",
      type: "Podcast",
      featured: true
    },
    {
      id: 4,
      title: "The Art of Productive Networking",
      description: "Master the skills of building meaningful professional relationships that open doors.",
      thumbnail: "/api/placeholder/400/250",
      duration: "31 min",
      date: "2024-01-08",
      views: "87K",
      type: "YouTube",
      featured: true
    },
    {
      id: 5,
      title: "Overcoming Fear and Taking Action",
      description: "Practical strategies to push through fear and take the bold actions your dreams require.",
      thumbnail: "/api/placeholder/400/250",
      duration: "39 min",
      date: "2024-01-05",
      views: "203K",
      type: "Podcast",
      featured: true
    },
    {
      id: 6,
      title: "Digital Marketing Secrets Revealed",
      description: "Inside look at the marketing strategies that drive real results in today's digital landscape.",
      thumbnail: "/api/placeholder/400/250",
      duration: "44 min",
      date: "2024-01-03",
      views: "112K",
      type: "YouTube",
      featured: true
    }
  ];

  const allEpisodes = [
    ...podcastEpisodes,
    {
      id: 7,
      title: "Time Management Mastery",
      description: "Transform your relationship with time and dramatically increase your productivity.",
      thumbnail: "/api/placeholder/400/250",
      duration: "33 min",
      date: "2024-01-01",
      views: "76K",
      type: "Podcast",
      featured: false
    },
    {
      id: 8,
      title: "Building Your Personal Brand",
      description: "Create a powerful personal brand that attracts opportunities and opens doors.",
      thumbnail: "/api/placeholder/400/250",
      duration: "37 min",
      date: "2023-12-29",
      views: "94K",
      type: "YouTube",
      featured: false
    },
    {
      id: 9,
      title: "The Power of Consistency",
      description: "Why small, consistent actions create compound results and lasting transformation.",
      thumbnail: "/api/placeholder/400/250",
      duration: "29 min",
      date: "2023-12-27",
      views: "145K",
      type: "Podcast",
      featured: false
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % podcastEpisodes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + podcastEpisodes.length) % podcastEpisodes.length);
  };

  const getTypeColor = (type: string) => {
    return type === "Podcast" 
      ? "bg-primary text-primary-foreground" 
      : "bg-accent text-accent-foreground";
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Podcast & Video Catalogue
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Dive deep into actionable insights, inspiring stories, and proven strategies through our 
            collection of podcasts and YouTube videos designed to accelerate your success.
          </p>
        </div>

        {/* Featured Carousel */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Featured Episodes</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={prevSlide}
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={nextSlide}
                className="hover:bg-primary hover:text-primary-foreground"
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
              {podcastEpisodes.map((episode, index) => (
                <div key={episode.id} className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-2 gap-0 bg-card">
                    <div className="relative group">
                      <img 
                        src={episode.thumbnail} 
                        alt={episode.title}
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button variant="accent" size="lg" className="animate-bounce">
                          <Play className="w-6 h-6 mr-2" />
                          Play Now
                        </Button>
                      </div>
                      <Badge className={`absolute top-4 left-4 ${getTypeColor(episode.type)}`}>
                        {episode.type}
                      </Badge>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <Badge className="w-fit mb-4 bg-success text-success-foreground">
                        Featured
                      </Badge>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
                        {episode.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {episode.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {episode.duration}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(episode.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {episode.views} views
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="hero">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Now
                        </Button>
                        <Button variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {podcastEpisodes.map((_, index) => (
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
        </div>

        {/* All Episodes Grid */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-foreground">All Episodes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allEpisodes.map((episode) => (
              <Card 
                key={episode.id}
                className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={episode.thumbnail} 
                    alt={episode.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="accent" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                  <Badge className={`absolute top-3 left-3 ${getTypeColor(episode.type)}`}>
                    {episode.type}
                  </Badge>
                  {episode.featured && (
                    <Badge className="absolute top-3 right-3 bg-success text-success-foreground">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {episode.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {episode.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {episode.duration}
                    </span>
                    <span>{episode.views} views</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Watch
                    </Button>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-hero text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            Never Miss an Episode
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
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
  );
};

export default Podcast;