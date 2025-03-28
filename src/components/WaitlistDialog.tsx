
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WaitlistForm from "./WaitlistForm";

const WaitlistDialog = () => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    // Close the dialog after successful submission
    setTimeout(() => setOpen(false), 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto">
          JOIN THE WAITLIST <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Join Our Waitlist</DialogTitle>
          <DialogDescription>
            Be the first to know when we launch. Enter your details below to join our exclusive waitlist.
          </DialogDescription>
        </DialogHeader>
        <WaitlistForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistDialog;
