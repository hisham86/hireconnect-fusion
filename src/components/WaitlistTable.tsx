
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { waitlistService } from "@/services/waitlistService";
import { Skeleton } from "@/components/ui/skeleton";

interface WaitlistEntry {
  id?: string;
  name: string;
  email: string;
  userType: "engineer" | "recruiter" | null;
  role?: string;
  experience?: string;
  created_at?: string;
}

const WaitlistTable = () => {
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);
      const entries = await waitlistService.getAllEntries();
      setWaitlistEntries(entries);
      setIsLoading(false);
    };

    fetchEntries();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getEngineerCount = () => {
    return waitlistEntries.filter(entry => entry.userType === "engineer").length;
  };

  const getRecruiterCount = () => {
    return waitlistEntries.filter(entry => entry.userType === "recruiter").length;
  };

  const getGeneralCount = () => {
    return waitlistEntries.filter(entry => entry.userType === null).length;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Waitlist Entries</CardTitle>
          <div className="flex flex-wrap gap-4 mt-2">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-28" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Waitlist Entries</CardTitle>
        <div className="flex flex-wrap gap-4 mt-2">
          <div className="bg-blue-100 px-3 py-1 rounded-full text-blue-800">
            Engineers: {getEngineerCount()}
          </div>
          <div className="bg-green-100 px-3 py-1 rounded-full text-green-800">
            Recruiters: {getRecruiterCount()}
          </div>
          <div className="bg-gray-100 px-3 py-1 rounded-full text-gray-800">
            General: {getGeneralCount()}
          </div>
          <div className="bg-purple-100 px-3 py-1 rounded-full text-purple-800">
            Total: {waitlistEntries.length}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {waitlistEntries.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No waitlist entries yet</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {waitlistEntries.map((entry, index) => (
                  <TableRow key={entry.id || index}>
                    <TableCell>{formatDate(entry.created_at)}</TableCell>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell>{entry.email}</TableCell>
                    <TableCell>
                      {entry.userType === "engineer" ? (
                        <span className="bg-blue-100 px-2 py-1 rounded-full text-blue-800 text-xs">
                          Engineer
                        </span>
                      ) : entry.userType === "recruiter" ? (
                        <span className="bg-green-100 px-2 py-1 rounded-full text-green-800 text-xs">
                          Recruiter
                        </span>
                      ) : (
                        <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-800 text-xs">
                          General
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {entry.userType === "engineer" && entry.role && (
                        <span>Role: {entry.role}, Experience: {entry.experience}</span>
                      )}
                      {entry.userType === "recruiter" && entry.role && (
                        <span>Company Size: {entry.role}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WaitlistTable;
