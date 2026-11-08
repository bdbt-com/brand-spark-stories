// Daily Wins Test — the 28 scales from Ben's "Daily Win Scales" sheet,
// grouped into six life areas. Each scale is answered 1–10 (10 = the positive end).
// Draft grouping and copy for Ben to review — edit freely, the page reads everything from here.

export type AreaId = "body" | "energy" | "money" | "relationships" | "habits" | "purpose";

export interface Scale {
  id: string;
  positive: string; // 10 end
  negative: string; // 1 end
  area: AreaId;
}

export const SCALES: Scale[] = [
  { id: "confident", positive: "Confident", negative: "Anxious / self-doubting", area: "purpose" },
  { id: "financially-free", positive: "Financially free", negative: "Financially stressed", area: "money" },
  { id: "energetic", positive: "Energetic", negative: "Lethargic", area: "energy" },
  { id: "body-confident", positive: "Body confident", negative: "Body conscious", area: "body" },
  { id: "fit-capable", positive: "Fit & capable", negative: "Unfit & limited", area: "body" },
  { id: "physically-strong", positive: "Physically strong", negative: "Physically weak", area: "body" },
  { id: "rested", positive: "Rested & restored", negative: "Tired & drained", area: "energy" },
  { id: "calm", positive: "Calm & in control", negative: "Overwhelmed", area: "energy" },
  { id: "time-rich", positive: "Time-rich", negative: "Always rushed", area: "money" },
  { id: "fulfilling-job", positive: "Fulfilling job", negative: "Drained & disengaged", area: "money" },
  { id: "purpose", positive: "Clear sense of purpose", negative: "Drifting", area: "purpose" },
  { id: "deep-relationships", positive: "Deep relationships", negative: "Disconnected", area: "relationships" },
  { id: "connected", positive: "Connected & supported", negative: "Lonely & isolated", area: "relationships" },
  { id: "proud", positive: "Proud of myself", negative: "Disappointed in myself", area: "habits" },
  { id: "lots-to-offer", positive: "Lots to offer", negative: "Little to offer", area: "purpose" },
  { id: "learning", positive: "Constantly learning", negative: "Stagnating", area: "purpose" },
  { id: "follow-through", positive: "I do what I say", negative: "I rarely follow through", area: "habits" },
  { id: "intentional", positive: "Intentional", negative: "Reactive", area: "habits" },
  { id: "phone", positive: "I control my phone", negative: "It controls me", area: "habits" },
  { id: "nourishing", positive: "Nourishing myself", negative: "Convenience-led diet", area: "body" },
  { id: "active", positive: "Naturally active", negative: "Mostly sedentary", area: "body" },
  { id: "alcohol", positive: "Intentional alcohol", negative: "Habitual / excessive", area: "energy" },
  { id: "organised", positive: "Organised environment", negative: "Cluttered & chaotic", area: "habits" },
  { id: "living-fully", positive: "Living fully", negative: "Putting life off", area: "purpose" },
  { id: "impact", positive: "Making an impact", negative: "Not offering what I could", area: "relationships" },
  { id: "capable", positive: "Becoming more capable", negative: "Staying the same", area: "purpose" },
  { id: "time-freedom", positive: "Time freedom", negative: "Time restricted", area: "money" },
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
    id: "body",
    name: "Body & Movement",
    short: "Body",
    priorityLabel: "Health, movement and fitness",
    low: "Your answers suggest movement and nutrition are areas you'd like to improve. You don't need an ambitious exercise routine to begin. Your body adapts to what you repeatedly give it, and right now it isn't being asked for much.",
    mid: "You've got some good foundations, but your body isn't getting consistent signals to stay strong and capable. Small, repeatable movement attached to things you already do will compound quickly.",
    high: "You're investing well in your body. Keep making deposits into your muscular retirement pot, because the strength you build now is the independence you keep later.",
    dailyWin: {
      title: "10 squats in the shower",
      detail: "You're in there anyway. 10 squats a day is over 3,500 a year you wouldn't otherwise do, and it takes no extra time out of your day.",
    },
    course: {
      title: "The Invisible Workout",
      detail: "Build a complete workout into your existing routine. No gym. No extra time. No relying on motivation.",
      href: "https://bigdaddysbigtips.xperiencify.io/",
      external: true,
    },
    tipsPath: "/tips",
  },
  {
    id: "energy",
    name: "Energy & Recovery",
    short: "Energy",
    priorityLabel: "Sleep, energy and stress",
    low: "Your answers suggest you're running on empty. Low energy is rarely a willpower problem. It's usually a recovery problem, and it quietly makes every other good decision harder.",
    mid: "Your energy is okay some of the time, but recovery isn't consistent. Protecting your sleep and calming your evenings is one of the highest-return changes you can make.",
    high: "You're recovering well, and it shows. Protect the routines that are working, because good sleep makes almost every other Daily Win easier.",
    dailyWin: {
      title: "Go to bed 15 minutes earlier",
      detail: "Nothing dramatic. Over a decade it adds up to around 38 extra days of sleep, and better sleep changes how you eat, move and react the next day.",
    },
    tipsPath: "/tips",
  },
  {
    id: "money",
    name: "Money & Time",
    short: "Money & Time",
    priorityLabel: "Money, work and time",
    low: "Your answers suggest money or time feel like a constant source of pressure. Small, repeatable systems can help you feel more in control without strict budgets or spreadsheets.",
    mid: "You're getting by, but there's room to feel more in control of where your money and time go. A few set-once systems can quietly do the heavy lifting for you.",
    high: "You have a healthy sense of control over your money and time. Keep automating the good decisions so they don't depend on how you feel each month.",
    dailyWin: {
      title: "A payday standing order",
      detail: "Set up a standing order of £10, £20 or £50 into a separate savings account on the day you get paid. Your brain treats it like a bill already paid. Decide once, benefit every month.",
    },
    course: {
      title: "The Invisible Pay Rise",
      detail: "Practical ways to improve your finances through everyday decisions and better systems.",
      href: "/courses",
      comingSoon: true,
    },
    tipsPath: "/tips",
  },
  {
    id: "relationships",
    name: "Relationships & Connection",
    short: "Relationships",
    priorityLabel: "Relationships and happiness",
    low: "Your answers suggest you're feeling more disconnected than you'd like. Relationships aren't built in big moments. They're built in thousands of small ones, and you can start adding those today.",
    mid: "You have people around you, but those connections could feel deeper and more supportive. Being more present, more often, compounds just like any other habit.",
    high: "You feel connected and like you're contributing. That's one of the strongest foundations for a good life. Keep investing in the people who matter.",
    dailyWin: {
      title: "One phone-free meal a day",
      detail: "No phone, no TV, no laptop. Just you, the food and whoever you're with. Conversations get deeper, and you'll notice how much of your attention the screen was taking.",
    },
    tipsPath: "/tips",
  },
  {
    id: "habits",
    name: "Habits & Self-Control",
    short: "Habits",
    priorityLabel: "Habits, consistency and productivity",
    low: "You probably know which habits you'd like to change, but find it difficult to maintain them. That isn't a character flaw. Your environment and your brain are pulling you towards short-term comfort, and we can work with that rather than against it.",
    mid: "You follow through some of the time, but distractions and old patterns keep pulling you back. Making the better choice the easier choice will do far more than willpower.",
    high: "You do what you say you'll do. That's a superpower. Use it to layer in one new Daily Win at a time.",
    dailyWin: {
      title: "Charge your phone outside the bedroom",
      detail: "One small change to your environment. Bed becomes a place for sleep again, mornings start with you rather than your notifications, and you prove to yourself you don't need constant stimulation.",
    },
    tipsPath: "/tips",
  },
  {
    id: "purpose",
    name: "Purpose & Growth",
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
  overall: number; // 0–100
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
