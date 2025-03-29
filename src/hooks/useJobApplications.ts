
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useSound } from "@/hooks/useSound";
import {
  fetchUserJobApplications,
  addJobApplication,
  updateJobApplication,
  deleteJobApplication,
  fetchJobApplicationTAContact,
  addOrUpdateTAContact,
  type JobApplication,
  type TalentAcquisitionContact
} from "@/services/jobApplicationService";

export function useJobApplications() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { playSuccess, playError } = useSound();
  
  const [isLoading, setIsLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [summaryData, setSummaryData] = useState({
    applications: 0,
    interviews: 0,
    offers: 0,
    averageSalary: "RM0",
    topLocation: "N/A",
    avgResponseTime: "N/A"
  });

  // Load job applications when user is authenticated
  useEffect(() => {
    if (user) {
      loadJobApplications();
    }
  }, [user]);

  const loadJobApplications = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Load job applications
      const applications = await fetchUserJobApplications(user.id);
      setJobApplications(applications);
      
      // Calculate summary data
      calculateSummaryData(applications);
    } catch (error) {
      console.error("Error loading job applications:", error);
      toast({
        title: "Error loading job applications",
        description: "Failed to load your job applications. Please try again.",
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

  return {
    isLoading,
    jobApplications,
    summaryData,
    addNewJobApplication,
    updateJobApplicationStatus,
    removeJobApplication,
    getJobTAContact,
    updateTAContact,
    loadJobApplications,
    calculateSummaryData
  };
}
