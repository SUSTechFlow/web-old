import * as dotenv from "dotenv";

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `.env.test`;
    break;
  case "production":
    path = `.env.production`;
    break;
  default:
    path = `.env.development`;
}
dotenv.config({ path: path });

export const VUE_APP_API_HOST = process.env.VUE_APP_API_HOST;
export const VUE_APP_API_BASE = process.env.VUE_APP_API_BASE;
