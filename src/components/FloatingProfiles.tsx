
import React, { useEffect, useRef, useState } from 'react';
import ProfileCard from './ProfileCard';
import { engineerProfiles } from '@/data/engineerProfiles';
import { useSound } from '@/hooks/useSound';
import { MousePointer } from 'lucide-react';

interface FloatingProfilesProps {
  mousePosition: { x: number; y: number };
  scrollY: number;
}

const FloatingProfiles: React.FC<FloatingProfilesProps> = ({ mousePosition, scrollY }) => {
  const [focusedProfile, setFocusedProfile] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(true);
  const profilesRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSound();

  useEffect(() => {
    if (!profilesRef.current) return;
    
    const profiles = profilesRef.current.querySelectorAll('.floating-profile');
    profiles.forEach((profile, index) => {
      const htmlProfile = profile as HTMLElement;
      // Calculate different movement for each profile based on index
      const offsetX = (mousePosition.x / window.innerWidth - 0.5) * (10 + index * 5);
      const offsetY = (mousePosition.y / window.innerHeight - 0.5) * (5 + index * 3);
      // Add scroll effect
      const scrollOffset = scrollY * (0.02 + index * 0.01);
      
      htmlProfile.style.transform = `translate(${offsetX}px, ${offsetY - scrollOffset}px) rotate(${offsetX * 0.2}deg)`;
    });
  }, [mousePosition, scrollY]);

  // Hide the hint after a delay or after any profile is clicked
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleProfileClick = (index: number) => {
    // Play a cute sound when clicking on a profile
    playSound('pop');
    setFocusedProfile(index === focusedProfile ? null : index);
    setShowHint(false); // Hide the hint when a profile is clicked
  };

  return (
    <div className="relative hidden md:block h-[500px]" ref={profilesRef}>
      {showHint && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-4 py-2 rounded-full flex items-center gap-2 z-50 animate-pulse">
          <MousePointer className="h-4 w-4" />
          <span>Click the profiles to expand</span>
        </div>
      )}
      {engineerProfiles.map((profile, index) => (
        <ProfileCard 
          key={index}
          profile={profile}
          index={index}
          isFocused={focusedProfile === index}
          onClick={() => handleProfileClick(index)}
        />
      ))}
    </div>
  );
};

export default FloatingProfiles;
