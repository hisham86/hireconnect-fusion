
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { EngineerProfile } from '@/types/profile';
import { MousePointer } from 'lucide-react';

interface ProfileCardProps {
  profile: EngineerProfile;
  isFocused: boolean;
  onClick: () => void;
  index: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, isFocused, onClick, index }) => {
  return (
    <div 
      onClick={onClick}
      className={`floating-profile absolute ${profile.position} ${profile.rotation} ${profile.specialClass} ${profile.floatClass} backdrop-blur-lg rounded-2xl p-6 shadow-xl border
        ${isFocused ? 'focused-profile z-50 scale-110' : ''} 
        transition-all duration-300 cursor-pointer hover:shadow-2xl group`}
      style={{
        animationDelay: `${index * 0.2}s`,
        zIndex: isFocused ? 50 : 10 - index,
        ['--rotation' as any]: profile.rotation
      }}
    >
      {!isFocused && (
        <div className="absolute -top-3 -right-3 bg-brand-primary text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 text-xs">
          <MousePointer className="h-3 w-3" />
          Click me
        </div>
      )}
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
  );
};

export default ProfileCard;
