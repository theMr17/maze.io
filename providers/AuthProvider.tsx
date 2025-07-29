"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { guestLogin } from "@/services/authService";
import { AuthResponse } from "@/types/auth";

interface AuthContextType {
  authData: AuthResponse["data"] | null;
  setAuthData: (data: AuthResponse["data"] | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authData, setAuthData] = useState<AuthResponse["data"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      guestLogin()
        .then((res) => {
          setAuthData(res.data);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      setAuthData(JSON.parse(user));
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authData, setAuthData, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
