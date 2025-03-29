
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsService } from '../services/analyticsService';

/**
 * A custom hook that tracks page views when the route changes
 */
export const useAnalytics = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Track page view whenever the location changes
    analyticsService.trackPageView(location.pathname);
  }, [location]);
  
  return {
    isLoading,
    getUniqueVisitors: async () => {
      setIsLoading(true);
      const result = await analyticsService.getUniqueVisitors();
      setIsLoading(false);
      return result;
    },
    getTotalPageViews: async () => {
      setIsLoading(true);
      const result = await analyticsService.getTotalPageViews();
      setIsLoading(false);
      return result;
    },
    getVisitorsByDevice: async () => {
      setIsLoading(true);
      const result = await analyticsService.getVisitorsByDevice();
      setIsLoading(false);
      return result;
    },
    getVisitorsByBrowser: async () => {
      setIsLoading(true);
      const result = await analyticsService.getVisitorsByBrowser();
      setIsLoading(false);
      return result;
    },
    getVisitorsByReferrer: async () => {
      setIsLoading(true);
      const result = await analyticsService.getVisitorsByReferrer();
      setIsLoading(false);
      return result;
    },
    getVisitorsByCountry: async () => {
      setIsLoading(true);
      const result = await analyticsService.getVisitorsByCountry();
      setIsLoading(false);
      return result;
    }
  };
};
