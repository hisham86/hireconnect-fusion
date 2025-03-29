
import React from "react";
import JobsTabs from "./jobs/JobsTabs";
import { type DisplayableJob } from "@/hooks/useJobDisplay";

interface JobsSectionProps {
  activeTab: "active" | "suitable" | "all";
  setActiveTab: (tab: "active" | "suitable" | "all") => void;
  jobApplications: any[];
  suggestedJobs: any[];
  salaryDisplayMode: "annual" | "monthly";
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  toggleSalaryDisplay: () => void;
  handleSort: (column: string) => void;
  getSortedJobs: <T extends DisplayableJob>(jobs: T[]) => T[];
  onAddJobClick: () => void;
  applySuggestedJob: (jobId: string) => Promise<any>;
  renderSalaryHeader: () => React.ReactNode;
  renderCommuteTimeHeader: () => React.ReactNode;
  getSalaryDisplay: (job: DisplayableJob) => string | null;
  renderCompanyCell: (job: DisplayableJob) => React.ReactNode;
  renderStarRating: (rating: number) => React.ReactNode;
  getStatusColor: (status: string) => string;
  renderTransportTime: (job: DisplayableJob) => React.ReactNode;
}

const JobsSection: React.FC<JobsSectionProps> = ({
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
  return (
    <JobsTabs 
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      jobApplications={jobApplications}
      suggestedJobs={suggestedJobs}
      salaryDisplayMode={salaryDisplayMode}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      toggleSalaryDisplay={toggleSalaryDisplay}
      handleSort={handleSort}
      getSortedJobs={getSortedJobs}
      onAddJobClick={onAddJobClick}
      applySuggestedJob={applySuggestedJob}
      renderSalaryHeader={renderSalaryHeader}
      renderCommuteTimeHeader={renderCommuteTimeHeader}
      getSalaryDisplay={getSalaryDisplay}
      renderCompanyCell={renderCompanyCell}
      renderStarRating={renderStarRating}
      getStatusColor={getStatusColor}
      renderTransportTime={renderTransportTime}
    />
  );
};

export default JobsSection;
