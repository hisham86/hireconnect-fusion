
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Star, StarHalf, ExternalLink, ArrowUpRightIcon, Car } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { type DisplayableJob } from "@/hooks/useJobDisplay";

interface JobsTableProps {
  jobs: DisplayableJob[];
  activeTab: "active" | "suitable" | "all";
  salaryDisplayMode: "annual" | "monthly";
  renderSalaryHeader: () => React.ReactNode;
  renderCommuteTimeHeader: () => React.ReactNode;
  getSalaryDisplay: (job: DisplayableJob) => string | null;
  renderCompanyCell: (job: DisplayableJob) => React.ReactNode;
  renderApplyButton?: (job: DisplayableJob) => React.ReactNode;
  renderStarRating: (rating: number) => React.ReactNode;
  getStatusColor: (status: string) => string;
  renderTransportTime: (job: DisplayableJob) => React.ReactNode;
}

const JobsTable: React.FC<JobsTableProps> = ({
  jobs,
  activeTab,
  salaryDisplayMode,
  renderSalaryHeader,
  renderCommuteTimeHeader,
  getSalaryDisplay,
  renderCompanyCell,
  renderApplyButton,
  renderStarRating,
  getStatusColor,
  renderTransportTime
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Role</TableHead>
          {activeTab === "active" && <TableHead>Status</TableHead>}
          {activeTab === "suitable" && <TableHead>Match</TableHead>}
          {activeTab === "all" && <TableHead>Status</TableHead>}
          <TableHead>{renderSalaryHeader()}</TableHead>
          {activeTab !== "active" && <TableHead>Location</TableHead>}
          <TableHead>{renderCommuteTimeHeader()}</TableHead>
          {activeTab === "active" && <TableHead>Applied</TableHead>}
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell>{renderCompanyCell(job)}</TableCell>
            <TableCell>{job.rating && renderStarRating(job.rating)}</TableCell>
            <TableCell>{job.role}</TableCell>
            {activeTab === "active" && (
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status || "")}`}>
                  {job.status || "1. Application Submitted"}
                </span>
              </TableCell>
            )}
            {activeTab === "suitable" && (
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {job.match_percentage || "90%"}
                </span>
              </TableCell>
            )}
            {activeTab === "all" && (
              <TableCell>
                {job.isSuggested ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Not Applied
                  </span>
                ) : (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status || "")}`}>
                    {job.status || "1. Application Submitted"}
                  </span>
                )}
              </TableCell>
            )}
            <TableCell>{getSalaryDisplay(job) || "Not specified"}</TableCell>
            {activeTab !== "active" && <TableCell>{job.location || "Not specified"}</TableCell>}
            <TableCell>{renderTransportTime(job)}</TableCell>
            {activeTab === "active" && (
              <TableCell>
                {job.applied_at && new Date(job.applied_at).toLocaleDateString()}
              </TableCell>
            )}
            <TableCell>
              {activeTab === "suitable" && renderApplyButton ? renderApplyButton(job) : (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-medium transition-all duration-300 hover:shadow-md hover:scale-105"
                >
                  View Details <ArrowUpRightIcon className="ml-1 h-4 w-4" />
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JobsTable;
