
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import { useAnalytics } from "./hooks/useAnalytics";
import InteractiveBackground from "./components/InteractiveBackground";

// Wrap component to enable analytics
const AppWithAnalytics = () => {
  useAnalytics();
  
  // Initialize dark mode based on user's preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <>
      <InteractiveBackground />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/analytics" element={<Analytics />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  // Create a new QueryClient instance using useState
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppWithAnalytics />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
