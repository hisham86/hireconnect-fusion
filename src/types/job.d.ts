
import { type DisplayableJob } from "@/hooks/useJobDisplay";

declare global {
  interface SuggestedJobWithFlag extends DisplayableJob {
    isSuggested: boolean;
  }
}
