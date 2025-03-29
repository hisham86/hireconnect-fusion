
import React, { useState, useEffect, useRef } from 'react';
import { Code, Users } from 'lucide-react';
import { userService } from '@/services/userService';
import { Skeleton } from '@/components/ui/skeleton';

interface HeroContentProps {
  onOpenDialog: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ onOpenDialog }) => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  
  // Set up intersection observer to detect when counter is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only set isInView to true if it wasn't already true
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the element is visible
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [isInView]);

  // Fetch user count and start animation when in view
  useEffect(() => {
    if (!isInView) return; // Only run when in view
    
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
        setIsAnimating(true);
        
        // Animate the counter
        const timer = setTimeout(() => {
          let current = startCount;
          const interval = setInterval(() => {
            current += 1;
            setCount(current);
            
            if (current >= displayCount) {
              clearInterval(interval);
              setIsLoading(false);
              setIsAnimating(false);
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
  }, [isInView]);

  return (
    <div className="max-w-xl">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
        CodingCats: Where Job Hunting Doesn't Make You Hiss!
      </h1>
      <p className="text-lg md:text-xl mb-8 text-white">
        We pounce on the hiring process, connecting engineers and talent teams faster than a cat chasing a laser pointer. 
        Say goodbye to endless back-and-forth—our platform makes hiring a whisker-quick breeze!
      </p>
      <div className="flex flex-col gap-2 relative z-10">
        <div 
          ref={counterRef}
          className="bg-black/30 backdrop-blur-md p-3 rounded-lg flex items-center mb-4 border border-purple-400/30 shadow-lg overflow-hidden"
        >
          <Users className="text-purple-300 mr-3 h-5 w-5" />
          <div className="flex items-center">
            {isLoading ? (
              <Skeleton className="w-16 h-8 bg-purple-300/20" />
            ) : (
              <span className={`text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent ${isAnimating ? 'counter-animation' : ''}`}>
                {count.toLocaleString()}
              </span>
            )}
            <span className="ml-2 text-purple-200 text-sm">Purr-fect Developers Have Joined Our Litter!</span>
          </div>
        </div>
        
        <a 
          href="/auth" 
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition inline-flex items-center justify-center"
        >
          <Code className="mr-2 h-5 w-5" />
          EARLY ACCESS FOR DEVS
        </a>
      </div>
    </div>
  );
};

export default HeroContent;
