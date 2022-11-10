import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


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
export const loginUser=userData=>
{
    const newData=queryStringFunc(userData)

    return actions.apiCallBegan({
    url:"/auth",
    method:"post",
    data:newData,
    headers:{"Content-Type": "application/x-www-form-urlencoded" },
    onStart:loginRequested.type,
    onError:loginFailed.type,
    onSuccess:userloggedIn.type,
    })
}
export const registerUser=userData=>{
    const newData=queryStringFunc(userData)
    console.log(newData);
    
    return actions.apiCallBegan({
    url:"/users",
    method:"post",
    data:newData,
    headers:{"Content-Type": "application/x-www-form-urlencoded" },
    onStart:registerRequested.type,
    onError:registerFailed.type,
    onSuccess:userRegistered.type,
    })}

    export const selectCount = state => state.users.list