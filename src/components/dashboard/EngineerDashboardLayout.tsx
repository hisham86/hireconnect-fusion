
import React, { ReactNode } from "react";
import DashboardHeader from "./DashboardHeader";
import AddJobDialog from "../AddJobDialog";

interface EngineerDashboardLayoutProps {
  isAddJobDialogOpen: boolean;
  setIsAddJobDialogOpen: (isOpen: boolean) => void;
  onAddJob: (jobData: any) => Promise<void>;
  children: ReactNode;
}

const EngineerDashboardLayout: React.FC<EngineerDashboardLayoutProps> = ({
  isAddJobDialogOpen,
  setIsAddJobDialogOpen,
  onAddJob,
  children
}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <DashboardHeader onAddJobClick={() => setIsAddJobDialogOpen(true)} />
        
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
      
      <AddJobDialog 
        open={isAddJobDialogOpen} 
        onOpenChange={setIsAddJobDialogOpen}
        onAddJob={onAddJob}
      />
    </section>
  );
};

export default EngineerDashboardLayout;
