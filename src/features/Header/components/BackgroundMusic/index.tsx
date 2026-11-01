import { useEffect, useRef, useState } from 'react';
import './index.scss';

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(25);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  async function togglePlayback(): Promise<void> {
    const audio = audioRef.current;
    if (!audio) return;

    setError(null);

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      setError('Unable to play music. Please try again.');
    }
  }

  return (
    <div className="background-music">
      <audio
        ref={audioRef}
        src="/audio/imperial-march.mp3"
        autoPlay
        loop
        preload="auto"
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setIsPlaying(false);
          setError('Unable to load music. Please try again.');
        }}
      />
      <button
        className="background-music__toggle"
        type="button"
        aria-label={isPlaying ? 'Turn off background music' : 'Turn on background music'}
        aria-pressed={isPlaying}
        title={isPlaying ? 'Music off' : 'Music on'}
        onClick={() => void togglePlayback()}
      >
        <svg className="background-music__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          {isPlaying ? <path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" /> : <path d="m16 9 5 6m0-6-5 6" />}
        </svg>
      </button>
      <input
        className="background-music__volume"
        type="range"
        min="0"
        max="100"
        step="1"
        value={volume}
        aria-label="Background music volume"
        aria-valuetext={`${volume}%`}
        onChange={(event) => setVolume(Number(event.currentTarget.value))}
      />
      <span className="background-music__value" aria-hidden="true">{volume}%</span>
      {error && <p className="background-music__error" role="alert">{error}</p>}
    </div>
  );
}

