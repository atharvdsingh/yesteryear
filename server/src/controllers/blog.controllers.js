import { Blog } from "../models/blog.models.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRespons } from "../utils/ApiRespons.js";
import { User } from "../models/user.models.js";


const CreateBlog=AsyncHandler(async(req,res)=>{

        const {_id} =req.auth
        const {content,title,publish}=req.body
        const user = await User.findById(_id)
        if(!user){
            throw new ApiRespons(400,"user is not authorize")
        }
        const blog=await Blog.create({title,content,publish,author:_id})
        if(!blog){
            throw new ApiRespons(500,"Error while creating new blog")
        }
        return res.status(200).json(new ApiRespons(200,{},'blog created'))
})



export {CreateBlog}