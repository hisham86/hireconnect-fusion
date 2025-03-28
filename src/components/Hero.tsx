
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="hero-gradient text-white overflow-hidden">
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
            <div className="flex flex-col gap-2">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto">
                JOIN THE WAITLIST <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="relative animate-float hidden md:block">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
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
                  <p className="font-medium">Remote, US Timezone</p>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 -right-24 transform -translate-y-1/2 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 w-80 animate-float" style={{ animationDelay: "1s" }}>
              <div className="absolute -top-6 -left-6 bg-brand-light text-brand-primary rounded-full px-4 py-2 font-medium">
                Recruiter View
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Candidate Info Complete</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full">
                  <div className="bg-green-400 h-2 rounded-full w-3/4"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Next Steps</span>
                  <span className="text-brand-light">Technical Interview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;
