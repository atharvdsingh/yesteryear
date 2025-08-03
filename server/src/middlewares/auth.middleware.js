import jwt, { decode } from 'jsonwebtoken'
import { AsyncHandler } from '../utils/AsyncHandler'
import { ApiError } from '../utils/ApiError'
import { User } from '../models/user.models'

export const checkJwt=AsyncHandler(async(res,req,next)=>{
try {
        const token=req.cookie?.AccessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(400,"cookie does not contain token")
        }
        const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     
        const user=await User.findById(decodedToken?._id).select("-password -RefreshToken")
           if(!user){
            throw new ApiError(400,'invalid token')
        }
        req.auth=user
        next()
} catch (error) {
        throw new ApiError(401,error?.message || 'invalide access token')
}

})