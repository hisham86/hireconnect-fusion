
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export type EngineerProfile = {
  id: string;
  current_salary: string | null;
  expected_salary: string | null;
  github_url: string | null;
  home_location: string | null;
  job_nature_preference: string | null;
  is_verified: boolean | null;
};

export type ProgrammingLanguage = {
  id: string;
  user_id: string;
  name: string;
  color: string;
  icon: string;
};

export async function fetchUserProfile(userId: string): Promise<EngineerProfile | null> {
  const { data, error } = await supabase
    .from("engineer_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data;
}

export async function createUserProfile(
  userId: string,
  profile: Partial<EngineerProfile>
) {
  const { data, error } = await supabase
    .from("engineer_profiles")
    .insert([{ id: userId, ...profile }])
    .select()
    .single();

  if (error) {
    console.error("Error creating profile:", error);
    throw error;
  }

  return data;
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<EngineerProfile>
) {
  const { data, error } = await supabase
    .from("engineer_profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating profile:", error);
    throw error;
  }

  return data;
}

export async function fetchUserProgrammingLanguages(userId: string): Promise<ProgrammingLanguage[]> {
  const { data, error } = await supabase
    .from("user_programming_languages")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching programming languages:", error);
    return [];
  }

  return data || [];
}

export async function addUserProgrammingLanguage(language: Omit<ProgrammingLanguage, "id">) {
  const { data, error } = await supabase
    .from("user_programming_languages")
    .insert([language])
    .select()
    .single();

  if (error) {
    console.error("Error adding programming language:", error);
    throw error;
  }

  return data;
}

export async function deleteUserProgrammingLanguage(id: string) {
  const { error } = await supabase
    .from("user_programming_languages")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting programming language:", error);
    throw error;
  }

  return true;
}
