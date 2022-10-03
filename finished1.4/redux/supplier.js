import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"supplier",
     initialState:{
        supplierDt:{},
        },
     reducers:{
         AddSupplier:(listName,action)=>{
             listName.storeDt=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {AddSupplier}=slice.actions;
