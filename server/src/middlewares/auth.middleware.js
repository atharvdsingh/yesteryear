import jwt, { decode } from 'jsonwebtoken'
import { AsyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js'

export const checkJwt=AsyncHandler(async(req,_,next)=>{
try {
        const token=req.cookies?.AccessToken
        if(!token){
            throw new ApiError(200,"cookie does not contain token")
        }
        const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     
        const user=await User.findById(decodedToken?._id).select("-password -RefreshToken")
           if(!user){
            throw new ApiError(200,'invalid token')
        }
        req.auth=user
        next()
} catch (error) {
        throw new ApiError(200,error?.message || 'invalide access token')
}

})