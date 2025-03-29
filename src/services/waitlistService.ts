
import { supabase } from '@/integrations/supabase/client';

interface WaitlistEntry {
  id?: string;
  name: string;
  email: string;
  userType: "engineer" | "recruiter" | null;
  role?: string;
  experience?: string;
  created_at?: string;
}

export const waitlistService = {
  async addEntry(entry: Omit<WaitlistEntry, 'id' | 'created_at'>): Promise<WaitlistEntry | null> {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .insert([{
          name: entry.name,
          email: entry.email,
          user_type: entry.userType,
          role: entry.role,
          experience: entry.experience
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Error adding waitlist entry:', error);
        return null;
      }
      
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        userType: data.user_type as "engineer" | "recruiter" | null,
        role: data.role,
        experience: data.experience,
        created_at: data.created_at
      };
    } catch (err) {
      console.error('Failed to add waitlist entry:', err);
      return null;
    }
  },
  
  async getAllEntries(): Promise<WaitlistEntry[]> {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching waitlist entries:', error);
        return [];
      }
      
      return data.map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        userType: item.user_type as "engineer" | "recruiter" | null,
        role: item.role,
        experience: item.experience,
        created_at: item.created_at
      }));
    } catch (err) {
      console.error('Failed to fetch waitlist entries:', err);
      return [];
    }
  }
};
