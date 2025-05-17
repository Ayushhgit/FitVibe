import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import SavedOutfits from "./pages/SavedOutfits";
import NotFound from "./pages/NotFound";
import ProfileModal from "./components/modals/ProfileModal";
import SettingsModal from "./components/modals/SettingsModal";
import { StyleForgeProvider } from "./context/StyleForgeContext";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <StyleForgeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/create" element={<Index />} />
            <Route path="/saved" element={<SavedOutfits />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ProfileModal />
          <SettingsModal />
        </BrowserRouter>
      </StyleForgeProvider>
    </TooltipProvider>
  </QueryClientProvider>
  </ThemeProvider>
);

export default App;
