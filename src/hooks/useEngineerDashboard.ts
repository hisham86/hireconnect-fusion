
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useEngineerProfile } from "./useEngineerProfile";
import { useJobApplications } from "./useJobApplications";
import { useSuggestedJobs } from "./useSuggestedJobs";
import { useJobDisplay } from "./useJobDisplay";
import { type JobApplication } from "@/services/jobApplicationService";

export function useEngineerDashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  // Use the individual hooks for different data domains
  const profileHook = useEngineerProfile();
  const jobApplicationsHook = useJobApplications();
  const suggestedJobsHook = useSuggestedJobs((newJob: JobApplication) => {
    jobApplicationsHook.loadJobApplications();
  });
  const jobDisplayHook = useJobDisplay();
  
  // Combine loading states from all hooks
  useEffect(() => {
    const allLoaded = 
      !profileHook.isLoading && 
      !jobApplicationsHook.isLoading && 
      !suggestedJobsHook.isLoading;
    
    setIsLoading(!allLoaded);
  }, [
    profileHook.isLoading, 
    jobApplicationsHook.isLoading, 
    suggestedJobsHook.isLoading
  ]);
  
  // Load all data when user is authenticated
  const loadUserData = async () => {
    if (!user) return;
    
    try {
      // Load all data in parallel for better performance
      await Promise.all([
        profileHook.loadProfileData(),
        jobApplicationsHook.loadJobApplications(),
        suggestedJobsHook.loadSuggestedJobs()
      ]);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };
  
  // Return a combined API from all hooks
  return {
    // Loading state
    isLoading,
    
    // Profile-related props and methods
    profile: profileHook.profile,
    programmingLanguages: profileHook.programmingLanguages,
    updateProfile: profileHook.updateProfile,
    addProgrammingLanguage: profileHook.addProgrammingLanguage,
    removeProgrammingLanguage: profileHook.removeProgrammingLanguage,
    
    // Job applications-related props and methods
    jobApplications: jobApplicationsHook.jobApplications,
    summaryData: jobApplicationsHook.summaryData,
    addNewJobApplication: jobApplicationsHook.addNewJobApplication,
    updateJobApplicationStatus: jobApplicationsHook.updateJobApplicationStatus,
    removeJobApplication: jobApplicationsHook.removeJobApplication,
    getJobTAContact: jobApplicationsHook.getJobTAContact,
    updateTAContact: jobApplicationsHook.updateTAContact,
    
    // Suggested jobs-related props and methods
    suggestedJobs: suggestedJobsHook.suggestedJobs,
    addNewSuggestedJob: suggestedJobsHook.addNewSuggestedJob,
    applySuggestedJob: suggestedJobsHook.applySuggestedJob,
    
    // Display-related props and methods
    activeTab: jobDisplayHook.activeTab,
    setActiveTab: jobDisplayHook.setActiveTab,
    salaryDisplayMode: jobDisplayHook.salaryDisplayMode, 
    sortColumn: jobDisplayHook.sortColumn,
    sortDirection: jobDisplayHook.sortDirection,
    toggleSalaryDisplay: jobDisplayHook.toggleSalaryDisplay,
    handleSort: jobDisplayHook.handleSort,
    getSortedJobs: jobDisplayHook.getSortedJobs,
    
    // Combined method to load all data
    loadUserData
  };
}
