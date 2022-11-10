import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"ownerSupplier",
     initialState:{
        ownerSupplierDt:{},
        },
     reducers:{
         AddOwnerSupplier:(listName,action)=>{
             listName.ownerDt=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {AddOwnerSupplier}=slice.actions;
