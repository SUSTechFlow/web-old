import Cookies from "js-cookie";

const TokenKey = "X-SUSTechFlow-Token";

export function getToken(): string {
  return Cookies.get(TokenKey) || "";
}

export function setToken(token: string): string | undefined {
  return Cookies.set(TokenKey, token);
}

export function removeToken(): void {
  return Cookies.remove(TokenKey);
}
