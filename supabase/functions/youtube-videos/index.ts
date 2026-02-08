import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const CHANNEL_HANDLE = '@bigdaddysbigtips';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const YOUTUBE_API_KEY = Deno.env.get("YOUTUBE_API_KEY");
    
    if (!YOUTUBE_API_KEY) {
      console.error("YOUTUBE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "YouTube API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const url = new URL(req.url);
    const maxResults = url.searchParams.get('maxResults') || '50';

    console.log(`Fetching YouTube videos for ${CHANNEL_HANDLE}, maxResults: ${maxResults}`);

    // Step 1: Get channel ID from handle
    const channelSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${CHANNEL_HANDLE}&key=${YOUTUBE_API_KEY}`;
    const channelResponse = await fetch(channelSearchUrl);
    const channelData = await channelResponse.json();

    if (channelData.error) {
      console.error("YouTube API error (channel search):", channelData.error);
      return new Response(
        JSON.stringify({ error: channelData.error.message }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!channelData.items || channelData.items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Channel not found", videos: [] }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const channelId = channelData.items[0].snippet.channelId;
    console.log(`Found channel ID: ${channelId}`);

    // Step 2: Get videos from channel
    const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${YOUTUBE_API_KEY}`;
    const videosResponse = await fetch(videosUrl);
    const videosData = await videosResponse.json();

    if (videosData.error) {
      console.error("YouTube API error (videos search):", videosData.error);
      return new Response(
        JSON.stringify({ error: videosData.error.message }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!videosData.items || videosData.items.length === 0) {
      return new Response(
        JSON.stringify({ videos: [] }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 3: Get video details (duration, view count)
    const videoIds = videosData.items.map((item: any) => item.id.videoId).join(',');
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    // Combine search results with video details
    const videos = videosData.items.map((item: any) => {
      const details = detailsData.items?.find((detail: any) => detail.id === item.id.videoId);
      
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

    console.log(`Returning ${videos.length} videos`);

    return new Response(
      JSON.stringify({ videos }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error in youtube-videos function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Helper function to format ISO 8601 duration to readable format
function formatDuration(duration: string): string {
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
}

// Helper function to format view count
function formatViewCount(count: string): string {
  const num = parseInt(count);
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return count;
}
