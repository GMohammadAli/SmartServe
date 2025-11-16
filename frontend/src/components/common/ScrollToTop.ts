import { useEffect } from "react";
import { useLocation } from "react-router";

//scrolls to top of the page on path change
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}
