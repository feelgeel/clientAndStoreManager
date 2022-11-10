import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"family",
     initialState:{
        familyDt:{},
        },
     reducers:{
         AddFamily:(listName,action)=>{
             listName.familyDt=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {AddFamily}=slice.actions;
