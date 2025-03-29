
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import EngineerDashboard from "@/components/EngineerDashboard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    if (!isLoading && !user) {
      navigate("/auth");
    } else if (!isLoading && user) {
      setPageLoading(false);
    }
  }, [user, isLoading, navigate]);

  if (isLoading || pageLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Engineer Dashboard</h1>
            <Button onClick={() => navigate("/")} variant="outline">
              Back to Home
            </Button>
          </div>
          <EngineerDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
