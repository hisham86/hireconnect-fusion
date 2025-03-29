
import { Button } from "@/components/ui/button";
import { Github, Mail, Twitter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AuthButtonsProps {
  view: "sign-in" | "sign-up";
  afterAuth?: () => void;
}

const AuthButtons = ({ view, afterAuth }: AuthButtonsProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSocialLogin = async (provider: "google" | "github" | "twitter") => {
    try {
      setIsLoading(provider);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        throw error;
      }

      // After successful auth, the page will redirect
      if (afterAuth) afterAuth();
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "Failed to authenticate",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={() => handleSocialLogin("google")}
        disabled={isLoading !== null}
      >
        {isLoading === "google" ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Mail className="h-4 w-4" />
        )}
        {view === "sign-in" ? "Sign in with Google" : "Sign up with Google"}
      </Button>
      
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={() => handleSocialLogin("github")}
        disabled={isLoading !== null}
      >
        {isLoading === "github" ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Github className="h-4 w-4" />
        )}
        {view === "sign-in" ? "Sign in with GitHub" : "Sign up with GitHub"}
      </Button>
      
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={() => handleSocialLogin("twitter")}
        disabled={isLoading !== null}
      >
        {isLoading === "twitter" ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Twitter className="h-4 w-4" />
        )}
        {view === "sign-in" ? "Sign in with Twitter" : "Sign up with Twitter"}
      </Button>
    </div>
  );
};

export default AuthButtons;
