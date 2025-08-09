import { dbConnectionServerless } from "../config/dbConnection.js";
export const dbConnectionServerlessMiddleware=async (_req,_res,next)=>{
    try{
        await dbConnectionServerless()
    }catch(err){
        next(err)
    }
}