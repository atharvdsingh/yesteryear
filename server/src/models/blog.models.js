import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const blogSchema=new Schema({
    title:{
        type:String,
        required:true,
        unique:true

    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    publish:{
        type:Boolean,
        default:false
    },
    slug:{
        type:String,
        
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})


blogSchema.pre('save',async function(next){
    if(!this.isModified('title')) return next()
    this.slug = slugify(this.title,{
lower:true,strict:true})
next()
    
})

export const Blog= mongoose.model("Blog",blogSchema)