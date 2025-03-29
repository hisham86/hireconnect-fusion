
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Briefcase, Clock, DollarSign, MapPin, Star, StarHalf, Calendar, ArrowUpDown, ExternalLink, ArrowUpRightIcon, BadgeCheck, PencilIcon, HomeIcon, Wifi, Laptop, Building, Car, PlusIcon, Mail, Phone, Github, Code, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import AddJobDialog from "./AddJobDialog";
import { useEngineerDashboard } from "@/hooks/useEngineerDashboard";
import { useAuth } from "@/context/AuthContext";

const EngineerDashboard = () => {
  const { user } = useAuth();
  const { 
    profile,
    isLoadingProfile,
    jobApplications,
    activeJobApplications,
    isLoadingJobs,
    suggestedJobs,
    isLoadingSuggestedJobs,
    programmingLanguages,
    isLoadingLanguages,
    updateProfile,
    addNewJobApplication,
    getSummaryData
  } = useEngineerDashboard();
  
  const [activeTab, setActiveTab] = useState("active");
  const [salaryDisplayMode, setSalaryDisplayMode] = useState<"annual" | "monthly">("monthly");
  const [isEditingCurrentSalary, setIsEditingCurrentSalary] = useState(false);
  const [isEditingExpectedSalary, setIsEditingExpectedSalary] = useState(false);
  const [tempCurrentSalary, setTempCurrentSalary] = useState("");
  const [tempExpectedSalary, setTempExpectedSalary] = useState("");
  const [isEditingGithubUrl, setIsEditingGithubUrl] = useState(false);
  const [tempGithubUrl, setTempGithubUrl] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isAddJobDialogOpen, setIsAddJobDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Initialize state from profile when loaded
  useEffect(() => {
    if (profile) {
      setTempCurrentSalary(profile.current_salary || "");
      setTempExpectedSalary(profile.expected_salary || "");
      setTempGithubUrl(profile.github_url || "");
    }
  }, [profile]);
  
  // Summary data
  const summaryData = getSummaryData();
  
  const toggleSalaryDisplay = () => {
    setSalaryDisplayMode(prev => prev === "annual" ? "monthly" : "annual");
  };

  const getSalaryDisplay = (job: any) => {
    return salaryDisplayMode === "annual" ? job.annual_salary : job.monthly_salary;
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getSortedJobs = (jobs: any[]) => {
    if (!sortColumn) return jobs;

    return [...jobs].sort((a, b) => {
      let valueA, valueB;

      if (sortColumn === 'commuteTime') {
        valueA = a.commute_minutes || 0;
        valueB = b.commute_minutes || 0;
      } else if (sortColumn === 'salary') {
        valueA = parseFloat(a.monthly_salary?.replace(/[^0-9.]/g, '') || 0);
        valueB = parseFloat(b.monthly_salary?.replace(/[^0-9.]/g, '') || 0);
      } else {
        valueA = a[sortColumn];
        valueB = b[sortColumn];
      }

      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const renderStarRating = (rating: number) => {
    if (!rating) return <span className="text-sm text-gray-500">No rating</span>;
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        ))}
        {hasHalfStar && (
          <StarHalf key="half" className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const renderCompanyCell = (job: any) => {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <a 
            href={job.glassdoor_url || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium flex items-center hover:text-blue-600 transition-colors"
          >
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={job.logo_url} alt={job.company} />
              <AvatarFallback>{job.company?.substring(0, 2) || "CO"}</AvatarFallback>
            </Avatar>
            {job.company}
            {job.glassdoor_url && <ExternalLink className="ml-1 h-3 w-3" />}
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={job.logo_url} alt={job.company} />
                  <AvatarFallback>{job.company?.substring(0, 2) || "CO"}</AvatarFallback>
                </Avatar>
                <h4 className="font-semibold text-lg">{job.company}</h4>
              </div>
              {job.rating && (
                <div className="flex items-center bg-yellow-100 px-2 py-0.5 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{job.rating}</span>
                  <span className="text-xs ml-1 text-gray-600">({job.reviews || 0} reviews)</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">{job.description || "No description available."}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {job.founded && (
                <div>
                  <span className="text-gray-500">Founded:</span> {job.founded}
                </div>
              )}
              {job.employees && (
                <div>
                  <span className="text-gray-500">Size:</span> {job.employees}
                </div>
              )}
            </div>
            {job.manually_added && job.source_platform && (
              <div className="text-sm text-gray-500">
                <span className="font-medium">Source:</span> {job.source_platform}
              </div>
            )}
            {job.glassdoor_url && (
              <a 
                href={job.glassdoor_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                View full profile on Glassdoor
              </a>
            )}
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
            <div 
              onClick={() => {
                toggleSalaryDisplay();
                handleSort('salary');
              }} 
              className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors"
            >
              <DollarSign className="mr-1 h-4 w-4 text-primary" />
              <span>Salary {salaryDisplayMode === "annual" ? "(Annual)" : "(Monthly)"}</span>
              <ArrowUpDown className={`ml-2 h-4 w-4 ${sortColumn === 'salary' ? 'text-primary' : 'text-gray-500'}`} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to toggle between annual and monthly salary or sort</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const renderCommuteTimeHeader = () => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              onClick={() => handleSort('commuteTime')} 
              className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors"
            >
              <Clock className="mr-1 h-4 w-4 text-primary" />
              <span>Transport Time</span>
              <ArrowUpDown className={`ml-2 h-4 w-4 ${sortColumn === 'commuteTime' ? 'text-primary' : 'text-gray-500'}`} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to sort by commute time</p>
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

  const getStatusColor = (status: string) => {
    if (!status) return "bg-gray-100 text-gray-800";
    if (status.includes("1. Application")) return "bg-gray-100 text-gray-800";
    if (status.includes("2. Interview")) return "bg-green-100 text-green-800";
    if (status.includes("3. Technical")) return "bg-blue-100 text-blue-800";
    if (status.includes("4. Final Offer")) return "bg-purple-100 text-purple-800";
    return "bg-gray-100 text-gray-800";
  };

  const handleSaveCurrentSalary = () => {
    updateProfile({ current_salary: tempCurrentSalary });
    setIsEditingCurrentSalary(false);
  };

  const handleSaveExpectedSalary = () => {
    updateProfile({ expected_salary: tempExpectedSalary });
    setIsEditingExpectedSalary(false);
  };

  const handleSaveGithubUrl = () => {
    updateProfile({ github_url: tempGithubUrl });
    setIsEditingGithubUrl(false);
  };

  const handleLocationChange = (value: string) => {
    updateProfile({ home_location: value });
  };

  const handleJobNatureChange = (value: string) => {
    if (value) {
      updateProfile({ job_nature_preference: value });
    }
  };

  const renderTransportTime = (job: any) => {
    if (job.location?.toLowerCase().includes("remote")) {
      return <span className="text-sm text-gray-500">N/A (Remote)</span>;
    }

    return (
      <div className="flex items-center gap-1">
        <Car className="h-4 w-4 text-blue-500" />
        <span className="text-sm">{job.transport_time_car || "N/A"}</span>
      </div>
    );
  };
  
  const handleAddJob = async (newJob: any) => {
    const formattedJob = {
      company: newJob.company,
      role: newJob.role,
      logo_url: newJob.logoUrl || null,
      status: newJob.status || "1. Application Submitted",
      annual_salary: newJob.annualSalary || null,
      monthly_salary: newJob.monthlySalary || null,
      location: newJob.location || null,
      transport_time_car: newJob.transportTime?.car || null,
      transport_time_public: newJob.transportTime?.public || null,
      commute_minutes: newJob.commuteMinutes || 0,
      applied_at: new Date().toISOString(),
      glassdoor_url: newJob.glassdoorUrl || null,
      rating: newJob.rating || null,
      reviews: newJob.reviews || null,
      founded: newJob.founded || null,
      employees: newJob.employees || null,
      description: newJob.description || null,
      source_platform: newJob.sourcePlatform || null,
      is_active: true
    };
    
    // Add job to database
    const savedJob = await addNewJobApplication(formattedJob);
    
    if (savedJob) {
      // If the job has talent acquisition contact info, save that too
      if (newJob.talentAcquisition && (newJob.talentAcquisition.name || newJob.talentAcquisition.email || newJob.talentAcquisition.phone)) {
        // This would be handled by the hook in a real implementation
      }
      
      toast({
        title: "New application added",
        description: `You've added ${newJob.company} - ${newJob.role} to your applications`,
      });
    }
  };
  
  const renderTalentAcquisitionInfo = (job: any) => {
    if (!job.talentAcquisition || (!job.talentAcquisition.name && !job.talentAcquisition.email && !job.talentAcquisition.phone)) {
      return (
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
        >
          Add Contact
        </Button>
      );
    }
    
    return (
      <div className="space-y-1">
        {job.talentAcquisition.name && (
          <p className="text-sm font-medium">{job.talentAcquisition.name}</p>
        )}
        <div className="flex flex-col gap-1">
          {job.talentAcquisition.email && (
            <a 
              href={`mailto:${job.talentAcquisition.email}`}
              className="text-xs flex items-center text-blue-600 hover:underline"
            >
              <Mail className="h-3 w-3 mr-1" />
              {job.talentAcquisition.email}
            </a>
          )}
          {job.talentAcquisition.phone && (
            <a 
              href={`tel:${job.talentAcquisition.phone}`}
              className="text-xs flex items-center text-blue-600 hover:underline"
            >
              <Phone className="h-3 w-3 mr-1" />
              {job.talentAcquisition.phone}
            </a>
          )}
        </div>
        {job.talentAcquisition.email && (
          <Button
            variant="outline"
            size="sm"
            className="text-xs mt-1"
            disabled={job.talentAcquisition.invited}
          >
            {job.talentAcquisition.invited ? "Invited" : "Send Invite"}
          </Button>
        )}
      </div>
    );
  };

  // Loading state
  if (isLoadingProfile || isLoadingJobs || isLoadingSuggestedJobs || isLoadingLanguages) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium">Loading dashboard data...</p>
      </div>
    );
  }

  // Not authenticated state
  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Sign in to access your dashboard</h2>
        <p className="mb-6 text-gray-600">You need to sign in to view and manage your job applications.</p>
        <Button 
          onClick={() => window.location.href = '/auth'} 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          Sign In
        </Button>
      </div>
    );
  }

  // Main dashboard
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
            <div className="space-y-6">
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
                      <p className="text-sm">Next Interview: <span className="font-medium">Not scheduled</span></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Salary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                      <p className="text-sm">Avg Offer: <span className="font-medium">{summaryData.averageSalary}</span></p>
                    </div>
                    {profile?.expected_salary && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              Above Average
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Your expected salary is above the market average!</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                        <p className="text-sm">Current Salary:</p>
                      </div>
                      {!isEditingCurrentSalary ? (
                        <div className="flex items-center">
                          <span className="font-medium mr-1">{profile?.current_salary || "Not set"}</span>
                          {profile?.is_verified && <BadgeCheck className="h-4 w-4 text-blue-500" />}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 ml-1"
                            onClick={() => setIsEditingCurrentSalary(true)}
                          >
                            <PencilIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Input
                            className="h-7 w-32 text-sm"
                            value={tempCurrentSalary}
                            onChange={(e) => setTempCurrentSalary(e.target.value)}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 py-1 text-xs"
                            onClick={handleSaveCurrentSalary}
                          >
                            Save
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                        <p className="text-sm">Expected Salary:</p>
                      </div>
                      {!isEditingExpectedSalary ? (
                        <div className="flex items-center">
                          <span className="font-medium mr-1">{profile?.expected_salary || "Not set"}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 ml-1"
                            onClick={() => setIsEditingExpectedSalary(true)}
                          >
                            <PencilIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Input
                            className="h-7 w-32 text-sm"
                            value={tempExpectedSalary}
                            onChange={(e) => setTempExpectedSalary(e.target.value)}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 py-1 text-xs"
                            onClick={handleSaveExpectedSalary}
                          >
                            Save
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Github className="w-5 h-5 text-gray-800 mr-2" />
                        <p className="text-sm">GitHub Profile:</p>
                      </div>
                      {!isEditingGithubUrl ? (
                        <div className="flex items-center">
                          {profile?.github_url ? (
                            <a 
                              href={profile.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-blue-600 hover:underline flex items-center mr-1"
                            >
                              {profile.github_url.replace('https://github.com/', '@')}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          ) : (
                            <span className="text-sm text-gray-500">Not set</span>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 ml-1"
                            onClick={() => setIsEditingGithubUrl(true)}
                          >
                            <PencilIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Input
                            className="h-7 w-48 text-sm"
                            value={tempGithubUrl}
                            onChange={(e) => setTempGithubUrl(e.target.value)}
                            placeholder="https://github.com/username"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 py-1 text-xs"
                            onClick={handleSaveGithubUrl}
                          >
                            Save
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <div className="flex items-center mr-1">
                        <Code className="w-4 h-4 text-gray-800 mr-1" />
                        <span className="text-xs text-gray-600">Languages:</span>
                      </div>
                      {programmingLanguages.length > 0 ? (
                        programmingLanguages.map((lang, index) => (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div 
                                  className="w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-bold"
                                  style={{ backgroundColor: lang.color }}
                                >
                                  {lang.icon}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{lang.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">No languages added</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <HomeIcon className="w-5 h-5 text-gray-500 mr-2" />
                      <p className="text-sm">Home Location:</p>
                    </div>
                    <Select 
                      value={profile?.home_location || ""} 
                      onValueChange={handleLocationChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Kuala Lumpur", "Petaling Jaya", "Shah Alam", "Subang Jaya", "Klang",
                          "Bangi", "Kajang", "Cyberjaya", "Putrajaya", "Puchong",
                          "Seremban", "Nilai", "Sepang", "Rawang", "Gombak"
                        ].map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <p className="text-sm mb-2">Preferred Job Nature:</p>
                    <ToggleGroup 
                      type="single" 
                      className="border rounded-md p-1"
                      value={profile?.job_nature_preference || "remote"}
                      orientation="vertical"
                      onValueChange={handleJobNatureChange}
                    >
                      <ToggleGroupItem value="remote" className="flex justify-start text-sm py-2" aria-label="Remote">
                        <Wifi className="w-4 h-4 mr-2" />
                        Remote
                      </ToggleGroupItem>
                      <ToggleGroupItem value="hybrid" className="flex justify-start text-sm py-2" aria-label="Hybrid">
                        <Laptop className="w-4 h-4 mr-2" />
                        Hybrid
                      </ToggleGroupItem>
                      <ToggleGroupItem value="onsite" className="flex justify-start text-sm py-2" aria-label="On-Premise">
                        <Building className="w-4 h-4 mr-2" />
                        On-site
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="overflow-hidden">
            <Tabs defaultValue="active" className="w-full" onValueChange={setActiveTab}>
              <div className="flex justify-between items-center px-4 py-2 border-b">
                <TabsList className="grid grid-cols-3 rounded-none">
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
                <Button 
                  onClick={() => setIsAddJobDialogOpen(true)}
                  className="flex items-center gap-1"
                >
                  <PlusIcon className="h-4 w-4" />
                  Manually Track Job
                </Button>
              </div>
                
              <TabsContent value="active">
                {activeJobApplications.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No active job applications yet.</p>
                    <Button 
                      onClick={() => setIsAddJobDialogOpen(true)}
                      className="mt-4"
                    >
                      Add Your First Job Application
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>{renderSalaryHeader()}</TableHead>
                        <TableHead>{renderCommuteTimeHeader()}</TableHead>
                        <TableHead>Applied</TableHead>
                        <TableHead>TA Contact</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getSortedJobs(activeJobApplications).map((job) => (
                        <TableRow key={job.id}>
                          <TableCell>{renderCompanyCell(job)}</TableCell>
                          <TableCell>{renderStarRating(job.rating)}</TableCell>
                          <TableCell>{job.role}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                              {job.status || "Not specified"}
                            </span>
                          </TableCell>
                          <TableCell>{getSalaryDisplay(job) || "Not specified"}</TableCell>
                          <TableCell>{renderTransportTime(job)}</TableCell>
                          <TableCell>{new Date(job.applied_at).toLocaleDateString()}</TableCell>
                          <TableCell>{renderTalentAcquisitionInfo(job)}</TableCell>
                          <TableCell>
                            <Button 
                              variant="secondary" 
                              size="sm" 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-medium transition-all duration-300 hover:shadow-md hover:scale-105"
                            >
                              View Details <ArrowUpRightIcon className="ml-1 h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
                
              <TabsContent value="suitable">
                {suggestedJobs.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No suitable job suggestions yet.</p>
                    <p className="text-sm text-gray-400 mt-2">Complete your profile to get personalized job suggestions.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Match</TableHead>
                        <TableHead>{renderSalaryHeader()}</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>{renderCommuteTimeHeader()}</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getSortedJobs(suggestedJobs).map((job) => (
                        <TableRow key={job.id}>
                          <TableCell>{renderCompanyCell(job)}</TableCell>
                          <TableCell>{renderStarRating(job.rating)}</TableCell>
                          <TableCell>{job.role}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {job.match_percentage || "80%"}
                            </span>
                          </TableCell>
                          <TableCell>{getSalaryDisplay(job) || "Not specified"}</TableCell>
                          <TableCell>{job.location || "Not specified"}</TableCell>
                          <TableCell>{renderTransportTime(job)}</TableCell>
                          <TableCell>
                            {renderApplyButton(false)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
                
              <TabsContent value="all">
                {jobApplications.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No job applications yet.</p>
                    <Button 
                      onClick={() => setIsAddJobDialogOpen(true)}
                      className="mt-4"
                    >
                      Add Your First Job Application
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>{renderSalaryHeader()}</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>{renderCommuteTimeHeader()}</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>TA Contact</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getSortedJobs(jobApplications).map((job) => (
                        <TableRow key={job.id}>
                          <TableCell>{renderCompanyCell(job)}</TableCell>
                          <TableCell>{renderStarRating(job.rating)}</TableCell>
                          <TableCell>{job.role}</TableCell>
                          <TableCell>{getSalaryDisplay(job) || "Not specified"}</TableCell>
                          <TableCell>{job.location || "Not specified"}</TableCell>
                          <TableCell>{renderTransportTime(job)}</TableCell>
                          <TableCell>
                            {job.status ? (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                                {job.status}
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Not specified
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{renderTalentAcquisitionInfo(job)}</TableCell>
                          <TableCell>
                            {renderApplyButton(true)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
      
      <AddJobDialog 
        open={isAddJobDialogOpen} 
        onOpenChange={setIsAddJobDialogOpen}
        onAddJob={handleAddJob}
      />
    </section>
  );
};

export default EngineerDashboard;
