"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoginForm from "@/components/forms/LoginForm";
import LoadingScreen from "@/components/common/LoadingScreen";

export default function AuthPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && user && !redirecting) {
      setRedirecting(true);
      
      if (user.role === "SELLER") {
        router.replace("/seller");
      } else if (user.role === "CLIENT") {
        router.replace("/client");
      }
    }
  }, [loading, user, router, redirecting]);

  if (loading || redirecting) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}