"use client";

import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (

    <AuthProvider>
      {children}
    </AuthProvider>

  );
}
