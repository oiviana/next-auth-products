"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }

    if (!loading && user) {

      if (user.role === "SELLER") router.replace("/seller");
      else router.replace("/client");
    }
  }, [loading, user, router]);

  if (loading) return <p>Carregando...</p>;
  return <p>Redirecionando...</p>;
}