import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Skip scroll-to-top for /tips/:keyword routes - let the keyword scroll handler manage it
    const isTipKeywordRoute = pathname.startsWith('/tips/') && pathname !== '/tips' && pathname !== '/tips/';
    
    if (!isTipKeywordRoute) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname]);

  return null;
}
