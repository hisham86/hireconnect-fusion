
import { useRef } from 'react';

type SoundType = 'click' | 'pop' | 'success' | 'error';

const soundFiles = {
  click: '/sounds/click.mp3',
  pop: '/sounds/pop.mp3',
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
};

export const useSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = (type: SoundType) => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    // Set the source and play
    const sound = soundFiles[type];
    if (sound) {
      audioRef.current.src = sound;
      audioRef.current.volume = 0.5; // 50% volume
      audioRef.current.play().catch(err => {
        // Silence errors from browsers that require user interaction first
        console.log('Audio playback error:', err);
      });
    }
  };

  // Add convenience methods for specific sound types
  const playSuccess = () => playSound('success');
  const playError = () => playSound('error');
  const playClick = () => playSound('click');
  const playPop = () => playSound('pop');

  return { 
    playSound,
    playSuccess,
    playError,
    playClick,
    playPop
  };
};
