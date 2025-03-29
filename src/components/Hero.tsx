
import { useState, useEffect, useRef } from 'react';
import WaitlistDialog from '@/components/WaitlistDialog';
import { 
  Code, 
  Database, 
  Globe, 
  ServerCog, 
  Layers, 
  Smartphone,
  Braces,
  FileJson,
  PencilRuler,
  GanttChart
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useSound } from '@/hooks/useSound';

const Hero = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userType, setUserType] = useState<"engineer" | "recruiter" | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [focusedProfile, setFocusedProfile] = useState<number | null>(null);
  const profilesRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSound();

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
    // Play a cute sound when clicking on a profile
    playSound('pop');
    setFocusedProfile(index === focusedProfile ? null : index);
  };

  const engineerProfiles = [
    {
      role: "Senior Frontend Engineer",
      salary: "MYR 10,000 - 12,500 /month",
      notice: "30 days",
      location: "Kuala Lumpur, Malaysia Timezone",
      icon: <Code className="h-5 w-5 text-brand-primary" />,
      position: "top-10 -right-4 md:top-16 md:right-24",
      rotation: "rotate-2",
      specialClass: "bg-white/10 dark:bg-white/5 border-white/20",
      floatClass: "animate-float-1",
      languages: ["React", "TypeScript", "Next.js"],
      languageIcons: [
        <Braces key="react" className="h-4 w-4 text-blue-400" />,
        <FileJson key="ts" className="h-4 w-4 text-blue-500" />
      ]
    },
    {
      role: "Backend Developer",
      salary: "USD 8,000 - 9,500 /month",
      notice: "45 days",
      location: "Remote (US Eastern Timezone)",
      icon: <ServerCog className="h-5 w-5 text-green-500" />,
      position: "-top-10 right-20 md:top-8 md:right-12",
      rotation: "-rotate-3",
      specialClass: "bg-white/10 dark:bg-white/5 border-white/20",
      floatClass: "animate-float-2",
      languages: ["Node.js", "Python", "Go"],
      languageIcons: [
        <ServerCog key="node" className="h-4 w-4 text-green-400" />,
        <Code key="python" className="h-4 w-4 text-yellow-500" />
      ]
    },
    {
      role: "Full Stack Engineer",
      salary: "EUR 6,500 - 7,800 /month",
      notice: "60 days",
      location: "Berlin, Germany",
      icon: <Layers className="h-5 w-5 text-blue-500" />,
      position: "top-24 -right-8 md:top-40 md:right-36",
      rotation: "rotate-6",
      specialClass: "bg-white/10 dark:bg-white/5 border-white/20",
      floatClass: "animate-float-3",
      languages: ["JavaScript", "Ruby", "Vue.js"],
      languageIcons: [
        <Braces key="js" className="h-4 w-4 text-yellow-400" />,
        <Code key="vue" className="h-4 w-4 text-green-500" />
      ]
    },
    {
      role: "Mobile Developer",
      salary: "SGD 9,000 - 11,000 /month",
      notice: "30 days",
      location: "Singapore",
      icon: <Smartphone className="h-5 w-5 text-purple-500" />,
      position: "top-48 right-4 md:top-20 md:right-2",
      rotation: "-rotate-2",
      specialClass: "bg-white/10 dark:bg-white/5 border-white/20",
      floatClass: "animate-float-4",
      languages: ["React Native", "Swift", "Kotlin"],
      languageIcons: [
        <Smartphone key="mobile" className="h-4 w-4 text-purple-400" />,
        <PencilRuler key="design" className="h-4 w-4 text-pink-500" />
      ]
    },
    {
      role: "Database Specialist",
      salary: "CAD 9,500 - 12,000 /month",
      notice: "45 days",
      location: "Toronto, Canada",
      icon: <Database className="h-5 w-5 text-amber-500" />,
      position: "top-4 -right-14 md:top-52 md:right-28",
      rotation: "rotate-12",
      specialClass: "bg-white/10 dark:bg-white/5 border-white/20",
      floatClass: "animate-float-5",
      languages: ["SQL", "MongoDB", "PostgreSQL"],
      languageIcons: [
        <Database key="sql" className="h-4 w-4 text-amber-400" />,
        <GanttChart key="mongo" className="h-4 w-4 text-green-400" />
      ]
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
            <p className="text-lg md:text-xl mb-8 text-white">
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
          <div className="relative hidden md:block h-[500px]" ref={profilesRef}>
            {engineerProfiles.map((profile, index) => (
              <div 
                key={index}
                onClick={() => handleProfileClick(index)}
                className={`floating-profile absolute ${profile.position} ${profile.rotation} ${profile.specialClass} ${profile.floatClass} backdrop-blur-lg rounded-2xl p-6 shadow-xl border
                  ${focusedProfile === index ? 'focused-profile z-50 scale-110' : ''} 
                  transition-all duration-300 cursor-pointer hover:shadow-2xl`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  zIndex: focusedProfile === index ? 50 : 10 - index,
                  ['--rotation' as any]: profile.rotation
                }}
              >
                <div className="absolute -top-6 -right-6 bg-brand-light text-brand-primary rounded-full px-4 py-2 font-medium flex items-center gap-2">
                  {profile.icon}
                  Engineer Profile
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-white/70 font-medium">Current Role</p>
                    <p className="font-medium">{profile.role}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-white/70 font-medium">Salary Expectation</p>
                    <p className="font-medium">{profile.salary}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-white/70 font-medium">Notice Period</p>
                    <p className="font-medium">{profile.notice}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-white/70 font-medium">Preferred Location</p>
                    <p className="font-medium">{profile.location}</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-white/70 font-medium mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.languages.map((lang, i) => (
                        <Badge key={i} className="bg-white/20 hover:bg-white/30 text-white flex items-center gap-1.5 border-white/10">
                          {i < profile.languageIcons.length && profile.languageIcons[i]}
                          {lang}
                        </Badge>
                      ))}
                    </div>
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
