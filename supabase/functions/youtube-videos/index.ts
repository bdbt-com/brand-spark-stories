import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const CHANNEL_HANDLE = '@bigdaddysbigtips';

serve(async (req) => {
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

    console.log(`Fetching ALL YouTube videos for ${CHANNEL_HANDLE}`);

    // Step 1: Get channel ID and uploads playlist ID from handle
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${CHANNEL_HANDLE}&key=${YOUTUBE_API_KEY}`;
    const channelResponse = await fetch(channelUrl);
    const channelData = await channelResponse.json();

    if (channelData.error) {
      console.error("YouTube API error (channel lookup):", channelData.error);
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

    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
    console.log(`Uploads playlist ID: ${uploadsPlaylistId}`);

    // Step 2: Fetch ALL videos from uploads playlist using pagination
    const allItems: any[] = [];
    let nextPageToken: string | undefined = undefined;

    do {
      const pageParam = nextPageToken ? `&pageToken=${nextPageToken}` : '';
      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50${pageParam}&key=${YOUTUBE_API_KEY}`;
      const playlistResponse = await fetch(playlistUrl);
      const playlistData = await playlistResponse.json();

      if (playlistData.error) {
        console.error("YouTube API error (playlist items):", playlistData.error);
        break;
      }

      if (playlistData.items) {
        allItems.push(...playlistData.items);
      }

      nextPageToken = playlistData.nextPageToken;
      console.log(`Fetched ${allItems.length} items so far, nextPageToken: ${nextPageToken || 'none'}`);
    } while (nextPageToken);

    if (allItems.length === 0) {
      return new Response(
        JSON.stringify({ videos: [] }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 3: Get video details (duration, view count) in batches of 50
    const detailsMap: Record<string, any> = {};
    const videoIds = allItems.map((item: any) => item.snippet.resourceId.videoId);

    for (let i = 0; i < videoIds.length; i += 50) {
      const batch = videoIds.slice(i, i + 50).join(',');
      const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics,snippet&id=${batch}&key=${YOUTUBE_API_KEY}`;
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();

      if (detailsData.items) {
        for (const detail of detailsData.items) {
          detailsMap[detail.id] = detail;
        }
      }
    }

    // Combine playlist items with video details
    const videos = allItems.map((item: any) => {
      const videoId = item.snippet.resourceId.videoId;
      const details = detailsMap[videoId];
      
      return {
        id: videoId,
        videoId: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails?.maxres?.url || 
                  item.snippet.thumbnails?.high?.url || 
                  item.snippet.thumbnails?.medium?.url ||
                  item.snippet.thumbnails?.default?.url,
        publishedAt: item.snippet.publishedAt,
        duration: formatDuration(details?.contentDetails?.duration || 'PT0S'),
        viewCount: formatViewCount(details?.statistics?.viewCount || '0'),
        channelTitle: item.snippet.channelTitle,
      };
    });

    console.log(`Returning ${videos.length} videos total`);

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

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0 min';
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');
  if (hours) return `${hours}h ${minutes || '0'}m`;
  if (minutes) return `${minutes} min`;
  return `${seconds || '0'} sec`;
}

function formatViewCount(count: string): string {
  const num = parseInt(count);
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return count;
}
