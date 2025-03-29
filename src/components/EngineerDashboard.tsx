import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Briefcase, Clock, DollarSign, MapPin, Star, StarHalf, Calendar, ArrowUpDown, ExternalLink, ArrowUpRightIcon, BadgeCheck, PencilIcon, HomeIcon, Wifi, Laptop, Building, Car, PlusIcon, Mail, Phone, Github, Code, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import AddJobDialog from "./AddJobDialog";

const EngineerDashboard = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [salaryDisplayMode, setSalaryDisplayMode] = useState<"annual" | "monthly">("monthly");
  const [currentSalary, setCurrentSalary] = useState("RM120,000");
  const [expectedSalary, setExpectedSalary] = useState("RM150,000");
  const [isVerified, setIsVerified] = useState(true);
  const [isEditingCurrentSalary, setIsEditingCurrentSalary] = useState(false);
  const [isEditingExpectedSalary, setIsEditingExpectedSalary] = useState(false);
  const [tempCurrentSalary, setTempCurrentSalary] = useState(currentSalary);
  const [tempExpectedSalary, setTempExpectedSalary] = useState(expectedSalary);
  const [homeLocation, setHomeLocation] = useState("Detecting location...");
  const [jobNaturePreference, setJobNaturePreference] = useState("remote");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isAddJobDialogOpen, setIsAddJobDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const [allJobsData, setAllJobsData] = useState<any[]>([]);
  const [activeJobsData, setActiveJobsData] = useState<any[]>([]);
  const [suitableJobsData, setSuitableJobsData] = useState<any[]>([]);
  
  const [githubUrl, setGithubUrl] = useState("https://github.com/developer123");
  const [isEditingGithubUrl, setIsEditingGithubUrl] = useState(false);
  const [tempGithubUrl, setTempGithubUrl] = useState(githubUrl);
  
  const programmingLanguages = [
    { name: "JavaScript", color: "#F7DF1E", icon: "js" },
    { name: "TypeScript", color: "#3178C6", icon: "ts" },
    { name: "React", color: "#61DAFB", icon: "react" },
    { name: "Node.js", color: "#339933", icon: "node" },
    { name: "Python", color: "#3776AB", icon: "py" }
  ];
  
  const malaysianLocations = [
    "Kuala Lumpur", "Petaling Jaya", "Shah Alam", "Subang Jaya", "Klang",
    "Bangi", "Kajang", "Cyberjaya", "Putrajaya", "Puchong",
    "Seremban", "Nilai", "Sepang", "Rawang", "Gombak"
  ];
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const randomIndex = Math.floor(Math.random() * malaysianLocations.length);
          setHomeLocation(malaysianLocations[randomIndex]);
        },
        (error) => {
          console.error("Error getting location:", error);
          setHomeLocation("Location detection failed");
        }
      );
    } else {
      setHomeLocation("Geolocation not supported");
    }
  }, []);
  
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
      status: "2. Interview Scheduled", 
      annualSalary: "RM135k-150k", 
      monthlySalary: "RM11.3k-12.5k",
      location: "Hybrid (KL)",
      transportTime: {
        car: "35-45 min",
        public: "55-65 min"
      },
      commuteMinutes: 40,
      applied: "2 days ago",
      talentAcquisition: {
        name: "Sarah Wong",
        email: "sarah.wong@setel.com",
        phone: "+60123456789",
        invited: true
      }
    },
    { 
      id: 2, 
      company: "Pandai", 
      logoUrl: "https://play-lh.googleusercontent.com/5MlUibAu2Bn-d8FzRXZGyiyiy1yOm8HZjbPA0owEwPDu2xVoDmczI_VfB40LI6i-8CTCY",
      glassdoorUrl: "https://www.glassdoor.com/Overview/Working-at-Pandai-EI_IE3991548.htm",
      rating: 4.3,
      reviews: 25,
      founded: 2019,
      employees: "51-200",
      description: "Pandai is an education technology company that provides personalized learning solutions for K-12 students in Malaysia, focusing on AI-driven educational tools.",
      role: "Full Stack Developer", 
      status: "1. Application Submitted", 
      annualSalary: "RM120k-140k", 
      monthlySalary: "RM10k-11.7k",
      location: "Remote (MY)",
      transportTime: {
        car: "N/A",
        public: "N/A"
      },
      commuteMinutes: 0,
      applied: "5 days ago",
      talentAcquisition: null 
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
      status: "3. Technical Test", 
      annualSalary: "RM125k-145k", 
      monthlySalary: "RM10.4k-12.1k",
      location: "On-site (Cyberjaya)",
      transportTime: {
        car: "25-35 min",
        public: "45-55 min"
      },
      commuteMinutes: 30,
      applied: "1 week ago",
      talentAcquisition: {
        name: "Ahmad Rizal",
        email: "ahmad@decube.io",
        phone: "+60198765432",
        invited: true
      }
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
      location: "Hybrid (KL)",
      transportTime: {
        car: "30-40 min",
        public: "50-60 min"
      },
      commuteMinutes: 35,
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
      location: "Hybrid (KL)",
      transportTime: {
        car: "40-50 min",
        public: "60-70 min"
      },
      commuteMinutes: 45,
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
      location: "On-site (Bandar Sunway)",
      transportTime: {
        car: "20-30 min",
        public: "40-50 min"
      },
      commuteMinutes: 25,
    },
  ];
  
  useEffect(() => {
    setAllJobsData([
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
        location: "On-site (KL)",
        transportTime: {
          car: "45-55 min",
          public: "65-75 min"
        },
        commuteMinutes: 50,
      },
    ]);
    
    setActiveJobsData([...activeJobs]);
    setSuitableJobsData([...suitableJobs]);
  }, []);

  const toggleSalaryDisplay = () => {
    setSalaryDisplayMode(prev => prev === "annual" ? "monthly" : "annual");
  };

  const getSalaryDisplay = (job: any) => {
    return salaryDisplayMode === "annual" ? job.annualSalary : job.monthlySalary;
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
        valueA = a.commuteMinutes || 0;
        valueB = b.commuteMinutes || 0;
      } else if (sortColumn === 'salary') {
        valueA = parseFloat(a.monthlySalary?.replace(/[^0-9.]/g, '') || 0);
        valueB = parseFloat(b.monthlySalary?.replace(/[^0-9.]/g, '') || 0);
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
            {job.manuallyAdded && job.sourcePlatform && (
              <div className="text-sm text-gray-500">
                <span className="font-medium">Source:</span> {job.sourcePlatform}
              </div>
            )}
            {!job.manuallyAdded && (
              <a 
                href={job.glassdoorUrl} 
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
    if (status.includes("1. Application")) return "bg-gray-100 text-gray-800";
    if (status.includes("2. Interview")) return "bg-green-100 text-green-800";
    if (status.includes("3. Technical")) return "bg-blue-100 text-blue-800";
    if (status.includes("4. Final Offer")) return "bg-purple-100 text-purple-800";
    return "bg-gray-100 text-gray-800";
  };

  const handleSaveCurrentSalary = () => {
    setCurrentSalary(tempCurrentSalary);
    setIsEditingCurrentSalary(false);
  };

  const handleSaveExpectedSalary = () => {
    setExpectedSalary(tempExpectedSalary);
    setIsEditingExpectedSalary(false);
  };

  const getJobNatureIcon = (type: string) => {
    switch (type) {
      case "remote":
        return <Wifi className="h-4 w-4" />;
      case "hybrid":
        return <Laptop className="h-4 w-4" />;
      case "onsite":
        return <Building className="h-4 w-4" />;
      default:
        return <Wifi className="h-4 w-4" />;
    }
  };

  const handleLocationChange = (value: string) => {
    setHomeLocation(value);
  };

  const renderTransportTime = (job: any) => {
    if (job.location.includes("Remote")) {
      return <span className="text-sm text-gray-500">N/A (Remote)</span>;
    }

    return (
      <div className="flex items-center gap-1">
        <Car className="h-4 w-4 text-blue-500" />
        <span className="text-sm">{job.transportTime.car}</span>
      </div>
    );
  };
  
  const handleAddJob = (newJob: any) => {
    setAllJobsData(prev => [newJob, ...prev]);
    setActiveJobsData(prev => [newJob, ...prev]);
    summaryData.applications += 1;
    toast({
      title: "New application added",
      description: `You've added ${newJob.company} - ${newJob.role} to your applications`,
    });
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

  const handleSaveGithubUrl = () => {
    setGithubUrl(tempGithubUrl);
    setIsEditingGithubUrl(false);
    
    toast({
      title: "GitHub profile updated",
      description: "Your purr-sonal code repository link has been saved!",
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Herd Your Job Search Like a Pro!</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage your job hunt with a dashboard that's the cat's meow—real-time updates and purr-sonalized recommendations included!
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
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="cursor-help">
                            <p className="text-2xl font-bold text-gray-800">{summaryData.applications}</p>
                            <p className="text-sm text-gray-600">Applied <span className="text-xs">(You're on a roll!)</span></p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total job applications you've submitted</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="cursor-help">
                            <p className="text-2xl font-bold text-[#0EA5E9]">{summaryData.interviews}</p>
                            <p className="text-sm text-gray-600">Interviews <span className="text-xs">(Time to shine!)</span></p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Upcoming and completed interviews</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="cursor-help">
                            <p className="text-2xl font-bold text-[#F97316]">{summaryData.offers}</p>
                            <p className="text-sm text-gray-600">Offers <span className="text-xs">(Paws up for success!)</span></p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Job offers received - congrats!</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center cursor-help">
                            <Clock className="w-5 h-5 text-gray-500 mr-2" />
                            <p className="text-sm">Avg Response: <span className="font-medium">{summaryData.avgResponseTime}</span> <span className="text-xs">(Faster than a cheetah!)</span></p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Average time companies take to respond to your applications</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center cursor-help">
                            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                            <p className="text-sm">Next Interview: <span className="font-medium">Tomorrow, 2PM</span> <span className="text-xs">(Don't be late, kitten!)</span></p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Your upcoming interview - click to view calendar details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center cursor-help">
                            <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                            <p className="text-sm">Avg Offer: <span className="font-medium">{summaryData.averageSalary}</span> <span className="text-xs">(That's a roaring deal!)</span></p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Average salary from all your active job applications</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium cursor-help">
                            Above Average
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
