import {createSlice} from "@reduxjs/toolkit"

const initiastat={
    status:false,
    userData:null
}

const authSlice=createSlice({
    name:'auth',
    initialState:initiastat,
    reducers:{
        login:(state,action)=>{
            state.status=true,
            state.userData=action.payload
        },
        logout:(state)=>{
            state.status=false,
            state.userData=null
        }
        
    }
})

export const {login,logout}=authSlice.actions
export default authSlice.reducer

