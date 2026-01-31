import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
export default function AuthCallback() {
  const navigate = useNavigate();
  const hasProcessed = useRef(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Prevent double processing in StrictMode
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processAuth = async () => {
      try {
        // Extract session_id from URL fragment
        const hash = window.location.hash;
        const sessionIdMatch = hash.match(/session_id=([^&]+)/);

        if (!sessionIdMatch) {
          throw new Error("No session_id found");
        }

        const sessionId = sessionIdMatch[1];

        // Exchange session_id for our session
        const response = await fetch(`${API_URL}/api/auth/session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_id: sessionId }),
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Authentication failed");
        }

        const userData = await response.json();

        // Clear the hash from URL and navigate to dashboard
        window.history.replaceState(null, "", window.location.pathname);
        navigate("/dashboard", { replace: true, state: { user: userData } });
      } catch (err) {
        console.error("Auth callback error:", err);
        setError(err.message);
        // Redirect to login after error
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      }
    };

    processAuth();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-finn-slate-50">
        <div className="text-center">
          <p className="text-red-500 mb-2">Authentication failed</p>
          <p className="text-finn-slate-500 text-sm">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-finn-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-finn-slate-500">Signing you in...</p>
      </div>
    </div>
  );
}
