import { useEffect, useState } from "react";

function currentPath() {
  return window.location.pathname || "/";
}

export function useLocation() {
  const [pathname, setPathname] = useState(currentPath);

  useEffect(() => {
    const update = () => setPathname(currentPath());
    window.addEventListener("popstate", update);
    window.addEventListener("app:navigate", update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("app:navigate", update);
    };
  }, []);

  return { pathname };
}

export function navigate(to: string) {
  if (window.location.pathname === to) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event("app:navigate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
