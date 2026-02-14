import tikTokBg from "@/assets/tiktok-bg-daily-wins.png";
import tikTokBg1 from "@/assets/tiktok-bg-modern-world.png";
import tikTokBg2 from "@/assets/tiktok-bg-bdbt-explained.png";
import tikTokBg3 from "@/assets/tiktok-bg-template-4.png";
import tikTokBg4 from "@/assets/tiktok-bg-template-5.png";
import tikTokBg5 from "@/assets/tiktok-bg-template-6.png";
import tikTokBg6 from "@/assets/tiktok-bg-template-7.png";
import tikTokBg7 from "@/assets/tiktok-bg-template-8.png";
import tikTokBg8 from "@/assets/tiktok-bg-template-9.png";
import tikTokBg9 from "@/assets/tiktok-bg-template-10.png";
import tikTokBg11 from "@/assets/tiktok-bg-template-12.png";
import tikTokBg12 from "@/assets/tiktok-bg-template-13.png";
import tikTokBg13 from "@/assets/tiktok-bg-template-14.png";
import tikTokBg14 from "@/assets/tiktok-bg-template-15.png";
import tikTokBg15 from "@/assets/tiktok-bg-template-16.png";
import tikTokBg16 from "@/assets/tiktok-bg-template-17.png";
import tikTokBg17 from "@/assets/tiktok-bg-template-18.png";
import tikTokBg18 from "@/assets/tiktok-bg-template-19.png";
import tikTokBg19 from "@/assets/tiktok-bg-template-20.png";
import tikTokBg20 from "@/assets/tiktok-bg-template-21.png";
import tikTokBg21 from "@/assets/tiktok-bg-template-22.png";
import tikTokBg22 from "@/assets/tiktok-bg-template-23.png";
import tikTokBg23 from "@/assets/tiktok-bg-template-24.png";
import tikTokBg24 from "@/assets/tiktok-bg-template-25.png";
import tikTokBg25 from "@/assets/tiktok-bg-template-28.png";
import tikTokBg26 from "@/assets/tiktok-bg-template-29.png";
import tikTokBg27 from "@/assets/tiktok-bg-template-30.png";
import tikTokBg28 from "@/assets/tiktok-bg-template-32.png";
import tikTokBg29 from "@/assets/tiktok-bg-template-33.png";
import { Instagram, Youtube } from "lucide-react";

interface TikTokTemplateProps {
  templateIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59;
  className?: string;
}

