import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";



const slice=createSlice({
    name:"products",
    initialState:{
       list: [],
       loading:false,
       lastFetch:null
       },
    reducers:{
        loadingProducts:(products,action)=>{
            // console.log("listname added",action.payload);
            
            products.list=action.payload
           //  return listName
       },
    }
})
export default  slice.reducer;
export const {loadingProducts}=slice.actions;