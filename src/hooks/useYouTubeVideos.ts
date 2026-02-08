import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

export const useYouTubeVideos = (maxResults: number = 50): UseYouTubeVideosReturn => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fnError } = await supabase.functions.invoke('youtube-videos', {
        body: null,
        headers: {},
      });

      // Add query params via URL since invoke doesn't support them directly
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/youtube-videos?maxResults=${maxResults}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error: ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      setVideos(result.videos || []);
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
