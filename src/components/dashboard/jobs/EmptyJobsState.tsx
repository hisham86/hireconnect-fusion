
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface EmptyJobsStateProps {
  activeTab: "active" | "suitable" | "all";
  onAddJobClick: () => void;
}

const EmptyJobsState: React.FC<EmptyJobsStateProps> = ({ activeTab, onAddJobClick }) => {
  const getMessage = () => {
    switch (activeTab) {
      case "active":
        return {
          title: "No active job applications yet",
          description: "Track your job applications by adding them manually"
        };
      case "suitable":
        return {
          title: "No job suggestions yet",
          description: "Job suggestions will appear here based on your profile"
        };
      case "all":
      default:
        return {
          title: "No jobs found",
          description: "Start by adding a job application or checking suggested jobs"
        };
    }
  };

  const message = getMessage();

  return (
    <div className="p-8 text-center">
      <h3 className="text-lg font-semibold mb-2">{message.title}</h3>
      <p className="text-gray-600 mb-4">{message.description}</p>
      {activeTab !== "suitable" && (
        <Button 
          onClick={onAddJobClick}
          className="flex items-center gap-1"
        >
          <PlusIcon className="h-4 w-4" />
          {activeTab === "active" ? "Add Your First Application" : "Add Your First Application"}
        </Button>
      )}
    </div>
  );
};

export default EmptyJobsState;
