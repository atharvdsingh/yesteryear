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
            throw new ApiRespons(409,"user is not authorize")
        }
        const blog=await Blog.create({title,content,publish,author:_id})
        if(!blog){
            throw new ApiRespons(500,"Error while creating new blog")
        }
        return res.status(200).json(new ApiRespons(200,{},'blog created'))
})

const getAllBlog= AsyncHandler(async(req,res)=>{
    const {_id}=req.auth
    const data=await Blog.find({author:_id})
     
    
    return res.status(200).json(new ApiRespons(200,data,'all the blogs send'))
    
})

const GetPublicBlog=AsyncHandler(async(req,res)=>{
     const data= await Blog.find(publish=true)
     if(!data){
         throw new ApiError(500,"server is busy")
     }
     return res.status(200).json(new ApiRespons(2,data,"all the blogs is send"))
})

const DeleteBlog=AsyncHandler(async(req,res)=>{

    const {_id}=req.body
    const data=await Blog.findByIdAndDelete(_id)
    if(!data){
        throw new ApiError(409,'DELETING THE BLOG wrong blog id is given ')
    }
    return res.status(200).json(new ApiRespons(200,{}, 'blog is deleted')  )
})
const EditBlog=AsyncHandler(async(req,res)=>{

    const {content,title,_id}=req.body
    const data=await Blog.findByIdAndUpdate(_id,{
        content,title
        
    },{
        new:true
    })
    if(!data){
        throw new ApiError(409,"blog does not found")
    }
    return res.status(200).json(new ApiRespons(200,data,'blog is edited'))

})



export {CreateBlog,DeleteBlog,getAllBlog,EditBlog}