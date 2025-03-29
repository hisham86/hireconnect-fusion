
import React from "react";
import ApplicationStatusCard from "./cards/ApplicationStatusCard";
import TimelineCard from "./cards/TimelineCard";
import SalaryCard from "./cards/SalaryCard";
import LocationCard from "./cards/LocationCard";
import { type EngineerProfile } from "@/services/engineerProfileService";
import { type ProgrammingLanguage } from "@/services/engineerProfileService";

interface DashboardCardsProps {
  profile: EngineerProfile;
  programmingLanguages: ProgrammingLanguage[];
  summaryData: {
    applications: number;
    interviews: number;
    offers: number;
    avgResponseTime: string;
    averageSalary: string;
  };
  malaysianLocations: string[];
  updateProfile: (updates: Partial<EngineerProfile>) => Promise<EngineerProfile | undefined>;
  addProgrammingLanguage: (language: Omit<ProgrammingLanguage, "id" | "user_id">) => Promise<ProgrammingLanguage | null>;
  removeProgrammingLanguage: (id: string) => Promise<boolean>;
  handleLocationChange: (value: string) => Promise<void>;
  handleJobNatureChange: (value: string) => Promise<void>;
  hasInterviewScheduled: boolean;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({
  profile,
  programmingLanguages,
  summaryData,
  malaysianLocations,
  updateProfile,
  addProgrammingLanguage,
  removeProgrammingLanguage,
  handleLocationChange,
  handleJobNatureChange,
  hasInterviewScheduled
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="space-y-6">
        <ApplicationStatusCard 
          applications={summaryData.applications} 
          interviews={summaryData.interviews} 
          offers={summaryData.offers} 
        />
        
        <TimelineCard 
          avgResponseTime={summaryData.avgResponseTime} 
          hasInterviewScheduled={hasInterviewScheduled} 
        />
      </div>
      
      <SalaryCard 
        profile={profile}
        programmingLanguages={programmingLanguages}
        averageSalary={summaryData.averageSalary}
        updateProfile={updateProfile}
        addProgrammingLanguage={addProgrammingLanguage}
        removeProgrammingLanguage={removeProgrammingLanguage}
      />
      
      <LocationCard 
        profile={profile}
        malaysianLocations={malaysianLocations}
        handleLocationChange={handleLocationChange}
        handleJobNatureChange={handleJobNatureChange}
      />
    </div>
  );
};

export default DashboardCards;
