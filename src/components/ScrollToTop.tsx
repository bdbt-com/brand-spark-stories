import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Links like /#events or /coaching#clarity scroll to that section once it has rendered.
    if (hash) {
      let tries = 0;
      const go = () => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else if (tries++ < 20) setTimeout(go, 50);
      };
      go();
      return;
    }
    // Skip scroll-to-top for /tips/:keyword routes - let the keyword scroll handler manage it
    const isTipKeywordRoute = pathname.startsWith('/tips/') && pathname !== '/tips' && pathname !== '/tips/';

    if (!isTipKeywordRoute) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, hash]);

  return null;
}
