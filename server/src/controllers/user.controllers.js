import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";



const createAccount=AsyncHandler(async (req,res)=>{

    try {

        const {userName,email,password}=req.body()
        if([userName,email,password].some((data)=>data?.trim()==='')){
            throw new ApiError(400,'credintaion required')
        }

        const exitedUser=await User.findone({
            $or:[{userName},{email}]
        })
        if(exitedUser){
            throw new ApiError(400,'user already exist')
        }
        const user=await User.create({userName,email,password})
        if(user){
            
        }
        
    } catch (error) {
        
    }



} )