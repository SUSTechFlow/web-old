import http from "@/utils/http";

export function getStatistics(cid: string): Record<string, any> {
  return http.get("/comment_statistic", {
    params: {
      cid
    }
  });
}

export function get(cid: string): Record<string, any> {
  return http.get("/comment_list", {
    params: {
      cid
    }
  });
}
