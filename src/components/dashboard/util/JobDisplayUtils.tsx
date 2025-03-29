
import React from "react";
import { Star, StarHalf, DollarSign, ArrowUpDown, Clock, ExternalLink, Car } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import { type DisplayableJob } from "@/hooks/useJobDisplay";

export const createRenderStarRating = () => {
  return (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        ))}
        {hasHalfStar && (
          <StarHalf key="half" className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };
};

export const createRenderCompanyCell = () => {
  return (job: DisplayableJob) => {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <a 
            href={job.glassdoor_url as string} 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium flex items-center hover:text-blue-600 transition-colors"
          >
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={job.logo_url as string} alt={job.company} />
              <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
            </Avatar>
            {job.company}
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={job.logo_url as string} alt={job.company} />
                  <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h4 className="font-semibold text-lg">{job.company}</h4>
              </div>
              {job.rating && (
                <div className="flex items-center bg-yellow-100 px-2 py-0.5 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{job.rating}</span>
                  <span className="text-xs ml-1 text-gray-600">({job.reviews || 0} reviews)</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">{job.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {job.founded && (
                <div>
                  <span className="text-gray-500">Founded:</span> {job.founded}
                </div>
              )}
              {job.employees && (
                <div>
                  <span className="text-gray-500">Size:</span> {job.employees}
                </div>
              )}
            </div>
            {job.manually_added && job.source_platform && (
              <div className="text-sm text-gray-500">
                <span className="font-medium">Source:</span> {job.source_platform}
              </div>
            )}
            {job.glassdoor_url && (
              <a 
                href={job.glassdoor_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                View full profile on Glassdoor
              </a>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };
};

export const createRenderSalaryHeader = (
  toggleSalaryDisplay: () => void,
  handleSort: (column: string) => void,
  salaryDisplayMode: "annual" | "monthly",
  sortColumn: string | null
) => {
  return () => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              onClick={() => {
                toggleSalaryDisplay();
                handleSort('salary');
              }} 
              className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors"
            >
              <DollarSign className="mr-1 h-4 w-4 text-primary" />
              <span>Salary {salaryDisplayMode === "annual" ? "(Annual)" : "(Monthly)"}</span>
              <ArrowUpDown className={`ml-2 h-4 w-4 ${sortColumn === 'salary' ? 'text-primary' : 'text-gray-500'}`} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to toggle between annual and monthly salary or sort</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
};

export const createRenderCommuteTimeHeader = (
  handleSort: (column: string) => void,
  sortColumn: string | null
) => {
  return () => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              onClick={() => handleSort('commuteTime')} 
              className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors"
            >
              <Clock className="mr-1 h-4 w-4 text-primary" />
              <span>Transport Time</span>
              <ArrowUpDown className={`ml-2 h-4 w-4 ${sortColumn === 'commuteTime' ? 'text-primary' : 'text-gray-500'}`} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to sort by commute time</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
};

export const createGetSalaryDisplay = (salaryDisplayMode: "annual" | "monthly") => {
  return (job: DisplayableJob) => {
    return salaryDisplayMode === "annual" ? job.annual_salary : job.monthly_salary;
  };
};

export const createRenderTransportTime = () => {
  return (job: DisplayableJob) => {
    if (job.location?.includes("Remote")) {
      return <span className="text-sm text-gray-500">N/A (Remote)</span>;
    }

    return (
      <div className="flex items-center gap-1">
        <Car className="h-4 w-4 text-blue-500" />
        <span className="text-sm">{job.transport_time_car || "N/A"}</span>
      </div>
    );
  };
};

export const createGetStatusColor = () => {
  return (status: string) => {
    if (status.includes("1. Application")) return "bg-gray-100 text-gray-800";
    if (status.includes("2. Interview")) return "bg-green-100 text-green-800";
    if (status.includes("3. Technical")) return "bg-blue-100 text-blue-800";
    if (status.includes("4. Final Offer")) return "bg-purple-100 text-purple-800";
    return "bg-gray-100 text-gray-800";
  };
};
