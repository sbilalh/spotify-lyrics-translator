import { useEffect, useState } from 'react';

interface Track {
  name: string;
  artist: string;
  isPlaying: boolean;
  progressMs: number;
  durationMs: number;
  lyrics?: string;
  lyricsError?: string;
}

export default function Player({ accessToken }: { accessToken: string }) {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetch('http://localhost:3001/spotify/current-track', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setTrack(data);
      } catch (error) {
        console.error('Error fetching track:', error);
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 5000);
    return () => clearInterval(interval);
  }, [accessToken]);

  if (!track) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-neutral-400">No track playing</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">{track.name}</h1>
          <p className="text-neutral-400">{track.artist}</p>
        </div>

        <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-full transition-all duration-1000"
            style={{
              width: `${(track.progressMs / track.durationMs) * 100}%`,
            }}
          />
        </div>

        <div className="space-y-4 text-center">
          {track.lyrics ? (
            <pre className="whitespace-pre-wrap font-sans text-lg leading-relaxed">
              {track.lyrics}
            </pre>
          ) : (
            <p className="text-neutral-400">
              {track.lyricsError || 'No lyrics available'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}