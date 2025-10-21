"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro no login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6  rounded-md bg-white shadow">
      <h2 className="text-2xl mb-4">Faça login para começar</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-7"
        required
      />
      
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
      
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-amber-900 text-white p-2 rounded disabled:bg-gray-400 my-4"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}