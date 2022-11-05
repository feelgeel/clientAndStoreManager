import {createSlice } from "@reduxjs/toolkit";


 //create slice
 const slice=createSlice({
     name:"users",
     initialState:{
        list: {},
        loading:false,
        lastFetch:null
        },
     reducers:{
         userloggedIn:(user,action)=>{
             console.log(action.payload);
             
            user.list=action.payload
        },
        loginRequested:(user,action)=>{
            user.loading=true;
            
        },
        loginFailed:(user,action)=>{
            user.loading=false;
            
        },
          userRegistered:(user,action)=>{
             user.list=action.payload
         },
         registerRequested:(user,action)=>{
            user.loading=true;
            
        },
        registerFailed:(user,action)=>{
            user.loading=false;
            
        },
     }
 })

export default  slice.reducer;
export const {userloggedIn,userRegistered,loginRequested,loginFailed,registerRequested,registerFailed}=slice.actions;
