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

    try {
      await supabase.functions.invoke("track-page-view", {
        body: { id: currentRowId.current, duration_seconds: duration },
      });
    } catch {}
  };

  const trackPageView = async (path: string) => {
    await updateDuration();

    if (path === "/admin-list") {
      currentRowId.current = null;
      return;
    }

    enteredAt.current = Date.now();

    // Capture ?ref= query param for referral tracking
    const searchParams = new URLSearchParams(window.location.search);
    const referrer = searchParams.get("ref") || null;

    try {
      const { data } = await supabase.functions.invoke("track-page-view", {
        body: { page_path: path, session_id: sessionId.current, referrer },
      });

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
