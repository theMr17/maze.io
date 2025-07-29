"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { guestLogin } from "@/services/authService";
import { AuthResponse, User } from "@/types/auth";

interface AuthContextType {
  authData: User | null;
  setAuthData: (data: User | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authData, setAuthData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      guestLogin()
        .then((res) => {
          setAuthData(res.data.user);
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
