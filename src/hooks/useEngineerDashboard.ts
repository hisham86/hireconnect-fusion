
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  getEngineerProfile, 
  createOrUpdateEngineerProfile, 
  EngineerProfile 
} from "@/services/engineerProfileService";
import { 
  getJobApplications, 
  getActiveJobApplications, 
  addJobApplication, 
  updateJobApplication, 
  JobApplication, 
  TalentAcquisitionContact,
  getTalentAcquisitionContact,
  addOrUpdateTalentAcquisitionContact
} from "@/services/jobApplicationService";
import { 
  getSuggestedJobs, 
  SuggestedJob 
} from "@/services/suggestedJobsService";
import { 
  getUserProgrammingLanguages, 
  addProgrammingLanguage, 
  deleteProgrammingLanguage, 
  ProgrammingLanguage 
} from "@/services/userProgrammingLanguagesService";
import { useToast } from "@/hooks/use-toast";

export const useEngineerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<EngineerProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [activeJobApplications, setActiveJobApplications] = useState<JobApplication[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  
  const [suggestedJobs, setSuggestedJobs] = useState<SuggestedJob[]>([]);
  const [isLoadingSuggestedJobs, setIsLoadingSuggestedJobs] = useState(true);
  
  const [programmingLanguages, setProgrammingLanguages] = useState<ProgrammingLanguage[]>([]);
  const [isLoadingLanguages, setIsLoadingLanguages] = useState(true);
  
  // Load initial data
  useEffect(() => {
    if (!user) return;
    
    const loadData = async () => {
      // Load profile
      setIsLoadingProfile(true);
      const profileData = await getEngineerProfile();
      setProfile(profileData);
      setIsLoadingProfile(false);
      
      // Load jobs
      setIsLoadingJobs(true);
      const [allJobs, activeJobs] = await Promise.all([
        getJobApplications(),
        getActiveJobApplications()
      ]);
      setJobApplications(allJobs);
      setActiveJobApplications(activeJobs);
      setIsLoadingJobs(false);
      
      // Load suggested jobs
      setIsLoadingSuggestedJobs(true);
      const suggestedJobsData = await getSuggestedJobs();
      setSuggestedJobs(suggestedJobsData);
      setIsLoadingSuggestedJobs(false);
      
      // Load programming languages
      setIsLoadingLanguages(true);
      const languagesData = await getUserProgrammingLanguages();
      setProgrammingLanguages(languagesData);
      setIsLoadingLanguages(false);
    };
    
    loadData();
  }, [user]);
  
  // Create or update engineer profile
  const updateProfile = async (profileData: Partial<EngineerProfile>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to update your profile.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedProfile = await createOrUpdateEngineerProfile(profileData);
    if (updatedProfile) {
      setProfile(updatedProfile);
    }
  };
  
  // Add new job application
  const addNewJobApplication = async (jobData: Omit<JobApplication, 'id' | 'user_id'>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add a job application.",
        variant: "destructive",
      });
      return null;
    }
    
    const newJob = await addJobApplication(jobData);
    if (newJob) {
      // Refresh job lists
      setJobApplications(prev => [newJob, ...prev]);
      if (newJob.is_active) {
        setActiveJobApplications(prev => [newJob, ...prev]);
      }
    }
    
    return newJob;
  };
  
  // Update job application
  const updateJobStatus = async (id: string, newStatus: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to update job status.",
        variant: "destructive",
      });
      return null;
    }
    
    const updatedJob = await updateJobApplication(id, { status: newStatus });
    if (updatedJob) {
      // Update job in lists
      setJobApplications(prev => 
        prev.map(job => job.id === id ? updatedJob : job)
      );
      
      setActiveJobApplications(prev => {
        if (!updatedJob.is_active) {
          return prev.filter(job => job.id !== id);
        }
        return prev.map(job => job.id === id ? updatedJob : job);
      });
    }
    
    return updatedJob;
  };
  
  // Get talent acquisition contact
  const getContactForJob = async (jobId: string) => {
    return await getTalentAcquisitionContact(jobId);
  };
  
  // Add or update talent acquisition contact
  const updateContactForJob = async (contact: TalentAcquisitionContact) => {
    return await addOrUpdateTalentAcquisitionContact(contact);
  };
  
  // Add programming language
  const addNewProgrammingLanguage = async (language: Omit<ProgrammingLanguage, 'id' | 'user_id'>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add a programming language.",
        variant: "destructive",
      });
      return;
    }
    
    const newLanguage = await addProgrammingLanguage(language);
    if (newLanguage) {
      setProgrammingLanguages(prev => [...prev, newLanguage]);
    }
  };
  
  // Delete programming language
  const removeLanguage = async (id: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to remove a programming language.",
        variant: "destructive",
      });
      return;
    }
    
    const success = await deleteProgrammingLanguage(id);
    if (success) {
      setProgrammingLanguages(prev => prev.filter(lang => lang.id !== id));
    }
  };
  
  // Helper functions to get summarized data
  const getSummaryData = () => {
    return {
      applications: jobApplications.length,
      interviews: jobApplications.filter(job => 
        job.status?.includes("Interview") || 
        job.status?.includes("Technical") || 
        job.status?.includes("Final")
      ).length,
      offers: jobApplications.filter(job => 
        job.status?.includes("Final Offer")
      ).length,
      averageSalary: calculateAverageSalary(),
      topLocation: getTopLocation(),
      avgResponseTime: "2 days" // Default value, could be calculated from real data
    };
  };
  
  const calculateAverageSalary = () => {
    const salaries = jobApplications
      .filter(job => job.annual_salary)
      .map(job => {
        // Extract the numerical value from the salary string
        const match = job.annual_salary?.match(/\d+/g);
        if (match && match.length > 0) {
          return parseInt(match[0], 10) * 1000; // Assuming format like "RM120k"
        }
        return 0;
      })
      .filter(salary => salary > 0);
    
    if (salaries.length === 0) return "N/A";
    
    const average = salaries.reduce((acc, curr) => acc + curr, 0) / salaries.length;
    return `RM${Math.round(average / 1000)}k`;
  };
  
  const getTopLocation = () => {
    const locations = jobApplications
      .map(job => job.location)
      .filter(Boolean);
    
    if (locations.length === 0) return "N/A";
    
    const locationCounts = locations.reduce((acc: Record<string, number>, location) => {
      if (location) {
        acc[location] = (acc[location] || 0) + 1;
      }
      return acc;
    }, {});
    
    let topLocation = "";
    let maxCount = 0;
    
    Object.entries(locationCounts).forEach(([location, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topLocation = location;
      }
    });
    
    return topLocation;
  };
  
  return {
    profile,
    isLoadingProfile,
    jobApplications,
    activeJobApplications,
    isLoadingJobs,
    suggestedJobs,
    isLoadingSuggestedJobs,
    programmingLanguages,
    isLoadingLanguages,
    updateProfile,
    addNewJobApplication,
    updateJobStatus,
    getContactForJob,
    updateContactForJob,
    addNewProgrammingLanguage,
    removeLanguage,
    getSummaryData
  };
};
