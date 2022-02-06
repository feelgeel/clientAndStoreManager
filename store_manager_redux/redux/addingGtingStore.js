import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";

 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"addingGtingStore",
     initialState:{
        grosseryBygting:[],
        store:"grossery",
        categObj:[],
        Byu:[],
        categ:"milk",
        chosen:[]
        },
     reducers:{
         addCategObj:(gting,action)=>{
            gting.categObj=action.payload;
        },
         addGrossGting:(gting,action)=>{
            gting.grosseryBygting=action.payload
        },
        modifyStore:(gting,action)=>{
            gting.store=action.payload
        },
        modifyCateg:(gting,action)=>{
            gting.categ=action.payload  
        },
          addChosen:(gting,action)=>{
             gting.chosen=action.payload
         },
          addByu:(gting,action)=>{
             gting.Byu=action.payload
         },
     }
 })

export default  slice.reducer;
export const {addGrossGting,addByu,addCategObj,modifyStore,modifyCateg,addChosen}=slice.actions;
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