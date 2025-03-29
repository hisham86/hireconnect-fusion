
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { type DisplayableJob } from "@/hooks/useJobDisplay";
import JobsTable from "./JobsTable";
import EmptyJobsState from "./EmptyJobsState";

interface JobsTabContentProps {
  activeTab: "active" | "suitable" | "all";
  jobs: DisplayableJob[];
  salaryDisplayMode: "annual" | "monthly";
  renderSalaryHeader: () => React.ReactNode;
  renderCommuteTimeHeader: () => React.ReactNode;
  getSalaryDisplay: (job: DisplayableJob) => string | null;
  renderCompanyCell: (job: DisplayableJob) => React.ReactNode;
  renderApplyButton?: (job: DisplayableJob) => React.ReactNode;
  renderStarRating: (rating: number) => React.ReactNode;
  getStatusColor: (status: string) => string;
  renderTransportTime: (job: DisplayableJob) => React.ReactNode;
  onAddJobClick: () => void;
}

const JobsTabContent: React.FC<JobsTabContentProps> = ({
  activeTab,
  jobs,
  salaryDisplayMode,
  renderSalaryHeader,
  renderCommuteTimeHeader,
  getSalaryDisplay,
  renderCompanyCell,
  renderApplyButton,
  renderStarRating,
  getStatusColor,
  renderTransportTime,
  onAddJobClick
}) => {
  return (
    <TabsContent value={activeTab}>
      {jobs.length === 0 ? (
        <EmptyJobsState 
          activeTab={activeTab} 
          onAddJobClick={onAddJobClick}
        />
      ) : (
        <JobsTable
          jobs={jobs}
          activeTab={activeTab}
          salaryDisplayMode={salaryDisplayMode}
          renderSalaryHeader={renderSalaryHeader}
          renderCommuteTimeHeader={renderCommuteTimeHeader}
          getSalaryDisplay={getSalaryDisplay}
          renderCompanyCell={renderCompanyCell}
          renderApplyButton={renderApplyButton}
          renderStarRating={renderStarRating}
          getStatusColor={getStatusColor}
          renderTransportTime={renderTransportTime}
        />
      )}
    </TabsContent>
  );
};

export default JobsTabContent;
