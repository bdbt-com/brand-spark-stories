import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from "react-router-dom";

// Preview builds (hosted without server rewrites) use hash URLs. The live site uses normal URLs.
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter;
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Tips from "./pages/Tips";
import DailyWinsTest from "./pages/DailyWinsTest";
import Coaching from "./pages/Coaching";
import Podcast from "./pages/Podcast";
import DailyWins from "./pages/DailyWins";
import Partnership from "./pages/Partnership";
import Community from "./pages/Community";
import ThumbnailTemplate from "./pages/ThumbnailTemplate";
import LinkInBio from "./pages/LinkInBio";
import AdminList from "./pages/AdminList";
import NotFound from "./pages/NotFound";
import RedirectBridge from "./pages/RedirectBridge";
import HourlyRateGrid from "./pages/HourlyRateGrid";

import ScrollToTop from "./components/ScrollToTop";
import PageViewTracker from "./components/PageViewTracker";
import RouteSeo from "./components/RouteSeo";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <ScrollToTop />
        <RouteSeo />
        {!import.meta.env.VITE_HASH_ROUTER && <PageViewTracker />}

        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/feeling-stuck" element={<Navigate to="/courses" replace />} />
          <Route path="/tips/:keyword?" element={<Tips />} />
          <Route path="/test" element={<DailyWinsTest />} />
          <Route path="/daily-wins-test" element={<Navigate to="/test" replace />} />
          <Route path="/coaching" element={<Coaching />} />
          {/* Old Foundation Blueprint links (YouTube descriptions, link in bio) now go to the test */}
          <Route path="/blueprint" element={<Navigate to="/test" replace />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/daily-wins" element={<DailyWins />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/community" element={<Community />} />
          <Route path="/thumbnail-template" element={<ThumbnailTemplate />} />
          <Route path="/links" element={<LinkInBio />} />
          <Route path="/bio" element={<LinkInBio />} />
          <Route path="/admin-list" element={<AdminList />} />
          <Route path="/redirect" element={<RedirectBridge />} />
          <Route path="/hourly-rate-grid" element={<HourlyRateGrid />} />
          <Route path="/latest" element={<Navigate to="/podcast" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
