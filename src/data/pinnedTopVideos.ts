// Top 3 most-viewed Daily Wins Podcast episodes (kept in sync with Blueprint page).
// Used on /bio and /admin-list to show "3 most recent + 3 most viewed".
export interface PinnedVideo {
  videoId: string;
  title: string;
  views: string;
}

export const PINNED_TOP_VIDEOS: PinnedVideo[] = [
  { videoId: "SioUIPf4Sls", title: "Which Comfort Are You Choosing? - Daily Wins Podcast 118", views: "111K views" },
  { videoId: "L6cqky7TLpE", title: "Do This And Turn £10 Into £100,000 - Daily Wins Podcast 115", views: "108K views" },
  { videoId: "zUGM3gZbNY8", title: "Most People Stop here. Are You Most People? Daily Wins Podcast 116", views: "92K views" },
];
