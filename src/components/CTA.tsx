
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, Users } from "lucide-react";
import WaitlistDialog from "./WaitlistDialog";

const CTA = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userType, setUserType] = useState<"engineer" | "recruiter" | null>(null);

  const openDialog = (type: "engineer" | "recruiter") => {
    setUserType(type);
    setDialogOpen(true);
  };

  return (
    <section className="hero-gradient text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Pounce on a Better Hiring Process?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of engineers and companies already feline the benefits of CodingCats!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-[#F97316] text-white hover:bg-[#F97316]/90 font-medium"
              asChild
            >
              <a href="/auth">
                <Code className="mr-2 h-5 w-5" /> I am Engineer
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/90 font-medium"
              onClick={() => openDialog("recruiter")}
            >
              <Users className="mr-2 h-5 w-5" /> I am Recruiter
            </Button>
          </div>
        </div>
      </div>
      <WaitlistDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        userType={userType}
      />
    </section>
  );
};

export default CTA;
