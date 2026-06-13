// Top 3 most-viewed Daily Wins Podcast episodes (kept in sync with Blueprint page).
// Used on /bio and /admin-list to show "3 most recent + 3 most viewed".
export interface PinnedVideo {
  videoId: string;
  title: string;
  views: string;
}

export const PINNED_TOP_VIDEOS: PinnedVideo[] = [
  { videoId: "z8NqukMz2Q8", title: "Give me 0.1% And I'll Change Your Direction - Daily Wins Podcast 121", views: "564K views" },
  { videoId: "zUGM3gZbNY8", title: "Most People Stop here. Are You Most People? Daily Wins Podcast 116", views: "521K views" },
  { videoId: "ZK4wdEe_b-s", title: "You Need To Understand This Cycle - Daily Wins Podcast 122", views: "446K views" },
];
