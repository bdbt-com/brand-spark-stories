import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Tips", path: "/tips" },
    { name: "Blueprint", path: "/blueprint" },
    { name: "Podcast", path: "/podcast" },
    { name: "Daily Wins", path: "/daily-wins" },
    { name: "Partnership", path: "/partnership" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
              alt="BDBT Logo" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative py-2 px-1 text-sm font-medium transition-all duration-200 hover:text-primary focus-enhanced ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary animate-slide-in"></div>
                )}
              </Link>
            ))}
            <Button 
              variant="hero" 
              size="sm" 
              className="ml-4 hover:scale-105 transition-transform duration-200"
            >
              Get Started
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
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 focus-enhanced ${
                    isActive(item.path)
                      ? "text-primary bg-primary/10 border border-primary/20"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
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
                  variant="hero" 
                  size="sm" 
                  className="w-full hover:scale-[1.02] transition-transform duration-200"
                >
                  Get Started
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