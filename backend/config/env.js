import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const {
  PORT,
  MONGODB_URI,
  ENV,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  FRONTEND_URL,
  API_URL,
  FRONTEND_URL_DEV,
} = process.env;

const DB_URI=MONGODB_URI?MONGODB_URI:"mongodb://dev:dev123@localhost:27017"

if (
  !PORT ||
  !DB_URI ||
  !ACCESS_TOKEN_SECRET ||
  !REFRESH_TOKEN_SECRET ||
  !(FRONTEND_URL || FRONTEND_URL_DEV)
) {
  throw new Error("Missing essential environment variables.");
}
const IS_PRODUCTION = ENV && ENV === "production";

export {
  PORT,
  DB_URI,
  IS_PRODUCTION,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  FRONTEND_URL,
  API_URL,
  FRONTEND_URL_DEV,
};
