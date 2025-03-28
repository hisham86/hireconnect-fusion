
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WaitlistForm from "./WaitlistForm";

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userType: "engineer" | "recruiter" | null;
}

const WaitlistDialog = ({ open, onOpenChange, userType }: WaitlistDialogProps) => {
  const handleSuccess = () => {
    // Close the dialog after successful submission
    setTimeout(() => onOpenChange(false), 1000);
  };

  const getDialogTitle = () => {
    if (userType === "engineer") return "Join as an Engineer";
    if (userType === "recruiter") return "Join as a Recruiter";
    return "Join Our Waitlist";
  };

  const getDialogDescription = () => {
    if (userType === "engineer") {
      return "Get discovered by top companies and receive job offers tailored to your skills and preferences.";
    }
    if (userType === "recruiter") {
      return "Find the perfect candidates for your roles with our advanced matching algorithm.";
    }
    return "Be the first to know when we launch. Enter your details below to join our exclusive waitlist.";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{getDialogTitle()}</DialogTitle>
          <DialogDescription>
            {getDialogDescription()}
          </DialogDescription>
        </DialogHeader>
        <WaitlistForm onSuccess={handleSuccess} userType={userType} />
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistDialog;
