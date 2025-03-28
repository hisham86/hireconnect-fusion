
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsService } from '../services/analyticsService';

/**
 * A custom hook that tracks page views when the route changes
 */
export const useAnalytics = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view whenever the location changes
    analyticsService.trackPageView(location.pathname);
  }, [location]);
  
  return {
    getUniqueVisitors: analyticsService.getUniqueVisitors.bind(analyticsService),
    getTotalPageViews: analyticsService.getTotalPageViews.bind(analyticsService),
    getVisitorsByDevice: analyticsService.getVisitorsByDevice.bind(analyticsService),
    getVisitorsByBrowser: analyticsService.getVisitorsByBrowser.bind(analyticsService),
    getVisitorsByReferrer: analyticsService.getVisitorsByReferrer.bind(analyticsService)
  };
};
