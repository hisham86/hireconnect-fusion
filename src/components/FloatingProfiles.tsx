
import React, { useEffect, useRef } from 'react';
import ProfileCard from './ProfileCard';
import { engineerProfiles } from '@/data/engineerProfiles';
import { useSound } from '@/hooks/useSound';

interface FloatingProfilesProps {
  mousePosition: { x: number; y: number };
  scrollY: number;
}

const FloatingProfiles: React.FC<FloatingProfilesProps> = ({ mousePosition, scrollY }) => {
  const [focusedProfile, setFocusedProfile] = React.useState<number | null>(null);
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

  const handleProfileClick = (index: number) => {
    // Play a cute sound when clicking on a profile
    playSound('pop');
    setFocusedProfile(index === focusedProfile ? null : index);
  };

  return (
    <div className="relative hidden md:block h-[500px]" ref={profilesRef}>
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
