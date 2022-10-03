import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"store",
     initialState:{
        storeDt:{},
        },
     reducers:{
         Addstore:(listName,action)=>{
             listName.storeDt=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {Addstore}=slice.actions;
