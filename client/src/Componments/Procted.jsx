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
    else{
        setTimeout(() => {
            setLoading(false);
            
        }, 1);
    }
  }, [authentication, navigator, status]);

  return loading ? (
    <div className="h-[100vh]  w-[100vw] bg-black" ></div>
  ) : (
    children   // ✅ FIX: return children directly, not { children }
  );
}
