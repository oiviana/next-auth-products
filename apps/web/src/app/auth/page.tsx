"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "@/components/forms/LoginForm";

export default function AuthPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {

      if (user.role === "SELLER") {
        router.replace("/seller");
      }
      
      if (user.role === "CLIENT") {
        router.replace("/client");
      }
    }
  }, [loading, user, router]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}