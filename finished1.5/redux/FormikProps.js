import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"formik props",
     initialState:{
        formikProps:{},
        },
     reducers:{
         changeFormikProps:(listName,action)=>{
             listName.formikProps=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {changeFormikProps}=slice.actions;
