// Daily Wins Test: the 28 scales from Ben's "Daily Win Scales" sheet,
// grouped into the five life areas shown in the mock-ups in Ben's homepage document. Each scale is answered 1 to 10 (10 = the positive end).
// Which scale sits in which area is a draft for Ben to review. The area names, priority options,
// and the Health, Money and Habits wording come from his mock-ups. Edit freely; the page reads everything from here.

export type AreaId = "health" | "money" | "relationships" | "habits" | "purpose";

export interface Scale {
  id: string;
  positive: string; // 10 end
  negative: string; // 1 end
  area: AreaId;
}

export const SCALES: Scale[] = [
  { id: "confident", positive: "Confident", negative: "Anxious & self-doubting", area: "purpose" },
  { id: "financially-free", positive: "Financially free", negative: "Financially stressed", area: "money" },
  { id: "energetic", positive: "Energetic", negative: "Lethargic", area: "health" },
  { id: "body-confident", positive: "Body confident", negative: "Body conscious", area: "health" },
  { id: "fit-capable", positive: "Fit & capable", negative: "Unfit & limited", area: "health" },
  { id: "physically-strong", positive: "Physically strong", negative: "Physically weak", area: "health" },
  { id: "rested", positive: "Rested & restored", negative: "Tired & drained", area: "health" },
  { id: "calm", positive: "Calm & in control", negative: "Overwhelmed", area: "health" },
  { id: "time-rich", positive: "Time-rich", negative: "Always rushed", area: "habits" },
  { id: "fulfilling-job", positive: "Fulfilling job", negative: "Drained & disengaged", area: "purpose" },
  { id: "purpose", positive: "Clear sense of purpose", negative: "Drifting", area: "purpose" },
  { id: "deep-relationships", positive: "Deep relationships", negative: "Disconnected", area: "relationships" },
  { id: "connected", positive: "Connected & supported", negative: "Lonely & isolated", area: "relationships" },
  { id: "proud", positive: "Proud of myself", negative: "Disappointed in myself", area: "purpose" },
  { id: "lots-to-offer", positive: "Lots to offer", negative: "Little to offer", area: "purpose" },
  { id: "learning", positive: "Constantly learning", negative: "Stagnating", area: "purpose" },
  { id: "follow-through", positive: "I do what I say", negative: "I rarely follow through", area: "habits" },
  { id: "intentional", positive: "Intentional", negative: "Reactive", area: "habits" },
  { id: "phone", positive: "I control my phone", negative: "It controls me", area: "habits" },
  { id: "nourishing", positive: "Nourishing myself", negative: "Convenience-led diet", area: "health" },
  { id: "active", positive: "Naturally active", negative: "Mostly sedentary", area: "health" },
  { id: "alcohol", positive: "Intentional alcohol", negative: "Habitual or excessive", area: "health" },
  { id: "organised", positive: "Organised environment", negative: "Cluttered & chaotic", area: "habits" },
  { id: "living-fully", positive: "Living fully", negative: "Putting life off", area: "purpose" },
  { id: "impact", positive: "Making an impact", negative: "Not offering what I could", area: "purpose" },
  { id: "capable", positive: "Becoming more capable", negative: "Staying the same", area: "purpose" },
  { id: "time-freedom", positive: "Time freedom", negative: "Time restricted", area: "habits" },
  { id: "life-great", positive: "Life feels great", negative: "Something's missing", area: "purpose" },
];

export interface AreaContent {
  id: AreaId;
  name: string;
  short: string;
  priorityLabel: string;
  low: string;
  mid: string;
  high: string;
  dailyWin: { title: string; detail: string };
  course?: { title: string; detail: string; href: string; external?: boolean; comingSoon?: boolean };
  tipsPath: string;
}

