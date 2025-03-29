
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthButtons from "@/components/AuthButtons";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"sign-in" | "sign-up">("sign-in");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/");
      }
    };
    
    checkSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate("/");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-purple-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Welcome to CodingCats
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to access exclusive features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "sign-in" | "sign-up")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
              <AuthButtons view="sign-in" />
            </TabsContent>
            <TabsContent value="sign-up">
              <AuthButtons view="sign-up" />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
          <p>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
