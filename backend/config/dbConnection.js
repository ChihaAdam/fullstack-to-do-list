import { DB_URI } from "./env.js";
import mongoose from "mongoose";
const dbConnection = async () => {
  let cached = null;
  if (cached) return cached;

  try {
    const connection = await mongoose.connect(DB_URI);
    cached = connection;
    return connection;
  } catch (error) {
    process.exit(1);
  }
};
export default dbConnection;
