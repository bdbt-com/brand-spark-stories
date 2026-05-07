import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { startTrackedRedirect } from "@/lib/youtube-redirect";

const INITIAL_EPISODES = [
  { videoId: "pdjVnhCUwA8", title: "Daily Wins Podcast 120 - You Service Your Car But Not Your Own Body", views: "1.2K views" },
  { videoId: "SioUIPf4Sls", title: "Daily Wins Podcast 118 - Intentional Comfort vs Default Comfort", views: "1.4K views" },
  { videoId: "L6cqky7TLpE", title: "Daily Wins Podcast 115 - Why a £10 Decision is Actually a £100,000 Decision", views: "1.6K views" },
  { videoId: "cfLHVIIp4o0", title: "Build a Life You Don't Need to Escape From", views: "3.2K views" },
  { videoId: "D4dzO5rfBfs", title: "Daily Wins Podcast 112 - Why Choosing Discomfort Feels So Hard", views: "2.1K views" },
  { videoId: "EhpmrICLRK8", title: "Daily Wins Podcast 113 - Why Challenging Social Norms Polarises People", views: "1.8K views" },
];

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
    href: "https://open.spotify.com/show/7AryqWOzeVCOC7WQ9wcBlk?si=2ede4b3121ea46c1&nd=1&dlsi=f03fd58680794b34",
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
    trackId: "button-blueprint",
    thumbnail: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png",
  },
  {
    title: "Daily Wins Podcast",
    subtitle: "(YouTube)",
    href: "https://www.youtube.com/@bigdaddysbigtips/playlists",
    external: true,
    trackId: "button-youtube",
    thumbnail: "/lovable-uploads/recording-setup-new.jpg",
  },
  {
    title: "Daily Wins Podcast",
    subtitle: "(Spotify)",
    href: "https://open.spotify.com/show/7AryqWOzeVCOC7WQ9wcBlk?si=2ede4b3121ea46c1&nd=1&dlsi=f03fd58680794b34",
    external: true,
    trackId: "button-spotify",
    thumbnail: "/lovable-uploads/75853635-930c-4fa5-9403-d0b58c6db83b.png",
  },
];

