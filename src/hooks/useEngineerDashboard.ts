
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import {
  fetchUserProfile,
  createUserProfile,
  updateUserProfile,
  fetchUserProgrammingLanguages,
  addUserProgrammingLanguage,
  deleteUserProgrammingLanguage,
  type EngineerProfile,
  type ProgrammingLanguage
} from "@/services/engineerProfileService";
import {
  fetchUserJobApplications,
  fetchSuggestedJobs,
  addJobApplication,
  updateJobApplication,
  deleteJobApplication,
  fetchJobApplicationTAContact,
  addOrUpdateTAContact,
  addSuggestedJob,
  type JobApplication,
  type SuggestedJob,
  type TalentAcquisitionContact
} from "@/services/jobApplicationService";
import { useSound } from "@/hooks/useSound";

export function useEngineerDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { playSuccess, playError } = useSound();
  
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<EngineerProfile | null>(null);
  const [programmingLanguages, setProgrammingLanguages] = useState<ProgrammingLanguage[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [suggestedJobs, setSuggestedJobs] = useState<SuggestedJob[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "suitable" | "all">("active");
  const [salaryDisplayMode, setSalaryDisplayMode] = useState<"annual" | "monthly">("monthly");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [summaryData, setSummaryData] = useState({
    applications: 0,
    interviews: 0,
    offers: 0,
    averageSalary: "RM0",
    topLocation: "N/A",
    avgResponseTime: "N/A"
  });

  // Load initial data when user is authenticated
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Load profile data
      let userProfile = await fetchUserProfile(user.id);
      
      // If profile doesn't exist, create one
      if (!userProfile) {
        userProfile = await createUserProfile(user.id, {
          current_salary: "RM0",
          expected_salary: "RM0",
          github_url: "",
          home_location: "Kuala Lumpur",
          job_nature_preference: "remote",
          is_verified: false
        });
      }
      
      setProfile(userProfile);
      
      // Load programming languages
      const languages = await fetchUserProgrammingLanguages(user.id);
      setProgrammingLanguages(languages);
      
      // Load job applications
      const applications = await fetchUserJobApplications(user.id);
      setJobApplications(applications);
      
      // Load suggested jobs
      const suggested = await fetchSuggestedJobs(user.id);
      setSuggestedJobs(suggested);
      
      // Calculate summary data
      calculateSummaryData(applications);
    } catch (error) {
      console.error("Error loading user data:", error);
      toast({
        title: "Error loading data",
        description: "Failed to load your dashboard data. Please try again.",
        variant: "destructive",
      });
      playError();
    } finally {
      setIsLoading(false);
    }
  };

  const calculateSummaryData = (applications: JobApplication[]) => {
    // Count applications
    const totalApplications = applications.length;
    
    // Count interviews
    const interviewsCount = applications.filter(job => 
      job.status?.includes("Interview") || job.status?.includes("Technical")
    ).length;
    
    // Count offers
    const offersCount = applications.filter(job => 
      job.status?.includes("Offer")
    ).length;
    
    // Calculate average salary (using monthly for simplicity)
    const salaries = applications
      .filter(job => job.monthly_salary)
      .map(job => {
        const match = job.monthly_salary?.match(/RM(\d+\.?\d*)k/i);
        return match ? parseFloat(match[1]) * 1000 : null;
      })
      .filter(Boolean) as number[];
    
    const averageSalary = salaries.length > 0 
      ? `RM${Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length).toLocaleString()}`
      : "RM0";
    
    // Find top location
    const locationCounts: Record<string, number> = {};
    applications.forEach(job => {
      if (job.location) {
        locationCounts[job.location] = (locationCounts[job.location] || 0) + 1;
      }
    });
    
    const topLocation = Object.entries(locationCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
    
    setSummaryData({
      applications: totalApplications,
      interviews: interviewsCount,
      offers: offersCount,
      averageSalary,
      topLocation,
      avgResponseTime: "2 days" // This would require more complex calculation with actual response times
    });
  };

  const updateProfile = async (updates: Partial<EngineerProfile>) => {
    if (!user || !profile) return;
    
    try {
      const updatedProfile = await updateUserProfile(user.id, updates);
      setProfile(updatedProfile);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      playSuccess();
      return updatedProfile;
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
      playError();
      throw error;
    }
  };

  const addProgrammingLanguage = async (language: Omit<ProgrammingLanguage, "id" | "user_id">) => {
    if (!user) return null;
    
    try {
      const newLanguage = await addUserProgrammingLanguage({
        ...language,
        user_id: user.id
      });
      
      setProgrammingLanguages(prev => [...prev, newLanguage]);
      toast({
        title: "Language added",
        description: `${language.name} has been added to your skills.`,
      });
      playSuccess();
      return newLanguage;
    } catch (error) {
      console.error("Error adding programming language:", error);
      toast({
        title: "Error adding language",
        description: "Failed to add the programming language. Please try again.",
        variant: "destructive",
      });
      playError();
      throw error;
    }
  };

  const removeProgrammingLanguage = async (id: string) => {
    try {
      await deleteUserProgrammingLanguage(id);
      setProgrammingLanguages(prev => prev.filter(lang => lang.id !== id));
      toast({
        title: "Language removed",
        description: "The programming language has been removed from your skills.",
      });
      return true;
    } catch (error) {
      console.error("Error removing programming language:", error);
      toast({
        title: "Error removing language",
        description: "Failed to remove the programming language. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const addNewJobApplication = async (jobData: Omit<JobApplication, "id" | "user_id" | "applied_at" | "is_active">) => {
    if (!user) return null;
    
    try {
      const newJob = await addJobApplication({
        ...jobData,
        user_id: user.id,
        is_active: true
      });
      
      setJobApplications(prev => [newJob, ...prev]);
      calculateSummaryData([newJob, ...jobApplications]);
      
      toast({
        title: "Job application added",
        description: `Successfully added ${jobData.company} - ${jobData.role} to your applications.`,
      });
      playSuccess();
      return newJob;
    } catch (error) {
      console.error("Error adding job application:", error);
      toast({
        title: "Error adding job",
        description: "Failed to add the job application. Please try again.",
        variant: "destructive",
      });
      playError();
      throw error;
    }
  };

  const updateJobApplicationStatus = async (id: string, status: string) => {
    try {
      const updatedJob = await updateJobApplication(id, { status });
      
      setJobApplications(prev => 
        prev.map(job => job.id === id ? { ...job, status } : job)
      );
      
      toast({
        title: "Status updated",
        description: `Job status updated to "${status}".`,
      });
      playSuccess();
      return updatedJob;
    } catch (error) {
      console.error("Error updating job status:", error);
      toast({
        title: "Error updating status",
        description: "Failed to update the job status. Please try again.",
        variant: "destructive",
      });
      playError();
      throw error;
    }
  };

  const removeJobApplication = async (id: string) => {
    try {
      await deleteJobApplication(id);
      
      setJobApplications(prev => prev.filter(job => job.id !== id));
      calculateSummaryData(jobApplications.filter(job => job.id !== id));
      
      toast({
        title: "Job application removed",
        description: "The job application has been removed from your dashboard.",
      });
      return true;
    } catch (error) {
      console.error("Error removing job application:", error);
      toast({
        title: "Error removing job",
        description: "Failed to remove the job application. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getJobTAContact = async (jobId: string) => {
    try {
      return await fetchJobApplicationTAContact(jobId);
    } catch (error) {
      console.error("Error fetching TA contact:", error);
      return null;
    }
  };

  const updateTAContact = async (contact: Omit<TalentAcquisitionContact, "id"> & { id?: string }) => {
    try {
      const updatedContact = await addOrUpdateTAContact(contact);
      
      toast({
        title: "Contact updated",
        description: "Talent acquisition contact information has been updated.",
      });
      playSuccess();
      return updatedContact;
    } catch (error) {
      console.error("Error updating TA contact:", error);
      toast({
        title: "Error updating contact",
        description: "Failed to update the contact information. Please try again.",
        variant: "destructive",
      });
      playError();
      throw error;
    }
  };

  const addNewSuggestedJob = async (jobData: Omit<SuggestedJob, "id" | "user_id">) => {
    if (!user) return null;
    
    try {
      const newJob = await addSuggestedJob({
        ...jobData,
        user_id: user.id
      });
      
      setSuggestedJobs(prev => [newJob, ...prev]);
      
      toast({
        title: "Suggested job added",
        description: `Successfully added ${jobData.company} - ${jobData.role} to your suggestions.`,
      });
      playSuccess();
      return newJob;
    } catch (error) {
      console.error("Error adding suggested job:", error);
      toast({
        title: "Error adding job",
        description: "Failed to add the suggested job. Please try again.",
        variant: "destructive",
      });
      playError();
      throw error;
    }
  };

  const applySuggestedJob = async (jobId: string) => {
    // Find the suggested job
    const suggestedJob = suggestedJobs.find(job => job.id === jobId);
    if (!suggestedJob || !user) return null;
    
    try {
      // Add as a job application
      const jobApplication = await addJobApplication({
        user_id: user.id,
        company: suggestedJob.company,
        logo_url: suggestedJob.logo_url,
        role: suggestedJob.role,
        status: "1. Application Submitted",
        annual_salary: suggestedJob.annual_salary,
        monthly_salary: suggestedJob.monthly_salary,
        location: suggestedJob.location,
        transport_time_car: suggestedJob.transport_time_car,
        transport_time_public: suggestedJob.transport_time_public,
        commute_minutes: suggestedJob.commute_minutes,
        glassdoor_url: suggestedJob.glassdoor_url,
        rating: suggestedJob.rating,
        reviews: suggestedJob.reviews,
        founded: suggestedJob.founded,
        employees: suggestedJob.employees,
        description: suggestedJob.description,
        is_active: true,
        manually_added: true,
        source_platform: "Suggestion"
      });
      
      // Update the UI
      setJobApplications(prev => [jobApplication, ...prev]);
      setSuggestedJobs(prev => prev.filter(job => job.id !== jobId));
      calculateSummaryData([jobApplication, ...jobApplications]);
      
      toast({
        title: "Applied to job",
        description: `Successfully applied to ${suggestedJob.company} - ${suggestedJob.role}.`,
      });
      playSuccess();
      return jobApplication;
    } catch (error) {
      console.error("Error applying to suggested job:", error);
      toast({
        title: "Error applying to job",
        description: "Failed to apply to the suggested job. Please try again.",
        variant: "destructive",
      });
      playError();
      throw error;
    }
  };

  const toggleSalaryDisplay = () => {
    setSalaryDisplayMode(prev => prev === "annual" ? "monthly" : "annual");
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getSortedJobs = (jobs: any[]) => {
    if (!sortColumn) return jobs;

    return [...jobs].sort((a, b) => {
      let valueA, valueB;

      if (sortColumn === 'commuteTime') {
        valueA = a.commute_minutes || 0;
        valueB = b.commute_minutes || 0;
      } else if (sortColumn === 'salary') {
        // Extract numeric value from salary string
        const extractSalary = (str: string | null) => {
          if (!str) return 0;
          const match = str.match(/RM(\d+\.?\d*)k/i);
          return match ? parseFloat(match[1]) * 1000 : 0;
        };
        
        valueA = salaryDisplayMode === 'annual'
          ? extractSalary(a.annual_salary)
          : extractSalary(a.monthly_salary);
        
        valueB = salaryDisplayMode === 'annual'
          ? extractSalary(b.annual_salary)
          : extractSalary(b.monthly_salary);
      } else {
        valueA = a[sortColumn];
        valueB = b[sortColumn];
      }

      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  return {
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
    getSortedJobs,
    loadUserData
  };
}
