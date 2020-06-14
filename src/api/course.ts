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

export function addLearnt(cid: string) {
  return http.post("/learnt_course", {
    cid
  });
}

export function delLearnt(cid: string) {
  return http.delete("/learnt_course", {
    params: {
      cid
    }
  });
}
