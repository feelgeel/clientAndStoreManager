import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"manifactureWorker",
     initialState:{
        manifactureWorkerDt:{},
        },
     reducers:{
         AddmanifactureWorker:(listName,action)=>{
             listName.manifactureWorkerDt=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {AddmanifactureWorker}=slice.actions;
