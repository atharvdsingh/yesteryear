import mongoose, { connect } from "mongoose";
import { db_name } from "../contant.js";

const db=async ()=>{
    try {
        const connection=await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`)
        console.log("connection of data base is done");
    } catch (error) {
        console.log('connection of database if failed ',error);
        process.exit
    }
}

export default db