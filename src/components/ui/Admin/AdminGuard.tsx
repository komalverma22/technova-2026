import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL, getAuthToken } from "../../../lib/api";

function getAdminCookie(): boolean {
  return document.cookie.split("; ").some((c) => c === "admin=true");
}

function setAdminCookie() {
  document.cookie = "admin=true; path=/; SameSite=Lax";
}

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"checking" | "allowed" | "denied">(
    getAdminCookie() ? "allowed" : "checking"
  );
  const [debugInfo, setDebugInfo] = useState("");

  useEffect(() => {
    if (status !== "checking") return;

    const token = getAuthToken();

    // No token at all → go to login
    if (!token) {
      setDebugInfo("No auth token found in cookies.");
      setStatus("denied");
      return;
    }

    const controller = new AbortController();

    fetch(`${API_URL}/api/isadmin`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    })
      .then(async (res) => {
        const text = await res.text();
        console.log("[AdminGuard] /api/isadmin →", res.status, text);
        setDebugInfo(`HTTP ${res.status} | ${text.slice(0, 120)}`);

        if (res.status === 200) {
          // Any 200 response = admin access granted
          // (API returns 401/403 for non-admins)
          setAdminCookie();
          setStatus("allowed");
        } else {
          // 401, 403, or anything else = not admin
          setStatus("denied");
        }
      })
      .catch((err: Error) => {
        if (err.name === "AbortError") return;
        console.error("[AdminGuard] fetch error:", err);
        setDebugInfo(`Network error: ${err.message}`);
        setStatus("denied");
      });

    return () => controller.abort();
  }, [status]);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
          <p className="text-slate-400 text-sm">Verifying admin access…</p>
          {debugInfo && (
            <p className="text-slate-600 text-xs max-w-sm text-center break-all mt-2 px-4">
              {debugInfo}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (status === "denied") {
    return <Navigate to="/login?redirect=/admin/dashboard" replace />;
  }

  return <>{children}</>;
}

