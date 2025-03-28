
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
  private storageKey = 'catohub_analytics';
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
  
  trackPageView(path: string): void {
    const sessionId = this.initSession();
    const visitorData: VisitorData = {
      sessionId,
      userId: this.getUserId(),
      visitTime: new Date().toISOString(),
      referrer: document.referrer || 'direct',
      deviceType: this.getDeviceType(),
      browser: this.getBrowser(),
      operatingSystem: this.getOperatingSystem(),
      screenResolution: this.getScreenResolution(),
      language: navigator.language,
      path: path
    };
    
    // Log visitor data to console (in production, you'd send this to your analytics backend)
    console.log('Analytics:', visitorData);
    
    // Store analytics data in localStorage for demo purposes
    this.storeAnalyticsData(visitorData);
  }
  
  private storeAnalyticsData(data: VisitorData): void {
    const existingData = this.getStoredAnalyticsData();
    existingData.push(data);
    localStorage.setItem(this.storageKey, JSON.stringify(existingData));
  }
  
  getStoredAnalyticsData(): VisitorData[] {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }
  
  getUniqueVisitors(): number {
    const data = this.getStoredAnalyticsData();
    const uniqueUserIds = new Set(data.map(item => item.userId));
    return uniqueUserIds.size;
  }
  
  getTotalPageViews(): number {
    return this.getStoredAnalyticsData().length;
  }
  
  getVisitorsByDevice(): Record<string, number> {
    const data = this.getStoredAnalyticsData();
    return data.reduce((acc: Record<string, number>, item) => {
      acc[item.deviceType] = (acc[item.deviceType] || 0) + 1;
      return acc;
    }, {});
  }
  
  getVisitorsByBrowser(): Record<string, number> {
    const data = this.getStoredAnalyticsData();
    return data.reduce((acc: Record<string, number>, item) => {
      acc[item.browser] = (acc[item.browser] || 0) + 1;
      return acc;
    }, {});
  }
  
  getVisitorsByReferrer(): Record<string, number> {
    const data = this.getStoredAnalyticsData();
    return data.reduce((acc: Record<string, number>, item) => {
      const referrer = item.referrer || 'direct';
      acc[referrer] = (acc[referrer] || 0) + 1;
      return acc;
    }, {});
  }
}

export const analyticsService = new AnalyticsService();
