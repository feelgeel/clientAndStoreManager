import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"son",
     initialState:{
        sonDt:{},
        },
     reducers:{
         AddSon:(listName,action)=>{
             listName.sonDt=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {AddSon}=slice.actions;
