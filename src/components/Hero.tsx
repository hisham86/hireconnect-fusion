import { useState, useEffect } from 'react';
import WaitlistDialog from '@/components/WaitlistDialog';
import HeroContent from '@/components/HeroContent';
import FloatingProfiles from '@/components/FloatingProfiles';
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userType, setUserType] = useState<"engineer" | "recruiter" | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { user } = useAuth();
  const navigate = useNavigate();

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
    <section className="relative overflow-hidden py-20 md:py-36 bg-gradient-to-b from-white to-indigo-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                The Ultimate Platform for Engineers and Recruiters
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Streamline your job search and hiring process. Find the perfect match with our AI-powered platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {user ? (
                <Button 
                  className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 px-6 font-medium text-white transition-colors hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-indigo-50"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to My Dashboard
                </Button>
              ) : (
                <Button 
                  className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 px-6 font-medium text-white transition-colors hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-indigo-50"
                  onClick={() => navigate('/auth')}
                >
                  Get Started
                </Button>
              )}
              <Button variant="outline" className="h-12">
                Learn More
              </Button>
            </div>
          </div>
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
    </section>
  );
};

export default Hero;
