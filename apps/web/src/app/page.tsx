"use client";

import LoadingScreen from "@/components/common/LoadingScreen";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        setRedirecting(true);
        router.replace("/auth");
      } else {
        setRedirecting(true);
        if (user.role === "SELLER") {
          router.replace("/seller");
        } else {
          router.replace("/user");
        }
      }
    }
  }, [loading, user, router]);


  if (loading || redirecting) return <LoadingScreen />;
  
  return <LoadingScreen />;
}