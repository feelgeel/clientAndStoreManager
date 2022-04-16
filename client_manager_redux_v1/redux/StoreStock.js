import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"storeStock",
     initialState:{
        stocks: [],
        theStock:{},
        },
     reducers:{
         addStock:(listName,action)=>{
             listName.stocks=action.payload
        },
         pushStocks:(listName,action)=>{
             listName.stocks.push(action.payload)
        },
        addTheStock:(listName,action)=>{
            listName.theStock=action.payload
        },
         pushTheStock:(listName,action)=>{
             listName.theStock.push(action.payload)
        }, 
     }
 })

export default  slice.reducer;
export const {addStock,pushStocks,addTheStock,pushTheStock}=slice.actions;
