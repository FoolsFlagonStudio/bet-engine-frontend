import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "../../lib/supabase";
import { apiFetch } from "../../lib/api";
import { API_ROUTES } from "../../lib/routes";

type SubStatus = "active" | "trialing" | "canceled" | "past_due" | null;

interface MeResponse {
  role: string;
  subscription: { status: SubStatus } | null;
}

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [subStatus, setSubStatus] = useState<SubStatus>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setIsAuthed(false);
        setLoading(false);
        return;
      }
      setIsAuthed(true);

      try {
        const me = await apiFetch<MeResponse>(API_ROUTES.me);
        if (me.role === "admin") {
          setIsAdmin(true);
        } else {
          setSubStatus(me.subscription?.status ?? null);
        }
      } catch {
        // If the check fails, send to /subscribe rather than crashing
        setSubStatus(null);
      }

      setLoading(false);
    })();
  }, []);

  if (loading) return null;
  if (!isAuthed) return <Navigate to="/login" replace />;
  if (isAdmin) return <>{children}</>;
  if (subStatus === "active" || subStatus === "trialing") return <>{children}</>;
  if (subStatus === "canceled" || subStatus === "past_due") return <Navigate to="/upgrade" replace />;
  return <Navigate to="/subscribe" replace />;
}
