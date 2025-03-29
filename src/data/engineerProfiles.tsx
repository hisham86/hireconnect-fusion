
import { 
  Code, 
  Database, 
  ServerCog, 
  Layers, 
  Smartphone,
  Braces,
  FileJson,
  PencilRuler,
  GanttChart
} from 'lucide-react';
import { EngineerProfile } from '@/types/profile';

export const engineerProfiles: EngineerProfile[] = [
  {
    role: "Senior Frontend Engineer",
    salary: "MYR 10,000 - 12,500 /month",
    notice: "30 days",
    location: "Kuala Lumpur, Malaysia Timezone",
    icon: <Code className="h-5 w-5 text-brand-primary" />,
    position: "top-10 -right-4 md:top-16 md:right-24",
    rotation: "rotate-2",
    specialClass: "bg-white/10 dark:bg-white/5 border-white/20",
    floatClass: "animate-float-1",
    languages: ["React", "TypeScript", "Next.js"],
    languageIcons: [
      <Braces key="react" className="h-4 w-4 text-blue-400" />,
      <FileJson key="ts" className="h-4 w-4 text-blue-500" />
    ]
  },
  {
    role: "Backend Developer",
    salary: "USD 8,000 - 9,500 /month",
    notice: "45 days",
    location: "Remote (US Eastern Timezone)",
    icon: <ServerCog className="h-5 w-5 text-green-500" />,
    position: "-top-10 right-20 md:top-8 md:right-12",
    rotation: "-rotate-3",
    specialClass: "bg-white/10 dark:bg-white/5 border-white/20",
    floatClass: "animate-float-2",
    languages: ["Node.js", "Python", "Go"],
    languageIcons: [
      <ServerCog key="node" className="h-4 w-4 text-green-400" />,
      <Code key="python" className="h-4 w-4 text-yellow-500" />
    ]
  },
  {
    role: "Full Stack Engineer",
    salary: "EUR 6,500 - 7,800 /month",
    notice: "60 days",
    location: "Berlin, Germany",
    icon: <Layers className="h-5 w-5 text-blue-500" />,
    position: "top-24 -right-8 md:top-40 md:right-36",
    rotation: "rotate-6",
    specialClass: "bg-white/10 dark:bg-white/5 border-white/20",
    floatClass: "animate-float-3",
    languages: ["JavaScript", "Ruby", "Vue.js"],
    languageIcons: [
      <Braces key="js" className="h-4 w-4 text-yellow-400" />,
      <Code key="vue" className="h-4 w-4 text-green-500" />
    ]
  },
  {
    role: "Mobile Developer",
    salary: "SGD 9,000 - 11,000 /month",
    notice: "30 days",
    location: "Singapore",
    icon: <Smartphone className="h-5 w-5 text-purple-500" />,
    position: "top-48 right-4 md:top-20 md:right-2",
    rotation: "-rotate-2",
    specialClass: "bg-white/10 dark:bg-white/5 border-white/20",
    floatClass: "animate-float-4",
    languages: ["React Native", "Swift", "Kotlin"],
    languageIcons: [
      <Smartphone key="mobile" className="h-4 w-4 text-purple-400" />,
      <PencilRuler key="design" className="h-4 w-4 text-pink-500" />
    ]
  },
  {
    role: "Database Specialist",
    salary: "CAD 9,500 - 12,000 /month",
    notice: "45 days",
    location: "Toronto, Canada",
    icon: <Database className="h-5 w-5 text-amber-500" />,
    position: "top-4 -right-14 md:top-52 md:right-28",
    rotation: "rotate-12",
    specialClass: "bg-white/10 dark:bg-white/5 border-white/20",
    floatClass: "animate-float-5",
    languages: ["SQL", "MongoDB", "PostgreSQL"],
    languageIcons: [
      <Database key="sql" className="h-4 w-4 text-amber-400" />,
      <GanttChart key="mongo" className="h-4 w-4 text-green-400" />
    ]
  }
];
