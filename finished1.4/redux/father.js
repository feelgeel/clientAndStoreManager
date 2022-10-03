import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"father",
     initialState:{
        fatherDt:{},
        },
     reducers:{
         AddFather:(listName,action)=>{
             listName.fatherDt=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {AddFather}=slice.actions;
