import http from "@/utils/http";

export function recover(): Record<string, any> {
  return http.get("/user");
}

export function signin(
  username: string,
  password: string
): Record<string, any> {
  return http.post("/user", {
    username,
    password
  });
}

export function signup(
  username: string,
  password: string,
  vcode: string
): Record<string, any> {
  return http.put("/user", {
    username,
    password,
    vcode
  });
}

export function verify(email: string): Record<string, any> {
  return http.get("/register_link", {
    params: {
      email
    }
  });
}
