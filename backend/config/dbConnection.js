import chalk from "chalk";
import { DB_URI } from "./env.js";
import mongoose from "mongoose";
let cachedConnection = null;

export async function dbConnectionServerless() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 1,
    });
    
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export const dbConnection=async ()=>{
    try{
       await mongoose.connect(DB_URI);
       console.log(chalk.green('db connection successful'))
    }
    catch(error){
        console.error(chalk.red.bold('error connecting to database'))
        process.exit(1)
    }
}