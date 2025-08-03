import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRespons } from "../utils/ApiRespons.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";



const createAccount=AsyncHandler(async (req,res)=>{


        const {userName,email,password}=req.body 
        if([userName,email,password].some((data)=>data?.trim()==='')){
            throw new ApiError(400,'credintaion required')
        }

        const exitedUser=await User.findOne(
        {
            $or:[{email},{userName}]
        }
        )
        if(exitedUser){
            throw new ApiError(400,'user already exist')
        }
        const user=await User.create({userName,email,password})

        const getUser=await User.findById(user._id).select("-password")
        if(!getUser){
            throw new ApiError(500,'error while creating the user')
        }
        return res.status(200).json(
            new ApiRespons(200,getUser,'user created')
        )
        




} )

export {createAccount}