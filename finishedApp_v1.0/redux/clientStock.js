import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"client stock",
     initialState:{
        list: [],
        theList:{},
        theChosen:[],
        },
     reducers:{
         addAStock:(listName,action)=>{
             listName.list=action.payload
        },
         pushAStock:(listName,action)=>{
             listName.list.push(action.payload)
        },
         setTheStock:(listName,action)=>{
             listName.theList=action.payload
        },
         setTheChosen:(listName,action)=>{
             listName.theChosen=action.payload
        },
         pushTheChosen:(listName,action)=>{
             listName.theChosen.push(action.payload)
        },
        
     }
 })

export default  slice.reducer;
export const {addAStock,pushAStock,setTheStock,
            setTheChosen,pushTheChosen}=slice.actions;
