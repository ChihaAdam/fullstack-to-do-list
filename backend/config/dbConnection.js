import chalk from "chalk";
import { DB_URI } from "./env.js";
import mongoose from "mongoose";
const dbConnection=async ()=>{
    try{
       await mongoose.connect(DB_URI);
       console.log(chalk.green('db connection successful'))
    }
    catch(error){
        console.error(chalk.red.bold('error connecting to database'))
        process.exit(1)
    }
}
export default dbConnection