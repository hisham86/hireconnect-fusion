
import { useState } from 'react';
import WaitlistDialog from '@/components/WaitlistDialog';

const Hero = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userType, setUserType] = useState<"engineer" | "recruiter" | null>(null);

  const openDialog = () => {
    setUserType(null);
    setDialogOpen(true);
  };

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
          <div className="relative animate-float hidden md:block">
            <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="absolute -top-6 -right-6 bg-brand-light text-brand-primary rounded-full px-4 py-2 font-medium">
                Engineer Profile
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-white/60">Current Role</p>
                  <p className="font-medium">Senior Frontend Engineer</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white/60">Salary Expectation</p>
                  <p className="font-medium">MYR 10,000 - 12,500 /month</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white/60">Notice Period</p>
                  <p className="font-medium">30 days</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white/60">Preferred Location</p>
                  <p className="font-medium">Kuala Lumpur, Malaysia Timezone</p>
                </div>
              </div>
            </div>
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
