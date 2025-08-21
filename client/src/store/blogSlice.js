import { createSlice } from "@reduxjs/toolkit";

const initialstate={
    status:false,
    blogData:[]

}

const blogSlice=createSlice({
    name:'blog',
    initialState:initialstate,
    reducers:{
        add:(state,action)=>{
            state.status=true,
            state.blogData=action.payload
        }, 
        delete:(state,action)=>{
            state.status=true,
            state.blogData=action.payload
        }
    }
})

export const {add}=blogSlice.actions
export default blogSlice.reducer