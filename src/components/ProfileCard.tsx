
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EngineerProfile } from '@/types/profile';
import { MousePointer, GripHorizontal, InfoIcon } from 'lucide-react';

interface ProfileCardProps {
  profile: EngineerProfile;
  isFocused: boolean;
  onClick: () => void;
  index: number;
  onMouseDown?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  draggable?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  isFocused, 
  onClick, 
  index, 
  onMouseDown,
  style,
  draggable = false
}) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    if (draggable && onMouseDown) {
      e.stopPropagation();
      onMouseDown(e);
    }
  };

  return (
    <div 
      onClick={onClick}
      onMouseDown={handleMouseDown}
      className={`floating-profile absolute ${profile.position} ${profile.rotation} ${profile.specialClass} ${profile.floatClass} backdrop-blur-lg rounded-2xl p-6 shadow-xl border
        ${isFocused ? 'focused-profile z-50 scale-110' : ''} 
        ${draggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'} 
        transition-all duration-300 hover:shadow-2xl group`}
      style={{
        animationDelay: `${index * 0.2}s`,
        zIndex: isFocused ? 50 : 10 - index,
        ['--rotation' as any]: profile.rotation,
        ...style,
        // Disable default float animation when in draggable mode
        animation: draggable ? 'none' : undefined
      }}
    >
      {!isFocused && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute -top-3 -right-3 bg-brand-primary text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 text-xs">
                <MousePointer className="h-3 w-3" />
                Click me
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to expand this engineer profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {draggable && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute -top-3 -left-3 bg-brand-primary text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <GripHorizontal className="h-3 w-3" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Drag to move this profile card around</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute -top-6 -right-6 bg-brand-light text-brand-primary rounded-full px-4 py-2 font-medium flex items-center gap-2">
              {profile.icon}
              Engineer Profile
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>View detailed information about this engineer</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-white/70 font-medium">Current Role</p>
          <p className="font-medium">{profile.role}</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="space-y-2 cursor-help">
                <p className="text-sm text-white/70 font-medium">Salary Expectation</p>
                <p className="font-medium">{profile.salary}</p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Expected compensation range for this engineer</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="space-y-2">
          <p className="text-sm text-white/70 font-medium">Notice Period</p>
          <p className="font-medium">{profile.notice}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-white/70 font-medium">Preferred Location</p>
          <p className="font-medium">{profile.location}</p>
        </div>
        <div className="pt-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-sm text-white/70 font-medium mb-2 cursor-help flex items-center">
                  Skills <InfoIcon className="h-3 w-3 ml-1" />
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>Technical skills and proficiency level</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex flex-wrap gap-2">
            {profile.languages.map((lang, i) => (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge key={i} className="bg-white/20 hover:bg-white/30 text-white flex items-center gap-1.5 border-white/10 cursor-help">
                      {i < profile.languageIcons.length && profile.languageIcons[i]}
                      {lang}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to see {lang} experience details</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
