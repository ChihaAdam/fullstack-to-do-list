import chalk from "chalk";
import { DB_URI } from "./env.js";
import mongoose from "mongoose";
let cachedConnection = null;

export const dbConnection=async ()=>{
    if (cachedConnection) {
    return cachedConnection;
  }
  try {
    const connection = await mongoose.connect(DB_URI, {
      bufferCommands: false,
      maxPoolSize: 1,
    });
    console.log('connection established')
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}