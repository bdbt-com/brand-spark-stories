import { useState, useEffect } from 'react';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  channelTitle: string;
  videoId: string;
}

interface UseYouTubeVideosReturn {
  videos: YouTubeVideo[];
  loading: boolean;
  error: string | null;
  refreshVideos: () => void;
}

const YOUTUBE_API_KEY = sessionStorage.getItem('youtube_api_key') || import.meta.env.VITE_YOUTUBE_API_KEY || 'AIzaSyDdkk8BXLo7fysGJCyJMzyIN1cIJNaBboQ';
const CHANNEL_ID = '@bigdaddysbigtips'; // Can be channel handle or ID

export const useYouTubeVideos = (maxResults: number = 50): UseYouTubeVideosReturn => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    if (!YOUTUBE_API_KEY) {
      setError('YouTube API key not configured. Please set VITE_YOUTUBE_API_KEY environment variable.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // First get channel ID from handle if needed
      let channelId = CHANNEL_ID;
      if (CHANNEL_ID.startsWith('@')) {
        const channelResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
        );
        const channelData = await channelResponse.json();
        
        if (channelData.items && channelData.items.length > 0) {
          channelId = channelData.items[0].snippet.channelId;
        }
      }

      // Get latest videos from the channel
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${YOUTUBE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      // Get video details (duration, view count, etc.)
      const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
      );

      const detailsData = await detailsResponse.json();

      // Combine search results with video details
      const videosWithDetails: YouTubeVideo[] = data.items.map((item: any, index: number) => {
        const details = detailsData.items.find((detail: any) => detail.id === item.id.videoId);
        
        return {
          id: item.id.videoId,
          videoId: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.maxres?.url || 
                    item.snippet.thumbnails.high?.url || 
                    item.snippet.thumbnails.medium?.url,
          publishedAt: item.snippet.publishedAt,
          duration: formatDuration(details?.contentDetails?.duration || 'PT0S'),
          viewCount: formatViewCount(details?.statistics?.viewCount || '0'),
          channelTitle: item.snippet.channelTitle,
        };
      });

      setVideos(videosWithDetails);
    } catch (err) {
      console.error('Error fetching YouTube videos:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  const refreshVideos = () => {
    fetchVideos();
  };

  useEffect(() => {
    fetchVideos();
  }, [maxResults]);

  return { videos, loading, error, refreshVideos };
};

// Helper function to format ISO 8601 duration to readable format
const formatDuration = (duration: string): string => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  
  if (!match) return '0 min';
  
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');
  
  if (hours) {
    return `${hours}h ${minutes || '0'}m`;
  } else if (minutes) {
    return `${minutes} min`;
  } else {
    return `${seconds || '0'} sec`;
  }
};

// Helper function to format view count
const formatViewCount = (count: string): string => {
  const num = parseInt(count);
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return count;
};