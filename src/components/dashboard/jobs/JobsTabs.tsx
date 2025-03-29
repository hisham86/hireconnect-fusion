
import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Star, Check, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobsTabContent from "./JobsTabContent";
import { type DisplayableJob } from "@/hooks/useJobDisplay";
import { type JobApplication } from "@/services/jobApplicationService";

interface JobsTabsProps {
  activeTab: "active" | "suitable" | "all";
  setActiveTab: (tab: "active" | "suitable" | "all") => void;
  jobApplications: JobApplication[];
  suggestedJobs: DisplayableJob[];
  salaryDisplayMode: "annual" | "monthly";
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  toggleSalaryDisplay: () => void;
  handleSort: (column: string) => void;
  getSortedJobs: <T extends DisplayableJob>(jobs: T[]) => T[];
  onAddJobClick: () => void;
  applySuggestedJob: (id: string) => Promise<JobApplication | null>;
  renderSalaryHeader: () => React.ReactNode;
  renderCommuteTimeHeader: () => React.ReactNode;
  getSalaryDisplay: (job: DisplayableJob) => string | null;
  renderCompanyCell: (job: DisplayableJob) => React.ReactNode;
  renderStarRating: (rating: number) => React.ReactNode;
  getStatusColor: (status: string) => string;
  renderTransportTime: (job: DisplayableJob) => React.ReactNode;
}

const JobsTabs: React.FC<JobsTabsProps> = ({
  activeTab,
  setActiveTab,
  jobApplications,
  suggestedJobs,
  salaryDisplayMode,
  sortColumn,
  sortDirection,
  toggleSalaryDisplay,
  handleSort,
  getSortedJobs,
  onAddJobClick,
  applySuggestedJob,
  renderSalaryHeader,
  renderCommuteTimeHeader,
  getSalaryDisplay,
  renderCompanyCell,
  renderStarRating,
  getStatusColor,
  renderTransportTime
}) => {
  const renderApplyButton = (job: DisplayableJob) => {
    const isApplied = jobApplications.some(
      application => application.company === job.company && application.role === job.role
    );
    
    if (isApplied) {
      return (
        <Button 
          variant="secondary" 
          size="sm" 
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-medium transition-all duration-300 hover:shadow-md hover:scale-105"
        >
          View Details <PlusIcon className="ml-1 h-4 w-4" />
        </Button>
      );
    }
    
    return (
      <Button 
        variant="default" 
        size="sm" 
        className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white font-medium transition-all duration-300 hover:shadow-md hover:scale-105"
        onClick={() => applySuggestedJob(job.id)}
      >
        Apply Now <PlusIcon className="ml-1 h-4 w-4" />
      </Button>
    );
  };

  // Create a combined job list for the "all" tab with the isSuggested property
  const allJobs = activeTab === "all" 
    ? getSortedJobs([
        ...jobApplications,
        ...suggestedJobs.map(job => ({
          ...job,
          status: "Not Applied",
          isSuggested: true as const
        }))
      ])
    : [];

  // Get the jobs to display for the current tab
  const getJobsForTab = () => {
    switch (activeTab) {
      case "active":
        return getSortedJobs(jobApplications);
      case "suitable":
        return getSortedJobs(suggestedJobs);
      case "all":
        return allJobs;
      default:
        return [];
    }
  };

  const displayJobs = getJobsForTab();

  return (
    <Card className="overflow-hidden">
      <Tabs 
        value={activeTab} 
        className="w-full" 
        onValueChange={(value) => setActiveTab(value as "active" | "suitable" | "all")}
      >
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <TabsList className="grid grid-cols-3 rounded-none">
            <TabsTrigger value="active" className="py-3">
              <Briefcase className="w-4 h-4 mr-2" />
              Active Jobs
            </TabsTrigger>
            <TabsTrigger value="suitable" className="py-3">
              <Star className="w-4 h-4 mr-2" />
              Suitable Jobs
            </TabsTrigger>
            <TabsTrigger value="all" className="py-3">
              <Check className="w-4 h-4 mr-2" />
              All Jobs
            </TabsTrigger>
          </TabsList>
          <Button 
            onClick={onAddJobClick}
            className="flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" />
            Manually Track Job
          </Button>
        </div>
        
        <JobsTabContent
          activeTab="active"
          jobs={activeTab === "active" ? displayJobs : []}
          salaryDisplayMode={salaryDisplayMode}
          renderSalaryHeader={renderSalaryHeader}
          renderCommuteTimeHeader={renderCommuteTimeHeader}
          getSalaryDisplay={getSalaryDisplay}
          renderCompanyCell={renderCompanyCell}
          renderStarRating={renderStarRating}
          getStatusColor={getStatusColor}
          renderTransportTime={renderTransportTime}
          onAddJobClick={onAddJobClick}
        />
        
        <JobsTabContent
          activeTab="suitable"
          jobs={activeTab === "suitable" ? displayJobs : []}
          salaryDisplayMode={salaryDisplayMode}
          renderSalaryHeader={renderSalaryHeader}
          renderCommuteTimeHeader={renderCommuteTimeHeader}
          getSalaryDisplay={getSalaryDisplay}
          renderCompanyCell={renderCompanyCell}
          renderApplyButton={renderApplyButton}
          renderStarRating={renderStarRating}
          getStatusColor={getStatusColor}
          renderTransportTime={renderTransportTime}
          onAddJobClick={onAddJobClick}
        />
        
        <JobsTabContent
          activeTab="all"
          jobs={activeTab === "all" ? displayJobs : []}
          salaryDisplayMode={salaryDisplayMode}
          renderSalaryHeader={renderSalaryHeader}
          renderCommuteTimeHeader={renderCommuteTimeHeader}
          getSalaryDisplay={getSalaryDisplay}
          renderCompanyCell={renderCompanyCell}
          renderStarRating={renderStarRating}
          getStatusColor={getStatusColor}
          renderTransportTime={renderTransportTime}
          onAddJobClick={onAddJobClick}
        />
      </Tabs>
    </Card>
  );
};

export default JobsTabs;
