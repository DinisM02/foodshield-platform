import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

/**
 * WelcomeGuard redirects first-time users to the welcome page
 * Place this component in areas where you want to check for first login
 */
export function WelcomeGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Don't redirect if still loading or already on welcome page
    if (loading || location === "/welcome") return;

    // Redirect first-time users to welcome page
    if (user && user.isFirstLogin) {
      setLocation("/welcome");
    }
  }, [user, loading, location, setLocation]);

  return <>{children}</>;
}