const LinkInBio = () => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  // Mobile carousel state
  const podcastEpisodes = INITIAL_EPISODES;

  const totalSlides = podcastEpisodes.length;
  const clonedEpisodes = [
    podcastEpisodes[totalSlides - 1],
    ...podcastEpisodes,
    podcastEpisodes[0],
  ];
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isManualSwipe = useRef(false);

  // Touch/swipe state
  const touchStartX = useRef(0);
  const touchStartTranslate = useRef(0);
  const isDragging = useRef(false);
  const touchHistory = useRef<{ x: number; t: number }[]>([]);

  const getStep = useCallback(() => {
    if (!trackRef.current) return { cardW: 0, gap: 0, step: 0 };
    const children = trackRef.current.children;
    if (children.length < 2) return { cardW: 0, gap: 0, step: 0 };
    const first = children[0] as HTMLElement;
    const second = children[1] as HTMLElement;
    const cardW = first.offsetWidth;
    const gap = second.offsetLeft - first.offsetLeft - cardW;
    return { cardW, gap, step: cardW + gap };
  }, []);

  const getTranslateX = useCallback((index: number) => {
    const { cardW, step } = getStep();
    if (cardW === 0) return 0;
    const trackLeft = 16;
    const viewportCenter = window.innerWidth / 2;
    return viewportCenter - trackLeft - index * step - cardW / 2;
  }, [getStep]);

  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const scheduleAutoplay = useCallback((delay = 3000) => {
    clearAutoplay();
    autoplayRef.current = setTimeout(() => {
      if (window.innerWidth >= 768 || playingVideo !== null) return;
      isManualSwipe.current = false;
      setTransitionEnabled(true);
      setCurrentIndex(prev => prev + 1);
    }, delay);
  }, [clearAutoplay, playingVideo]);

  // Mount: show first slide centered, static, then start autoplay quickly
  useEffect(() => {
    if (window.innerWidth >= 768 || !isFirstMount) return;
    const raf = requestAnimationFrame(() => {
      if (!trackRef.current) return;
      trackRef.current.style.transition = 'none';
      trackRef.current.style.transform = `translateX(${getTranslateX(2)}px)`;
      setCurrentIndex(2);
      setIsFirstMount(false);
      scheduleAutoplay(1500);
    });
    return () => cancelAnimationFrame(raf);
  }, [isFirstMount]); // eslint-disable-line react-hooks/exhaustive-deps

  // Normalize clone boundaries after transition
  const handleTransitionEnd = useCallback(() => {
    if (isDragging.current) return;
    let nextIndex = currentIndex;
    let needsSnap = false;

    if (currentIndex >= totalSlides + 1) {
      nextIndex = 1;
      needsSnap = true;
    }
    if (currentIndex <= 0) {
      nextIndex = totalSlides;
      needsSnap = true;
    }

    if (needsSnap) {
      setTransitionEnabled(false);
      setCurrentIndex(nextIndex);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scheduleAutoplay(3000);
        });
      });
    } else {
      scheduleAutoplay(3000);
    }
  }, [currentIndex, totalSlides, scheduleAutoplay]);

  // Touch handlers with inertia
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    clearAutoplay();
    isDragging.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchStartTranslate.current = getTranslateX(currentIndex);
    touchHistory.current = [{ x: e.touches[0].clientX, t: Date.now() }];
    setTransitionEnabled(false);
  }, [clearAutoplay, currentIndex, getTranslateX]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    trackRef.current.style.transform = `translateX(${touchStartTranslate.current + delta}px)`;
    const now = Date.now();
    touchHistory.current.push({ x: e.touches[0].clientX, t: now });
    if (touchHistory.current.length > 5) touchHistory.current.shift();
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const endX = e.changedTouches[0].clientX;
    const delta = endX - touchStartX.current;
    const threshold = 50;

    let velocity = 0;
    const history = touchHistory.current;
    if (history.length >= 2) {
      const oldest = history[0];
      const newest = history[history.length - 1];
      const dt = (newest.t - oldest.t) / 1000;
      if (dt > 0) velocity = (newest.x - oldest.x) / dt;
    }

    let slideDelta = 0;
    if (Math.abs(delta) > threshold || Math.abs(velocity) > 300) {
      const direction = delta < 0 ? 1 : -1;
      const extraSlides = Math.min(Math.floor(Math.abs(velocity) / 800), 2);
      slideDelta = direction * (1 + extraSlides);
    }

    const newIndex = currentIndex + slideDelta;
    isManualSwipe.current = true;
    setTransitionEnabled(true);
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  // Pause autoplay when a video is playing
  useEffect(() => {
    if (playingVideo !== null) clearAutoplay();
  }, [playingVideo, clearAutoplay]);

  // Open YouTube after delay
  useEffect(() => {
    if (playingVideo === null) return;
    const episode = podcastEpisodes[playingVideo];
    if (!episode) return;
    const timer = setTimeout(() => {
      startTrackedRedirect(episode.videoId);
      setPlayingVideo(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [playingVideo]);

  // Pause carousel on page scroll, resume after scroll stops
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      clearAutoplay();
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        scheduleAutoplay(3000);
      }, 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [clearAutoplay, scheduleAutoplay]);

  // Tiered idle auto-redirect system
  // Visit 1 (no redirects in 3h): 7s → "Build a Life You Don't Need to Escape From"
  // Visit 2 (1 redirect in 3h): 12.5s → "Reduce Decision Fatigue Wherever Possible"
  // Visit 3+ (2+ redirects in 3h): 20s → cycle through remaining videos
  // Resets after 7 days since first redirect
  useEffect(() => {
    const STORAGE_KEY = 'bdbt-auto-redirects-v8';
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    const REDIRECT_SEQUENCE = [
      'cfLHVIIp4o0',
      'pdjVnhCUwA8',
      'SioUIPf4Sls',
      'L6cqky7TLpE',
      'D4dzO5rfBfs',
      'EhpmrICLRK8',
    ];

    const getRecentRedirects = (): { timestamp: number; videoId: string }[] => {
      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const now = Date.now();
        return stored.filter((entry: { timestamp: number }) => now - entry.timestamp < SEVEN_DAYS);
      } catch { return []; }
    };

    const recentRedirects = getRecentRedirects();
    const visitNumber = recentRedirects.length;

    let delay: number;
    let videoId: string;

    if (visitNumber === 0) {
      delay = 4000;
      videoId = REDIRECT_SEQUENCE[0];
    } else if (visitNumber === 1) {
      delay = 8000;
      videoId = REDIRECT_SEQUENCE[1];
    } else {
      delay = 8000;
      const cycleIndex = (visitNumber - 2) % (REDIRECT_SEQUENCE.length - 2);
      videoId = REDIRECT_SEQUENCE[2 + cycleIndex];
    }

    let idleTimer: ReturnType<typeof setTimeout>;
    let redirected = false;

    const resetIdle = () => {
      if (redirected) return;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        redirected = true;
        const updated = [...getRecentRedirects(), { timestamp: Date.now(), videoId }];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        startTrackedRedirect(videoId, "auto-redirect:" + videoId);
      }, delay);
    };

    resetIdle();
    const events = ['touchstart', 'touchmove', 'touchend', 'scroll', 'click', 'mousemove', 'keydown'] as const;
    events.forEach(e => window.addEventListener(e, resetIdle, { passive: true }));
    return () => {
      clearTimeout(idleTimer);
      events.forEach(e => window.removeEventListener(e, resetIdle));
    };
  }, []);

  // Cleanup
  useEffect(() => {
    return () => clearAutoplay();
  }, [clearAutoplay]);

  const translateX = getTranslateX(currentIndex);

  // Determine if a carousel card is the "active" (centered) one
  const getRealIndex = (i: number) => {
    if (i === 0) return totalSlides - 1;
    if (i > totalSlides) return 0;
    return i - 1;
  };

  return (
    <div className="min-h-screen bg-[#1a1a1e] flex flex-col items-center px-4 py-5 md:py-8 overflow-x-hidden">
      {/* Background gradient overlay — Midnight charcoal */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#1a1a1e] via-[#141416] to-[#0d0d0f] -z-10" />
      
      {/* Main content container */}
      <div className="w-full max-w-md md:max-w-4xl flex flex-col items-center animate-fade-in">
        {/* Profile Photo — gradient ring */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-white/5 p-[1.5px] mb-4">
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <img 
              src="/lovable-uploads/profile-photo.png" 
              alt="Big Daddy"
              className="absolute inset-0 w-full h-full object-cover object-[center_15%] scale-125 rounded-full"
            />
          </div>
        </div>
        
        {/* Handle */}
        <h1 className="text-xl font-semibold mb-3">
          <span className="text-[hsl(35_45%_75%)]">BigDaddy's</span>
          <span className="text-white">BigTips</span>
        </h1>
        
        {/* Tagline */}
        <div className="text-center mb-3">
          <p className="text-white/90 text-sm mb-1">
            🎵 Small daily steps 💥 Big life changes
          </p>
          <p className="text-white/50 text-sm font-light">
            Replace Daily Drifts with Daily Wins
          </p>
        </div>
        
        {/* Social icons */}
        <div className="flex items-center gap-6 mb-3 md:mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/90 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.15)] transition-all duration-300"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
        
        {/* Links — MacBook keyboard-key style */}
        <div className="w-full max-w-md space-y-2.5 md:space-y-3">
          {links.map((link, index) => {
            const cardContent = (
              <div 
                className="w-full h-16 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] 
                         hover:bg-white/[0.07] hover:border-white/[0.12]
                         active:scale-[0.98] active:bg-white/[0.03]
                         transition-all duration-300 ease-out cursor-pointer
                         flex items-center overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.thumbnail && (
                  <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-l-2xl">
                    <img 
                      src={link.thumbnail} 
                      alt={link.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className={`flex-1 py-4 ${link.thumbnail ? 'px-4' : 'px-5 text-center'}`}>
                  <span className="text-white/90 font-medium text-sm block">
                    {link.title}
                  </span>
                  {link.subtitle && (
                    <span className="text-white/40 text-xs">
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
                  onClick={() => supabase.functions.invoke("track-video-click", { body: { videoId: link.trackId } })}
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
                onClick={() => supabase.functions.invoke("track-video-click", { body: { videoId: link.trackId } })}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
        
        {/* Podcast Episodes */}
        <div className="w-full mt-3 md:mt-8">
          <p className="text-white/25 text-xs uppercase tracking-[0.2em] text-center mb-2 md:mb-4 font-light">Picked For You</p>
          
          {/* Desktop: static grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 items-center">
            {podcastEpisodes.map((episode) => (
              <div 
                key={episode.videoId} 
                className={`group ${episode.videoId === 'OjwSKAXveN8' ? 'md:scale-110 md:z-10' : ''}`}
              >
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/[0.04] backdrop-blur-sm border border-white/[0.05] flex flex-col h-full">
                  <div>
                    {playingVideo !== null && podcastEpisodes[playingVideo]?.videoId === episode.videoId ? (
                      <div className="w-full aspect-video bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${episode.videoId}?autoplay=1`}
                          className="w-full h-full"
                          allow="autoplay; encrypted-media"
                        />
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          const idx = podcastEpisodes.findIndex(e => e.videoId === episode.videoId);
                          setPlayingVideo(idx);
                          supabase.functions.invoke("track-video-click", { body: { videoId: episode.videoId } });
                        }}
                        className="relative w-full cursor-pointer"
                      >
                        <img
                          src={`https://img.youtube.com/vi/${episode.videoId}/hqdefault.jpg`}
                          alt={episode.title}
                          className="w-full aspect-video object-cover rounded-t-2xl"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                          <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white/15 transition-all duration-300">
                            <Play className="w-7 h-7 text-white ml-0.5" fill="currentColor" />
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${episode.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2.5 hover:bg-white/[0.03] transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      startTrackedRedirect(episode.videoId);
                    }}
                  >
                    <h3 className="text-sm font-medium text-white/90 leading-snug line-clamp-2 min-h-[2rem]">{episode.title}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-white/30">{episode.views}</p>
                      <span className="text-xs text-white/30">BDBT</span>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: smooth clone-based carousel */}
          <div className="md:hidden relative overflow-hidden -mx-[24vw] px-[24vw]" ref={containerRef}>

            <div 
              ref={trackRef}
              className="flex gap-2 transform-gpu will-change-transform"
              style={{
                transform: `translateX(${translateX}px)`,
                transition: transitionEnabled ? (isManualSwipe.current ? 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)') : 'none',
              }}
              onTransitionEnd={handleTransitionEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {clonedEpisodes.map((episode, i) => {
                const isActive = i === currentIndex;
                return (
                  <div 
                    key={`carousel-${i}`} 
                    className="group w-[36vw] min-w-[36vw] max-w-[36vw] flex-shrink-0 transition-all duration-500 ease-out"
                    style={{
                      opacity: isActive ? 1 : 0.5,
                      transform: isActive ? 'scale(1)' : 'scale(0.92)',
                    }}
                  >
                    <div className="rounded-2xl overflow-hidden shadow-lg bg-white/[0.04] backdrop-blur-sm border border-white/[0.05] flex flex-col h-full">
                      <div>
                        <button
                          onClick={() => {
                            const realIdx = getRealIndex(i);
                            setPlayingVideo(realIdx);
                            startTrackedRedirect(episode.videoId);
                          }}
                          className="relative w-full cursor-pointer"
                        >
                          <img
                            src={`https://img.youtube.com/vi/${episode.videoId}/hqdefault.jpg`}
                            alt={episode.title}
                            className="w-full aspect-video object-cover block rounded-t-2xl"
                          />
                        </button>
                      </div>
                      <a
                        href={`https://www.youtube.com/watch?v=${episode.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 hover:bg-white/[0.03] transition-colors duration-300"
                        onClick={(e) => {
                          e.preventDefault();
                          startTrackedRedirect(episode.videoId);
                        }}
                      >
                        <h3 className="text-xs font-medium text-white/80 leading-snug line-clamp-2 min-h-[2rem]">{episode.title}</h3>
                        <div className="flex justify-between items-center mt-0.5">
                          <p className="text-[10px] text-white/30">{episode.views}</p>
                          <span className="text-[10px] text-white/30">BDBT</span>
                        </div>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-white/20 text-xs mt-10 font-light">
          © Big Daddy's Big Tips
        </p>
      </div>
    </div>
  );
};

export default LinkInBio;
