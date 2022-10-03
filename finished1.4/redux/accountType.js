import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"account type",
     initialState:{
        account:"client",
        },
     reducers:{
         changeAccount:(listName,action)=>{
             listName.account=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {changeAccount}=slice.actions;
