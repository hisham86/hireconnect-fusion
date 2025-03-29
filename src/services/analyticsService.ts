
import { supabase } from '@/integrations/supabase/client';

interface VisitorData {
  sessionId: string;
  userId?: string;
  visitTime: string;
  referrer: string;
  deviceType: string;
  browser: string;
  operatingSystem: string;
  screenResolution: string;
  language: string;
  path: string;
}

class AnalyticsService {
  private sessionStorageKey = 'catohub_session';
  
  constructor() {
    this.initSession();
  }
  
  private initSession(): string {
    // Check if we already have a session ID
    let sessionId = sessionStorage.getItem(this.sessionStorageKey);
    
    // If not, create a new one
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem(this.sessionStorageKey, sessionId);
    }
    
    return sessionId;
  }
  
  private getUserId(): string | undefined {
    // Check if user has a persistent ID (for unique visitor counting)
    let userId = localStorage.getItem('catohub_user_id');
    
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('catohub_user_id', userId);
    }
    
    return userId;
  }
  
  private getDeviceType(): string {
    const userAgent = navigator.userAgent;
    
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
      return 'tablet';
    }
    
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
      return 'mobile';
    }
    
    return 'desktop';
  }
  
  private getBrowser(): string {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf("Firefox") > -1) {
      return "Firefox";
    } else if (userAgent.indexOf("SamsungBrowser") > -1) {
      return "Samsung Browser";
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
      return "Opera";
    } else if (userAgent.indexOf("Trident") > -1) {
      return "Internet Explorer";
    } else if (userAgent.indexOf("Edge") > -1) {
      return "Edge (Legacy)";
    } else if (userAgent.indexOf("Edg") > -1) {
      return "Edge Chromium";
    } else if (userAgent.indexOf("Chrome") > -1) {
      return "Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
      return "Safari";
    } else {
      return "Unknown";
    }
  }
  
  private getOperatingSystem(): string {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf("Win") > -1) return "Windows";
    if (userAgent.indexOf("Mac") > -1) return "MacOS";
    if (userAgent.indexOf("Linux") > -1) return "Linux";
    if (userAgent.indexOf("Android") > -1) return "Android";
    if (userAgent.indexOf("iOS") > -1 || userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) return "iOS";
    
    return "Unknown";
  }
  
  private getScreenResolution(): string {
    return `${window.screen.width}x${window.screen.height}`;
  }
  
  async trackPageView(path: string): Promise<void> {
    const sessionId = this.initSession();
    const analyticsData = {
      session_id: sessionId,
      user_id: this.getUserId(),
      visit_time: new Date().toISOString(),
      referrer: document.referrer || 'direct',
      device_type: this.getDeviceType(),
      browser: this.getBrowser(),
      operating_system: this.getOperatingSystem(),
      screen_resolution: this.getScreenResolution(),
      language: navigator.language,
      path: path
    };
    
    // Store analytics data in Supabase
    try {
      const { error } = await supabase.from('analytics').insert(analyticsData);
      
      if (error) {
        console.error('Error storing analytics data:', error);
      }
    } catch (err) {
      console.error('Failed to store analytics data:', err);
    }
  }
  
  async getUniqueVisitors(): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('analytics')
        .select('user_id')
        .not('user_id', 'is', null);
      
      if (error) {
        console.error('Error fetching unique visitors:', error);
        return 0;
      }
      
      // Count unique user_ids
      const uniqueUserIds = new Set(data.map(item => item.user_id));
      return uniqueUserIds.size;
    } catch (err) {
      console.error('Failed to fetch unique visitors:', err);
      return 0;
    }
  }
  
  async getTotalPageViews(): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('analytics')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error('Error fetching total page views:', error);
        return 0;
      }
      
      return count || 0;
    } catch (err) {
      console.error('Failed to fetch total page views:', err);
      return 0;
    }
  }
  
  async getVisitorsByDevice(): Promise<Record<string, number>> {
    try {
      const { data, error } = await supabase
        .from('analytics')
        .select('device_type');
      
      if (error) {
        console.error('Error fetching visitors by device:', error);
        return {};
      }
      
      return data.reduce((acc: Record<string, number>, item) => {
        acc[item.device_type] = (acc[item.device_type] || 0) + 1;
        return acc;
      }, {});
    } catch (err) {
      console.error('Failed to fetch visitors by device:', err);
      return {};
    }
  }
  
  async getVisitorsByBrowser(): Promise<Record<string, number>> {
    try {
      const { data, error } = await supabase
        .from('analytics')
        .select('browser');
      
      if (error) {
        console.error('Error fetching visitors by browser:', error);
        return {};
      }
      
      return data.reduce((acc: Record<string, number>, item) => {
        acc[item.browser] = (acc[item.browser] || 0) + 1;
        return acc;
      }, {});
    } catch (err) {
      console.error('Failed to fetch visitors by browser:', err);
      return {};
    }
  }
  
  async getVisitorsByReferrer(): Promise<Record<string, number>> {
    try {
      const { data, error } = await supabase
        .from('analytics')
        .select('referrer');
      
      if (error) {
        console.error('Error fetching visitors by referrer:', error);
        return {};
      }
      
      return data.reduce((acc: Record<string, number>, item) => {
        const referrer = item.referrer || 'direct';
        acc[referrer] = (acc[referrer] || 0) + 1;
        return acc;
      }, {});
    } catch (err) {
      console.error('Failed to fetch visitors by referrer:', err);
      return {};
    }
  }
  
  async getVisitorsByCountry(): Promise<Record<string, number>> {
    try {
      const { data, error } = await supabase
        .from('analytics')
        .select('country')
        .not('country', 'is', null);
      
      if (error) {
        console.error('Error fetching visitors by country:', error);
        return {};
      }
      
      return data.reduce((acc: Record<string, number>, item) => {
        if (item.country) {
          acc[item.country] = (acc[item.country] || 0) + 1;
        }
        return acc;
      }, {});
    } catch (err) {
      console.error('Failed to fetch visitors by country:', err);
      return {};
    }
  }
}

export const analyticsService = new AnalyticsService();
