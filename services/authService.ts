import { getToken, setToken } from "@/utils/cookies";
import { AuthResponse } from "@/types/auth";

export async function guestLogin(): Promise<AuthResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/guest-login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) throw new Error("Guest login failed");

  const json = await res.json();

  setToken(json.data.accessToken);
  localStorage.setItem("user", JSON.stringify(json.data.user));

  return json;
}

export async function loginWithCredentials(
  email: string,
  password: string
): Promise<AuthResponse> {
  const token = getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ email, password, name: "DefaultName" }),
    }
  );

  if (!res.ok) throw new Error("Login failed");

  const json = await res.json();

  setToken(json.data.accessToken);
  localStorage.setItem("user", JSON.stringify(json.data.user));

  return json;
}
