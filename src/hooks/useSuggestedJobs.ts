
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useSound } from "@/hooks/useSound";
import {
  fetchSuggestedJobs,
  addSuggestedJob,
  addJobApplication,
  type SuggestedJob,
  type JobApplication
} from "@/services/jobApplicationService";

export function useSuggestedJobs(onJobApplied?: (newJob: JobApplication) => void) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { playSuccess, playError } = useSound();
  
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedJobs, setSuggestedJobs] = useState<SuggestedJob[]>([]);

  // Load suggested jobs when user is authenticated
  useEffect(() => {
    if (user) {
      loadSuggestedJobs();
    }
  }, [user]);

  const loadSuggestedJobs = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Load suggested jobs
      const suggested = await fetchSuggestedJobs(user.id);
      setSuggestedJobs(suggested);
    } catch (error) {
      console.error("Error loading suggested jobs:", error);
      toast({
        title: "Error loading suggested jobs",
        description: "Failed to load job suggestions. Please try again.",
        variant: "destructive",
      });
      playError();
    } finally {
      setIsLoading(false);
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
      
      // Update the UI by removing the job from suggestions
      setSuggestedJobs(prev => prev.filter(job => job.id !== jobId));
      
      // Call the callback if provided
      if (onJobApplied) {
        onJobApplied(jobApplication);
      }
      
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

  return {
    isLoading,
    suggestedJobs,
    addNewSuggestedJob,
    applySuggestedJob,
    loadSuggestedJobs
  };
}
