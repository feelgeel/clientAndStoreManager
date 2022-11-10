import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"owner manifacture",
     initialState:{
        ownerManifactureDt:{},
        },
     reducers:{
         AddManifactureOwner:(listName,action)=>{
             listName.ownerManifactureDt=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {AddManifactureOwner}=slice.actions;
