export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "FOOD SHIELD";

export const APP_SUBTITLE = "Improving Food Safety & Food Security";

export const APP_LOGO =
  import.meta.env.VITE_APP_LOGO ||
  "/logo.png";

// Platform branding
export const PLATFORM_NAME = "FOOD SHIELD";
export const PLATFORM_TAGLINE = "Improving Food Safety & Food Security";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  // Use Firebase login instead of Manus OAuth in production
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/firebase-login`;
  }
  return '/firebase-login';
};