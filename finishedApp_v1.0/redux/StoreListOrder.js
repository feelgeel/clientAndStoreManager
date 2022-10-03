import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"storeListOrder",
     initialState:{
        list: [],
        listproducts:[],
        theList:{},
        theProd:{},
        theChosen:[],
        transMode:'modeScreen',
        loading:false,
        lastFetch:null
        },
     reducers:{
         addListName:(listName,action)=>{
             listName.list=action.payload
        },
         pushListName:(listName,action)=>{
             listName.list.push(action.payload)
        },
        addProducts:(listName,action)=>{
            listName.listproducts=action.payload
        },
         pushProducts:(listName,action)=>{
             listName.listproducts.push(action.payload)
        },
         setTheList:(listName,action)=>{
             listName.theList=action.payload
        },
         setTheProd:(listName,action)=>{
             listName.theProd=action.payload
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
export const {addListName,pushListName,addProducts,pushProducts,setTheList,
            setTheProd,setTheChosen,pushTheChosen}=slice.actions;
