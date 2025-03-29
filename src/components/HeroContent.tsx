
import React, { useState, useEffect } from 'react';
import { Code, Users } from 'lucide-react';
import { userService } from '@/services/userService';

interface HeroContentProps {
  onOpenDialog: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ onOpenDialog }) => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserCount = async () => {
      setIsLoading(true);
      try {
        // Get the actual count from the database
        const userCount = await userService.getUserCount();
        
        // Set a minimum display count for UI purposes (we don't want to show 0)
        const displayCount = Math.max(userCount, 50);
        
        // Start from a smaller number to animate
        const startCount = Math.max(1, displayCount - 40);
        setCount(startCount);
        
        // Animate the counter
        const timer = setTimeout(() => {
          let current = startCount;
          const interval = setInterval(() => {
            current += 1;
            setCount(current);
            
            if (current >= displayCount) {
              clearInterval(interval);
              setIsLoading(false);
            }
          }, 30);
          
          return () => clearInterval(interval);
        }, 500);
        
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error fetching user count:", error);
        setCount(123); // Fallback number if there's an error
        setIsLoading(false);
      }
    };
    
    fetchUserCount();
  }, []);

  return (
    <div className="max-w-xl">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
        Unified talent platform for Engineers & Recruiters
      </h1>
      <p className="text-lg md:text-xl mb-8 text-white">
        Streamline hiring with a single platform that connects engineers and talent acquisition teams, 
        eliminating back-and-forth and accelerating the hiring process.
      </p>
      <div className="flex flex-col gap-2 relative z-10">
        <div className="bg-black/30 backdrop-blur-md p-3 rounded-lg flex items-center mb-4 border border-purple-400/30 shadow-lg">
          <Users className="text-purple-300 mr-3 h-5 w-5" />
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              {isLoading ? 
                <span className="inline-block w-12 h-6 bg-purple-300/20 rounded animate-pulse"></span> : 
                count.toLocaleString()
              }
            </span>
            <span className="ml-2 text-purple-200 text-sm">developers have joined our platform</span>
          </div>
        </div>
        
        <button
          onClick={onOpenDialog}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-md transition inline-flex items-center justify-center"
        >
          JOIN THE WAITLIST
          <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
        
        <a 
          href="/auth" 
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition inline-flex items-center justify-center mt-2"
        >
          <Code className="mr-2 h-5 w-5" />
          EARLY ACCESS FOR DEVS
        </a>
      </div>
    </div>
  );
};

export default HeroContent;
