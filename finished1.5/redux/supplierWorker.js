import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"supplierWorker",
     initialState:{
        supplierWorkerDt:{},
        },
     reducers:{
         AddSupplierWorkerDt:(listName,action)=>{
             listName.supplierWorkerDt=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {AddSupplierWorkerDt}=slice.actions;