export function TikTokTemplate({ templateIndex, className = "" }: TikTokTemplateProps) {
  const backgrounds = [tikTokBg, tikTokBg2, tikTokBg1, tikTokBg3, tikTokBg4, tikTokBg5, tikTokBg6, tikTokBg7, tikTokBg8, tikTokBg9, tikTokBg3, tikTokBg11, tikTokBg12, tikTokBg13, tikTokBg14, tikTokBg15, tikTokBg16, tikTokBg17, tikTokBg18, tikTokBg17, tikTokBg20, tikTokBg17, tikTokBg21, tikTokBg22, tikTokBg23, tikTokBg24, tikTokBg23, null, tikTokBg25, tikTokBg26, tikTokBg27, tikTokBg23, tikTokBg28, tikTokBg24, tikTokBg29, tikTokBg24, tikTokBg29, tikTokBg22, tikTokBg29, tikTokBg22, tikTokBg22, tikTokBg29, tikTokBg24, tikTokBg28, tikTokBg24, tikTokBg28, tikTokBg24, tikTokBg28, tikTokBg24, tikTokBg28, tikTokBg24, tikTokBg28, tikTokBg24, tikTokBg28, tikTokBg24, tikTokBg28, tikTokBg24, tikTokBg28, tikTokBg24, tikTokBg28];
  const backgroundImage = backgrounds[templateIndex];
  const showOverlay = templateIndex <= 2; // Only overlay for templates 0, 1, 2
  const isOutroTemplate = templateIndex === 27;
  
  // Special rendering for Outro template
  if (isOutroTemplate) {
    return (
      <div className={`w-[540px] h-[960px] relative overflow-hidden shadow-2xl animate-fade-in border-2 border-white ${className}`}>
        {/* Brand Blue Background */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: '#36455A' }}
        />
        
        {/* Black Fade from Bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-2/3"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 100%)'
          }}
        />
        
        {/* Thanks for Watching Text - Top Half */}
        <div className="absolute top-0 left-0 right-0 h-1/2 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-black tracking-wider text-center" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.7)' }}>
            <span className="text-white block">THANKS FOR</span>
            <span className="block mt-2" style={{ color: 'hsl(35, 45%, 75%)' }}>WATCHING</span>
          </h1>
          {/* Instagram Handle */}
          <p className="text-white/90 text-2xl mt-4 tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            @BigDaddysBigTips
          </p>
        </div>
        
        {/* Content Container - Bottom Half */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 flex flex-col items-center justify-center p-8">
          {/* Sunset Image */}
          <div className="mb-6">
            <img 
              src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
              alt="Sunset"
              className="w-[320px] h-[200px] object-cover rounded-xl border-4 border-white/80 shadow-2xl"
            />
          </div>
          
          {/* BDBT Logo */}
          <div className="mb-6">
            <img 
              src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
              alt="BDBT Logo"
              className="h-14 opacity-95"
              style={{ 
                filter: 'drop-shadow(0 0 8px rgba(255,255,255,1)) drop-shadow(0 0 4px rgba(255,255,255,0.8)) drop-shadow(2px 2px 4px rgba(0,0,0,0.8))',
              }}
            />
          </div>
          
          {/* CTA Text */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
              <span className="text-white block">FOLLOW FOR MORE</span>
              <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>DAILY WINS</span>
            </h2>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex gap-6 items-center">
            <Instagram className="w-10 h-10 text-white" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))' }} />
            <Youtube className="w-10 h-10 text-white" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-[540px] h-[960px] relative overflow-hidden shadow-2xl animate-fade-in border-2 border-white ${className}`}>
      {/* Background Image - Full Background */}
      <img 
        src={backgroundImage} 
        alt="TikTok Background" 
        className="absolute inset-0 w-full h-full object-cover"
        style={templateIndex === 28 || templateIndex === 30 ? { filter: 'grayscale(100%)' } : undefined}
      />
      {/* Dark overlay for text readability - hidden for template 4 */}
      {showOverlay && <div className="absolute inset-0 bg-black/30"></div>}
      
      <div className="h-full flex flex-col p-8 relative">
        {/* Title text positioned above the logo */}
        <div className={`absolute ${templateIndex === 28 || templateIndex === 29 || templateIndex === 30 ? 'top-[55%]' : templateIndex >= 3 ? 'top-[55%]' : 'top-[30%]'} left-8 right-8 transform -translate-y-1/2 text-center z-10`}>
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-4" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}>
            {templateIndex === 0 ? (
              <>
                <span className="text-white block">
                  The Modern World is
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Designed to Keep You Stuck
                </span>
              </>
            ) : templateIndex === 1 ? (
              <>
                <span className="text-white block">
                  Every choice is
                </span>
                <span className="block mt-1">
                  <span className="text-white">a </span>
                  <span style={{ color: 'hsl(35, 45%, 75%)' }}>Daily Win</span>
                </span>
                <span className="block mt-1">
                  <span className="text-white">or a </span>
                  <span style={{ color: 'hsl(35, 45%, 75%)' }}>Daily Drift</span>
                </span>
              </>
            ) : templateIndex === 2 ? (
              <span style={{ color: 'white' }}>
                BDBT <span style={{ color: 'hsl(35, 45%, 75%)' }}>Explained</span>
              </span>
            ) : templateIndex === 3 ? (
              <>
                <span className="text-white block">
                  Why We
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Stay Stuck
                </span>
              </>
            ) : templateIndex === 4 ? (
              <>
                <span className="text-white block">
                  The Harsh
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Truth
                </span>
              </>
            ) : templateIndex === 5 ? (
              <>
                <span className="text-white block">
                  Wins vs
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Drifts
                </span>
              </>
            ) : templateIndex === 6 ? (
              <>
                <span className="text-white block">
                  My
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Story
                </span>
              </>
            ) : templateIndex === 7 ? (
              <>
                <span className="text-white block">
                  Why The Old
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Model Fails
                </span>
              </>
            ) : templateIndex === 8 ? (
              <>
                <span className="text-white block">
                  What Is
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  BDBT?
                </span>
              </>
            ) : templateIndex === 9 ? (
              <>
                <span className="text-white block">
                  The
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Invitation
                </span>
              </>
            ) : templateIndex === 10 ? (
              <>
                <span className="text-white block">
                  Wait for the Next
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Sale / Promo
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Before you Buy
                </span>
              </>
            ) : templateIndex === 11 ? (
              <>
                <span className="text-white block">
                  December is
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  the Goal...
                </span>
              </>
            ) : templateIndex === 12 ? (
              <>
                <span className="text-white block">
                  The Forever
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Test
                </span>
              </>
            ) : templateIndex === 13 ? (
              <>
                <span className="text-white block">
                  Systems Beat
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Motivation
                </span>
              </>
            ) : templateIndex === 14 ? (
              <>
                <span className="text-white block">
                  Small Wins
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  Matter
                </span>
              </>
            ) : templateIndex === 15 ? (
              <>
                <span className="text-white block text-3xl tracking-wider mb-1">
                  NEW EPISODE
                </span>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 1
                </span>
                <span className="block mt-3 text-white">
                  PARK FURTHER AWAY
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  ON PURPOSE
                </span>
                <span className="block mt-4 text-lg text-white/80 tracking-wide">
                  NOW ON YOUTUBE AND SPOTIFY
                </span>
              </>
            ) : templateIndex === 16 ? (
              <>
                <span className="text-white block text-3xl tracking-wider mb-1">
                  NEW EPISODE
                </span>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 2
                </span>
                <span className="block mt-3 text-white">
                  DO CALF RAISES WHILE
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  BRUSHING YOUR TEETH
                </span>
                <span className="block mt-4 text-lg text-white/80 tracking-wide">
                  NOW ON YOUTUBE AND SPOTIFY
                </span>
              </>
            ) : templateIndex === 17 ? (
              <>
                <span className="text-white block text-3xl tracking-wider mb-1">
                  NEW EPISODE
                </span>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 3
                </span>
                <span className="block mt-3 text-white">
                  PUT IT IN YOUR BASKET
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  WAIT 24 HOURS
                </span>
                <span className="block mt-4 text-lg text-white/80 tracking-wide">
                  NOW ON YOUTUBE AND SPOTIFY
                </span>
              </>
            ) : templateIndex === 18 ? (
              <>
                <span className="text-white block text-3xl tracking-wider mb-1">
                  NEW EPISODE
                </span>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 4
                </span>
                <span className="block mt-3 text-white">
                  DRINK ONE EXTRA
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  GLASS OF WATER
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  DAILY
                </span>
                <span className="block mt-4 text-lg text-white/80 tracking-wide">
                  NOW ON YOUTUBE AND SPOTIFY
                </span>
              </>
            ) : templateIndex === 19 ? (
              <>
                <span className="text-white block text-3xl tracking-wider mb-1">
                  NEW EPISODE
                </span>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 5
                </span>
                <span className="block mt-3 text-white">
                  BUY CASHEW NUTS
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  IN BULK
                </span>
                <span className="block mt-4 text-lg text-white/80 tracking-wide">
                  NOW ON YOUTUBE AND SPOTIFY
                </span>
              </>
            ) : templateIndex === 20 ? (
              <>
                <span className="text-white block text-3xl tracking-wider mb-1">
                  NEW EPISODE
                </span>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 6
                </span>
                <span className="block mt-3 text-white">
                  SMILE AT YOURSELF
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  IN THE MIRROR
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  EVERY MORNING
                </span>
                <span className="block mt-4 text-lg text-white/80 tracking-wide">
                  NOW ON YOUTUBE AND SPOTIFY
                </span>
              </>
            ) : templateIndex === 21 ? (
              <>
                <span className="text-white block text-3xl tracking-wider mb-1">
                  NEW EPISODE
                </span>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 7
                </span>
                <span className="block mt-3 text-white">
                  STRETCH
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  DAILY
                </span>
                <span className="block mt-4 text-lg text-white/80 tracking-wide">
                  NOW ON YOUTUBE AND SPOTIFY
                </span>
              </>
            ) : templateIndex === 22 ? (
              <>
                <span className="text-white block text-3xl tracking-wider mb-1">
                  NEW EPISODE
                </span>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 8
                </span>
                <span className="block mt-3 text-white">
                  YOUR 2 MINUTE
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  MEDITATION
                </span>
                <span className="block mt-4 text-lg text-white/80 tracking-wide">
                  NOW ON YOUTUBE AND SPOTIFY
                </span>
              </>
            ) : templateIndex === 23 ? (
              <>
                <span className="text-white block text-3xl tracking-wider mb-1">
                  NEW EPISODE
                </span>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 9
                </span>
                <span className="block mt-3 text-white">
                  DO 1 MINUTE OF SQUATS
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  DAILY
                </span>
                <span className="block mt-4 text-lg text-white/80 tracking-wide">
                  NOW ON YOUTUBE AND SPOTIFY
                </span>
              </>
            ) : templateIndex === 24 ? (
              <>
                <span className="text-white block text-3xl tracking-wider mb-1">
                  NEW EPISODE
                </span>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 10
                </span>
                <span className="block mt-3 text-white">
                  KEEP FROZEN FRUIT AND VEG
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  IN THE FREEZER
                </span>
                <span className="block mt-4 text-lg text-white/80 tracking-wide">
                  NOW ON YOUTUBE AND SPOTIFY
                </span>
              </>
            ) : templateIndex === 25 ? (
              <>
                <span className="text-white block text-3xl tracking-wider mb-1">
                  NEW EPISODE
                </span>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 11
                </span>
                <span className="block mt-3 text-white">
                  SWAP NETFLIX
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  FOR A PODCAST
                </span>
                <span className="block mt-4 text-lg text-white/80 tracking-wide">
                  NOW ON YOUTUBE AND SPOTIFY
                </span>
              </>
            ) : templateIndex === 26 ? (
              <>
                <span className="text-white block text-3xl tracking-wider mb-1">
                  NEW EPISODE
                </span>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 12
                </span>
                <span className="block mt-3 text-white">
                  ALWAYS USE A
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  SHOPPING LIST
                </span>
                <span className="block mt-4 text-lg text-white/80 tracking-wide">
                  NOW ON YOUTUBE AND SPOTIFY
                </span>
              </>
            ) : templateIndex === 28 ? (
              <>
                <span className="text-white block text-3xl tracking-wider mb-1">
                  MASTER
                </span>
                <span className="block mt-3 text-white">
                  1% DAILY
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  IMPROVEMENTS
                </span>
              </>
            ) : templateIndex === 29 ? (
              <>
                <span className="text-white block text-2xl tracking-wider mb-1">
                  THE MASTER TALKING ABOUT
                </span>
                <span className="block mt-3 text-white">
                  1% DAILY
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  IMPROVEMENTS
                </span>
              </>
            ) : templateIndex === 30 ? (
              <>
                <span className="text-white block text-2xl tracking-wider mb-1">
                  NOVAK DJOKOVIC ON
                </span>
                <span className="block mt-3 text-white">
                  THE RIPPLE EFFECT OF
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  CONSCIOUS DAILY BREATHING
                </span>
              </>
            ) : templateIndex === 31 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 13
                </span>
                <span className="block mt-3 text-white">
                  TAKE A SHORT WALK
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  AFTER MEALS
                </span>
              </>
            ) : templateIndex === 32 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 14
                </span>
                <span className="block mt-3 text-white">
                  INCORPORATE MORE NATURE
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  INTO YOUR DAILY LIFE
                </span>
              </>
            ) : templateIndex === 33 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 15
                </span>
                <span className="block mt-3 text-white">
                  TRY AND EAT PROTEIN
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  WITH EVERY MEAL
                </span>
              </>
            ) : templateIndex === 34 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 16
                </span>
                <span className="block mt-3 text-white">
                  ALWAYS TAKE
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  THE STAIRS
                </span>
              </>
            ) : templateIndex === 35 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 17
                </span>
                <span className="block mt-3 text-white">
                  TRY STORE BRAND
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  MEDICINE
                </span>
              </>
            ) : templateIndex === 36 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 18
                </span>
                <span className="block mt-3 text-white">
                  REPLACE ONE SUGARY SNACK
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  WITH A HEALTHIER ALTERNATIVE
                </span>
              </>
            ) : templateIndex === 37 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 19
                </span>
                <span className="block mt-3 text-white">
                  USE AMAZON SUBSCRIBE
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  AND SAVE
                </span>
              </>
            ) : templateIndex === 38 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 20
                </span>
                <span className="block mt-3 text-white">
                  CHECK YOUR POSTURE
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  IN THE MIRROR
                </span>
              </>
            ) : templateIndex === 39 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 21
                </span>
                <span className="block mt-3 text-white">
                  DO 60 SECONDS DEEP BREATHING
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  TWICE A DAY
                </span>
              </>
            ) : templateIndex === 40 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 22
                </span>
                <span className="block mt-3 text-white">
                  LOOK UP AT THE SKY
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  ONCE A DAY
                </span>
              </>
            ) : templateIndex === 41 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 23
                </span>
                <span className="block mt-3 text-white">
                  BOX JUMPING
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  FOR BONE HEALTH
                </span>
              </>
            ) : templateIndex === 42 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 24
                </span>
                <span className="block mt-3 text-white">
                  HAVE A WEEKLY
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  NO SPEND DAY
                </span>
              </>
            ) : templateIndex === 43 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 25
                </span>
                <span className="block mt-3 text-white">
                  TRY ONE NEW FOOD
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  EACH WEEK
                </span>
              </>
            ) : templateIndex === 44 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 26
                </span>
                <span className="block mt-3 text-white">
                  USE ENERGY EFFICIENT DEVICES
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  AT HOME
                </span>
              </>
            ) : templateIndex === 45 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 27
                </span>
                <span className="block mt-3 text-white">
                  USE PUBLIC TRANSPORT
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  TO GET YOUR STEPS IN
                </span>
              </>
            ) : templateIndex === 46 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 28
                </span>
                <span className="block mt-3 text-white">
                  CONNECT WITH
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  A LOVED ONE
                </span>
              </>
            ) : templateIndex === 47 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 29
                </span>
                <span className="block mt-3 text-white">
                  KEEP A NOTEBOOK BY YOUR BED
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  FOR RANDOM THOUGHTS
                </span>
              </>
            ) : templateIndex === 48 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 30
                </span>
                <span className="block mt-3 text-white">
                  WALK DURING
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  PHONE CALLS
                </span>
              </>
            ) : templateIndex === 49 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 31
                </span>
                <span className="block mt-3 text-white">
                  STOP BUYING BOOKS
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  AND GO TO THE LIBRARY
                </span>
              </>
            ) : templateIndex === 50 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 32
                </span>
                <span className="block mt-3 text-white">
                  JOIN A
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  COMMUNITY
                </span>
              </>
            ) : templateIndex === 51 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 33
                </span>
                <span className="block mt-3 text-white">
                  WAIT FOR THE NEXT
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  SALE / PROMO
                </span>
              </>
            ) : templateIndex === 52 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 34
                </span>
                <span className="block mt-3 text-white">
                  TRY SOMETHING
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  NEW
                </span>
              </>
            ) : templateIndex === 53 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 35
                </span>
                <span className="block mt-3 text-white">
                  TRY NATURAL
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  ANXIETY FIXES
                </span>
              </>
            ) : templateIndex === 54 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 36
                </span>
                <span className="block mt-3 text-white">
                  LEARN THESE
                </span>
                <span className="block mt-1 text-white">
                  TWO WORDS
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  BROWN FAT
                </span>
              </>
            ) : templateIndex === 55 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 37
                </span>
                <span className="block mt-3 text-white">
                  SIT AND STAND
                </span>
                <span className="block mt-1 text-white">
                  WITHOUT USING
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  YOUR ARMS
                </span>
              </>
            ) : templateIndex === 56 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 38
                </span>
                <span className="block mt-3 text-white">
                  FIND FREE LOCAL EVENTS
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  FOR YOUR ENTERTAINMENT
                </span>
              </>
            ) : templateIndex === 57 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 39
                </span>
                <span className="block mt-3 text-white">
                  USE A STANDING DESK
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  AT HOME
                </span>
              </>
            ) : templateIndex === 58 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 40
                </span>
                <span className="block mt-3 text-white">
                  BUY IN BULK
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  AND SAVE MORE
                </span>
              </>
            ) : templateIndex === 59 ? (
              <>
                <span className="text-white/90 block text-2xl tracking-wider">
                  BDBT PODCAST 41
                </span>
                <span className="block mt-3 text-white">
                  SPEND TIME IN ZONE 2
                </span>
                <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
                  EVERY DAY
                </span>
              </>
            ) : null}
          </h1>
        </div>

        {/* Bottom BDBT Logo with strong outline - special positioning for template 28, 29 and 30 to cover captions */}
        <div className={`absolute ${templateIndex === 30 ? 'top-[72%]' : templateIndex === 28 || templateIndex === 29 ? 'top-[65%]' : 'bottom-48'} left-1/2 transform -translate-x-1/2 z-30`}>
          <img 
            src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
            alt="BDBT Logo"
            className={`${templateIndex === 28 || templateIndex === 29 || templateIndex === 30 ? 'h-24' : 'h-16'} opacity-90`}
            style={{ 
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,1)) drop-shadow(0 0 4px rgba(255,255,255,0.8)) drop-shadow(2px 2px 4px rgba(0,0,0,0.8))',
            }}
          />
        </div>
        
        {/* Social Media Icons - Bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex gap-4 items-center">
            <Instagram className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))' }} />
            <Youtube className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))' }} />
          </div>
        </div>
      </div>
    </div>
  );
}