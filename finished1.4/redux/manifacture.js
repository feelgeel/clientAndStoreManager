import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"manifacture",
     initialState:{
        manifactureDt:{},
        },
     reducers:{
         AddManifacture:(listName,action)=>{
             listName.manifactureDt=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {AddManifacture}=slice.actions;
