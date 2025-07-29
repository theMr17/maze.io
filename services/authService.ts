"use client";

import { AuthResponse } from "@/types/auth";

export async function guestLogin(): Promise<AuthResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/guest-login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Guest login failed");

  const json = await res.json();

  localStorage.setItem("user", JSON.stringify(json.data.user));

  return json;
}

export async function loginWithCredentials(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name: "DefaultName" }),
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Login failed");

  const json = await res.json();

  localStorage.setItem("user", JSON.stringify(json.data.user));

  return json;
}
