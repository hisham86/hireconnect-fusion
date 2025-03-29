
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface ProgrammingLanguage {
  id: string;
  user_id: string;
  name: string;
  color: string;
  icon: string;
}

export const getUserProgrammingLanguages = async (): Promise<ProgrammingLanguage[]> => {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session.session?.user) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('user_programming_languages')
    .select('*')
    .eq('user_id', session.session.user.id);
    
  if (error) {
    console.error("Error fetching programming languages:", error);
    toast({
      title: "Error",
      description: "Could not load your programming languages. Please try again later.",
      variant: "destructive",
    });
    return [];
  }
  
  return data || [];
};

export const addProgrammingLanguage = async (language: Omit<ProgrammingLanguage, 'id' | 'user_id'>): Promise<ProgrammingLanguage | null> => {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session.session?.user) {
    toast({
      title: "Authentication required",
      description: "Please sign in to add a programming language.",
      variant: "destructive",
    });
    return null;
  }
  
  const { data, error } = await supabase
    .from('user_programming_languages')
    .insert({
      user_id: session.session.user.id,
      ...language,
    })
    .select()
    .single();
    
  if (error) {
    console.error("Error adding programming language:", error);
    toast({
      title: "Error",
      description: "Could not add the programming language. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
  
  toast({
    title: "Success",
    description: `Added ${language.name} to your programming languages.`,
  });
  
  return data;
};

export const deleteProgrammingLanguage = async (id: string): Promise<boolean> => {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session.session?.user) {
    toast({
      title: "Authentication required",
      description: "Please sign in to delete a programming language.",
      variant: "destructive",
    });
    return false;
  }
  
  const { error } = await supabase
    .from('user_programming_languages')
    .delete()
    .eq('id', id)
    .eq('user_id', session.session.user.id);
    
  if (error) {
    console.error("Error deleting programming language:", error);
    toast({
      title: "Error",
      description: "Could not delete the programming language. Please try again later.",
      variant: "destructive",
    });
    return false;
  }
  
  toast({
    title: "Success",
    description: "Programming language was removed from your profile.",
  });
  
  return true;
};
