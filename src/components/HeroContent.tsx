
import React from 'react';
import { Code } from 'lucide-react';

interface HeroContentProps {
  onOpenDialog: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ onOpenDialog }) => {
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
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md transition inline-flex items-center justify-center mt-2"
        >
          <Code className="mr-2 h-5 w-5" />
          EARLY ACCESS FOR DEVS
        </a>
      </div>
    </div>
  );
};

export default HeroContent;
