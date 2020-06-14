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

export function post(
  cid: string,
  rate: Record<string, number>,
  willing: boolean,
  gpa: string,
  anonymous: boolean,
  content: string,
  term: string,
  taught: string
): Promise<any> {
  return http.put("/comment", {
    cid,
    willing,
    gpa,
    anonymous,
    rate,
    content,
    taught,
    term
  });
}
