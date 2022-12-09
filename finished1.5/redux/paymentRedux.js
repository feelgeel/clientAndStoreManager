import {createSlice } from "@reduxjs/toolkit";



 //create slice
 const slice=createSlice({
     name:"payment",
     initialState:{
        payment: {},
       
        },
     reducers:{
         addPayment:(listName,action)=>{
             listName.list=action.payload
        },
        
        
     }
 })

export default  slice.reducer;
export const {addPayment}=slice.actions;
