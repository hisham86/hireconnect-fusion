import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Briefcase, Clock, DollarSign, MapPin, Star, Calendar, ArrowUpDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const EngineerDashboard = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [salaryDisplayMode, setSalaryDisplayMode] = useState<"annual" | "monthly">("annual");
  
  const summaryData = {
    applications: 14,
    interviews: 3,
    offers: 1,
    averageSalary: "RM130,000",
    topLocation: "Remote (MY)",
    avgResponseTime: "2 days"
  };
  
  const activeJobs = [
    { 
      id: 1, 
      company: "TechCorp", 
      glassdoorUrl: "https://www.glassdoor.com/Overview/Working-at-TechCorp-EI_IE12345.htm",
      rating: 4.2,
      reviews: 234,
      founded: 2008,
      employees: "500-1000",
      description: "TechCorp is a leading software development company focused on creating innovative solutions for enterprise clients.",
      role: "Senior Frontend Engineer", 
      status: "Interview Scheduled", 
      annualSalary: "RM135k-150k", 
      monthlySalary: "RM11.3k-12.5k", 
      applied: "2 days ago" 
    },
    { 
      id: 2, 
      company: "DataSystems", 
      glassdoorUrl: "https://www.glassdoor.com/Overview/Working-at-DataSystems-EI_IE67890.htm",
      rating: 3.9,
      reviews: 186,
      founded: 2011,
      employees: "1000-5000",
      description: "DataSystems specializes in big data solutions, analytics platforms, and enterprise data management.",
      role: "Full Stack Developer", 
      status: "Application Submitted", 
      annualSalary: "RM120k-140k", 
      monthlySalary: "RM10k-11.7k", 
      applied: "5 days ago" 
    },
    { 
      id: 3, 
      company: "CloudNine", 
      glassdoorUrl: "https://www.glassdoor.com/Overview/Working-at-CloudNine-EI_IE54321.htm",
      rating: 4.5,
      reviews: 312,
      founded: 2015,
      employees: "100-500",
      description: "CloudNine is a cloud infrastructure provider focusing on scalable solutions for startups and SMEs.",
      role: "React Engineer", 
      status: "Technical Test", 
      annualSalary: "RM125k-145k", 
      monthlySalary: "RM10.4k-12.1k", 
      applied: "1 week ago" 
    },
  ];
  
  const suitableJobs = [
    { 
      id: 4, 
      company: "InnovateX", 
      glassdoorUrl: "https://www.glassdoor.com/Overview/Working-at-InnovateX-EI_IE98765.htm",
      rating: 4.4,
      reviews: 167,
      founded: 2017,
      employees: "50-200",
      description: "InnovateX builds cutting-edge web applications with a focus on user experience and modern technologies.",
      role: "Frontend Lead", 
      match: "95%", 
      annualSalary: "RM140k-160k", 
      monthlySalary: "RM11.7k-13.3k", 
      location: "Remote" 
    },
    { 
      id: 5, 
      company: "FutureTech", 
      glassdoorUrl: "https://www.glassdoor.com/Overview/Working-at-FutureTech-EI_IE24680.htm",
      rating: 4.0,
      reviews: 205,
      founded: 2012,
      employees: "200-500",
      description: "FutureTech develops technology solutions for the financial sector with a focus on security and performance.",
      role: "UI Engineer", 
      match: "92%", 
      annualSalary: "RM130k-150k", 
      monthlySalary: "RM10.8k-12.5k", 
      location: "Hybrid (KL)" 
    },
    { 
      id: 6, 
      company: "WebWizards", 
      glassdoorUrl: "https://www.glassdoor.com/Overview/Working-at-WebWizards-EI_IE13579.htm",
      rating: 4.3,
      reviews: 147,
      founded: 2014,
      employees: "100-500",
      description: "WebWizards creates custom web and mobile applications for clients across various industries.",
      role: "React Developer", 
      match: "89%", 
      annualSalary: "RM125k-145k", 
      monthlySalary: "RM10.4k-12.1k", 
      location: "Remote" 
    },
  ];
  
  const allJobs = [
    ...activeJobs.map(job => ({ ...job, applied: true })),
    ...suitableJobs.map(job => ({ ...job, applied: false })),
    { 
      id: 7, 
      company: "CodeMasters", 
      glassdoorUrl: "https://www.glassdoor.com/Overview/Working-at-CodeMasters-EI_IE97531.htm",
      rating: 3.8,
      reviews: 123,
      founded: 2013,
      employees: "100-500",
      description: "CodeMasters offers software development services specializing in custom enterprise solutions.",
      role: "Senior Backend Developer",
      applied: false, 
      annualSalary: "RM115k-135k", 
      monthlySalary: "RM9.6k-11.3k", 
      location: "On-site (KL)" 
    },
  ];

  const toggleSalaryDisplay = () => {
    setSalaryDisplayMode(prev => prev === "annual" ? "monthly" : "annual");
  };

  const getSalaryDisplay = (job: any) => {
    return salaryDisplayMode === "annual" ? job.annualSalary : job.monthlySalary;
  };

  const renderCompanyCell = (job: any) => {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <a 
            href={job.glassdoorUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium flex items-center hover:text-blue-600 transition-colors"
          >
            {job.company}
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-lg">{job.company}</h4>
              <div className="flex items-center bg-yellow-100 px-2 py-0.5 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-medium">{job.rating}</span>
                <span className="text-xs ml-1 text-gray-600">({job.reviews} reviews)</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">{job.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Founded:</span> {job.founded}
              </div>
              <div>
                <span className="text-gray-500">Size:</span> {job.employees}
              </div>
            </div>
            <a 
              href={job.glassdoorUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              View full profile on Glassdoor
            </a>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  const renderSalaryHeader = () => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div onClick={toggleSalaryDisplay} className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors">
              <DollarSign className="mr-1 h-4 w-4 text-primary" />
              <span>Salary {salaryDisplayMode === "annual" ? "(Annual)" : "(Monthly)"}</span>
              <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to toggle between annual and monthly salary</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

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
                      <TableHead>{renderSalaryHeader()}</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>{renderCompanyCell(job)}</TableCell>
                        <TableCell>{job.role}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${job.status === "Interview Scheduled" ? "bg-green-100 text-green-800" : 
                            job.status === "Technical Test" ? "bg-blue-100 text-blue-800" : 
                            "bg-gray-100 text-gray-800"}`}>
                            {job.status}
                          </span>
                        </TableCell>
                        <TableCell>{getSalaryDisplay(job)}</TableCell>
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
                      <TableHead>{renderSalaryHeader()}</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {suitableJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>{renderCompanyCell(job)}</TableCell>
                        <TableCell>{job.role}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {job.match}
                          </span>
                        </TableCell>
                        <TableCell>{getSalaryDisplay(job)}</TableCell>
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
                      <TableHead>{renderSalaryHeader()}</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>{renderCompanyCell(job)}</TableCell>
                        <TableCell>{job.role}</TableCell>
                        <TableCell>{getSalaryDisplay(job)}</TableCell>
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
