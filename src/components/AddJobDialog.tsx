
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Form schema definition
const formSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Job role is required"),
  location: z.string().min(1, "Job location is required"),
  annualSalary: z.string().optional(),
  monthlySalary: z.string().optional(),
  sourcePlatform: z.string().min(1, "Source platform is required"),
  applicationStatus: z.string().default("1. Application Submitted"),
  taName: z.string().optional(),
  taEmail: z.string().email().optional(),
  taPhone: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddJob: (data: any) => void;
}

const AddJobDialog = ({ open, onOpenChange, onAddJob }: AddJobDialogProps) => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      role: "",
      location: "",
      annualSalary: "",
      monthlySalary: "",
      sourcePlatform: "",
      applicationStatus: "1. Application Submitted",
      taName: "",
      taEmail: "",
      taPhone: "",
      notes: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // Create a new job object based on form data
    const newJob = {
      id: Date.now(), // Use timestamp as temporary ID
      company: data.company,
      role: data.role,
      location: data.location,
      annualSalary: data.annualSalary || "Not specified",
      monthlySalary: data.monthlySalary || "Not specified",
      status: data.applicationStatus,
      applied: "Just now",
      logoUrl: "https://via.placeholder.com/150", // Placeholder logo
      glassdoorUrl: "#",
      rating: 0,
      reviews: 0,
      founded: "N/A",
      employees: "N/A",
      description: "Manually added job application",
      transportTime: {
        car: "N/A",
      },
      commuteMinutes: data.location.toLowerCase().includes("remote") ? 0 : 30, // Default value
      talentAcquisition: {
        name: data.taName || "",
        email: data.taEmail || "",
        phone: data.taPhone || "",
        invited: data.taEmail ? false : null,
      },
      sourcePlatform: data.sourcePlatform,
      notes: data.notes,
      manuallyAdded: true,
    };

    onAddJob(newJob);
    
    // Show success toast
    toast({
      title: "Success",
      description: "Job application added successfully",
    });
    
    // Send invite email if TA email is provided
    if (data.taEmail) {
      // In a real app, this would be an API call to send the email
      console.log(`Invitation email would be sent to ${data.taEmail}`);
      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${data.taEmail}`,
      });
    }
    
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a new job application</DialogTitle>
          <DialogDescription>
            Manually add a job application from another platform
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Google" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Role*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Remote (MY) or On-site (KL)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sourcePlatform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source Platform*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. LinkedIn, JobStreet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="annualSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Salary Range</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. RM120k-140k" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="monthlySalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Salary Range</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. RM10k-11.7k" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="applicationStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1. Application Submitted">Application Submitted</SelectItem>
                        <SelectItem value="2. Interview Scheduled">Interview Scheduled</SelectItem>
                        <SelectItem value="3. Technical Test">Technical Test</SelectItem>
                        <SelectItem value="4. Final Offer">Final Offer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-md font-medium mb-3">Talent Acquisition Contact (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="taName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Jane Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="taEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. jane@company.com" 
                          type="email" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                      {field.value && (
                        <p className="text-xs text-muted-foreground">
                          An invitation email will be sent to this address
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="taPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. +60123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any additional notes about this application" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Job Application</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddJobDialog;
