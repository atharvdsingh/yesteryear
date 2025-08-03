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
const loginuser=AsyncHandler(async(req,res)=>{
    const {email,userName,password}=req.body
    if(!userName && !email){
        throw new  ApiError(400,"Gmail and Password missing")
    }
    if(!password){
        throw new ApiError(400,"Password is missing")
    }
    const user=await User.findOne({
        $or:[{email},{password}]
    })
    if(!user){
        throw new ApiError(400,'User does not exist')
    }
    const currectPassword=await User.isPasswordCorrect(password)
    if(!currectPassword){
        throw new ApiError(400,'wrong password')
    }
    return res.status(200).json(new ApiRespons(200,user,currectPassword))
})
export {createAccount ,loginuser}