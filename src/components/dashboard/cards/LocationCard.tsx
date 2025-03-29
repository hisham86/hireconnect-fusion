
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HomeIcon, Wifi, Laptop, Building } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { type EngineerProfile } from "@/services/engineerProfileService";

interface LocationCardProps {
  profile: EngineerProfile;
  malaysianLocations: string[];
  handleLocationChange: (value: string) => Promise<void>;
  handleJobNatureChange: (value: string) => Promise<void>;
}

const LocationCard: React.FC<LocationCardProps> = ({
  profile,
  malaysianLocations,
  handleLocationChange,
  handleJobNatureChange
}) => {
  return (
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
              value={profile.home_location || "Kuala Lumpur"} 
              onValueChange={handleLocationChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {malaysianLocations.map((location) => (
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
              value={profile.job_nature_preference || "remote"}
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
  );
};

export default LocationCard;
