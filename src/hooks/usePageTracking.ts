import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

function getSessionId() {
  const key = "sid";
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

export function usePageTracking() {
  const location = useRouterState({ select: (s) => s.location });

  useEffect(() => {
    // Don't track admin routes
    if (location.pathname.startsWith("/admin")) return;

    // Increment page view counter
    supabase.rpc("increment_counter", { counter_key: "page_views" })
      .then(({ error }) => {
        if (error) console.error("[page_views] increment failed:", error.message);
      });

    // Record session if new (conflict = already exists, do nothing)
    const sessionId = getSessionId();
    supabase.from("sessions").upsert({
      session_id: sessionId,
      referrer: document.referrer || null,
    }, { onConflict: "session_id", ignoreDuplicates: true })
      .then(({ error }) => {
        if (error) console.error("[sessions] insert failed:", error.message);
      });
  }, [location.pathname]);
}
