import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRespons } from "../utils/ApiRespons.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";


const generateAccessAndRefreshToken=async (userId)=>{
    try {
         const user= await User.findById(userId)
         
         const AccessToken=user.generateAccessToken()
         const RefreshToken=user.generateRefreshToken()
         user.RefreshToken=RefreshToken
         user.save({validateBeforeSave:false})
         
         return {AccessToken,RefreshToken}
        
    } catch (error) {
        throw new ApiError(500,'Error while generating access and refresh token',)
    }
}


const createAccount=AsyncHandler(async (req,res)=>{


        const {userName,email,password}=req.body 
        if([userName,email,password].some((data)=>data?.trim()==='')){
            throw new ApiError(409,'credintial required')
        }

        const exitedUser=await User.findOne(
        {
            $or:[{email},{userName}]
        }
        )
        
        if(exitedUser){
            throw new ApiError(409,'user already exist')
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
        const {email,password}=req.body
        console.log(email,password);
        
        if( !email){
            throw new  ApiError(409,"Gmail and Password missing")
        }
        if(!password){
            throw new ApiError(409,"Password is missing")
        }
        const user=await User.findOne({email
        })
        if(!user){
            console.log('can not find the user');
            
            throw new ApiError(409,'User does not exist')
        }
        console.log('user not exist');
        

        const currectPassword=await user.isPasswordCorrect(password)
        if(!currectPassword){
            throw new ApiError(409,'wrong password')
        }
        console.log(user._id);
        
        const {AccessToken,RefreshToken}=await generateAccessAndRefreshToken(user._id)
        console.log(AccessToken,RefreshToken);
        
        
    
        const loggedInUser=await User.findById(user._id).select("-password -RefreshToken")
        
        if(!loggedInUser){
            throw new ApiError(500,'something went wrong while creating access and refresh token')
        }
    
        const Option={
            httpOnly:true,
            secure:false,
            sameSite: 'lax'      
        }
        return res.status(200).cookie('AccessToken',AccessToken,Option).cookie('RefreshToken',RefreshToken,Option).json(new ApiRespons(200,
            {
                user:loggedInUser,AccessToken,RefreshToken
            }
            ,'user logged in done'))

    })
const logoutUser=AsyncHandler(async(req,res)=>{
        
        const {_id}=req.auth
        const user=await User.findById(_id)
        if(!user){
            throw new ApiError(409,"unAuthorize user")
        }
        
        user.AccessToken=undefined
        user.save({validateBeforeSave:false})
        const Option={
            httpOnly:true,
            secure:false,
            sameSite: 'lax'      
        }
        return res.clearCookie("AccessToken",Option)
        .clearCookie("RefreshToken",Option)
        .json(new ApiRespons(200,{},"User loggedout succefully"))
        console.log("✅ AccessToken cookie sent with value:", AccessToken);
})

const getme=AsyncHandler(async(req,res)=>{
    const user=req.auth
    return res.status(200).json(new ApiRespons(200,user,'send me'))
})



export {createAccount ,loginuser,logoutUser,getme}