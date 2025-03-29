
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";

interface TimelineCardProps {
  avgResponseTime: string;
  hasInterviewScheduled: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ 
  avgResponseTime, 
  hasInterviewScheduled 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-gray-500 mr-2" />
            <p className="text-sm">Avg Response: <span className="font-medium">{avgResponseTime}</span></p>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
            <p className="text-sm">Next Interview: <span className="font-medium">
              {hasInterviewScheduled ? "Scheduled" : "None scheduled"}
            </span></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineCard;
