
import React from "react";

const DashboardLoadingState: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading your engineer dashboard...</p>
      </div>
    </section>
  );
};

export default DashboardLoadingState;
