
import { useState, useEffect } from 'react';
import WaitlistDialog from '@/components/WaitlistDialog';
import HeroContent from '@/components/HeroContent';
import FloatingProfiles from '@/components/FloatingProfiles';

const Hero = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userType, setUserType] = useState<"engineer" | "recruiter" | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const openDialog = () => {
    setUserType(null);
    setDialogOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="hero-gradient text-white relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <HeroContent onOpenDialog={openDialog} />
          <FloatingProfiles 
            mousePosition={mousePosition} 
            scrollY={scrollY} 
          />
        </div>
      </div>
      <div className="absolute -bottom-8 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      <WaitlistDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        userType={userType}
      />
    </div>
  );
};

export default Hero;
