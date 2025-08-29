import { ApiError } from "../utils/ApiError.js";

export function errorHandlear(err,req,res,next
){
    if(err instanceof ApiError ){
        return res.status(err.status).json({
            success:err.success,
            message:err.message,
            error:err.error
        })
    }
    return res.status(500).json({
        success:false,
        message:"something went wrong ",
        error:err.message
    })

}