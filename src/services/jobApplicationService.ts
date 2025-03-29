
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface JobApplication {
  id: string;
  user_id: string;
  company: string;
  logo_url?: string;
  role: string;
  status?: string;
  annual_salary?: string;
  monthly_salary?: string;
  location?: string;
  transport_time_car?: string;
  transport_time_public?: string;
  commute_minutes?: number;
  applied_at: string;
  glassdoor_url?: string;
  rating?: number;
  reviews?: number;
  founded?: number;
  employees?: string;
  description?: string;
  manually_added?: boolean;
  source_platform?: string;
  is_active?: boolean;
}

export interface TalentAcquisitionContact {
  id?: string;
  job_application_id: string;
  name?: string;
  email?: string;
  phone?: string;
  invited?: boolean;
}

export const getJobApplications = async (): Promise<JobApplication[]> => {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session.session?.user) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('user_id', session.session.user.id)
    .order('applied_at', { ascending: false });
    
  if (error) {
    console.error("Error fetching job applications:", error);
    toast({
      title: "Error",
      description: "Could not load your job applications. Please try again later.",
      variant: "destructive",
    });
    return [];
  }
  
  return data || [];
};

export const getActiveJobApplications = async (): Promise<JobApplication[]> => {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session.session?.user) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('user_id', session.session.user.id)
    .eq('is_active', true)
    .order('applied_at', { ascending: false });
    
  if (error) {
    console.error("Error fetching active job applications:", error);
    toast({
      title: "Error",
      description: "Could not load your active job applications. Please try again later.",
      variant: "destructive",
    });
    return [];
  }
  
  return data || [];
};

export const addJobApplication = async (jobApplication: Omit<JobApplication, 'id' | 'user_id'>): Promise<JobApplication | null> => {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session.session?.user) {
    toast({
      title: "Authentication required",
      description: "Please sign in to add a job application.",
      variant: "destructive",
    });
    return null;
  }
  
  const { data, error } = await supabase
    .from('job_applications')
    .insert({
      user_id: session.session.user.id,
      ...jobApplication,
    })
    .select()
    .single();
    
  if (error) {
    console.error("Error adding job application:", error);
    toast({
      title: "Error",
      description: "Could not add your job application. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
  
  toast({
    title: "Success",
    description: "Your job application has been added.",
  });
  
  return data;
};

export const updateJobApplication = async (id: string, jobApplication: Partial<JobApplication>): Promise<JobApplication | null> => {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session.session?.user) {
    toast({
      title: "Authentication required",
      description: "Please sign in to update a job application.",
      variant: "destructive",
    });
    return null;
  }
  
  const { data, error } = await supabase
    .from('job_applications')
    .update({
      ...jobApplication,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', session.session.user.id)
    .select()
    .single();
    
  if (error) {
    console.error("Error updating job application:", error);
    toast({
      title: "Error",
      description: "Could not update your job application. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
  
  toast({
    title: "Success",
    description: "Your job application has been updated.",
  });
  
  return data;
};

export const getTalentAcquisitionContact = async (jobApplicationId: string): Promise<TalentAcquisitionContact | null> => {
  const { data, error } = await supabase
    .from('talent_acquisition_contacts')
    .select('*')
    .eq('job_application_id', jobApplicationId)
    .maybeSingle();
    
  if (error) {
    console.error("Error fetching talent acquisition contact:", error);
    return null;
  }
  
  return data;
};

export const addOrUpdateTalentAcquisitionContact = async (contact: TalentAcquisitionContact): Promise<TalentAcquisitionContact | null> => {
  const { data: existingContact } = await supabase
    .from('talent_acquisition_contacts')
    .select('*')
    .eq('job_application_id', contact.job_application_id)
    .maybeSingle();
    
  let result;
  
  if (existingContact) {
    // Update existing contact
    const { data, error } = await supabase
      .from('talent_acquisition_contacts')
      .update({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        invited: contact.invited,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existingContact.id)
      .select()
      .single();
      
    if (error) {
      console.error("Error updating talent acquisition contact:", error);
      return null;
    }
    
    result = data;
  } else {
    // Create new contact
    const { data, error } = await supabase
      .from('talent_acquisition_contacts')
      .insert(contact)
      .select()
      .single();
      
    if (error) {
      console.error("Error adding talent acquisition contact:", error);
      return null;
    }
    
    result = data;
  }
  
  return result;
};
