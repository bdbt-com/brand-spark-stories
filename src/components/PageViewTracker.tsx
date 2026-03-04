import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const generateSessionId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

const PageViewTracker = () => {
  const location = useLocation();
  const currentRowId = useRef<string | null>(null);
  const enteredAt = useRef<number>(Date.now());
  const sessionId = useRef(generateSessionId());

  const updateDuration = async () => {
    if (!currentRowId.current) return;
    const duration = Math.round((Date.now() - enteredAt.current) / 1000);
    if (duration < 1) return;

    // Use sendBeacon for reliability on page unload
    const url = `https://xvqhkjgowlwfdosxmvba.supabase.co/rest/v1/page_views?id=eq.${currentRowId.current}`;
    const body = JSON.stringify({ duration_seconds: duration });
    const headers = {
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWhramdvd2x3ZmRvc3htdmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDUxNDIsImV4cCI6MjA2ODcyMTE0Mn0.J4KIuQ5m-F2MOYEpiMNWxQrfyUWqUF1JrzObQZBVTko",
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    };

    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      // sendBeacon doesn't support custom headers, fall back to fetch
      try {
        await fetch(url, { method: "PATCH", headers, body, keepalive: true });
      } catch {}
    } else {
      try {
        await fetch(url, { method: "PATCH", headers, body });
      } catch {}
    }
  };

  const trackPageView = async (path: string) => {
    // Update duration of previous page
    await updateDuration();

    // Don't track admin page itself
    if (path === "/admin-list") {
      currentRowId.current = null;
      return;
    }

    enteredAt.current = Date.now();

    try {
      const { data } = await supabase
        .from("page_views")
        .insert({
          page_path: path,
          session_id: sessionId.current,
        })
        .select("id")
        .single();

      currentRowId.current = data?.id || null;
    } catch {
      currentRowId.current = null;
    }
  };

  useEffect(() => {
    trackPageView(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      updateDuration();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      updateDuration();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default PageViewTracker;
