
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Briefcase, Clock, DollarSign, MapPin, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const EngineerDashboard = () => {
  const [activeTab, setActiveTab] = useState("active");
  
  // Sample data
  const summaryData = {
    applications: 14,
    interviews: 3,
    offers: 1,
    averageSalary: "$130,000",
    topLocation: "Remote (US)",
    avgResponseTime: "2 days"
  };
  
  const activeJobs = [
    { id: 1, company: "TechCorp", role: "Senior Frontend Engineer", status: "Interview Scheduled", salary: "$135k-150k", applied: "2 days ago" },
    { id: 2, company: "DataSystems", role: "Full Stack Developer", status: "Application Submitted", salary: "$120k-140k", applied: "5 days ago" },
    { id: 3, company: "CloudNine", role: "React Engineer", status: "Technical Test", salary: "$125k-145k", applied: "1 week ago" },
  ];
  
  const suitableJobs = [
    { id: 4, company: "InnovateX", role: "Frontend Lead", match: "95%", salary: "$140k-160k", location: "Remote" },
    { id: 5, company: "FutureTech", role: "UI Engineer", match: "92%", salary: "$130k-150k", location: "Hybrid (NY)" },
    { id: 6, company: "WebWizards", role: "React Developer", match: "89%", salary: "$125k-145k", location: "Remote" },
  ];
  
  const allJobs = [
    ...activeJobs.map(job => ({ ...job, applied: true })),
    ...suitableJobs.map(job => ({ ...job, applied: false })),
    { id: 7, company: "CodeMasters", role: "Software Engineer", applied: false, salary: "$115k-135k", location: "On-site (SF)" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineer Dashboard</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage your entire job search journey in one place with real-time updates and personalized recommendations.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Application Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{summaryData.applications}</p>
                    <p className="text-sm text-gray-600">Applied</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0EA5E9]">{summaryData.interviews}</p>
                    <p className="text-sm text-gray-600">Interviews</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#F97316]">{summaryData.offers}</p>
                    <p className="text-sm text-gray-600">Offers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Salary & Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                    <p className="text-sm">Avg Offer: <span className="font-medium">{summaryData.averageSalary}</span></p>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                    <p className="text-sm">Top Location: <span className="font-medium">{summaryData.topLocation}</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-500 mr-2" />
                    <p className="text-sm">Avg Response: <span className="font-medium">{summaryData.avgResponseTime}</span></p>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                    <p className="text-sm">Next Interview: <span className="font-medium">Tomorrow, 2PM</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs */}
          <Card className="overflow-hidden">
            <Tabs defaultValue="active" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3 rounded-none border-b">
                <TabsTrigger value="active" className="py-3">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Active Jobs
                </TabsTrigger>
                <TabsTrigger value="suitable" className="py-3">
                  <Star className="w-4 h-4 mr-2" />
                  Suitable Jobs
                </TabsTrigger>
                <TabsTrigger value="all" className="py-3">
                  <Check className="w-4 h-4 mr-2" />
                  All Jobs
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.company}</TableCell>
                        <TableCell>{job.role}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${job.status === "Interview Scheduled" ? "bg-green-100 text-green-800" : 
                            job.status === "Technical Test" ? "bg-blue-100 text-blue-800" : 
                            "bg-gray-100 text-gray-800"}`}>
                            {job.status}
                          </span>
                        </TableCell>
                        <TableCell>{job.salary}</TableCell>
                        <TableCell>{job.applied}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="suitable" className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Match</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {suitableJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.company}</TableCell>
                        <TableCell>{job.role}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {job.match}
                          </span>
                        </TableCell>
                        <TableCell>{job.salary}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Apply Now</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="all" className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.company}</TableCell>
                        <TableCell>{job.role}</TableCell>
                        <TableCell>{job.salary}</TableCell>
                        <TableCell>
                          {job.applied ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Applied
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Not Applied
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            {job.applied ? "View Details" : "Apply Now"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EngineerDashboard;
