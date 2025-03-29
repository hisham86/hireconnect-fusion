
import React from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onAddJobClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onAddJobClick }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineer Dashboard</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Manage your entire job search journey in one place with real-time updates and personalized recommendations.
      </p>
    </div>
  );
};

export default DashboardHeader;
