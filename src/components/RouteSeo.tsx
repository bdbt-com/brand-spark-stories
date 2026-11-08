import { useLocation } from "react-router-dom";
import Seo from "./Seo";

interface Meta {
  title: string;
  description: string;
  noindex?: boolean;
}

const META: Record<string, Meta> = {
  "/": {
    title: "Daily Wins with Ben Raven — Coaching, Mentoring & Life Skills",
    description:
      "Helping you play the long game, one Daily Win at a time. Coaching, mentoring, free events and the free Daily Wins Test from Ben Raven.",
  },
  "/test": {
    title: "Free Daily Wins Test — How Well Are You Playing The Long Game?",
    description:
      "Answer 28 simple questions and get a personalised snapshot of your life, your strengths, your first Daily Win and a recommended starting point. Free.",
  },
  "/coaching": {
    title: "Daily Wins Coaching & Mentoring with Ben Raven",
    description:
      "Understand yourself, change your behaviours and win the long game. Free discovery calls, private coaching, intensives and the Daily Wins Community.",
  },
  "/about": {
    title: "About Ben Raven — Founder of Daily Wins",
    description:
      "How Big Daddy's Big Tips started, why Daily Wins exist, and the honest story behind turning small everyday habits into lasting change.",
  },
  "/courses": {
    title: "Courses — Build Better Habits | Big Daddy's Big Tips",
    description:
      "Guided courses on exercise, money, sleep and mindset. Start with the first class and build the daily habits that move your life forward.",
  },
  "/blueprint": {
    title: "Free Foundation Blueprint — Spot Your Daily Drifts",
    description:
      "Download the free Foundation Blueprint to spot the daily drifts pulling you off track and replace them with simple, repeatable Daily Wins.",
  },
  "/podcast": {
    title: "Daily Wins Podcast — Big Daddy's Big Tips",
    description:
      "Short, no-nonsense episodes on health, money, sleep and mindset. Watch the latest Daily Wins podcast episode and start winning your day.",
  },
  "/daily-wins": {
    title: "Daily Wins — Small Habits That Change Everything",
    description:
      "The Daily Wins system: tiny, repeatable habits for energy, focus, money and sleep that compound into real change over time.",
  },
  "/tips": {
    title: "Tips & Guides — Practical Advice For Everyday Life",
    description:
      "Search hundreds of practical tips and free guides on health, money, productivity and mindset from Big Daddy's Big Tips.",
  },
  "/partnership": {
    title: "Partnerships & Collaborations | Big Daddy's Big Tips",
    description:
      "Work with Big Daddy's Big Tips — brand partnerships, sponsorships and collaborations across the Daily Wins podcast and channel.",
  },
  "/community": {
    title: "Community | Big Daddy's Big Tips",
    description:
      "Join the Big Daddy's Big Tips community and share your Daily Wins with people building better habits.",
  },
  "/links": {
    title: "All Links — Big Daddy's Big Tips",
    description:
      "Every Big Daddy's Big Tips link in one place: the Daily Wins podcast, the free Foundation Blueprint, courses and socials.",
  },
};

// Pages that must never appear in search results.
// /podcast auto-redirects to YouTube, so it stays out of the index.
// /courses is hidden for now (page kept, just not listed anywhere).
const NOINDEX_PATHS = ["/admin-list", "/redirect", "/thumbnail-template", "/bio", "/podcast", "/hourly-rate-grid", "/courses"];

const RouteSeo = () => {
  const { pathname } = useLocation();
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";

  // /tips/:keyword shares the Tips metadata but canonicalises to /tips;
  // /bio is an alias of /links.
  const key = path.startsWith("/tips") ? "/tips" : path === "/bio" ? "/links" : path;
  const meta = META[key];

  const noindex = NOINDEX_PATHS.includes(path);

  if (!meta) {
    return (
      <Seo
        title="Page Not Found | Big Daddy's Big Tips"
        description="This page could not be found. Head back to Big Daddy's Big Tips for Daily Wins, guides and the podcast."
        path={path}
        noindex
      />
    );
  }

  return <Seo title={meta.title} description={meta.description} path={key} noindex={noindex} />;
};


export default RouteSeo;
