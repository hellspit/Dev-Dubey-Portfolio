import React, { useRef, useEffect } from 'react';

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(error => {
        console.log("Audio playback failed:", error);
      });
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/intro.mp3"
      preload="auto"
      style={{ display: 'none' }}
    />
  );
};

export default BackgroundMusic;
