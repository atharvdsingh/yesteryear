import mongoose, { Schema } from 'mongoose'

const userSchema=new Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },password:{
        type:String,
        required:[true,'password is not given']
    },refreshToken:{
        type:String
    }
},{timestamps:true})


export const User=mongoose.model('User',userSchema)