export const AREAS: AreaContent[] = [
  {
    id: "health",
    name: "Health & Energy",
    short: "Health",
    priorityLabel: "Health, movement and energy",
    low: "Your answers suggest that movement is an area you'd like to improve. You don't need an ambitious exercise routine to begin.",
    mid: "You have some good foundations, but your body isn't getting consistent signals to stay strong and rested. Small, repeatable movement attached to things you already do will compound quickly.",
    high: "You're investing well in your health and energy. Protect the routines that are working, because they make almost every other Daily Win easier.",
    dailyWin: {
      title: "Walk during one phone call each day",
      detail: "Or add a short walk to an existing routine.",
    },
    course: {
      title: "The Invisible Workout",
      detail: "Discover ways to incorporate more movement into the life you're already living.",
      href: "https://bigdaddysbigtips.xperiencify.io/",
      external: true,
    },
    tipsPath: "/tips",
  },
  {
    id: "money",
    name: "Financial Wellbeing",
    short: "Money",
    priorityLabel: "Money and financial confidence",
    low: "Your answers suggest money is currently an important source of stress. Small, repeatable financial habits could help you feel more in control.",
    mid: "You're getting by, but there's room to feel more in control of where your money goes. A few set-once systems can quietly do the heavy lifting for you.",
    high: "You have a healthy sense of control over your money. Keep automating the good decisions so they don't depend on how you feel each month.",
    dailyWin: {
      title: "Review one regular expense this week",
      detail: "Choose one regular expense to review this week, and identify one small saving you could automate.",
    },
    course: {
      title: "The Invisible Pay Rise",
      detail: "A practical course exploring ways to improve your finances through everyday decisions and better systems.",
      href: "/tips",
      comingSoon: true,
    },
    tipsPath: "/tips",
  },
  {
    id: "relationships",
    name: "Relationships",
    short: "Relationships",
    priorityLabel: "Relationships and happiness",
    low: "Your answers suggest you're feeling more disconnected than you'd like. Relationships are built in thousands of small moments, and you can start adding those today.",
    mid: "You have people around you, but those connections could feel deeper and more supportive. Being more present, more often, compounds just like any other habit.",
    high: "You feel connected and supported. That's one of the strongest foundations for a good life. Keep investing in the people who matter.",
    dailyWin: {
      title: "One phone-free meal a day",
      detail: "No phone, no TV, no laptop. Just you, the food and whoever you're with. Conversations get deeper, and you'll notice how much of your attention the screen was taking.",
    },
    tipsPath: "/tips",
  },
  {
    id: "habits",
    name: "Time & Focus",
    short: "Time & Focus",
    priorityLabel: "Habits, consistency and productivity",
    low: "You may know which habits you'd like to change, but find it difficult to maintain them. Understanding your Comfort Trades could help.",
    mid: "You follow through some of the time, but distractions and old patterns keep pulling you back. Making the better choice the easier choice will do far more than willpower.",
    high: "You do what you say you'll do, and that's rarer than you might think. Use it to layer in one new Daily Win at a time.",
    dailyWin: {
      title: "Record one habit",
      detail: "Choose one habit and record what triggers it, what immediate reward it offers and how you feel afterwards.",
    },
    tipsPath: "/tips",
  },
  {
    id: "purpose",
    name: "Purpose & Fulfilment",
    short: "Purpose",
    priorityLabel: "Purpose, career and fulfilment",
    low: "Your answers suggest you're feeling a bit stuck, like life is being put off until later. You don't need a life-changing moment. You need one small action that proves to yourself you're moving forward.",
    mid: "Life is ticking along, but something feels like it's missing. Small, deliberate steps towards learning and growth will start to change how you see yourself.",
    high: "You have direction and you're growing. Keep stretching yourself, and think about who else could benefit from what you've learned.",
    dailyWin: {
      title: "Write down three wins before bed",
      detail: "Every evening, write three things you did well today, however small. You're collecting evidence that you're someone who makes progress, and that changes your identity over time.",
    },
    tipsPath: "/tips",
  },
];

export type StartPreference = "free" | "course" | "event" | "coaching" | "unsure";

export const START_OPTIONS: { id: StartPreference; label: string }[] = [
  { id: "free", label: "Something free I can try myself" },
  { id: "course", label: "A self-paced course" },
  { id: "event", label: "An online or in-person event" },
  { id: "coaching", label: "Personal coaching or mentoring" },
  { id: "unsure", label: "I'm not sure, guide me" },
];

export const band = (score: number): "low" | "mid" | "high" =>
  score < 5 ? "low" : score < 8 ? "mid" : "high";

export const bandLabel = (score: number) =>
  score < 5 ? "Drifting" : score < 8 ? "Building" : "Thriving";

export interface TestResult {
  answers: Record<string, number>;
  areaScores: Record<AreaId, number>;
  overall: number; // 0 to 100
  startArea: AreaId;
  priority: AreaId | "unsure";
  preference: StartPreference;
}

export const computeResult = (
  answers: Record<string, number>,
  priority: AreaId | "unsure",
  preference: StartPreference,
): TestResult => {
  const areaScores = {} as Record<AreaId, number>;
  AREAS.forEach((a) => {
    const vals = SCALES.filter((s) => s.area === a.id).map((s) => answers[s.id] ?? 5);
    areaScores[a.id] = Math.round((vals.reduce((x, y) => x + y, 0) / vals.length) * 10) / 10;
  });
  const all = SCALES.map((s) => answers[s.id] ?? 5);
  const overall = Math.round((all.reduce((x, y) => x + y, 0) / all.length) * 10);
  const lowest = [...AREAS].sort((a, b) => areaScores[a.id] - areaScores[b.id])[0].id;
  // Start with their chosen priority unless they're already thriving there.
  const startArea = priority !== "unsure" && areaScores[priority] < 8 ? priority : lowest;
  return { answers, areaScores, overall, startArea, priority, preference };
};
