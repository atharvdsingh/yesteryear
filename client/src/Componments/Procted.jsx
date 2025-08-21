import { LucideClockFading } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Procted( { children, authentication = true }) {
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && status !== authentication) {
      navigator("/login");
    } else if (!authentication && status !== authentication) {
      navigator("/");
    }
    setLoading(false);
  }, [authentication, navigator, status]);

  return loading ? (
    <h1>
      <LucideClockFading className="animate-spin" />
    </h1>
  ) : (
    children   // ✅ FIX: return children directly, not { children }
  );
}
