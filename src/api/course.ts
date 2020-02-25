import http from "@/utils/http";

export function get(cid: string): Record<string, any> {
  return http.get("/course", {
    params: {
      cid
    }
  });
}
