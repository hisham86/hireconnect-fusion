
import { useState } from "react";

export type DisplayableJob = {
  id: string;
  company: string;
  role: string;
  annual_salary?: string | null;
  monthly_salary?: string | null;
  location?: string | null;
  commute_minutes?: number | null;
  rating?: number | null;
  status?: string | null;
  [key: string]: any;
};

export function useJobDisplay() {
  const [activeTab, setActiveTab] = useState<"active" | "suitable" | "all">("active");
  const [salaryDisplayMode, setSalaryDisplayMode] = useState<"annual" | "monthly">("monthly");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  const toggleSalaryDisplay = () => {
    setSalaryDisplayMode(prev => prev === "annual" ? "monthly" : "annual");
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getSortedJobs = <T extends DisplayableJob>(jobs: T[]): T[] => {
    if (!sortColumn) return jobs;

    return [...jobs].sort((a, b) => {
      let valueA, valueB;

      if (sortColumn === 'commuteTime') {
        valueA = a.commute_minutes || 0;
        valueB = b.commute_minutes || 0;
      } else if (sortColumn === 'salary') {
        // Extract numeric value from salary string
        const extractSalary = (str: string | null) => {
          if (!str) return 0;
          const match = str.match(/RM(\d+\.?\d*)k/i);
          return match ? parseFloat(match[1]) * 1000 : 0;
        };
        
        valueA = salaryDisplayMode === 'annual'
          ? extractSalary(a.annual_salary)
          : extractSalary(a.monthly_salary);
        
        valueB = salaryDisplayMode === 'annual'
          ? extractSalary(b.annual_salary)
          : extractSalary(b.monthly_salary);
      } else {
        valueA = a[sortColumn];
        valueB = b[sortColumn];
      }

      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  return {
    activeTab,
    setActiveTab,
    salaryDisplayMode,
    sortColumn,
    sortDirection,
    toggleSalaryDisplay,
    handleSort,
    getSortedJobs
  };
}
