
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface SuggestedJob {
  id: string;
  user_id: string;
  company: string;
  logo_url?: string;
  role: string;
  match_percentage?: string;
  annual_salary?: string;
  monthly_salary?: string;
  location?: string;
  transport_time_car?: string;
  transport_time_public?: string;
  commute_minutes?: number;
  glassdoor_url?: string;
  rating?: number;
  reviews?: number;
  founded?: number;
  employees?: string;
  description?: string;
}

export const getSuggestedJobs = async (): Promise<SuggestedJob[]> => {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session.session?.user) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('suggested_jobs')
    .select('*')
    .eq('user_id', session.session.user.id);
    
  if (error) {
    console.error("Error fetching suggested jobs:", error);
    toast({
      title: "Error",
      description: "Could not load your suggested jobs. Please try again later.",
      variant: "destructive",
    });
    return [];
  }
  
  return data || [];
};

export const addSuggestedJob = async (suggestedJob: Omit<SuggestedJob, 'id' | 'user_id'>): Promise<SuggestedJob | null> => {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session.session?.user) {
    toast({
      title: "Authentication required",
      description: "Please sign in to add a suggested job.",
      variant: "destructive",
    });
    return null;
  }
  
  const { data, error } = await supabase
    .from('suggested_jobs')
    .insert({
      user_id: session.session.user.id,
      ...suggestedJob,
    })
    .select()
    .single();
    
  if (error) {
    console.error("Error adding suggested job:", error);
    toast({
      title: "Error",
      description: "Could not add the suggested job. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
  
  return data;
};
