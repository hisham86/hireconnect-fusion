
import { supabase } from '@/integrations/supabase/client';

export const userService = {
  async getUserCount(): Promise<number> {
    try {
      // First try to count from waitlist entries with userType engineer
      const { count: waitlistCount, error: waitlistError } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .eq('user_type', 'engineer');
      
      if (waitlistError) {
        console.error('Error fetching engineer count from waitlist:', waitlistError);
        return 0;
      }
      
      // Return the combined count or 0 if there was an error
      return waitlistCount || 0;
    } catch (err) {
      console.error('Failed to fetch user count:', err);
      return 0;
    }
  }
};
