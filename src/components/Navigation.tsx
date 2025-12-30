import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Instagram, Youtube, Facebook } from "lucide-react";
import logoTransparent from "/lovable-uploads/bdbt-logo-transparent.png";


const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blueprint", path: "/blueprint" },
    { name: "Tips", path: "/tips" },
    { name: "Feeling Stuck", path: "/feeling-stuck" },
    { name: "Podcast", path: "/podcast" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-border/80 sticky top-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Social Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-200 hover:scale-105 focus-enhanced">
              <div className="relative">
                {!logoError ? (
                  <img 
                    src={logoTransparent}
                    alt="Big Daddy's Big Tips Logo" 
                    className="h-12 w-auto object-contain"
                    onError={(e) => {
                      console.log('Logo failed to load:', e);
                      console.log('Logo src:', logoTransparent);
                      setLogoError(true);
                    }}
                    onLoad={() => console.log('BDBT Logo loaded successfully')}
                    style={{ minWidth: '60px' }}
                  />
                ) : (
                  <span className="text-2xl font-bold text-primary">BDBT</span>
                )}
              </div>
            </Link>
            
            {/* Social Media Icons - Desktop Only */}
            <div className="hidden sm:flex items-center gap-2 pl-2">
              <a 
                href="https://instagram.com/BigDaddysBigTips" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                aria-label="Follow on Instagram"
              >
                <Instagram className="w-4 h-4 text-primary hover:text-primary transition-colors" />
              </a>
              <a 
                href="https://tiktok.com/@BigDaddysBigTips" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                aria-label="Follow on TikTok"
              >
                <svg className="w-4 h-4 text-primary hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com/@BigDaddysBigTips" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                aria-label="Subscribe on YouTube"
              >
                <Youtube className="w-4 h-4 text-primary hover:text-primary transition-colors" />
              </a>
              <a 
                href="https://facebook.com/BigDaddysBigTips" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                aria-label="Follow on Facebook"
              >
                <Facebook className="w-4 h-4 text-primary hover:text-primary transition-colors" />
              </a>
              <a 
                href="https://open.spotify.com/show/7AryqWOzeVCOC7WQ9wcBlk?si=2ede4b3121ea46c1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                aria-label="Listen on Spotify"
              >
                <svg className="w-4 h-4 text-primary hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative py-2 px-3 text-sm font-semibold transition-all duration-200 hover:text-primary focus-enhanced rounded-lg hover:bg-primary/5 ${
                  isActive(item.path)
                    ? "text-primary bg-primary/10"
                    : "text-primary"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute bottom-1 left-1 right-1 h-0.5 bg-gradient-primary animate-slide-in rounded-full"></div>
                )}
              </Link>
            ))}
            <Button 
              variant="accent" 
              size="sm" 
              className="ml-4 hover-scale shadow-soft"
              asChild
            >
              <Link to="/blueprint">Get Your Foundation Blueprint Here</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="focus-enhanced relative"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-5 h-5">
                <Menu className={`w-5 h-5 absolute transition-all duration-200 ${isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                <X className={`w-5 h-5 absolute transition-all duration-200 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 glass-strong animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 focus-enhanced hover-lift ${
                    isActive(item.path)
                      ? "text-primary bg-primary/10 border-2 border-primary/20 shadow-xs"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5 border-2 border-transparent hover:border-primary/10"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                      Current
                    </span>
                  )}
                </Link>
              ))}
              <div className="px-3 py-2 animate-fade-in" style={{ animationDelay: `${navItems.length * 50}ms` }}>
                <Button 
                  variant="accent" 
                  size="default" 
                  className="w-full hover-scale-sm shadow-soft"
                  asChild
                >
                  <Link to="/blueprint">Get Your Foundation Blueprint Here</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;