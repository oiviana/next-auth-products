"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoginForm from "@/components/forms/LoginForm";
import LoadingScreen from "@/components/common/LoadingScreen";
import Link from "next/link";

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
        router.replace("/user");
      }
    }
  }, [loading, user, router, redirecting]);

  if (loading || redirecting) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <LoginForm />
        <div className="text-center">
          <p className="text-gray-600">
            Não possui uma conta?{" "}
            <Link 
              href="auth/signup" 
              className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
            >
              Cadastre-se aqui!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}