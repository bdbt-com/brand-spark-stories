import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key, ExternalLink } from 'lucide-react';

interface YouTubeApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
}

export const YouTubeApiKeyInput = ({ onApiKeySet }: YouTubeApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      // Store in sessionStorage for this session
      sessionStorage.setItem('youtube_api_key', apiKey.trim());
      onApiKeySet(apiKey.trim());
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            YouTube API Configuration Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription className="text-sm">
              To display your latest YouTube videos automatically, please enter your YouTube Data API v3 key.
              For production use, it's recommended to set this up through Supabase Edge Function Secrets.
            </AlertDescription>
          </Alert>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="api-key">YouTube Data API v3 Key</Label>
              <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your YouTube API key..."
                className="mt-1"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" disabled={!apiKey.trim()}>
                Connect YouTube Channel
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                asChild
              >
                <a 
                  href="https://console.cloud.google.com/apis/credentials" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Get API Key
                </a>
              </Button>
            </div>
          </form>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Quick Setup:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Go to Google Cloud Console</li>
              <li>Create/select a project</li>
              <li>Enable YouTube Data API v3</li>
              <li>Create credentials (API Key)</li>
              <li>Copy and paste the key above</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};