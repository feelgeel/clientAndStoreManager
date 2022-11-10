import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"owner",
     initialState:{
        ownerDt:{},
        },
     reducers:{
         AddOwner:(listName,action)=>{
             listName.ownerDt=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {AddOwner}=slice.actions;
