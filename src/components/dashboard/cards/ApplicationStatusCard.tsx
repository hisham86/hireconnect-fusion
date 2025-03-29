
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ApplicationStatusCardProps {
  applications: number;
  interviews: number;
  offers: number;
}

const ApplicationStatusCard: React.FC<ApplicationStatusCardProps> = ({ 
  applications, 
  interviews, 
  offers 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Application Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-800">{applications}</p>
            <p className="text-sm text-gray-600">Applied</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#0EA5E9]">{interviews}</p>
            <p className="text-sm text-gray-600">Interviews</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#F97316]">{offers}</p>
            <p className="text-sm text-gray-600">Offers</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationStatusCard;
