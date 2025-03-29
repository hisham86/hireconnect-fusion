
import { supabase } from "@/integrations/supabase/client";

export type JobApplication = {
  id: string;
  user_id: string;
  company: string;
  logo_url: string | null;
  role: string;
  status: string | null;
  annual_salary: string | null;
  monthly_salary: string | null;
  location: string | null;
  transport_time_car: string | null;
  transport_time_public: string | null;
  commute_minutes: number | null;
  applied_at: string;
  glassdoor_url: string | null;
  rating: number | null;
  reviews: number | null;
  founded: number | null;
  employees: string | null;
  description: string | null;
  manually_added: boolean | null;
  source_platform: string | null;
  is_active: boolean | null;
};

export type SuggestedJob = {
  id: string;
  user_id: string;
  company: string;
  logo_url: string | null;
  role: string;
  match_percentage: string | null;
  annual_salary: string | null;
  monthly_salary: string | null;
  location: string | null;
  transport_time_car: string | null;
  transport_time_public: string | null;
  commute_minutes: number | null;
  glassdoor_url: string | null;
  rating: number | null;
  reviews: number | null;
  founded: number | null;
  employees: string | null;
  description: string | null;
};

export type TalentAcquisitionContact = {
  id: string;
  job_application_id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  invited: boolean | null;
};

export async function fetchUserJobApplications(userId: string): Promise<JobApplication[]> {
  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("applied_at", { ascending: false });

  if (error) {
    console.error("Error fetching job applications:", error);
    return [];
  }

  return data || [];
}

export async function fetchSuggestedJobs(userId: string): Promise<SuggestedJob[]> {
  const { data, error } = await supabase
    .from("suggested_jobs")
    .select("*")
    .eq("user_id", userId)
    .order("match_percentage", { ascending: false });

  if (error) {
    console.error("Error fetching suggested jobs:", error);
    return [];
  }

  return data || [];
}

export async function addJobApplication(jobApplication: Omit<JobApplication, "id" | "applied_at">) {
  const { data, error } = await supabase
    .from("job_applications")
    .insert([jobApplication])
    .select()
    .single();

  if (error) {
    console.error("Error adding job application:", error);
    throw error;
  }

  return data;
}

export async function updateJobApplication(id: string, updates: Partial<JobApplication>) {
  const { data, error } = await supabase
    .from("job_applications")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating job application:", error);
    throw error;
  }

  return data;
}

export async function deleteJobApplication(id: string) {
  const { error } = await supabase
    .from("job_applications")
    .update({ is_active: false })
    .eq("id", id);

  if (error) {
    console.error("Error deleting job application:", error);
    throw error;
  }

  return true;
}

export async function fetchJobApplicationTAContact(jobId: string): Promise<TalentAcquisitionContact | null> {
  const { data, error } = await supabase
    .from("talent_acquisition_contacts")
    .select("*")
    .eq("job_application_id", jobId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching TA contact:", error);
    return null;
  }

  return data;
}

export async function addOrUpdateTAContact(
  contact: Omit<TalentAcquisitionContact, "id"> & { id?: string }
) {
  if (contact.id) {
    const { data, error } = await supabase
      .from("talent_acquisition_contacts")
      .update(contact)
      .eq("id", contact.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating TA contact:", error);
      throw error;
    }

    return data;
  } else {
    const { data, error } = await supabase
      .from("talent_acquisition_contacts")
      .insert([contact])
      .select()
      .single();

    if (error) {
      console.error("Error adding TA contact:", error);
      throw error;
    }

    return data;
  }
}

export async function addSuggestedJob(suggestedJob: Omit<SuggestedJob, "id">) {
  const { data, error } = await supabase
    .from("suggested_jobs")
    .insert([suggestedJob])
    .select()
    .single();

  if (error) {
    console.error("Error adding suggested job:", error);
    throw error;
  }

  return data;
}
