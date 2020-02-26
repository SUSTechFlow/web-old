import http from "@/utils/http";

export function signin(
  username: string,
  password: string
): Record<string, any> {
  return http.post("/user", {
    username,
    password
  });
}

export function signup(cid: string): Record<string, any> {
  return http.get("/register", {
    params: {
      cid
    }
  });
}
