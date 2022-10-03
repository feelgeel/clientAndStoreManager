import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"mother",
     initialState:{
        motherDt:{},
        },
     reducers:{
         AddMother:(listName,action)=>{
             listName.motherDt=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {AddMother}=slice.actions;
