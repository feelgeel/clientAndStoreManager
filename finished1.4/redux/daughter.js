import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"daughter",
     initialState:{
        daughterDt:{},
        },
     reducers:{
         AddDaughter:(listName,action)=>{
             listName.daughterDt=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {AddDaughter}=slice.actions;
