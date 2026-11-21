import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from "react-router-dom";

// Preview builds (hosted without server rewrites) use hash URLs. The live site uses normal URLs.
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter;
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
const About = lazy(() => import("./pages/About"));
const Courses = lazy(() => import("./pages/Courses"));
const Tips = lazy(() => import("./pages/Tips"));
const DailyWinsTest = lazy(() => import("./pages/DailyWinsTest"));
const Coaching = lazy(() => import("./pages/Coaching"));
const Podcast = lazy(() => import("./pages/Podcast"));
const DailyWins = lazy(() => import("./pages/DailyWins"));
const Partnership = lazy(() => import("./pages/Partnership"));
const Community = lazy(() => import("./pages/Community"));
const ThumbnailTemplate = lazy(() => import("./pages/ThumbnailTemplate"));
const LinkInBio = lazy(() => import("./pages/LinkInBio"));
const AdminList = lazy(() => import("./pages/AdminList"));
const NotFound = lazy(() => import("./pages/NotFound"));
const RedirectBridge = lazy(() => import("./pages/RedirectBridge"));
const HourlyRateGrid = lazy(() => import("./pages/HourlyRateGrid"));

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
        <Suspense fallback={<div className="min-h-screen" />}>
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
        </Suspense>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
