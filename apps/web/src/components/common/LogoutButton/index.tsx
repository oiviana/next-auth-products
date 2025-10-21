"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(); 
    router.push("/auth"); 
  };

  return (
    <button
      onClick={handleLogout}
      className="py-2 text-red-600 text-md lg:text-lg "
    >
      Sair
    </button>
  );
}