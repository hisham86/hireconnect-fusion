
import { useState, useEffect, useRef } from 'react';
import WaitlistDialog from '@/components/WaitlistDialog';
import { 
  Code, 
  Database, 
  Globe, 
  ServerCog, 
  Layers, 
  Smartphone 
} from 'lucide-react';

const Hero = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userType, setUserType] = useState<"engineer" | "recruiter" | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [focusedProfile, setFocusedProfile] = useState<number | null>(null);
  const profilesRef = useRef<HTMLDivElement>(null);

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
    setFocusedProfile(index === focusedProfile ? null : index);
  };

  const engineerProfiles = [
    {
      role: "Senior Frontend Engineer",
      salary: "MYR 10,000 - 12,500 /month",
      notice: "30 days",
      location: "Kuala Lumpur, Malaysia Timezone",
      icon: <Code className="h-5 w-5 text-brand-primary" />,
      position: "top-16 -right-4 md:top-10 md:-right-6",
      rotation: "rotate-2",
      specialClass: "bg-white/10 dark:bg-white/5 border-white/20"
    },
    {
      role: "Backend Developer",
      salary: "USD 8,000 - 9,500 /month",
      notice: "45 days",
      location: "Remote (US Eastern Timezone)",
      icon: <ServerCog className="h-5 w-5 text-green-500" />,
      position: "-top-16 right-20 md:-top-8 md:right-32",
      rotation: "-rotate-3",
      specialClass: "bg-white/10 dark:bg-white/5 border-white/20"
    },
    {
      role: "Full Stack Engineer",
      salary: "EUR 6,500 - 7,800 /month",
      notice: "60 days",
      location: "Berlin, Germany",
      icon: <Layers className="h-5 w-5 text-blue-500" />,
      position: "top-40 -right-8 md:top-32 md:-right-12",
      rotation: "rotate-6",
      specialClass: "bg-white/10 dark:bg-white/5 border-white/20"
    },
    {
      role: "Mobile Developer",
      salary: "SGD 9,000 - 11,000 /month",
      notice: "30 days",
      location: "Singapore",
      icon: <Smartphone className="h-5 w-5 text-purple-500" />,
      position: "top-80 right-4 md:top-60 md:right-8",
      rotation: "-rotate-2",
      specialClass: "bg-white/10 dark:bg-white/5 border-white/20"
    },
    {
      role: "Database Specialist",
      salary: "CAD 9,500 - 12,000 /month",
      notice: "45 days",
      location: "Toronto, Canada",
      icon: <Database className="h-5 w-5 text-amber-500" />,
      position: "top-4 -right-20 md:top-2 md:-right-32",
      rotation: "rotate-12",
      specialClass: "bg-white/10 dark:bg-white/5 border-white/20"
    }
  ];

  return (
    <div className="hero-gradient text-white relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Unified talent platform for Engineers & Recruiters
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Streamline hiring with a single platform that connects engineers and talent acquisition teams, 
              eliminating back-and-forth and accelerating the hiring process.
            </p>
            <div className="flex flex-col gap-2 relative z-10">
              <button
                onClick={openDialog}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-md transition inline-flex items-center justify-center"
              >
                JOIN THE WAITLIST
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
          <div className="relative hidden md:block" ref={profilesRef}>
            {engineerProfiles.map((profile, index) => (
              <div 
                key={index}
                onClick={() => handleProfileClick(index)}
                className={`floating-profile absolute ${profile.position} ${profile.rotation} ${profile.specialClass} backdrop-blur-lg rounded-2xl p-6 shadow-xl border
                  ${focusedProfile === index ? 'focused-profile z-50 scale-110' : ''} 
                  transition-all duration-300 cursor-pointer hover:shadow-2xl`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  zIndex: focusedProfile === index ? 50 : 10 - index
                }}
              >
                <div className="absolute -top-6 -right-6 bg-brand-light text-brand-primary rounded-full px-4 py-2 font-medium flex items-center gap-2">
                  {profile.icon}
                  Engineer Profile
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-white/60">Current Role</p>
                    <p className="font-medium">{profile.role}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-white/60">Salary Expectation</p>
                    <p className="font-medium">{profile.salary}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-white/60">Notice Period</p>
                    <p className="font-medium">{profile.notice}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-white/60">Preferred Location</p>
                    <p className="font-medium">{profile.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
