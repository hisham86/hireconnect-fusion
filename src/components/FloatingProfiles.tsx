
import React, { useEffect, useRef, useState } from 'react';
import ProfileCard from './ProfileCard';
import { engineerProfiles } from '@/data/engineerProfiles';
import { useSound } from '@/hooks/useSound';
import { MousePointer, Move } from 'lucide-react';

interface FloatingProfilesProps {
  mousePosition: { x: number; y: number };
  scrollY: number;
}

interface ProfilePosition {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isDragging: boolean;
}

const FloatingProfiles: React.FC<FloatingProfilesProps> = ({ mousePosition, scrollY }) => {
  const [focusedProfile, setFocusedProfile] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(true);
  const [profilePositions, setProfilePositions] = useState<ProfilePosition[]>(
    engineerProfiles.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, isDragging: false }))
  );
  const [showControls, setShowControls] = useState(false);
  const profilesRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const { playSound } = useSound();

  // Handle default mouse-based positioning
  useEffect(() => {
    if (!profilesRef.current || showControls) return;
    
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
  }, [mousePosition, scrollY, showControls]);

  // Setup physics animation loop
  useEffect(() => {
    if (!showControls) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const FRICTION = 0.98;
    const BOUNCE = 0.8;
    const PROFILE_SIZE = 240; // Approximate card size
    const CONTAINER_WIDTH = 600;
    const CONTAINER_HEIGHT = 500;

    const animateProfiles = () => {
      setProfilePositions(prevPositions => {
        const newPositions = [...prevPositions];
        
        // Update each profile position based on velocity
        for (let i = 0; i < newPositions.length; i++) {
          if (newPositions[i].isDragging) continue;
          
          // Apply velocity
          newPositions[i].x += newPositions[i].vx;
          newPositions[i].y += newPositions[i].vy;
          
          // Apply friction
          newPositions[i].vx *= FRICTION;
          newPositions[i].vy *= FRICTION;
          
          // Boundary collision
          if (newPositions[i].x < -CONTAINER_WIDTH/2) {
            newPositions[i].x = -CONTAINER_WIDTH/2;
            newPositions[i].vx *= -BOUNCE;
            playSound('pop');
          } else if (newPositions[i].x > CONTAINER_WIDTH/2 - PROFILE_SIZE) {
            newPositions[i].x = CONTAINER_WIDTH/2 - PROFILE_SIZE;
            newPositions[i].vx *= -BOUNCE;
            playSound('pop');
          }
          
          if (newPositions[i].y < -CONTAINER_HEIGHT/2) {
            newPositions[i].y = -CONTAINER_HEIGHT/2;
            newPositions[i].vy *= -BOUNCE;
            playSound('pop');
          } else if (newPositions[i].y > CONTAINER_HEIGHT/2 - PROFILE_SIZE) {
            newPositions[i].y = CONTAINER_HEIGHT/2 - PROFILE_SIZE;
            newPositions[i].vy *= -BOUNCE;
            playSound('pop');
          }
        }
        
        // Check for collisions between profiles
        for (let i = 0; i < newPositions.length; i++) {
          for (let j = i + 1; j < newPositions.length; j++) {
            const dx = newPositions[j].x - newPositions[i].x;
            const dy = newPositions[j].y - newPositions[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // If profiles are colliding
            if (distance < PROFILE_SIZE * 0.8) {
              // Calculate collision response
              const angle = Math.atan2(dy, dx);
              const targetX = newPositions[i].x + Math.cos(angle) * PROFILE_SIZE * 0.8;
              const targetY = newPositions[i].y + Math.sin(angle) * PROFILE_SIZE * 0.8;
              
              // Move profiles apart and exchange momentum
              const ax = (targetX - newPositions[j].x) * 0.05;
              const ay = (targetY - newPositions[j].y) * 0.05;
              
              if (!newPositions[i].isDragging) {
                newPositions[i].vx -= ax;
                newPositions[i].vy -= ay;
              }
              
              if (!newPositions[j].isDragging) {
                newPositions[j].vx += ax;
                newPositions[j].vy += ay;
              }
              
              // Play collision sound
              if (Math.abs(ax) + Math.abs(ay) > 0.5) {
                playSound('pop');
              }
            }
          }
        }
        
        return newPositions;
      });
      
      animationRef.current = requestAnimationFrame(animateProfiles);
    };
    
    animationRef.current = requestAnimationFrame(animateProfiles);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showControls, playSound]);

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

  const handleMouseDown = (index: number, e: React.MouseEvent) => {
    if (!showControls) return;
    
    e.stopPropagation();
    setProfilePositions(prev => {
      const newPositions = [...prev];
      newPositions[index].isDragging = true;
      return newPositions;
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!showControls || !profilesRef.current) return;
    
    const rect = profilesRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setProfilePositions(prev => {
      const newPositions = [...prev];
      
      for (let i = 0; i < newPositions.length; i++) {
        if (newPositions[i].isDragging) {
          // Calculate position relative to container center
          newPositions[i].x = e.clientX - centerX;
          newPositions[i].y = e.clientY - centerY;
          
          // Reset velocity when dragging
          newPositions[i].vx = 0;
          newPositions[i].vy = 0;
        }
      }
      
      return newPositions;
    });
  };

  const handleMouseUp = () => {
    if (!showControls) return;
    
    setProfilePositions(prev => {
      const newPositions = [...prev];
      
      for (let i = 0; i < newPositions.length; i++) {
        if (newPositions[i].isDragging) {
          newPositions[i].isDragging = false;
          // Add a small random velocity when released
          newPositions[i].vx = (Math.random() - 0.5) * 6;
          newPositions[i].vy = (Math.random() - 0.5) * 6;
        }
      }
      
      return newPositions;
    });
  };

  const toggleControls = () => {
    setShowControls(prev => !prev);
    if (!showControls) {
      // Initialize random positions when enabling physics mode
      setProfilePositions(engineerProfiles.map(() => ({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        isDragging: false
      })));
    }
  };

  return (
    <div 
      className="relative hidden md:block h-[500px]" 
      ref={profilesRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {showHint && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-4 py-2 rounded-full flex items-center gap-2 z-50 animate-pulse">
          <MousePointer className="h-4 w-4" />
          <span>Click the profiles to expand</span>
        </div>
      )}
      
      <div className="absolute bottom-4 right-4 z-50">
        <button 
          onClick={toggleControls} 
          className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-colors ${
            showControls 
              ? 'bg-brand-primary text-white' 
              : 'bg-white/80 text-gray-800 hover:bg-white'
          }`}
        >
          <Move className="h-4 w-4" />
          {showControls ? 'Disable Physics' : 'Enable Physics'}
        </button>
      </div>
      
      {engineerProfiles.map((profile, index) => (
        <ProfileCard 
          key={index}
          profile={profile}
          index={index}
          isFocused={focusedProfile === index}
          onClick={() => handleProfileClick(index)}
          onMouseDown={(e) => handleMouseDown(index, e)}
          style={showControls ? {
            transform: `translate(${profilePositions[index].x}px, ${profilePositions[index].y}px)`,
            transition: profilePositions[index].isDragging ? 'none' : undefined
          } : undefined}
          draggable={showControls}
        />
      ))}
    </div>
  );
};

export default FloatingProfiles;
