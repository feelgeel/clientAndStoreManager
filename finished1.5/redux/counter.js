import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"counter",
     initialState:{
   count:1
        },
     reducers:{
         counterUp:(counter,action)=>{
             counter.count=counter.count+1
        },
         reset:(counter,action)=>{
             counter.count=1
        },
        
     }
 })

export default  slice.reducer;
export const {counterUp,reset}=slice.actions;
