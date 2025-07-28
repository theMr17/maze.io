import Cookies from "js-cookie";

const TOKEN_KEY = "authToken";

export function getToken(): string | null {
  return Cookies.get(TOKEN_KEY) || null;
}

export function setToken(token: string) {
  Cookies.set(TOKEN_KEY, token, { expires: 365 }); // expires in 1 year
}

export function clearToken() {
  Cookies.remove(TOKEN_KEY);
}
