
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useSound } from "@/hooks/useSound";
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

export function useEngineerProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { playSuccess, playError } = useSound();
  
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<EngineerProfile | null>(null);
  const [programmingLanguages, setProgrammingLanguages] = useState<ProgrammingLanguage[]>([]);

  // Load profile data when user is authenticated
  useEffect(() => {
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
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
    } catch (error) {
      console.error("Error loading profile data:", error);
      toast({
        title: "Error loading profile data",
        description: "Failed to load your profile data. Please try again.",
        variant: "destructive",
      });
      playError();
    } finally {
      setIsLoading(false);
    }
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

  return {
    isLoading,
    profile,
    programmingLanguages,
    updateProfile,
    addProgrammingLanguage,
    removeProgrammingLanguage,
    loadProfileData
  };
}
