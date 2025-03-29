
import { LucideIcon } from "lucide-react";

export interface EngineerProfile {
  role: string;
  salary: string;
  notice: string;
  location: string;
  icon: React.ReactNode;
  position: string;
  rotation: string;
  specialClass: string;
  floatClass: string;
  languages: string[];
  languageIcons: React.ReactNode[];
}
