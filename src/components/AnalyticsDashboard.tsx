
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalytics } from "@/hooks/useAnalytics";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import WaitlistTable from "./WaitlistTable";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const AnalyticsDashboard = () => {
  const analytics = useAnalytics();
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [totalPageViews, setTotalPageViews] = useState(0);
  const [deviceData, setDeviceData] = useState<{ name: string; value: number }[]>([]);
  const [browserData, setBrowserData] = useState<{ name: string; value: number }[]>([]);
  const [referrerData, setReferrerData] = useState<{ name: string; value: number }[]>([]);
  const [countryData, setCountryData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchAnalyticsData();
  }, []);
  
  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const uniqueCount = await analytics.getUniqueVisitors();
      const totalViews = await analytics.getTotalPageViews();
      
      const deviceCounts = await analytics.getVisitorsByDevice();
      const formattedDeviceData = Object.entries(deviceCounts).map(([name, value]) => ({
        name,
        value
      }));
      
      const browserCounts = await analytics.getVisitorsByBrowser();
      const formattedBrowserData = Object.entries(browserCounts).map(([name, value]) => ({
        name,
        value
      }));
      
      const referrerCounts = await analytics.getVisitorsByReferrer();
      const formattedReferrerData = Object.entries(referrerCounts).map(([name, value]) => ({
        name: name === '' ? 'direct' : name,
        value
      }));
      
      const countryCounts = await analytics.getVisitorsByCountry();
      const formattedCountryData = Object.entries(countryCounts).map(([name, value]) => ({
        name,
        value
      }));
      
      setUniqueVisitors(uniqueCount);
      setTotalPageViews(totalViews);
      setDeviceData(formattedDeviceData);
      setBrowserData(formattedBrowserData);
      setReferrerData(formattedReferrerData);
      setCountryData(formattedCountryData);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const renderSkeleton = () => (
    <div className="w-full h-64 flex items-center justify-center">
      <Skeleton className="h-64 w-full" />
    </div>
  );
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Analytics Dashboard</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Monitor user traffic and gather insights about your audience.
          </p>
          <button 
            onClick={fetchAnalyticsData} 
            className="mt-4 px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary transition-colors"
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh Data"}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Unique Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-10 w-20" />
              ) : (
                <p className="text-3xl font-bold">{uniqueVisitors}</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Page Views</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-10 w-20" />
              ) : (
                <p className="text-3xl font-bold">{totalPageViews}</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Session to User Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-10 w-20" />
              ) : (
                <p className="text-3xl font-bold">
                  {uniqueVisitors ? (totalPageViews / uniqueVisitors).toFixed(2) : '0'}
                </p>
              )}
              <p className="text-sm text-gray-500">Average sessions per user</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Current Active Users</CardTitle>
              <CardDescription>Updated every 5 minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1</p>
              <p className="text-sm text-gray-500">That's you! 👋</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Devices</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              {loading ? renderSkeleton() : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Browsers</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              {loading ? renderSkeleton() : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={browserData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Referrers</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              {loading ? renderSkeleton() : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={referrerData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {referrerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Countries</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              {loading ? renderSkeleton() : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={countryData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={120} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-8">
          <WaitlistTable />
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
