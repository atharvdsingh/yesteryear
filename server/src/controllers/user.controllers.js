import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRespons } from "../utils/ApiRespons.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";


const generateAccessAndRefreshToken=async (userId)=>{
    try {
         const user= await User.findById(userId)
         const accessToken=user.generateAccessToken()
         const refreshToken=user.generateRefreshToken()
         user.RefreshToken=refreshToken
         user.save({validateBeforeSave:false})
         return {accessToken,refreshToken}
        
    } catch (error) {
        throw new ApiError(500,'Error while generating access and refresh token',)
    }
}


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
try {
        const {email,userName,password}=req.body
        if(!userName && !email){
            throw new  ApiError(400,"Gmail and Password missing")
        }
        if(!password){
            throw new ApiError(400,"Password is missing")
        }
        const user=await User.findOne({
            $or:[{email},{userName}]
        })
        if(!user){
            throw new ApiError(400,'User does not exist')
        }
        const currectPassword=await user.isPasswordCorrect(password)
        if(!currectPassword){
            throw new ApiError(400,'wrong password')
        }
        const {AccessToken,RefreshToken}=await generateAccessAndRefreshToken(user._id)
    
        const loggedInUser=await User.findById(user._id).select("-password -RefreshToken")
        if(!loggedInUser){
            throw new ApiError(500,'something went wrong while createing access and refresh token')
        }
    
        const Option={
            httpOnly:true,
            secure:true
        }
        return res.status(200).cookie('AccessToken',AccessToken,Option).cookie('RefreshToken',RefreshToken,Option).json(new ApiRespons(200,
            {
                user:loggedInUser,AccessToken,RefreshToken
            }
            ,'user logged in done'))
} catch (error) {
    throw new ApiError(500,'Error while login the user')
}
    })
const logoutUser=AsyncHandler(async(req,res)=>{
    try {
        
        const {_id}=req.auth
        const user=await User.findById(_id)
        if(!user){
            throw new ApiError(400,"unAuthorize user")
        }
        
        user.AccessToken=undefined
        user.save({validateBeforeSave:false})
        const Option={
            httpOnly:true,
            secure:true
        }
        return res.clearCookie("AccessToken",Option)
        .clearCookie("RefreshToken",Option)
        .json(new ApiRespons(200,{},"User loggedout succefully"))

        
    } catch (error) {
        throw new ApiError(500 ,"Something wen wrong while logging out user")
    }

})



export {createAccount ,loginuser,logoutUser}