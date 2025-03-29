
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, BadgeCheck, PencilIcon, Github, ExternalLink, Code, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { type ProgrammingLanguage } from "@/services/engineerProfileService";
import { type EngineerProfile } from "@/services/engineerProfileService";

interface SalaryCardProps {
  profile: EngineerProfile;
  programmingLanguages: ProgrammingLanguage[];
  averageSalary: string;
  updateProfile: (updates: Partial<EngineerProfile>) => Promise<EngineerProfile | undefined>;
  addProgrammingLanguage: (language: Omit<ProgrammingLanguage, "id" | "user_id">) => Promise<ProgrammingLanguage | null>;
  removeProgrammingLanguage: (id: string) => Promise<boolean>;
}

const SalaryCard: React.FC<SalaryCardProps> = ({
  profile,
  programmingLanguages,
  averageSalary,
  updateProfile,
  addProgrammingLanguage,
  removeProgrammingLanguage
}) => {
  const [isEditingCurrentSalary, setIsEditingCurrentSalary] = useState(false);
  const [isEditingExpectedSalary, setIsEditingExpectedSalary] = useState(false);
  const [isEditingGithubUrl, setIsEditingGithubUrl] = useState(false);
  const [tempCurrentSalary, setTempCurrentSalary] = useState("");
  const [tempExpectedSalary, setTempExpectedSalary] = useState("");
  const [tempGithubUrl, setTempGithubUrl] = useState("");

  useEffect(() => {
    if (profile) {
      setTempCurrentSalary(profile.current_salary || "");
      setTempExpectedSalary(profile.expected_salary || "");
      setTempGithubUrl(profile.github_url || "");
    }
  }, [profile]);

  const handleSaveCurrentSalary = async () => {
    if (!profile) return;
    
    await updateProfile({ current_salary: tempCurrentSalary });
    setIsEditingCurrentSalary(false);
  };

  const handleSaveExpectedSalary = async () => {
    if (!profile) return;
    
    await updateProfile({ expected_salary: tempExpectedSalary });
    setIsEditingExpectedSalary(false);
  };

  const handleSaveGithubUrl = async () => {
    if (!profile) return;
    
    await updateProfile({ github_url: tempGithubUrl });
    setIsEditingGithubUrl(false);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Salary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
              <p className="text-sm">Avg Offer: <span className="font-medium">{averageSalary}</span></p>
            </div>
            {profile.expected_salary && Number(profile.expected_salary.replace(/[^0-9.]/g, '')) > 0 && (
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
                  <span className="font-medium mr-1">{profile.current_salary || "Not set"}</span>
                  {profile.is_verified && <BadgeCheck className="h-4 w-4 text-blue-500" />}
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
                  <span className="font-medium mr-1">{profile.expected_salary || "Not set"}</span>
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
                  {profile.github_url ? (
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
                programmingLanguages.map((lang) => (
                  <TooltipProvider key={lang.id}>
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
                <span className="text-xs text-gray-500">No languages added yet</span>
              )}
              <Button
                variant="outline"
                size="sm"
                className="!h-6 !w-6 rounded-full p-0 flex items-center justify-center"
                onClick={() => {
                  if (programmingLanguages.length < 5) {
                    const languages = [
                      { name: "JavaScript", color: "#F7DF1E", icon: "js" },
                      { name: "TypeScript", color: "#3178C6", icon: "ts" },
                      { name: "React", color: "#61DAFB", icon: "react" },
                      { name: "Node.js", color: "#339933", icon: "node" },
                      { name: "Python", color: "#3776AB", icon: "py" }
                    ];
                    
                    const existingNames = programmingLanguages.map(l => l.name);
                    const availableLanguages = languages.filter(l => !existingNames.includes(l.name));
                    
                    if (availableLanguages.length > 0) {
                      const randomLang = availableLanguages[Math.floor(Math.random() * availableLanguages.length)];
                      addProgrammingLanguage(randomLang);
                    }
                  }
                }}
              >
                <PlusIcon className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryCard;
