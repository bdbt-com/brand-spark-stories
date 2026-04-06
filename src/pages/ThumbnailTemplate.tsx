import React, { useState, useEffect } from 'react';
import { Instagram, Youtube, Facebook } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { TikTokTemplate } from '@/components/TikTokTemplate';
import spotifyLogo from "@/assets/spotify-logo.png";
import tikTokBg from "@/assets/tiktok-background.png";
import newTemplateModernWorld from "@/assets/new-template-modern-world.png";
import newTemplateBdbtExplained from "@/assets/new-template-bdbt-explained.png";
import newTemplateDailyWinDrift from "@/assets/new-template-daily-win-drift.png";
import tiktokBgModernWorld from "@/assets/tiktok-bg-modern-world.png";
import tiktokBgBdbtExplained from "@/assets/tiktok-bg-bdbt-explained.png";
import tiktokBgDailyWins from "@/assets/tiktok-bg-daily-wins.png";
import whyWeFeelStuck from "@/assets/why-we-feel-stuck.png";

const ThumbnailTemplate = () => {
  // Separate state management for YouTube and TikTok modes
  const [youTubeTemplateIndex, setYouTubeTemplateIndex] = useState(0);
  const [tikTokTemplateIndex, setTikTokTemplateIndex] = useState(0);
  const [youTubePhraseIndex, setYouTubePhraseIndex] = useState(0);
  const [tikTokPhraseIndex, setTikTokPhraseIndex] = useState(0);
  const [mode, setMode] = useState<'youtube' | 'instagram'>('youtube');

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
      name: "Wait 24 hours before clicking buy",
      title: "Wait 24 hours before clicking buy",
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
    },
    {
      id: 5,
      name: "Morning Self-Care",
      title: "The Power of Smiling at Yourself",
      subtitle: "in The Mirror Every Morning",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 6,
      name: "Daily Movement",
      title: "The Benefits of Stretching",
      subtitle: "Daily for Your Body",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 7,
      name: "Mindfulness",
      title: "The Power of Meditating",
      subtitle: "for 2 Minutes Daily",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 8,
      name: "Fitness Micro-Habits",
      title: "The Benefits of 1 Minute",
      subtitle: "of Squats a Day",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 9,
      name: "Eating More Greens",
      title: "The Secret to Eating More Greens",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 10,
      name: "Swap Netflix for Podcasts",
      title: "Swap Netflix for Podcasts",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 11,
      name: "Always use a Shopping List",
      title: "Always use a Shopping List",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 12,
      name: "The Importance of Movement after Meals",
      title: "The Importance of Movement after Meals",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 13,
      name: "The Power of nature in your Daily Life",
      title: "The Power of nature in your Daily Life",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 14,
      name: "The Benefits of Protein in Every Meal",
      title: "The Benefits of Protein in Every Meal",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 15,
      name: "The Power of Only Taking the Stairs",
      title: "The Power of Only Taking the Stairs",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 16,
      name: "Healthy Savings from Store Brand Medicine",
      title: "Healthy Savings from Store Brand Medicine",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 17,
      name: "The Importance of Replacing your daily sugar intake",
      title: "The Importance of Replacing your daily sugar intake",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 18,
      name: "The Power of Amazon Subscribe & Save",
      title: "The Power of Amazon Subscribe & Save",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 19,
      name: "Control your posture, Control your day",
      title: "Control your posture, Control your day",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 20,
      name: "60 Seconds of Deep Breathing",
      title: "The Power Of 60 Seconds of Deep Breathing, twice a day",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 21,
      name: "Look UP Every Day",
      title: "Why You Should Look UP, Every Day",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 22,
      name: "Box Jumping for Bone Health",
      title: "Box Jumping for Bone Health (Are you at Risk of osteoporosis?)",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 23,
      name: "Weekly No Spend Day",
      title: "Increase your savings with a Weekly No Spend Day",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 24,
      name: "Try a New Food Each Week",
      title: "The Benefits of trying a new food each week",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 25,
      name: "Daily savings through energy efficiency",
      title: "Daily savings through energy efficiency",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 26,
      name: "Public Transport to Get your Steps in",
      title: "Public Transport to Get your Steps in",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 27,
      name: "The Power of Connecting with Your Loved Ones",
      title: "The Power of Connecting with Your Loved Ones",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 28,
      name: "Keep a Notebook for Random Thoughts",
      title: "Keep a Notebook for Random Thoughts",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 29,
      name: "Walk During Phone Calls",
      title: "Walk During Phone Calls",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 30,
      name: "Stop Buying Books, and Go To The Library",
      title: "Stop Buying Books, and Go To The Library",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 31,
      name: "The Power Of Community",
      title: "The Power Of Community",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 32,
      name: "Wait for the Next Sale / Promo Before you Buy",
      title: "Wait for the Next Sale / Promo Before you Buy",
      subtitle: "Daily Wins Podcast",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 33,
      name: "The Modern World",
      title: "The Modern World is Designed",
      subtitle: "to Keep You Stuck",
      image: "modern-world"
    },
    {
      id: 34,
      name: "BDBT Explained",
      title: "What is BDBT?",
      subtitle: "Big Daddy's Big Tips Explained",
      image: "bdbt-explained"
    },
    {
      id: 35,
      name: "Daily Win or Drift",
      title: "Every Choice is a Daily Win",
      subtitle: "or a Daily Drift",
      image: "daily-win-drift"
    },
    {
      id: 36,
      name: "Why We Feel Stuck",
      title: "Why We Feel",
      subtitle: "Stuck...",
      image: "why-we-feel-stuck"
    },
    {
      id: 37,
      name: "The BDBT Score",
      title: "The BDBT",
      subtitle: "Score",
      image: "/lovable-uploads/bdbt-score-thumbnail.png"
    },
    {
      id: 38,
      name: "Try Something New",
      title: "Try Something New",
      subtitle: "Daily Wins Podcast 34",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 39,
      name: "Try Natural Anxiety Fixes",
      title: "Try Natural Anxiety Fixes",
      subtitle: "Daily Wins Podcast 35",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 40,
      name: "Learn These Words Brown Fat",
      title: "Learn These Words... Brown Fat",
      subtitle: "Daily Wins Podcast 36",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 41,
      name: "Sit Stand Without Arms",
      title: "Sit and Stand Without Using Your Arms",
      subtitle: "Daily Wins Podcast 37",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 42,
      name: "Find Free Local Events",
      title: "Find Free Local Events for Entertainment",
      subtitle: "Daily Wins Podcast 38",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 43,
      name: "Use a Standing Desk",
      title: "Use a Standing Desk at Home",
      subtitle: "Daily Wins Podcast 39",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 44,
      name: "Buy in Bulk and Save",
      title: "Buy in Bulk and Save More",
      subtitle: "Daily Wins Podcast 40",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 45,
      name: "Spend Time in Zone 2",
      title: "Spend Time in Zone 2 Every Day",
      subtitle: "Daily Wins Podcast 41",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 46,
      name: "Go Exploring",
      title: "Go Exploring",
      subtitle: "Daily Wins Podcast 42",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 47,
      name: "Have More Baths",
      title: "Have More Baths",
      subtitle: "Daily Wins Podcast 43",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 48,
      name: "Hang Tough for Grip Strength",
      title: "Hang Tough for Grip Strength",
      subtitle: "Daily Wins Podcast 44",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 49,
      name: "Use Bike or Feet Wherever Possible",
      title: "Use Bike or Feet Wherever Possible",
      subtitle: "Daily Wins Podcast 45",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 50,
      name: "Drink More Green Tea",
      title: "Drink More Green Tea",
      subtitle: "Daily Wins Podcast 46",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 51,
      name: "Get Deliveroo+ for Free with Amazon Prime",
      title: "Get Deliveroo+ for Free with Amazon Prime",
      subtitle: "Daily Wins Podcast 47",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 52,
      name: "Connect More with Animals",
      title: "Connect More with Animals",
      subtitle: "Daily Wins Podcast 48",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 53,
      name: "Appreciate the Things Around You",
      title: "Appreciate the Things Around You",
      subtitle: "Daily Wins Podcast 49",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 54,
      name: "Learn This Word: Sarcopenia",
      title: "Learn This Word: Sarcopenia",
      subtitle: "Daily Wins Podcast 50",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 55,
      name: "Start Your Day With Movement",
      title: "Start Your Day With Movement",
      subtitle: "Daily Wins Podcast 51",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 56,
      name: "Sell Unused Items",
      title: "Sell Unused Items",
      subtitle: "Daily Wins Podcast 52",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 57,
      name: "Use a Spike Mat",
      title: "Use a Spike Mat",
      subtitle: "Daily Wins Podcast 53",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 58,
      name: "Take a Free Online Course",
      title: "Take a Free Online Course",
      subtitle: "Daily Wins Podcast 54",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 59,
      name: "Set a Daily Water Intake Goal",
      title: "Set a Daily Water Intake Goal",
      subtitle: "Daily Wins Podcast 55",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 60,
      name: "Limit Your Screentime Before Bed",
      title: "Limit Your Screentime Before Bed",
      subtitle: "Daily Wins Podcast 56",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 61,
      name: "Learn This Word: Osteoporosis",
      title: "Learn This Word: Osteoporosis",
      subtitle: "Daily Wins Podcast 57",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 62,
      name: "Do One Extra Flight of Stairs Per Day",
      title: "Do One Extra Flight of Stairs Per Day",
      subtitle: "Daily Wins Podcast 58",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 63,
      name: "Time in the Market Beats Timing the Market",
      title: "Time in the Market Beats Timing the Market",
      subtitle: "Daily Wins Podcast 59",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 64,
      name: "Reframe one Thing In Your Life Today",
      title: "Reframe one Thing In Your Life Today",
      subtitle: "Daily Wins Podcast 60",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 65,
      name: "Hide Your Savings From Yourself",
      title: "Hide Your Savings From Yourself",
      subtitle: "Daily Wins Podcast 61",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 66,
      name: "The Choices We Make: Choosing Wins or Drifts",
      title: "The Choices We Make: Choosing Wins or Drifts",
      subtitle: "Daily Wins Podcast — Bonus Episode",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 67,
      name: "Review your Tip Progress",
      title: "Review your Tip Progress",
      subtitle: "Daily Wins Podcast 63",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 68,
      name: "Create an Accountability Group Chat",
      title: "Create an Accountability Group Chat",
      subtitle: "Daily Wins Podcast 64",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 69,
      name: "Use a Handbasket Instead of a Trolley",
      title: "Use a Handbasket Instead of a Trolley",
      subtitle: "Daily Wins Podcast 65",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 70,
      name: "Build a 6-Month Emergency Buffer",
      title: "Build a 6-Month Emergency Buffer",
      subtitle: "Daily Wins Podcast 66",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 71,
      name: "Swap Butter for Peanut Butter",
      title: "Swap Butter for Peanut Butter",
      subtitle: "Daily Wins Podcast 67",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 72,
      name: "Wait 30 Days Before Any Status Spend",
      title: "Wait 30 Days Before Any Status Spend",
      subtitle: "Daily Wins Podcast 68",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 73,
      name: "Hug Daily",
      title: "Hug Daily",
      subtitle: "Daily Wins Podcast 69",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 74,
      name: "Your 5 Minute Daily Reset",
      title: "Your 5 Minute Daily Reset",
      subtitle: "Daily Wins Podcast 70",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 75,
      name: "Drink Warm Lemon Water and Cayenne Pepper",
      title: "Drink Warm Lemon Water and Cayenne Pepper",
      subtitle: "Daily Wins Podcast 71",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 76,
      name: "Do Reverse Lunges While Watching TV",
      title: "Do Reverse Lunges While Watching TV",
      subtitle: "Daily Wins Podcast 72",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 77,
      name: "Don't Upgrade Your Lifestyle with Every Pay Rise",
      title: "Don't Upgrade Your Lifestyle with Every Pay Rise",
      subtitle: "Daily Wins Podcast 73",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 78,
      name: "Learn These Words: Body Composition",
      title: "Learn These Words: Body Composition",
      subtitle: "Daily Wins Podcast 74",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 79,
      name: "Do a Spending Freeze",
      title: "Do a Spending Freeze",
      subtitle: "Daily Wins Podcast 75",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 80,
      name: "Eat the Fibre on Your Plate First",
      title: "Eat the Fibre on Your Plate First",
      subtitle: "Daily Wins Podcast 76",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 81,
      name: "Read for 20 Minutes Every Day",
      title: "Read for 20 Minutes Every Day",
      subtitle: "Daily Wins Podcast 77",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 82,
      name: "Walk for 20 Minutes Every Day",
      title: "Walk for 20 Minutes Every Day",
      subtitle: "Daily Wins Podcast 78",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 83,
      name: "Have a Cold Shower Every Day",
      title: "Have a Cold Shower Every Day",
      subtitle: "Daily Wins Podcast 79",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 84,
      name: "Create a Capsule Wardrobe",
      title: "Create a Capsule Wardrobe",
      subtitle: "Daily Wins Podcast 80",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 85,
      name: "Do a Chore with a Friend",
      title: "Do a Chore with a Friend",
      subtitle: "Daily Wins Podcast 81",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 86,
      name: "Stock Up On Cosmetics When on Sale",
      title: "Stock Up On Cosmetics When on Sale",
      subtitle: "Daily Wins Podcast 82",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 87,
      name: "Podcast 83",
      title: "Walk a Different Route Occasionally",
      subtitle: "Daily Wins Podcast 83",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 88,
      name: "Podcast 84",
      title: "Use Saffron As An Anti-Depressant",
      subtitle: "Daily Wins Podcast 84",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 89,
      name: "Podcast 85",
      title: "Blend Two Goals Into One",
      subtitle: "Daily Wins Podcast 85",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 90,
      name: "Podcast 86",
      title: "Sit. Stand. Sit.",
      subtitle: "Daily Wins Podcast 86",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 91,
      name: "Podcast 87",
      title: "Turn Off Appliances At The Plug",
      subtitle: "Daily Wins Podcast 87",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 92,
      name: "Podcast 88",
      title: "Write Down 3 Things You Accomplished Every Day",
      subtitle: "Daily Wins Podcast 88",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 93,
      name: "Podcast 89",
      title: "Take Advantage of Retail Loyalty Schemes",
      subtitle: "Daily Wins Podcast 89",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 94,
      name: "Podcast 90",
      title: "Stretch for 5 Minutes Before Bed",
      subtitle: "Daily Wins Podcast 90",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 95,
      name: "Podcast 91",
      title: "Take a Short Walk After Meals",
      subtitle: "Daily Wins Podcast 91",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    },
    {
      id: 96,
      name: "Podcast 92",
      title: "Replace One Sugary Drink with Water",
      subtitle: "Daily Wins Podcast 92",
      image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
    }
  ];

  const tikTokTemplates = [
    { id: 0, name: "The Modern World is Designed to Keep You Stuck", title: "The Modern World is Designed to Keep You Stuck", subtitle: "", image: "" },
    { id: 1, name: "Every Choice is a Daily Win or a Daily Drift", title: "Every Choice is a Daily Win or a Daily Drift", subtitle: "", image: "" },
    { id: 2, name: "BDBT Explained", title: "BDBT Explained", subtitle: "", image: "" },
    { id: 3, name: "Why We Stay Stuck", title: "Why We Stay Stuck", subtitle: "", image: "" },
    { id: 4, name: "The Harsh Truth", title: "The Harsh Truth", subtitle: "", image: "" },
    { id: 5, name: "Wins vs Drifts", title: "Wins vs Drifts", subtitle: "", image: "" },
    { id: 6, name: "My Story", title: "My Story", subtitle: "", image: "" },
    { id: 7, name: "Why The Old Model Fails", title: "Why The Old Model Fails", subtitle: "", image: "" },
    { id: 8, name: "What Is BDBT?", title: "What Is BDBT?", subtitle: "", image: "" },
    { id: 9, name: "The Invitation", title: "The Invitation", subtitle: "", image: "" },
    { id: 10, name: "Wait for the Next Sale / Promo Before you Buy", title: "Wait for the Next Sale / Promo Before you Buy", subtitle: "", image: "" },
    { id: 11, name: "December is the Goal...", title: "December is the Goal...", subtitle: "", image: "" },
    { id: 12, name: "The Forever Test", title: "The Forever Test", subtitle: "", image: "" },
    { id: 13, name: "Systems Beat Motivation", title: "Systems Beat Motivation", subtitle: "", image: "" },
    { id: 14, name: "Small Wins Matter", title: "Small Wins Matter", subtitle: "", image: "" },
    { id: 15, name: "Park Further Away On Purpose", title: "Park Further Away On Purpose", subtitle: "", image: "" },
    { id: 16, name: "Making Use of Your Dead Time", title: "Making Use of Your Dead Time", subtitle: "", image: "" },
    { id: 17, name: "Put it in your Basket, wait 24 Hours", title: "Put it in your Basket, wait 24 Hours", subtitle: "", image: "" },
    { id: 18, name: "Drink One Extra Glass of Water Daily", title: "Drink One Extra Glass of Water Daily", subtitle: "", image: "" },
    { id: 19, name: "Buy Cashew Nuts in Bulk", title: "Buy Cashew Nuts in Bulk", subtitle: "", image: "" },
    { id: 20, name: "Smile at Yourself in the Mirror Every Morning", title: "Smile at Yourself in the Mirror Every Morning", subtitle: "", image: "" },
    { id: 21, name: "Stretch Daily", title: "Stretch Daily", subtitle: "", image: "" },
    { id: 22, name: "Your 2 Minute Meditation", title: "Your 2 Minute Meditation", subtitle: "", image: "" },
    { id: 23, name: "Do 1 Minute of Squats Daily", title: "Do 1 Minute of Squats Daily", subtitle: "", image: "" },
    { id: 24, name: "Keep Frozen Fruit and Veg in the Freezer", title: "Keep Frozen Fruit and Veg in the Freezer", subtitle: "", image: "" },
    { id: 25, name: "Swap Netflix, for a Podcast", title: "Swap Netflix, for a Podcast", subtitle: "", image: "" },
    { id: 26, name: "Always Use a Shopping List", title: "Always Use a Shopping List", subtitle: "", image: "" },
    { id: 27, name: "Outro - Follow For More", title: "Follow For More Daily Tips", subtitle: "", image: "" },
    { id: 28, name: "The Master - 1% Daily Improvements", title: "The Master - 1% Daily Improvements", subtitle: "", image: "" },
    { id: 29, name: "Jocko Willink Small Steps", title: "Jocko Willink on taking the small step every day", subtitle: "", image: "" },
    { id: 30, name: "Novak Djokovic Breathing", title: "Novak Djokovic on the ripple effect of conscious daily breathing", subtitle: "", image: "" },
    { id: 31, name: "Podcast 13 Walk After Meals", title: "Take a Short Walk After Meals", subtitle: "", image: "" },
    { id: 32, name: "Podcast 14 Nature", title: "Incorporate more Nature into your Daily Life", subtitle: "", image: "" },
    { id: 33, name: "Podcast 15 Protein", title: "Try and Eat Protein with Every Meal", subtitle: "", image: "" },
    { id: 34, name: "Podcast 16 Stairs", title: "Always Take The Stairs", subtitle: "", image: "" },
    { id: 35, name: "Podcast 17 Store Brand Medicine", title: "Try Store Brand Medicine", subtitle: "", image: "" },
    { id: 36, name: "Podcast 18 Sugary Snack", title: "Replace one Sugary Snack, with a Healthier Alternative", subtitle: "", image: "" },
    { id: 37, name: "Podcast 19 Amazon Subscribe", title: "Use Amazon Subscribe and Save", subtitle: "", image: "" },
    { id: 38, name: "Podcast 20 Check Your Posture", title: "Check Your Posture in The Mirror", subtitle: "", image: "" },
    { id: 39, name: "Podcast 21 Deep Breathing", title: "Do 60 Seconds Deep Breathing, Twice a Day", subtitle: "", image: "" },
    { id: 40, name: "Podcast 22 Look Up", title: "Look up at the sky once a day", subtitle: "", image: "" },
    { id: 41, name: "Podcast 23 Box Jumping", title: "Box Jumping for Bone Health", subtitle: "", image: "" },
    { id: 42, name: "Podcast 24 No Spend Day", title: "Have a Weekly No Spend Day", subtitle: "", image: "" },
    { id: 43, name: "Podcast 25 New Food", title: "Try One New Food Each Week", subtitle: "", image: "" },
    { id: 44, name: "Podcast 26 Energy Efficient", title: "Use Energy Efficient Devices At Home", subtitle: "", image: "" },
    { id: 45, name: "Podcast 27 Public Transport", title: "Use Public Transport To Get Your Steps In", subtitle: "", image: "" },
    { id: 46, name: "Podcast 28 Connect Loved One", title: "Connect With A Loved One", subtitle: "", image: "" },
    { id: 47, name: "Podcast 29 Notebook", title: "Keep A Notebook By Your Bed For Random Thoughts", subtitle: "", image: "" },
    { id: 48, name: "Podcast 30 Walk Phone Calls", title: "Walk During Phone Calls", subtitle: "", image: "" },
    { id: 49, name: "Podcast 31 Library", title: "Stop Buying Books, And Go To The Library", subtitle: "", image: "" },
    { id: 50, name: "Podcast 32 Community", title: "Join A Community", subtitle: "", image: "" },
    { id: 51, name: "Podcast 33 Sale Promo", title: "Wait For The Next Sale / Promo", subtitle: "", image: "" },
    { id: 52, name: "Podcast 34 Try Something New", title: "Try Something New", subtitle: "", image: "" },
    { id: 53, name: "Podcast 35 Natural Anxiety Fixes", title: "Try Natural Anxiety Fixes", subtitle: "", image: "" },
    { id: 54, name: "Podcast 36 Brown Fat", title: "Learn These Two Words Brown Fat", subtitle: "", image: "" },
    { id: 55, name: "Podcast 37 Sit Stand Arms", title: "Sit And Stand Without Using Your Arms", subtitle: "", image: "" },
    { id: 56, name: "Podcast 38 Free Local Events", title: "Find Free Local Events For Your Entertainment", subtitle: "", image: "" },
    { id: 57, name: "Podcast 39 Standing Desk", title: "Use A Standing Desk At Home", subtitle: "", image: "" },
    { id: 58, name: "Podcast 40 Buy in Bulk", title: "Buy In Bulk And Save More", subtitle: "", image: "" },
    { id: 59, name: "Podcast 41 Zone 2", title: "Spend Time In Zone 2 Every Day", subtitle: "", image: "" },
    { id: 60, name: "Podcast 42 Go Exploring", title: "Go Exploring", subtitle: "", image: "" },
    { id: 61, name: "Podcast 43 Have More Baths", title: "Have More Baths", subtitle: "", image: "" },
    { id: 62, name: "Podcast 44 Hang Tough for Grip Strength", title: "Hang Tough for Grip Strength", subtitle: "", image: "" },
    { id: 63, name: "Podcast 45 Use Bike or Feet Wherever Possible", title: "Use Bike or Feet Wherever Possible", subtitle: "", image: "" },
    { id: 64, name: "Podcast 46 Drink More Green Tea", title: "Drink More Green Tea", subtitle: "", image: "" },
    { id: 65, name: "Podcast 47 Get Deliveroo+ for Free with Amazon Prime", title: "Get Deliveroo+ for Free with Amazon Prime", subtitle: "", image: "" },
    { id: 66, name: "Podcast 48 Connect More with Animals", title: "Connect More with Animals", subtitle: "", image: "" },
    { id: 67, name: "Podcast 49 Appreciate the Things Around You", title: "Appreciate the Things Around You", subtitle: "", image: "" },
    { id: 68, name: "Podcast 50 Learn This Word Sarcopenia", title: "Learn This Word: Sarcopenia", subtitle: "", image: "" },
    { id: 69, name: "Podcast 51 Start Your Day With Movement", title: "Start Your Day With Movement", subtitle: "", image: "" },
    { id: 70, name: "Podcast 52 Sell Unused Items", title: "Sell Unused Items", subtitle: "", image: "" },
    { id: 71, name: "Podcast 53 Use a Spike Mat", title: "Use a Spike Mat", subtitle: "", image: "" },
    { id: 72, name: "Podcast 54 Take a Free Online Course", title: "Take a Free Online Course", subtitle: "", image: "" },
    { id: 73, name: "Podcast 55 Set a Daily Water Intake Goal", title: "Set a Daily Water Intake Goal", subtitle: "", image: "" },
    { id: 74, name: "Podcast 56 Limit Your Screentime Before Bed", title: "Limit Your Screentime Before Bed", subtitle: "", image: "" },
    { id: 75, name: "Podcast 57 Learn This Word: Osteoporosis", title: "Learn This Word: Osteoporosis", subtitle: "", image: "" },
    { id: 76, name: "Podcast 58 Do One Extra Flight of Stairs Per Day", title: "Do One Extra Flight of Stairs Per Day", subtitle: "", image: "" },
    { id: 77, name: "Podcast 59 Time in the Market Beats Timing the Market", title: "Time in the Market Beats Timing the Market", subtitle: "", image: "" },
    { id: 78, name: "Podcast 60 Reframe one Thing In Your Life Today", title: "Reframe one Thing In Your Life Today", subtitle: "", image: "" },
    { id: 79, name: "Podcast 61 Hide Your Savings From Yourself", title: "Hide Your Savings From Yourself", subtitle: "", image: "" },
    { id: 80, name: "Bonus — The Choices We Make: Choosing Wins or Drifts", title: "The Choices We Make: Choosing Wins or Drifts", subtitle: "", image: "" },
    { id: 81, name: "Podcast 63 Review your Tip Progress", title: "Review your Tip Progress", subtitle: "", image: "" },
    { id: 82, name: "Podcast 64 Create an Accountability Group Chat", title: "Create an Accountability Group Chat", subtitle: "", image: "" },
     { id: 83, name: "Podcast 65 Use a Handbasket Instead of a Trolley", title: "Use a Handbasket Instead of a Trolley", subtitle: "", image: "" },
     { id: 84, name: "Podcast 66 Build a 6-Month Emergency Buffer", title: "Build a 6-Month Emergency Buffer", subtitle: "", image: "" },
     { id: 85, name: "Podcast 67 Swap Butter for Peanut Butter", title: "Swap Butter for Peanut Butter", subtitle: "", image: "" },
     { id: 86, name: "Podcast 68 Wait 30 Days Before Any Status Spend", title: "Wait 30 Days Before Any Status Spend", subtitle: "", image: "" },
     { id: 87, name: "Podcast 69 Hug Daily", title: "Hug Daily", subtitle: "", image: "" },
     { id: 88, name: "Podcast 70 Your 5 Minute Daily Reset", title: "Your 5 Minute Daily Reset", subtitle: "", image: "" },
     { id: 89, name: "Podcast 71 Drink Warm Lemon Water and Cayenne Pepper", title: "Drink Warm Lemon Water and Cayenne Pepper", subtitle: "", image: "" },
     { id: 90, name: "Podcast 72 Do Reverse Lunges While Watching TV", title: "Do Reverse Lunges While Watching TV", subtitle: "", image: "" },
     { id: 91, name: "Podcast 73 Don't Upgrade Your Lifestyle with Every Pay Rise", title: "Don't Upgrade Your Lifestyle with Every Pay Rise", subtitle: "", image: "" },
     { id: 92, name: "Podcast 74 Learn These Words: Body Composition", title: "Learn These Words: Body Composition", subtitle: "", image: "" },
      { id: 93, name: "Podcast 75 Do a Spending Freeze", title: "Do a Spending Freeze", subtitle: "", image: "" },
      { id: 94, name: "Podcast 76 Eat the Fibre on Your Plate First", title: "Eat the Fibre on Your Plate First", subtitle: "", image: "" },
       { id: 95, name: "Podcast 77 Read for 20 Minutes Every Day", title: "Read for 20 Minutes Every Day", subtitle: "", image: "" },
       { id: 96, name: "Podcast 78 Walk for 20 Minutes Every Day", title: "Walk for 20 Minutes Every Day", subtitle: "", image: "" },
       { id: 97, name: "Podcast 79 Have a Cold Shower Every Day", title: "Have a Cold Shower Every Day", subtitle: "", image: "" },
       { id: 98, name: "Podcast 80 Create a Capsule Wardrobe", title: "Create a Capsule Wardrobe", subtitle: "", image: "" },
       { id: 99, name: "Podcast 81 Do a Chore with a Friend", title: "Do a Chore with a Friend", subtitle: "", image: "" },
       { id: 100, name: "Podcast 82 Stock Up On Cosmetics When on Sale", title: "Stock Up On Cosmetics When on Sale", subtitle: "", image: "" },
       { id: 101, name: "Podcast 83 Walk a Different Route Occasionally", title: "Walk a Different Route Occasionally", subtitle: "", image: "" },
       { id: 102, name: "Podcast 84 Use Saffron As An Anti-Depressant", title: "Use Saffron As An Anti-Depressant", subtitle: "", image: "" },
      { id: 103, name: "Podcast 85 Blend Two Goals Into One", title: "Blend Two Goals Into One", subtitle: "", image: "" },
      { id: 104, name: "Podcast 86 Sit. Stand. Sit.", title: "Sit. Stand. Sit.", subtitle: "", image: "" },
      { id: 105, name: "Podcast 87 Turn Off Appliances At The Plug", title: "Turn Off Appliances At The Plug", subtitle: "", image: "" },
      { id: 106, name: "Podcast 88 Write Down 3 Things You Accomplished Every Day", title: "Write Down 3 Things You Accomplished Every Day", subtitle: "", image: "" },
      { id: 107, name: "Podcast 89 Take Advantage of Retail Loyalty Schemes", title: "Take Advantage of Retail Loyalty Schemes", subtitle: "", image: "" },
      { id: 108, name: "Podcast 90 Stretch for 5 Minutes Before Bed", title: "Stretch for 5 Minutes Before Bed", subtitle: "", image: "" },
      { id: 109, name: "Podcast 92 Replace One Sugary Drink with Water", title: "Replace One Sugary Drink with Water", subtitle: "", image: "" }
  ];

  const phrases = [
    {
      id: 1,
      name: "What is BDBT?",
      whiteText: "What is",
      goldText: "BDBT",
      questionMark: "?",
      design: "large",
      textSize: "text-6xl lg:text-8xl",
      layout: "centered"
    },
    {
      id: 2,
      name: "How does it work?",
      whiteText: "How does it",
      goldText: "work",
      questionMark: "?",
      design: "large",
      textSize: "text-6xl lg:text-8xl",
      layout: "centered"
    },
    {
      id: 3,
      name: "Why does it work?",
      whiteText: "Why does it",
      goldText: "work",
      questionMark: "?",
      design: "large",
      textSize: "text-6xl lg:text-8xl",
      layout: "centered"
    },
    {
      id: 4,
      name: "Where?",
      whiteText: "Where",
      goldText: "",
      questionMark: "?",
      design: "large",
      textSize: "text-6xl lg:text-8xl",
      layout: "centered"
    },
    {
      id: 5,
      name: "When?",
      whiteText: "When",
      goldText: "",
      questionMark: "?",
      design: "large",
      textSize: "text-6xl lg:text-8xl",
      layout: "centered"
    }
  ];

  const tikTokPhrases = [
    {
      id: 1,
      name: "Stop Limiting Yourself",
      whiteText: "STOP",
      goldText: "LIMITING YOURSELF",
      questionMark: "",
      design: "large",
      textSize: "text-4xl lg:text-6xl",
      layout: "centered"
    },
    {
      id: 2,
      name: "This is Your Sign",
      whiteText: "THIS IS",
      goldText: "YOUR SIGN",
      questionMark: "",
      design: "large",
      textSize: "text-4xl lg:text-6xl",
      layout: "centered"
    },
    {
      id: 3,
      name: "Normalize Self Love",
      whiteText: "NORMALIZE",
      goldText: "SELF LOVE",
      questionMark: "",
      design: "large",
      textSize: "text-4xl lg:text-6xl",
      layout: "centered"
    },
    {
      id: 4,
      name: "Plot Twist",
      whiteText: "PLOT TWIST",
      goldText: "YOU WIN",
      questionMark: "",
      design: "large",
      textSize: "text-4xl lg:text-6xl",
      layout: "centered"
    },
    {
      id: 5,
      name: "Level Up",
      whiteText: "LEVEL UP",
      goldText: "YOUR LIFE",
      questionMark: "",
      design: "large",
      textSize: "text-4xl lg:text-6xl",
      layout: "centered"
    }
  ];

  // Helper functions to get current indices and arrays based on mode
  const currentTemplateIndex = mode === 'youtube' ? youTubeTemplateIndex : tikTokTemplateIndex;
  const currentPhraseIndex = mode === 'youtube' ? youTubePhraseIndex : tikTokPhraseIndex;
  const currentTemplates = mode === 'youtube' ? templates : tikTokTemplates;
  const currentPhrases = mode === 'youtube' ? phrases : tikTokPhrases;
  
  // Handler functions for template and phrase selection
  const handleTemplateSelect = (index: number) => {
    if (mode === 'youtube') {
      setYouTubeTemplateIndex(index);
    } else {
      setTikTokTemplateIndex(index);
    }
  };
  
  const handlePhraseSelect = (index: number) => {
    if (mode === 'youtube') {
      setYouTubePhraseIndex(index);
    } else {
      setTikTokPhraseIndex(index);
    }
  };

  


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      {/* Mode Selection Toggle */}
      <div className="flex justify-center pt-8 pb-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-1">
          <button
            onClick={() => setMode('youtube')}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              mode === 'youtube'
                ? 'bg-white text-primary shadow-md'
                : 'text-white hover:bg-white/20'
            }`}
          >
            YouTube (16:9)
          </button>
          <button
            onClick={() => setMode('instagram')}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              mode === 'instagram'
                ? 'bg-white text-primary shadow-md'
                : 'text-white hover:bg-white/20'
            }`}
          >
            Instagram/TikTok (9:16)
          </button>
        </div>
      </div>
      
      {/* Thumbnail Container */}
      <div className="flex items-center justify-center min-h-screen p-8">
        
        {/* Template 1 - Parking Benefits */}
        {currentTemplateIndex === 0 && (
          <div className="relative">
            {mode === 'youtube' ? (
              <div id="thumbnail-0" key="template-0-youtube" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
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
            ) : (
              <TikTokTemplate templateIndex={currentTemplateIndex as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19} />
            )}
          </div>
        )}

        {/* Template 2 - Dead Time */}
        {currentTemplateIndex === 1 && (
          <div className="relative">
            {mode === 'youtube' ? (
              <div id="thumbnail-1" key="template-1-youtube" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
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
            ) : (
              <TikTokTemplate templateIndex={currentTemplateIndex as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19} />
            )}
          </div>
        )}

        {/* Template 3 - Wait 24 hours before clicking buy */}
        {currentTemplateIndex === 2 && (
          <div className="relative">
            {mode === 'youtube' ? (
              <div id="thumbnail-2" key="template-2-youtube" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
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
                        Wait 24 hours
                      </span>
                      <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                        before clicking buy
                      </span>
                    </h1>
                    <p className="text-white/80 text-3xl font-medium">
                      Daily Wins Podcast
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <TikTokTemplate templateIndex={currentTemplateIndex as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19} />
            )}
          </div>
        )}

        {/* Template 4 - Hydration / Placeholder TikTok */}
        {currentTemplateIndex === 3 && (
          <div className="relative">
            {mode === 'youtube' ? (
              <div id="thumbnail-3" key="template-3-youtube" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
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
            ) : (
              <TikTokTemplate templateIndex={currentTemplateIndex as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19} />
            )}
          </div>
        )}

        {/* Template 5 - The Harsh Truth (TikTok only) */}
        {currentTemplateIndex === 4 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={4} />
          </div>
        )}

        {/* Template 6 - Wins vs Drifts (TikTok only) */}
        {currentTemplateIndex === 5 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={5} />
          </div>
        )}

        {/* Template 7 - My Story (TikTok only) */}
        {currentTemplateIndex === 6 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={6} />
          </div>
        )}

        {/* Template 8 - Why The Old Model Fails (TikTok only) */}
        {currentTemplateIndex === 7 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={7} />
          </div>
        )}

        {/* Template 9 - What Is BDBT? (TikTok only) */}
        {currentTemplateIndex === 8 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={8} />
          </div>
        )}

        {/* Template 10 - The Invitation (TikTok only) */}
        {currentTemplateIndex === 9 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={9} />
          </div>
        )}

        {/* Template 11 - Wait for the Next Sale / Promo Before you Buy */}
        {currentTemplateIndex === 10 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={10} />
          </div>
        )}

        {/* Template 12 - December is the Goal... */}
        {currentTemplateIndex === 11 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={11} />
          </div>
        )}

        {/* Template 13 - Why Most Habits Fail... */}
        {currentTemplateIndex === 12 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={12} />
          </div>
        )}

        {/* Template 14 - Systems Beat Motivation */}
        {currentTemplateIndex === 13 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={13} />
          </div>
        )}

        {/* Template 15 - Small Wins Matter */}
        {currentTemplateIndex === 14 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={14} />
          </div>
        )}

        {/* Template 16 - Park Further Away On Purpose */}
        {currentTemplateIndex === 15 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={15} />
          </div>
        )}

        {/* Template 17 - Making Use of Your Dead Time */}
        {currentTemplateIndex === 16 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={16} />
          </div>
        )}

        {/* Template 18 - Put it in your Basket, wait 24 Hours */}
        {currentTemplateIndex === 17 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={17} />
          </div>
        )}

        {/* Template 19 - Why You Must Stay Hydrated */}
        {currentTemplateIndex === 18 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={18} />
          </div>
        )}
        {/* Template 20 - Buy Cashew Nuts in Bulk */}
        {currentTemplateIndex === 19 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={19} />
          </div>
        )}

        {/* Template 21 - Smile at Yourself in the Mirror Every Morning */}
        {currentTemplateIndex === 20 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={20} />
          </div>
        )}

        {/* Template 22 - Stretch Daily */}
        {currentTemplateIndex === 21 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={21} />
          </div>
        )}

        {/* Template 23 - Your 2 Minute Meditation */}
        {currentTemplateIndex === 22 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={22} />
          </div>
        )}

        {/* Template 24 - Do 1 Minute of Squats Daily */}
        {currentTemplateIndex === 23 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={23} />
          </div>
        )}

        {/* Template 25 - Keep Frozen Fruit and Veg in the Freezer */}
        {currentTemplateIndex === 24 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={24} />
          </div>
        )}

        {/* Template 26 - Swap Netflix, for a Podcast */}
        {currentTemplateIndex === 25 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={25} />
          </div>
        )}

        {/* Template 27 - Always Use a Shopping List */}
        {currentTemplateIndex === 26 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={26} />
          </div>
        )}

        {/* Template 28 - Outro - Follow For More */}
        {currentTemplateIndex === 27 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={27} />
          </div>
        )}

        {/* Template 29 - The Master - 1% Daily Improvements */}
        {currentTemplateIndex === 28 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={28} />
          </div>
        )}

        {/* Template 30 - Jocko Willink Small Steps */}
        {currentTemplateIndex === 29 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={29} />
          </div>
        )}

        {/* Template 31 - Novak Djokovic Breathing */}
        {currentTemplateIndex === 30 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={30} />
          </div>
        )}

        {/* Template 32 - Podcast 13 Walk After Meals */}
        {currentTemplateIndex === 31 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={31} />
          </div>
        )}

        {/* Template 33 - Podcast 14 Nature */}
        {currentTemplateIndex === 32 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={32} />
          </div>
        )}

        {/* Template 34 - Podcast 15 Protein */}
        {currentTemplateIndex === 33 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={33} />
          </div>
        )}

        {/* Template 35 - Podcast 16 Stairs */}
        {currentTemplateIndex === 34 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={34} />
          </div>
        )}

        {/* Template 36 - Podcast 17 Store Brand Medicine */}
        {currentTemplateIndex === 35 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={35} />
          </div>
        )}

        {/* Template 37 - Podcast 18 Sugary Snack */}
        {currentTemplateIndex === 36 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={36} />
          </div>
        )}

        {/* Template 38 - Podcast 19 Amazon Subscribe and Save */}
        {currentTemplateIndex === 37 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={37} />
          </div>
        )}

        {/* Template 39 - Podcast 20 Check Your Posture */}
        {currentTemplateIndex === 38 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={38} />
          </div>
        )}

        {/* Template 40 - Podcast 21 Look Up */}
        {currentTemplateIndex === 39 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={39} />
          </div>
        )}

        {/* Template 41 - Podcast 22 Look Up */}
        {currentTemplateIndex === 40 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={40} />
          </div>
        )}

        {/* Template 42 - Podcast 23 Box Jumping */}
        {currentTemplateIndex === 41 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={41} />
          </div>
        )}

        {/* Template 43 - Podcast 24 No Spend Day */}
        {currentTemplateIndex === 42 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={42} />
          </div>
        )}
        {/* Template 44 - Podcast 25 New Food */}
        {currentTemplateIndex === 43 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={43} />
          </div>
        )}
        {/* Template 45 - Podcast 26 Energy Efficient */}
        {currentTemplateIndex === 44 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={44} />
          </div>
        )}
        {/* Template 46 - Podcast 27 Public Transport */}
        {currentTemplateIndex === 45 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={45} />
          </div>
        )}
        {/* Template 47 - Podcast 28 Connect Loved One */}
        {currentTemplateIndex === 46 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={46} />
          </div>
        )}
        {/* Template 48 - Podcast 29 Notebook */}
        {currentTemplateIndex === 47 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={47} />
          </div>
        )}
        {/* Template 49 - Podcast 30 Walk Phone Calls */}
        {currentTemplateIndex === 48 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={48} />
          </div>
        )}
        {/* Template 50 - Podcast 31 Library */}
        {currentTemplateIndex === 49 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={49} />
          </div>
        )}
        {/* Template 51 - Podcast 32 Join a Community */}
        {currentTemplateIndex === 50 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={50} />
          </div>
        )}
        {/* Template 52 - Podcast 33 Wait for Sale */}
        {currentTemplateIndex === 51 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={51} />
          </div>
        )}
        {/* Template 53 - Podcast 34 Try Something New */}
        {currentTemplateIndex === 52 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={52} />
          </div>
        )}
        {/* Template 54 - Podcast 35 Natural Anxiety Fixes */}
        {currentTemplateIndex === 53 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={53} />
          </div>
        )}
        {/* Template 54 - Podcast 36 Brown Fat */}
        {currentTemplateIndex === 54 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={54} />
          </div>
        )}
        {/* Template 55 - Podcast 37 Sit Stand Arms */}
        {currentTemplateIndex === 55 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={55} />
          </div>
        )}
        {/* Template 56 - Podcast 38 Free Local Events */}
        {currentTemplateIndex === 56 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={56} />
          </div>
        )}
        {/* Template 57 - Podcast 39 Standing Desk */}
        {currentTemplateIndex === 57 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={57} />
          </div>
        )}
        {/* Template 58 - Podcast 40 Buy in Bulk */}
        {currentTemplateIndex === 58 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={58} />
          </div>
        )}
        {/* Template 59 - Podcast 41 Zone 2 */}
        {currentTemplateIndex === 59 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={59} />
          </div>
        )}
        {/* Template 60 - Podcast 42 Go Exploring */}
        {currentTemplateIndex === 60 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={60} />
          </div>
        )}
        {/* Template 61 - Podcast 43 Have More Baths */}
        {currentTemplateIndex === 61 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={61} />
          </div>
        )}
        {/* Template 62 - Podcast 44 Hang Tough for Grip Strength */}
        {currentTemplateIndex === 62 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={62} />
          </div>
        )}
        {/* Template 63 - Podcast 45 Use Bike or Feet Wherever Possible */}
        {currentTemplateIndex === 63 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={63} />
          </div>
        )}
        {/* Template 64 - Podcast 46 Drink More Green Tea */}
        {currentTemplateIndex === 64 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={64} />
          </div>
        )}
        {/* Template 65 - Podcast 47 Get Deliveroo+ for Free with Amazon Prime */}
        {currentTemplateIndex === 65 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={65} />
          </div>
        )}
        {/* Template 66 - Podcast 48 Connect More with Animals */}
        {currentTemplateIndex === 66 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={66} />
          </div>
        )}
        {/* Template 67 - Podcast 49 Appreciate the Things Around You */}
        {currentTemplateIndex === 67 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={67} />
          </div>
        )}
        {/* Template 68 - Podcast 50 Learn This Word Sarcopenia */}
        {currentTemplateIndex === 68 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={68} />
          </div>
        )}
        {/* Template 69 - Podcast 51 Start Your Day With Movement */}
        {currentTemplateIndex === 69 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={69} />
          </div>
        )}
        {/* Template 70 - Podcast 52 Sell Unused Items */}
        {currentTemplateIndex === 70 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={70} />
          </div>
        )}
        {/* Template 71 - Podcast 53 Use a Spike Mat */}
        {currentTemplateIndex === 71 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={71} />
          </div>
        )}
        {/* Template 72 - Podcast 54 Take a Free Online Course */}
        {currentTemplateIndex === 72 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={72} />
          </div>
        )}
        {/* Template 73 - Podcast 55 Set a Daily Water Intake Goal */}
        {currentTemplateIndex === 73 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={73} />
          </div>
        )}
        {/* Template 74 - Podcast 56 Limit Your Screentime Before Bed */}
        {currentTemplateIndex === 74 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={74} />
          </div>
        )}
        {/* Template 75 - Podcast 57 Learn This Word: Osteoporosis */}
        {currentTemplateIndex === 75 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={75} />
          </div>
        )}
        {/* Template 76 - Podcast 58 Do One Extra Flight of Stairs Per Day */}
        {currentTemplateIndex === 76 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={76} />
          </div>
        )}
        {/* Template 77 - Podcast 59 Time in the Market Beats Timing the Market */}
        {currentTemplateIndex === 77 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={77} />
          </div>
        )}
        {/* Template 78 - Podcast 60 Reframe one Thing In Your Life Today */}
        {currentTemplateIndex === 78 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={78} />
          </div>
        )}
        {/* Template 79 - Podcast 61 Hide Your Savings From Yourself */}
        {currentTemplateIndex === 79 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={79} />
          </div>
        )}
        {/* Template 80 - Bonus: The Choices We Make */}
        {currentTemplateIndex === 80 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={80} />
          </div>
        )}
        {/* Template 81 - Podcast 63 Review your Tip Progress */}
        {currentTemplateIndex === 81 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={81} />
          </div>
        )}
        {/* Template 82 - Podcast 64 Create an Accountability Group Chat */}
        {currentTemplateIndex === 82 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={82} />
          </div>
        )}
        {/* Template 83 - Podcast 65 Use a Handbasket Instead of a Trolley */}
        {currentTemplateIndex === 83 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={83} />
          </div>
        )}
        {/* Template 84 - Podcast 66 Build a 6-Month Emergency Buffer */}
        {currentTemplateIndex === 84 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={84} />
          </div>
        )}
        {/* Template 85 - Podcast 67 Swap Butter for Peanut Butter */}
        {currentTemplateIndex === 85 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={85} />
          </div>
        )}
        {/* Template 86 - Podcast 68 Wait 30 Days Before Any Status Spend */}
        {currentTemplateIndex === 86 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={86} />
          </div>
        )}
        {/* Template 87 - Podcast 69 Hug Daily */}
        {currentTemplateIndex === 87 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={87} />
          </div>
        )}
        {/* Template 88 - Podcast 70 Your 5 Minute Daily Reset */}
        {currentTemplateIndex === 88 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={88} />
          </div>
        )}
        {/* Template 89 - Podcast 71 Drink Warm Lemon Water and Cayenne Pepper */}
        {currentTemplateIndex === 89 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={89} />
          </div>
        )}
        {/* Template 90 - Podcast 72 Do Reverse Lunges While Watching TV */}
        {currentTemplateIndex === 90 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={90} />
          </div>
        )}
        {/* Template 91 - Podcast 73 Don't Upgrade Your Lifestyle with Every Pay Rise */}
        {currentTemplateIndex === 91 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={91} />
          </div>
        )}
        {/* Template 92 - Podcast 74 Learn These Words: Body Composition */}
        {currentTemplateIndex === 92 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={92} />
          </div>
        )}
        {/* Template 93 - Podcast 75 Do a Spending Freeze */}
        {currentTemplateIndex === 93 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={93} />
          </div>
        )}
        {/* Template 94 - Podcast 76 Eat the Fibre on Your Plate First */}
        {currentTemplateIndex === 94 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={94} />
          </div>
        )}
        {/* Template 95 - Podcast 77 Read for 20 Minutes Every Day */}
        {currentTemplateIndex === 95 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={95} />
          </div>
        )}
        {/* Template 96 - Podcast 78 Walk for 20 Minutes Every Day */}
        {currentTemplateIndex === 96 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={96} />
          </div>
        )}
        {/* Template 97 - Podcast 79 Have a Cold Shower Every Day */}
        {currentTemplateIndex === 97 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={97} />
          </div>
        )}
        {/* Template 98 - Podcast 80 Create a Capsule Wardrobe */}
        {currentTemplateIndex === 98 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={98} />
          </div>
        )}
        {/* Template 99 - Podcast 81 Do a Chore with a Friend */}
        {currentTemplateIndex === 99 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={99} />
          </div>
        )}
        {/* Template 100 - Podcast 82 Stock Up On Cosmetics When on Sale */}
        {currentTemplateIndex === 100 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={100} />
          </div>
        )}
        {/* Template 101 - Podcast 83 Walk a Different Route Occasionally */}
        {currentTemplateIndex === 101 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={101} />
          </div>
        )}
        {/* Template 102 - Podcast 84 Use Saffron As An Anti-Depressant */}
        {currentTemplateIndex === 102 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={102} />
          </div>
        )}
        {/* Template 103 - Podcast 85 Blend Two Goals Into One */}
        {currentTemplateIndex === 103 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={103} />
          </div>
        )}
        {/* Template 104 - Podcast 86 Sit. Stand. Sit. */}
        {currentTemplateIndex === 104 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={104} />
          </div>
        )}
        {/* Template 105 - Podcast 87 Turn Off Appliances At The Plug */}
        {currentTemplateIndex === 105 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={105} />
          </div>
        )}
        {/* Template 106 - Podcast 88 Write Down 3 Things You Accomplished Every Day */}
        {currentTemplateIndex === 106 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={106} />
          </div>
        )}
        {currentTemplateIndex === 107 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={107} />
          </div>
        )}
        {currentTemplateIndex === 108 && mode === 'instagram' && (
          <div className="relative">
            <TikTokTemplate templateIndex={108} />
          </div>
        )}
        {/* Template 5 - Healthy Snacks */}
        {currentTemplateIndex === 4 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-4" key="template-4" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
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
          </div>
        )}

        {/* Template 6 - Morning Self-Care */}
        {currentTemplateIndex === 5 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-5" key="template-5" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[5].image} 
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
                      The Power of Smiling at Yourself
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      in The Mirror Every Morning
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 7 - Daily Movement */}
        {currentTemplateIndex === 6 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-6" key="template-6" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[6].image} 
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
                      The Benefits of Stretching
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Daily for Your Body
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 8 - Mindfulness */}
        {currentTemplateIndex === 7 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-7" key="template-7" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[7].image} 
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
                      The Power of Meditating
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      for 2 Minutes Daily
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 9 - Fitness Micro-Habits */}
        {currentTemplateIndex === 8 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-8" key="template-8" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[8].image} 
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
                      The Benefits of 1 Minute
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      of Squats a Day
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 10 - The Secret to Eating More Greens */}
        {currentTemplateIndex === 9 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-9" key="template-9" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[9].image} 
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
                      The Secret to Eating
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      More Greens
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 11 - Swap Netflix for Podcasts */}
        {currentTemplateIndex === 10 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-10" key="template-10" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[10].image} 
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
                      Swap Netflix
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      for Podcasts
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 12 - Always use a Shopping List */}
        {currentTemplateIndex === 11 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-11" key="template-11" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[11].image} 
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
                      Always use a
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Shopping List
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 13 - The Importance of Movement after Meals */}
        {currentTemplateIndex === 12 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-12" key="template-12" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[12].image} 
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
                      The Importance of Movement
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      after Meals
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 14 - The Power of nature in your Daily Life */}
        {currentTemplateIndex === 13 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-13" key="template-13" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[13].image} 
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
                      The Power of nature in
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      your Daily Life
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 15 - The Benefits of Protein in Every Meal */}
        {currentTemplateIndex === 14 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-14" key="template-14" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[14].image} 
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
                      The Benefits of Protein in
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Every Meal
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 16 - The Power of Only Taking the Stairs */}
        {currentTemplateIndex === 15 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-15" key="template-15" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[15].image} 
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
                      The Power of Only Taking
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      the Stairs
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 17 - Healthy Savings from Store Brand Medicine */}
        {currentTemplateIndex === 16 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-16" key="template-16" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[16].image} 
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
                      Healthy Savings from Store
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Brand Medicine
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 18 - The Importance of Replacing your daily sugar intake */}
        {currentTemplateIndex === 17 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-17" key="template-17" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[17].image} 
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
                      The Importance of Replacing
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      your daily sugar intake
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 19 - The Power of Amazon Subscribe & Save */}
        {currentTemplateIndex === 18 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-18" key="template-18" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[18].image} 
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
                      The Power of Amazon
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Subscribe & Save
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 20 - Control your posture, Control your day */}
        {currentTemplateIndex === 19 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-19" key="template-19" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[19].image} 
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
                      Control your posture,
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Control your day
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 21 - 60 Seconds of Deep Breathing */}
        {currentTemplateIndex === 20 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-20" key="template-20" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[20].image} 
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
                      The Power Of 60 Seconds of
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Deep Breathing, twice a day
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 22 - Look UP Every Day */}
        {currentTemplateIndex === 21 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-21" key="template-21" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[21].image} 
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
                      Why You Should Look UP,
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Every Day
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 23 - Box Jumping for Bone Health */}
        {currentTemplateIndex === 22 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-22" key="template-22" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[22].image} 
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
                      Box Jumping for Bone Health
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      (Are you at Risk of osteoporosis?)
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 24 - Weekly No Spend Day */}
        {currentTemplateIndex === 23 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-23" key="template-23" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[23].image} 
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
                      Increase your savings with a
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Weekly No Spend Day
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 25 - Try a New Food Each Week */}
        {currentTemplateIndex === 24 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-24" key="template-24" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[24].image} 
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
                      The Benefits of trying
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      a new food each week
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 26 - Daily savings through energy efficiency */}
        {currentTemplateIndex === 25 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-25" key="template-25" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[25].image} 
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
                      Daily savings through
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      energy efficiency
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 27 - Public Transport to Get your Steps in */}
        {currentTemplateIndex === 26 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-26" key="template-26" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[26].image} 
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
                      Public Transport to Get
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      your Steps in
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 28 - The Power of Connecting with Your Loved Ones */}
        {currentTemplateIndex === 27 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-27" key="template-27" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[27].image} 
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
                      The Power of Connecting
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      with Your Loved Ones
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 29 - Keep a Notebook for Random Thoughts */}
        {currentTemplateIndex === 28 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-28" key="template-28" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[28].image} 
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
                      Keep a Notebook for
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Random Thoughts
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 30 - Walk During Phone Calls */}
        {currentTemplateIndex === 29 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-29" key="template-29" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[29].image} 
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
                      Walk During
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Phone Calls
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 31 - Stop Buying Books, and Go To The Library */}
        {currentTemplateIndex === 30 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-30" key="template-30" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[30].image} 
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
                      Stop Buying Books, and
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Go To The Library
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 32 - The Power Of Community */}
        {currentTemplateIndex === 31 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-31" key="template-31" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[31].image} 
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
                      The Power Of
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Community
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 33 - Wait for the Next Sale / Promo Before you Buy */}
        {currentTemplateIndex === 32 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-32" key="template-32" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src="/lovable-uploads/recording-setup-new.jpg" 
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
                      Wait for the Next Sale / Promo
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Before you Buy
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 34 - The Modern World (Portrait with blurred edges) */}
        {currentTemplateIndex === 33 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-33" key="template-33" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    {/* Blurred background to extend portrait to square */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center scale-110"
                      style={{ 
                        backgroundImage: `url(${tiktokBgModernWorld})`,
                        filter: 'blur(20px)'
                      }}
                    />
                    {/* Centered portrait image - clean, no blur */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img 
                        src={tiktokBgModernWorld} 
                        alt="The Modern World"
                        className="h-full object-contain"
                      />
                    </div>
                    {/* BDBT Logo */}
                    <div className="absolute bottom-4 left-4 z-10">
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
                      The Modern World is Designed
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      to Keep You Stuck
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 35 - BDBT Explained (Portrait with blurred edges) */}
        {currentTemplateIndex === 34 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-34" key="template-34" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    {/* Blurred background to extend portrait to square */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center scale-110"
                      style={{ 
                        backgroundImage: `url(${tiktokBgBdbtExplained})`,
                        filter: 'blur(20px)'
                      }}
                    />
                    {/* Centered portrait image - clean, no blur */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img 
                        src={tiktokBgBdbtExplained} 
                        alt="BDBT Explained"
                        className="h-full object-contain"
                      />
                    </div>
                    {/* BDBT Logo */}
                    <div className="absolute bottom-4 left-4 z-10">
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
                      What is BDBT?
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Big Daddy's Big Tips Explained
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 36 - Daily Win or Drift (Portrait with blurred edges) */}
        {currentTemplateIndex === 35 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-35" key="template-35" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    {/* Blurred background to extend portrait to square */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center scale-110"
                      style={{ 
                        backgroundImage: `url(${tiktokBgDailyWins})`,
                        filter: 'blur(20px)'
                      }}
                    />
                    {/* Centered portrait image - clean, no blur */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img 
                        src={tiktokBgDailyWins} 
                        alt="Daily Win or Drift"
                        className="h-full object-contain"
                      />
                    </div>
                    {/* BDBT Logo */}
                    <div className="absolute bottom-4 left-4 z-10">
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
                      Every Choice is a Daily Win
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      or a Daily Drift
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 37 - Why We Feel Stuck (Portrait with blurred edges) */}
        {currentTemplateIndex === 36 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-36" key="template-36" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    {/* Blurred background to extend portrait to square */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center scale-110"
                      style={{ 
                        backgroundImage: `url(${whyWeFeelStuck})`,
                        filter: 'blur(20px)'
                      }}
                    />
                    {/* Centered portrait image - clean, no blur */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img 
                        src={whyWeFeelStuck} 
                        alt="Why We Feel Stuck"
                        className="h-full object-contain"
                      />
                    </div>
                    {/* BDBT Logo */}
                    <div className="absolute bottom-4 left-4 z-10">
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
                      Why We Feel
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Stuck...
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 37 - The BDBT Score */}
        {currentTemplateIndex === 37 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-37" key="template-37-youtube" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src="/lovable-uploads/bdbt-score-thumbnail.png" 
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
                      The BDBT
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Score
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 38 - Podcast 34 Try Something New */}
        {currentTemplateIndex === 38 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-38" key="template-38" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[38].image} 
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
                      Try
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Something New
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast 34
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 39 - Podcast 35 Try Natural Anxiety Fixes */}
        {currentTemplateIndex === 39 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-39" key="template-39" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[39].image} 
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
                      Try Natural
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Anxiety Fixes
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast 35
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 40 - Podcast 36 Learn Something New */}
        {currentTemplateIndex === 40 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-40" key="template-40" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates[40].image} 
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
                      Learn These Words...
                    </span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                      Brown Fat
                    </span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">
                    Daily Wins Podcast 36
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 41 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-41" key="template-41" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src={templates[41].image} alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Sit and Stand</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Without Using Your Arms</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 37</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 42 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-42" key="template-42" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src={templates[42].image} alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Find Free Local Events</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>for Entertainment</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 38</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 43 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-43" key="template-43" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src={templates[43].image} alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Use a Standing Desk</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>at Home</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 39</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 44 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-44" key="template-44" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src={templates[44].image} alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Buy in Bulk</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>and Save More</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 40</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 45 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-45" key="template-45" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src={templates[45].image} alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Spend Time in Zone 2</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Every Day</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 41</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 46 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-46" key="template-46" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src={templates[46].image} alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Go</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Exploring</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 42</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 47 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-47" key="template-47" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src={templates[47].image} alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Have More</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Baths</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 43</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 48 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-48" key="template-48" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src={templates[48].image} alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Hang Tough for</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Grip Strength</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 44</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 49 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-49" key="template-49" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src={templates[49].image} alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Use Bike or Feet</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Wherever Possible</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 45</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 50 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-50" key="template-50" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src={templates[50].image} alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Drink More</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Green Tea</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 46</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 51 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-51" key="template-51" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src={templates[51].image} alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Get Deliveroo+ for Free</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>with Amazon Prime</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 47</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 52 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-52" key="template-52" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src={templates[52].image} alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Connect More</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>with Animals</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 48</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 53 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-53" key="template-53" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Appreciate the Things</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Around You</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 49</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 54 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-54" key="template-54" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Learn This Word:</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Sarcopenia</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 50</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 55 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-55" key="template-55" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Start Your Day</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>With Movement</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 51</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 56 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-56" key="template-56" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Sell Unused</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Items</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 52</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 57 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-57" key="template-57" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Use a</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Spike Mat</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 53</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 58 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-58" key="template-58" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Take a Free</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Online Course</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 54</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 59 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-59" key="template-59" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Set a Daily Water</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Intake Goal</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 55</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 60 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-60" key="template-60" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Limit Your Screentime</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Before Bed</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 56</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 61 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-61" key="template-61" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Learn This Word:</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Osteoporosis</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 57</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 62 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-62" key="template-62" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Do One Extra Flight of</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Stairs Per Day</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 58</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 63 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-63" key="template-63" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Time in the Market Beats</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Timing the Market</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 59</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 64 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-64" key="template-64" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Reframe one Thing</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>In Your Life Today</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 60</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 65 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-65" key="template-65" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Hide Your Savings</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>From Yourself</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 61</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 66 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-66" key="template-66" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">The Choices We Make</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Choosing Wins or Drifts</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast — Bonus Episode</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 67 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-67" key="template-67" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Review Your Tip</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Progress</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 63</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 68 - Podcast 64 Create an Accountability Group Chat (YouTube) */}
        {currentTemplateIndex === 68 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-68" key="template-68" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img 
                      src={templates.find(t => t.id === 68)?.image} 
                      alt="Podcast 64"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/bdbt-logo-transparent.png" alt="BDBT" className="w-16 h-16 object-contain" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Create an Accountability</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Group Chat</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 64</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 69 - Podcast 65 Use a Handbasket Instead of a Trolley (YouTube) */}
        {currentTemplateIndex === 69 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-69" key="template-69" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Use a Handbasket</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Instead of a Trolley</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 65</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 70 - Podcast 66 Build a 6-Month Emergency Buffer (YouTube) */}
        {currentTemplateIndex === 70 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-70" key="template-70" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Build a 6-Month</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Emergency Buffer</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 66</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 71 - Podcast 67 Swap Butter for Peanut Butter (YouTube) */}
        {currentTemplateIndex === 71 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-71" key="template-71" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Swap Butter for</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Peanut Butter</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 67</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 72 - Podcast 68 Wait 30 Days Before Any Status Spend (YouTube) */}
        {currentTemplateIndex === 72 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-72" key="template-72" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Wait 30 Days Before</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Any Status Spend</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 68</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 73 - Podcast 69 Hug Daily (YouTube) */}
        {currentTemplateIndex === 73 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-73" key="template-73" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Hug</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Daily</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 69</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 74 - Podcast 70 Your 5 Minute Daily Reset (YouTube) */}
        {currentTemplateIndex === 74 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-74" key="template-74" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Your 5 Minute</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Daily Reset</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 70</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 75 - Podcast 71 Drink Warm Lemon Water and Cayenne Pepper (YouTube) */}
        {currentTemplateIndex === 75 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-75" key="template-75" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Drink Warm Lemon Water</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>and Cayenne Pepper</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 71</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 76 - Podcast 72 Do Reverse Lunges While Watching TV (YouTube) */}
        {currentTemplateIndex === 76 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-76" key="template-76" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Do Reverse Lunges</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>While Watching TV</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 72</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 77 - Podcast 73 Don't Upgrade Your Lifestyle with Every Pay Rise (YouTube) */}
        {currentTemplateIndex === 77 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-77" key="template-77" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Don't Upgrade Your</span>
                    <span className="text-white block mb-2">Lifestyle with</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Every Pay Rise</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 73</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 78 - Podcast 74 Learn These Words: Body Composition (YouTube) */}
        {currentTemplateIndex === 78 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-78" key="template-78" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Learn These Words:</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Body Composition</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 74</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 79 - Podcast 75 Do a Spending Freeze (YouTube) */}
        {currentTemplateIndex === 79 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-79" key="template-79" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Do a</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Spending Freeze</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 75</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 80 - Podcast 76 Eat the Fibre on Your Plate First (YouTube) */}
        {currentTemplateIndex === 80 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-80" key="template-80" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Eat the Fibre on</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Your Plate First</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 76</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 81 - Podcast 77 Read for 20 Minutes Every Day (YouTube) */}
        {currentTemplateIndex === 81 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-81" key="template-81" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Read for 20 Minutes</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Every Day</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 77</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 82 - Podcast 78 Walk for 20 Minutes Every Day (YouTube) */}
        {currentTemplateIndex === 82 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-82" key="template-82" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Walk for 20 Minutes</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Every Day</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 78</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 83 - Podcast 79 Have a Cold Shower Every Day (YouTube) */}
        {currentTemplateIndex === 83 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-83" key="template-83" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Have a Cold Shower</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Every Day</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 79</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 84 - Podcast 80 Create a Capsule Wardrobe (YouTube) */}
        {currentTemplateIndex === 84 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-84" key="template-84" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Create a Capsule</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Wardrobe</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 80</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 85 - Podcast 81 Do a Chore with a Friend (YouTube) */}
        {currentTemplateIndex === 85 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-85" key="template-85" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Do a Chore with</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>a Friend</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 81</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 86 - Podcast 82 Stock Up On Cosmetics When on Sale (YouTube) */}
        {currentTemplateIndex === 86 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-86" key="template-86" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Stock Up On Cosmetics</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>When on Sale</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 82</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 87 - Podcast 83 Walk a Different Route Occasionally (YouTube) */}
        {currentTemplateIndex === 87 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-87" key="template-87" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Walk a Different</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Route Occasionally</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 83</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 88 - Podcast 84 Use Saffron As An Anti-Depressant (YouTube) */}
        {currentTemplateIndex === 88 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-88" key="template-88" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Use Saffron As An</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Anti-Depressant</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 84</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Template 89 - Podcast 85 Blend Two Goals Into One (YouTube) */}
        {currentTemplateIndex === 89 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-89" key="template-89" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Blend Two Goals</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Into One</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 85</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 90 - Podcast 86 Sit. Stand. Sit. (YouTube) */}
        {currentTemplateIndex === 90 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-90" key="template-90" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Sit. Stand.</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Sit.</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">BDBT Podcast 86</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 91 - Podcast 87 Turn Off Appliances At The Plug (YouTube) */}
        {currentTemplateIndex === 91 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-91" key="template-91" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Turn Off Appliances</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>At The Plug</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 87</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 92 - Podcast 88 Write Down 3 Things You Accomplished Every Day (YouTube) */}
        {currentTemplateIndex === 92 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-92" key="template-92" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Write Down 3 Things</span>
                    <span className="text-white block mb-2">You Accomplished</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Every Day</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 88</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentTemplateIndex === 93 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-93" key="template-93" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Take Advantage of</span>
                    <span className="text-white block mb-2">Retail Loyalty</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Schemes</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 89</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 94 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-94" key="template-94" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Stretch for 5 Minutes</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Before Bed</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 90</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTemplateIndex === 95 && mode === 'youtube' && (
          <div className="relative">
            <div id="thumbnail-95" key="template-95" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Take a Short Walk</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>After Meals</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 91</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Podcast 92 - Replace One Sugary Drink with Water */}
        {currentTemplateIndex === 109 && mode === 'tiktok' && (
          <div className="flex justify-center">
            <TikTokTemplate templateIndex={109} />
          </div>
        )}

        {currentTemplateIndex === 96 && mode === 'youtube' && (
          <div className="flex justify-center">
            <div id="thumbnail-96" key="template-96" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
              <div className="h-full flex items-center p-16 relative">
                <div className="absolute right-16 top-16 bottom-16 flex items-center">
                  <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
                    <img src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
                    <div className="absolute bottom-4 left-4">
                      <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                    <span className="text-white block mb-2">Replace One Sugary</span>
                    <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Drink with Water</span>
                  </h1>
                  <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 92</p>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>

      {/* Template Selection Carousel */}
      <div className="pb-16 px-8">
        <h3 className="text-white text-xl font-semibold text-center mb-6">
          Choose a Template ({mode === 'youtube' ? 'YouTube 16:9' : 'Instagram/TikTok 9:16'})
        </h3>
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {currentTemplates.map((template, index) => (
              <CarouselItem key={template.id} className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5">
                <button
                  onClick={() => handleTemplateSelect(index)}
                  className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    currentTemplateIndex === index
                      ? 'bg-white text-primary shadow-lg scale-105'
                      : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
                  }`}
                >
                  {index + 1}. {template.name}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white border-white/30 hover:bg-white/20" />
          <CarouselNext className="text-white border-white/30 hover:bg-white/20" />
        </Carousel>
      </div>


      {/* Chroma Key Green Section for Video Subtitles/Headings */}
      <div className="w-full py-20 px-8 flex justify-center">
        <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl border-4 border-white/20 p-16 bg-gradient-to-br from-primary via-primary/90 to-primary/80">
          {/* Dynamic Phrase Content */}
          <div className={`flex items-center justify-center min-h-[200px] ${
            currentPhrases[currentPhraseIndex].layout === 'left' ? 'justify-start' : 
            currentPhrases[currentPhraseIndex].layout === 'right' ? 'justify-end' : 'justify-center'
          }`}>
            <div className={`${currentPhrases[currentPhraseIndex].layout === 'centered' ? 'text-center' : 
              currentPhrases[currentPhraseIndex].layout === 'left' ? 'text-left' : 'text-right'
            }`}>
               <h1 className={`${currentPhrases[currentPhraseIndex].textSize} font-black leading-tight font-black`}>
                <span className="text-white">{currentPhrases[currentPhraseIndex].whiteText}</span>
                {currentPhrases[currentPhraseIndex].goldText && (
                  <span className="ml-3" style={{ color: 'hsl(35, 45%, 75%)' }}>
                    {currentPhrases[currentPhraseIndex].goldText}
                  </span>
                )}
                <span className="text-white">{currentPhrases[currentPhraseIndex].questionMark}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Phrase Selection Carousel */}
      <div className="w-full bg-gray-50 py-8">
        <div className="container mx-auto px-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Choose Your Phrase</h3>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {currentPhrases.map((phrase, index) => (
                <CarouselItem key={index} className="pl-4 basis-1/1 md:basis-1/2 lg:basis-1/3">
                  <Card 
                    className={`cursor-pointer transition-all duration-200 ${
                      index === currentPhraseIndex 
                        ? 'ring-2 ring-primary shadow-lg' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handlePhraseSelect(index)}
                  >
                    <CardContent className="p-6">
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-600 mb-2">Preview:</div>
                          <div className={`${phrase.textSize === 'text-6xl' ? 'text-lg' : 'text-base'} font-black leading-tight`}>
                            <span className="text-gray-800">{phrase.whiteText}</span>
                            {phrase.goldText && (
                              <span className="ml-1 text-yellow-600">{phrase.goldText}</span>
                            )}
                            <span className="text-gray-800">{phrase.questionMark}</span>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-800 text-center">
                        {phrase.whiteText}{phrase.goldText && ` ${phrase.goldText}`}{phrase.questionMark}
                      </h4>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>

      {/* New Banner Art Template */}
      <div className="border-t border-white/20 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85">
        <div className="container mx-auto px-8 py-16">
          {/* Banner Preview Container */}
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-none relative">
              {/* New Banner Template - Optimized 2560x1440 dimensions */}
              <div id="new-banner" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary/80 shadow-2xl mx-auto">
                <div className="h-full flex flex-col p-16 relative">
                  
                  {/* Social Media Icons at very top */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
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
                  </div>

                  {/* Daily Wins Podcast - Below icons */}
                  <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-30 text-center">
                    <h1 className="text-4xl font-bold leading-tight mb-4">
                      <span className="text-white block">
                        Daily Wins
                      </span>
                      <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
                        Podcast
                      </span>
                    </h1>
                  </div>

                  {/* BDBT Logo - Centered above the text */}
                  <div className="absolute top-77 left-1/2 transform -translate-x-1/2 z-30">
                  <img 
                    src="/lovable-uploads/bdbt-logo-transparent.png" 
                    alt="BDBT Logo" 
                    className="h-8 object-contain opacity-80"
                  />
                  </div>

                  {/* Social Media Icons - Left Side (Instagram and YouTube) */}
                  <div className="absolute top-78 left-1/2 -translate-x-20 z-30 flex gap-3 items-center">
                    <Instagram className="w-6 h-6 text-white" />
                    <Youtube className="w-6 h-6 text-white" />
                  </div>

                  {/* Social Media Icons - Right Side (Facebook and Spotify) */}
                  <div className="absolute top-78 left-1/2 translate-x-14 z-30 flex gap-3 items-center">
                    <Facebook className="w-6 h-6 text-white" />
                    <img src={spotifyLogo} alt="Spotify" className="w-6 h-6" />
                  </div>

                  {/* @BigDaddysBigTips - Centered between podcast title and images */}
                  <div className="absolute top-80 left-1/2 transform -translate-x-1/2 z-30">
                    <h1 className="text-5xl xl:text-6xl font-black text-center leading-tight whitespace-nowrap">
                      <span className="text-white font-black">@BigDaddys</span><span className="font-black" style={{ color: 'hsl(35, 45%, 75%)' }}>BigTips</span>
                    </h1>
                  </div>

                  {/* 3 Images at bottom */}
                  <div className="absolute bottom-12 left-8 right-8 z-10">
                    <div className="flex gap-6 justify-between">
                      <div className="w-96 h-64 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg">
                        <img 
                          src="/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
                          alt="Featured Image 1"
                          className="w-full h-full object-cover opacity-80"
                        />
                      </div>
                      <div className="w-96 h-64 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg">
                        <img 
                          src="/lovable-uploads/recording-setup-new-2.jpg"
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