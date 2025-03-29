
import { useRef, useEffect, useState } from 'react';

type SoundType = 'click' | 'pop' | 'success' | 'error';

const soundFiles = {
  click: '/sounds/click.mp3',
  pop: '/sounds/pop.mp3',
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
};

export const useSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    // Check if the user has previously set a preference
    const storedPreference = localStorage.getItem('soundEnabled');
    return storedPreference ? storedPreference === 'true' : true;
  });

  // Initialize audio context and element
  useEffect(() => {
    // Create audio element only once when the component mounts
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      // Set default volume
      audioRef.current.volume = 0.3;
      
      // Preload sounds
      Object.values(soundFiles).forEach(soundUrl => {
        const audio = new Audio();
        audio.src = soundUrl;
        audio.preload = 'auto';
      });
    }
    
    return () => {
      // Cleanup when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);
  
  const playSound = (type: SoundType) => {
    if (!soundEnabled || !audioRef.current) return;
    
    try {
      // Stop any currently playing sound
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      
      // Set the source and play
      const sound = soundFiles[type];
      if (sound) {
        audioRef.current.src = sound;
        
        // Create a user interaction event handler
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.log('Audio playback silently ignored:', err);
            // We don't show errors to users, as this is often due to 
            // browsers requiring user interaction before playing sounds
          });
        }
      }
    } catch (err) {
      console.log('Audio playback error caught:', err);
      // Silently handle errors
    }
  };
  
  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('soundEnabled', String(newState));
    return newState;
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
    playPop,
    soundEnabled,
    toggleSound
  };
};
