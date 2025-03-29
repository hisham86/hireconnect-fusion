
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface EngineerProfile {
  id: string;
  current_salary: string | null;
  expected_salary: string | null;
  github_url: string | null;
  home_location: string | null;
  job_nature_preference: string | null;
  is_verified: boolean | null;
}

export const getEngineerProfile = async (): Promise<EngineerProfile | null> => {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session.session?.user) {
    return null;
  }
  
  const { data, error } = await supabase
    .from('engineer_profiles')
    .select('*')
    .eq('id', session.session.user.id)
    .maybeSingle();
    
  if (error) {
    console.error("Error fetching engineer profile:", error);
    toast({
      title: "Error",
      description: "Could not load your profile. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
  
  return data;
};

export const createOrUpdateEngineerProfile = async (profile: Partial<EngineerProfile>): Promise<EngineerProfile | null> => {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session.session?.user) {
    toast({
      title: "Authentication required",
      description: "Please sign in to update your profile.",
      variant: "destructive",
    });
    return null;
  }
  
  const userId = session.session.user.id;
  
  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from('engineer_profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
    
  let result;
  
  if (existingProfile) {
    // Update existing profile
    const { data, error } = await supabase
      .from('engineer_profiles')
      .update({
        ...profile,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();
      
    if (error) {
      console.error("Error updating engineer profile:", error);
      toast({
        title: "Error",
        description: "Could not update your profile. Please try again later.",
        variant: "destructive",
      });
      return null;
    }
    
    result = data;
  } else {
    // Create new profile
    const { data, error } = await supabase
      .from('engineer_profiles')
      .insert({
        id: userId,
        ...profile,
      })
      .select()
      .single();
      
    if (error) {
      console.error("Error creating engineer profile:", error);
      toast({
        title: "Error",
        description: "Could not create your profile. Please try again later.",
        variant: "destructive",
      });
      return null;
    }
    
    result = data;
  }
  
  toast({
    title: "Success",
    description: "Your profile has been saved.",
  });
  
  return result;
};
