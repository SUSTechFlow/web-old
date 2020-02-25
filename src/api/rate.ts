import http from "@/utils/http";

export function get(): Record<string, any> {
  return http.get("/rate");
}
