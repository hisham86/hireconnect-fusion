import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Briefcase, Clock, DollarSign, MapPin, Star, Calendar, ArrowUpDown, ExternalLink, ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const EngineerDashboard = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [salaryDisplayMode, setSalaryDisplayMode] = useState<"annual" | "monthly">("monthly");
  
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
      company: "Setel", 
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Setel_logo.svg/800px-Setel_logo.svg.png",
      glassdoorUrl: "https://www.glassdoor.com/Overview/Working-at-Setel-EI_IE2782236.htm",
      rating: 4.2,
      reviews: 42,
      founded: 2018,
      employees: "201-500",
      description: "Setel is Malaysia's first e-payment solution that seamlessly integrates fuel payments with retail offerings and provides a unified experience at PETRONAS stations.",
      role: "Senior Frontend Engineer", 
      status: "Interview Scheduled", 
      annualSalary: "RM135k-150k", 
      monthlySalary: "RM11.3k-12.5k", 
      applied: "2 days ago" 
    },
    { 
      id: 2, 
      company: "Pandai", 
      logoUrl: "https://play-lh.googleusercontent.com/5MlUibAu2Bn-d8FzRXZGyiy1yOm8HZjbPA0owEwPDu2xVoDmczI_VfB40LI6i-8CTCY",
      glassdoorUrl: "https://www.glassdoor.com/Overview/Working-at-Pandai-EI_IE3991548.htm",
      rating: 4.3,
      reviews: 25,
      founded: 2019,
      employees: "51-200",
      description: "Pandai is an education technology company that provides personalized learning solutions for K-12 students in Malaysia, focusing on AI-driven educational tools.",
      role: "Full Stack Developer", 
      status: "Application Submitted", 
      annualSalary: "RM120k-140k", 
      monthlySalary: "RM10k-11.7k", 
      applied: "5 days ago" 
    },
    { 
      id: 3, 
      company: "Decube", 
      logoUrl: "https://assets.website-files.com/60b9220d74f790b03e6b82d3/60b94a988a78d7216991ab4d_Group%2011.svg",
      glassdoorUrl: "https://www.glassdoor.com/Overview/Working-at-Decube-EI_IE4570807.htm",
      rating: 4.5,
      reviews: 18,
      founded: 2021,
      employees: "11-50",
      description: "Decube is a Malaysian tech startup specializing in blockchain and decentralized finance (DeFi) solutions for the Southeast Asian market.",
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
      company: "Petronas", 
      logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Petronas_2013_logo.svg/1200px-Petronas_2013_logo.svg.png",
      glassdoorUrl: "https://www.glassdoor.com/Overview/Working-at-PETRONAS-EI_IE14479.htm",
      rating: 4.1,
      reviews: 580,
      founded: 1974,
      employees: "10,000+",
      description: "Petroliam Nasional Berhad (PETRONAS) is a Malaysian oil and gas company that was founded on August 17, 1974. Wholly owned by the Government of Malaysia, the corporation is vested with the entire oil and gas resources in Malaysia.",
      role: "Frontend Engineer", 
      match: "95%", 
      annualSalary: "RM140k-160k", 
      monthlySalary: "RM11.7k-13.3k", 
      location: "Hybrid (KL)" 
    },
    { 
      id: 5, 
      company: "Maybank", 
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Maybank.svg/2560px-Maybank.svg.png",
      glassdoorUrl: "https://www.glassdoor.com/Overview/Working-at-Maybank-EI_IE10306.htm",
      rating: 4.0,
      reviews: 740,
      founded: 1960,
      employees: "20,000+",
      description: "Malayan Banking Berhad (Maybank) is Malaysia's largest financial services group and the leading banking group in Southeast Asia, with a network of over 2,000 offices in 18 countries including all 10 ASEAN countries.",
      role: "UI/UX Engineer", 
      match: "92%", 
      annualSalary: "RM130k-150k", 
      monthlySalary: "RM10.8k-12.5k", 
      location: "Hybrid (KL)" 
    },
    { 
      id: 6, 
      company: "Sunway Group", 
      logoUrl: "https://www.sunway.com.my/wp-content/uploads/2020/06/cropped-sunway-favicon-512px.png",
      glassdoorUrl: "https://www.glassdoor.com/Overview/Working-at-Sunway-Group-EI_IE459830.htm",
      rating: 4.2,
      reviews: 320,
      founded: 1974,
      employees: "16,000+",
      description: "Sunway Group is one of Malaysia's largest conglomerates with core interests in property, construction, education, healthcare, retail, hospitality, and digital technologies. Led by its founder and chairman Tan Sri Dr. Jeffrey Cheah.",
      role: "React Developer", 
      match: "89%", 
      annualSalary: "RM125k-145k", 
      monthlySalary: "RM10.4k-12.1k", 
      location: "On-site (Bandar Sunway)" 
    },
  ];
  
  const allJobs = [
    ...activeJobs.map(job => ({ ...job, applied: true })),
    ...suitableJobs.map(job => ({ ...job, applied: false })),
    { 
      id: 7, 
      company: "CodeMasters", 
      logoUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=250&h=250&auto=format&fit=crop",
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
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={job.logoUrl} alt={job.company} />
              <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
            </Avatar>
            {job.company}
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={job.logoUrl} alt={job.company} />
                  <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h4 className="font-semibold text-lg">{job.company}</h4>
              </div>
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

  const renderApplyButton = (isApplied: boolean) => {
    if (isApplied) {
      return (
        <Button 
          variant="secondary" 
          size="sm" 
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-medium transition-all duration-300 hover:shadow-md hover:scale-105"
        >
          View Details <ArrowUpRightIcon className="ml-1 h-4 w-4" />
        </Button>
      );
    }
    
    return (
      <Button 
        variant="default" 
        size="sm" 
        className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white font-medium transition-all duration-300 hover:shadow-md hover:scale-105"
      >
        Apply Now <ArrowUpRightIcon className="ml-1 h-4 w-4" />
      </Button>
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
                          {renderApplyButton(false)}
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
                          {renderApplyButton(job.applied)}
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
