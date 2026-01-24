import { Link } from "react-router-dom";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/bigdaddysbigtips",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@bigdaddysbigtips",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@BigDaddysBigTips",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/show/4PO4P4X6dF3FJasqf3dR5L",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
];

const links = [
  {
    title: "Free Foundation Blueprint",
    href: "/blueprint",
    external: false,
    thumbnail: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png",
  },
  {
    title: "BDBT Daily Podcast",
    subtitle: "(YouTube)",
    href: "https://www.youtube.com/@BigDaddysBigTips",
    external: true,
    thumbnail: "/lovable-uploads/recording-setup-new.jpg",
  },
  {
    title: "BDBT Daily Podcast",
    subtitle: "(Spotify)",
    href: "https://open.spotify.com/show/4PO4P4X6dF3FJasqf3dR5L",
    external: true,
    thumbnail: "/lovable-uploads/75853635-930c-4fa5-9403-d0b58c6db83b.png",
  },
];

const LinkInBio = () => {
  return (
    <div className="min-h-screen bg-[#36455A] flex flex-col items-center px-4 py-8">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#36455A] via-[#2d3a4d] to-[#1e2836] -z-10" />
      
      {/* Main content container */}
      <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
        {/* Profile Photo */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 mb-4 relative">
          <img 
            src="/lovable-uploads/profile-photo.png" 
            alt="Big Daddy"
            className="absolute inset-0 w-full h-full object-cover object-[center_15%] scale-125 rounded-full"
          />
        </div>
        
        {/* Handle */}
        <h1 className="text-xl font-semibold mb-3">
          <span className="text-[hsl(35_45%_75%)]">BigDaddy's</span>
          <span className="text-white">BigTips</span>
        </h1>
        
        {/* Tagline */}
        <div className="text-center mb-5">
          <p className="text-white text-sm mb-1">
            🎵 Small daily steps 💥 Big life changes
          </p>
          <p className="text-white/80 text-sm">
            Replace Daily Drifts with Daily Wins
          </p>
        </div>
        
        {/* Social icons */}
        <div className="flex items-center gap-6 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
        
        {/* Links */}
        <div className="w-full space-y-3">
          {links.map((link, index) => {
            const cardContent = (
              <div 
                className="w-full rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 
                         hover:bg-black/50 hover:scale-[1.02] hover:border-white/20
                         transition-all duration-300 ease-out cursor-pointer
                         flex items-center overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.thumbnail && (
                  <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-l-xl">
                    <img 
                      src={link.thumbnail} 
                      alt={link.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className={`flex-1 py-4 ${link.thumbnail ? 'px-4' : 'px-5 text-center'}`}>
                  <span className="text-white font-medium text-sm block">
                    {link.title}
                  </span>
                  {link.subtitle && (
                    <span className="text-white/60 text-xs">
                      {link.subtitle}
                    </span>
                  )}
                </div>
              </div>
            );

            if (link.external) {
              return (
                <a 
                  key={link.title + (link.subtitle || '')} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <Link 
                key={link.title + (link.subtitle || '')} 
                to={link.href}
                className="block animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
        
        {/* Footer */}
        <p className="text-white/40 text-xs mt-10">
          © Big Daddy's Big Tips
        </p>
      </div>
    </div>
  );
};

export default LinkInBio;
