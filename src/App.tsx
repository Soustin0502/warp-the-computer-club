import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AIChatbot from "@/components/AIChatbot";
import LoadingScreen from "@/components/LoadingScreen";
import Index from "./pages/Index";
import Members from "./pages/Members";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  console.log("App component is rendering");
  console.log("All page imports successful");
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {isLoading ? (
          <LoadingScreen onLoadComplete={() => setIsLoading(false)} />
        ) : (
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/members" element={<Members />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AIChatbot />
          </TooltipProvider>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
