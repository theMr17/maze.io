// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { getToken } from "@/utils/cookies";
import { guestLogin } from "@/services/authService";
import { AuthResponse } from "@/types/auth";

export function useAuth() {
  const [authData, setAuthData] = useState<AuthResponse["data"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      guestLogin()
        .then((res) => {
          setAuthData(res.data);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      const user = localStorage.getItem("user");

      if (user) {
        setAuthData(JSON.parse(user));
      } else {
        setAuthData(null);
      }

      setIsLoading(false);
    }
  }, []);

  return { authData, isLoading };
}
