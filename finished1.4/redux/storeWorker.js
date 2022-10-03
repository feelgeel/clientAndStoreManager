import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"storeWorker",
     initialState:{
        storeWorkerDt:{},
        },
     reducers:{
         AddstoreWorkerDt:(listName,action)=>{
             listName.storeWorkerDt=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {AddstoreWorkerDt}=slice.actions;
