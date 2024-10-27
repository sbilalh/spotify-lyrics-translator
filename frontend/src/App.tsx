import React, { useEffect, useState } from 'react';
import Player from './components/Player';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're handling a callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      handleCallback(code);
    } else {
      // Check for existing token
      const token = localStorage.getItem('spotify_access_token');
      if (token) {
        setAccessToken(token);
      }
    }
  }, []);

  const handleCallback = async (code: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/auth/callback?code=${code}`,
        {
          credentials: 'include',
        }
      );
      const data = await response.json();
      
      if (data.accessToken) {
        localStorage.setItem('spotify_access_token', data.accessToken);
        setAccessToken(data.accessToken);
        
        if (data.expiresIn) {
          const expirationTime = Date.now() + data.expiresIn * 1000;
          localStorage.setItem('token_expiration', expirationTime.toString());
        }
        
        // Clean up URL
        window.history.replaceState({}, document.title, '/');
      } else {
        console.error('No access token received:', data);
      }
    } catch (error) {
      console.error('Error handling callback:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/login');
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  if (!accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold">Spotify Lyrics</h1>
          <p className="text-neutral-400">
            See lyrics in real-time as you listen
          </p>
          <button
            onClick={handleLogin}
            className="inline-block bg-green-500 text-black font-semibold px-8 py-3 rounded-full hover:bg-green-400 transition-colors"
          >
            Connect with Spotify
          </button>
        </div>
      </div>
    );
  }

  return <Player accessToken={accessToken} />;
}

export default App;
