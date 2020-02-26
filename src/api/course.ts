import http from "@/utils/http";

export function get(cid: string): Record<string, any> {
  return http.get("/course", {
    params: {
      cid
    }
  });
}

export function getLearnt(): Record<string, any> {
  return http.get("/learnt_course");
}
