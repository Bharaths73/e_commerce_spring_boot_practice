import { createSlice } from "@reduxjs/toolkit"


const initialState={
    token: localStorage.getItem("token") ? (JSON.parse(localStorage.getItem('token'))): null,
    email:localStorage.getItem("email") ? (JSON.parse(localStorage.getItem("email"))) : null,
    role :localStorage.getItem("role") ? (JSON.parse(localStorage.getItem("role"))) : null,
    signUpData:null
}

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload
            console.log("token is ",state.token);
            
        },
        setUser:(state,action)=>{
            state.email=action.payload
            
        },

        setRole:(state,action)=>{
            state.role=action.payload
            
        },
        setSignUpData:(state,action)=>{
            state.signUpData=action.payload
        }
    }
})

export const {setToken, setUser, setRole,setSignUpData}=userSlice.actions
export default userSlice.reducer;