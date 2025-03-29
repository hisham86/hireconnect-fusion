
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import AddJobDialog from "./AddJobDialog";
import { useEngineerDashboard } from "@/hooks/useEngineerDashboard";
import { useAuth } from "@/context/AuthContext";
import DashboardHeader from "./dashboard/DashboardHeader";
import DashboardLoadingState from "./dashboard/DashboardLoadingState";
import ApplicationStatusCard from "./dashboard/cards/ApplicationStatusCard";
import TimelineCard from "./dashboard/cards/TimelineCard";
import SalaryCard from "./dashboard/cards/SalaryCard";
import LocationCard from "./dashboard/cards/LocationCard";
import JobsTabs from "./dashboard/jobs/JobsTabs";
import { 
  createRenderStarRating, 
  createRenderCompanyCell,
  createRenderSalaryHeader,
  createRenderCommuteTimeHeader,
  createGetSalaryDisplay,
  createRenderTransportTime,
  createGetStatusColor
} from "./dashboard/util/JobDisplayUtils";

const EngineerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAddJobDialogOpen, setIsAddJobDialogOpen] = useState(false);
  
  const malaysianLocations = [
    "Kuala Lumpur", "Petaling Jaya", "Shah Alam", "Subang Jaya", "Klang",
    "Bangi", "Kajang", "Cyberjaya", "Putrajaya", "Puchong",
    "Seremban", "Nilai", "Sepang", "Rawang", "Gombak"
  ];
  
  const {
    isLoading,
    profile,
    programmingLanguages,
    jobApplications,
    suggestedJobs,
    activeTab,
    setActiveTab,
    salaryDisplayMode,
    sortColumn,
    sortDirection,
    summaryData,
    updateProfile,
    addProgrammingLanguage,
    removeProgrammingLanguage,
    addNewJobApplication,
    updateJobApplicationStatus,
    removeJobApplication,
    getJobTAContact,
    updateTAContact,
    addNewSuggestedJob,
    applySuggestedJob,
    toggleSalaryDisplay,
    handleSort,
    getSortedJobs
  } = useEngineerDashboard();

  const handleLocationChange = async (value: string) => {
    if (!profile) return;
    await updateProfile({ home_location: value });
  };

  const handleJobNatureChange = async (value: string) => {
    if (!profile || !value) return;
    await updateProfile({ job_nature_preference: value });
  };

  const handleAddJob = async (jobData: any) => {
    if (!user) return;
    
    await addNewJobApplication({
      company: jobData.company,
      logo_url: jobData.logoUrl,
      role: jobData.role,
      status: "1. Application Submitted",
      annual_salary: jobData.annualSalary,
      monthly_salary: jobData.monthlySalary,
      location: jobData.location,
      transport_time_car: jobData.transportTime?.car,
      transport_time_public: jobData.transportTime?.public,
      commute_minutes: jobData.commuteMinutes,
      glassdoor_url: jobData.glassdoorUrl,
      rating: jobData.rating,
      reviews: jobData.reviews,
      founded: jobData.founded,
      employees: jobData.employees,
      description: jobData.description,
      manually_added: true,
      source_platform: "Manual"
    });
  };

  if (isLoading || !profile) {
    return <DashboardLoadingState />;
  }

  // Create rendering utility functions
  const renderStarRating = createRenderStarRating();
  const renderCompanyCell = createRenderCompanyCell();
  const renderSalaryHeader = createRenderSalaryHeader(toggleSalaryDisplay, handleSort, salaryDisplayMode, sortColumn);
  const renderCommuteTimeHeader = createRenderCommuteTimeHeader(handleSort, sortColumn);
  const getSalaryDisplay = createGetSalaryDisplay(salaryDisplayMode);
  const renderTransportTime = createRenderTransportTime();
  const getStatusColor = createGetStatusColor();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <DashboardHeader onAddJobClick={() => setIsAddJobDialogOpen(true)} />
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-6">
              <ApplicationStatusCard 
                applications={summaryData.applications} 
                interviews={summaryData.interviews} 
                offers={summaryData.offers} 
              />
              
              <TimelineCard 
                avgResponseTime={summaryData.avgResponseTime} 
                hasInterviewScheduled={jobApplications.some(job => job.status?.includes("Interview"))} 
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
            onAddJobClick={() => setIsAddJobDialogOpen(true)}
            applySuggestedJob={applySuggestedJob}
            renderSalaryHeader={renderSalaryHeader}
            renderCommuteTimeHeader={renderCommuteTimeHeader}
            getSalaryDisplay={getSalaryDisplay}
            renderCompanyCell={renderCompanyCell}
            renderStarRating={renderStarRating}
            getStatusColor={getStatusColor}
            renderTransportTime={renderTransportTime}
          />
        </div>
      </div>
      
      <AddJobDialog 
        open={isAddJobDialogOpen} 
        onOpenChange={setIsAddJobDialogOpen}
        onAddJob={handleAddJob}
      />
    </section>
  );
};

export default EngineerDashboard;
