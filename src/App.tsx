import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import FeelingStuck from "./pages/FeelingStuck";
import Tips from "./pages/Tips";
import Blueprint from "./pages/Blueprint";
import Podcast from "./pages/Podcast";
import DailyWins from "./pages/DailyWins";
import Partnership from "./pages/Partnership";
import Community from "./pages/Community";
import ThumbnailTemplate from "./pages/ThumbnailTemplate";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/feeling-stuck" element={<FeelingStuck />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/blueprint" element={<Blueprint />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/daily-wins" element={<DailyWins />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/community" element={<Community />} />
          <Route path="/thumbnail-template" element={<ThumbnailTemplate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
