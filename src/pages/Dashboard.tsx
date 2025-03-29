
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useSound } from "@/hooks/useSound";
import { Volume2, VolumeX } from "lucide-react";
import Navbar from "@/components/Navbar";
import EngineerDashboard from "@/components/EngineerDashboard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { soundEnabled, toggleSound, playClick } = useSound();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  const handleSoundToggle = () => {
    toggleSound();
    playClick();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="fixed bottom-4 right-4 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleSoundToggle}
                className="rounded-full bg-background shadow-md"
              >
                {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{soundEnabled ? "Disable sounds" : "Enable sounds"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <EngineerDashboard />
      <Footer />
    </div>
  );
};

export default Dashboard;
